# Chapter 4: Importing and Exporting Data

## Introduction

So far, you've learned how to add a handful of rows to a table using SQL INSERT statements. A row-by-row insert is useful for making quick test tables or adding a few rows to an existing table. But it's more likely you'll need to load hundreds, thousands, or even millions of rows, and no one wants to write separate INSERT statements in those situations. Fortunately, you don't have to.

If your data exists in a delimited text file (with one table row per line of text and each column value separated by a comma or other character), PostgreSQL can import the data in bulk via its **COPY** command. This command is a PostgreSQL-specific implementation with options for including or excluding columns and handling various delimited text types.

In the opposite direction, COPY will also export data from PostgreSQL tables or from the result of a query to a delimited text file. This technique is handy when you want to share data with colleagues or move it into another format, such as an Excel file.

## Three Steps for Importing Data

Three steps form the outline of most of the imports you'll do:

1. **Prep the source data** in the form of a delimited text file
2. **Create a table** to store the data
3. **Write a COPY script** to perform the import

After the import is done, we'll check the data and look at additional options for importing and exporting.

## Working with Delimited Text Files

A delimited text file is the most common file format that's portable across proprietary and open source systems, so we'll focus on that file type. If you want to transfer data from another database program's proprietary format directly to PostgreSQL, such as Microsoft Access or MySQL, you'll need to use a third-party tool.

**Note:** If you're using SQL with another database manager, check the other database's documentation for how it handles bulk imports. The MySQL database, for example, has a `LOAD DATA INFILE` statement, and Microsoft's SQL Server has its own `BULK INSERT` command.

### Understanding Delimited Files

Many software applications store data in a unique format, and translating one data format to another can be challenging. Fortunately, most software can import from and export to a delimited text file, which is a common data format that serves as a middle ground.

**Definition:** A delimited text file contains rows of data, and each row represents one row in a table. In each row, a character separates, or delimits, each data column.

**Common Delimiters:**
- Comma (most common) - CSV (Comma-Separated Values)
- Pipe (`|`)
- Tab
- Semicolon (`;`)
- Other characters (ampersands, etc.)

**Example of a comma-delimited row:**
```
John,Doe,123 Main St.,Hyde Park,NY,845-555-1212
```

Notice that a comma separates each piece of data—first name, last name, street, town, state, and phone—without any spaces. The commas tell the software to treat each item as a separate column, either upon import or export.

### Quoting Columns that Contain Delimiters

Using commas as a column delimiter leads to a potential dilemma: what if the value in a column includes a comma? For example, sometimes people combine an apartment number with a street address, as in "123 Main St., Apartment 200". Unless the system for delimiting accounts for that extra comma, during import the line will appear to have an extra column and cause the import to fail.

**Solution:** Delimited files wrap columns that contain a delimiter character with an arbitrary character called a **text qualifier** that tells SQL to ignore the delimiter character held within. Most of the time in comma-delimited files, the text qualifier used is the double quote.

**Example:**
```
John,Doe,"123 Main St., Apartment 200",Hyde Park,NY,845-555-1212
```

On import, the database will recognize that double quotes signify one column regardless of whether it finds a delimiter within the quotes. When importing CSV files, PostgreSQL by default ignores delimiters inside double-quoted columns, but you can specify a different text qualifier if your import requires it.

### Handling Header Rows

Another feature you'll often find inside a delimited text file is the **header row**. As the name implies, it's a single row at the top, or head, of the file that lists the name of each data field. Usually, a header is created during the export of data from a database.

**Example:**
```
FIRSTNAME,LASTNAME,STREET,CITY,STATE,PHONE
John,Doe,"123 Main St., Apartment 200",Hyde Park,NY,845-555-1212
```

**Purpose of Header Rows:**
1. The values in the header row identify the data in each column, which is particularly useful when you're deciphering a file's contents
2. Some database managers (although not PostgreSQL) use the header row to map columns in the delimited file to the correct columns in the import table

**Important:** Because PostgreSQL doesn't use the header row, we don't want that row imported to a table, so we'll use a `HEADER` option in the COPY command to exclude it.

## Using COPY to Import Data

