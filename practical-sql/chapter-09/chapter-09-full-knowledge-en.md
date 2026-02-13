# Chapter 9: Inspecting and Modifying Data

## Introduction

If you asked me to propose a toast to a newly minted class of data analysts, I'd probably raise my glass and say, "May your data always be free of errors and may it always arrive perfectly structured!" Life would be ideal if these sentiments were feasible. In reality, you'll sometimes receive data in such a sorry state that it's hard to analyze without modifying it in some way. This is called **dirty data**, which is a general label for data with errors, missing values, or poor organization that makes standard queries ineffective. When data is converted from one file type to another or when a column receives the wrong data type, information can be lost. Typos and spelling inconsistencies can also result in dirty data. Whatever the cause may be, dirty data is the bane of the data analyst.

In this chapter, you'll use SQL to clean up dirty data as well as perform other useful maintenance tasks. You'll learn how to examine data to assess its quality and how to modify data and tables to make analysis easier. But the techniques you'll learn will be useful for more than just cleaning data. The ability to make changes to data and tables gives you options for updating or adding new information to your database as it becomes available, elevating your database from a static collection to a living record.

## Importing Data on Meat, Poultry, and Egg Producers

For this example, we'll use a directory of U.S. meat, poultry, and egg producers. The Food Safety and Inspection Service (FSIS), an agency within the U.S. Department of Agriculture, compiles and updates this database every month. The FSIS is responsible for inspecting animals and food at more than 6,000 meat processing plants, slaughterhouses, farms, and the like. If inspectors find a problem, such as bacterial contamination or mislabeled food, the agency can issue a recall. Anyone interested in agriculture business, food supply chain, or outbreaks of foodborne illnesses will find the directory useful.

The file we'll use comes from the directory's page on data.gov, a website run by the U.S. federal government that catalogs thousands of data sets from various federal agencies. We'll examine the original data as it was available for download, with the exception of the ZIP Codes column (I'll explain why later).

### Creating the Table

```sql
CREATE TABLE meat_poultry_egg_inspect (
    est_number varchar(50) CONSTRAINT est_number_key PRIMARY KEY,
    company varchar(100),
    street varchar(100),
    city varchar(30),
    st varchar(2),
    zip varchar(5),
    phone varchar(14),
    grant_date date,
    activities text,
    dbas text
);

COPY meat_poultry_egg_inspect
FROM 'C:\YourDirectory\MPI_Directory_by_Establishment_Name.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ',');

CREATE INDEX company_idx ON meat_poultry_egg_inspect (company);
```

**Key Points:**
- The `meat_poultry_egg_inspect` table has 10 columns
- We add a natural primary key constraint to the `est_number` column, which contains a unique value for each row that identifies the establishment
- Most of the remaining columns relate to the company's name and location
- The `activities` column describes activities at the company
- We set the `activities` and `dbas` columns to `text`, a data type that in PostgreSQL affords us up to 1GB of characters, because some of the strings in the columns are thousands of characters long
- We import the CSV file and then create an index on the `company` column to speed up searches for particular companies

**Row Count:** The result should show 6,287 rows.

## Interviewing the Data Set

Interviewing data is my favorite part of analysis. We interview a data set to discover its details: what it holds, what questions it can answer, and how suitable it is for our purposes, the same way a job interview reveals whether a candidate has the skills required for the position.

The aggregate queries you learned in Chapter 8 are a useful interviewing tool because they often expose the limitations of a data set or raise questions you may want to ask before drawing conclusions in your analysis and assuming the validity of your findings.

### Finding Multiple Companies at the Same Address

For example, the `meat_poultry_egg_inspect` table's rows describe food producers. At first glance, we might assume that each company in each row operates at a distinct address. But it's never safe to assume in data analysis, so let's check:

```sql
SELECT company,
       street,
       city,
       st,
       count(*) AS address_count
FROM meat_poultry_egg_inspect
GROUP BY company, street, city, st
HAVING count(*) > 1
ORDER BY company, street, city, st;
```

**How it works:**
- We group companies by unique combinations of the `company`, `street`, `city`, and `st` columns
- Then we use `count(*)`, which returns the number of rows for each combination of those columns
- Using the HAVING clause, we filter the results to show only cases where more than one row has the same combination of values

**Result:** The query returns 23 rows, which means there are close to two dozen cases where the same company is listed multiple times at the same address.

**Analysis:** This is not necessarily a problem. There may be valid reasons for a company to appear multiple times at the same address. For example, two types of processing plants could exist with the same name. On the other hand, we may have found data entry errors. Either way, it's sound practice to eliminate concerns about the validity of a data set before relying on it, and the result should prompt us to investigate individual cases before we draw conclusions.

