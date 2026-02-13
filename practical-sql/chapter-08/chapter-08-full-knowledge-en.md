# Chapter 8: Extracting Information by Grouping and Summarizing

## Introduction

Every data set tells a story, and it's the data analyst's job to find out what that story is. In Chapter 2, you learned about interviewing data using SELECT statements, which included sorting columns, finding distinct values, and filtering results. You've also learned the fundamentals of SQL math, data types, table design, and joining tables. With all these tools under your belt, you're ready to summarize data using grouping and SQL functions.

Summarizing data allows us to identify useful information we wouldn't be able to see otherwise. In this chapter, we'll use the well-known institution of your local library as our example.

Despite changes in the way people consume information, libraries remain a vital part of communities worldwide. But the internet and advancements in library technology have changed how we use libraries. For example, ebooks and online access to digital materials now have a permanent place in libraries along with books and periodicals.

In the United States, the Institute of Museum and Library Services (IMLS) measures library activity as part of its annual Public Libraries Survey. The survey collects data from more than 9,000 library administrative entities, defined by the survey as agencies that provide library services to a particular locality. Some agencies are county library systems, and others are part of school districts. Data on each agency includes the number of branches, staff, books, hours open per year, and so on. The IMLS has been collecting data each year since 1988 and includes all public library agencies in the 50 states plus the District of Columbia and several territories, such as American Samoa.

For this exercise, we'll assume the role of an analyst who just received a fresh copy of the library data set to produce a report describing trends from the data. We'll need to create two tables, one with data from the 2014 survey and the second from the 2009 survey. Then we'll summarize the more interesting data in each table and join the tables to see the five-year trends.

During the analysis, you'll learn SQL techniques for summarizing data using aggregate functions and grouping.

## Creating the Library Survey Tables

Let's create the 2014 and 2009 library survey tables and import the data. We'll use appropriate data types for each column and add constraints and an index to each table to preserve data integrity and speed up queries.

### Creating the 2014 Library Data Table

We'll start by creating the table for the 2014 library data. Using the CREATE TABLE statement, we'll build `pls_fy2014_pupld14a`, a table for the fiscal year 2014 Public Library Data File from the Public Libraries Survey. The Public Library Data File summarizes data at the agency level, counting activity at all agency outlets, which include central libraries, branch libraries, and bookmobiles.

**Naming Convention:**
- `pls` refers to the survey title (Public Libraries Survey)
- `fy2014` is the fiscal year the data covers
- `pupld14a` is the name of the particular file from the survey

For simplicity, we've selected just 72 of the more relevant columns from the 159 in the original survey file.

```sql
CREATE TABLE pls_fy2014_pupld14a (
    stabr varchar(2) NOT NULL,
    fscskey varchar(6) CONSTRAINT fscskey2014_key PRIMARY KEY,
    libid varchar(20) NOT NULL,
    libname varchar(100) NOT NULL,
    obereg varchar(2) NOT NULL,
    rstatus integer NOT NULL,
    statstru varchar(2) NOT NULL,
    statname varchar(2) NOT NULL,
    stataddr varchar(2) NOT NULL,
    --snip-- (other columns)
    wifisess integer NOT NULL,
    yr_sub integer NOT NULL
);

CREATE INDEX libname2014_idx ON pls_fy2014_pupld14a (libname);
CREATE INDEX stabr2014_idx ON pls_fy2014_pupld14a (stabr);
CREATE INDEX city2014_idx ON pls_fy2014_pupld14a (city);
CREATE INDEX visits2014_idx ON pls_fy2014_pupld14a (visits);

COPY pls_fy2014_pupld14a
FROM 'C:\YourDirectory\pls_fy2014_pupld14a.csv'
WITH (FORMAT CSV, HEADER);
```

