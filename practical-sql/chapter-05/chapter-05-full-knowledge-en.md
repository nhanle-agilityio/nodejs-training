# Chapter 5: Basic Math and Stats with SQL

## Introduction

If your data includes any of the number data types we explored in Chapter 3—integers, decimals, or floating points—sooner or later your analysis will include some calculations. For example, you might want to know the average of all the dollar values in a column, or add values in two columns to produce a total for each row. SQL handles calculations ranging from basic math through advanced statistics.

In this chapter, we'll start with the basics and progress to math functions and beginning statistics. We'll also discuss calculations related to percentages and percent change. For several of the exercises, we'll use the 2010 Decennial Census data you imported in Chapter 4.

## Math Operators

Let's start with the basic math you learned in grade school. SQL provides nine math operators you'll use most often in your calculations. The first four (addition, subtraction, multiplication, and division) are part of the ANSI SQL standard that are implemented in all database systems. The others are PostgreSQL-specific operators, although if you're using another database, it likely has functions or operators to perform those operations.

### Basic Math Operators

| Operator | Description |
|----------|-------------|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division (returns the quotient only, no remainder) |
| `%` | Modulo (returns just the remainder) |
| `^` | Exponentiation |
| `\|/` | Square root |
| `\|\|/` | Cube root |
| `!` | Factorial |

**Note:** The modulo operator (`%`) works in Microsoft SQL Server and MySQL as well as with PostgreSQL. If you're using another database system, check its documentation.

### Math and Data Types

As you work through the examples, note the data type of each result, which is listed beneath each column name in the pgAdmin results grid. The type returned for a calculation will vary depending on the operation and the data type of the input numbers.

**For calculations with an operator between two numbers** (addition, subtraction, multiplication, and division), the data type returned follows this pattern:
- Two integers return an integer
- A numeric on either side of the operator returns a numeric
- Anything with a floating-point number returns a floating-point number of type `double precision`

**For exponentiation, root, and factorial functions:**
- Each takes one number either before or after the operator
- Returns numeric and floating-point types, even when the input is an integer

Sometimes the result's data type will suit your needs; other times, you may need to use `CAST` to change the data type, such as if you need to feed the result into a function that takes a certain type.

### Adding, Subtracting, and Multiplying

Let's start with simple integer addition, subtraction, and multiplication:

```sql
SELECT 2 + 2;    -- Returns 4
SELECT 9 - 1;    -- Returns 8
SELECT 3 * 4;    -- Returns 12
```

**Note:** With PostgreSQL, Microsoft's SQL Server, MySQL, and some other database management systems, it's possible to omit the table name for math and string operations while testing. For readability's sake, use a single space before and after the math operator.

The output displays in a column, as with any query result. But because we're not querying a table and specifying a column, the results appear beneath a `?column?` name, signifying an unknown column. That's okay—we're not affecting any data in a table, just displaying a result.

### Division and Modulo

Division with SQL gets a little trickier because of the difference between math with integers and math with decimals. Add in modulo, an operator that returns just the remainder in a division operation, and the results can be confusing.

```sql
SELECT 11 / 6;                              -- Returns 1 (integer division)
SELECT 11 % 6;                              -- Returns 5 (remainder)
SELECT 11.0 / 6;                            -- Returns 1.83333 (decimal division)
SELECT CAST(11 AS numeric(3,1)) / 6;        -- Returns 1.83333 (forced decimal)
```

**Key Points:**
- When dividing two integers, SQL returns only the integer quotient (no remainder)
- To get the remainder, use the modulo operator `%`
- To get decimal division, either use a numeric/decimal value or `CAST` one integer to numeric

**Modulo Use Cases:**
- Fetching remainders
- Testing conditions (e.g., checking if a number is even: `number % 2 = 0`)

### Exponents, Roots, and Factorials

PostgreSQL-flavored SQL also provides operators to square, cube, or otherwise raise a base number to an exponent, as well as find roots or the factorial of a number:

```sql
SELECT 3 ^ 4;           -- Exponentiation: 3 to the 4th power = 81
SELECT |/ 10;           -- Square root: √10
SELECT sqrt(10);        -- Square root (function): √10
SELECT ||/ 10;          -- Cube root: ∛10
SELECT 4 !;             -- Factorial: 4! = 4 × 3 × 2 × 1 = 24
```

**Notes:**
- Exponentiation operator (`^`) raises a base number to an exponent
- Square root can be found using `|/` operator or `sqrt(n)` function
- Cube root uses `||/` operator
- Factorial (`!`) is a suffix operator (comes after the number)
- Factorials are useful for determining how many ways items can be ordered

**Important:** These operators are specific to PostgreSQL; they're not part of the SQL standard. If you're using another database application, check its documentation for how it implements these operations.

### Minding the Order of Operations

SQL follows the established math standard for order of operations (operator precedence). For the PostgreSQL operators discussed so far, the order is:

1. **Exponents and roots**
2. **Multiplication, division, modulo**
3. **Addition and subtraction**

Given these rules, you'll need to encase an operation in parentheses if you want to calculate it in a different order.

**Examples:**
```sql
SELECT 7 + 8 * 9;        -- Returns 79 (multiplication first)
SELECT (7 + 8) * 9;      -- Returns 135 (addition first due to parentheses)

SELECT 3 ^ 3 - 1;        -- Returns 26 (exponent first: 27 - 1)
SELECT 3 ^ (3 - 1);      -- Returns 9 (subtraction first: 3^2)
```

Keep operator precedence in mind to avoid having to correct your analysis later!

## Doing Math Across Census Table Columns

Let's use the most frequently used SQL math operators on real data by digging into the 2010 Decennial Census population table, `us_counties_2010`, that you imported in Chapter 4. Instead of using numbers in queries, we'll use the names of the columns that contain the numbers. When we execute the query, the calculation will occur on each row of the table.

### Understanding Census Race Data

The 2010 Census form received by each household—the so-called "short form"—allowed people to check either just one or multiple boxes under the question of race. People who checked one box were counted in categories such as "White Alone" or "Black or African American Alone." Respondents who selected more than one box were tabulated in the overall category of "Two or More Races," and the census data set breaks those down in detail.

### Using Column Aliases

In `us_counties_2010`, each race and household data column contains a census code. For example, the "Asian Alone" column is reported as `p0010006`. Although those codes might be economical and compact, they make it difficult to understand which column is which when the query returns with just that code.

We can use the `AS` keyword to give each column a more readable alias in the result set:

```sql
SELECT geo_name,
       state_us_abbreviation AS "st",
       p0010001 AS "Total Population",
       p0010003 AS "White Alone",
       p0010004 AS "Black or African American Alone",
       p0010005 AS "Am Indian/Alaska Native Alone",
       p0010006 AS "Asian Alone",
       p0010007 AS "Native Hawaiian and Other Pacific Islander Alone",
       p0010008 AS "Some Other Race Alone",
       p0010009 AS "Two or More Races"
FROM us_counties_2010;
```

**Note:** We could rename all the columns upon import, but with the census it's best to use the code to refer to the same column names in the documentation if needed.

### Adding and Subtracting Columns

Now, let's try a simple calculation on two of the race columns, adding the number of people who identified as white alone or black alone in each county:

```sql
SELECT geo_name,
       state_us_abbreviation AS "st",
       p0010003 AS "White Alone",
       p0010004 AS "Black Alone",
       p0010003 + p0010004 AS "Total White and Black"
FROM us_counties_2010;
```

Providing `p0010003 + p0010004` as one of the columns in the SELECT statement handles the calculation. Again, we use the `AS` keyword to provide a readable alias for the column. If you don't provide an alias, PostgreSQL uses the label `?column?`, which is far less helpful.

### Validating Data with Math

Let's build on this to test our data and validate that we imported columns correctly. The six race "Alone" columns plus the "Two or More Races" column should add up to the same number as the total population:

