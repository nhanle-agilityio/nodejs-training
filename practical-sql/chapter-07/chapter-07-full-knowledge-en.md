# Chapter 7: Table Design That Works for You

## Introduction

Obsession with detail can be a good thing. When you're running out the door, it's reassuring to know your keys will be hanging on the hook where you always leave them. The same holds true for database design. When you need to excavate a nugget of information from dozens of tables and millions of rows, you'll appreciate a dose of that same detail obsession. When you organize data into a finely tuned, smartly named set of tables, the analysis experience becomes more manageable.

In this chapter, we'll build on Chapter 6 by introducing best practices for organizing and tuning SQL databases, whether they're yours or ones you inherit for analysis. You already know how to create basic tables and add columns with the appropriate data type and a primary key. Now, we'll dig deeper into table design by exploring naming rules and conventions, ways to maintain the integrity of your data, and how to add indexes to tables to speed up queries.

## Naming Tables, Columns, and Other Identifiers

Developers tend to follow different SQL style patterns when naming tables, columns, and other objects (called identifiers). Some prefer to use camel case, as in `berrySmoothie`, where words are strung together and the first letter of each word is capitalized except for the first word. Pascal case, as in `BerrySmoothie`, follows a similar pattern but capitalizes the first letter of the first word too. With snake case, as in `berry_smoothie`, all the words are lowercase and separated by underscores. So far, we've been using snake case in most of the examples, such as in the table `us_counties_2010`.

You'll find passionate supporters of each naming convention, and some preferences are tied to individual database applications or programming languages. For example, Microsoft recommends Pascal case for its SQL Server users. Whichever convention you prefer, it's most important to choose a style and apply it consistently. Be sure to check whether your organization has a style guide or offer to collaborate on one, and then follow it religiously.

**The Problem with Inconsistent Naming:**
Mixing styles or following none generally leads to a mess. It will be difficult to know which table is the most current, which is the backup, or the difference between two similarly named tables. For example, imagine connecting to a database and finding the following collection of tables:
- `Customers`
- `customers`
- `custBackup`
- `customer_analysis`
- `customer_test2`
- `customer_testMarch2012`
- `customeranalysis`

In addition, working without a consistent naming scheme makes it problematic for others to dive into your data and makes it challenging for you to pick up where you left off.

## Using Quotes Around Identifiers to Enable Mixed Case

Standard ANSI SQL and many database-specific variants of SQL treat identifiers as case-insensitive unless you provide a delimiter around them—typically double quotes. Consider these two hypothetical CREATE TABLE statements for PostgreSQL:

```sql
CREATE TABLE customers (
    customer_id serial,
    --snip--
);

CREATE TABLE Customers (
    customer_id serial,
    --snip--
);
```

When you execute these statements in order, the first CREATE TABLE command creates a table called `customers`. But rather than creating a second table called `Customers`, the second statement will throw an error: **relation "customers" already exists**. Because you didn't quote the identifier, PostgreSQL treats `customers` and `Customers` as the same identifier, disregarding the case.

If you want to preserve the uppercase letter and create a separate table named `Customers`, you must surround the identifier with quotes, like this:

```sql
CREATE TABLE "Customers" (
    customer_id serial,
    --snip--
);
```

Now, PostgreSQL retains the uppercase C and creates `Customers` as well as `customers`. Later, to query `Customers` rather than `customers`, you'll have to quote its name in the SELECT statement:

```sql
SELECT * FROM "Customers";
```

Of course, you wouldn't want two tables with such similar names because of the high risk of a mix-up. This example simply illustrates the behavior of SQL in PostgreSQL.

### Pitfalls with Quoting Identifiers

Using quotation marks also permits characters not otherwise allowed in an identifier, including spaces. But be aware of the negatives of using this method: for example, you might want to throw quotes around `"trees planted"` and use that as a column name in a reforestation database, but then all users will have to provide quotes on every subsequent reference to that column. Omit the quotes and the database will respond with an error, identifying `trees` and `planted` as separate columns missing a comma between them. A more readable and reliable option is to use snake case, as in `trees_planted`.

