# Chapter 1: Creating Your First Database and Table

## Introduction

SQL is more than just a means for extracting knowledge from data. It's also a language for defining the structures that hold data so we can organize relationships in the data. Chief among those structures is the **table**.

A table is a grid of rows and columns that store data. Each row holds a collection of columns, and each column contains data of a specified type: most commonly, numbers, characters, and dates. We use SQL to define the structure of a table and how each table might relate to other tables in the database. We also use SQL to extract, or query, data from tables.

### Understanding Tables

Understanding tables is fundamental to understanding the data in your database. When starting with a fresh database, the first step is to look at the tables within. Look for clues in:
- Table names and their column structure
- The types of data they contain (text, numbers, or both)
- How many rows are in each table
- How many tables are in the database

The simplest database might have a single table. A full-bore application that handles customer data or tracks air travel might have dozens or hundreds. The number of tables tells you not only how much data you'll need to analyze, but also hints that you should explore relationships among the data in each table.

### Example: Relational Database Structure

Consider a hypothetical database for managing a school's class enrollment. Within that database are several tables that track students and their classes:

**student_enrollment table:**
```
student_id  | class_id     | class_section | semester
------------|--------------|---------------|----------
CHRISPA004  | COMPSCI101   | 3             | Fall 2017
DAVISHE010  | COMPSCI101   | 3             | Fall 2017
ABRILDA002  | ENG101       | 40            | Fall 2017
DAVISHE010  | ENG101       | 40            | Fall 2017
RILEYPH002  | ENG101       | 40            | Fall 2017
```

**students table:**
```
student_id  | first_name | last_name  | dob
------------|------------|------------|----------
ABRILDA002  | Abril      | Davis      | 1999-01-10
CHRISPA004  | Chris      | Park       | 1996-04-10
DAVISHE010  | Davis      | Hernandez  | 1987-09-14
RILEYPH002  | Riley      | Phelps     | 1996-06-15
```

The `student_id` column acts as a unique key that connects both tables, giving you the ability to create relationships between data. Database builders prefer to organize data using separate tables for each main entity the database manages in order to reduce redundant data. In the example, we store each student's name and date of birth just once, even if the student signs up for multiple classes.

## Creating a Database

The PostgreSQL program is a **database management system**, a software package that allows you to define, manage, and query databases. When you installed PostgreSQL, it created a **database server**—an instance of the application running on your computer—that includes a default database called `postgres`.

The database is a collection of objects that includes tables, functions, user roles, and much more. According to the PostgreSQL documentation, the default database is "meant for use by users, utilities and third party applications." In the exercises in this chapter, we'll leave the default as is and instead create a new one. We'll do this to keep objects related to a particular topic or application organized together.

### SQL Statement to Create a Database

To create a database, you use just one line of SQL:

```sql
CREATE DATABASE analysis;
```

This statement creates a database on your server named `analysis` using default PostgreSQL settings. The code consists of two keywords—`CREATE` and `DATABASE`—followed by the name of the new database. The statement ends with a semicolon, which signals the end of the command.

**Important Notes:**
- The semicolon ends all PostgreSQL statements and is part of the ANSI SQL standard
- Sometimes you can omit the semicolon, but not always, and particularly not when running multiple statements in the admin
- Using the semicolon is a good habit to form

### Executing SQL in pgAdmin

pgAdmin is the graphical administrative tool for PostgreSQL. For much of our work, you'll use pgAdmin to run (or execute) the SQL statements we write.

**Steps to create a database in pgAdmin:**

1. Run PostgreSQL. If you're using Windows, the installer set PostgreSQL to launch every time you boot up. On macOS, you must double-click Postgres.app in your Applications folder.

2. Launch pgAdmin. In the left vertical pane (the object browser) expand the plus sign to the left of the Servers node to show the default server.

3. Double-click the server name. If you supplied a password during installation, enter it at the prompt.

4. In pgAdmin's object browser, expand Databases and click once on the `postgres` database to highlight it.

5. Open the Query Tool by choosing Tools → Query Tool.

6. In the SQL Editor pane (the top horizontal pane), type or copy the code `CREATE DATABASE analysis;`.

7. Click the lightning bolt icon to execute the statement.

8. To see your new database, right-click Databases in the object browser. From the pop-up menu, select Refresh, and the `analysis` database will appear in the list.

**Best Practice:** In your own work, it's generally a best practice to create a new database for each project to keep tables with related data together.

### Connecting to the Analysis Database

Before you create a table, you must ensure that pgAdmin is connected to the `analysis` database rather than to the default `postgres` database.

**Steps to connect:**

1. Close the Query Tool by clicking the X at the top right of the tool. You don't need to save the file when prompted.

