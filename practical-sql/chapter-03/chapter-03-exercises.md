# Chapter 3: Try It Yourself — Exercises & Solutions

## Exercise 1

**Task:** Your company delivers fruit and vegetables to local grocery stores, and you need to track the mileage driven by each driver each day to a tenth of a mile. Assuming no driver would ever travel more than 999 miles in a day, what would be an appropriate data type for the mileage column in your table? Why?

### Suggested Solution

```sql
mileage numeric(5,1)  -- or decimal(5,1)
```

**Why:** `numeric(5,1)` stores up to 5 total digits with 1 decimal place (e.g., 999.9). This gives exact values for money/measurements, unlike floating-point.

---

## Exercise 2

**Task:** In the table listing each driver in your company, what are appropriate data types for the drivers' first and last names? Why is it a good idea to separate first and last names into two columns rather than having one larger name column?

### Suggested Solution

```sql
first_name varchar(50),
last_name varchar(50)
```

**Why separate columns?** Easier to sort/filter by last name, format output, and handle different name structures (e.g., single names, hyphenated names).

---

## Exercise 3

**Task:** Assume you have a text column that includes strings formatted as dates. One of the strings is written as `'4//2017'`. What will happen when you try to convert that string to the timestamp data type?

### Suggested Solution

The conversion will fail. PostgreSQL expects valid date formats; `'4//2017'` has an invalid month/day structure (double slash, unclear meaning). You'll get an error like:

```
ERROR: invalid input syntax for type timestamp: "4//2017"
```

**Takeaway:** Clean malformed dates before casting, or handle errors in application code.
