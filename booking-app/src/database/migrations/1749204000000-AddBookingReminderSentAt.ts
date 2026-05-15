import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBookingReminderSentAt1749204000000 implements MigrationInterface {
  name = 'AddBookingReminderSentAt1749204000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD "reminder_sent_at" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP COLUMN "reminder_sent_at"`,
    );
  }
}
