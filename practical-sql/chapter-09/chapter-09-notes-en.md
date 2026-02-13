# Chapter 9: Inspecting and Modifying Data - Notes & Key Takeaways

## Quick Reference

### Dirty Data Issues

| Issue | How to Find | How to Fix |
|-------|-------------|------------|
| Missing values | `WHERE column IS NULL` | `UPDATE ... SET column = value WHERE ...` |
| Duplicate addresses | `GROUP BY ... HAVING count(*) > 1` | Investigate and decide |
| Inconsistent spelling | `GROUP BY column ORDER BY column` | `UPDATE ... SET column = 'standard' WHERE column LIKE 'pattern%'` |
| Malformed values | `length(column)` | `UPDATE ... SET column = 'prefix' \|\| column` |

### ALTER TABLE Commands

| Operation | Syntax |
|-----------|--------|
| Add column | `ALTER TABLE table ADD COLUMN column data_type;` |
| Drop column | `ALTER TABLE table DROP COLUMN column;` |
| Change data type | `ALTER TABLE table ALTER COLUMN column SET DATA TYPE data_type;` |
| Add NOT NULL | `ALTER TABLE table ALTER COLUMN column SET NOT NULL;` |
| Drop NOT NULL | `ALTER TABLE table ALTER COLUMN column DROP NOT NULL;` |
| Rename table | `ALTER TABLE table RENAME TO new_name;` |

### UPDATE Syntax

**Basic:**
```sql
UPDATE table SET column = value;
```

**With WHERE:**
```sql
UPDATE table SET column = value WHERE condition;
```

**Multiple columns:**
```sql
UPDATE table 
SET column_a = value_a,
    column_b = value_b
WHERE condition;
```

**From another table (ANSI):**
```sql
UPDATE table
SET column = (SELECT column FROM table_b WHERE ...)
WHERE EXISTS (SELECT column FROM table_b WHERE ...);
```

**From another table (PostgreSQL):**
```sql
UPDATE table
SET column = table_b.column
FROM table_b
WHERE table.column = table_b.column;
```

### DELETE Syntax

**Delete all rows:**
```sql
DELETE FROM table_name;
```

**Delete specific rows:**
```sql
DELETE FROM table_name WHERE condition;
```

### Transaction Blocks

```sql
START TRANSACTION;  -- or BEGIN
-- Your SQL statements here
SELECT * FROM table;  -- Verify changes
COMMIT;  -- Save changes
-- or
ROLLBACK;  -- Discard changes
```

## Interviewing Data

### Finding Duplicate Addresses

```sql
SELECT company, street, city, st, count(*) AS address_count
FROM table_name
GROUP BY company, street, city, st
HAVING count(*) > 1
ORDER BY company, street, city, st;
```

### Finding Missing Values

```sql
-- Count NULL values
SELECT st, count(*) AS st_count
FROM table_name
GROUP BY st
ORDER BY st;

-- Find rows with NULL
SELECT * FROM table_name
WHERE column_name IS NULL;
```

**Note:** Use `ORDER BY column NULLS FIRST` or `NULLS LAST` to control NULL position.

### Finding Inconsistent Values

```sql
SELECT column_name, count(*) AS count
FROM table_name
GROUP BY column_name
ORDER BY column_name ASC;
```

### Finding Malformed Values

```sql
-- Check length distribution
SELECT length(column_name), count(*) AS length_count
FROM table_name
GROUP BY length(column_name)
ORDER BY length(column_name) ASC;

-- Find affected rows
SELECT st, count(*) AS st_count
FROM table_name
WHERE length(zip) < 5
GROUP BY st
ORDER BY st ASC;
```

## Backup Strategies

### Creating Table Backup

```sql
CREATE TABLE table_backup AS
SELECT * FROM table;
```

**Verify:**
```sql
SELECT
    (SELECT count(*) FROM table) AS original,
    (SELECT count(*) FROM table_backup) AS backup;
```

**Note:** Indexes are NOT copied. Create them separately if needed.

### Creating Column Copy

```sql
ALTER TABLE table ADD COLUMN column_copy data_type;
UPDATE table SET column_copy = column;
```

**Use case:** Extra protection before modifying critical columns.

## Restoring Missing Values

### Step-by-Step Process

1. **Create column copy:**
```sql
ALTER TABLE table ADD COLUMN st_copy varchar(2);
UPDATE table SET st_copy = st;
```

2. **Update missing values:**
```sql
UPDATE table SET st = 'MN' WHERE est_number = 'V18677A';
UPDATE table SET st = 'AL' WHERE est_number = 'M45319+P45319';
UPDATE table SET st = 'WI' WHERE est_number = 'M263A+P263A+V263A';
```

3. **Verify:**
```sql
SELECT * FROM table WHERE st IS NULL;  -- Should return nothing
```

