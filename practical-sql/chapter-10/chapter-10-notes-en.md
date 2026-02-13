# Chapter 10: Statistical Functions in SQL - Notes & Key Takeaways

## Quick Reference

### Core Concepts
- **Statistical functions** in SQL help analyze relationships and patterns in data
- **Correlation** measures relationship strength between variables
- **Regression** predicts values based on relationships
- **Rankings** order data with numbered positions
- **Rates** normalize data for fair comparisons

## Key Functions

### Correlation: `corr(Y, X)`
```sql
SELECT corr(median_hh_income, pct_bachelors_higher) AS correlation
FROM acs_2011_2015_stats;
```

**Key Points:**
- Returns Pearson correlation coefficient (r)
- Range: -1 to 1
- Positive = direct relationship (both increase together)
- Negative = inverse relationship (one increases, other decreases)
- Near 0 = weak/no relationship

**Interpretation Guide:**
- 0 = No relationship
- 0.1-0.29 = Weak relationship
- 0.3-0.59 = Moderate relationship
- 0.6-0.99 = Strong to nearly perfect relationship
- 1 = Perfect relationship

**Important:** Correlation ≠ Causality!

### Regression Functions

#### `regr_slope(Y, X)`
```sql
SELECT regr_slope(median_hh_income, pct_bachelors_higher) AS slope
FROM acs_2011_2015_stats;
```
- Returns slope (b) of regression line
- Shows change in Y per unit change in X

#### `regr_intercept(Y, X)`
```sql
SELECT regr_intercept(median_hh_income, pct_bachelors_higher) AS y_intercept
FROM acs_2011_2015_stats;
```
- Returns y-intercept (a) of regression line
- Value of Y when X = 0

#### `regr_r2(Y, X)`
```sql
SELECT regr_r2(median_hh_income, pct_bachelors_higher) AS r_squared
FROM acs_2011_2015_stats;
```
- Returns coefficient of determination (r²)
- Range: 0 to 1
- Shows percentage of variation explained by independent variable
- Example: 0.465 = 47% of variation explained

**Regression Formula:** Y = bX + a

### Ranking Functions

#### `rank()`
```sql
SELECT company, rank() OVER (ORDER BY widget_output DESC)
FROM widget_companies;
```
- Includes gaps after ties
- Example: 1, 2, 3, 3, 5 (skips 4)

#### `dense_rank()`
```sql
SELECT company, dense_rank() OVER (ORDER BY widget_output DESC)
FROM widget_companies;
```
- No gaps after ties
- Example: 1, 2, 3, 3, 4 (no skip)

**Recommendation:** Use `rank()` for most scenarios (more accurate)

### Ranking Within Groups: `PARTITION BY`
```sql
SELECT 
    category,
    store,
    rank() OVER (PARTITION BY category ORDER BY unit_sales DESC)
FROM store_sales;
```
- Ranks within each category separately
- Useful for: top performers by department, best movies by genre, etc.

## Calculating Rates

### Formula
```
Rate per 1,000 = (Count / Population) × 1,000
```

### SQL Example
```sql
SELECT 
    city,
    round((property_crime::numeric / population) * 1000, 1) AS pc_per_1000
FROM fbi_crime_data_2015
WHERE population >= 500000
ORDER BY (property_crime::numeric / population) DESC;
```

**Key Points:**
- Always cast to `numeric` when dividing integers
- Use `round()` for readability
- Rates enable fair comparisons across different population sizes

## Common Patterns

### Rounding Correlation Values
```sql
SELECT round(corr(Y, X)::numeric, 2) AS correlation
FROM table_name;
```

### Multiple Correlations
```sql
SELECT
    round(corr(var1, var2)::numeric, 2) AS corr1,
    round(corr(var3, var4)::numeric, 2) AS corr2
FROM table_name;
```

### Complete Regression Analysis
```sql
SELECT 
    round(regr_slope(Y, X)::numeric, 2) AS slope,
    round(regr_intercept(Y, X)::numeric, 2) AS y_intercept,
    round(regr_r2(Y, X)::numeric, 3) AS r_squared
FROM table_name;
```

### Ranking with Multiple Columns
```sql
SELECT 
    column1,
    column2,
    rank() OVER (ORDER BY value_column DESC) AS overall_rank,
    rank() OVER (PARTITION BY category ORDER BY value_column DESC) AS category_rank
FROM table_name;
```

## Best Practices

