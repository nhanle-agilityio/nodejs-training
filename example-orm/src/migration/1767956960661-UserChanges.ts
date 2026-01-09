import { MigrationInterface, QueryRunner } from "typeorm";

export class UserChanges1767956960661 implements MigrationInterface {
    name = 'UserChanges1767956960661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bio" text, "avatar" varchar, "website" varchar)`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" text NOT NULL, "authorName" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "postId" integer)`);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" integer)`);
        await queryRunner.query(`CREATE TABLE "category" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar)`);
        await queryRunner.query(`CREATE TABLE "user_categories_category" ("userId" integer NOT NULL, "categoryId" integer NOT NULL, PRIMARY KEY ("userId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_331665e2e7d360bf2b715dfeea" ON "user_categories_category" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_936afd72159ca6d1143ab3d66a" ON "user_categories_category" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "profileId" integer, CONSTRAINT "UQ_fe4ec24a49c8ab53289320a6841" UNIQUE ("profileId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "firstName", "lastName", "age", "isActive", "createdAt", "updatedAt") SELECT "id", "firstName", "lastName", "age", "isActive", "createdAt", "updatedAt" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" text NOT NULL, "authorName" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "postId" integer, CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_comment"("id", "content", "authorName", "createdAt", "postId") SELECT "id", "content", "authorName", "createdAt", "postId" FROM "comment"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`ALTER TABLE "temporary_comment" RENAME TO "comment"`);
        await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" integer, CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_post"("id", "title", "content", "createdAt", "updatedAt", "authorId") SELECT "id", "title", "content", "createdAt", "updatedAt", "authorId" FROM "post"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "profileId" integer, CONSTRAINT "UQ_fe4ec24a49c8ab53289320a6841" UNIQUE ("profileId"), CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "firstName", "lastName", "age", "isActive", "createdAt", "updatedAt", "profileId") SELECT "id", "firstName", "lastName", "age", "isActive", "createdAt", "updatedAt", "profileId" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`DROP INDEX "IDX_331665e2e7d360bf2b715dfeea"`);
        await queryRunner.query(`DROP INDEX "IDX_936afd72159ca6d1143ab3d66a"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_categories_category" ("userId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "FK_331665e2e7d360bf2b715dfeea9" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_936afd72159ca6d1143ab3d66af" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("userId", "categoryId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_categories_category"("userId", "categoryId") SELECT "userId", "categoryId" FROM "user_categories_category"`);
        await queryRunner.query(`DROP TABLE "user_categories_category"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_categories_category" RENAME TO "user_categories_category"`);
        await queryRunner.query(`CREATE INDEX "IDX_331665e2e7d360bf2b715dfeea" ON "user_categories_category" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_936afd72159ca6d1143ab3d66a" ON "user_categories_category" ("categoryId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_936afd72159ca6d1143ab3d66a"`);
        await queryRunner.query(`DROP INDEX "IDX_331665e2e7d360bf2b715dfeea"`);
        await queryRunner.query(`ALTER TABLE "user_categories_category" RENAME TO "temporary_user_categories_category"`);
        await queryRunner.query(`CREATE TABLE "user_categories_category" ("userId" integer NOT NULL, "categoryId" integer NOT NULL, PRIMARY KEY ("userId", "categoryId"))`);
        await queryRunner.query(`INSERT INTO "user_categories_category"("userId", "categoryId") SELECT "userId", "categoryId" FROM "temporary_user_categories_category"`);
        await queryRunner.query(`DROP TABLE "temporary_user_categories_category"`);
        await queryRunner.query(`CREATE INDEX "IDX_936afd72159ca6d1143ab3d66a" ON "user_categories_category" ("categoryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_331665e2e7d360bf2b715dfeea" ON "user_categories_category" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "profileId" integer, CONSTRAINT "UQ_fe4ec24a49c8ab53289320a6841" UNIQUE ("profileId"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "firstName", "lastName", "age", "isActive", "createdAt", "updatedAt", "profileId") SELECT "id", "firstName", "lastName", "age", "isActive", "createdAt", "updatedAt", "profileId" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" integer)`);
        await queryRunner.query(`INSERT INTO "post"("id", "title", "content", "createdAt", "updatedAt", "authorId") SELECT "id", "title", "content", "createdAt", "updatedAt", "authorId" FROM "temporary_post"`);
        await queryRunner.query(`DROP TABLE "temporary_post"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME TO "temporary_comment"`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" text NOT NULL, "authorName" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "postId" integer)`);
        await queryRunner.query(`INSERT INTO "comment"("id", "content", "authorName", "createdAt", "postId") SELECT "id", "content", "authorName", "createdAt", "postId" FROM "temporary_comment"`);
        await queryRunner.query(`DROP TABLE "temporary_comment"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "user"("id", "firstName", "lastName", "age", "isActive", "createdAt", "updatedAt") SELECT "id", "firstName", "lastName", "age", "isActive", "createdAt", "updatedAt" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`DROP INDEX "IDX_936afd72159ca6d1143ab3d66a"`);
        await queryRunner.query(`DROP INDEX "IDX_331665e2e7d360bf2b715dfeea"`);
        await queryRunner.query(`DROP TABLE "user_categories_category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
