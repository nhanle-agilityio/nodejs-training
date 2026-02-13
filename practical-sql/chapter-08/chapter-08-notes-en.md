# Chapter 8: Extracting Information by Grouping and Summarizing - Notes & Key Takeaways

## Quick Reference

### Aggregate Functions

| Function | Purpose | NULL Handling |
|----------|---------|---------------|
| `count(*)` | Count all rows | Includes NULL |
| `count(column)` | Count non-NULL values | Excludes NULL |
| `count(DISTINCT column)` | Count unique values | Excludes NULL |
| `max(column)` | Find maximum value | Ignores NULL |
| `min(column)` | Find minimum value | Ignores NULL |
| `sum(column)` | Sum numeric values | Ignores NULL |
| `avg(column)` | Calculate average | Ignores NULL |

### GROUP BY Syntax

```sql
SELECT column1, aggregate_function(column2)
FROM table_name
GROUP BY column1
ORDER BY aggregate_function(column2) DESC;
```

**Rules:**
- All non-aggregated columns must be in GROUP BY
- Can group by multiple columns
- ORDER BY can use aggregate functions or column aliases

### HAVING vs WHERE

| Clause | When Used | Filters |
|--------|-----------|---------|
| WHERE | Before grouping | Rows |
| HAVING | After grouping | Groups |

**Key Point:** Aggregate functions can't be used in WHERE clause

## Aggregate Functions

### count()

**Count all rows:**
```sql
SELECT count(*) FROM table_name;
```

**Count non-NULL values:**
```sql
SELECT count(column_name) FROM table_name;
```

**Count distinct values:**
```sql
SELECT count(DISTINCT column_name) FROM table_name;
```

**Example:**
```sql
SELECT count(libname) FROM pls_fy2014_pupld14a;        -- 9305
SELECT count(DISTINCT libname) FROM pls_fy2014_pupld14a; -- 8515
```

### max() and min()

**Find range:**
```sql
SELECT max(column_name), min(column_name)
FROM table_name;
```

**Use cases:**
- Understand data scope
- Identify data quality issues
- Find outliers

**Example:**
```sql
SELECT max(visits), min(visits) FROM pls_fy2014_pupld14a;
-- Result: max=17729020, min=-3
-- -3 indicates "not applicable" (data quality issue!)
```

### sum()

**Total numeric values:**
```sql
SELECT sum(column_name) FROM table_name;
```

**With filtering:**
```sql
SELECT sum(visits) AS total_visits
FROM pls_fy2014_pupld14a
WHERE visits >= 0;  -- Filter out indicator values
```

## GROUP BY

### Basic GROUP BY

**Eliminates duplicates (like DISTINCT):**
```sql
SELECT stabr
FROM pls_fy2014_pupld14a
GROUP BY stabr
ORDER BY stabr;
```

### GROUP BY with count()

**Count by category:**
```sql
SELECT stabr, count(*)
FROM pls_fy2014_pupld14a
GROUP BY stabr
ORDER BY count(*) DESC;
```

**Result shows top states:**
```
stabr | count
------|------
NY    | 756
IL    | 625
TX    | 556
```

### GROUP BY Multiple Columns

**Count unique combinations:**
```sql
SELECT stabr, stataddr, count(*)
FROM pls_fy2014_pupld14a
GROUP BY stabr, stataddr
ORDER BY stabr ASC, count(*) DESC;
```

**Result shows address change codes by state:**
```
stabr | stataddr | count
------|----------|------
AK    | 00       | 70
AK    | 15       | 10
AK    | 07       | 5
```

## Joining Tables with Aggregates

### Basic Join with sum()

```sql
SELECT sum(pls14.visits) AS visits_2014,
       sum(pls09.visits) AS visits_2009
FROM pls_fy2014_pupld14a pls14 
JOIN pls_fy2009_pupld09a pls09
ON pls14.fscskey = pls09.fscskey
WHERE pls14.visits >= 0 AND pls09.visits >= 0;
```

**Key points:**
- Use table aliases for readability
- Filter negative values before aggregating
- INNER JOIN only includes matching rows

### GROUP BY with Joined Tables

**Calculate percent change by state:**
```sql
SELECT pls14.stabr,
       sum(pls14.visits) AS visits_2014,
       sum(pls09.visits) AS visits_2009,
       round( (CAST(sum(pls14.visits) AS decimal(10,1)) - sum(pls09.visits)) /
              sum(pls09.visits) * 100, 2 ) AS pct_change
FROM pls_fy2014_pupld14a pls14 
JOIN pls_fy2009_pupld09a pls09
ON pls14.fscskey = pls09.fscskey
WHERE pls14.visits >= 0 AND pls09.visits >= 0
GROUP BY pls14.stabr
ORDER BY pct_change DESC;
```

**Percent change formula:**
```
((new_value - old_value) / old_value) * 100
```

## HAVING Clause

### Syntax