### Checking for Missing Values

Let's start checking for missing values by asking a basic question: how many of the meat, poultry, and egg processing companies are in each state? Finding out whether we have values from all states and whether any rows are missing a state code will serve as another useful check on the data.

```sql
SELECT st,
       count(*) AS st_count
FROM meat_poultry_egg_inspect
GROUP BY st
ORDER BY st;
```

**Result:** Your result should include 57 rows, grouped by the state postal code in the column `st`. Why more than the 50 U.S. states? Because the data includes Puerto Rico and other unincorporated U.S. territories, such as Guam and American Samoa.

**Issue:** However, the row at the bottom of the list has a count of 3 and a NULL value in the `st_count` column. To find out what this means, let's query the rows where the `st` column has NULL values.

**Note:** Depending on the database implementation, NULL values will either appear first or last in a sorted column. In PostgreSQL, they appear last by default. The ANSI SQL standard doesn't specify one or the other, but it lets you add `NULLS FIRST` or `NULLS LAST` to an ORDER BY clause to specify a preference. For example, to make NULL values appear first in the preceding query, the clause would read `ORDER BY st NULLS FIRST`.

### Finding Missing Values with IS NULL

```sql
SELECT est_number,
       company,
       city,
       st,
       zip
FROM meat_poultry_egg_inspect
WHERE st IS NULL;
```

**Result:** This query returns three rows that don't have a value in the `st` column:
- `V18677A` - Atlas Inspection, Inc. - Blaine - 55449
- `M45319+P45319` - Hall-Namie Packing Company, Inc - 36671
- `M263A+P263A+V263A` - Jones Dairy Farm - 53538

**Analysis:** If we want an accurate count of establishments per state, these missing values would lead to an incorrect result. To find the source of this dirty data, it's worth making a quick visual check of the original file downloaded from data.gov. In this case, a visual check confirms that, indeed, there was no state listed in those rows in the CSV file, so the error is organic to the data, not one introduced during import.

**Cleanup Task:** We'll need to add missing values to the `st` column to clean up this table.

### Checking for Inconsistent Data Values

Inconsistent data is another factor that can hamper our analysis. We can check for inconsistently entered data within a column by using GROUP BY with `count()`. When you scan the unduplicated values in the results, you might be able to spot variations in the spelling of names or other attributes.

For example, many of the 6,200 companies in our table are multiple locations owned by a few multinational food corporations, such as Cargill or Tyson Foods. To find out how many locations each company owns, we would try to count the values in the `company` column:

```sql
SELECT company,
       count(*) AS company_count
FROM meat_poultry_egg_inspect
GROUP BY company
ORDER BY company ASC;
```

**Result:** Scrolling through the results reveals a number of cases in which a company's name is spelled several different ways. For example, notice the entries for the Armour-Eckrich brand:
- `Armour - Eckrich Meats, LLC` - 1
- `Armour-Eckrich Meats LLC` - 3
- `Armour-Eckrich Meats, Inc.` - 1
- `Armour-Eckrich Meats, LLC` - 2

**Analysis:** At least four different spellings are shown for seven establishments that are likely owned by the same company. If we later perform any aggregation by company, it would help to standardize the names so all of the items counted or summed are grouped properly.

**Cleanup Task:** We'll need to standardize company names.

### Checking for Malformed Values Using length()

It's a good idea to check for unexpected values in a column that should be consistently formatted. For example, each entry in the `zip` column in the `meat_poultry_egg_inspect` table should be formatted in the style of U.S. ZIP Codes with five digits. However, that's not what is in our data set.

**The Problem:** When I converted the original Excel file to a CSV file, I stored the ZIP Code in the "General" number format in the spreadsheet instead of as a text value. By doing so, any ZIP Code that begins with a zero, such as 07502 for Paterson, NJ, lost the leading zero because an integer can't start with a zero. As a result, 07502 appears in the table as 7502.

**Checking the Issue:**

```sql
SELECT length(zip),
       count(*) AS length_count
FROM meat_poultry_egg_inspect
GROUP BY length(zip)
ORDER BY length(zip) ASC;
```

**Result:** The results confirm the formatting error:
- 3 characters: 86 rows
- 4 characters: 496 rows
- 5 characters: 5,705 rows

**Analysis:** 496 of the ZIP Codes are four characters long, and 86 are three characters long, which means these numbers originally had two leading zeros that my conversion erroneously eliminated.

**Finding Affected States:**

```sql
SELECT st,
       count(*) AS st_count
FROM meat_poultry_egg_inspect
WHERE length(zip) < 5
GROUP BY st
ORDER BY st ASC;
```