**Another downside to quoting** is that it lets you use SQL reserved keywords, such as `TABLE`, `WHERE`, or `SELECT`, as an identifier. Reserved keywords are words SQL designates as having special meaning in the language. Most database developers frown on using reserved keywords as identifiers. At a minimum it's confusing, and at worst neglecting or forgetting to quote that keyword later will result in an error because the database will interpret the word as a command instead of an identifier.

**Note:** For PostgreSQL, you can find a list of keywords documented at https://www.postgresql.org/docs/current/static/sql-keywords-appendix.html. In addition, many code editors and database tools, including pgAdmin, will automatically highlight keywords in a particular color.

## Guidelines for Naming Identifiers

Given the extra burden of quoting and its potential problems, it's best to keep your identifier names simple, unquoted, and consistent. Here are recommendations:

### Use Snake Case

Snake case is readable and reliable, as shown in the earlier `trees_planted` example. It's used throughout the official PostgreSQL documentation and helps make multiword names easy to understand: `video_on_demand` makes more sense at a glance than `videoondemand`.

### Make Names Easy to Understand

Avoid cryptic abbreviations. If you're building a database related to travel, `arrival_time` is a better reminder of the content as a column name than `arv_tm`.

### For Table Names, Use Plurals

Tables hold rows, and each row represents one instance of an entity. So, use plural names for tables, such as `teachers`, `vehicles`, or `departments`.

### Mind the Length

The maximum number of characters allowed for an identifier name varies by database application:
- The SQL standard is 128 characters
- PostgreSQL limits you to 63 characters
- Oracle system maximum is 30 characters

If you're writing code that may get reused in another database system, lean toward shorter identifier names.

### When Making Copies of Tables

Use names that will help you manage them later. One method is to append a `YYYY_MM_DD` date to the table name when you create it, such as `tire_sizes_2017_10_20`. An additional benefit is that the table names will sort in date order.

## Controlling Column Values with Constraints

A column's data type already broadly defines the kind of data it will accept: integers versus characters, for example. But SQL provides several additional constraints that let us further specify acceptable values for a column based on rules and logical tests. With constraints, we can avoid the "garbage in, garbage out" phenomenon, which is what happens when poor-quality data result in inaccurate or incomplete analysis. Constraints help maintain the quality of the data and ensure the integrity of the relationships among tables.

In Chapter 6, you learned about primary and foreign keys, which are two of the most commonly used constraints. Let's review them as well as the following additional constraint types:

- **CHECK**: Evaluates whether the data falls within values we specify
- **UNIQUE**: Ensures that values in a column or group of columns are unique in each row in the table
- **NOT NULL**: Prevents NULL values in a column

### Column Constraints vs. Table Constraints

We can add constraints in two ways: as a column constraint or as a table constraint.

- **Column constraint**: Only applies to that column. It's declared with the column name and data type in the CREATE TABLE statement, and it gets checked whenever a change is made to the column.

- **Table constraint**: We can supply criteria that apply to one or more columns. We declare it in the CREATE TABLE statement immediately after defining all the table columns, and it gets checked whenever a change is made to a row in the table.

## Primary Keys: Natural vs. Surrogate

In Chapter 6, you learned about giving a table a primary key: a column or collection of columns whose values uniquely identify each row in a table. A primary key is a constraint, and it imposes two rules on the column or columns that make up the key:

1. Each column in the key must have a unique value for each row.
2. No column in the key can have missing values.

Primary keys also provide a means of relating tables to each other and maintaining referential integrity, which is ensuring that rows in related tables have matching values when we expect them to.

### Using Existing Columns for Natural Keys

You implement a natural key by using one or more of the table's existing columns rather than creating a column and filling it with artificial values to act as keys. If a column's values obey the primary key constraint—unique for every row and never empty—it can be used as a natural key. A value in the column can change as long as the new value doesn't cause a violation of the constraint.

**Example:** A driver's license identification number issued by a local Department of Motor Vehicles. Within a governmental jurisdiction, such as a state in the United States, we'd reasonably expect that all drivers would receive a unique ID on their licenses. But if we were compiling a national driver's license database, we might not be able to make that assumption; several states could independently issue the same ID code. In that case, the `driver_id` column may not have unique values and cannot be used as the natural key unless it's combined with one or more additional columns.

**Other examples of natural keys:**
- A part number
- A serial number
- A book's ISBN

### Introducing Columns for Surrogate Keys

