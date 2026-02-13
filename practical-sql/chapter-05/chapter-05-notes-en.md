# Chapter 5: Basic Math and Stats with SQL - Notes & Key Takeaways

## Quick Reference

### Math Operators

| Operator | Description | Example | Result |
|----------|-------------|---------|--------|
| `+` | Addition | `2 + 2` | 4 |
| `-` | Subtraction | `9 - 1` | 8 |
| `*` | Multiplication | `3 * 4` | 12 |
| `/` | Division | `11 / 6` | 1 (integer) |
| `/` | Decimal division | `11.0 / 6` | 1.83333 |
| `%` | Modulo (remainder) | `11 % 6` | 5 |
| `^` | Exponentiation | `3 ^ 4` | 81 |
| `\|/` | Square root | `\|/ 10` | √10 |
| `sqrt()` | Square root function | `sqrt(10)` | √10 |
| `\|\|/` | Cube root | `\|\|/ 10` | ∛10 |
| `!` | Factorial | `4 !` | 24 |

**Note:** Exponentiation, roots, and factorial are PostgreSQL-specific.

### Order of Operations

1. **Exponents and roots**
2. **Multiplication, division, modulo**
3. **Addition and subtraction**

**Use parentheses** to change order:
```sql
SELECT 7 + 8 * 9;        -- 79 (multiplication first)
SELECT (7 + 8) * 9;      -- 135 (addition first)
```

## Data Type Behavior

### Two-Number Operations (+, -, *, /)
- Two integers → integer
- Numeric on either side → numeric
- Floating-point involved → double precision

### Single-Number Operations (^, |/, ||/, !)
- Always return numeric or floating-point, even with integer input

### Forcing Decimal Division
```sql
SELECT 11.0 / 6;                    -- Use decimal value
SELECT CAST(11 AS numeric(3,1)) / 6;  -- CAST integer
```

## Column Calculations

### Basic Addition/Subtraction
```sql
SELECT col1, col2, col1 + col2 AS "Total"
FROM table_name;
```

### Using Column Aliases
```sql
SELECT p0010001 AS "Total Population",
       p0010003 AS "White Alone"
FROM us_counties_2010;
```

**Without alias:** PostgreSQL uses `?column?` label

### Validating Data
```sql
SELECT total_col,
       col1 + col2 + col3 AS "Sum",
       (col1 + col2 + col3) - total_col AS "Difference"
FROM table_name
ORDER BY "Difference" DESC;
```

## Percentages

### Formula
```
(part / whole) * 100
```

### SQL Example
```sql
SELECT (CAST(part_col AS numeric(8,1)) / whole_col) * 100 AS "pct"
FROM table_name;
```

**Key:** Must CAST to numeric for decimal division, otherwise result is 0

## Percent Change

### Formula
```
((new - old) / old) * 100
```

### SQL Example
```sql
SELECT round((new_col - old_col) / old_col * 100, 1) AS "pct_change"
FROM table_name;
```

**round() function:** `round(value, decimal_places)`

## Aggregate Functions

### sum()
```sql
SELECT sum(column_name) AS "Total"
FROM table_name;
```

### avg()
```sql
SELECT round(avg(column_name), 0) AS "Average"
FROM table_name;
```

**Note:** Use `round()` to format decimal results

## Median vs. Average

### Average
- Sum of all values / number of values
- Good for normally distributed data
- Sensitive to outliers

### Median
- Middle value in ordered set
- Better for skewed data or with outliers
- More robust indicator

**Test:** Compare average and median
- Close together → normally distributed (use average)
- Far apart → skewed (use median)

## Finding Median

### Using percentile_cont()
```sql
SELECT percentile_cont(.5)
WITHIN GROUP (ORDER BY column_name) AS "Median"
FROM table_name;
```

**Key:** Use `percentile_cont(.5)` NOT `percentile_disc(.5)`

### percentile_cont() vs. percentile_disc()
- **percentile_cont()**: Continuous values (can be decimal between numbers)
- **percentile_disc()**: Discrete values (rounded to actual number in set)

**For median:** Always use `percentile_cont(.5)`

### Example with Census Data
```sql
SELECT round(avg(p0010001), 0) AS "Average",
       percentile_cont(.5) WITHIN GROUP (ORDER BY p0010001) AS "Median"
FROM us_counties_2010;
```