**Result:** The states are largely in the Northeast region of the United States where ZIP Codes often start with a zero:
- CT: 55
- MA: 101
- ME: 24
- NH: 18
- NJ: 244
- PR: 84
- RI: 27
- VI: 2
- VT: 27

**Cleanup Tasks Summary:**
So far, we need to correct the following issues in our data set:
1. Missing values for three rows in the `st` column
2. Inconsistent spelling of at least one company's name
3. Inaccurate ZIP Codes due to file conversion

## Modifying Tables, Columns, and Data

Almost nothing in a database, from tables to columns and the data types and values they contain, is set in concrete after it's created. As your needs change, you can add columns to a table, change data types on existing columns, and edit values. Fortunately, you can use SQL to modify, delete, or add to existing data and structures.

To make changes to our database, we'll use two SQL commands:
1. **ALTER TABLE**: Part of the ANSI SQL standard, provides options to ADD COLUMN, ALTER COLUMN, and DROP COLUMN, among others
2. **UPDATE**: Also included in the SQL standard, allows you to change values in a table's columns

### Modifying Tables with ALTER TABLE

We can use the ALTER TABLE statement to modify the structure of tables. The following examples show the syntax for common operations that are part of standard ANSI SQL.

**Adding a Column:**
```sql
ALTER TABLE table ADD COLUMN column data_type;
```

**Removing a Column:**
```sql
ALTER TABLE table DROP COLUMN column;
```

**Changing Data Type:**
```sql
ALTER TABLE table ALTER COLUMN column SET DATA TYPE data_type;
```

**Adding NOT NULL Constraint:**
```sql
ALTER TABLE table ALTER COLUMN column SET NOT NULL;
```

**Removing NOT NULL Constraint:**
```sql
ALTER TABLE table ALTER COLUMN column DROP NOT NULL;
```

**Important Note:** In PostgreSQL and some other systems, adding a constraint to the table causes all rows to be checked to see whether they comply with the constraint. If the table has millions of rows, this could take a while.

**Warning:** When you execute an ALTER TABLE statement, you should see a message that reads `ALTER TABLE` in the pgAdmin output screen. If an operation violates a constraint or if you attempt to change a column's data type and the existing values in the column won't conform to the new data type, PostgreSQL returns an error. But PostgreSQL won't give you any warning about deleting data when you drop a column, so use extra caution before dropping a column.

### Modifying Values with UPDATE

The UPDATE statement modifies the data in a column in all rows or in a subset of rows that meet a condition.

**Basic Syntax (Updates All Rows):**
```sql
UPDATE table
SET column = value;
```

**How it works:**
- We first pass UPDATE the name of the table to update
- Then pass the SET clause the column that contains the values to change
- The new value to place in the column can be a string, number, the name of another column, or even a query or expression that generates a value

**Updating Multiple Columns:**
```sql
UPDATE table
SET column_a = value,
    column_b = value;
```

**Updating Specific Rows:**
```sql
UPDATE table
SET column = value
WHERE criteria;
```

**Updating One Table with Values from Another Table (ANSI Standard):**
```sql
UPDATE table
SET column = (SELECT column
              FROM table_b
              WHERE table.column = table_b.column)
WHERE EXISTS (SELECT column
              FROM table_b
              WHERE table.column = table_b.column);
```

**Updating One Table with Values from Another Table (PostgreSQL-Specific):**
```sql
UPDATE table
SET column = table_b.column
FROM table_b
WHERE table.column = table_b.column;
```

**Note:** When you execute an UPDATE statement, PostgreSQL returns a message stating `UPDATE` along with the number of rows affected.

## Creating Backup Tables

Before modifying a table, it's a good idea to make a copy for reference and backup in case you accidentally destroy some data.

### Creating a Table Backup

```sql
CREATE TABLE meat_poultry_egg_inspect_backup AS
SELECT * FROM meat_poultry_egg_inspect;
```

**How it works:**
- This uses a variation of the familiar CREATE TABLE statement to make a new table based on the existing data and structure of the table we want to duplicate
- After running the CREATE TABLE statement, the result should be a pristine copy of your table with the new specified name

**Verifying the Backup:**
```sql
SELECT
    (SELECT count(*) FROM meat_poultry_egg_inspect) AS original,
    (SELECT count(*) FROM meat_poultry_egg_inspect_backup) AS backup;
```

**Result:** The results should return a count of 6,287 from both tables. If the counts match, you can be sure your backup table is an exact copy of the structure and contents of the original table.

**Important Note:** Indexes are not copied when creating a table backup using the CREATE TABLE statement. If you decide to run queries on the backup, be sure to create a separate index on that table.

## Restoring Missing Column Values

Earlier in this chapter, the query revealed that three rows in the `meat_poultry_egg_inspect` table don't have a value in the `st` column. To get a complete count of establishments in each state, we need to fill those missing values using an UPDATE statement.

