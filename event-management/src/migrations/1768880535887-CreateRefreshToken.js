/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class CreateRefreshToken1768880535887 {
  name = 'CreateRefreshToken1768880535887';

  /**
   * @param {QueryRunner} queryRunner
   */
  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "refresh_tokens" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "token" varchar(255) NOT NULL, "userId" integer NOT NULL, "expiresAt" datetime NOT NULL, "isUsed" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_4542dd2f38a61354a040ba9fd57" UNIQUE ("token"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_refresh_tokens" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "token" varchar(255) NOT NULL, "userId" integer NOT NULL, "expiresAt" datetime NOT NULL, "isUsed" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_4542dd2f38a61354a040ba9fd57" UNIQUE ("token"), CONSTRAINT "FK_610102b60fea1455310ccd299de" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_refresh_tokens"("id", "token", "userId", "expiresAt", "isUsed", "createdAt") SELECT "id", "token", "userId", "expiresAt", "isUsed", "createdAt" FROM "refresh_tokens"`,
    );
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    await queryRunner.query(`ALTER TABLE "temporary_refresh_tokens" RENAME TO "refresh_tokens"`);
  }

  /**
   * @param {QueryRunner} queryRunner
   */
  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "refresh_tokens" RENAME TO "temporary_refresh_tokens"`);
    await queryRunner.query(
      `CREATE TABLE "refresh_tokens" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "token" varchar(255) NOT NULL, "userId" integer NOT NULL, "expiresAt" datetime NOT NULL, "isUsed" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_4542dd2f38a61354a040ba9fd57" UNIQUE ("token"))`,
    );
    await queryRunner.query(
      `INSERT INTO "refresh_tokens"("id", "token", "userId", "expiresAt", "isUsed", "createdAt") SELECT "id", "token", "userId", "expiresAt", "isUsed", "createdAt" FROM "temporary_refresh_tokens"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_refresh_tokens"`);
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
  }
}