2. In the object browser, click once on the `analysis` database.

3. Reopen the Query Tool by choosing Tools → Query Tool.

4. You should now see the label `analysis on postgres@localhost` at the top of the Query Tool window.

Now, any code you execute will apply to the `analysis` database.

## Creating a Table

Tables are where data lives and its relationships are defined. When you create a table, you:
- Assign a name to each column (sometimes referred to as a field or attribute)
- Assign it a data type

These are the values the column will accept—such as text, integers, decimals, and dates—and the definition of the data type is one way SQL enforces the integrity of data. For example, a column defined as `date` will take data in one of several standard formats, such as `YYYY-MM-DD`. If you try to enter characters not in a date format, for instance, the word "peach", you'll receive an error.

Data stored in a table can be accessed and analyzed, or queried, with SQL statements. You can sort, edit, and view the data, and easily alter the table later if your needs change.

### The CREATE TABLE Statement

For this exercise, we'll use an often-discussed piece of data: teacher salaries. Here's the SQL statement to create a table called `teachers`:

```sql
CREATE TABLE teachers (
    id bigserial,
    first_name varchar(25),
    last_name varchar(50),
    school varchar(50),
    hire_date date,
    salary numeric
);
```

**Understanding the Statement:**

1. **CREATE TABLE keywords**: The code begins with the two SQL keywords `CREATE` and `TABLE` that, together with the name `teachers`, signal PostgreSQL that the next bit of code describes a table to add to the database.

2. **Column definitions**: Following an opening parenthesis, the statement includes a comma-separated list of column names along with their data types. For style purposes, each new line of code is on its own line and indented four spaces, which isn't required, but it makes the code more readable.

3. **Column details**:
   - **id**: The `id` column is of data type `bigserial`, a special integer type that auto-increments every time you add a row to the table. The first row receives the value of 1 in the id column, the second row 2, and so on. The `bigserial` data type and other serial types are PostgreSQL-specific implementations, but most database systems have a similar feature.
   - **first_name, last_name, school**: Each is of the data type `varchar`, a text column with a maximum length specified by the number in parentheses. We're assuming that no one in the database will have a last name of more than 50 characters.
   - **hire_date**: Set to the data type `date`
   - **salary**: A `numeric` type

4. **Closing**: The code block wraps up with a closing parenthesis and a semicolon.

**Note:** This table definition is far from comprehensive. For example, it's missing several constraints that would ensure that columns that must be filled do indeed have data or that we're not inadvertently entering duplicate values. Constraints are covered in detail in Chapter 7.

### Making the teachers Table

To create the table using pgAdmin:

1. Open the pgAdmin Query Tool (if it's not open, click once on the `analysis` database in pgAdmin's object browser, and then choose Tools → Query Tool).

2. Copy the CREATE TABLE script into the SQL Editor.

3. Execute the script by clicking the lightning bolt icon.

If all goes well, you'll see a message in the pgAdmin Query Tool's bottom output pane that reads, "Query returned successfully with no result in X msec."

**Viewing the table:**

1. Go back to the main pgAdmin window and, in the object browser, right-click the `analysis` database and choose Refresh.

2. Choose Schemas → public → Tables to see your new table.

3. Expand the `teachers` table node by clicking the plus sign to the left of its name. This reveals more details about the table, including the column names.

4. Clicking on the table name and then selecting the SQL menu in the pgAdmin workspace will display the SQL statement used to make the `teachers` table.

## Inserting Rows into a Table

You can add data to a PostgreSQL table in several ways. Often, you'll work with a large number of rows, so the easiest method is to import data from a text file or another database directly into a table. But just to get started, we'll add a few rows using an `INSERT INTO ... VALUES` statement that specifies the target columns and the data values.

### The INSERT Statement

To insert some data into the table, copy the following code into your pgAdmin Query Tool:

```sql
INSERT INTO teachers (first_name, last_name, school, hire_date, salary)
VALUES ('Janet', 'Smith', 'F.D. Roosevelt HS', '2011-10-30', 36200),
       ('Lee', 'Reynolds', 'F.D. Roosevelt HS', '1993-05-22', 65000),
       ('Samuel', 'Cole', 'Myers Middle School', '2005-08-01', 43500),
       ('Samantha', 'Bush', 'Myers Middle School', '2011-10-30', 36200),
       ('Betty', 'Diaz', 'Myers Middle School', '2005-08-30', 43500),
       ('Kathleen', 'Roush', 'F.D. Roosevelt HS', '2010-10-22', 38500);
```

**Understanding the INSERT Statement:**

1. **INSERT INTO keywords**: After the `INSERT INTO` keywords is the name of the table, and in parentheses are the columns to be filled.