### Creating a Column Copy

Even though we've backed up this table, let's take extra caution and make a copy of the `st` column within the table so we still have the original data if we make some dire error somewhere!

```sql
ALTER TABLE meat_poultry_egg_inspect ADD COLUMN st_copy varchar(2);
UPDATE meat_poultry_egg_inspect
SET st_copy = st;
```

**How it works:**
- The ALTER TABLE statement adds a column called `st_copy` using the same `varchar` data type as the original `st` column
- Next, the UPDATE statement's SET clause fills our newly created `st_copy` column with the values in column `st`
- Because we don't specify any criteria using a WHERE clause, values in every row are updated, and PostgreSQL returns the message `UPDATE 6287`

**Important Note:** On a very large table, this operation could take some time and also substantially increase the table's size. Making a column copy in addition to a table backup isn't entirely necessary, but if you're the patient, cautious type, it can be worthwhile.

**Verifying the Copy:**
```sql
SELECT st, st_copy
FROM meat_poultry_egg_inspect
ORDER BY st;
```

The SELECT query returns 6,287 rows showing both columns holding values except the three rows with missing values.

### Updating Rows Where Values Are Missing

To update those rows missing values, we first find the values we need with a quick online search: Atlas Inspection is located in Minnesota; Hall-Namie Packing is in Alabama; and Jones Dairy is in Wisconsin. Add those states to the appropriate rows:

```sql
UPDATE meat_poultry_egg_inspect
SET st = 'MN'
WHERE est_number = 'V18677A';

UPDATE meat_poultry_egg_inspect
SET st = 'AL'
WHERE est_number = 'M45319+P45319';

UPDATE meat_poultry_egg_inspect
SET st = 'WI'
WHERE est_number = 'M263A+P263A+V263A';
```

**How it works:**
- Because we want each UPDATE statement to affect a single row, we include a WHERE clause for each that identifies the company's unique `est_number`, which is the table's primary key
- When we run each query, PostgreSQL responds with the message `UPDATE 1`, showing that only one row was updated for each query

**Verification:** If we rerun the code to find rows where `st` is NULL, the query should return nothing. Success! Our count of establishments by state is now complete.

### Restoring Original Values

What happens if we botch an update by providing the wrong values or updating the wrong rows? Because we've backed up the entire table and the `st` column within the table, we can easily copy the data back from either location.

**Option 1: Restore from Column Copy**
```sql
UPDATE meat_poultry_egg_inspect
SET st = st_copy;
```

**Option 2: Restore from Backup Table**
```sql
UPDATE meat_poultry_egg_inspect original
SET st = backup.st
FROM meat_poultry_egg_inspect_backup backup
WHERE original.est_number = backup.est_number;
```

**How it works:**
- To restore the values from the backup column in `meat_poultry_egg_inspect` you created, run an UPDATE query that sets `st` to the values in `st_copy`. Both columns should again have the identical original values
- Alternatively, you can create an UPDATE that sets `st` to values in the `st` column from the `meat_poultry_egg_inspect_backup` table you made

## Updating Values for Consistency

In our earlier query, we discovered several cases where a single company's name was entered inconsistently. If we want to aggregate data by company name, such inconsistencies will hinder us from doing so.

### Creating a Standardized Column

We can standardize the spelling of this company's name by using an UPDATE statement. To protect our data, we'll create a new column for the standardized spellings, copy the names in `company` into the new column, and work in the new column to avoid tampering with the original data.

```sql
ALTER TABLE meat_poultry_egg_inspect ADD COLUMN company_standard varchar(100);
UPDATE meat_poultry_egg_inspect
SET company_standard = company;
```

### Updating with LIKE

Now, let's say we want any name in `company` that contains the string "Armour" to appear in `company_standard` as "Armour-Eckrich Meats". We can update all the rows matching the string "Armour" by using a WHERE clause:

```sql
UPDATE meat_poultry_egg_inspect
SET company_standard = 'Armour-Eckrich Meats'
WHERE company LIKE 'Armour%';

SELECT company, company_standard
FROM meat_poultry_egg_inspect
WHERE company LIKE 'Armour%';
```

**How it works:**
- The important piece of this query is the WHERE clause that uses the LIKE keyword that was introduced with filtering in Chapter 2
- Including the wildcard syntax `%` at the end of the string "Armour" updates all rows that start with those characters regardless of what comes after them
- The clause lets us target all the varied spellings used for the company's name

**Result:** The values for Armour-Eckrich in `company_standard` are now standardized with consistent spelling. If we want to standardize other company names in the table, we would create an UPDATE statement for each case. We would also keep the original `company` column for reference.