```sql
SELECT geo_name,
       state_us_abbreviation AS "st",
       p0010001 AS "Total",
       p0010003 + p0010004 + p0010005 + p0010006 + p0010007
       + p0010008 + p0010009 AS "All Races",
       (p0010003 + p0010004 + p0010005 + p0010006 + p0010007
       + p0010008 + p0010009) - p0010001 AS "Difference"
FROM us_counties_2010
ORDER BY "Difference" DESC;
```

This query includes:
- The population total
- A calculation adding the seven race columns as "All Races"
- A column that subtracts the population total column from the sum of the race columns

The "Difference" column should contain a zero in each row if all the data is in the right place. To avoid having to scan all 3,143 rows, we add an `ORDER BY` clause on the named column. Any rows showing a difference should appear at the top or bottom of the query result.

**Best Practice:** Whenever you encounter or import a new data set, perform little tests like this. They help you better understand the data and head off any potential issues before you dig into analysis.

## Finding Percentages of the Whole

Let's dig deeper into the census data to find meaningful differences in the population demographics of the counties. One way to do this (with any data set, in fact) is to calculate what percentage of the whole a particular variable represents.

### Percentage Formula

To figure out the percentage of the whole, divide the number in question by the total. For example, if you had a basket of 12 apples and used 9 in a pie, that would be `9 / 12` or `.75`—commonly expressed as 75 percent.

### Calculating Percentages in SQL

To calculate for each county the percentage of the population that reported their race as Asian:

```sql
SELECT geo_name,
       state_us_abbreviation AS "st",
       (CAST(p0010006 AS numeric(8,1)) / p0010001) * 100 AS "pct_asian"
FROM us_counties_2010
ORDER BY "pct_asian" DESC;
```

**Key Points:**
- The query divides `p0010006` (Asian alone count) by `p0010001` (total population)
- If we use the data as their original integer types, we won't get the fractional result we need: every row will display a result of 0, the quotient
- Instead, we force decimal division by using `CAST` on one of the integers
- The last part multiplies the result by 100 to present the result as a fraction of 100—the way most people understand percentages

**Result Example:**
```
geo_name                    | st | pct_asian
----------------------------|----|-----------------------
Honolulu County             | HI | 43.89497769109962474000
Aleutians East Borough      | AK | 35.97580388411333970100
San Francisco County        | CA | 33.27165361664607226500
```

## Tracking Percent Change

Another key indicator in data analysis is percent change: how much bigger, or smaller, is one number than another? Percent change calculations are often employed when analyzing change over time, and they're particularly useful for comparing change among similar items.

### Percent Change Formula

The formula to calculate percent change can be expressed like this:
```
(new number – old number) / old number
```

So, if you own a lemonade stand and sold 73 glasses of lemonade today and 59 glasses yesterday, you'd figure the day-to-day percent change like this:
```
(73 – 59) / 59 = .237 = 23.7%
```

### Example: Department Spending Changes

Let's try this with a small collection of test data related to spending in departments of a hypothetical local government:

```sql
CREATE TABLE percent_change (
    department varchar(20),
    spend_2014 numeric(10,2),
    spend_2017 numeric(10,2)
);

INSERT INTO percent_change
VALUES
('Building', 250000, 289000),
('Assessor', 178556, 179500),
('Library', 87777, 90001),
('Clerk', 451980, 650000),
('Police', 250000, 223000),
('Recreation', 199000, 195000);

SELECT department,
       spend_2014,
       spend_2017,
       round((spend_2017 - spend_2014) / spend_2014 * 100, 1) AS "pct_change"
FROM percent_change;
```

**How It Works:**
- The percent change formula subtracts `spend_2014` from `spend_2017` and then divides by `spend_2014`
- We multiply by 100 to express the result as a portion of 100
- The `round()` function removes all but one decimal place
- The function takes two arguments: the column or expression to be rounded, and the number of decimal places to display

**Result:**
```
department  | spend_2014  | spend_2017  | pct_change
------------|-------------|-------------|----------
Building    | 250000.00   | 289000.00   | 15.6
Assessor    | 178556.00   | 179500.00   | 0.5
Library     | 87777.00    | 90001.00    | 2.5
Clerk       | 451980.00   | 650000.00   | 43.8
Police      | 250000.00   | 223000.00   | -10.8
Recreation  | 199000.00   | 195000.00   | -2.0
```

