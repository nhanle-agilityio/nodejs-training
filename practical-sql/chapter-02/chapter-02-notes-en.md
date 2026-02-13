# Chapter 2: Beginning Data Exploration with SELECT - Notes & Key Takeaways

## Quick Reference

### Basic SELECT Syntax

```sql
-- Select all columns
SELECT * FROM table_name;

-- Select specific columns
SELECT column1, column2 FROM table_name;

-- Select distinct values
SELECT DISTINCT column FROM table_name;

-- Select with sorting
SELECT column1, column2 
FROM table_name 
ORDER BY column1 DESC;

-- Select with filtering
SELECT column1, column2 
FROM table_name 
WHERE condition;

-- Complete query
SELECT column1, column2 
FROM table_name 
WHERE condition 
ORDER BY column1 DESC;
```

## Key SQL Keywords

| Keyword | Purpose | Example |
|---------|---------|---------|
| `SELECT` | Retrieves data from tables | `SELECT * FROM teachers` |
| `FROM` | Specifies source table | `FROM teachers` |
| `DISTINCT` | Returns unique values only | `SELECT DISTINCT school` |
| `ORDER BY` | Sorts results | `ORDER BY salary DESC` |
| `WHERE` | Filters rows | `WHERE salary > 40000` |
| `ASC` | Ascending order (default) | `ORDER BY name ASC` |
| `DESC` | Descending order | `ORDER BY salary DESC` |
| `AND` | Both conditions must be true | `WHERE x = 1 AND y = 2` |
| `OR` | At least one condition true | `WHERE x = 1 OR y = 2` |
| `NOT` | Negates condition | `WHERE NOT x = 1` |

## Comparison Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `=` | Equal to | `WHERE name = 'John'` |
| `<>` or `!=` | Not equal to | `WHERE name <> 'John'` |
| `>` | Greater than | `WHERE salary > 50000` |
| `<` | Less than | `WHERE age < 30` |
| `>=` | Greater than or equal | `WHERE salary >= 50000` |
| `<=` | Less than or equal | `WHERE age <= 30` |
| `BETWEEN` | Within range (inclusive) | `WHERE salary BETWEEN 40000 AND 60000` |
| `IN` | Match one of set | `WHERE name IN ('John', 'Jane')` |
| `LIKE` | Pattern match (case sensitive) | `WHERE name LIKE 'Sam%'` |
| `ILIKE` | Pattern match (case insensitive) | `WHERE name ILIKE 'sam%'` |

## Pattern Matching with LIKE/ILIKE

### Wildcard Characters
- `%` - Matches one or more characters
- `_` - Matches exactly one character

### Pattern Examples
```sql
LIKE 'b%'      -- Starts with 'b'
LIKE '%ak%'    -- Contains 'ak'
LIKE '_aker'   -- 5 chars ending with 'aker'
LIKE 'ba_er'   -- 'ba' + any char + 'er'
```

### LIKE vs ILIKE
- `LIKE` - Case sensitive (ANSI SQL standard)
- `ILIKE` - Case insensitive (PostgreSQL only)

**Best Practice:** Use `ILIKE` to avoid missing results due to case variations.

## Logical Operators

### AND
```sql
WHERE condition1 AND condition2
-- Both conditions must be true
```

### OR
```sql
WHERE condition1 OR condition2
-- At least one condition must be true
```

### Parentheses for Grouping
```sql
WHERE school = 'Roosevelt' 
AND (salary < 38000 OR salary > 40000)
-- Groups OR conditions together
```

**Important:** Use parentheses to clarify complex logic and ensure correct evaluation order.

## ORDER BY

### Single Column
```sql
ORDER BY column_name ASC   -- Ascending (default)
ORDER BY column_name DESC  -- Descending
```

### Multiple Columns
```sql
ORDER BY column1 ASC, column2 DESC
-- Sorts by column1 first, then column2
```

**Note:** You can sort by columns not in SELECT list, but it's clearer to include them.

## DISTINCT

### Single Column
```sql
SELECT DISTINCT school FROM teachers;
-- Returns unique school names
```

### Multiple Columns
```sql
SELECT DISTINCT school, salary FROM teachers;
-- Returns unique combinations of school and salary
```

**Use Case:** Finding unique values helps assess data quality and spot inconsistencies.

## Complete Query Structure

### Standard Order
```sql
SELECT column_list
FROM table_name
WHERE conditions
ORDER BY column_list;
```

**Important:** SQL requires this specific keyword order.

## Common Query Patterns

### Find All Records
```sql
SELECT * FROM table_name;
```

### Find Specific Columns
```sql
SELECT column1, column2 FROM table_name;
```

### Find Unique Values
```sql
SELECT DISTINCT column FROM table_name;
```

### Filter by Exact Match
```sql
SELECT * FROM table_name WHERE column = 'value';
```