Instead of relying on existing data, a surrogate key typically consists of a single column that you fill with artificial values. This might be a sequential number auto-generated by the database; for example, using a serial data type. Some developers like to use a Universally Unique Identifier (UUID), which is a code comprised of 32 hexadecimal digits that identifies computer hardware or software. Here's an example:
```
2911d8a8-6dea-4a46-af23-d64175a08237
```

### Pros and Cons of Key Types

**Reasons cited for using natural keys:**
- The data already exists in the table, and you don't need to add a column to create a key
- Because the natural key data has meaning, it can reduce the need to join tables when searching

**Reasons cited for using surrogate keys:**
- Because a surrogate key doesn't have any meaning in itself and its values are independent of the data in the table, if your data changes later, you're not limited by the key structure
- Natural keys tend to consume more storage than the integers typically used for surrogate keys

**Best Practice:** A well-designed table should have one or more columns that can serve as a natural key. An example is a product table with a unique product code. But in a table of employees, it might be difficult to find any single column, or even multiple columns, that would be unique on a row-by-row basis to serve as a primary key. In that case, you can create a surrogate key, but you probably should reconsider the table structure.

### Primary Key Syntax

#### Column Constraint Syntax

```sql
CREATE TABLE natural_key_example (
    license_id varchar(10) CONSTRAINT license_key PRIMARY KEY,
    first_name varchar(50),
    last_name varchar(50)
);
```

**Advantages:**
- Easy to understand at a glance which column is designated as the primary key
- You can omit the CONSTRAINT keyword and name for the key, and simply use `PRIMARY KEY`

#### Table Constraint Syntax

```sql
CREATE TABLE natural_key_example (
    license_id varchar(10),
    first_name varchar(50),
    last_name varchar(50),
    CONSTRAINT license_key PRIMARY KEY (license_id)
);
```

**When to use:** You must use the table constraint syntax when you want to create a primary key using more than one column (composite primary key).

### Primary Key Violation Example

```sql
INSERT INTO natural_key_example (license_id, first_name, last_name)
VALUES ('T229901', 'Lynn', 'Malero');

INSERT INTO natural_key_example (license_id, first_name, last_name)
VALUES ('T229901', 'Sam', 'Tracy');
```

When you execute the first INSERT statement, the server loads a row into the table without any issue. When you attempt to execute the second, the server replies with an error:

```
ERROR: duplicate key value violates unique constraint "license_key"
DETAIL: Key (license_id)=(T229901) already exists.
```

Before adding the row, the server checked whether a `license_id` of `T229901` was already present in the table. Because it was, and because a primary key by definition must be unique for each row, the server rejected the operation.

### Creating a Composite Primary Key

If we want to create a natural key but a single column in the table isn't sufficient for meeting the primary key requirements for uniqueness, we may be able to create a suitable key from a combination of columns, which is called a **composite primary key**.

**Example:** A table that tracks student school attendance. The combination of a student ID column and a date column would give us unique data for each row, tracking whether or not the student was in school each day during a school year.

```sql
CREATE TABLE natural_key_composite_example (
    student_id varchar(10),
    school_day date,
    present boolean,
    CONSTRAINT student_key PRIMARY KEY (student_id, school_day)
);
```

The syntax follows the same table constraint format for adding a primary key for one column, but we pass two (or more) columns as arguments rather than one.

**Violation example:**
```sql
INSERT INTO natural_key_composite_example (student_id, school_day, present)
VALUES(775, '1/22/2017', 'Y');

INSERT INTO natural_key_composite_example (student_id, school_day, present)
VALUES(775, '1/23/2017', 'Y');

INSERT INTO natural_key_composite_example (student_id, school_day, present)
VALUES(775, '1/23/2017', 'N');
```

The first two INSERT statements execute fine because there's no duplication of values in the combination of key columns. But the third statement causes an error because the `student_id` and `school_day` values it contains match a combination that already exists in the table:

```
ERROR: duplicate key value violates unique constraint "student_key"
DETAIL: Key (student_id, school_day)=(775, 2017-01-23) already exists.
```

You can create composite keys with more than two columns. The specific database you're using imposes the limit to the number of columns you can use.

### Creating an Auto-Incrementing Surrogate Key

