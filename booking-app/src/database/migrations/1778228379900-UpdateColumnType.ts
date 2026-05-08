import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColumnType1778228379900 implements MigrationInterface {
  name = 'UpdateColumnType1778228379900';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "slots" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."slots_status_enum" AS ENUM('open', 'closed')`,
    );
    await queryRunner.query(
      `ALTER TABLE "slots" ADD "status" "public"."slots_status_enum" NOT NULL DEFAULT 'open'`,
    );
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."payments_status_enum" AS ENUM('SUCCEEDED', 'FAILED', 'REFUNDED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "status" "public"."payments_status_enum" NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."bookings_status_enum" AS ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'REFUNDED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD "status" "public"."bookings_status_enum" NOT NULL DEFAULT 'PENDING'`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'user'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" character varying(20) NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."bookings_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD "status" character varying(20) NOT NULL DEFAULT 'PENDING'`,
    );
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "status" character varying(20) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "slots" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."slots_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "slots" ADD "status" character varying(20) NOT NULL DEFAULT 'open'`,
    );
  }
}
