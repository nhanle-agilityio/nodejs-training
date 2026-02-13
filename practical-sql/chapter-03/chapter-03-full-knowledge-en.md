# Chapter 3: Understanding Data Types

## Introduction

Whenever you dig into a new database, checking the data type specified for each column in each table is crucial. If you're lucky, you can get your hands on a data dictionary: a document that lists each column, specifies whether it's a number, character, or other type, and explains the column values. Unfortunately, many organizations don't create and maintain good documentation, so it's not unusual to hear, "We don't have a data dictionary." In that case, try to learn by inspecting the table structures in pgAdmin.

It's important to understand data types because storing data in the appropriate format is fundamental to building usable databases and performing accurate analysis. In addition, a data type is a programming concept applicable to more than just SQL. The concepts you'll explore in this chapter will transfer well to additional languages you may want to learn.

## Data Type Basics

In a SQL database, each column in a table can hold one and only one data type, which is defined in the CREATE TABLE statement. You declare the data type after naming the column.

### Example Table Definition

```sql
CREATE TABLE eagle_watch (
    observed_date date,
    eagles_seen integer
);
```

In this table named `eagle_watch` (for an annual inventory of bald eagles), the `observed_date` column is declared to hold date values by adding the `date` type declaration after its name. Similarly, `eagles_seen` is set to hold whole numbers with the `integer` type declaration.

### Three Main Categories

These data types are among the three categories you'll encounter most:
- **Characters** - Any character or symbol
- **Numbers** - Includes whole numbers and fractions
- **Dates and times** - Types holding temporal information

## Character Data Types

Character string types are general-purpose types suitable for any combination of text, numbers, and symbols. Character types include:

### char(n)

A fixed-length column where the character length is specified by `n`. A column set at `char(20)` stores 20 characters per row regardless of how many characters you insert. If you insert fewer than 20 characters in any row, PostgreSQL pads the rest of that column with spaces.

**Characteristics:**
- Part of standard SQL
- Can also be specified with the longer name `character(n)`
- Used infrequently nowadays
- Mainly a remnant of legacy computer systems
- Can potentially consume more storage space than needed

**Example:**
```sql
CREATE TABLE example (
    code char(2)  -- For U.S. state postal abbreviations
);
```

### varchar(n)

A variable-length column where the maximum length is specified by `n`. If you insert fewer characters than the maximum, PostgreSQL will not store extra spaces. For example, the string "blue" will take four spaces, whereas the string "123" will take three. In large databases, this practice saves considerable space.

**Characteristics:**
- Included in standard SQL
- Can also be specified using the longer name `character varying(n)`
- More flexible and space-efficient than `char(n)`
- Recommended for most text columns

**Example:**
```sql
CREATE TABLE example (
    name varchar(100),
    description varchar(500)
);
```

### text

A variable-length column of unlimited length. According to the PostgreSQL documentation, the longest possible character string you can store is about 1 gigabyte.

**Characteristics:**
- Not part of the SQL standard
- Similar implementations in other database systems (Microsoft SQL Server, MySQL)
- Most flexible option
- No need to specify maximum length

**Example:**
```sql
CREATE TABLE example (
    notes text,
    description text
);
```

### Performance Considerations

According to PostgreSQL documentation, there is no substantial difference in performance among the three types (`char`, `varchar`, `text`). That may differ if you're using another database manager, so it's wise to check the docs. The flexibility and potential space savings of `varchar` and `text` seem to give them an advantage.

**Best Practice:** Typically, using `varchar` with an `n` value sufficient to handle outliers is a solid strategy. For columns that will always have the same number of characters (like U.S. state postal abbreviations), `char(2)` can be a good way to signal what data it should contain.

### Example: Character Types in Action

```sql
CREATE TABLE char_data_types (
    varchar_column varchar(10),
    char_column char(10),
    text_column text
);

INSERT INTO char_data_types
VALUES
('abc', 'abc', 'abc'),
('defghi', 'defghi', 'defghi');
```

When exported and viewed, you'll notice:
- The `char` column outputs 10 characters every time, padding unused characters with spaces
- The `varchar` and `text` columns store only the characters you inserted

## Number Data Types

Number columns hold various types of numbers, but that's not all: they also allow you to perform calculations on those numbers. That's an important distinction from numbers you store as strings in a character column, which can't be added, multiplied, divided, or perform any other math operation.

Also, numbers stored as characters sort differently than numbers stored as numbers, arranging in text rather than numerical order. So, if you're doing math or the numeric order is important, use number types.

The SQL number types include:
- **Integers** - Whole numbers, both positive and negative
- **Fixed-point and floating-point** - Two formats of fractions of whole numbers

## Integer Data Types

The integer data types are the most common number types you'll find when exploring data in a SQL database. Think of all the places integers appear in life: your street or apartment number, the serial number on your refrigerator, the number on a raffle ticket. These are whole numbers, both positive and negative, including zero.

