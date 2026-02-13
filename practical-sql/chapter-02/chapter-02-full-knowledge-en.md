# Chapter 2: Beginning Data Exploration with SELECT

## Introduction

The best part of digging into data is when you actually get to interview the data. Those are the moments when you discover whether the data is clean or dirty, whether it's complete, and most of all, what story the data can tell. Think of interviewing data as a process akin to interviewing a person applying for a job. You want to ask questions that reveal whether the reality of their expertise matches their resume.

Interviewing is exciting because you discover truths. For example, you might find that half the respondents forgot to fill out the email field in the questionnaire, or the mayor hasn't paid property taxes for the past five years. Or you might learn that your data is dirty: names are spelled inconsistently, dates are incorrect, or numbers don't jibe with your expectations. Your findings become part of the data's story.

In SQL, interviewing data starts with the **SELECT** keyword, which retrieves rows and columns from one or more of the tables in a database. A SELECT statement can be simple, retrieving everything in a single table, or it can be complex enough to link dozens of tables while handling multiple calculations and filtering by exact criteria.

## Basic SELECT Syntax

### The Simplest SELECT Statement

Here's a SELECT statement that fetches every row and column in a table called `my_table`:

```sql
SELECT * FROM my_table;
```

This single line of code shows the most basic form of a SQL query. The asterisk (`*`) following the SELECT keyword is a **wildcard**. A wildcard is like a stand-in for a value: it doesn't represent anything in particular and instead represents everything that value could possibly be. Here, it's shorthand for "select all columns."

**Key Components:**
- `SELECT` - Keyword that specifies which columns to retrieve
- `*` - Wildcard meaning "all columns"
- `FROM` - Keyword indicating the source table
- `my_table` - The name of the table
- `;` - Semicolon marks the end of the query statement

### Example: Querying All Data

Using the `teachers` table from Chapter 1:

```sql
SELECT * FROM teachers;
```

This returns all rows and columns from the teachers table. Note that the `id` column (of type `bigserial`) automatically fills with sequential integers, even though you didn't explicitly insert them. This auto-incrementing integer acts as a unique identifier, or key, that not only ensures each row in the table is unique, but also will later give us a way to connect this table to other tables in the database.

## Querying a Subset of Columns

Using the asterisk wildcard is helpful for discovering the entire contents of a table. But often it's more practical to limit the columns the query retrieves, especially with large databases. You can do this by naming columns, separated by commas, right after the SELECT keyword.

### Syntax

```sql
SELECT column1, column2, column3 FROM table_name;
```

With that syntax, the query will retrieve all rows from just those specified columns.

### Example: Selecting Specific Columns

```sql
SELECT last_name, first_name, salary FROM teachers;
```

**Important Notes:**
- The order of the columns in the query can be different than the order in the table
- You're able to retrieve columns in any order you'd like
- This is a good strategy for beginning your interview of a data set

### Data Quality Assessment

When querying data, it's wise to start your analysis by checking whether your data is present and in the format you expect:
- Are dates in a complete month-date-year format?
- Does every row have a value?
- Are there mysteriously no last names starting with letters beyond "M"?

All these issues indicate potential hazards ranging from missing data to shoddy recordkeeping somewhere in the workflow. When you're facing a table of thousands or even millions of rows, it's essential to get a quick read on your data quality and the range of values it contains.

## Using DISTINCT to Find Unique Values

In a table, it's not unusual for a column to contain rows with duplicate values. In the teachers table, for example, the school column lists the same school names multiple times because each school employs many teachers.

### Basic DISTINCT Syntax

To understand the range of values in a column, we can use the **DISTINCT** keyword as part of a query that eliminates duplicates and shows only unique values. Use the DISTINCT keyword immediately after SELECT:

```sql
SELECT DISTINCT column_name
FROM table_name;
```

### Example: Finding Unique School Names

```sql
SELECT DISTINCT school
FROM teachers;
```