## Aggregate Functions for Averages and Sums

So far, we've performed math operations across columns in each row of a table. SQL also lets you calculate a result from values within the same column using **aggregate functions**. Aggregate functions calculate a single result from multiple inputs.

### Common Aggregate Functions

Two of the most-used aggregate functions in data analysis are `avg()` and `sum()`.

### Using sum() and avg()

Returning to the `us_counties_2010` census table, it's reasonable to want to calculate the total population of all counties plus the average population of all counties:

```sql
SELECT sum(p0010001) AS "County Sum",
       round(avg(p0010001), 0) AS "County Average"
FROM us_counties_2010;
```

**Result:**
```
County Sum  | County Average
------------|---------------
308745538   | 98233
```

The population for all counties in the United States in 2010 added up to approximately 308.7 million, and the average county population was 98,233.

**Note:** We use the `round()` function to remove numbers after the decimal point in the average calculation.

## Finding the Median

The median value in a set of numbers is as important an indicator, if not more so, than the average. Here's the difference between median and average, and why median matters:

### Average vs. Median

- **Average**: The sum of all the values divided by the number of values
- **Median**: The "middle" value in an ordered set of values

### Why Median Matters

Consider this example: let's say six kids, ages 10, 11, 10, 9, 13, and 12, go on a field trip. It's easy to add the ages and divide by six to get the group's average age:
```
(10 + 11 + 10 + 9 + 13 + 12) / 6 = 10.8
```

Because the ages are within a narrow range, the 10.8 average is a good representation of the group. But averages are less helpful when the values are bunched, or skewed, toward one end of the distribution, or if the group includes outliers.

For example, what if an older chaperone joins the field trip? With ages of 10, 11, 10, 9, 13, 12, and 46, the average age increases considerably:
```
(10 + 11 + 10 + 9 + 13 + 12 + 46) / 7 = 15.9
```

Now the average doesn't represent the group well because the outlier skews it, making it an unreliable indicator.

### How Median Works

The median is the midpoint in an ordered list of values—the point at which half the values are more and half are less. Using the field trip example, we order the attendees' ages from lowest to highest:
```
9, 10, 10, 11, 12, 13, 46
```

The middle (median) value is 11. Half the values are higher, and half are lower. Given this group, the median of 11 is a better picture of the typical age than the average of 15.9.

**If the set of values is an even number**, you average the two middle numbers to find the median. Let's add another student (age 12) to the field trip:
```
9, 10, 10, 11, 12, 12, 13, 46
```

Now, the two middle values are 11 and 12. To find the median, we average them: 11.5.

### Real-World Applications

Medians are reported frequently in financial news. Reports on housing prices often use medians because a few sales of McMansions in a ZIP Code that is otherwise modest can make averages useless. The same goes for sports player salaries: one or two superstars can skew a team's average.

**A good test** is to calculate the average and the median for a group of values. If they're close, the group is probably normally distributed (the familiar bell curve), and the average is useful. If they're far apart, the values are not normally distributed and the median is the better representation.

### Finding the Median with Percentile Functions

PostgreSQL (as with most relational databases) does not have a built-in `median()` function, similar to what you'd find in Excel or other spreadsheet programs. It's also not included in the ANSI SQL standard. But we can use a SQL percentile function to find the median as well as other quantiles or cut points, which are the points that divide a group of numbers into equal sizes.

**Percentile functions are part of standard ANSI SQL.**

### Understanding Percentiles

In statistics, percentiles indicate the point in an ordered set of data below which a certain percentage of the data is found. For example, a doctor might tell you that your height places you in the 60th percentile for an adult in your age group. That means 60 percent of people are your height or shorter.

The median is equivalent to the 50th percentile—again, half the values are below and half above.

### percentile_cont() vs. percentile_disc()

SQL's percentile functions allow us to calculate medians easily, although we have to pay attention to a difference in how the two versions of the function—`percentile_cont(n)` and `percentile_disc(n)`—handle calculations. Both functions are part of the ANSI SQL standard and are present in PostgreSQL, Microsoft SQL Server, and other databases.

