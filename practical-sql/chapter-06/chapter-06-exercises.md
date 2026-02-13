# Chapter 6: Try It Yourself — Exercises & Solutions

## Exercise 1

**Task:** The table `us_counties_2010` contains 3,143 rows, and `us_counties_2000` has 3,141. That reflects the ongoing adjustments to county-level geographies. Using appropriate joins and the NULL value, identify which counties don't exist in both tables. For fun, search online to find out why they're missing.

### Suggested Solution

```sql
-- Counties in 2010 but not in 2000
SELECT c2010.geo_name, c2010.state_us_abbreviation, c2010.state_fips, c2010.county_fips
FROM us_counties_2010 c2010
LEFT JOIN us_counties_2000 c2000
ON c2010.state_fips = c2000.state_fips AND c2010.county_fips = c2000.county_fips
WHERE c2000.geo_name IS NULL;

-- Counties in 2000 but not in 2010
SELECT c2000.geo_name, c2000.state_us_abbreviation, c2000.state_fips, c2000.county_fips
FROM us_counties_2000 c2000
LEFT JOIN us_counties_2010 c2010
ON c2000.state_fips = c2010.state_fips AND c2000.county_fips = c2010.county_fips
WHERE c2010.geo_name IS NULL;
```

**Typical causes:** County splits, mergers, or boundary changes (e.g., Broomfield County, CO created from parts of others).

---

## Exercise 2

**Task:** Using either the `median()` or `percentile_cont()` functions in Chapter 5, determine the median of the percent change in county population.

### Suggested Solution

```sql
SELECT percentile_cont(.5) WITHIN GROUP (ORDER BY
    (CAST(c2010.p0010001 AS numeric(10,1)) - c2000.p0010001) / c2000.p0010001 * 100
) AS median_pct_change
FROM us_counties_2010 c2010
JOIN us_counties_2000 c2000
ON c2010.state_fips = c2000.state_fips AND c2010.county_fips = c2000.county_fips;
```

---

## Exercise 3

**Task:** Which county had the greatest percentage loss of population between 2000 and 2010? Do you have any idea why? (Hint: A major weather event happened in 2005.)

### Suggested Solution

```sql
SELECT c2010.geo_name, c2010.state_us_abbreviation,
       c2000.p0010001 AS pop_2000,
       c2010.p0010001 AS pop_2010,
       round((CAST(c2010.p0010001 AS numeric(10,1)) - c2000.p0010001) / c2000.p0010001 * 100, 1) AS pct_change
FROM us_counties_2010 c2010
JOIN us_counties_2000 c2000
ON c2010.state_fips = c2000.state_fips AND c2010.county_fips = c2000.county_fips
ORDER BY pct_change ASC
LIMIT 1;
```

**Answer:** Orleans Parish, Louisiana — heavily impacted by Hurricane Katrina (2005).