## Repairing ZIP Codes Using Concatenation

Our final fix repairs values in the `zip` column that lost leading zeros as the result of my deliberate data faux pas. For companies in Puerto Rico and the U.S. Virgin Islands, we need to restore two leading zeros to the values in `zip` because (aside from an IRS processing facility in Holtsville, NY) they're the only locations in the United States where ZIP Codes start with two zeros. Then, for the other states, located mostly in New England, we'll restore a single leading zero.

### Understanding Concatenation

We'll use UPDATE again but this time in conjunction with the double-pipe string operator (`||`), which performs concatenation. Concatenation combines two or more string or non-string values into one. For example, inserting `||` between the strings `abc` and `123` results in `abc123`. The double-pipe operator is a SQL standard for concatenation supported by PostgreSQL. You can use it in many contexts, such as UPDATE queries and SELECT, to provide custom output from existing as well as new data.

### Creating a ZIP Code Backup

First, let's make a backup copy of the `zip` column in the same way we made a backup of the `st` column earlier:

```sql
ALTER TABLE meat_poultry_egg_inspect ADD COLUMN zip_copy varchar(5);
UPDATE meat_poultry_egg_inspect
SET zip_copy = zip;
```

### Restoring Two Leading Zeros

Next, we use the code to perform the first update for Puerto Rico and Virgin Islands:

```sql
UPDATE meat_poultry_egg_inspect
SET zip = '00' || zip
WHERE st IN('PR','VI') AND length(zip) = 3;
```

**How it works:**
- We use SET to set the `zip` column to a value that is the result of the concatenation of the string `00` and the existing content of the `zip` column
- We limit the UPDATE to only those rows where the `st` column has the state codes PR and VI using the IN comparison operator from Chapter 2
- We add a test for rows where the length of `zip` is 3
- This entire statement will then only update the zip values for Puerto Rico and the Virgin Islands

**Result:** PostgreSQL should return the message `UPDATE 86`, which is the number of rows we expect to change based on our earlier count.

### Restoring One Leading Zero

Let's repair the remaining ZIP Codes using a similar query:

```sql
UPDATE meat_poultry_egg_inspect
SET zip = '0' || zip
WHERE st IN('CT','MA','ME','NH','NJ','RI','VT') AND length(zip) = 4;
```

**Result:** PostgreSQL should return the message `UPDATE 496`.

### Verifying the Fix

Now, let's check our progress. Earlier in the chapter, when we aggregated rows in the `zip` column by length, we found 86 rows with three characters and 496 with four. Using the same query now returns a more desirable result: all the rows have a five-digit ZIP Code.

```sql
SELECT length(zip), count(*) AS length_count
FROM meat_poultry_egg_inspect
GROUP BY length(zip)
ORDER BY length(zip) ASC;
```

**Result:** All 6,287 rows now have a five-digit ZIP Code.

**Note:** In this example we used concatenation, but you can employ additional SQL string functions to modify data with UPDATE by changing words from uppercase to lowercase, trimming unwanted spaces, replacing characters in a string, and more. I'll discuss additional string functions in Chapter 13 when we consider advanced techniques for working with text.

## Updating Values Across Tables

In "Modifying Values with UPDATE" section, I showed the standard ANSI SQL and PostgreSQL-specific syntax for updating values in one table based on values in another. This syntax is particularly valuable in a relational database where primary keys and foreign keys establish table relationships. It's also useful when data in one table may be necessary context for updating values in another.

### Creating a State Regions Table

For example, let's say we're setting an inspection date for each of the companies in our table. We want to do this by U.S. regions, such as Northeast, Pacific, and so on, but those regional designations don't exist in our table. However, they do exist in a data set we can add to our database that also contains matching `st` state codes.

```sql
CREATE TABLE state_regions (
    st varchar(2) CONSTRAINT st_key PRIMARY KEY,
    region varchar(20) NOT NULL
);

COPY state_regions
FROM 'C:\YourDirectory\state_regions.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ',');
```

**How it works:**
- We'll create two columns in a `state_regions` table: one containing the two-character state code `st` and the other containing the region name
- We set the primary key constraint to the `st` column, which holds a unique `st_key` value to identify each state
- In the data you're importing, each state is present and assigned to a U.S. Census region, and territories outside the United States are labeled as outlying areas

### Adding and Updating Inspection Dates

Next, let's return to the `meat_poultry_egg_inspect` table, add a column for inspection dates, and then fill in that column with the New England states:

```sql
ALTER TABLE meat_poultry_egg_inspect ADD COLUMN inspection_date date;

UPDATE meat_poultry_egg_inspect inspect
SET inspection_date = '2019-12-01'
WHERE EXISTS (SELECT state_regions.region
              FROM state_regions
              WHERE inspect.st = state_regions.st
              AND state_regions.region = 'New England');
```

