import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMissingIndexes1781836581492 implements MigrationInterface {
  name = 'AddMissingIndexes1781836581492';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(`DROP INDEX "public"."bookings_user_id_idx"`);
    await queryRunner.query(
      `DROP INDEX "public"."bookings_status_created_at_idx"`,
    );
    await queryRunner.query(`DROP INDEX "public"."payments_booking_id_idx"`);
    await queryRunner.query(`DROP INDEX "public"."slots_start_time_idx"`);
  }
}