### Restoring from Backup

**From column copy:**
```sql
UPDATE table SET st = st_copy;
```

**From backup table:**
```sql
UPDATE table original
SET st = backup.st
FROM table_backup backup
WHERE original.est_number = backup.est_number;
```

## Standardizing Values

### Creating Standardized Column

```sql
ALTER TABLE table ADD COLUMN company_standard varchar(100);
UPDATE table SET company_standard = company;
```

### Updating with LIKE

```sql
UPDATE table
SET company_standard = 'Armour-Eckrich Meats'
WHERE company LIKE 'Armour%';
```

**Pattern matching:**
- `LIKE 'Armour%'` - Starts with "Armour"
- `LIKE '%Armour'` - Ends with "Armour"
- `LIKE '%Armour%'` - Contains "Armour"

## Repairing Values with Concatenation

### Understanding Concatenation

The `||` operator concatenates strings:
```sql
SELECT 'abc' || '123';  -- Result: 'abc123'
```

### Repairing ZIP Codes

**Step 1: Create backup**
```sql
ALTER TABLE table ADD COLUMN zip_copy varchar(5);
UPDATE table SET zip_copy = zip;
```

**Step 2: Restore two leading zeros (PR, VI)**
```sql
UPDATE table
SET zip = '00' || zip
WHERE st IN('PR','VI') AND length(zip) = 3;
```

**Step 3: Restore one leading zero (New England)**
```sql
UPDATE table
SET zip = '0' || zip
WHERE st IN('CT','MA','ME','NH','NJ','RI','VT') AND length(zip) = 4;
```

**Step 4: Verify**
```sql
SELECT length(zip), count(*) AS length_count
FROM table
GROUP BY length(zip)
ORDER BY length(zip) ASC;
-- Should show all rows with length = 5
```

## Updating Across Tables

### Creating Reference Table

```sql
CREATE TABLE state_regions (
    st varchar(2) CONSTRAINT st_key PRIMARY KEY,
    region varchar(20) NOT NULL
);

COPY state_regions FROM 'path/to/file.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ',');
```

### Updating with Subquery

```sql
ALTER TABLE table ADD COLUMN inspection_date date;

UPDATE table inspect
SET inspection_date = '2019-12-01'
WHERE EXISTS (SELECT state_regions.region
              FROM state_regions
              WHERE inspect.st = state_regions.st
              AND state_regions.region = 'New England');
```

**How it works:**
- Uses WHERE EXISTS with subquery
- Joins tables using matching columns
- Updates only matching rows

## Deleting Data

### Deleting Rows

```sql
-- Delete all rows
DELETE FROM table_name;

-- Delete specific rows
DELETE FROM table_name WHERE condition;

-- Example: Remove territories
DELETE FROM table_name WHERE st IN('PR','VI');
```

**Warning:** No undo! Always backup first.

### Dropping Columns

```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

**Warning:** All data in column is permanently deleted.

### Dropping Tables

```sql
DROP TABLE table_name;
```

**Warning:** Entire table and all data permanently deleted.

**Note:** If table has foreign key constraints, resolve them first.

## Transaction Blocks

### Syntax

```sql
START TRANSACTION;  -- or BEGIN
-- SQL statements
SELECT * FROM table;  -- Verify
COMMIT;  -- Save
-- or
ROLLBACK;  -- Discard
```

### Example: Testing Updates

```sql
START TRANSACTION;
UPDATE table SET company = 'New Name' WHERE company = 'Old Name';
SELECT company FROM table WHERE company LIKE 'New%';
ROLLBACK;  -- Discard if mistake found
```

**Benefits:**
- Test changes before committing
- Rollback mistakes easily
- Changes invisible to others until COMMIT

## Performance Optimization

### Problem with Large Updates

When updating large tables, PostgreSQL creates new row versions but doesn't delete old ones, inflating table size.

### Solution: Copy Table Instead

**Step 1: Create table with new column**
```sql
CREATE TABLE table_backup AS
SELECT *,
       '2018-02-07'::date AS reviewed_date