This returns only the unique school names, even though there are multiple rows in the table. This is a helpful first step toward assessing data quality. For example, if a school name is spelled more than one way, those spelling variations will be easy to spot and correct.

### DISTINCT with Multiple Columns

The DISTINCT keyword also works on more than one column at a time. If we add a column, the query returns each unique pair of values:

```sql
SELECT DISTINCT school, salary
FROM teachers;
```

This returns each unique combination of school and salary. This technique gives us the ability to ask, "For each x in the table, what are all the y values?" For example:
- For each factory, what are all the chemicals it produces?
- For each election district, who are all the candidates running for office?
- For each concert hall, who are the artists playing this month?

## Sorting Data with ORDER BY

Data can make more sense, and may reveal patterns more readily, when it's arranged in order rather than jumbled randomly.

### Basic ORDER BY Syntax

In SQL, we order the results of a query using a clause containing the keywords **ORDER BY** followed by the name of the column or columns to sort. Applying this clause doesn't change the original table, only the result of the query.

```sql
SELECT column1, column2
FROM table_name
ORDER BY column1 DESC;
```

### Sorting Direction

- **ASC** - Ascending order (default, can be omitted)
- **DESC** - Descending order (must be specified)

### Example: Sorting by Salary

```sql
SELECT first_name, last_name, salary
FROM teachers
ORDER BY salary DESC;
```

This orders the salary column from highest to lowest, allowing you to determine which teachers earn the most.

### Sorting Multiple Columns

You're not limited to sorting on just one column. You can sort by multiple columns:

```sql
SELECT last_name, school, hire_date
FROM teachers
ORDER BY school ASC, hire_date DESC;
```

In this case, we're retrieving the last names of teachers, their school, and the date they were hired. By sorting the school column in ascending order and hire_date in descending order, we create a listing of teachers grouped by school with the most recently hired teachers listed first.

**Important Notes:**
- You can use ORDER BY on more than two columns, but you'll soon reach a point of diminishing returns
- A better strategy is to limit the number of columns in your query to only the most important, and then run several queries to answer each question you have
- Digesting data happens most easily when the result focuses on answering a specific question

### Understanding Text Sorting

Sorting a column of numbers in PostgreSQL yields what you might expect: the data ranked from largest value to smallest or vice versa. But sorting a column with letters or other characters may return surprising results, especially if it has a mix of uppercase and lowercase characters, punctuation, or numbers that are treated as text.

During PostgreSQL installation, the server is assigned a particular locale for collation, or ordering of text, as well as a character set. Both are based either on settings in the computer's operating system or custom options supplied during installation.

**PostgreSQL sorts characters in this order (based on UTF-8):**
1. Punctuation marks, including quotes, parentheses, and math operators
2. Numbers 0 to 9
3. Additional punctuation, including the question mark
4. Capital letters from A to Z
5. More punctuation, including brackets and underscore
6. Lowercase letters a to z
7. Additional punctuation, special characters, and the extended alphabet

Normally, the sorting order won't be an issue because character columns usually just contain names, places, descriptions, and other straightforward text. But if you're wondering why "Ladybug" appears before "ladybug" in your sort, you now have an explanation.

## Filtering Rows with WHERE

Sometimes, you'll want to limit the rows a query returns to only those in which one or more columns meet certain criteria. Using teachers as an example, you might want to find all teachers hired before a particular year or all teachers making more than $75,000 at elementary schools.

### Basic WHERE Syntax

The **WHERE** keyword allows you to find rows that match a specific value, a range of values, or multiple values based on criteria supplied via an operator. You also can exclude rows based on criteria.

**Standard SQL syntax:** The WHERE clause follows the FROM keyword and the name of the table or tables being queried.

```sql
SELECT column1, column2
FROM table_name
WHERE condition;
```

### Example: Filtering by School

```sql
SELECT last_name, school, hire_date
FROM teachers
WHERE school = 'Myers Middle School';
```

