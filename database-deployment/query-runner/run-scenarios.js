/**
 * Execute all scenarios from scenarios.json using SQL files under queries/.
 */

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import pg from 'pg';

const { Pool } = pg;

const __dirname = dirname(fileURLToPath(import.meta.url));
const queriesRoot = join(__dirname, 'queries');

const createPool = () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  return new Pool({
    host: DB_HOST || 'localhost',
    port: Number.parseInt(DB_PORT, 10),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });
};

const loadSqlFromQueries = (relativePath) => {
  const full = join(queriesRoot, relativePath);
  if (!existsSync(full)) {
    throw new Error(`SQL file not found: queries/${relativePath}`);
  }
  return readFileSync(full, 'utf8').trim();
};

const loadScenarios = () =>
  JSON.parse(readFileSync(join(__dirname, 'scenarios.json'), 'utf8'));

const logResult = (label, result) => {
  console.log(`\n--- ${label}  (${result.rowCount} rows) ---`);
  if (result.rowCount === 0) return;
  if (result.rowCount <= 40) {
    console.table(result.rows);
    return;
  }
  console.table(result.rows.slice(0, 10));
  console.log(`… ${result.rowCount} rows total (showing first 10)`);
};

const runScenarios = async (pool) => {
  const manifest = loadScenarios();
  const cases = manifest.cases;
  if (!Array.isArray(cases)) {
    throw new Error('scenarios.json must define a "cases" array');
  }
  if (manifest.description) {
    console.log(`${manifest.description}\n`);
  }

  const client = await pool.connect();
  try {
    for (const caseItem of cases) {
      let params = [];

      if (caseItem.description) {
        console.log('\n');
        console.log('================================================');
        console.log(`  ${caseItem.description}`);
      }

      if (caseItem.bindFromQuery) {
        const bindRes = await client.query(caseItem.bindFromQuery);
        if (bindRes.rows.length === 0) {
          throw new Error(`[${caseItem.id}] bindFromQuery returned no rows`);
        }
        const row = bindRes.rows[0];
        const fields = caseItem.paramFields || [];
        params = fields.map((field) => {
          if (!Object.hasOwn(row, field)) {
            throw new Error(`[${caseItem.id}] bind row missing field: ${field}`);
          }
          return row[field];
        });
      } else if (caseItem.params) {
        params = caseItem.params;
      }

      const sql = loadSqlFromQueries(caseItem.file);
      const result = await client.query(sql, params);
      logResult(caseItem.id, result);
    }
  } finally {
    client.release();
  }
};

const main = async () => {
  const pool = createPool();
  try {
    await runScenarios(pool);
  } finally {
    await pool.end();
  }
};

try {
  await main();
} catch (err) {
  console.error(err);
  process.exit(1);
}