**How it works:**
- The ALTER TABLE statement creates the `inspection_date` column in the `meat_poultry_egg_inspect` table
- In the UPDATE statement, we start by naming the table using an alias of `inspect` to make the code easier to read
- Next, the SET clause assigns a date value of `2019-12-01` to the new `inspection_date` column
- Finally, the WHERE EXISTS clause includes a subquery that connects the `meat_poultry_egg_inspect` table to the `state_regions` table we created and specifies which rows to update
- The subquery (in parentheses, beginning with SELECT) looks for rows in the `state_regions` table where the `region` column matches the string "New England"
- At the same time, it joins the `meat_poultry_egg_inspect` table with the `state_regions` table using the `st` column from both tables
- In effect, the query is telling the database to find all the `st` codes that correspond to the New England region and use those codes to filter the update

**Result:** When you run the code, you should receive a message of `UPDATE 252`, which is the number of companies in New England.

**Viewing Updated Values:**
```sql
SELECT st, inspection_date
FROM meat_poultry_egg_inspect
GROUP BY st, inspection_date
ORDER BY st;
```

**Result:** The results should show the updated inspection dates for all New England companies. The top of the output shows Connecticut has received a date, for example, but states outside New England remain NULL because we haven't updated them yet.

**Note:** To fill in dates for additional regions, substitute a different region for "New England" and rerun the query.

## Deleting Unnecessary Data

The most irrevocable way to modify data is to remove it entirely. SQL includes options to remove rows and columns from a table along with options to delete an entire table or database. We want to perform these operations with caution, removing only data or tables we don't need. Without a backup, the data is gone for good.

**Important Note:** It's easy to exclude unwanted data in queries using a WHERE clause, so decide whether you truly need to delete the data or can just filter it out. Cases where deleting may be the best solution include data with errors or data imported incorrectly.

In this section, we'll use a variety of SQL statements to delete unnecessary data:
- **DELETE FROM**: For removing rows from a table
- **ALTER TABLE DROP COLUMN**: To remove a column from a table
- **DROP TABLE**: To remove a whole table from the database

**Warning:** Writing and executing these statements is fairly simple, but doing so comes with a caveat. If deleting rows, a column, or a table would cause a violation of a constraint, such as the foreign key constraint covered in Chapter 7, you need to deal with that constraint first. That might involve removing the constraint, deleting data in another table, or deleting another table. Each case is unique and will require a different way to work around the constraint.

### Deleting Rows from a Table

Using a DELETE FROM statement, we can remove all rows from a table, or we can use a WHERE clause to delete only the portion that matches an expression we supply.

**Delete All Rows:**
```sql
DELETE FROM table_name;
```

**Note:** If your table has a large number of rows, it might be faster to erase the table and create a fresh version using the original CREATE TABLE statement. To erase the table, use the DROP TABLE command.

**Delete Selected Rows:**
```sql
DELETE FROM table_name WHERE expression;
```

**Example:** If we want our table of meat, poultry, and egg processors to include only establishments in the 50 U.S. states, we can remove the companies in Puerto Rico and the Virgin Islands from the table:

```sql
DELETE FROM meat_poultry_egg_inspect
WHERE st IN('PR','VI');
```

**Result:** PostgreSQL should return the message `DELETE 86`. This means the 86 rows where the `st` column held either PR or VI have been removed from the table.

### Deleting a Column from a Table

While working on the `zip` column in the `meat_poultry_egg_inspect` table earlier in this chapter, we created a backup column called `zip_copy`. Now that we've finished working on fixing the issues in `zip`, we no longer need `zip_copy`. We can remove the backup column, including all the data within the column, from the table by using the DROP keyword in the ALTER TABLE statement.