**Key Points:**
- We assign a primary key constraint to the column named `fscskey`, a unique code assigned to each library. Because it's unique, present in each row, and unlikely to change, it can serve as a natural primary key.
- The definition for each column includes the appropriate data type and NOT NULL constraints where the columns have no missing values.
- Note: The column named `database` in the CSV file was changed to `databases` in the table because `database` is a SQL reserved keyword.
- The `startdat` and `enddat` columns contain dates, but we've set their data type to `varchar(10)` because in the CSV file those columns include non-date values, and our import will fail if we try to use a date data type.
- After creating the table, we add indexes to columns we'll use for queries. This provides faster results when we search the column for a particular library.

### Creating the 2009 Library Data Table

Creating the table for the 2009 library data follows similar steps. Most ongoing surveys will have a handful of year-to-year changes because the makers of the survey either think of new questions or modify existing ones, so the included columns will be slightly different in this table.

**Example:** The 2014 file has a `wifisess` column, which lists the annual number of Wi-Fi sessions the library provided, but this column doesn't exist in the 2009 data.

```sql
CREATE TABLE pls_fy2009_pupld09a (
    stabr varchar(2) NOT NULL,
    fscskey varchar(6) CONSTRAINT fscskey2009_key PRIMARY KEY,
    libid varchar(20) NOT NULL,
    libname varchar(100) NOT NULL,
    address varchar(35) NOT NULL,
    city varchar(20) NOT NULL,
    zip varchar(5) NOT NULL,
    zip4 varchar(4) NOT NULL,
    cnty varchar(20) NOT NULL,
    --snip-- (other columns)
    fipsst varchar(2) NOT NULL,
    fipsco varchar(3) NOT NULL
);

CREATE INDEX libname2009_idx ON pls_fy2009_pupld09a (libname);
CREATE INDEX stabr2009_idx ON pls_fy2009_pupld09a (stabr);
CREATE INDEX city2009_idx ON pls_fy2009_pupld09a (city);
CREATE INDEX visits2009_idx ON pls_fy2009_pupld09a (visits);

COPY pls_fy2009_pupld09a
FROM 'C:\YourDirectory\pls_fy2009_pupld09a.csv'
WITH (FORMAT CSV, HEADER);
```

We use `fscskey` as the primary key again, and we create indexes on `libname` and other columns.

## Exploring the Library Data Using Aggregate Functions

Aggregate functions combine values from multiple rows and return a single result based on an operation on those values. For example, you might return the average of values with the `avg()` function, as you learned in Chapter 5. That's just one of many aggregate functions in SQL. Some are part of the SQL standard, and others are specific to PostgreSQL and other database managers. Most of the aggregate functions used in this chapter are part of standard SQL.

In this section, we'll work through the library data using aggregates on single and multiple columns, and then explore how you can expand their use by grouping the results they return with values from additional columns.

### Counting Rows and Values Using count()

After importing a data set, a sensible first step is to make sure the table has the expected number of rows. For example, the IMLS documentation for the 2014 data says the file we imported has 9,305 rows, and the 2009 file has 9,299 rows. When we count the number of rows in those tables, the results should match those counts.

The `count()` aggregate function, which is part of the ANSI SQL standard, makes it easy to check the number of rows and perform other counting tasks.

#### Counting All Rows

If we supply an asterisk as an input, such as `count(*)`, the asterisk acts as a wildcard, so the function returns the number of table rows regardless of whether they include NULL values.

```sql
SELECT count(*)
FROM pls_fy2014_pupld14a;

SELECT count(*)
FROM pls_fy2009_pupld09a;
```

**Results:**
- For `pls_fy2014_pupld14a`: 9,305 rows
- For `pls_fy2009_pupld09a`: 9,299 rows

Both results match the number of rows we expected.

**Note:** You can also check the row count using the pgAdmin interface, but it's clunky. Right-clicking the table name in pgAdmin's object browser and selecting View/Edit Data→All Rows executes a SQL query for all rows. Then, a pop-up message in the results pane shows the row count, but it disappears after a few seconds.

Comparing the number of table rows to what the documentation says is important because it will alert us to issues such as missing rows or cases where we might have imported the wrong file.

#### Counting Values Present in a Column

To return the number of rows in a specific column that contain values, we supply the name of a column as input to the `count()` function rather than an asterisk.

