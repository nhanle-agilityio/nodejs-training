# Chapter 4: Try It Yourself — Exercises & Solutions

## Exercise 1

**Task:** Write a WITH statement to include with COPY to handle the import of an imaginary text file whose first couple of rows look like this:

```
id:movie:actor
50:#Mission: Impossible#:Tom Cruise
```

### Suggested Solution

The file uses `:` as delimiter and `#` as quote character. Use:

```sql
COPY table_name (id, movie, actor)
FROM '/path/to/file.txt'
WITH (FORMAT CSV, HEADER, DELIMITER ':', QUOTE '#');
```

Create the table first with columns matching the header. `DELIMITER ':'` and `QUOTE '#'` handle the custom format.

---

## Exercise 2

**Task:** Using the table `us_counties_2010` you created and filled in this chapter, export to a CSV file the 20 counties in the United States that have the most housing units. Make sure you export only each county's name, state, and number of housing units. (Hint: Housing units are totaled for each county in the column `housing_unit_count_100_percent`.)

### Suggested Solution

```sql
COPY (
    SELECT geo_name, state_us_abbreviation, housing_unit_count_100_percent
    FROM us_counties_2010
    ORDER BY housing_unit_count_100_percent DESC
    LIMIT 20
)
TO '/path/to/top20_housing_units.csv'
WITH (FORMAT CSV, HEADER);
```

---

## Exercise 3

**Task:** Imagine you're importing a file that contains a column with these values:

```
17519.668
20084.461
18976.335
```

Will a column in your target table with data type `numeric(3,8)` work for these values? Why or why not?

### Suggested Solution

**No.** `numeric(3,8)` means 3 total digits with 8 after the decimal. That implies up to -5 digits before the decimal, which is invalid. For values like 17519.668 you need digits before the decimal. A better type would be `numeric(10,3)` (10 total, 3 decimal places) or similar.