**Syntax:**
```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

**Example:**
```sql
ALTER TABLE meat_poultry_egg_inspect DROP COLUMN zip_copy;
```

**Result:** PostgreSQL returns the message `ALTER TABLE`, and the `zip_copy` column should be deleted.

### Deleting a Table from a Database

The DROP TABLE statement is a standard ANSI SQL feature that deletes a table from the database. This statement might come in handy if, for example, you have a collection of backups, or working tables, that have outlived their usefulness. It's also useful in other situations, such as when you need to change the structure of a table significantly; in that case, rather than using too many ALTER TABLE statements, you can just remove the table and create another one by running a new CREATE TABLE statement.

**Syntax:**
```sql
DROP TABLE table_name;
```

**Example:**
```sql
DROP TABLE meat_poultry_egg_inspect_backup;
```

**Result:** Run the query; PostgreSQL should respond with the message `DROP TABLE` to indicate the table has been removed.

## Using Transaction Blocks to Save or Revert Changes

The alterations you made on data using the techniques in this chapter so far are final. That is, after you run a DELETE or UPDATE query (or any other query that alters your data or database structure), the only way to undo the change is to restore from a backup. However, you can check your changes before finalizing them and cancel the change if it's not what you intended.

You do this by wrapping the SQL statement within a **transaction block**, which is a group of statements you define using the following keywords at the beginning and end of the query:

### Transaction Keywords

- **START TRANSACTION**: Signals the start of the transaction block. In PostgreSQL, you can also use the non-ANSI SQL `BEGIN` keyword.
- **COMMIT**: Signals the end of the block and saves all changes.
- **ROLLBACK**: Signals the end of the block and reverts all changes.

**How it works:** Usually, database programmers employ a transaction block to define the start and end of a sequence of operations that perform one unit of work in a database. An example is when you purchase tickets to a Broadway show. A successful transaction might involve two steps: charging your credit card and reserving your seats so someone else can't buy them. A database programmer would either want both steps in the transaction to happen (say, when your card charge goes through) or neither of them to happen (if your card is declined or you cancel at checkout). Defining both steps as one transaction keeps them as a unit; if one step fails, the other is canceled too.

### Example: Using Transaction Blocks

Using the `meat_poultry_egg_inspect` table, let's say we're cleaning dirty data related to the company AGRO Merchants Oakland LLC. The table has three rows listing the company, but one row has an extra comma in the name. We want the name to be consistent, so we'll remove the comma from the third row using an UPDATE query. But this time we'll check the result of our update before we make it final (and we'll purposely make a mistake we want to discard):

```sql
START TRANSACTION;
UPDATE meat_poultry_egg_inspect
SET company = 'AGRO Merchantss Oakland LLC'  -- Intentional typo
WHERE company = 'AGRO Merchants Oakland, LLC';
SELECT company
FROM meat_poultry_egg_inspect
WHERE company LIKE 'AGRO%'
ORDER BY company;
ROLLBACK;
```

**How it works:**
- We'll run each statement separately, beginning with `START TRANSACTION;`
- The database responds with the message `START TRANSACTION`, letting you know that any succeeding changes you make to data will not be made permanent unless you issue a COMMIT command
- Next, we run the UPDATE statement, which changes the company name in the row where it has an extra comma. I intentionally added an extra `s` in the name used in the SET clause to introduce a mistake
- When we view the names of companies starting with the letters "AGRO" using the SELECT statement, we see that, oops, one company name is misspelled now
- Instead of rerunning the UPDATE statement to fix the typo, we can simply discard the change by running the `ROLLBACK;` command
- When we rerun the SELECT statement to view the company names, we're back to where we started

**From here:** You could correct your UPDATE statement by removing the extra `s` and rerun it, beginning with the START TRANSACTION statement again. If you're happy with the changes, run `COMMIT;` to make them permanent.

**Important Note:** When you start a transaction, any changes you make to the data aren't visible to other database users until you execute COMMIT.

Transaction blocks are often used in more complex database systems. Here you've used them to try a query and either accept or reject the changes, saving you time and headaches.

## Improving Performance When Updating Large Tables

Because of how PostgreSQL works internally, adding a column to a table and filling it with values can quickly inflate the table's size. The reason is that the database creates a new version of the existing row each time a value is updated, but it doesn't delete the old row version. (You'll learn how to clean up these old rows when I discuss database maintenance in "Recovering Unused Space with VACUUM" on page 314.) For small data sets, the increase is negligible, but for tables with hundreds of thousands or millions of rows, the time required to update rows and the resulting extra disk usage can be substantial.

### Alternative Approach: Copy Table with New Column

Instead of adding a column and filling it with values, we can save disk space by copying the entire table and adding a populated column during the operation. Then, we rename the tables so the copy replaces the original, and the original becomes a backup.

**Step 1: Create Table with New Column**
```sql
CREATE TABLE meat_poultry_egg_inspect_backup AS
SELECT *,
       '2018-02-07'::date AS reviewed_date
