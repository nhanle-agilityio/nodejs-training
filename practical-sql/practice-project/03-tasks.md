# Practice Project: Tasks

Complete these tasks in order. Try to write the SQL yourself before checking the solutions.

---

## Task 1: Basic Queries (Ch 2)

**1a.** List all books, showing only title, author, and page count, sorted by page count descending.

**1b.** Find all books in the "Technology" or "Self-Help" genre.

**1c.** Find distinct genres in your collection.

---

## Task 2: Aggregations (Ch 5, 8)

**2a.** What is the average page count of all books?

**2b.** What is the median page count? (Use `percentile_cont(.5)`)

**2c.** How many books have you finished reading? (Hint: `date_finished IS NOT NULL`)

**2d.** What is the average rating of completed books? (Exclude NULL ratings.)

---

## Task 3: JOINs (Ch 6)

**3a.** List each completed reading entry with the book title, author, dates, and rating. Sort by date finished, newest first.

**3b.** Find books that are in your collection but have no reading log entry yet. (Hint: LEFT JOIN + IS NULL — one book in the sample has no log.)

---

## Task 4: Grouping (Ch 8)

**4a.** Count how many books you have in each genre. Order by count descending.

**4b.** What is the average rating by genre? Only include genres with at least 2 completed reads.

---

## Task 5: Dates & Intervals (Ch 11)

**5a.** For each completed book, calculate how many days it took to read (`date_finished - date_started`). Show book title and days.

**5b.** Which month did you finish the most books? (Use `date_part('month', date_finished)`.)

---

## Task 6: Data Modification (Ch 9)

**6a.** Create a backup of the `books` table before making changes.

**6b.** You notice "Self-Help" is spelled inconsistently. Add a standardized genre column, copy the values, then update "self help" variants to "Self-Help". (Our sample data doesn't have the typo, but practice the pattern.)

**6c.** Use a transaction: Try updating a book's title, then ROLLBACK. Verify the change was not saved.

---

## Task 7: Rankings & Rates (Ch 10)

**7a.** Rank your completed books by rating (highest first). Use `rank()`.

**7b.** Calculate a "pages per day" reading speed for each completed book: `page_count / (date_finished - date_started)`. Round to 1 decimal. Which book did you read fastest?

---

## Task 8: Export (Ch 4)

Export your top 5 highest-rated completed books to CSV (title, author, rating). Use `COPY` with a subquery.

---

## Optional Challenge

Using the books and reading_log data, find the correlation between `page_count` and `rating` for completed books. Is there a relationship? (Hint: Use `corr()` from Ch 10.)