This returns only the teachers assigned to Myers Middle School.

## Comparison and Matching Operators

The WHERE clause uses operators to define conditions. Here are the most commonly used comparison and matching operators in PostgreSQL:

### Comparison Operators

| Operator | Function | Example |
|----------|----------|---------|
| `=` | Equal to | `WHERE school = 'Baker Middle'` |
| `<>` or `!=` | Not equal to* | `WHERE school <> 'Baker Middle'` |
| `>` | Greater than | `WHERE salary > 20000` |
| `<` | Less than | `WHERE salary < 60500` |
| `>=` | Greater than or equal to | `WHERE salary >= 20000` |
| `<=` | Less than or equal to | `WHERE salary <= 60500` |
| `BETWEEN` | Within a range | `WHERE salary BETWEEN 20000 AND 40000` |
| `IN` | Match one of a set of values | `WHERE last_name IN ('Bush', 'Roush')` |
| `LIKE` | Match a pattern (case sensitive) | `WHERE first_name LIKE 'Sam%'` |
| `ILIKE` | Match a pattern (case insensitive) | `WHERE first_name ILIKE 'sam%'` |
| `NOT` | Negates a condition | `WHERE first_name NOT ILIKE 'sam%'` |

*The `!=` operator is not part of standard ANSI SQL but is available in PostgreSQL and several other database systems.

### Examples of Comparison Operators

**Equal to:**
```sql
SELECT first_name, last_name, school
FROM teachers
WHERE first_name = 'Janet';
```

**Not equal to:**
```sql
SELECT school
FROM teachers
WHERE school != 'F.D. Roosevelt HS';
```

**Less than (with dates):**
```sql
SELECT first_name, last_name, hire_date
FROM teachers
WHERE hire_date < '2000-01-01';
```

**Greater than or equal to:**
```sql
SELECT first_name, last_name, salary
FROM teachers
WHERE salary >= 43500;
```

**BETWEEN (inclusive):**
```sql
SELECT first_name, last_name, school, salary
FROM teachers
WHERE salary BETWEEN 40000 AND 65000;
```

Note that BETWEEN is inclusive, meaning the result will include values matching the start and end ranges specified.

## Using LIKE and ILIKE with WHERE

Comparison operators are fairly straightforward, but LIKE and ILIKE deserve additional explanation. Both let you search for patterns in strings by using two special characters:

### Wildcard Characters

- **Percent sign (`%`)** - A wildcard matching one or more characters
- **Underscore (`_`)** - A wildcard matching just one character

### Pattern Examples

For example, if you're trying to find the word "baker", the following LIKE patterns will match it:
- `LIKE 'b%'` - Matches anything starting with "b"
- `LIKE '%ak%'` - Matches anything containing "ak"
- `LIKE '_aker'` - Matches any 5-character string ending with "aker"
- `LIKE 'ba_er'` - Matches "ba" + any single character + "er"

### LIKE vs ILIKE

The difference between LIKE and ILIKE:
- **LIKE** - Case sensitive (part of ANSI SQL standard)
- **ILIKE** - Case insensitive (PostgreSQL-only implementation)

### Example: Case Sensitivity

```sql
-- Returns zero results (case sensitive)
SELECT first_name
FROM teachers
WHERE first_name LIKE 'sam%';

-- Returns Samuel and Samantha (case insensitive)
SELECT first_name
FROM teachers
WHERE first_name ILIKE 'sam%';
```

**Best Practice:** Over the years, many developers gravitate toward using ILIKE and wildcard operators in searches to make sure they're not inadvertently excluding results from searches. Don't assume that whoever typed the names of people, places, products, or other proper nouns always remembered to capitalize them. And if one of the goals of interviewing data is to understand its quality, using a case-insensitive search will help you find variations.

**Performance Note:** Because LIKE and ILIKE search for patterns, performance on large databases can be slow. We can improve performance using indexes, which will be covered in later chapters.

