# Chapter 6: Joining Tables in a Relational Database - Notes & Key Takeaways

## Quick Reference

### Basic JOIN Syntax
```sql
SELECT *
FROM table_a JOIN table_b
ON table_a.key_column = table_b.foreign_key_column;
```

## Key Concepts

### Primary Keys
- Column(s) that uniquely identify each row
- Must have unique value for each row
- Cannot have missing values
- Defined with `CONSTRAINT name PRIMARY KEY (column)`

### Foreign Keys
- Column that references primary key in another table
- Value must exist in referenced table's primary key
- Can be empty (unlike primary key)
- Can contain duplicate values (unlike primary key)
- Defined with `REFERENCES table_name (column_name)`

### UNIQUE Constraints
- Ensures unique values in column(s)
- Can be single column or combination of columns
- Prevents duplicate data

## Join Types

| Join Type | Returns | When to Use |
|-----------|---------|-------------|
| **JOIN / INNER JOIN** | Rows with matches in both tables | Well-structured data, need only matching rows |
| **LEFT JOIN** | All rows from left + matches from right | Need all rows from left table, find missing values |
| **RIGHT JOIN** | All rows from right + matches from left | Need all rows from right table |
| **FULL OUTER JOIN** | All rows from both tables | Merge overlapping data, visualize matching degree |
| **CROSS JOIN** | All possible combinations | Use sparingly, only on small tables |

### JOIN (INNER JOIN)
```sql
SELECT *
FROM table_a JOIN table_b
ON table_a.id = table_b.id;
```
**Returns:** Only matching rows from both tables

### LEFT JOIN
```sql
SELECT *
FROM table_a LEFT JOIN table_b
ON table_a.id = table_b.id;
```
**Returns:** All rows from left table + matching rows from right (NULL for non-matches)

### RIGHT JOIN
```sql
SELECT *
FROM table_a RIGHT JOIN table_b
ON table_a.id = table_b.id;
```
**Returns:** All rows from right table + matching rows from left (NULL for non-matches)

### FULL OUTER JOIN
```sql
SELECT *
FROM table_a FULL OUTER JOIN table_b
ON table_a.id = table_b.id;
```
**Returns:** All rows from both tables (NULL for non-matches)

### CROSS JOIN
```sql
SELECT *
FROM table_a CROSS JOIN table_b;
```
**Returns:** Cartesian product (all combinations)
**Warning:** Avoid on large tables! (250K × 250K = 62.5 billion rows)

## NULL Values

### Understanding NULL
- Special value representing missing/unknown data
- Different from 0 or empty string `""`
- Can be used across all data types
- Appears in join results when no match found

### Finding Missing Values
```sql
SELECT *
FROM table_a LEFT JOIN table_b
ON table_a.id = table_b.id
WHERE table_b.id IS NULL;
```

### Finding Rows with Data
```sql
WHERE table_b.id IS NOT NULL;
```

## Table Relationships

### One-to-One
- One row in first table matches one row in second
- Example: State census data tables (one state = one row in each)

### One-to-Many
- One row in first table matches multiple rows in second
- Example: Department → Employees (one dept has many employees)

### Many-to-Many
- Multiple rows in first table match multiple rows in second
- Example: Players → Positions (each player can play multiple positions)

## Selecting Columns in Joins

### The Problem: Ambiguity
```sql
SELECT id  -- ERROR: ambiguous!
FROM table_a JOIN table_b
ON table_a.id = table_b.id;
```

### Solution: Table Prefix
```sql
SELECT table_a.id,
       table_a.name,
       table_b.description
FROM table_a JOIN table_b
ON table_a.id = table_b.id;
```

### Using Column Aliases
```sql
SELECT table_a.id AS a_id,
       table_a.name,
       table_b.description
FROM table_a JOIN table_b
ON table_a.id = table_b.id;
```

## Table Aliases

### Creating Aliases
```sql
SELECT a.id,
       a.name,
       b.description
FROM table_a AS a JOIN table_b AS b
ON a.id = b.id;
```

**Benefits:**
- Cleaner, more readable code
- Shorter syntax
- Easier to maintain

## Joining Multiple Tables

### Three-Table Join Example
```sql
SELECT lt.id, lt.name, en.enrollment, gr.grades
FROM schools_left AS lt 
LEFT JOIN schools_enrollment AS en
ON lt.id = en.id
LEFT JOIN schools_grades AS gr
ON lt.id = gr.id;
```

**Key Points:**
- Can join unlimited tables (check DB limits)
- Each join adds ON clause
- Can join on different columns
- Use aliases for readability

## Math on Joined Tables

### Example: Percent Change Over Time
```sql
SELECT c2010.geo_name,
       c2010.p0010001 AS pop_2010,
       c2000.p0010001 AS pop_2000,
       c2010.p0010001 - c2000.p0010001 AS raw_change,
       round((CAST(c2010.p0010001 AS numeric(8,1)) - c2000.p0010001)
       / c2000.p0010001 * 100, 1) AS pct_change
FROM us_counties_2010 c2010 
INNER JOIN us_counties_2000 c2000
ON c2010.state_fips = c2000.state_fips
AND c2010.county_fips = c2000.county_fips
ORDER BY pct_change DESC;
```

**Key Points:**
- Use table prefix/alias when referencing columns
- Can join on multiple columns (use AND)
- Can use inequality conditions (`<>`, `>`, `<`, etc.)
- Math operations work same as single-table queries

## Key Takeaways

### Best Practices
1. ✅ Always use table prefixes or aliases when selecting columns
2. ✅ Use appropriate join types based on data needs
3. ✅ Use LEFT/RIGHT JOIN when you need all rows from one table
4. ✅ Use INNER JOIN when you only need matching rows
5. ✅ Use IS NULL to find missing values
6. ✅ Use table aliases for cleaner code
7. ✅ Join on multiple columns when needed for unique identification
8. ✅ Validate data quality by checking for missing matches
9. ✅ Understand table relationships before writing joins
10. ✅ Use CROSS JOIN sparingly and only on small tables

### Common Patterns

#### Basic Join
```sql
SELECT t1.col1, t2.col2
FROM table1 t1
JOIN table2 t2 ON t1.id = t2.id;
```

#### Left Join with NULL Check
```sql
SELECT t1.*
FROM table1 t1
LEFT JOIN table2 t2 ON t1.id = t2.id
WHERE t2.id IS NULL;
```

#### Multiple Table Join
```sql
SELECT a.col1, b.col2, c.col3
FROM table_a a
JOIN table_b b ON a.id = b.a_id
JOIN table_c c ON b.id = c.b_id;
```

#### Join on Multiple Columns
```sql
SELECT *
FROM table_a a
JOIN table_b b 
ON a.state_code = b.state_code
AND a.county_code = b.county_code;
```

## Memory Tips

- **JOIN = INNER JOIN**: Returns only matching rows
- **LEFT JOIN**: Keep all left rows, add right matches (NULL if no match)
- **RIGHT JOIN**: Keep all right rows, add left matches (NULL if no match)
- **FULL OUTER JOIN**: Keep all rows from both (NULL for non-matches)
- **CROSS JOIN**: All combinations (dangerous on large tables!)
- **NULL**: Missing/unknown value (use IS NULL, not = NULL)
- **Table aliases**: Use for cleaner code (AS keyword optional)
- **Multiple columns**: Join on multiple columns with AND
- **Primary key**: Unique identifier (one per table)
- **Foreign key**: References primary key in another table