If a table you're creating has no columns suitable for a natural primary key, you may have a data integrity problem; in that case, it's best to reconsider how you're structuring the database. If you're inheriting data for analysis or feel strongly about using surrogate keys, you can create a column and fill it with unique values.

**Using serial types:** An easy way to create a surrogate primary key is with an auto-incrementing integer using one of the serial data types: `smallserial`, `serial`, and `bigserial`. They correspond to the integer types `smallint`, `integer`, and `bigint` in terms of the range of values they handle and the amount of disk storage they consume.

**Recommendation:** For a primary key, it may be tempting to try to save disk space by using `serial`, which handles numbers as large as 2,147,483,647. But many a database developer has received a late-night call from a user frantic to know why their application is broken, only to discover that the database is trying to generate a number one greater than the data type's maximum. For this reason, with PostgreSQL, it's generally wise to use `bigserial`, which accepts numbers as high as 9.2 quintillion. You can set it and forget it.

```sql
CREATE TABLE surrogate_key_example (
    order_number bigserial,
    product_name varchar(50),
    order_date date,
    CONSTRAINT order_key PRIMARY KEY (order_number)
);

INSERT INTO surrogate_key_example (product_name, order_date)
VALUES ('Beachball Polish', '2015-03-17'),
       ('Wrinkle De-Atomizer', '2017-05-22'),
       ('Flux Capacitor', '1985-10-26');

SELECT * FROM surrogate_key_example;
```

**Result:**
```
order_number | product_name          | order_date
-------------|----------------------|------------
1            | Beachball Polish     | 2015-03-17
2            | Wrinkle De-Atomizer  | 2017-05-22
3            | Flux Capacitor       | 1985-10-26
```

**Important:** The database will add one to `order_number` each time a new row is inserted. But it won't fill any gaps in the sequence created after rows are deleted.

## Foreign Keys

With the foreign key constraint, SQL very helpfully provides a way to ensure data in related tables doesn't end up unrelated, or orphaned. A foreign key is one or more columns in a table that match the primary key of another table. But a foreign key also imposes a constraint: values entered must already exist in the primary key or other unique key of the table it references. If not, the value is rejected. This constraint ensures that we don't end up with rows in one table that have no relation to rows in the other tables we can join them to.

### Foreign Key Example

```sql
CREATE TABLE licenses (
    license_id varchar(10),
    first_name varchar(50),
    last_name varchar(50),
    CONSTRAINT licenses_key PRIMARY KEY (license_id)
);

CREATE TABLE registrations (
    registration_id varchar(10),
    registration_date date,
    license_id varchar(10) REFERENCES licenses (license_id),
    CONSTRAINT registration_key PRIMARY KEY (registration_id, license_id)
);

INSERT INTO licenses (license_id, first_name, last_name)
VALUES ('T229901', 'Lynn', 'Malero');

INSERT INTO registrations (registration_id, registration_date, license_id)
VALUES ('A203391', '3/17/2017', 'T229901');

INSERT INTO registrations (registration_id, registration_date, license_id)
VALUES ('A75772', '3/17/2017', 'T000001');
```

**How it works:**
- The first table, `licenses`, uses a driver's unique `license_id` as a natural primary key
- The second table, `registrations`, is for tracking vehicle registrations
- In the `registrations` table, we designate the column `license_id` as a foreign key by adding the `REFERENCES` keyword, followed by the table name and column for it to reference

**When inserting:**
- When we insert a row into `registrations`, the database will test whether the value inserted into `license_id` already exists in the `license_id` primary key column of the `licenses` table
- If it doesn't, the database returns an error

**Error example:**
```
ERROR: insert or update on table "registrations" violates foreign key constraint "registrations_license_id_fkey"
DETAIL: Key (license_id)=(T000001) is not present in table "licenses".
```

### Practical Implications

**Insert order:** We cannot add data to a table that contains a foreign key before the other table referenced by the key has the related records, or we'll get an error. In this example, we'd have to create a driver's license record before inserting a related registration record.

**Delete order:** The reverse applies when we delete data. To maintain referential integrity, the foreign key constraint prevents us from deleting a row from `licenses` before removing any related rows in `registrations`, because doing so would leave an orphaned record. We would have to delete the related row in `registrations` first, and then delete the row in `licenses`.

### Automatically Deleting Related Records with CASCADE