```sql
SELECT count(salaries)
FROM pls_fy2014_pupld14a;
```

**Result:** 5,983 rows have a value in `salaries`.

This number is far lower than the number of rows that exist in the table. In the 2014 data, slightly less than two-thirds of the agencies reported salaries, and you'd want to note that fact when reporting any results of calculations performed on those columns. This check is important because the extent to which values are present in a column might influence your decision on whether to proceed with analysis at all.

#### Counting Distinct Values in a Column

In Chapter 2, we covered the DISTINCT keyword, which is part of the SQL standard. When added after SELECT in a query, DISTINCT returns a list of unique values. We can use it to see unique values in one column, or we can see unique combinations of values from multiple columns. Another use of DISTINCT is to add it to the `count()` function, which causes the function to return a count of distinct values from a column.

```sql
SELECT count(libname)
FROM pls_fy2014_pupld14a;

SELECT count(DISTINCT libname)
FROM pls_fy2014_pupld14a;
```

**Results:**
- First query: 9,305 (matches the number of rows in the table)
- Second query: 8,515 (unique library names)

Using DISTINCT to remove duplicates reduces the number of library names to the 8,515 that are unique. This indicates that 530 library agencies share their name with one or more other agencies. As one example, nine library agencies are named OXFORD PUBLIC LIBRARY in the table, each one in a city or town named Oxford in different states, including Alabama, Connecticut, Kansas, and Pennsylvania, among others.

### Finding Maximum and Minimum Values Using max() and min()

Knowing the largest and smallest numbers in a column is useful for a couple of reasons. First, it helps us get a sense of the scope of the values reported for a particular variable. Second, the functions used, `max()` and `min()`, can reveal unexpected issues with the data.

Both `max()` and `min()` work the same way: you use a SELECT statement followed by the function with the name of a column supplied.

```sql
SELECT max(visits), min(visits)
FROM pls_fy2014_pupld14a;
```

**Result:**
```
max      | min
---------|----
17729020 | -3
```

**Analysis:**
- The maximum value of more than 17.7 million is reasonable for a large city library system.
- But -3 as the minimum? On the surface, that result seems like a mistake, but it turns out that the creators of the library survey are employing a problematic yet common convention in data collection: using a negative number or some artificially high value as an indicator.

**In this case, the survey creators used negative numbers to indicate:**
1. A value of -1 indicates a "nonresponse" to that question.
2. A value of -3 indicates "not applicable" and is used when a library agency has closed either temporarily or permanently.

**Important:** We'll need to account for and exclude negative values as we explore the data, because summing a column and including the negative values will result in an incorrect total. We can do this using a WHERE clause to filter them. It's a good thing we discovered this issue now rather than later after spending a lot of time on deeper analysis!

**Note:** A better alternative for this negative value scenario is to use NULL in rows in the visits column where response data is absent, and then create a separate `visits_flag` column to hold codes explaining why. This technique separates number values from information about them.

## Aggregating Data Using GROUP BY

When you use the GROUP BY clause with aggregate functions, you can group results according to the values in one or more columns. This allows us to perform operations like `sum()` or `count()` for every state in our table or for every type of library agency.

### Understanding GROUP BY

On its own, GROUP BY, which is also part of standard ANSI SQL, eliminates duplicate values from the results, similar to DISTINCT.

```sql
SELECT stabr
FROM pls_fy2014_pupld14a
GROUP BY stabr
ORDER BY stabr;
```

**How it works:**
- The GROUP BY clause follows the FROM clause and includes the column name to group.
- In this case, we're selecting `stabr`, which contains the state abbreviation, and grouping by that same column.
- We then use ORDER BY `stabr` as well so that the grouped results are in alphabetical order.

**Result:** This will yield a result with unique state abbreviations from the 2014 table. There are no duplicates in the 56 rows returned. These standard two-letter postal abbreviations include the 50 states plus Washington, D.C., and several U.S. territories, such as American Samoa and the U.S. Virgin Islands.

### Grouping Multiple Columns

