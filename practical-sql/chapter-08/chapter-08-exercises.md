# Chapter 8: Try It Yourself — Exercises & Solutions

## Exercise 1

**Task:** Library visits have declined recently in most places. But what is the pattern in the use of technology in libraries? Both the 2014 and 2009 library survey tables contain the columns `gpterms` (internet-connected computers used by the public) and `pitusr` (uses of public internet computers per year). Modify the code in Listing 8-13 to calculate the percent change in the sum of each column over time. Watch out for negative values!

### Suggested Solution

```sql
SELECT
    sum(pls14.gpterms) AS gpterms_2014,
    sum(pls09.gpterms) AS gpterms_2009,
    round((CAST(sum(pls14.gpterms) AS numeric(10,1)) - sum(pls09.gpterms)) / 
          NULLIF(sum(pls09.gpterms), 0) * 100, 2) AS gpterms_pct_change,
    sum(pls14.pitusr) AS pitusr_2014,
    sum(pls09.pitusr) AS pitusr_2009,
    round((CAST(sum(pls14.pitusr) AS numeric(10,1)) - sum(pls09.pitusr)) / 
          NULLIF(sum(pls09.pitusr), 0) * 100, 2) AS pitusr_pct_change
FROM pls_fy2014_pupld14a pls14
JOIN pls_fy2009_pupld09a pls09 ON pls14.fscskey = pls09.fscskey
WHERE pls14.gpterms >= 0 AND pls09.gpterms >= 0
  AND pls14.pitusr >= 0 AND pls09.pitusr >= 0;
```

---

## Exercise 2

**Task:** Both library survey tables contain a column called `obereg`, a two-digit Bureau of Economic Analysis Code. Just as we calculated the percent change in visits grouped by state, do the same to group percent changes in visits by U.S. region using `obereg`. Consult the survey documentation to find the meaning of each region code. For a bonus challenge, create a table with the obereg code as the primary key and the region name as text, and join it to the summary query to group by the region name rather than the code.

### Suggested Solution

```sql
SELECT pls14.obereg,
       sum(pls14.visits) AS visits_2014,
       sum(pls09.visits) AS visits_2009,
       round((CAST(sum(pls14.visits) AS numeric(10,1)) - sum(pls09.visits)) / 
             NULLIF(sum(pls09.visits), 0) * 100, 2) AS pct_change
FROM pls_fy2014_pupld14a pls14
JOIN pls_fy2009_pupld09a pls09 ON pls14.fscskey = pls09.fscskey
WHERE pls14.visits >= 0 AND pls09.visits >= 0
GROUP BY pls14.obereg
ORDER BY pct_change DESC;
```

**Bonus — region lookup table:**

```sql
CREATE TABLE obereg_codes (
    obereg varchar(2) PRIMARY KEY,
    region_name varchar(100)
);
-- Insert codes from IMLS documentation (e.g., 01=New England, 02=Mid East, etc.)

SELECT r.region_name,
       sum(pls14.visits) AS visits_2014,
       sum(pls09.visits) AS visits_2009,
       round((CAST(sum(pls14.visits) AS numeric(10,1)) - sum(pls09.visits)) / 
             NULLIF(sum(pls09.visits), 0) * 100, 2) AS pct_change
FROM pls_fy2014_pupld14a pls14
JOIN pls_fy2009_pupld09a pls09 ON pls14.fscskey = pls09.fscskey
JOIN obereg_codes r ON pls14.obereg = r.obereg
WHERE pls14.visits >= 0 AND pls09.visits >= 0
GROUP BY r.region_name
ORDER BY pct_change DESC;
```

---

## Exercise 3

**Task:** Thinking back to the types of joins you learned in Chapter 6, which join type will show you all the rows in both tables, including those without a match? Write such a query and add an IS NULL filter in a WHERE clause to show agencies not included in one or the other table.

### Suggested Solution

**Join type:** `FULL OUTER JOIN`

```sql
SELECT pls14.fscskey AS fscskey_2014, pls09.fscskey AS fscskey_2009,
       pls14.libname AS libname_2014, pls09.libname AS libname_2009
FROM pls_fy2014_pupld14a pls14
FULL OUTER JOIN pls_fy2009_pupld09a pls09 ON pls14.fscskey = pls09.fscskey
WHERE pls14.fscskey IS NULL OR pls09.fscskey IS NULL;
```

This returns agencies that appear in only one survey year.
