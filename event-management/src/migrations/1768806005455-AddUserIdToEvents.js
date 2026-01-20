/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class AddUserIdToEvents1768806005455 {
  name = 'AddUserIdToEvents1768806005455';

  /**
   * @param {QueryRunner} queryRunner
   */
  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "temporary_events" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(200) NOT NULL, "description" text, "location" varchar(200) NOT NULL, "date" datetime NOT NULL, "ticketPrice" decimal(10,2) NOT NULL DEFAULT (0), "capacity" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "userId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_events"("id", "name", "description", "location", "date", "ticketPrice", "capacity", "createdAt", "updatedAt", "deletedAt") SELECT "id", "name", "description", "location", "date", "ticketPrice", "capacity", "createdAt", "updatedAt", "deletedAt" FROM "events"`,
    );
    await queryRunner.query(`DROP TABLE "events"`);
    await queryRunner.query(`ALTER TABLE "temporary_events" RENAME TO "events"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_events" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(200) NOT NULL, "description" text, "location" varchar(200) NOT NULL, "date" datetime NOT NULL, "ticketPrice" decimal(10,2) NOT NULL DEFAULT (0), "capacity" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "userId" integer, CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_events"("id", "name", "description", "location", "date", "ticketPrice", "capacity", "createdAt", "updatedAt", "deletedAt", "userId") SELECT "id", "name", "description", "location", "date", "ticketPrice", "capacity", "createdAt", "updatedAt", "deletedAt", "userId" FROM "events"`,
    );
    await queryRunner.query(`DROP TABLE "events"`);
    await queryRunner.query(`ALTER TABLE "temporary_events" RENAME TO "events"`);
  }

  /**
   * @param {QueryRunner} queryRunner
   */
  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "events" RENAME TO "temporary_events"`);
    await queryRunner.query(
      `CREATE TABLE "events" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(200) NOT NULL, "description" text, "location" varchar(200) NOT NULL, "date" datetime NOT NULL, "ticketPrice" decimal(10,2) NOT NULL DEFAULT (0), "capacity" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "userId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "events"("id", "name", "description", "location", "date", "ticketPrice", "capacity", "createdAt", "updatedAt", "deletedAt", "userId") SELECT "id", "name", "description", "location", "date", "ticketPrice", "capacity", "createdAt", "updatedAt", "deletedAt", "userId" FROM "temporary_events"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_events"`);
    await queryRunner.query(`ALTER TABLE "events" RENAME TO "temporary_events"`);
    await queryRunner.query(
      `CREATE TABLE "events" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(200) NOT NULL, "description" text, "location" varchar(200) NOT NULL, "date" datetime NOT NULL, "ticketPrice" decimal(10,2) NOT NULL DEFAULT (0), "capacity" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime)`,
    );
    await queryRunner.query(
      `INSERT INTO "events"("id", "name", "description", "location", "date", "ticketPrice", "capacity", "createdAt", "updatedAt", "deletedAt") SELECT "id", "name", "description", "location", "date", "ticketPrice", "capacity", "createdAt", "updatedAt", "deletedAt" FROM "temporary_events"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_events"`);
  }
}