To delete a row in `licenses` and have that action automatically delete any related rows in `registrations`, we can specify that behavior by adding `ON DELETE CASCADE` when defining the foreign key constraint.

```sql
CREATE TABLE registrations (
    registration_id varchar(10),
    registration_date date,
    license_id varchar(10) REFERENCES licenses (license_id) ON DELETE CASCADE,
    CONSTRAINT registration_key PRIMARY KEY (registration_id, license_id)
);
```

**Benefits:**
- Allows us to delete a driver's license without first having to manually remove any registrations to it
- Maintains data integrity by ensuring deleting a license doesn't leave orphaned rows in registrations

## The CHECK Constraint

A CHECK constraint evaluates whether data added to a column meets the expected criteria, which we specify with a logical test. If the criteria aren't met, the database returns an error. The CHECK constraint is extremely valuable because it can prevent columns from getting loaded with nonsensical data. For example, a new employee's birthdate probably shouldn't be more than 120 years in the past, so you can set a cap on birthdates. Or, in most schools, Z isn't a valid letter grade for a course, so we might insert constraints that only accept the values A–F.

### CHECK Constraint Syntax

As with primary keys, we can implement a CHECK constraint as a column constraint or a table constraint.

**Column constraint:** Declare it in the CREATE TABLE statement after the column name and data type: `CHECK (logical expression)`

**Table constraint:** Use the syntax `CONSTRAINT constraint_name CHECK (logical expression)` after all columns are defined.

### CHECK Constraint Example

```sql
CREATE TABLE check_constraint_example (
    user_id bigserial,
    user_role varchar(50),
    salary integer,
    CONSTRAINT user_id_key PRIMARY KEY (user_id),
    CONSTRAINT check_role_in_list CHECK (user_role IN('Admin', 'Staff')),
    CONSTRAINT check_salary_not_zero CHECK (salary > 0)
);
```

**How it works:**
- The first CHECK tests whether values entered into the `user_role` column match one of two predefined strings, Admin or Staff, by using the SQL IN operator
- The second CHECK tests whether values entered in the `salary` column are greater than 0, because no one should be earning a negative amount
- Both tests are Boolean expressions—statements that evaluate as either true or false. If a value tested by the constraint evaluates as true, the check passes

**Note:** Developers may debate whether check logic belongs in the database, in the application in front of the database, such as a human resources system, or both. One advantage of checks in the database is that the database will maintain data integrity in the case of changes to the application, even if a new system gets built or users are given alternate ways to add data.

### Combining Multiple Tests

If we use the table constraint syntax, we also can combine more than one test in a single CHECK statement:

```sql
CONSTRAINT grad_check CHECK (credits >= 120 AND tuition = 'Paid')
```

Notice that we combine two logical tests by enclosing them in parentheses and connecting them with AND. Here, both Boolean expressions must evaluate as true for the entire check to pass.

### Testing Values Across Columns

You can also test values across columns, as in the following example where we want to make sure an item's sale price is a discount on the original:

```sql
CONSTRAINT sale_check CHECK (sale_price < retail_price)
```

Inside the parentheses, the logical expression checks that the sale price is less than the retail price.

## The UNIQUE Constraint

We can also ensure that a column has a unique value in each row by using the UNIQUE constraint. If ensuring unique values sounds similar to the purpose of a primary key, it is. But UNIQUE has one important difference. In a primary key, no values can be NULL, but a UNIQUE constraint permits multiple NULL values in a column.

### UNIQUE Constraint Example

```sql
CREATE TABLE unique_constraint_example (
    contact_id bigserial CONSTRAINT contact_id_key PRIMARY KEY,
    first_name varchar(50),
    last_name varchar(50),
    email varchar(200),
    CONSTRAINT email_unique UNIQUE (email)
);

INSERT INTO unique_constraint_example (first_name, last_name, email)
VALUES ('Samantha', 'Lee', 'slee@example.org');

INSERT INTO unique_constraint_example (first_name, last_name, email)
VALUES ('Betty', 'Diaz', 'bdiaz@example.org');

INSERT INTO unique_constraint_example (first_name, last_name, email)
VALUES ('Sasha', 'Lee', 'slee@example.org');
```