**Result:**
- Average: 98,233
- Median: 25,857

**Interpretation:** Median much lower shows data is skewed (few very large counties push average up)

## Quartiles and Quantiles

### Finding Quartiles
```sql
SELECT percentile_cont(array[.25,.5,.75])
WITHIN GROUP (ORDER BY column_name) AS "quartiles"
FROM table_name;
```

**Result:** Array `{11104.5,25857,66699}`
- First quartile (25th percentile): 11,104.5
- Second quartile (median): 25,857
- Third quartile (75th percentile): 66,699

### Using unnest() to Display Rows
```sql
SELECT unnest(
    percentile_cont(array[.25,.5,.75])
    WITHIN GROUP (ORDER BY column_name)
) AS "quartiles"
FROM table_name;
```

**Result:** Each quartile in separate row

### Common Quantiles
- **Quartiles**: 4 groups (use `.25, .5, .75`)
- **Quintiles**: 5 groups (use `.2, .4, .6, .8`)
- **Deciles**: 10 groups (use `.1, .2, ..., .9`)

## Custom median() Function

### Creating the Function
```sql
CREATE OR REPLACE FUNCTION _final_median(anyarray)
RETURNS float8 AS
$$
WITH q AS
(
    SELECT val FROM unnest($1) val
    WHERE VAL IS NOT NULL
    ORDER BY 1
),
cnt AS (SELECT COUNT(*) AS c FROM q)
SELECT AVG(val)::float8
FROM (
    SELECT val FROM q
    LIMIT  2 - MOD((SELECT c FROM cnt), 2)
    OFFSET GREATEST(CEIL((SELECT c FROM cnt) / 2.0) - 1,0)
) q2;
$$
LANGUAGE sql IMMUTABLE;

CREATE AGGREGATE median(anyelement) (
    SFUNC=array_append,
    STYPE=anyarray,
    FINALFUNC=_final_median,
    INITCOND='{}'
);
```

### Using median()
```sql
SELECT median(column_name) AS "Median"
FROM table_name;
```

**Pros:** Easier syntax
**Cons:** PostgreSQL-specific, slower, harder to set up

**Recommendation:** Use `percentile_cont(.5)` for portability

## Mode

### Finding Most Frequent Value
```sql
SELECT mode() WITHIN GROUP (ORDER BY column_name)
FROM table_name;
```

**Note:** PostgreSQL-specific, not standard SQL

## Key Takeaways

### Best Practices
1. ✅ Always CAST to numeric for decimal division from integers
2. ✅ Use parentheses to control order of operations
3. ✅ Use column aliases (AS) for readable results
4. ✅ Validate imports with math checks
5. ✅ Calculate both average and median to understand distribution
6. ✅ Use `percentile_cont(.5)` for median (not `percentile_disc`)
7. ✅ Use `round()` to format numeric results
8. ✅ Use arrays with percentile functions for multiple quantiles
9. ✅ Use `unnest()` to display array results in rows

### When to Use Average vs. Median
- **Average**: Normally distributed data (bell curve)
- **Median**: Skewed data or with outliers
- **Compare both**: To understand data distribution

### Common Patterns

#### Percentage Calculation
```sql
(CAST(numerator AS numeric) / denominator) * 100
```

#### Percent Change
```sql
round((new - old) / old * 100, 1)
```

#### Data Validation
```sql
SELECT sum_col, col1 + col2 + col3 AS "Sum",
       (col1 + col2 + col3) - sum_col AS "Diff"
FROM table
WHERE (col1 + col2 + col3) - sum_col != 0;
```

#### Median with Aggregate
```sql
SELECT percentile_cont(.5) WITHIN GROUP (ORDER BY col) AS "Median"
FROM table;
```

## Memory Tips

- **Modulo %**: Returns remainder, useful for even/odd checks (`n % 2 = 0`)
- **CAST for decimals**: Always CAST when dividing integers for percentage
- **percentile_cont(.5)**: Use for median (continuous, averages middle values)
- **percentile_disc(.5)**: Discrete, rounds to actual number (not for median)
- **Order of operations**: Exponents → Multiply/Divide → Add/Subtract
- **Average vs Median**: Compare both to understand data distribution
- **round()**: Takes (value, decimal_places)
- **unnest()**: Converts array to rows for readability
