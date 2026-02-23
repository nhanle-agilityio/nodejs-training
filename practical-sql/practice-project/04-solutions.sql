-- ============================================================
-- Practice Project: Solutions
-- Try the tasks first, then use this for reference
-- ============================================================

-- Task 1: Basic Queries
-- 1a
SELECT title, author, page_count FROM books ORDER BY page_count DESC;

-- 1b
SELECT * FROM books WHERE genre IN ('Technology', 'Self-Help');

-- 1c
SELECT DISTINCT genre FROM books ORDER BY genre;

-- Task 2: Aggregations
-- 2a
SELECT round(avg(page_count), 0) AS avg_pages FROM books;

-- 2b
SELECT percentile_cont(.5) WITHIN GROUP (ORDER BY page_count) AS median_pages FROM books;

-- 2c
SELECT count(*) FROM reading_log WHERE date_finished IS NOT NULL;

-- 2d
SELECT round(avg(rating), 1) AS avg_rating FROM reading_log WHERE date_finished IS NOT NULL AND rating IS NOT NULL;

-- Task 3: JOINs
-- 3a
SELECT b.title, b.author, r.date_started, r.date_finished, r.rating
FROM books b
JOIN reading_log r ON b.book_id = r.book_id
WHERE r.date_finished IS NOT NULL
ORDER BY r.date_finished DESC;

-- 3b (Books with no log entry — SQL for Data Analysis has no entry in the sample)
SELECT b.book_id, b.title, b.author
FROM books b
LEFT JOIN reading_log r ON b.book_id = r.book_id
WHERE r.log_id IS NULL;

-- Task 4: Grouping
-- 4a
SELECT genre, count(*) AS book_count FROM books GROUP BY genre ORDER BY book_count DESC;

-- 4b
SELECT b.genre, round(avg(r.rating), 1) AS avg_rating
FROM books b
JOIN reading_log r ON b.book_id = r.book_id
WHERE r.date_finished IS NOT NULL AND r.rating IS NOT NULL
GROUP BY b.genre
HAVING count(*) >= 2;

-- Task 5: Dates & Intervals
-- 5a
SELECT b.title, r.date_finished - r.date_started AS days_to_read
FROM books b
JOIN reading_log r ON b.book_id = r.book_id
WHERE r.date_finished IS NOT NULL
ORDER BY days_to_read;

-- 5b
SELECT date_part('month', date_finished) AS month_num, count(*) AS books_finished
FROM reading_log
WHERE date_finished IS NOT NULL
GROUP BY date_part('month', date_finished)
ORDER BY books_finished DESC
LIMIT 1;

-- Task 6: Data Modification
-- 6a
CREATE TABLE books_backup AS SELECT * FROM books;

-- 6b (Pattern - our data has no typo, but here's the approach)
-- ALTER TABLE books ADD COLUMN genre_standard varchar(50);
-- UPDATE books SET genre_standard = genre;
-- UPDATE books SET genre_standard = 'Self-Help' WHERE genre ILIKE 'self%help%';

-- 6c
START TRANSACTION;
UPDATE books SET title = 'TEST TITLE' WHERE book_id = 1;
SELECT title FROM books WHERE book_id = 1;  -- Verify
ROLLBACK;
SELECT title FROM books WHERE book_id = 1;  -- Should be original

-- Task 7: Rankings & Rates
-- 7a
SELECT b.title, r.rating, rank() OVER (ORDER BY r.rating DESC, b.title)
FROM books b
JOIN reading_log r ON b.book_id = r.book_id
WHERE r.date_finished IS NOT NULL AND r.rating IS NOT NULL
ORDER BY r.rating DESC;

-- 7b
SELECT b.title,
       round(b.page_count::numeric / NULLIF((r.date_finished - r.date_started), 0), 1) AS pages_per_day
FROM books b
JOIN reading_log r ON b.book_id = r.book_id
WHERE r.date_finished IS NOT NULL
ORDER BY pages_per_day DESC
LIMIT 1;

-- Task 8: Export
-- Change path to your directory; use absolute path
COPY (
    SELECT b.title, b.author, r.rating
    FROM books b
    JOIN reading_log r ON b.book_id = r.book_id
    WHERE r.date_finished IS NOT NULL AND r.rating IS NOT NULL
    ORDER BY r.rating DESC
    LIMIT 5
)
TO '/tmp/top_rated_books.csv'
WITH (FORMAT CSV, HEADER);

-- Optional Challenge: Correlation
SELECT round(corr(b.page_count, r.rating)::numeric, 2) AS page_rating_correlation
FROM books b
JOIN reading_log r ON b.book_id = r.book_id
WHERE r.date_finished IS NOT NULL AND r.rating IS NOT NULL;