FROM table;
```

**Step 2: Swap table names**
```sql
ALTER TABLE table RENAME TO table_temp;
ALTER TABLE table_backup RENAME TO table;
ALTER TABLE table_temp RENAME TO table_backup;
```

**Benefits:**
- Avoids row updates
- Prevents table size inflation
- Faster for large tables

## Key Takeaways

### Best Practices

1. ✅ **Always backup before modifying**
   - Create table backup: `CREATE TABLE backup AS SELECT * FROM table;`
   - Create column copy for critical columns

2. ✅ **Use transaction blocks for testing**
   - Test changes before committing
   - Rollback if mistakes found

3. ✅ **Verify changes before committing**
   - Use SELECT to check results
   - Count rows before and after

4. ✅ **Use WHERE clauses carefully**
   - Always specify conditions in UPDATE/DELETE
   - Test with SELECT first

5. ✅ **Keep original columns**
   - Create standardized versions, don't replace originals
   - Allows comparison and rollback

6. ✅ **Document all changes**
   - Keep track of what was modified and why

### Common Patterns

**Backup before modification:**
```sql
CREATE TABLE table_backup AS SELECT * FROM table;
ALTER TABLE table ADD COLUMN column_copy data_type;
UPDATE table SET column_copy = column;
```

**Update missing values:**
```sql
UPDATE table SET column = 'value' WHERE column IS NULL;
```

**Standardize values:**
```sql
ALTER TABLE table ADD COLUMN column_standard data_type;
UPDATE table SET column_standard = column;
UPDATE table SET column_standard = 'standard' WHERE column LIKE 'pattern%';
```

**Repair with concatenation:**
```sql
UPDATE table SET column = 'prefix' || column WHERE condition;
```

**Test with transaction:**
```sql
START TRANSACTION;
UPDATE table SET column = value WHERE condition;
SELECT * FROM table WHERE condition;
ROLLBACK;  -- or COMMIT;
```

### When to Use Each Command

**ALTER TABLE:**
- Adding/removing columns
- Changing data types
- Adding/removing constraints
- Renaming tables

**UPDATE:**
- Fixing missing values
- Standardizing inconsistent data
- Repairing malformed values
- Updating based on other tables

**DELETE:**
- Removing erroneous data
- Cleaning up test data
- Removing outdated records

**Transaction Blocks:**
- Testing changes
- Ensuring consistency
- Rolling back mistakes

### Data Quality Checklist

Before modifying data:

- [ ] Create table backup
- [ ] Create column copies for critical columns
- [ ] Check for missing values (`IS NULL`)
- [ ] Check for duplicates (`GROUP BY ... HAVING count(*) > 1`)
- [ ] Check for inconsistent values (`GROUP BY column`)
- [ ] Check for malformed values (`length()`)
- [ ] Use transaction blocks for testing
- [ ] Verify changes with SELECT
- [ ] Document all modifications

### Common Mistakes

❌ **Updating without WHERE:**
```sql
-- WRONG - Updates ALL rows!
UPDATE table SET column = 'value';

-- CORRECT
UPDATE table SET column = 'value' WHERE condition;
```

❌ **Deleting without backup:**
```sql
-- WRONG - No way to recover!
DELETE FROM table WHERE condition;

-- CORRECT
CREATE TABLE backup AS SELECT * FROM table;
DELETE FROM table WHERE condition;
```

❌ **Not testing in transaction:**
```sql
-- WRONG - Changes are permanent!
UPDATE table SET column = 'value' WHERE condition;

-- CORRECT
START TRANSACTION;
UPDATE table SET column = 'value' WHERE condition;
SELECT * FROM table WHERE condition;  -- Verify
COMMIT;  -- or ROLLBACK;
```

## Quick Reference: Common Tasks

### Task: Fix Missing State Codes

```sql
-- 1. Backup
ALTER TABLE table ADD COLUMN st_copy varchar(2);
UPDATE table SET st_copy = st;

-- 2. Update
UPDATE table SET st = 'MN' WHERE est_number = 'V18677A';

-- 3. Verify
SELECT * FROM table WHERE st IS NULL;
```

### Task: Standardize Company Names

```sql
-- 1. Create standardized column
ALTER TABLE table ADD COLUMN company_standard varchar(100);
UPDATE table SET company_standard = company;

-- 2. Update pattern
UPDATE table SET company_standard = 'Standard Name'
WHERE company LIKE 'Pattern%';

-- 3. Verify
SELECT company, company_standard FROM table WHERE company LIKE 'Pattern%';
```

### Task: Repair ZIP Codes

```sql
-- 1. Backup
ALTER TABLE table ADD COLUMN zip_copy varchar(5);
UPDATE table SET zip_copy = zip;

-- 2. Restore zeros
UPDATE table SET zip = '00' || zip WHERE st IN('PR','VI') AND length(zip) = 3;
UPDATE table SET zip = '0' || zip WHERE st IN('CT','MA','ME','NH','NJ','RI','VT') AND length(zip) = 4;

-- 3. Verify
SELECT length(zip), count(*) FROM table GROUP BY length(zip);
```

### Task: Update from Another Table

```sql
-- 1. Create reference table
CREATE TABLE reference_table (
    key_column varchar(50) PRIMARY KEY,
    value_column varchar(50)
);

-- 2. Update
UPDATE main_table m
SET column = r.value_column
FROM reference_table r
WHERE m.key_column = r.key_column;
```