- **`percentile_cont(n)`**: Calculates percentiles as **continuous** values. That is, the result does not have to be one of the numbers in the data set but can be a decimal value in between two of the numbers. This follows the methodology for calculating medians on an even number of values, where the median is the average of the two middle numbers.

- **`percentile_disc(n)`**: Returns only **discrete** values. That is, the result returned will be rounded to one of the numbers in the set.

**Example:**
```sql
CREATE TABLE percentile_test (
    numbers integer
);

INSERT INTO percentile_test (numbers) VALUES
(1), (2), (3), (4), (5), (6);

SELECT
    percentile_cont(.5) WITHIN GROUP (ORDER BY numbers),
    percentile_disc(.5) WITHIN GROUP (ORDER BY numbers)
FROM percentile_test;
```

**Result:**
```
percentile_cont | percentile_disc
----------------|-----------------
3.5            | 3
```

The `percentile_cont()` function returned what we'd expect the median to be: 3.5. But because `percentile_disc()` calculates discrete values, it reports 3, the last value in the first 50 percent of the numbers. Because the accepted method of calculating medians is to average the two middle values in an even-numbered set, **use `percentile_cont(.5)` to find a median**.

### Median and Percentiles with Census Data

Our census data can show how a median tells a different story than an average:

```sql
SELECT sum(p0010001) AS "County Sum",
       round(avg(p0010001), 0) AS "County Average",
       percentile_cont(.5)
       WITHIN GROUP (ORDER BY p0010001) AS "County Median"
FROM us_counties_2010;
```

**Result:**
```
County Sum  | County Average | County Median
------------|----------------|---------------
308745538   | 98233          | 25857
```

The median and average are far apart, which shows that averages can mislead. As of 2010, half the counties in America had fewer than 25,857 people, whereas half had more. If you gave a presentation on U.S. demographics and told the audience that the "average county in America had 98,200 people," they'd walk away with a skewed picture of reality. Nearly 40 counties had a million or more people as of the 2010 Decennial Census, and Los Angeles County had close to 10 million. That pushes the average higher.

### Finding Other Quantiles with Percentile Functions

You can also slice data into smaller equal groups. Most common are:
- **Quartiles** (four equal groups)
- **Quintiles** (five groups)
- **Deciles** (10 groups)

To find any individual value, you can just plug it into a percentile function. For example, to find the value marking the first quartile, or the lowest 25 percent of data, you'd use a value of `.25`:
```sql
percentile_cont(.25)
```

However, entering values one at a time is laborious if you want to generate multiple cut points. Instead, you can pass values into `percentile_cont()` using an **array**, a SQL data type that contains a list of items:

```sql
SELECT percentile_cont(array[.25,.5,.75])
WITHIN GROUP (ORDER BY p0010001) AS "quartiles"
FROM us_counties_2010;
```

In this example, we create an array of cut points by enclosing values in a constructor called `array[]`. Inside the square brackets, we provide comma-separated values representing the three points at which to cut to create four quartiles.

**Result:**
```
quartiles
---------------------
{11104.5,25857,66699}
```

Because we passed in an array, PostgreSQL returns an array, denoted by curly brackets. Each quartile is separated by commas:
- The first quartile is 11,104.5, which means 25 percent of counties have a population that is equal to or lower than this value
- The second quartile is the same as the median: 25,857
- The third quartile is 66,699, meaning the largest 25 percent of counties have at least this large of a population

### Using unnest() to Display Arrays

Arrays come with a host of functions that allow you to perform tasks such as adding or removing values or counting the elements. A handy function for working with the result returned is `unnest()`, which makes the array easier to read by turning it into rows:

```sql
SELECT unnest(
    percentile_cont(array[.25,.5,.75])
    WITHIN GROUP (ORDER BY p0010001)
) AS "quartiles"
FROM us_counties_2010;
```

**Result:**
```
quartiles
---------
11104.5
25857
66699
```

If we were computing deciles, pulling them from the resulting array and displaying them in rows would be especially helpful.