### ✅ Do's
1. Use `corr()` for preliminary data exploration
2. Round correlation/regression values for readability
3. Use `rank()` for most ranking scenarios
4. Calculate rates when comparing different population sizes
5. Use `PARTITION BY` for rankings within groups
6. Cast to `numeric` when dividing integers for rates

### ❌ Don'ts
1. Don't confuse correlation with causality
2. Don't use raw counts for comparisons across different sizes
3. Don't skip statistical significance testing (for production)
4. Don't use `dense_rank()` when you need accurate position counts

## Important Caveats

### Correlation Limitations
- **Correlation ≠ Causality**: Strong correlation doesn't mean one causes the other
- **Statistical Significance**: Results should be tested for significance
- **Spurious Correlations**: Many variables correlate but have no meaning
- **Example**: Divorce rate in Maine vs. margarine consumption

### Regression Limitations
- Variables should follow standard distribution (bell curve)
- Additional tests required before accepting results
- SQL functions are preliminary - use specialized tools for rigorous analysis

### Rate Limitations
- FBI discourages rankings from crime data
- Many factors affect rates (population density, economy, climate)
- Incomplete reporting may affect data quality

## When to Use Each Function

| Function | Use When |
|----------|----------|
| `corr(Y, X)` | Measuring relationship strength, preliminary exploration |
| `regr_slope(Y, X)` | Predicting values, understanding change rates |
| `regr_intercept(Y, X)` | Finding baseline values, creating regression models |
| `regr_r2(Y, X)` | Measuring explained variation, assessing model fit |
| `rank()` | Creating numbered rankings, leaderboards |
| `dense_rank()` | Rankings without gaps (rarely needed) |
| `PARTITION BY` | Rankings within categories/groups |
| Rates | Comparing populations of different sizes |

## Data Types & Casting

### For Rate Calculations
```sql
-- Always cast to numeric when dividing integers
(property_crime::numeric / population) * 1000
```

### For Rounding
```sql
-- Cast to numeric before rounding
round(corr(Y, X)::numeric, 2)
round(regr_slope(Y, X)::numeric, 2)
```

## Example Queries

### Education vs. Income Correlation
```sql
SELECT corr(median_hh_income, pct_bachelors_higher) AS bachelors_income_r
FROM acs_2011_2015_stats;
-- Result: ~0.68 (strong positive relationship)
```

### Predicting Income from Education
```sql
SELECT 
    round(regr_slope(median_hh_income, pct_bachelors_higher)::numeric, 2) AS slope,
    round(regr_intercept(median_hh_income, pct_bachelors_higher)::numeric, 2) AS y_intercept
FROM acs_2011_2015_stats;
-- Use formula: Y = slope * X + y_intercept
-- Example: Y = 926.95 * 30 + 27901.15 = $55,710
```

### Company Rankings
```sql
SELECT 
    company,
    widget_output,
    rank() OVER (ORDER BY widget_output DESC) AS rank
FROM widget_companies;
```

### Store Rankings by Category
```sql
SELECT 
    category,
    store,
    unit_sales,
    rank() OVER (PARTITION BY category ORDER BY unit_sales DESC) AS rank
FROM store_sales;
```

### Crime Rates
```sql
SELECT 
    city,
    st,
    round((property_crime::numeric / population) * 1000, 1) AS pc_per_1000
FROM fbi_crime_data_2015
WHERE population >= 500000
ORDER BY pc_per_1000 DESC;
```

## Key Takeaways

1. **Statistical functions** provide powerful analysis without exporting data
2. **Correlation** measures relationships but doesn't prove causality
3. **Regression** predicts values using linear equations
4. **Rankings** order data with `rank()` or `dense_rank()`
5. **PARTITION BY** enables rankings within groups
6. **Rates** normalize data for fair comparisons
7. Always **round** correlation/regression values for readability
8. Always **cast to numeric** when dividing integers
9. Use SQL stats functions for **preliminary analysis**
10. Consider **statistical significance** for production use

## Memory Tips

- **corr()** = Correlation (relationship strength)
- **regr_** = Regression (prediction functions)
- **rank()** = Ranking with gaps (most common)
- **dense_rank()** = Ranking without gaps (rare)
- **PARTITION BY** = Rank within groups
- **Rate formula** = (Count / Population) × 1,000
- **r range** = -1 to 1 (negative = inverse, positive = direct)
- **r² range** = 0 to 1 (percentage explained)

## Next Chapter Preview

Chapter 11: Working with Dates and Times
- Date/time data types
- Extracting components
- Time zone handling
- Date calculations