**How it works:**
- `contact_id` serves as a surrogate primary key, uniquely identifying each row
- We also have an `email` column, the main point of contact with each person
- We'd expect this column to contain only unique email addresses, but those addresses might change over time
- We use UNIQUE to ensure that any time we add or update a contact's email we're not providing one that already exists

**Error example:**
```
ERROR: duplicate key value violates unique constraint "email_unique"
DETAIL: Key (email)=(slee@example.org) already exists.
```

## The NOT NULL Constraint

In Chapter 6, you learned about NULL, a special value in SQL that represents a condition where no data is present in a row in a column or the value is unknown. You've also learned that NULL values are not allowed in a primary key, because primary keys need to uniquely identify each row in a table. But there will be other columns besides primary keys where you don't want to allow empty values.

### NOT NULL Constraint Example

```sql
CREATE TABLE not_null_example (
    student_id bigserial,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    CONSTRAINT student_id_key PRIMARY KEY (student_id)
);
```

**How it works:**
- We declare NOT NULL for the `first_name` and `last_name` columns because it's likely we'd require those pieces of information in a table tracking student information
- If we attempt an INSERT on the table and don't include values for those columns, the database will notify us of the violation

## Removing Constraints or Adding Them Later

So far, we've been placing constraints on tables at the time of creation. You can also remove a constraint or later add one to an existing table using `ALTER TABLE`, the SQL command that makes changes to tables and columns.

### Removing Constraints

**To remove a primary key, foreign key, or a UNIQUE constraint:**
```sql
ALTER TABLE table_name DROP CONSTRAINT constraint_name;
```

**To drop a NOT NULL constraint:**
```sql
ALTER TABLE table_name ALTER COLUMN column_name DROP NOT NULL;
```

The statement operates on the column, so you must use the additional `ALTER COLUMN` keywords.

### Adding Constraints

**To add a primary key, foreign key, or UNIQUE constraint:**
```sql
ALTER TABLE table_name ADD CONSTRAINT constraint_name PRIMARY KEY (column_name);
ALTER TABLE table_name ADD CONSTRAINT constraint_name FOREIGN KEY (column_name) REFERENCES other_table (other_column);
ALTER TABLE table_name ADD CONSTRAINT constraint_name UNIQUE (column_name);
```

**To add a NOT NULL constraint:**
```sql
ALTER TABLE table_name ALTER COLUMN column_name SET NOT NULL;
```

### Example: Modifying Constraints

```sql
ALTER TABLE not_null_example DROP CONSTRAINT student_id_key;
ALTER TABLE not_null_example ADD CONSTRAINT student_id_key PRIMARY KEY (student_id);
ALTER TABLE not_null_example ALTER COLUMN first_name DROP NOT NULL;
ALTER TABLE not_null_example ALTER COLUMN first_name SET NOT NULL;
```

**Important Note:** You can only add a constraint to an existing table if the data in the target column obeys the limits of the constraint. For example, you can't place a primary key constraint on a column that has duplicate or empty values.

## Speeding Up Queries with Indexes

In the same way that a book's index helps you find information more quickly, you can speed up queries by adding an index to one or more columns. The database uses the index as a shortcut rather than scanning each row to find data. That's admittedly a simplistic picture of what, in SQL databases, is a nontrivial topic. I could write several chapters on SQL indexes and tuning databases for performance, but instead I'll offer general guidance on using indexes and a PostgreSQL-specific example that demonstrates their benefits.

### B-Tree: PostgreSQL's Default Index

While following along in this book, you've already created several indexes, perhaps without knowing. Each time you add a primary key or UNIQUE constraint to a table, PostgreSQL (as well as most database systems) places an index on the column. Indexes are stored separately from the table data, but they're accessed automatically when you run a query and are updated every time a row is added or removed from the table.

In PostgreSQL, the default index type is the **B-Tree index**. It's created automatically on the columns designated for the primary key or a UNIQUE constraint, and it's also the type created by default when you execute a CREATE INDEX statement. B-Tree, short for balanced tree, is so named because the structure organizes the data in a way that when you search for a value, it looks from the top of the tree down through branches until it locates the data you want.

**B-Tree index is useful for:**
- Data that can be ordered and searched using equality and range operators, such as `<`, `<=`, `=`, `>=`, `>`, and `BETWEEN`