### Standard Integer Types

The SQL standard provides three integer types: `smallint`, `integer`, and `bigint`. The difference between the three types is the maximum size of the numbers they can hold.

| Data Type | Storage Size | Range |
|-----------|--------------|-------|
| `smallint` | 2 bytes | -32,768 to +32,767 |
| `integer` | 4 bytes | -2,147,483,648 to +2,147,483,647 |
| `bigint` | 8 bytes | -9,223,372,036,854,775,808 to +9,223,372,036,854,775,807 |

### Choosing Integer Types

**bigint:**
- Even though it eats up the most storage, `bigint` will cover just about any requirement you'll ever have with a number column
- Its use is a must if you're working with numbers larger than about 2.1 billion
- You can easily make it your go-to default and never worry

**integer:**
- If you're confident numbers will remain within the integer limit, that type is a good choice
- It doesn't consume as much space as `bigint` (a concern when dealing with millions of data rows)

**smallint:**
- When the data values will remain constrained, `smallint` makes sense
- Days of the month or years are good examples
- The `smallint` type will use half the storage as `integer`
- It's a smart database design decision if the column values will always fit within its range

**Important:** If you try to insert a number into any of these columns that is outside its range, the database will stop the operation and return an out of range error.

## Auto-Incrementing Integers (Serial Types)

In Chapter 1, when you made the teachers table, you created an `id` column with the declaration of `bigserial`. This and its siblings `smallserial` and `serial` are not so much true data types as a special implementation of the corresponding `smallint`, `integer`, and `bigint` types.

When you add a column with a serial type, PostgreSQL will auto-increment the value in the column each time you insert a row, starting with 1, up to the maximum of each integer type.

### Serial Types

The serial types are implementations of the ANSI SQL standard for auto-numbered identity columns. Each database manager implements these in its own way. For example, Microsoft SQL Server uses an `IDENTITY` keyword to set a column to auto-increment.

| Data Type | Storage Size | Range |
|-----------|--------------|-------|
| `smallserial` | 2 bytes | 1 to 32,767 |
| `serial` | 4 bytes | 1 to 2,147,483,647 |
| `bigserial` | 8 bytes | 1 to 9,223,372,036,854,775,807 |

### Using Serial Types

To use a serial type on a column, declare it in the CREATE TABLE statement as you would an integer type:

```sql
CREATE TABLE people (
    id serial,
    person_name varchar(100)
);
```

Every time a new `person_name` is added to the table, the `id` column will increment by 1.

**Common Use Case:** Database makers often employ a serial type to create a unique ID number, also known as a key, for each row in the table. Each row then has its own ID that other tables in the database can reference. Because the column is auto-incrementing, you don't need to insert a number into that column when adding data; PostgreSQL handles that for you.

**Important Note:** Even though a column with a serial type auto-increments each time a row is added, some scenarios will create gaps in the sequence of numbers in the column. If a row is deleted, for example, the value in that row is never replaced. Or, if a row insert is aborted, the sequence for the column will still be incremented.

## Decimal Numbers

As opposed to integers, decimals represent a whole number plus a fraction of a whole number; the fraction is represented by digits following a decimal point. In a SQL database, they're handled by fixed-point and floating-point data types.

### Fixed-Point Numbers

The fixed-point type, also called the arbitrary precision type, is `numeric(precision,scale)`. You give the argument `precision` as the maximum number of digits to the left and right of the decimal point, and the argument `scale` as the number of digits allowable on the right of the decimal point.

**Alternate Name:** You can also specify this type using `decimal(precision,scale)`. Both are part of the ANSI SQL standard.

**Important Details:**
- If you omit specifying a scale value, the scale will be set to zero; in effect, that creates an integer
- If you omit specifying the precision and the scale, the database will store values of any precision and scale up to the maximum allowed
- Maximum: up to 131,072 digits before the decimal point and 16,383 digits after the decimal point

**Example:** To record rainfall in the database using five digits total (the precision) and two digits maximum to the right of the decimal (the scale), you'd specify it as `numeric(5,2)`. The database will always return two digits to the right of the decimal point, even if you don't enter a number that contains two digits. For example: 1.47, 1.00, and 121.50.

### Floating-Point Types

The two floating-point types are `real` and `double precision`. The difference between the two is how much data they store.

**Characteristics:**
- The `real` type allows precision to six decimal digits
- The `double precision` type allows precision to 15 decimal points
- Both include the number of digits on both sides of the point
- These floating-point types are also called variable-precision types
- The database stores the number in parts representing the digits and an exponent—the location where the decimal point belongs
- Unlike `numeric`, where we specify fixed precision and scale, the decimal point in a given column can "float" depending on the number

### Comparison: Fixed vs Floating-Point

