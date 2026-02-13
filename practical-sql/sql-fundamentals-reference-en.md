# SQL Fundamentals: Practical Reference (Chapters 1–11)

A compact, consolidated reference of essential SQL knowledge for real-world practice. Use this for quick review, teaching, or onboarding.

---

## 1. Core SQL Structure

### Statement Order (required)

```
SELECT → FROM → [WHERE] → [GROUP BY] → [HAVING] → [ORDER BY]
```

### Quoting Rules

| Type  | Quote? | Example                |
|-------|--------|------------------------|
| Text  | Yes    | `'Janet'`, `'Roosevelt'` |
| Date  | Yes    | `'2011-10-30'`        |
| Number| No     | `36200`, `43500.50`   |

**Date format:** `YYYY-MM-DD` (ISO 8601)

---

## 2. Data Definition

### CREATE TABLE

```sql
CREATE TABLE table_name (
    id bigserial PRIMARY KEY,
    name varchar(50) NOT NULL,
    amount numeric(10,2),
    created_at timestamptz
);
```

### Data Types (Essential)

| Category    | Use For              | Types                 |
|------------|----------------------|-----------------------|
| Text       | Most columns         | `varchar(n)`, `text`  |
| Whole #    | IDs, counts          | `integer`, `bigint`   |
| Auto-ID    | Primary keys         | `bigserial`           |
| Exact $    | Money                | `numeric(p,s)`        |
| Dates      | Events               | `date`, `timestamptz` |
| Duration   | Time spans           | `interval`            |

**Rules:** Use `numeric`/`decimal` for money (not float). Use `timestamptz` for timestamps. Preserve leading zeros with `varchar` for codes.

### Type Conversion

```sql
CAST(column AS numeric)   -- Standard
column::numeric           -- PostgreSQL shortcut
```

---

## 3. Querying Data

### SELECT Basics

```sql
SELECT * FROM table;                          -- All columns
SELECT col1, col2 FROM table;                 -- Specific columns
SELECT DISTINCT col FROM table;               -- Unique values
SELECT col AS alias FROM table;               -- Alias
```

### Filtering (WHERE)

```sql
WHERE col = 'value'           -- Equality
WHERE col > 100               -- Comparison
WHERE col BETWEEN 1 AND 10    -- Range (inclusive)
WHERE col IN ('a','b','c')    -- Set membership
WHERE col IS NULL             -- NULL check (use IS, not =)
WHERE col IS NOT NULL
WHERE col LIKE 'Sam%'         -- Pattern (% = any, _ = one)
WHERE col ILIKE 'sam%'        -- Case-insensitive (PostgreSQL)
WHERE a AND b                 -- Both true
WHERE a OR b                  -- Either true
WHERE NOT a                   -- Negation
```

### Sorting

```sql
ORDER BY col ASC;    -- Ascending (default)
ORDER BY col DESC;   -- Descending
ORDER BY col1, col2 DESC;
```

---

## 4. Math & Percentages

### Division

```sql
-- Integer division → integer (loses decimals)
SELECT 11 / 6;   -- 1

-- Decimal division → keep decimals
SELECT 11.0 / 6;
SELECT CAST(11 AS numeric) / 6;
```

### Formulas

```sql
-- Percentage: (part / whole) * 100
(CAST(part AS numeric) / whole) * 100

-- Percent change: ((new - old) / old) * 100
round((new - old) / old * 100, 1)

-- Rate per 1,000: (count / population) * 1000
(events::numeric / population) * 1000
```

### Rounding

```sql
round(value, decimal_places)
```

---

## 5. Aggregation

### Functions

| Function | Purpose | NULL |
|----------|---------|------|
| `count(*)` | All rows | Includes |
| `count(col)` | Non-NULL | Excludes |
| `count(DISTINCT col)` | Unique values | Excludes |
| `sum(col)` | Total | Ignores |
| `avg(col)` | Average | Ignores |
| `max(col)`, `min(col)` | Range | Ignores |

### GROUP BY

```sql
SELECT category, count(*), sum(amount)
FROM table
WHERE amount >= 0           -- Filter rows first
GROUP BY category
HAVING sum(amount) > 1000   -- Filter groups after
ORDER BY count(*) DESC;
```

**Rule:** Every non-aggregated column in `SELECT` must appear in `GROUP BY`.

### WHERE vs HAVING

- **WHERE** — filters rows before grouping.
- **HAVING** — filters groups after aggregation.

---

## 6. Joins

### Types

| Join | Returns |
|------|---------|
| `JOIN` / `INNER JOIN` | Only matching rows |
| `LEFT JOIN` | All left + matches (NULL if no match) |
| `RIGHT JOIN` | All right + matches |
| `FULL OUTER JOIN` | All from both |
| `CROSS JOIN` | All combinations (avoid on large tables) |

### Syntax

```sql
SELECT a.col1, b.col2
FROM table_a a
JOIN table_b b ON a.id = b.a_id;
```

