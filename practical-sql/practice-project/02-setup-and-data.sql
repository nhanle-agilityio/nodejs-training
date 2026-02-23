-- ============================================================
-- Practice Project: Personal Reading Log — Setup & Sample Data
-- Run this script first to create the database structure
-- ============================================================

-- Step 1: Create database (run separately if needed)
-- CREATE DATABASE reading_log;
-- \c reading_log

-- Step 2: Create tables with constraints (Ch 1, 7)
DROP TABLE IF EXISTS reading_log;
DROP TABLE IF EXISTS books;

CREATE TABLE books (
    book_id bigserial,
    title varchar(200) NOT NULL,
    author varchar(100) NOT NULL,
    genre varchar(50),
    page_count integer,
    date_added date DEFAULT current_date,
    CONSTRAINT books_key PRIMARY KEY (book_id),
    CONSTRAINT check_pages CHECK (page_count > 0)
);

CREATE TABLE reading_log (
    log_id bigserial,
    book_id bigint NOT NULL REFERENCES books (book_id) ON DELETE CASCADE,
    date_started date NOT NULL,
    date_finished date,
    rating smallint CHECK (rating >= 1 AND rating <= 5),
    notes text,
    CONSTRAINT reading_log_key PRIMARY KEY (log_id)
);

CREATE INDEX idx_books_genre ON books (genre);
CREATE INDEX idx_reading_log_book ON reading_log (book_id);
CREATE INDEX idx_reading_log_dates ON reading_log (date_started, date_finished);

-- Step 3: Insert sample data (Ch 1)
INSERT INTO books (title, author, genre, page_count, date_added)
VALUES
    ('The Pragmatic Programmer', 'Hunt & Thomas', 'Technology', 352, '2023-01-15'),
    ('Clean Code', 'Robert Martin', 'Technology', 464, '2023-02-20'),
    ('Atomic Habits', 'James Clear', 'Self-Help', 320, '2023-03-10'),
    ('Project Hail Mary', 'Andy Weir', 'Science Fiction', 496, '2023-04-05'),
    ('Educated', 'Tara Westover', 'Memoir', 334, '2023-05-12'),
    ('The Midnight Library', 'Matt Haig', 'Fiction', 288, '2023-06-01'),
    ('Deep Work', 'Cal Newport', 'Self-Help', 304, '2023-07-18'),
    ('Dune', 'Frank Herbert', 'Science Fiction', 688, '2023-08-22'),
    ('Thinking, Fast and Slow', 'Daniel Kahneman', 'Psychology', 499, '2023-09-14'),
    ('The Lean Startup', 'Eric Ries', 'Business', 336, '2023-10-01'),
    ('SQL for Data Analysis', 'Cathy Tanimura', 'Technology', 300, '2023-11-01');

INSERT INTO reading_log (book_id, date_started, date_finished, rating, notes)
VALUES
    (1, '2023-01-20', '2023-02-15', 5, 'Essential for developers'),
    (2, '2023-02-25', '2023-03-20', 5, NULL),
    (3, '2023-03-15', '2023-04-05', 4, 'Actionable advice'),
    (4, '2023-04-10', '2023-05-01', 5, 'Riveting story'),
    (5, '2023-05-15', '2023-06-10', 5, 'Powerful memoir'),
    (6, '2023-06-05', '2023-06-20', 4, NULL),
    (7, '2023-07-25', NULL, NULL, 'In progress'),
    (8, '2023-08-28', '2023-10-15', 5, 'Epic'),
    (9, '2023-09-20', NULL, NULL, 'In progress'),
    (10, '2023-10-05', '2023-10-25', 4, 'Good startup primer');

-- Verify
SELECT 'Books:' AS table_name, count(*) FROM books
UNION ALL
SELECT 'Reading log:', count(*) FROM reading_log;
