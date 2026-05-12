import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColumnType1778569591992 implements MigrationInterface {
  name = 'UpdateColumnType1778569591992';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET LOCAL TIME ZONE 'UTC'`);

    await queryRunner.query(
      `ALTER TABLE "slots" ALTER COLUMN "created_at" TYPE TIMESTAMP WITH TIME ZONE USING "created_at"::timestamptz`,
    );
    await queryRunner.query(
      `ALTER TABLE "slots" ALTER COLUMN "updated_at" TYPE TIMESTAMP WITH TIME ZONE USING "updated_at"::timestamptz`,
    );

    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "stripe_event_id" TYPE character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "created_at" TYPE TIMESTAMP WITH TIME ZONE USING "created_at"::timestamptz`,
    );

    await queryRunner.query(
      `ALTER TABLE "bookings" ALTER COLUMN "created_at" TYPE TIMESTAMP WITH TIME ZONE USING "created_at"::timestamptz`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ALTER COLUMN "updated_at" TYPE TIMESTAMP WITH TIME ZONE USING "updated_at"::timestamptz`,
    );

    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "clerk_id" TYPE character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "email" TYPE character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "name" TYPE character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" TYPE TIMESTAMP WITH TIME ZONE USING "created_at"::timestamptz`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" TYPE TIMESTAMP WITH TIME ZONE USING "updated_at"::timestamptz`,
    );

    await queryRunner.query(
      `CREATE UNIQUE INDEX "bookings_active_slot_uidx" ON "bookings" ("slot_id") WHERE "status" IN ('PENDING', 'CONFIRMED')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."bookings_active_slot_uidx"`);
    await queryRunner.query(`SET LOCAL TIME ZONE 'UTC'`);

    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" TYPE TIMESTAMP WITHOUT TIME ZONE USING ("updated_at" AT TIME ZONE 'UTC')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" TYPE TIMESTAMP WITHOUT TIME ZONE USING ("created_at" AT TIME ZONE 'UTC')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "name" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "email" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "clerk_id" TYPE character varying`,
    );

    await queryRunner.query(
      `ALTER TABLE "bookings" ALTER COLUMN "updated_at" TYPE TIMESTAMP WITHOUT TIME ZONE USING ("updated_at" AT TIME ZONE 'UTC')`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ALTER COLUMN "created_at" TYPE TIMESTAMP WITHOUT TIME ZONE USING ("created_at" AT TIME ZONE 'UTC')`,
    );

    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "created_at" TYPE TIMESTAMP WITHOUT TIME ZONE USING ("created_at" AT TIME ZONE 'UTC')`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "stripe_event_id" TYPE character varying`,
    );

    await queryRunner.query(
      `ALTER TABLE "slots" ALTER COLUMN "updated_at" TYPE TIMESTAMP WITHOUT TIME ZONE USING ("updated_at" AT TIME ZONE 'UTC')`,
    );
    await queryRunner.query(
      `ALTER TABLE "slots" ALTER COLUMN "created_at" TYPE TIMESTAMP WITHOUT TIME ZONE USING ("created_at" AT TIME ZONE 'UTC')`,
    );
  }
}