### Keys

- **Primary Key**: unique row identifier; no NULLs.
- **Foreign Key**: references another table’s primary key.

### NULL in Joins

```sql
-- Rows in A with no match in B
SELECT a.*
FROM table_a a
LEFT JOIN table_b b ON a.id = b.id
WHERE b.id IS NULL;
```

---

## 7. Constraints & Indexes

### Constraints

| Constraint | Purpose |
|------------|---------|
| `PRIMARY KEY` | Unique identifier |
| `FOREIGN KEY ... REFERENCES` | Link to other table |
| `UNIQUE` | No duplicates (allows NULLs) |
| `CHECK (condition)` | Value rules |
| `NOT NULL` | Required column |

### Indexes

```sql
CREATE INDEX idx_name ON table (column);
DROP INDEX idx_name;
```

**When:** Columns used in JOINs and WHERE; verify with `EXPLAIN ANALYZE`.

---

## 8. Data Modification

### INSERT

```sql
INSERT INTO table (col1, col2)
VALUES ('a', 1), ('b', 2);
```

### UPDATE

```sql
UPDATE table SET col = 'value' WHERE condition;
-- Always use WHERE to avoid updating all rows
```

### DELETE

```sql
DELETE FROM table WHERE condition;
```

### ALTER TABLE

```sql
ALTER TABLE table ADD COLUMN col type;
ALTER TABLE table DROP COLUMN col;
ALTER TABLE table ALTER COLUMN col SET DATA TYPE type;
ALTER TABLE table RENAME TO new_name;
```

---

## 9. Transactions & Safety

### Transaction Block

```sql
START TRANSACTION;
-- Your statements
SELECT * FROM table;  -- Verify
COMMIT;   -- Save
-- or
ROLLBACK; -- Discard
```

### Backup Before Changes

```sql
CREATE TABLE backup AS SELECT * FROM table;
ALTER TABLE table ADD COLUMN col_copy type;
UPDATE table SET col_copy = col;
```

---

## 10. Import/Export

### COPY

```sql
-- Import
COPY table FROM '/path/file.csv' WITH (FORMAT CSV, HEADER);

-- Export
COPY table TO '/path/file.csv' WITH (FORMAT CSV, HEADER);

-- Export query results
COPY (SELECT * FROM table WHERE condition) TO '/path/file.csv' WITH (FORMAT CSV, HEADER);
```

---

## 11. Statistics & Analysis

### Correlation

```sql
SELECT corr(Y, X) FROM table;
-- Range: -1 to 1. Correlation ≠ causality
```

### Regression

```sql
SELECT regr_slope(Y, X), regr_intercept(Y, X), regr_r2(Y, X) FROM table;
-- Y = slope * X + intercept. r² = share of variation explained (0–1)
```

### Ranking

```sql
rank() OVER (ORDER BY col DESC)           -- With gaps after ties
dense_rank() OVER (ORDER BY col DESC)     -- No gaps
rank() OVER (PARTITION BY category ORDER BY col DESC)  -- Within groups
```

---

## 12. Dates & Times

### Types

| Type | Stores |
|------|--------|
| `date` | Date only |
| `time` | Time only |
| `timestamptz` | Date + time + time zone |
| `interval` | Duration |

### Functions

```sql
date_part('hour', ts_col)   -- hour, minute, year, week, quarter, epoch
make_date(2018, 2, 22)
current_timestamp / now()
```

### Time Zones

```sql
SHOW timezone;
SET timezone TO 'US/Eastern';
SELECT ts_col AT TIME ZONE 'Asia/Seoul';
```

### Duration

```sql
arrival - departure   -- interval
date + interval '5 days'
```

---

## Common Patterns (Cheat Sheet)

```sql
-- Find duplicates
SELECT col, count(*) FROM table GROUP BY col HAVING count(*) > 1;

-- Find missing (rows in A not in B)
SELECT a.* FROM a LEFT JOIN b ON a.id = b.id WHERE b.id IS NULL;

-- Percent change by group
SELECT cat, round((CAST(sum(new) AS numeric) - sum(old)) / sum(old) * 100, 1)
FROM t GROUP BY cat;

-- Median
percentile_cont(.5) WITHIN GROUP (ORDER BY col)

-- Top N per category
SELECT * FROM (
  SELECT *, rank() OVER (PARTITION BY cat ORDER BY val DESC) r
  FROM t
) x WHERE r <= 5;
```

---

## Best Practices Summary

1. Use `snake_case` for names.
2. Use `YYYY-MM-DD` for dates.
3. Use `numeric` for money, never float.
4. Use `timestamptz` for timestamps.
5. Cast to `numeric` when dividing integers.
6. Always use `WHERE` with `UPDATE`/`DELETE`.
7. Backup or use transactions before changes.
8. Index JOIN and WHERE columns.
9. Filter indicator values (e.g. negatives) before aggregation.
10. Use `LEFT JOIN` + `IS NULL` to find missing matches.
