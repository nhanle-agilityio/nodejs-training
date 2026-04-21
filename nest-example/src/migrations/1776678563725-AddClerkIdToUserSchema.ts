import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddClerkIdToUserSchema1776678563725 implements MigrationInterface {
  name = 'AddClerkIdToUserSchema1776678563725';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "clerkId" character varying(200)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b0e4d1eb939d0387788678c4f8" ON "users" ("clerkId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b0e4d1eb939d0387788678c4f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "clerkId"`);
  }
}
