# Chapter 10: Try It Yourself — Exercises & Solutions

## Exercise 1

**Task:** In Listing 10-2, the correlation coefficient (r) of `pct_bachelors_higher` and `median_hh_income` was about 0.68. Write a query using the same data set to show the correlation between `pct_masters_higher` and `median_hh_income`. Is the r value higher or lower? What might explain the difference?

### Suggested Solution

```sql
SELECT round(corr(median_hh_income, pct_masters_higher)::numeric, 2) AS masters_income_r
FROM acs_2011_2015_stats;
```

**Expected:** r is typically higher (e.g., ~0.75+) because master's degree holders are a subset of bachelor's holders — stronger homogeneity, stronger correlation with income.

---

## Exercise 2

**Task:** In the FBI crime data, which cities with a population of 500,000 or more have the highest rates of motor vehicle thefts (`motor_vehicle_theft`)? Which have the highest violent crime rates (`violent_crime`)?

### Suggested Solution

```sql
-- Motor vehicle thefts per 1,000
SELECT city, st,
       round((motor_vehicle_theft::numeric / population) * 1000, 1) AS mvt_per_1000
FROM fbi_crime_data_2015
WHERE population >= 500000
ORDER BY mvt_per_1000 DESC;

-- Violent crime per 1,000
SELECT city, st,
       round((violent_crime::numeric / population) * 1000, 1) AS violent_per_1000
FROM fbi_crime_data_2015
WHERE population >= 500000
ORDER BY violent_per_1000 DESC;
```

---

## Exercise 3 (Bonus)

**Task:** Revisit the libraries data in the table `pls_fy2014_pupld14a`. Rank library agencies based on the rate of visits per 1,000 population (`popu_lsa`), and limit the query to agencies serving 250,000 people or more.

### Suggested Solution

```sql
SELECT libname, stabr, popu_lsa, visits,
       round((visits::numeric / NULLIF(popu_lsa, 0)) * 1000, 1) AS visits_per_1000,
       rank() OVER (ORDER BY (visits::numeric / NULLIF(popu_lsa, 0)) DESC) AS rank
FROM pls_fy2014_pupld14a
WHERE popu_lsa >= 250000 AND visits >= 0
ORDER BY visits_per_1000 DESC;
```
