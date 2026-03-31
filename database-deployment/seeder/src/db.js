import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const query = async (text, params) => {
  const res = await pool.query(text, params);
  return res;
};

export const getClient = async () => pool.connect();

export const end = async () => pool.end();