## Combining Operators with AND and OR

Comparison operators become even more useful when we combine them. To do this, we connect them using keywords **AND** and **OR** along with, if needed, parentheses.

### Using AND

The AND keyword requires both conditions to be true:

```sql
SELECT *
FROM teachers
WHERE school = 'Myers Middle School'
AND salary < 40000;
```

This finds teachers who work at Myers Middle School **and** have a salary less than $40,000. Because we connect the two conditions using AND, both must be true for a row to meet the criteria in the WHERE clause and be returned in the query results.

### Using OR

The OR keyword requires at least one condition to be true:

```sql
SELECT *
FROM teachers
WHERE last_name = 'Cole'
OR last_name = 'Bush';
```

This searches for any teacher whose last name matches Cole **or** Bush. When we connect conditions using OR, only one of the conditions must be true for a row to meet the criteria of the WHERE clause.

### Using Parentheses for Grouping

When we place statements inside parentheses, those are evaluated as a group before being combined with other criteria:

```sql
SELECT *
FROM teachers
WHERE school = 'F.D. Roosevelt HS'
AND (salary < 38000 OR salary > 40000);
```

This looks for teachers at Roosevelt whose salaries are either less than $38,000 **or** greater than $40,000. The school name must be exactly F.D. Roosevelt HS **and** the salary must be either less or higher than specified for a row to meet the criteria of the WHERE clause.

**Important:** Without parentheses, the query would be interpreted differently due to operator precedence. Parentheses ensure the correct logical grouping.

## Putting It All Together

You can combine comparison operator statements using the AND and OR keywords to provide multiple criteria for filtering, and you can include an ORDER BY clause to rank the results.

### Complete SELECT Statement Structure

SQL is particular about the order of keywords, so follow this convention:

```sql
SELECT column_names
FROM table_name
WHERE criteria
ORDER BY column_names;
```

### Example: Complete Query

```sql
SELECT first_name, last_name, school, hire_date, salary
FROM teachers
WHERE school LIKE '%Roos%'
ORDER BY hire_date DESC;
```

This query:
1. Selects specific columns
2. Filters rows where school name contains "Roos" (case-sensitive)
3. Orders results by hire date in descending order (newest first)

This returns teachers at Roosevelt High School, ordered from newest hire to earliest. We can see a clear correlation between a teacher's hire date at the school and his or her current salary level.

## Summary

Now that you've learned the basic structure of a few different SQL queries, you've acquired the foundation for many of the additional skills covered in later chapters. Sorting, filtering, and choosing only the most important columns from a table can yield a surprising amount of information from your data and help you find the story it tells.

### Key Concepts Covered

- **SELECT** - Retrieves data from tables
- **Wildcard (`*`)** - Selects all columns
- **Column Selection** - Choosing specific columns
- **DISTINCT** - Finding unique values
- **ORDER BY** - Sorting query results
- **WHERE** - Filtering rows based on conditions
- **Comparison Operators** - `=`, `<>`, `>`, `<`, `>=`, `<=`, `BETWEEN`, `IN`
- **Pattern Matching** - `LIKE` and `ILIKE` with wildcards (`%`, `_`)
- **Logical Operators** - `AND`, `OR`, `NOT`
- **Parentheses** - Grouping conditions for complex queries

### Best Practices

1. Start with `SELECT *` to explore data, then narrow to specific columns
2. Use DISTINCT to assess data quality and find unique values
3. Use ORDER BY to reveal patterns in your data
4. Use WHERE to filter data to answer specific questions
5. Prefer ILIKE over LIKE for case-insensitive pattern matching
6. Use parentheses to clarify complex logical conditions
7. Limit columns in queries to focus on answering specific questions
8. Run multiple focused queries rather than one complex query

## Next Steps

In the next chapter, you'll learn about another foundational aspect of SQL: data types. Understanding data types is crucial for working effectively with databases and performing accurate analysis.