```sql
SELECT column, aggregate_function(column)
FROM table_name
WHERE condition  -- Filters rows
GROUP BY column
HAVING aggregate_function(column) > threshold  -- Filters groups
ORDER BY aggregate_function(column);
```

### Example: Filter Large States

```sql
SELECT pls14.stabr,
       sum(pls14.visits) AS visits_2014,
       sum(pls09.visits) AS visits_2009,
       round( (CAST(sum(pls14.visits) AS decimal(10,1)) - sum(pls09.visits)) /
              sum(pls09.visits) * 100, 2 ) AS pct_change
FROM pls_fy2014_pupld14a pls14 
JOIN pls_fy2009_pupld09a pls09
ON pls14.fscskey = pls09.fscskey
WHERE pls14.visits >= 0 AND pls09.visits >= 0
GROUP BY pls14.stabr
HAVING sum(pls14.visits) > 50000000  -- Only states with >50M visits
ORDER BY pct_change DESC;
```

**Result:** Only 6 largest states shown

## Data Quality Issues

### Negative Values as Indicators

**Problem:** Some surveys use negative numbers to indicate:
- `-1`: Nonresponse
- `-3`: Not applicable

**Solution:** Filter before aggregating
```sql
WHERE visits >= 0
```

**Better approach:** Use NULL and separate flag column

### Missing Values

**Check for missing values:**
```sql
SELECT count(*) AS total_rows,
       count(column_name) AS non_null_rows,
       count(*) - count(column_name) AS null_rows
FROM table_name;
```

## Common Patterns

### Pattern 1: Count by Category

```sql
SELECT category, count(*)
FROM table_name
GROUP BY category
ORDER BY count(*) DESC;
```

### Pattern 2: Sum with Filtering

```sql
SELECT category, sum(value)
FROM table_name
WHERE value >= 0  -- Filter indicators
GROUP BY category;
```

### Pattern 3: Percent Change Over Time

```sql
SELECT category,
       sum(new_value) AS new_sum,
       sum(old_value) AS old_sum,
       round( (CAST(sum(new_value) AS decimal(10,1)) - sum(old_value)) /
              sum(old_value) * 100, 2 ) AS pct_change
FROM new_table n JOIN old_table o
ON n.id = o.id
GROUP BY category
ORDER BY pct_change DESC;
```

### Pattern 4: Filter Groups

```sql
SELECT category, sum(value)
FROM table_name
GROUP BY category
HAVING sum(value) > threshold
ORDER BY sum(value) DESC;
```

## Key Takeaways

### Best Practices

1. ✅ Always verify row counts after import
2. ✅ Use `count(*)` vs `count(column)` to check for NULLs
3. ✅ Use `count(DISTINCT column)` to find unique values
4. ✅ Use `max()` and `min()` to identify data quality issues
5. ✅ Filter indicator values (negative numbers) before aggregating
6. ✅ Use GROUP BY with aggregate functions for summaries
7. ✅ Use HAVING to filter groups, WHERE to filter rows
8. ✅ Join tables when comparing across time periods
9. ✅ Calculate percent changes to identify trends
10. ✅ Consult domain experts for unexpected results

### Common Mistakes

❌ **Using aggregate function in WHERE:**
```sql
-- WRONG
SELECT category, sum(value)
FROM table_name
WHERE sum(value) > 1000;  -- Error!

-- CORRECT
SELECT category, sum(value)
FROM table_name
GROUP BY category
HAVING sum(value) > 1000;
```

❌ **Missing columns in GROUP BY:**
```sql
-- WRONG
SELECT category, subcategory, count(*)
FROM table_name
GROUP BY category;  -- Error! subcategory not in GROUP BY

-- CORRECT
SELECT category, subcategory, count(*)
FROM table_name
GROUP BY category, subcategory;
```

❌ **Not filtering indicator values:**
```sql
-- WRONG (includes -1, -3 as indicators)
SELECT sum(visits) FROM table_name;

-- CORRECT
SELECT sum(visits) FROM table_name
WHERE visits >= 0;
```

### When to Use Each

**count():**
- Verify data import
- Count categories
- Find unique values

**max() / min():**
- Understand data range
- Identify outliers
- Check data quality

**sum():**
- Total numeric values
- Compare totals across groups
- Calculate trends

**GROUP BY:**
- Summarize by category
- Count per group
- Compare groups

**HAVING:**
- Filter groups by aggregate results
- Exclude groups below/above thresholds
- Focus analysis on specific subsets

## Quick Checklist

When analyzing data:

- [ ] Verify row counts match documentation
- [ ] Check for missing values (`count(*)` vs `count(column)`)
- [ ] Identify unique values (`count(DISTINCT column)`)
- [ ] Check data range (`max()`, `min()`)
- [ ] Filter indicator values before aggregating
- [ ] Use GROUP BY for categorical summaries
- [ ] Use HAVING to filter groups
- [ ] Join tables for time comparisons
- [ ] Calculate percent changes for trends
- [ ] Consult experts for unexpected results
