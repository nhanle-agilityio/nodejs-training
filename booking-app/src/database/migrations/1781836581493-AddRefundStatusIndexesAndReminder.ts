import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefundStatusIndexesAndReminder1781836581493 implements MigrationInterface {
  name = 'AddRefundStatusIndexesAndReminder1781836581493';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // ── Refund support: stripe_refund_id + status enum rewrites ──────────────
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "stripe_refund_id" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "UQ_973ec920676d86e47d67441909b" UNIQUE ("stripe_refund_id")`,
    );
    await queryRunner.query(`ALTER TABLE "slots" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."slots_status_enum"`);
    await queryRunner.query(
      `CREATE TYPE "public"."slots_status_enum" AS ENUM('open', 'closed')`,
    );
    await queryRunner.query(
      `ALTER TABLE "slots" ADD "status" "public"."slots_status_enum" NOT NULL DEFAULT 'open'`,
    );
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "status"`);
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."payments_status_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payments_status_enum" AS ENUM('SUCCEEDED', 'FAILED', 'REFUNDED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "status" "public"."payments_status_enum" NOT NULL DEFAULT 'SUCCEEDED'`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "status"`);
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."bookings_status_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."bookings_status_enum" AS ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'REFUND_PENDING', 'REFUNDED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD "status" "public"."bookings_status_enum" NOT NULL DEFAULT 'PENDING'`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."users_role_enum"`);
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'user'`,
    );

    // ── Booking reminder timestamp ───────────────────────────────────────────
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD "reminder_sent_at" TIMESTAMP WITH TIME ZONE`,
    );

    // ── Missing indexes (created after the columns above exist) ──────────────
    await queryRunner.query(
      `CREATE INDEX "slots_start_time_idx" ON "slots" ("start_time") `,
    );
    await queryRunner.query(
      `CREATE INDEX "payments_booking_id_idx" ON "payments" ("booking_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "bookings_status_created_at_idx" ON "bookings" ("status", "created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "bookings_user_id_idx" ON "bookings" ("user_id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverse order: indexes → reminder column → refund/status enum rewrites.
    await queryRunner.query(`DROP INDEX "public"."bookings_user_id_idx"`);
    await queryRunner.query(
      `DROP INDEX "public"."bookings_status_created_at_idx"`,
    );
    await queryRunner.query(`DROP INDEX "public"."payments_booking_id_idx"`);
    await queryRunner.query(`DROP INDEX "public"."slots_start_time_idx"`);

    await queryRunner.query(
      `ALTER TABLE "bookings" DROP COLUMN "reminder_sent_at"`,
    );

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
    await queryRunner.query(
      `ALTER TABLE "payments" DROP CONSTRAINT "UQ_973ec920676d86e47d67441909b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP COLUMN "stripe_refund_id"`,
    );
  }
}