You're not limited to grouping just one column. We can use the GROUP BY clause on multiple columns:

```sql
SELECT city, stabr
FROM pls_fy2014_pupld14a
GROUP BY city, stabr
ORDER BY city, stabr;
```

**Result:** The results get sorted by city and then by state, and the output shows unique combinations in that order. This grouping returns 9,088 rows, 217 fewer than the total table rows. The result indicates there are multiple occasions where the file includes more than one library agency for a particular city and state combination.

### Combining GROUP BY with count()

If we combine GROUP BY with an aggregate function, such as `count()`, we can pull more descriptive information from our data. For example, we know 9,305 library agencies are in the 2014 table. We can get a count of agencies by state and sort them to see which states have the most.

```sql
SELECT stabr, count(*)
FROM pls_fy2014_pupld14a
GROUP BY stabr
ORDER BY count(*) DESC;
```

**How it works:**
- Unlike in earlier examples, we're now asking for the values in the `stabr` column and a count of those values.
- In the list of columns to query, we specify `stabr` and the `count()` function with an asterisk as its input. As before, the asterisk causes `count()` to include NULL values.
- Also, when we select individual columns along with an aggregate function, we must include the columns in a GROUP BY clause. If we don't, the database will return an error telling us to do so. The reason is that you can't group values by aggregating and have ungrouped column values in the same query.
- To sort the results and have the state with the largest number of agencies at the top, we can ORDER BY the `count()` function in descending order using DESC.

**Results:** The results show New York, Illinois, and Texas as the states with the greatest number of library agencies in 2014:

```
stabr | count
------|------
NY    | 756
IL    | 625
TX    | 556
IA    | 543
PA    | 455
MI    | 389
WI    | 381
MA    | 370
--snip--
```

**Important Note:** Remember that our table represents library agencies that serve a locality. Just because New York, Illinois, and Texas have the greatest number of library agencies doesn't mean they have the greatest number of outlets where you can walk in and peruse the shelves. An agency might have one central library only, or it might have no central libraries but 23 branches spread around a county. To count outlets, each row in the table also has values in the columns `centlib` and `branlib`, which record the number of central and branch libraries, respectively. To find totals, we would use the `sum()` aggregate function on both columns.

### Using GROUP BY on Multiple Columns with count()

We can glean yet more information from our data by combining GROUP BY with the `count()` function and multiple columns. For example, the `stataddr` column in both tables contains a code indicating whether the agency's address changed in the last year. The values in `stataddr` are:
- `00`: No change from last year
- `07`: Moved to a new location
- `15`: Minor address change

```sql
SELECT stabr, stataddr, count(*)
FROM pls_fy2014_pupld14a
GROUP BY stabr, stataddr
ORDER BY stabr ASC, count(*) DESC;
```

**How it works:**
- The key sections of the query are the column names and the `count()` function after SELECT, and making sure both columns are reflected in the GROUP BY clause.
- The effect of grouping by two columns is that `count()` will show the number of unique combinations of `stabr` and `stataddr`.
- To make the output easier to read, let's sort first by the state code in ascending order and then by the count in descending order.

**Results:**
```
stabr | stataddr | count
------|----------|------
AK    | 00       | 70
AK    | 15       | 10
AK    | 07       | 5
AL    | 00       | 221
AL    | 07       | 3
AR    | 00       | 58
AS    | 00       | 1
AZ    | 00       | 91
--snip--
```

**Analysis:** The first few rows of the results show that code 00 (no change in address) is the most common value for each state. We'd expect that because it's likely there are more library agencies that haven't changed address than those that have. The result helps assure us that we're analyzing the data in a sound way. If code 07 (moved to a new location) was the most frequent in each state, that would raise a question about whether we've written the query correctly or whether there's an issue with the data.

## Revisiting sum() to Examine Library Visits

So far, we've combined grouping with aggregate functions, like `count()`, on columns within a single table to provide results grouped by a column's values. Now let's expand the technique to include grouping and aggregating across joined tables using the 2014 and 2009 libraries data. Our goal is to identify trends in library visits spanning that five-year period. To do this, we need to calculate totals using the `sum()` aggregate function.

