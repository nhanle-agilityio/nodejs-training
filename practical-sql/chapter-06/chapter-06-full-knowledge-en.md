# Chapter 6: Joining Tables in a Relational Database

## Introduction

In Chapter 1, we introduced the concept of a relational database, an application that supports data stored across multiple, related tables. In a relational model, each table typically holds data on one entity—such as students, cars, purchases, houses—and each row in the table describes one of those entities. A process known as a **table join** allows us to link rows in one table to rows in other tables.

The concept of relational databases came from the British computer scientist Edgar F. Codd. While working for IBM in 1970, he published a paper called "A Relational Model of Data for Large Shared Data Banks." His ideas revolutionized database design and led to the development of SQL. Using the relational model, you can build tables that eliminate duplicate data, are easier to maintain, and provide for increased flexibility in writing queries to get just the data you want.

## Linking Tables Using JOIN

To connect tables in a query, we use a `JOIN ... ON` statement (or one of the other JOIN variants we'll cover in this chapter). The JOIN statement links one table to another in the database during a query, using matching values in columns we specify in both tables.

### Basic JOIN Syntax

```sql
SELECT *
FROM table_a JOIN table_b
ON table_a.key_column = table_b.foreign_key_column
```

This is similar to the basic SELECT syntax you've already learned, but instead of naming one table in the FROM clause, we name a table, give the JOIN keyword, and then name a second table. The ON keyword follows, where we specify the columns we want to use to match values. When the query runs, it examines both tables and then returns columns from both tables where the values match in the columns specified in the ON clause.

### ON Clause Conditions

Matching based on equality between values is the most common use of the ON clause, but you can use any expression that evaluates to the Boolean results true or false. For example, you could match where values from one column are greater than or equal to values in the other:

```sql
ON table_a.key_column >= table_b.foreign_key_column
```

That's rare, but it's an option if your analysis requires it.

## Relating Tables with Key Columns

Consider this example: imagine you're a data analyst with the task of checking on a public agency's payroll spending by department. You file a Freedom of Information Act request for that agency's salary data, expecting to receive a simple spreadsheet listing each employee and their salary.

But instead, the agency sends you a data dump from its payroll system: a dozen CSV files, each representing one table in its database. Two of the tables stand out: one named `employees` and another named `departments`.

### Creating Related Tables

```sql
CREATE TABLE departments (
    dept_id bigserial,
    dept varchar(100),
    city varchar(100),
    CONSTRAINT dept_key PRIMARY KEY (dept_id),
    CONSTRAINT dept_city_unique UNIQUE (dept, city)
);

CREATE TABLE employees (
    emp_id bigserial,
    first_name varchar(100),
    last_name varchar(100),
    salary integer,
    dept_id integer REFERENCES departments (dept_id),
    CONSTRAINT emp_key PRIMARY KEY (emp_id),
    CONSTRAINT emp_dept_unique UNIQUE (emp_id, dept_id)
);

INSERT INTO departments (dept, city)
VALUES
('Tax', 'Atlanta'),
('IT', 'Boston');

INSERT INTO employees (first_name, last_name, salary, dept_id)
VALUES
('Nancy', 'Jones', 62500, 1),
('Lee', 'Smith', 59300, 1),
('Soo', 'Nguyen', 83000, 2),
('Janet', 'King', 95000, 2);
```

### Primary Keys

The two tables follow Codd's relational model in that each describes attributes about a single entity. In the departments table, the `dept_id` column is the table's **primary key**. A primary key is a column or collection of columns whose values uniquely identify each row in a table.

**A valid primary key column enforces certain constraints:**
- The column or collection of columns must have a unique value for each row
- The column or collection of columns can't have missing values

You define the primary key using a `CONSTRAINT` keyword. The `dept_id` column uniquely identifies the department.

**Note:** Primary key values only need to be unique within a table. That's why it's okay for both the employees table and the departments table to have primary key values using the same numbers.

### Foreign Keys

The `emp_id` column uniquely identifies each row in the employees table. For you to know which department each employee works in, the table includes a `dept_id` column. The values in this column refer to values in the departments table's primary key. We call this a **foreign key**, which you add as a constraint when creating the table.

**A foreign key constraint requires:**
- A value entered in a column to already exist in the primary key of the table it references
- So, values in `dept_id` in the employees table must exist in `dept_id` in the departments table; otherwise, you can't add them

**Differences from primary keys:**
- Unlike a primary key, a foreign key column can be empty
- A foreign key column can contain duplicate values

In this example, the `dept_id` associated with the employee Nancy Jones is 1; this refers to the value of 1 in the departments table's primary key, `dept_id`. That tells us that Nancy Jones is part of the Tax department located in Atlanta.

### UNIQUE Constraints

Both tables also include a UNIQUE constraint, which guarantees that values in a column, or a combination of values in more than one column, are unique. In departments, it requires that each row have a unique pair of values for `dept` and `city`. In employees, each row must have a unique pair of `emp_id` and `dept_id`. You add these constraints to avoid duplicate data. For example, you can't have two tax departments in Atlanta.

### Advantages of Relational Design

You might ask: what is the advantage of breaking apart data into components like this? Well, consider what this sample of data would look like if you had received it all in one table:

**Problems with single table:**
1. **Data redundancy**: When you combine data from various entities in one table, inevitably you have to repeat information. The department name and location is spelled out for each employee. This is fine when the table consists of four rows, or even 4,000. But when a table holds millions of rows, repeating lengthy strings is redundant and wastes precious space.

2. **Data management difficulty**: Cramming unrelated data into one table makes managing the data difficult. What if the Marketing department changes its name to Brand Marketing? Each row in the table would require an update. It's simpler to store department names and locations in just one table and update it only once.

## Querying Multiple Tables Using JOIN

When you join tables in a query, the database connects rows in both tables where the columns you specified for the join have matching values. The query results then include columns from both tables if you requested them as part of the query. You also can use columns from the joined tables to filter results using a WHERE clause.

Queries that join tables are similar in syntax to basic SELECT statements. The difference is that the query also specifies:
- The tables and columns to join, using a SQL `JOIN ... ON` statement
- The type of join to perform using variations of the JOIN keyword

### Basic JOIN Example

To join the example employees and departments tables and see all related data from both:

```sql
SELECT *
FROM employees JOIN departments
ON employees.dept_id = departments.dept_id;
```

**How it works:**
- Include an asterisk wildcard with the SELECT statement to choose all columns from both tables
- The JOIN keyword goes between the two tables you want data from
- Specify the columns to join the tables using the ON keyword
- For each table, provide the table name, a period, and the column that contains the key values
- An equal sign goes between the two table and column names

When you run the query, the results include all values from both tables where values in the `dept_id` columns match. In fact, even the `dept_id` field appears twice because you selected all columns of both tables.

So, even though the data lives in two tables, each with a focused set of columns, you can query those tables to pull the relevant data back together.

## Join Types

There's more than one way to join tables in SQL, and the type of join you'll use depends on how you want to retrieve data. While reviewing each, it's helpful to think of two tables side by side, one on the left of the JOIN keyword and the other on the right.

### Setting Up Example Tables

To better visualize join types, let's create two simple tables that hold names of schools:

```sql
CREATE TABLE schools_left (
    id integer CONSTRAINT left_id_key PRIMARY KEY,
    left_school varchar(30)
);

CREATE TABLE schools_right (
    id integer CONSTRAINT right_id_key PRIMARY KEY,
    right_school varchar(30)
);

INSERT INTO schools_left (id, left_school) VALUES
(1, 'Oak Street School'),
(2, 'Roosevelt High School'),
(5, 'Washington Middle School'),
(6, 'Jefferson High School');

INSERT INTO schools_right (id, right_school) VALUES
(1, 'Oak Street School'),
(2, 'Roosevelt High School'),
(3, 'Morrison Elementary'),
(4, 'Chase Magnet Academy'),
(6, 'Jefferson High School');
```

Notice that only schools with the id of 1, 2, and 6 match in both tables.

### JOIN (INNER JOIN)

**Returns:** Rows from both tables where matching values are found in the joined columns of both tables. Alternate syntax is `INNER JOIN`.

```sql
SELECT *
FROM schools_left JOIN schools_right
ON schools_left.id = schools_right.id;
```

**Result:** Only the three rows where IDs match (1, 2, 6). Schools that exist only in one of the two tables don't appear in the result.

**When to use:** Typically, when you're working with well-structured, well-maintained data sets and only need to find rows that exist in all the tables you're joining. Because JOIN doesn't provide rows that exist in only one of the tables, if you want to see all the data in one or more of the tables, use one of the other join types.

### LEFT JOIN

**Returns:** Every row from the left table plus rows that match values in the joined column from the right table. When a left table row doesn't have a match in the right table, the result shows no values from the right table.

```sql
SELECT *
FROM schools_left LEFT JOIN schools_right
ON schools_left.id = schools_right.id;
```

**Result:** All four rows from `schools_left` as well as the three rows in `schools_right` where the id fields matched. Because `schools_right` doesn't contain a value of 5, there's no match, so LEFT JOIN shows an empty row on the right rather than omitting the entire row from the left table. The rows from `schools_right` that don't match any values in `schools_left` are omitted from the results.

### RIGHT JOIN

**Returns:** Every row from the right table plus rows that match the key values in the key column from the left table. When a right table row doesn't have a match in the left table, the result shows no values from the left table.

```sql
SELECT *
FROM schools_left RIGHT JOIN schools_right
ON schools_left.id = schools_right.id;
```

**Result:** All rows from `schools_right` plus rows from `schools_left` where the id columns have matching values, but the query doesn't return the rows of `schools_left` that don't have a match with `schools_right`.

**When to use LEFT JOIN or RIGHT JOIN:**
- You want your query results to contain all the rows from one of the tables
- You want to look for missing values in one of the tables; for example, when you're comparing data about an entity representing two different time periods
- When you know some rows in a joined table won't have matching values

### FULL OUTER JOIN

**Returns:** Every row from both tables and matches rows; then joins the rows where values in the joined columns match. If there's no match for a value in either the left or right table, the query result contains an empty row for the other table.

```sql
SELECT *
FROM schools_left FULL OUTER JOIN schools_right
ON schools_left.id = schools_right.id;
```

**Result:** Every row from the left table, including matching rows and blanks for missing rows from the right table, followed by any leftover missing rows from the right table.

**When to use:** A full outer join is admittedly less useful and used less often than inner and left or right joins. Still, you can use it for a couple of tasks:
- To merge two data sources that partially overlap
- To visualize the degree to which the tables share matching values

### CROSS JOIN

**Returns:** Every possible combination of rows from both tables (also known as a Cartesian product).

```sql
SELECT *
FROM schools_left CROSS JOIN schools_right;
```

**Result:** 20 rows—the product of four rows in the left table times five rows in the right. Each row from the left table is paired with every row from the right table.

**Important:** Because the join doesn't need to find matches between key fields, there's no need to provide the clause using the ON keyword.

**Warning:** Unless you want to take an extra-long coffee break, avoid a CROSS JOIN query on large tables. Two tables with 250,000 records each would produce a result set of 62.5 billion rows and tax even the hardiest server.

**Practical use:** Generating data to create a checklist, such as all colors you'd want to offer for each shirt style in a warehouse.

## Using NULL to Find Rows with Missing Values

Being able to reveal missing data from one of the tables is valuable when you're digging through data. Any time you join tables, it's wise to vet the quality of the data and understand it better by discovering whether all key values in one table appear in another. There are many reasons why a discrepancy might exist, such as a clerical error, incomplete output from the database, or some change in the data over time.

### Understanding NULL

In SQL, **NULL** is a special value that represents a condition in which there's no data present or where the data is unknown because it wasn't included. For example, if a person filling out an address form skips the "Middle Initial" field, rather than storing an empty string in the database, we'd use NULL to represent the unknown value.

**Important points about NULL:**
- NULL is different from 0 or an empty string (`""`)
- Both 0 and empty string could have some unintended meaning that's open to misinterpretation
- NULL shows that the value is unknown
- Unlike 0 or an empty string, you can use NULL across data types

### Finding Missing Values

When a SQL join returns empty rows in one of the tables, those columns don't come back empty but instead come back with the value NULL. To find those rows, we add a WHERE clause to filter for NULL using `IS NULL`:

```sql
SELECT *
FROM schools_left LEFT JOIN schools_right
ON schools_left.id = schools_right.id
WHERE schools_right.id IS NULL;
```

**Result:** Only the rows from the left table that didn't have a match on the right side.

**To find columns with data:** Use `IS NOT NULL`:

```sql
WHERE schools_right.id IS NOT NULL;
```

## Three Types of Table Relationships

Part of the science (or art) of joining tables involves understanding how the database designer intends for the tables to relate, also known as the database's relational model. The three types of table relationships are one-to-one, one-to-many, and many-to-many.

### One-to-One Relationship

In our JOIN example, there is only one match for an id in each of the two tables. In addition, there are no duplicate id values in either table: only one row in the left table exists with an id of 1, and only one row in the right table has an id of 1. In database parlance, this is called a **one-to-one relationship**.

**Example:** Joining two tables with state-by-state census data. One table might contain household income data and the other data on educational attainment. Both tables would have 51 rows (one for each state plus Washington, D.C.), and if we wanted to join them on a key such as state name, state abbreviation, or a standard geography code, we'd have only one match for each key value in each table.

### One-to-Many Relationship

In a **one-to-many relationship**, a key value in the first table will have multiple matching values in the second table's joined column.

**Example:** Consider a database that tracks automobiles. One table would hold data on automobile manufacturers, with one row each for Ford, Honda, Kia, and so on. A second table with model names, such as Focus, Civic, Sedona, and Accord, would have several rows matching each row in the manufacturers' table.

**Real-world example:** The employees and departments tables we created earlier. One department (dept_id = 1) has multiple employees (Nancy Jones and Lee Smith).

### Many-to-Many Relationship

In a **many-to-many relationship**, multiple rows in the first table will have multiple matching rows in the second table.

**Example:** A table of baseball players could be joined to a table of field positions. Each player can be assigned to multiple positions, and each position can be played by multiple people.

**Understanding these relationships is essential** because it helps us discern whether the results of queries accurately reflect the structure of the database.

## Selecting Specific Columns in a Join

So far, we've used the asterisk wildcard to select all columns from both tables. That's okay for quick data checks, but more often you'll want to specify a subset of columns. You can focus on just the data you want and avoid inadvertently changing the query results if someone adds a new column to a table.

### The Ambiguity Problem

As you learned in single-table queries, to select particular columns you use the SELECT keyword followed by the desired column names. When joining tables, the syntax changes slightly: **you must include the column as well as its table name**. The reason is that more than one table can contain columns with the same name, which is certainly true of our joined tables so far.

Consider the following query, which tries to fetch an `id` column without naming the table:

```sql
SELECT id
FROM schools_left LEFT JOIN schools_right
ON schools_left.id = schools_right.id;
```

Because `id` exists in both `schools_left` and `schools_right`, the server throws an error: **column reference "id" is ambiguous**. It's not clear which table `id` belongs to.

### Solution: Table Name Prefix

To fix the error, we need to add the table name in front of each column we're querying, as we do in the ON clause:

```sql
SELECT schools_left.id,
       schools_left.left_school,
       schools_right.right_school
FROM schools_left LEFT JOIN schools_right
ON schools_left.id = schools_right.id;
```

We simply prefix each column name with the table it comes from, and the rest of the query syntax is the same.

### Using Column Aliases

We can also add the AS keyword to make it clear in the results that the id column is from `schools_left`:

```sql
SELECT schools_left.id AS left_id,
       schools_left.left_school,
       schools_right.right_school
FROM schools_left LEFT JOIN schools_right
ON schools_left.id = schools_right.id;
```

This would display the name of the `schools_left` id column as `left_id`.

## Simplifying JOIN Syntax with Table Aliases

Naming the table for a column is easy enough, but doing so for multiple columns clutters your code. One of the best ways to serve your colleagues is to write code that's readable, which should generally not involve making them wade through table names repeated for 25 columns! The way to write more concise code is to use a shorthand approach called **table aliases**.

### Creating Table Aliases

To create a table alias, we place a character or two after the table name when we declare it in the FROM clause. (You can use more than a couple of characters for an alias, but if the goal is to simplify code, don't go overboard.) Those characters then serve as an alias we can use instead of the full table name anywhere we reference the table in the code.

```sql
SELECT lt.id,
       lt.left_school,
       rt.right_school
FROM schools_left AS lt LEFT JOIN schools_right AS rt
ON lt.id = rt.id;
```

**How it works:**
- In the FROM clause, we declare the alias `lt` to represent `schools_left` and the alias `rt` to represent `schools_right` using the AS keyword
- Once that's in place, we can use the aliases instead of the full table names everywhere else in the code
- Immediately, our SQL looks more compact, and that's ideal

## Joining Multiple Tables

Of course, SQL joins aren't limited to two tables. We can continue adding tables to the query as long as we have columns with matching values to join on.

### Example: Three-Table Join

Let's say we obtain two more school-related tables and want to join them to `schools_left` in a three-table join:

**Table 1: schools_enrollment** (number of students per school)
```sql
CREATE TABLE schools_enrollment (
    id integer,
    enrollment integer
);

INSERT INTO schools_enrollment (id, enrollment)
VALUES
(1, 360),
(2, 1001),
(5, 450),
(6, 927);
```

**Table 2: schools_grades** (grade levels housed in each building)
```sql
CREATE TABLE schools_grades (
    id integer,
    grades varchar(10)
);

INSERT INTO schools_grades (id, grades)
VALUES
(1, 'K-3'),
(2, '9-12'),
(5, '6-8'),
(6, '9-12');
```

**Three-table join query:**
```sql
SELECT lt.id, lt.left_school, en.enrollment, gr.grades
FROM schools_left AS lt 
LEFT JOIN schools_enrollment AS en
ON lt.id = en.id
LEFT JOIN schools_grades AS gr
ON lt.id = gr.id;
```

**How it works:**
- We join `schools_left` to `schools_enrollment` using the tables' id fields
- We declare table aliases to keep the code compact
- Next, the query joins `schools_left` to `schools_grades` again on the id fields
- Our result now includes columns from all three tables

**Result:**
```
id | left_school              | enrollment | grades
---|--------------------------|------------|-------
1  | Oak Street School        | 360        | K-3
2  | Roosevelt High School    | 1001       | 9-12
5  | Washington Middle School | 450        | 6-8
6  | Jefferson High School    | 927        | 9-12
```

**Note:** If you need to, you can add even more tables to the query using additional joins. You can also join on different columns, depending on the tables' relationships. Although there is no hard limit in SQL to the number of tables you can join in a single query, some database systems might impose one. Check the documentation.

## Performing Math on Joined Table Columns

The math functions we explored in Chapter 5 are just as usable when working with joined tables. We just need to include the table name when referencing a column in an operation, as we did when selecting table columns.

### Example: Comparing Census Data Over Time

If you work with any data that has a new release at regular intervals, you'll find this concept useful for joining a newly released table to an older one and exploring how values have changed.

Let's look at how to do this by revisiting the `us_counties_2010` table we created in Chapter 4 and loading similar county data from the previous Decennial Census, in 2000, to a new table:

```sql
CREATE TABLE us_counties_2000 (
    geo_name varchar(90),
    state_us_abbreviation varchar(2),
    state_fips varchar(2),
    county_fips varchar(3),
    p0010001 integer,
    p0010002 integer,
    p0010003 integer,
    p0010004 integer,
    p0010005 integer,
    p0010006 integer,
    p0010007 integer,
    p0010008 integer,
    p0010009 integer,
    p0010010 integer,
    p0020002 integer,
    p0020003 integer
);

COPY us_counties_2000
FROM 'C:\YourDirectory\us_counties_2000.csv'
WITH (FORMAT CSV, HEADER);

SELECT c2010.geo_name,
       c2010.state_us_abbreviation AS state,
       c2010.p0010001 AS pop_2010,
       c2000.p0010001 AS pop_2000,
       c2010.p0010001 - c2000.p0010001 AS raw_change,
       round((CAST(c2010.p0010001 AS numeric(8,1)) - c2000.p0010001)
       / c2000.p0010001 * 100, 1) AS pct_change
FROM us_counties_2010 c2010 
INNER JOIN us_counties_2000 c2000
ON c2010.state_fips = c2000.state_fips
AND c2010.county_fips = c2000.county_fips
AND c2010.p0010001 <> c2000.p0010001
ORDER BY pct_change DESC;
```

**How it works:**
- We create the `us_counties_2000` table with similar structure to the 2010 table
- The COPY statement imports a CSV file with the census data
- The SELECT statement includes the county's name and state abbreviation from the 2010 table, which is aliased with `c2010`
- Next are the `p0010001` total population columns from the 2010 and 2000 tables, both renamed with unique names using AS
- To get the raw change in population, we subtract the 2000 population from the 2010 count
- To find the percent change, we employ a formula and round the results to one decimal point

**Joining on multiple columns:**
- We join by matching values in two columns in both tables: `state_fips` and `county_fips`
- The reason to join on two columns instead of one is that in both tables, we need the combination of a state code and a county code to find a unique county
- We've added a third condition using an inequality (`<>`) to limit the join to counties where the `p0010001` population column has a different value
- We combine all three conditions using the AND keyword
- Finally, the results are sorted in descending order by percent change so we can see the fastest growers at the top

**Result example:**
```
name            | state | pop_2010 | pop_2000 | raw_change | pct_change
----------------|-------|----------|----------|------------|-----------
Kendall County  | IL    | 114736   | 54544    | 60192      | 110.4
Pinal County    | AZ    | 375770   | 179727   | 196043     | 109.1
Flagler County  | FL    | 95696    | 49832    | 45864      | 92.0
Lincoln County  | SD    | 44828    | 24131    | 20697      | 85.8
Loudoun County  | VA    | 312311   | 169599   | 142712     | 84.1
```

Two counties, Kendall in Illinois and Pinal in Arizona, more than doubled their population in 10 years, with counties in Florida, South Dakota, and Virginia not far behind. That's a valuable story extracted from this analysis and a starting point for understanding national population trends.

## Summary

Given that table relationships are foundational to database architecture, learning to join tables in queries allows you to handle many of the more complex data sets you'll encounter. Experimenting with the different types of joins on tables can tell you a great deal about how data have been gathered and reveal when there's a quality issue. Make trying various joins a routine part of your exploration of a new data set.

### Key Concepts Covered

- **JOIN syntax**: Basic `JOIN ... ON` statement structure
- **Primary keys**: Columns that uniquely identify each row
- **Foreign keys**: Columns that reference primary keys in other tables
- **UNIQUE constraints**: Ensuring unique values in columns or column combinations
- **Join types**: JOIN/INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, CROSS JOIN
- **NULL values**: Special value representing missing or unknown data
- **Table relationships**: One-to-one, one-to-many, many-to-many
- **Column selection**: Using table prefixes to avoid ambiguity
- **Table aliases**: Simplifying code with shorthand table names
- **Multiple table joins**: Joining three or more tables
- **Math on joined tables**: Performing calculations across joined table columns

### Best Practices

1. Always use table prefixes or aliases when selecting columns in joins
2. Use appropriate join types based on your data needs
3. Use LEFT JOIN or RIGHT JOIN when you need all rows from one table
4. Use INNER JOIN when you only need matching rows
5. Use IS NULL to find missing values in joins
6. Use table aliases to keep code readable and concise
7. Join on multiple columns when needed to uniquely identify relationships
8. Validate data quality by checking for missing matches
9. Understand table relationships before writing join queries
10. Use CROSS JOIN sparingly and only on small tables

### When to Use Each Join Type

- **INNER JOIN**: When you need only rows that exist in both tables
- **LEFT JOIN**: When you need all rows from the left table plus matches from the right
- **RIGHT JOIN**: When you need all rows from the right table plus matches from the left
- **FULL OUTER JOIN**: When you need all rows from both tables regardless of matches
- **CROSS JOIN**: When you need all possible combinations (use with caution)

## Next Steps

Moving forward, we'll continue building on these bigger concepts as we drill deeper into finding information in data sets and working with the finer nuances of handling data types and making sure we have quality data. But first, we'll look at one more foundational element: employing best practices to build reliable, speedy databases with SQL.
