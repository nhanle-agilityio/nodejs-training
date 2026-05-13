-- Runs once when the Postgres data directory is first initialized.
-- Dedicated database for automated tests.
CREATE DATABASE booking_test OWNER booking;