| Data Type | Storage Size | Storage Type | Range |
|-----------|--------------|--------------|-------|
| `numeric`, `decimal` | variable | Fixed-point | Up to 131,072 digits before decimal; up to 16,383 digits after |
| `real` | 4 bytes | Floating-point | 6 decimal digits precision |
| `double precision` | 8 bytes | Floating-point | 15 decimal digits precision |

### Example: Number Types in Action

```sql
CREATE TABLE number_data_types (
    numeric_column numeric(20,5),
    real_column real,
    double_column double precision
);

INSERT INTO number_data_types
VALUES
(.7, .7, .7),
(2.13579, 2.13579, 2.13579),
(2.1357987654, 2.1357987654, 2.1357987654);

SELECT * FROM number_data_types;
```

**Results:**
- The `numeric` column, set with a scale of five, stores five digits after the decimal point whether or not you inserted that many. If fewer than five, it pads the rest with zeros. If more than five, it rounds them.
- The `real` and `double precision` columns store only the number of digits present with no padding. The number is rounded when inserted into the `real` column because that type has a maximum of six digits of precision. The `double precision` column can hold up to 15 digits, so it stores the entire number.

### Trouble with Floating-Point Math

If you're thinking, "Well, numbers stored as a floating-point look just like numbers stored as fixed," tread cautiously. The way computers store floating-point numbers can lead to unintended mathematical errors.

**Example:**
```sql
SELECT
    numeric_column * 10000000 AS "Fixed",
    real_column * 10000000 AS "Float"
FROM number_data_types
WHERE numeric_column = .7;
```

**Expected Result:** Both should equal 7,000,000

**Actual Result:**
- Fixed: 7000000.00000
- Float: 6999999.88079071

No wonder floating-point types are referred to as "inexact." The reason floating-point math produces such errors is that the computer attempts to squeeze lots of information into a finite number of bits.

**Storage Consideration:** The storage required by the `numeric` data type is variable, and depending on the precision and scale specified, `numeric` can consume considerably more space than the floating-point types. If you're working with millions of rows, it's worth considering whether you can live with relatively inexact floating-point math.

### Choosing Your Number Data Type

Here are three guidelines to consider when dealing with number data types:

1. **Use integers when possible.** Unless your data uses decimals, stick with integer types.

2. **If you're working with decimal data and need calculations to be exact** (dealing with money, for example), choose `numeric` or its equivalent, `decimal`. Float types will save space, but the inexactness of floating-point math won't pass muster in many applications. Use them only when exactness is not as important.

3. **Choose a big enough number type.** Unless you're designing a database to hold millions of rows, err on the side of bigger. When using `numeric` or `decimal`, set the precision large enough to accommodate the number of digits on both sides of the decimal point. With whole numbers, use `bigint` unless you're absolutely sure column values will be constrained to fit into the smaller `integer` or `smallint` types.

## Dates and Times

Whenever you enter a date into a search form, you're reaping the benefit of databases having an awareness of the current time (received from the server) plus the ability to handle formats for dates, times, and the nuances of the calendar, such as leap years and time zones. This is essential for storytelling with data, because the issue of when something occurred is usually as valuable a question as who, what, or how many were involved.

### Date and Time Data Types

PostgreSQL's date and time support includes the four major data types:

| Data Type | Storage Size | Description | Range |
|-----------|--------------|-------------|-------|
| `timestamp` | 8 bytes | Date and time | 4713 BC to 294276 AD |
| `date` | 4 bytes | Date (no time) | 4713 BC to 5874897 AD |
| `time` | 8 bytes | Time (no date) | 00:00:00 to 24:00:00 |
| `interval` | 16 bytes | Time interval | +/- 178,000,000 years |

### timestamp

Records date and time, which are useful for a range of situations you might track: departures and arrivals of passenger flights, a schedule of Major League Baseball games, or incidents along a timeline.

**Time Zone Consideration:** Typically, you'll want to add the keywords `with time zone` to ensure that the time recorded for an event includes the time zone where it occurred. Otherwise, times recorded in various places around the globe become impossible to compare.

**Format:** The format `timestamp with time zone` is part of the SQL standard; with PostgreSQL you can specify the same data type using `timestamptz`.

### date

Records just the date.

### time

Records just the time. Again, you'll want to add the `with time zone` keywords.

### interval

Holds a value representing a unit of time expressed in the format `quantity unit`. It doesn't record the start or end of a time period, only its length. Examples include "12 days" or "8 hours".

**Use Case:** You'll typically use this type for calculations or filtering on other date and time columns.

### Example: timestamp and interval in Action

```sql
CREATE TABLE date_time_types (
    timestamp_column timestamp with time zone,
    interval_column interval
);

INSERT INTO date_time_types
VALUES
('2018-12-31 01:00 EST','2 days'),
('2018-12-31 01:00 -8','1 month'),
('2018-12-31 01:00 Australia/Melbourne','1 century'),
(now(),'1 week');

SELECT * FROM date_time_types;
```