### Filtering Out Negative Values

Before we dig into these queries, let's address the issue of using the values -3 and -1 to indicate "not applicable" and "nonresponse." To prevent these negative numbers with no meaning as quantities from affecting the analysis, we'll filter them out using a WHERE clause to limit the queries to rows where values in visits are zero or greater.

### Calculating Total Visits from Individual Tables

Let's start by calculating the sum of annual visits to libraries from the individual 2014 and 2009 tables:

```sql
SELECT sum(visits) AS visits_2014
FROM pls_fy2014_pupld14a
WHERE visits >= 0;

SELECT sum(visits) AS visits_2009
FROM pls_fy2009_pupld09a
WHERE visits >= 0;
```

**Results:**
- For 2014, visits totaled approximately 1.4 billion: `1425930900`
- For 2009, visits totaled approximately 1.6 billion: `1591799201`

**Analysis:** We're onto something here, but it may not be good news. The trend seems to point downward with visits dropping about 10 percent from 2009 to 2014.

### Calculating Total Visits from Joined Tables

These queries sum overall visits. But from the row counts we ran earlier in the chapter, we know that each table contains a different number of library agencies: 9,305 in 2014 and 9,299 in 2009 due to agencies opening, closing, or merging. So, let's determine how the sum of visits will differ if we limit the analysis to library agencies that exist in both tables. We can do that by joining the tables:

```sql
SELECT sum(pls14.visits) AS visits_2014,
       sum(pls09.visits) AS visits_2009
FROM pls_fy2014_pupld14a pls14 JOIN pls_fy2009_pupld09a pls09
ON pls14.fscskey = pls09.fscskey
WHERE pls14.visits >= 0 AND pls09.visits >= 0;
```

**How it works:**
- At the top, we use the `sum()` aggregate function to total the visits columns from the 2014 and 2009 tables.
- When we join the tables on the tables' primary keys, we're declaring table aliases. Here, we declare `pls14` as the alias for the 2014 table and `pls09` as the alias for the 2009 table to avoid having to write the lengthier full table names throughout the query.
- Note that we use a standard JOIN, also known as an INNER JOIN. That means the query results will only include rows where the primary key values of both tables (the column `fscskey`) match.
- Using the WHERE clause, we return rows where both tables have a value of zero or greater in the visits column. This will prevent the artificial negative values from impacting the sums.

**Results:**
```
visits_2014 | visits_2009
------------|------------
1417299241  | 1585455205
```

**Analysis:** The results are similar to what we found by querying the tables separately, although these totals are six to eight million smaller. The reason is that the query referenced only agencies with an `fscskey` in both tables. Still, the downward trend holds. We'll need to dig a little deeper to get the full story.

**Note:** Although we joined the tables on `fscskey`, it's entirely possible that some library agencies that appear in both tables merged or split between 2009 and 2014. A call to the IMLS asking about caveats for working with this data is a good idea.

### Grouping Visit Sums by State

Now that we know library visits dropped for the United States as a whole between 2009 and 2014, you might ask yourself, "Did every part of the country see a decrease, or did the degree of the trend vary by region?" We can answer this question by modifying our preceding query to group by the state code. Let's also use a percent-change calculation to compare the trend by state.

```sql
SELECT pls14.stabr,
       sum(pls14.visits) AS visits_2014,
       sum(pls09.visits) AS visits_2009,
       round( (CAST(sum(pls14.visits) AS decimal(10,1)) - sum(pls09.visits)) /
              sum(pls09.visits) * 100, 2 ) AS pct_change
FROM pls_fy2014_pupld14a pls14 JOIN pls_fy2009_pupld09a pls09
ON pls14.fscskey = pls09.fscskey
WHERE pls14.visits >= 0 AND pls09.visits >= 0
GROUP BY pls14.stabr
ORDER BY pct_change DESC;
```