2. **VALUES keyword**: In the next row is the `VALUES` keyword and the data to insert into each column in each row.

3. **Data format**: 
   - You need to enclose the data for each row in a set of parentheses
   - Inside each set of parentheses, use a comma to separate each column value
   - The order of the values must also match the order of the columns specified after the table name
   - Each row of data ends with a comma, and the last row ends the entire statement with a semicolon

4. **Quoting requirements**: 
   - Text and dates require quotes (single quotes)
   - Numbers, including integers and decimals, don't require quotes

5. **Date format**: Use the format `YYYY-MM-DD` (a four-digit year followed by the month and date, each part joined by a hyphen). This is the international standard for date formats; using it will help you avoid confusion. PostgreSQL supports many additional date formats.

6. **Auto-incrementing id**: Notice that we didn't insert a value for the `id` column. When you created the table, your script specified that column to be the `bigserial` data type. So as PostgreSQL inserts each row, it automatically fills the `id` column with an auto-incrementing integer.

After running the code, the message in the Query Tool should include the words "Query returned successfully: 6 rows affected."

### Viewing the Data

You can take a quick look at the data you just loaded into the `teachers` table using pgAdmin:

1. In the object browser, locate the table and right-click.
2. In the pop-up menu, choose View/Edit Data → All Rows.

You'll see the six rows of data in the table with each column filled by the values in the SQL statement. Notice that even though you didn't insert a value for the `id` column, each teacher has an ID number assigned.

You can view data using the pgAdmin interface in a few ways, but we'll focus on writing SQL to handle those tasks.

## When Code Goes Bad

There may be a universe where code always works, but unfortunately, we haven't invented a machine capable of transporting us there. Errors happen. Whether you make a typo or mix up the order of operations, computer languages are unforgiving about syntax.

**Example Error:**

If you forget a comma in the INSERT statement, PostgreSQL will return an error:

```
ERROR:  syntax error at or near "("
LINE 5:  ('Samuel', 'Cole', 'Myers Middle School', '2005-08-01', 43...
         ^
********** Error **********
```

**Troubleshooting Tips:**

- The error message hints at what's wrong and where: a syntax error is near an open parenthesis on line 5
- Sometimes error messages can be more obscure. In that case, do what the best coders do: a quick internet search for the error message
- Most likely, someone else has experienced the same issue and might know the answer

## Formatting SQL for Readability

SQL requires no special formatting to run, so you're free to use your own style of uppercase, lowercase, and random indentations. But that won't win you any friends when others need to work with your code (and sooner or later someone will). For the sake of readability and being a good coder, it's best to follow these conventions:

### SQL Formatting Conventions

1. **Uppercase SQL keywords**: Use uppercase for SQL keywords, such as `SELECT`. Some SQL coders also uppercase the names of data types, such as `TEXT` and `INTEGER`. You can use lowercase characters for data types to separate them in your mind from keywords, but you can uppercase them if desired.

2. **Naming conventions**: 
   - Avoid camel case
   - Instead use `lowercase_and_underscores` for object names, such as tables and column names

3. **Indentation**: 
   - Indent clauses and code blocks for readability using either two or four spaces
   - Some coders prefer tabs to spaces; use whichever works best for you or your organization

We'll explore other SQL coding conventions as we go through the book, but these are the basics.

## Summary

In this chapter, you accomplished quite a bit:
- Created a database (`analysis`)
- Created a table (`teachers`) with proper column definitions and data types
- Loaded data into the table using INSERT statements
- Learned about SQL syntax, formatting, and error handling

You're on your way to adding SQL to your data analysis toolkit! In the next chapter, you'll use this set of teacher data to learn the basics of querying a table using `SELECT`.

## Key Concepts Covered

- **Database**: A collection of objects that includes tables, functions, user roles, and much more
- **Table**: A grid of rows and columns that store data
- **Column**: A field or attribute in a table that contains data of a specified type
- **Row**: A single record in a table
- **Data Type**: Defines what kind of data a column can hold (text, numbers, dates, etc.)
- **CREATE DATABASE**: SQL statement to create a new database
- **CREATE TABLE**: SQL statement to define a new table structure
- **INSERT INTO**: SQL statement to add data to a table
- **bigserial**: PostgreSQL data type for auto-incrementing integers
- **varchar**: Variable-length character data type
- **date**: Date data type
- **numeric**: Numeric data type for decimal numbers

## Best Practices

1. Create a new database for each project to keep related data organized
2. Always end SQL statements with a semicolon
3. Use proper SQL formatting conventions for readability
4. Use descriptive names for tables and columns
5. Choose appropriate data types for each column
6. Use the international date format (YYYY-MM-DD)
7. Quote text and dates, but not numbers in INSERT statements