**Time Zone Formats:**
1. **Abbreviation:** EST (Eastern Standard Time)
2. **UTC Offset:** -8 (eight hours behind UTC, Pacific time zone)
3. **Time Zone Name:** Australia/Melbourne (uses values from standard time zone database)
4. **Function:** `now()` captures the current transaction time from your hardware

**Important:** Even though we supplied the same date and time in the first three rows, each row's output differs. The reason is that pgAdmin reports the date and time relative to your time zone, indicated by the UTC offset at the end of each timestamp.

### Using the interval Data Type in Calculations

The interval data type is useful for easy-to-understand calculations on date and time data. For example, let's say you have a column that holds the date a client signed a contract. Using interval data, you can add 90 days to each contract date to determine when to follow up with the client.

**Example:**
```sql
SELECT
    timestamp_column,
    interval_column,
    timestamp_column - interval_column AS new_date
FROM date_time_types;
```

This produces a computed column called `new_date` that contains the result of `timestamp_column` minus `interval_column`. In each row, we subtract the unit of time indicated by the interval data type from the date.

**Note:** Computed columns are called expressions; we'll use this technique often.

## Miscellaneous Types

The character, number, and date/time types you've learned so far will likely comprise the bulk of the work you do with SQL. But PostgreSQL supports many additional types, including but not limited to:

- **Boolean** - Stores a value of `true` or `false`
- **Geometric types** - Include points, lines, circles, and other two-dimensional objects
- **Network address types** - Such as IP or MAC addresses
- **UUID** - Universally Unique Identifier, sometimes used as a unique key value in tables
- **XML and JSON** - Data types that store information in those structured formats

These types will be covered as required throughout the book.

## Transforming Values with CAST

Occasionally, you may need to transform a value from its stored data type to another type; for example, when you retrieve a number as a character so you can combine it with text, or when you must treat a date stored as characters as an actual date type so you can sort it in date order or perform interval calculations.

### CAST() Function

You can perform these conversions using the `CAST()` function. The `CAST()` function only succeeds when the target data type can accommodate the original value.

**Rules:**
- Casting an integer as text is possible, because the character types can include numbers
- Casting text with letters of the alphabet as a number is not

### Examples

```sql
-- Example 1: Convert timestamp to varchar
SELECT timestamp_column, CAST(timestamp_column AS varchar(10))
FROM date_time_types;
-- Returns only the date segment (first 10 characters)

-- Example 2: Convert numeric to integer and varchar
SELECT numeric_column,
       CAST(numeric_column AS integer),
       CAST(numeric_column AS varchar(6))
FROM number_data_types;
-- Integer conversion rounds the value
-- Varchar conversion slices at the sixth character

-- Example 3: Invalid conversion (will error)
SELECT CAST(char_column AS integer) FROM char_data_types;
-- Returns error: invalid input syntax for integer
```

### CAST Shortcut Notation

PostgreSQL offers a less-obvious shortcut notation that takes less space: the double colon (`::`).

**Syntax:**
```sql
-- Standard CAST
SELECT CAST(timestamp_column AS varchar(10))
FROM date_time_types;

-- Shortcut notation
SELECT timestamp_column::varchar(10)
FROM date_time_types;
```

**Important:** Use whichever suits you, but be aware that the double colon is a PostgreSQL-only implementation not found in other SQL variants.

## Summary

You're now equipped to better understand the nuances of the data formats you encounter while digging into databases. If you come across monetary values stored as floating-point numbers, you'll be sure to convert them to decimals before performing any math. And you'll know how to use the right kind of text column to keep your database from growing too big.

### Key Concepts Covered

- **Character Types:** `char(n)`, `varchar(n)`, `text`
- **Integer Types:** `smallint`, `integer`, `bigint`
- **Serial Types:** `smallserial`, `serial`, `bigserial` (auto-incrementing)
- **Fixed-Point:** `numeric(precision,scale)`, `decimal(precision,scale)`
- **Floating-Point:** `real`, `double precision`
- **Date/Time Types:** `timestamp`, `date`, `time`, `interval`
- **Type Conversion:** `CAST()` function and `::` shortcut

### Best Practices

1. Use `varchar` with appropriate length for most text columns
2. Use `bigint` as default for integers unless space is critical
3. Use `numeric`/`decimal` for exact decimal calculations (especially money)
4. Avoid floating-point types when exactness matters
5. Always use `timestamp with time zone` for timestamps
6. Use `serial` types for auto-incrementing ID columns
7. Use `CAST()` or `::` to convert between types when needed

## Next Steps

Next, you'll continue with SQL foundations and learn how to import external data into your database.