**How it works:**
- We follow the SELECT keyword with the `stabr` column from the 2014 table; that same column appears in the GROUP BY clause. It doesn't matter which table's `stabr` column we use because we're only querying agencies that appear in both tables.
- After SELECT, we also include the now-familiar percent-change calculation you learned in Chapter 5, which gets the alias `pct_change` for readability.
- We end the query with an ORDER BY clause, using the `pct_change` column alias.

**Results:** When you run the query, the top of the results shows 10 states or territories with an increase in visits from 2009 to 2014. The rest of the results show a decline. Oklahoma, at the bottom of the ranking, had a 35 percent drop!

```
stabr | visits_2014 | visits_2009 | pct_change
------|-------------|-------------|------------
GU    | 103593      | 60763       | 70.49
DC    | 4230790     | 2944774     | 43.67
LA    | 17242110    | 15591805    | 10.58
MT    | 4582604     | 4386504     | 4.47
AL    | 17113602    | 16933967    | 1.06
AR    | 10762521    | 10660058    | 0.96
KY    | 19256394    | 19113478    | 0.75
CO    | 32978245    | 32782247    | 0.60
SC    | 18178677    | 18105931    | 0.40
SD    | 3899554     | 3890392     | 0.24
MA    | 42011647    | 42237888    | -0.54
AK    | 3486955     | 3525093     | -1.08
--snip--
RI    | 5259143     | 6612167     | -20.46
NC    | 33952977    | 43111094    | -21.24
PR    | 193279      | 257032      | -24.80
GA    | 28891017    | 40922598    | -29.40
OK    | 13678542    | 21171452    | -35.39
```

**Analysis:** This useful data should lead a data analyst to investigate what's driving the changes, particularly the largest ones. Data analysis can sometimes raise as many questions as it answers, but that's part of the process. It's always worth a phone call to a person with knowledge about the data to provide context for the results. Sometimes, they may have a very good explanation. Other times, an expert will say, "That doesn't sound right." That answer might send you back to the keeper of the data or the documentation to find out if you overlooked a code or a nuance with the data.

## Filtering an Aggregate Query Using HAVING

We can refine our analysis by examining a subset of states and territories that share similar characteristics. With percent change in visits, it makes sense to separate large states from small states. In a small state like Rhode Island, one library closing could have a significant effect. A single closure in California might be scarcely noticed in a statewide count. To look at states with a similar volume in visits, we could sort the results by either of the visits columns, but it would be cleaner to get a smaller result set in our query.

### Understanding HAVING

To filter the results of aggregate functions, we need to use the HAVING clause that's part of standard ANSI SQL. You're already familiar with using WHERE for filtering, but aggregate functions, such as `sum()`, can't be used within a WHERE clause because they operate at the row level, and aggregate functions work across rows. The HAVING clause places conditions on groups created by aggregating.

**Key Difference:**
- **WHERE**: Filters rows before grouping and aggregation
- **HAVING**: Filters groups after grouping and aggregation

### Using HAVING to Filter Aggregate Results

The code modifies the query by inserting the HAVING clause after GROUP BY:

```sql
SELECT pls14.stabr,
       sum(pls14.visits) AS visits_2014,
       sum(pls09.visits) AS visits_2009,
       round( (CAST(sum(pls14.visits) AS decimal(10,1)) - sum(pls09.visits)) /
              sum(pls09.visits) * 100, 2 ) AS pct_change
FROM pls_fy2014_pupld14a pls14 JOIN pls_fy2009_pupld09a pls09
ON pls14.fscskey = pls09.fscskey
WHERE pls14.visits >= 0 AND pls09.visits >= 0
GROUP BY pls14.stabr
HAVING sum(pls14.visits) > 50000000
ORDER BY pct_change DESC;
```

**How it works:**
- In this case, we've set our query results to include only rows with a sum of visits in 2014 greater than 50 million. That's an arbitrary value chosen to show only the very largest states.
- Adding the HAVING clause reduces the number of rows in the output to just six.
- In practice, you might experiment with various values.