**Other PostgreSQL index types:**
- PostgreSQL incorporates additional index types, including the Generalized Inverted Index (GIN) and the Generalized Search Tree (GiST)
- Each has distinct uses, and they'll be incorporated in later chapters on full text search and queries using geometry types

### Benchmarking Query Performance with EXPLAIN

We'll measure how well an index can improve query speed by checking the performance before and after adding one. To do this, we'll use PostgreSQL's `EXPLAIN` command, which is specific to PostgreSQL and not part of standard SQL. The EXPLAIN command provides output that lists the query plan for a specific database query. This might include how the database plans to scan the table, whether or not it will use indexes, and so on.

If we add the `ANALYZE` keyword, EXPLAIN will carry out the query and show the actual execution time, which is what we want for the current exercise.

### Example: New York City Addresses

For this exercise, we'll use a large data set comprising more than 900,000 New York City street addresses, compiled by the OpenAddresses project. The file with the data, `city_of_new_york.csv`, is available for download along with all the resources for this book.

```sql
CREATE TABLE new_york_addresses (
    longitude numeric(9,6),
    latitude numeric(9,6),
    street_number varchar(10),
    street varchar(32),
    unit varchar(7),
    postcode varchar(5),
    id integer CONSTRAINT new_york_key PRIMARY KEY
);

COPY new_york_addresses
FROM 'C:\YourDirectory\city_of_new_york.csv'
WITH (FORMAT CSV, HEADER);
```

When the data loads, run a quick SELECT query to visually check that you have 940,374 rows and seven columns. A common use for this data might be to search for matches in the `street` column, so we'll use that example for exploring index performance.

### Recording Control Execution Times

Run each of the three queries one at a time. We're using typical SELECT queries with a WHERE clause but with the keywords `EXPLAIN ANALYZE` included at the beginning:

```sql
EXPLAIN ANALYZE SELECT * FROM new_york_addresses
WHERE street = 'BROADWAY';

EXPLAIN ANALYZE SELECT * FROM new_york_addresses
WHERE street = '52 STREET';

EXPLAIN ANALYZE SELECT * FROM new_york_addresses
WHERE street = 'ZWICKY AVENUE';
```

**Example output (before index):**
```
Seq Scan on new_york_addresses  (cost=0.00..20730.68 rows=3730 width=46)
(actual time=0.055..289.426 rows=3336 loops=1)
Filter: ((street)::text = 'BROADWAY'::text)
Rows Removed by Filter: 937038
Planning time: 0.617 ms
Execution time: 289.838 ms
```

**Key points:**
- The first indicates that to find any rows where `street = 'BROADWAY'`, the database will conduct a **sequential scan** of the table
- That's a synonym for a full table scan: each row will be examined, and the database will remove any row that doesn't match BROADWAY
- The execution time (on my computer about 290 milliseconds) is how long this will take

### Adding the Index

Now, let's see how adding an index changes the query's search method and how fast it works:

```sql
CREATE INDEX street_idx ON new_york_addresses (street);
```

**How it works:**
- We give the CREATE INDEX keywords followed by a name we choose for the index, in this case `street_idx`
- Then ON is added, followed by the target table and column
- Execute the CREATE INDEX statement, and PostgreSQL will scan the values in the street column and build the index from them
- We only need to create the index once

**Example output (after index):**
```
Bitmap Heap Scan on new_york_addresses  (cost=65.80..5962.17 rows=2758 width=46)
(actual time=1.792..9.816 rows=3336 loops=1)
Recheck Cond: ((street)::text = 'BROADWAY'::text)
Heap Blocks: exact=2157
    ->  Bitmap Index Scan on street_idx  (cost=0.00..65.11 rows=2758 width=0)
(actual time=1.253..1.253 rows=3336 loops=1)
Index Cond: ((street)::text = 'BROADWAY'::text)
Planning time: 0.163 ms
Execution time: 5.887 ms
```

**Performance improvement:**
- Instead of a sequential scan, the EXPLAIN ANALYZE statistics show that the database is now using an **index scan** on `street_idx` instead of visiting each row
- The query speed is now markedly faster

**Performance comparison:**

| Query Filter | Before Index | After Index |
|--------------|--------------|-------------|
| WHERE street = 'BROADWAY' | 290 ms | 6 ms |
| WHERE street = '52 STREET' | 271 ms | 6 ms |
| WHERE street = 'ZWICKY AVENUE' | 306 ms | 1 ms |

