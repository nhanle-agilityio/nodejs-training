# Chapter 5: Try It Yourself — Exercises & Solutions

## Exercise 1

**Task:** Write a SQL statement for calculating the area of a circle whose radius is 5 inches. (If you don't remember the formula, it's an easy web search.) Do you need parentheses in your calculation? Why or why not?

### Suggested Solution

```sql
SELECT pi() * 5 ^ 2 AS area_circle;
-- Or: SELECT 3.141592653589793 * 5 * 5 AS area_circle;
```

**Formula:** Area = πr²

**Parentheses:** Needed if mixing operators — e.g. `pi() * (5 ^ 2)` keeps exponentiation before multiplication. With `*` and `^`, exponentiation has higher precedence, so `5 ^ 2` is evaluated first; parentheses improve clarity.

---

## Exercise 2

**Task:** Using the 2010 Census county data, find out which New York state county has the highest percentage of the population that identified as "American Indian/Alaska Native Alone." What can you learn about that county from online research that explains the relatively large proportion of American Indian population compared with other New York counties?

### Suggested Solution

```sql
SELECT geo_name, state_us_abbreviation,
       p0010001 AS total_pop,
       p0010005 AS american_indian_alone,
       round((CAST(p0010005 AS numeric(10,2)) / p0010001) * 100, 2) AS pct_american_indian
FROM us_counties_2010
WHERE state_us_abbreviation = 'NY'
ORDER BY pct_american_indian DESC
LIMIT 1;
```

**Note:** Column name for "American Indian/Alaska Native Alone" in Census data is typically `p0010005`. Verify against the data dictionary. Franklin County often ranks high due to the St. Regis Mohawk Reservation.

---

## Exercise 3

**Task:** Was the 2010 median county population higher in California or New York?

### Suggested Solution

```sql
SELECT state_us_abbreviation,
       percentile_cont(.5) WITHIN GROUP (ORDER BY p0010001) AS median_pop
FROM us_counties_2010
WHERE state_us_abbreviation IN ('CA', 'NY')
GROUP BY state_us_abbreviation;
```

Compare the two median values from the result.
