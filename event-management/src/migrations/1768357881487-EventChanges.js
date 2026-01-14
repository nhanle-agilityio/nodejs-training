/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class EventChanges1768357881487 {
  name = 'EventChanges1768357881487';

  /**
   * @param {QueryRunner} queryRunner
   */
  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "temporary_events" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "description" text(2000), "location" varchar(255) NOT NULL, "date" datetime NOT NULL, "ticketPrice" float NOT NULL DEFAULT (0), "capacity" integer NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_events"("id", "name", "description", "location", "date", "ticketPrice", "capacity", "createdAt", "updatedAt", "deletedAt") SELECT "id", "name", "description", "location", "date", "ticketPrice", "capacity", "createdAt", "updatedAt", "deletedAt" FROM "events"`,
    );
    await queryRunner.query(`DROP TABLE "events"`);
    await queryRunner.query(`ALTER TABLE "temporary_events" RENAME TO "events"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_events" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(200) NOT NULL, "description" text, "location" varchar(200) NOT NULL, "date" datetime NOT NULL, "ticketPrice" decimal(10,2) NOT NULL DEFAULT (0), "capacity" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_events"("id", "name", "description", "location", "date", "ticketPrice", "capacity", "createdAt", "updatedAt", "deletedAt") SELECT "id", "name", "description", "location", "date", "ticketPrice", "capacity", "createdAt", "updatedAt", "deletedAt" FROM "events"`,
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
      `CREATE TABLE "events" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "description" text(2000), "location" varchar(255) NOT NULL, "date" datetime NOT NULL, "ticketPrice" float NOT NULL DEFAULT (0), "capacity" integer NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime)`,
    );
    await queryRunner.query(
      `INSERT INTO "events"("id", "name", "description", "location", "date", "ticketPrice", "capacity", "createdAt", "updatedAt", "deletedAt") SELECT "id", "name", "description", "location", "date", "ticketPrice", "capacity", "createdAt", "updatedAt", "deletedAt" FROM "temporary_events"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_events"`);
    await queryRunner.query(`ALTER TABLE "events" RENAME TO "temporary_events"`);
    await queryRunner.query(
      `CREATE TABLE "events" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "description" text(2000), "location" varchar(255) NOT NULL, "date" datetime NOT NULL, "ticketPrice" float NOT NULL DEFAULT (0), "capacity" integer NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime)`,
    );
    await queryRunner.query(
      `INSERT INTO "events"("id", "name", "description", "location", "date", "ticketPrice", "capacity", "createdAt", "updatedAt", "deletedAt") SELECT "id", "name", "description", "location", "date", "ticketPrice", "capacity", "createdAt", "updatedAt", "deletedAt" FROM "temporary_events"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_events"`);
  }
}