FROM meat_poultry_egg_inspect;
```

**How it works:**
- The query is a modified version of the backup script
- Here, in addition to selecting all the columns using the asterisk wildcard, we also add a column called `reviewed_date` by providing a value cast as a date data type and the AS keyword
- That syntax adds and fills `reviewed_date`, which we might use to track the last time we checked the status of each plant

**Step 2: Swap Table Names**
```sql
ALTER TABLE meat_poultry_egg_inspect RENAME TO meat_poultry_egg_inspect_temp;
ALTER TABLE meat_poultry_egg_inspect_backup RENAME TO meat_poultry_egg_inspect;
ALTER TABLE meat_poultry_egg_inspect_temp RENAME TO meat_poultry_egg_inspect_backup;
```

**How it works:**
- Here we use ALTER TABLE with a RENAME TO clause to change a table name
- The first statement changes the original table name to one that ends with `_temp`
- The second statement renames the copy we made to the original name of the table
- Finally, we rename the table that ends with `_temp` to the ending `_backup`
- The original table is now called `meat_poultry_egg_inspect_backup`, and the copy with the added column is called `meat_poultry_egg_inspect`

**Benefits:** By using this process, we avoid updating rows and having the database inflate the size of the table. When we eventually drop the `_backup` table, the remaining data table is smaller and does not require cleanup.

## Summary

Gleaning useful information from data sometimes requires modifying the data to remove inconsistencies, fix errors, and make it more suitable for supporting an accurate analysis. In this chapter you learned some useful tools to help you assess dirty data and clean it up. In a perfect world, all data sets would arrive with everything clean and complete. But such a perfect world doesn't exist, so the ability to alter, update, and delete data is indispensable.

### Key Concepts Covered

- **Dirty data**: Data with errors, missing values, or poor organization
- **Interviewing data**: Using aggregate queries to discover data quality issues
- **ALTER TABLE**: Modifying table structure (ADD COLUMN, DROP COLUMN, ALTER COLUMN)
- **UPDATE**: Modifying data values in tables
- **Backup strategies**: Creating table and column backups before modifications
- **Concatenation**: Using `||` operator to combine strings
- **Transaction blocks**: START TRANSACTION, COMMIT, ROLLBACK
- **DELETE**: Removing rows from tables
- **DROP COLUMN**: Removing columns from tables
- **DROP TABLE**: Removing entire tables
- **Performance optimization**: Copying tables instead of updating large tables

### Best Practices

1. ✅ Always back up tables before making changes
2. ✅ Make copies of columns for extra protection
3. ✅ Use transaction blocks to test changes before committing
4. ✅ Verify changes with SELECT queries before committing
5. ✅ Use WHERE clauses carefully in UPDATE and DELETE statements
6. ✅ Keep original columns when creating standardized versions
7. ✅ Use LIKE with wildcards for pattern matching in updates
8. ✅ Use concatenation to repair malformed values
9. ✅ Consider copying tables instead of updating large tables
10. ✅ Document all changes made to data

### Common Patterns

**Creating a backup:**
```sql
CREATE TABLE table_backup AS SELECT * FROM table;
```

**Creating a column copy:**
```sql
ALTER TABLE table ADD COLUMN column_copy data_type;
UPDATE table SET column_copy = column;
```

**Updating specific rows:**
```sql
UPDATE table SET column = value WHERE condition;
```

**Updating with pattern matching:**
```sql
UPDATE table SET column = 'standard_value' WHERE column LIKE 'pattern%';
```

**Repairing values with concatenation:**
```sql
UPDATE table SET column = 'prefix' || column WHERE condition;
```

**Using transaction blocks:**
```sql
START TRANSACTION;
UPDATE table SET column = value WHERE condition;
SELECT * FROM table WHERE condition;  -- Verify changes
ROLLBACK;  -- or COMMIT;
```

**Deleting rows:**
```sql
DELETE FROM table WHERE condition;
```

**Removing columns:**
```sql
ALTER TABLE table DROP COLUMN column;
```

**Removing tables:**
```sql
DROP TABLE table;
```

### When to Use Each Command

**ALTER TABLE:**
- Adding new columns
- Removing unnecessary columns
- Changing data types
- Adding or removing constraints
- Renaming tables

**UPDATE:**
- Fixing missing values
- Standardizing inconsistent data
- Repairing malformed values
- Updating values based on other tables

**DELETE:**
- Removing erroneous data
- Cleaning up test data
- Removing outdated records

**Transaction Blocks:**
- Testing changes before committing
- Ensuring data consistency
- Rolling back mistakes

### Data Quality Issues to Check

1. **Missing values**: Use `IS NULL` to find
2. **Duplicate addresses**: Use GROUP BY with HAVING
3. **Inconsistent spelling**: Use GROUP BY with count()
4. **Malformed values**: Use `length()` function
5. **Wrong data types**: Check with `max()` and `min()`

## Next Steps

Let me restate the important tasks of working safely. Be sure to back up your tables before you start making changes. Make copies of your columns, too, for an extra level of protection. When I discuss database maintenance for PostgreSQL later in the book, you'll learn how to back up entire databases. These few steps of precaution will save you a world of pain.

In the next chapter, we'll return to math to explore some of SQL's advanced statistical functions and techniques for analysis.
