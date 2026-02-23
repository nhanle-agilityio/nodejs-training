# Practice Project: Personal Reading Log

A focused practice project to reinforce SQL fundamentals from **Practical SQL Chapters 1–11**.

## Quick Start

1. **Create the database** (in psql or pgAdmin):
   ```sql
   CREATE DATABASE reading_log;
   ```
2. **Run the setup script** `02-setup-and-data.sql` — creates tables and inserts sample data.
3. **Work through the tasks** in `03-tasks.md` — try to write SQL yourself.
4. **Check solutions** in `04-solutions.sql` when needed.

## Files

| File | Purpose |
|------|---------|
| `01-project-overview.md` | Objectives and concepts covered |
| `02-setup-and-data.sql` | Run first — creates schema and sample data |
| `03-tasks.md` | 8 task groups (write your own SQL) |
| `04-solutions.sql` | Reference solutions |
| `README.md` | This file |

## What You'll Practice

- **DDL:** CREATE TABLE, constraints, indexes
- **DML:** INSERT, SELECT, UPDATE
- **Querying:** WHERE, ORDER BY, JOIN, GROUP BY, HAVING
- **Aggregates:** count, avg, percentile_cont
- **Dates:** `date_part`, intervals
- **Analysis:** rank(), rates, correlation
- **Safety:** Backup, transactions, ROLLBACK

## Estimated Time

**1–2 hours** depending on how much you attempt without peeking at solutions.

## Tips

- Start each task by writing SQL from scratch.
- Use the `sql-fundamentals-reference-en.md` as a quick reference.
- For Task 8 (COPY), change the output path to a directory you can write to (e.g. `/tmp/` on Linux, `C:\Temp\` on Windows).