The execution times are much, much better, effectively a quarter second faster or more per query. Is a quarter second that impressive? Well, whether you're seeking answers in data using repeated querying or creating a database system for thousands of users, the time savings adds up.

### Removing an Index

If you ever need to remove an index from a table—perhaps if you're testing the performance of several index types—use the DROP INDEX command followed by the name of the index to remove:

```sql
DROP INDEX street_idx;
```

## Considerations When Using Indexes

You've seen that indexes have significant performance benefits, so does that mean you should add an index to every column in a table? Not so fast! Indexes are valuable, but they're not always needed. In addition, they do enlarge the database and impose a maintenance cost on writing data. Here are a few tips for judging when to use indexes:

### When to Use Indexes

1. **Consult the documentation** for the database manager you're using to learn about the kinds of indexes available and which to use on particular data types. PostgreSQL, for example, has five more index types in addition to B-Tree. One, called GiST, is particularly suited to the geometry data types. Full text search also benefits from indexing.

2. **Consider adding indexes to any columns you'll use in table joins.** Primary keys are indexed by default in PostgreSQL, but foreign key columns in related tables are not and are a good target for indexes.

3. **Add indexes to columns that will frequently end up in a query WHERE clause.** As you've seen, search performance is significantly improved via indexes.

4. **Use EXPLAIN ANALYZE to test performance** under a variety of configurations if you're unsure. Optimization is a process!

### Trade-offs

- **Benefits:** Significantly faster query performance
- **Costs:** 
  - Enlarges the database
  - Imposes a maintenance cost on writing data (indexes must be updated when data changes)
  - Not always needed

## Summary

With the tools you've added to your toolbox in this chapter, you're ready to ensure that the databases you build or inherit are best suited for your collection and exploration of data. Your queries will run faster, you can exclude unwanted values, and your database objects will have consistent organization. That's a boon for you and for others who share your data.

### Key Concepts Covered

- **Naming conventions**: Snake case, camel case, Pascal case
- **Quoted identifiers**: Using quotes to preserve case and allow special characters
- **Naming guidelines**: Use snake case, make names understandable, use plurals for tables, mind length
- **Constraints**: Primary keys, foreign keys, CHECK, UNIQUE, NOT NULL
- **Natural keys**: Using existing columns as primary keys
- **Surrogate keys**: Auto-incrementing keys (bigserial recommended)
- **Composite primary keys**: Using multiple columns as primary key
- **Foreign keys with CASCADE**: Automatically deleting related records
- **ALTER TABLE**: Adding and removing constraints
- **Indexes**: B-Tree indexes, EXPLAIN ANALYZE, performance benchmarking

### Best Practices

1. Use snake case consistently for identifiers
2. Make names easy to understand and avoid cryptic abbreviations
3. Use plural names for tables
4. Mind the length of identifier names (consider cross-database compatibility)
5. Use date suffixes when making copies of tables
6. Prefer natural keys when suitable columns exist
7. Use bigserial for surrogate keys (not serial) to avoid overflow
8. Add foreign key constraints to maintain referential integrity
9. Use CHECK constraints to validate data
10. Use UNIQUE constraints for columns that should be unique but aren't primary keys
11. Use NOT NULL for required columns
12. Add indexes to columns used in joins and WHERE clauses
13. Use EXPLAIN ANALYZE to benchmark query performance
14. Test index performance before and after adding indexes

### When to Use Each Constraint

- **Primary Key**: When you need a unique identifier for each row
- **Foreign Key**: When you need to reference rows in another table
- **CHECK**: When you need to validate data against specific criteria
- **UNIQUE**: When you need unique values but allow NULLs
- **NOT NULL**: When a column must always have a value

### Natural Key vs. Surrogate Key Decision

- **Use natural key** when: Suitable unique column(s) exist, data has meaning, reduces need for joins
- **Use surrogate key** when: No suitable natural key exists, you need flexibility for future changes, storage is a concern

## Next Steps

This chapter concludes the first part of the book, which focused on giving you the essentials to dig into SQL databases. I'll continue building on these foundations as we explore more complex queries and strategies for data analysis. In the next chapter, we'll use SQL aggregate functions to assess the quality of a data set and get usable information from it.