To import data from an external file into our database, first we need to check out a source CSV file and build the table in PostgreSQL to hold the data. Thereafter, the SQL statement for the import is relatively simple.

### Basic COPY Import Syntax

```sql
COPY table_name
FROM 'C:\YourDirectory\your_file.csv'
WITH (FORMAT CSV, HEADER);
```

**Components:**
- **COPY** - Keyword followed by the name of the target table (must already exist)
- **FROM** - Keyword identifying the full path to the source file, including its name
- **WITH** - Keyword letting you specify options, surrounded by parentheses

### File Path Formats

**Windows:**
```sql
FROM 'C:\Users\Anthony\Desktop\my_file.csv'
```
Begin with the drive letter, colon, backslash, and directory names.

**macOS/Linux:**
```sql
FROM '/Users/anthony/Desktop/my_file.csv'
```
Start at the system root directory with a forward slash and proceed from there.

**Important:** In both cases, the full path and filename are surrounded by single quotes.

### COPY Options

The WITH keyword lets you specify options that you can tailor to your input or output file. Here are the options you'll commonly use:

#### FORMAT

Use the `FORMAT format_name` option to specify the type of file you're reading or writing. Format names are:
- **CSV** - Standard CSV files (most common)
- **TEXT** - Tab-delimited by default (used mainly by PostgreSQL's built-in backup programs)
- **BINARY** - Data stored as a sequence of bytes (rarely needed)

**Note:** In the TEXT format, a tab character is the delimiter by default (although you can specify another character) and backslash characters such as `\r` are recognized as their ASCII equivalents.

#### HEADER

**On import:** Use `HEADER` to specify that the source file has a header row. You can also specify it longhand as `HEADER ON`, which tells the database to start importing with the second line of the file, preventing the unwanted import of the header.

**On export:** Using `HEADER` tells the database to include the column names as a header row in the output file, which is usually helpful to do.

#### DELIMITER

The `DELIMITER 'character'` option lets you specify which character your import or export file uses as a delimiter. The delimiter must be a single character and cannot be a carriage return.

**Important:** If you use `FORMAT CSV`, the assumed delimiter is a comma. You can specify a different delimiter if your data uses one. For example, if you received pipe-delimited data:
```sql
DELIMITER '|'
```

#### QUOTE

Earlier, you learned that in a CSV, commas inside a single column value will mess up your import unless the column value is surrounded by a character that serves as a text qualifier. By default, PostgreSQL uses the double quote, but if the CSV you're importing uses a different character, you can specify it with the `QUOTE 'quote_character'` option.

## Importing Census Data Describing Counties

The data set you'll work with in this import exercise is considerably larger than the teachers table you made in Chapter 1. It contains census data about every county in the United States and is 3,143 rows deep and 91 columns wide.

### Understanding the U.S. Census

Every 10 years, the government conducts a full count of the population—one of several ongoing programs by the Census Bureau to collect demographic data. Each household in America receives a questionnaire about each person in it—their age, gender, race, and whether they are Hispanic or not. The U.S. Constitution mandates the count to determine how many members from each state make up the U.S. House of Representatives.

**Data Source:** For this exercise, download the `us_counties_2010.csv` file from https://www.nostarch.com/practicalSQL/ and save it to a folder on your computer.

### Creating the us_counties_2010 Table

The table structure includes many columns. Here's an abbreviated version showing key columns:

```sql
CREATE TABLE us_counties_2010 (
    geo_name varchar(90),
    state_us_abbreviation varchar(2),
    summary_level varchar(3),
    region smallint,
    division smallint,
    state_fips varchar(2),
    county_fips varchar(3),
    area_land bigint,
    area_water bigint,
    population_count_100_percent integer,
    housing_unit_count_100_percent integer,
    internal_point_lat numeric(10,7),
    internal_point_lon numeric(10,7),
    p0010001 integer,
    p0010002 integer,
    -- ... many more columns
);
```

**Key Column Explanations:**

1. **geo_name** - County name (varchar(90) because maximum length is 90 characters)
2. **state_us_abbreviation** - Two-character state abbreviation (varchar(2))
3. **summary_level** - Geography level code (varchar(3) because it contains leading zeros like "050")
4. **region, division** - Location codes 0-9 (smallint)
5. **state_fips, county_fips** - Federal codes with leading zeros (varchar to preserve zeros)
6. **area_land, area_water** - Square meters (bigint because some values exceed integer maximum)
7. **internal_point_lat, internal_point_lon** - Coordinates (numeric(10,7) for up to 7 decimal places)
8. **p0010001, p0010002, etc.** - Population counts by race and ethnicity (integer)

**Important Design Decisions:**
- Using `varchar` for codes preserves leading zeros (e.g., "050" not "50")
- Using `bigint` for area handles very large values (e.g., Alaska counties)
- Using `numeric(10,7)` for coordinates provides sufficient precision

### Performing the Census Import with COPY

Now you're ready to bring the census data into the table:

```sql
COPY us_counties_2010
FROM 'C:\YourDirectory\us_counties_2010.csv'
WITH (FORMAT CSV, HEADER);
```

**Success Message:**
```
Query returned successfully: 3143 rows affected
```

**Error Handling:** If you have an issue with the source CSV or your import statement, the database will throw an error. For example:
```
ERROR: extra data after last expected column
SQL state: 22P04
Context: COPY us_counties_2010, line 2: "Autauga County,AL,050,3,6,01,001 ..."
```

**Verification:** Even if no errors are reported, it's always a good idea to visually scan the data you just imported:

```sql
SELECT * FROM us_counties_2010;
```

There should be 3,143 rows displayed in pgAdmin. You can also verify specific columns:

```sql
SELECT geo_name, state_us_abbreviation, area_land
FROM us_counties_2010
ORDER BY area_land DESC
LIMIT 3;
```

## Importing a Subset of Columns with COPY

If a CSV file doesn't have data for all the columns in your target database table, you can still import the data you have by specifying which columns are present in the data.

### Example Scenario

You create a table called `supervisor_salaries`:

```sql
CREATE TABLE supervisor_salaries (
    town varchar(30),
    county varchar(30),
    supervisor varchar(30),
    start_date date,
    salary money,
    benefits money
);
```

But the CSV file only contains `town`, `supervisor`, and `salary` columns.

### Solution: Specify Columns

```sql
COPY supervisor_salaries (town, supervisor, salary)
FROM 'C:\YourDirectory\supervisor_salaries.csv'
WITH (FORMAT CSV, HEADER);
```

By noting in parentheses the three present columns after the table name, we tell PostgreSQL to only look for data to fill those columns when it reads the CSV. The other columns will remain NULL.

## Adding a Default Value to a Column During Import

What if you want to populate a column during the import, even though the value is missing from the CSV file? You can do so by using a **temporary table**.

### Temporary Tables

Temporary tables exist only until you end your database session. When you reopen the database (or lose your connection), those tables disappear. They're handy for performing intermediary operations on data as part of your processing pipeline.

### Example: Adding County Name

```sql
-- Step 1: Clear existing data
DELETE FROM supervisor_salaries;

-- Step 2: Create temporary table
CREATE TEMPORARY TABLE supervisor_salaries_temp (LIKE supervisor_salaries);

-- Step 3: Import into temporary table
COPY supervisor_salaries_temp (town, supervisor, salary)
FROM 'C:\YourDirectory\supervisor_salaries.csv'
WITH (FORMAT CSV, HEADER);

-- Step 4: Insert into main table with default value
INSERT INTO supervisor_salaries (town, county, supervisor, salary)
SELECT town, 'Some County', supervisor, salary
FROM supervisor_salaries_temp;

-- Step 5: Drop temporary table
DROP TABLE supervisor_salaries_temp;
```

**How It Works:**
1. Create a temporary table based on the original table using `LIKE`
2. Import the CSV file into the temporary table
3. Use an INSERT statement with SELECT to fill the main table, specifying a default value (like 'Some County') for the missing column
4. Drop the temporary table (it will disappear automatically when you disconnect, but it's good practice to remove it)

**Result:** The county field is filled with the default value 'Some County' for all rows.

## Using COPY to Export Data

The main difference between exporting and importing data with COPY is that rather than using `FROM` to identify the source data, you use `TO` for the path and name of the output file. You control how much data to export—an entire table, just a few columns, or to fine-tune it even more, the results of a query.

### Exporting All Data

The simplest export sends everything in a table to a file:

```sql
COPY us_counties_2010
TO 'C:\YourDirectory\us_counties_export.txt'
WITH (FORMAT CSV, HEADER, DELIMITER '|');
```

**Note:** I've used the `.txt` file extension here for two reasons:
1. It demonstrates that you can export to any text file format
2. We're using a pipe for a delimiter, not a comma. It's good practice to avoid calling files `.csv` unless they truly have commas as a separator.

### Exporting Particular Columns

You don't always need (or want) to export all your data. You might have sensitive information that needs to remain private, or you might only need specific columns for your work.

```sql
COPY us_counties_2010 (geo_name, internal_point_lat, internal_point_lon)
TO 'C:\YourDirectory\us_counties_latlon_export.txt'
WITH (FORMAT CSV, HEADER, DELIMITER '|');
```

By listing columns in parentheses after the table name, we export only those columns. You must enter these column names precisely as they're listed in the data for PostgreSQL to recognize them.

### Exporting Query Results

Additionally, you can add a query to COPY to fine-tune your output:

```sql
COPY (
    SELECT geo_name, state_us_abbreviation
    FROM us_counties_2010
    WHERE geo_name ILIKE '%mill%'
)
TO 'C:\YourDirectory\us_counties_mill_export.txt'
WITH (FORMAT CSV, HEADER, DELIMITER '|');
```

This exports only the counties whose name contains the letters "mill" (case-insensitive), using the `ILIKE` operator and the `%` wildcard character.

## Importing and Exporting Through pgAdmin

At times, the SQL COPY commands won't be able to handle certain imports and exports, typically when you're connected to a PostgreSQL instance running on a computer other than yours, perhaps elsewhere on a network. When that happens, you might not have access to that computer's filesystem, which makes setting the path in the FROM or TO clause difficult.

### Using pgAdmin's Import/Export Wizard

One workaround is to use pgAdmin's built-in import/export wizard.

**Steps:**

1. **Locate the table:** In pgAdmin's object browser (the left vertical pane), locate the list of tables in your analysis database by choosing Databases → analysis → Schemas → public → Tables

2. **Open Import/Export:** Right-click on the table you want to import to or export from, and select **Import/Export**

3. **Configure Import:**
   - Move the Import/Export slider to **Import**
   - Click the three dots to the right of the Filename box to locate your CSV file
   - From the Format drop-down list, choose **csv**
   - Adjust the header, delimiter, quoting, and other options as needed
   - Click **OK** to import the data

4. **Configure Export:**
   - Use the same dialog
   - Move the slider to **Export**
   - Follow similar steps to configure the export

## Summary

Now that you've learned how to bring external data into your database, you can start digging into a myriad of data sets, whether you want to explore one of the thousands of publicly available data sets, or data related to your own career or studies. Plenty of data is available in CSV format or a format easily convertible to CSV. Look for data dictionaries to help you understand the data and choose the right data type for each field.

### Key Concepts Covered

- **Delimited text files** - Common format for data exchange
- **CSV files** - Comma-separated values (most common)
- **Text qualifiers** - Characters that wrap values containing delimiters
- **Header rows** - Column names at the top of files
- **COPY command** - PostgreSQL's bulk import/export tool
- **Temporary tables** - Tables that exist only for the session
- **Column subset import** - Importing only specific columns
- **Default values** - Adding values during import using temporary tables
- **Query-based export** - Exporting filtered query results

### Best Practices

1. Always check for data dictionaries when available
2. Use appropriate data types based on the data dictionary
3. Preserve leading zeros by using varchar for codes
4. Use bigint for very large numbers
5. Verify imports by checking row counts and sample data
6. Use temporary tables for complex import transformations
7. Specify columns explicitly when importing subsets
8. Use HEADER option to exclude header rows on import
9. Use HEADER option to include header rows on export
10. Choose appropriate file extensions based on delimiter used

## Next Steps

The census data you imported as part of this chapter's exercises will play a starring role in the next chapter in which we explore math functions with SQL.