### Creating a median() Function

Although PostgreSQL does not have a built-in `median()` aggregate function, if you're adventurous, the PostgreSQL wiki provides a script to create one:

```sql
CREATE OR REPLACE FUNCTION _final_median(anyarray)
RETURNS float8 AS
$$
WITH q AS
(
    SELECT val
    FROM unnest($1) val
    WHERE VAL IS NOT NULL
    ORDER BY 1
),
cnt AS
(
    SELECT COUNT(*) AS c FROM q
)
SELECT AVG(val)::float8
FROM
(
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

**Note:** Given what you've learned so far, the code for making a `median()` aggregate function may look inscrutable. The code contains two main blocks: one to make a function called `_final_median` that sorts the values in the column and finds the midpoint, and a second that serves as the callable aggregate function `median()` and passes values to `_final_median`. For now, you can skip reviewing the script line by line and simply execute the code.

**Using the median() function:**
```sql
SELECT sum(p0010001) AS "County Sum",
       round(AVG(p0010001), 0) AS "County Average",
       median(p0010001) AS "County Median",
       percentile_cont(.5)
       WITHIN GROUP (ORDER BY p0010001) AS "50th Percentile"
FROM us_counties_2010;
```

**Result:**
```
County Sum  | County Average | County Median | 50th Percentile
------------|----------------|---------------|----------------
308745538   | 98233          | 25857         | 25857
```

The query results show that the median function and the percentile function return the same value.

**When to use `median()` vs. `percentile_cont()`:**
- The `median()` syntax is easier to remember, albeit a chore to set up for each database, and it's specific to PostgreSQL
- In practice, `median()` executes more slowly and may perform poorly on large data sets or slow machines
- On the other hand, `percentile_cont()` is portable across several SQL database managers, including Microsoft SQL Server, and allows you to find any percentile from 0 to 100
- Ultimately, you can try both and decide

## Finding the Mode

Additionally, we can find the **mode**, the value that appears most often, using the PostgreSQL `mode()` function. The function is not part of standard SQL and has a syntax similar to the percentile functions:

```sql
SELECT mode() WITHIN GROUP (ORDER BY p0010001)
FROM us_counties_2010;
```

**Result:** `21720`, a population count shared by counties in Mississippi, Oregon, and West Virginia.

## Summary

Working with numbers is a key step in acquiring meaning from your data, and with the math skills covered in this chapter, you're ready to handle the foundations of numerical analysis with SQL. Later in the book, you'll learn about deeper statistical concepts including regression and correlation. At this point, you have the basics of sums, averages, and percentiles. You've also learned how a median can be a fairer assessment of a group of values than an average. That alone can help you avoid inaccurate conclusions.

### Key Concepts Covered

- **Math operators**: Basic arithmetic, modulo, exponents, roots, factorials
- **Data type behavior**: How operators affect result data types
- **Order of operations**: Operator precedence in SQL
- **Column calculations**: Performing math across table columns
- **Percentages**: Calculating percentages of the whole
- **Percent change**: Tracking changes over time
- **Aggregate functions**: `sum()`, `avg()`
- **Median**: Finding the middle value using percentile functions
- **Quartiles and quantiles**: Dividing data into equal groups
- **Mode**: Finding the most frequent value

### Best Practices

1. Always use `CAST` when you need decimal division from integer columns
2. Use parentheses to control order of operations
3. Use column aliases (`AS`) to make results readable
4. Validate data imports with math checks
5. Calculate both average and median to understand data distribution
6. Use `percentile_cont(.5)` for median calculations (not `percentile_disc`)
7. Use `round()` to format numeric results appropriately
8. Consider using arrays with percentile functions for multiple quantiles
9. Use `unnest()` to display array results in rows

### When to Use Average vs. Median

- **Use average** when values are normally distributed (bell curve)
- **Use median** when values are skewed or contain outliers
- **Compare both** to understand your data distribution

## Next Steps

In the next chapter, we'll introduce you to the power of joining data in two or more tables to increase your options for data analysis. We'll use the 2010 Census data you've already loaded into the analysis database and explore additional data sets.