**Results:**
```
stabr | visits_2014 | visits_2009 | pct_change
------|-------------|-------------|------------
TX    | 72876601    | 78838400    | -7.56
CA    | 162787836   | 182181408   | -10.65
OH    | 82495138    | 92402369    | -10.72
NY    | 106453546   | 119810969   | -11.15
IL    | 72598213    | 82438755    | -11.94
FL    | 73165352    | 87730886    | -16.60
```

**Analysis:** Each of the six states has experienced a decline in visits, but notice that the percent-change variation isn't as wide as in the full set of states and territories. Depending on what we learn from library experts, looking at the states with the most activity as a group might be helpful in describing trends, as would looking at other groupings. Think of a sentence or bullet point you might write that would say, "In the nation's largest states, visits decreased between 8 percent and 17 percent between 2009 and 2014." You could write similar sentences about medium-sized states and small states.

## Summary

If this chapter has inspired you to visit your local library and check out a couple of books, ask a librarian whether their branch has seen a rise or drop in visits over the last few years. Chances are, you can guess the answer now. In this chapter, you learned how to use standard SQL techniques to summarize data in a table by grouping values and using a handful of aggregate functions. By joining data sets, you were able to identify some interesting five-year trends.

### Key Concepts Covered

- **Aggregate functions**: `count()`, `max()`, `min()`, `sum()`
- **GROUP BY clause**: Grouping results by one or more columns
- **HAVING clause**: Filtering groups after aggregation
- **DISTINCT with count()**: Counting distinct values
- **Table joins with aggregates**: Combining data from multiple tables
- **Percent change calculations**: Comparing values across time periods
- **Data quality issues**: Handling negative values used as indicators

### Best Practices

1. Always verify row counts match documentation after importing data
2. Check for missing values using `count(column)` vs `count(*)`
3. Use `count(DISTINCT column)` to find unique values
4. Use `max()` and `min()` to identify data quality issues
5. Filter out indicator values (like negative numbers) before aggregating
6. Use GROUP BY with aggregate functions to summarize by categories
7. Use HAVING to filter groups, not WHERE (which filters rows)
8. Join tables when comparing data across time periods
9. Calculate percent changes to identify trends
10. Consult with domain experts when results seem unexpected

### Common Patterns

**Counting rows:**
```sql
SELECT count(*) FROM table_name;
```

**Counting non-NULL values:**
```sql
SELECT count(column_name) FROM table_name;
```

**Counting distinct values:**
```sql
SELECT count(DISTINCT column_name) FROM table_name;
```

**Grouping and counting:**
```sql
SELECT column_name, count(*)
FROM table_name
GROUP BY column_name
ORDER BY count(*) DESC;
```

**Filtering aggregates:**
```sql
SELECT column_name, sum(value_column)
FROM table_name
GROUP BY column_name
HAVING sum(value_column) > threshold;
```

**Joining and aggregating:**
```sql
SELECT t1.category, sum(t1.value) AS value_1, sum(t2.value) AS value_2
FROM table1 t1 JOIN table2 t2 ON t1.id = t2.id
GROUP BY t1.category;
```

### When to Use Each Aggregate Function

- **count()**: When you need to count rows or values
- **max()**: When you need to find the largest value
- **min()**: When you need to find the smallest value
- **sum()**: When you need to total numeric values
- **avg()**: When you need to find the average (covered in Chapter 5)

### When to Use GROUP BY

- When you want to summarize data by categories
- When you need counts or sums per group
- When comparing values across different groups
- When analyzing trends by region, time period, or other categories

### When to Use HAVING

- When you need to filter groups based on aggregate results
- When you want to exclude groups that don't meet certain criteria
- When comparing aggregate values to thresholds
- **Remember**: HAVING filters groups, WHERE filters rows

## Next Steps

You also learned that data doesn't always come perfectly packaged. The use of negative values in columns as an indicator rather than as an actual numeric value forced us to filter out those rows. Unfortunately, data sets offer those kinds of challenges more often than not. In the next chapter, you'll learn techniques to clean up a data set that has a number of issues. In subsequent chapters, you'll also discover more aggregate functions to help you find the stories in your data.