### Filter by Range
```sql
SELECT * FROM table_name 
WHERE column BETWEEN value1 AND value2;
```

### Filter by Pattern
```sql
SELECT * FROM table_name 
WHERE column ILIKE 'pattern%';
```

### Filter with Multiple Conditions
```sql
SELECT * FROM table_name 
WHERE condition1 AND condition2;
```

### Sort Results
```sql
SELECT * FROM table_name 
ORDER BY column DESC;
```

### Complete Example
```sql
SELECT first_name, last_name, salary
FROM teachers
WHERE school LIKE '%Roosevelt%'
AND salary > 40000
ORDER BY salary DESC;
```

## Data Quality Assessment Tips

When exploring data:
1. ✅ Start with `SELECT *` to see all data
2. ✅ Use `DISTINCT` to find unique values
3. ✅ Check for spelling variations
4. ✅ Verify date formats
5. ✅ Look for missing values
6. ✅ Check for unexpected patterns

## Text Sorting Behavior

PostgreSQL sorts characters in this order (UTF-8):
1. Punctuation marks
2. Numbers 0-9
3. More punctuation
4. Capital letters A-Z
5. More punctuation
6. Lowercase letters a-z
7. Special characters

**Result:** "Ladybug" appears before "ladybug" in sorts.

## Performance Considerations

- ⚠️ `LIKE` and `ILIKE` can be slow on large tables
- ✅ Use indexes to improve pattern matching performance
- ✅ Limit columns in SELECT to reduce data transfer
- ✅ Use specific WHERE conditions to reduce rows processed

## Memory Aids

### SELECT Statement Pattern
```
SELECT [DISTINCT] columns
FROM table
[WHERE conditions]
[ORDER BY columns [ASC|DESC]];
```

### Operator Precedence
1. Parentheses `()`
2. NOT
3. AND
4. OR

### BETWEEN is Inclusive
```sql
WHERE x BETWEEN 1 AND 10
-- Includes both 1 and 10
```

### DISTINCT with Multiple Columns
- Returns unique **combinations** of values
- Not unique values per column separately

## Common Mistakes

### ❌ Wrong Order
```sql
WHERE column ORDER BY column  -- Wrong!
```

### ✅ Correct Order
```sql
ORDER BY column WHERE column  -- Still wrong!
```

### ✅ Correct
```sql
WHERE column ORDER BY column  -- Actually, this is wrong too!
```

**Correct:**
```sql
SELECT * FROM table 
WHERE condition 
ORDER BY column;
```

### ❌ Forgetting Quotes for Text
```sql
WHERE name = John  -- Wrong! (John is treated as column)
WHERE name = 'John' -- Correct
```

### ❌ Case Sensitivity with LIKE
```sql
WHERE name LIKE 'sam%'  -- Might miss 'Sam' or 'SAM'
WHERE name ILIKE 'sam%' -- Catches all variations
```

## Quick Examples

### Find Teachers at Specific School
```sql
SELECT * FROM teachers 
WHERE school = 'Myers Middle School';
```

### Find High-Paid Teachers
```sql
SELECT first_name, last_name, salary 
FROM teachers 
WHERE salary >= 50000 
ORDER BY salary DESC;
```

### Find Teachers Hired After Date
```sql
SELECT * FROM teachers 
WHERE hire_date >= '2010-01-01' 
ORDER BY hire_date DESC;
```

### Find Teachers by Name Pattern
```sql
SELECT * FROM teachers 
WHERE first_name ILIKE 'sam%';
```

### Find Teachers in Salary Range
```sql
SELECT * FROM teachers 
WHERE salary BETWEEN 40000 AND 60000;
```

### Complex Query
```sql
SELECT first_name, last_name, school, salary
FROM teachers
WHERE school LIKE '%Roosevelt%'
AND (salary < 38000 OR salary > 40000)
ORDER BY school ASC, salary DESC;
```

## Key Takeaways

1. ✅ **SELECT** retrieves data, **FROM** specifies source
2. ✅ **DISTINCT** eliminates duplicates
3. ✅ **ORDER BY** sorts results (ASC default, DESC for reverse)
4. ✅ **WHERE** filters rows based on conditions
5. ✅ **LIKE/ILIKE** for pattern matching (use ILIKE for case-insensitive)
6. ✅ **AND/OR** combine conditions (use parentheses for clarity)
7. ✅ **BETWEEN** is inclusive of both endpoints
8. ✅ Follow keyword order: SELECT → FROM → WHERE → ORDER BY
9. ✅ Use quotes for text values, not for numbers
10. ✅ Start broad (`SELECT *`), then narrow down

## Next Steps
- Chapter 3: Understanding Data Types
- Practice with different WHERE conditions
- Experiment with ORDER BY on multiple columns
- Try combining DISTINCT with WHERE and ORDER BY
