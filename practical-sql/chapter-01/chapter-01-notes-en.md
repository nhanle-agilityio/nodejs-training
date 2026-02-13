# Chapter 1: Creating Your First Database and Table - Notes & Key Takeaways

## Quick Reference

### Core Concepts
- **Table**: Grid of rows and columns storing data
- **Database**: Collection of objects (tables, functions, user roles)
- **Column**: Field/attribute containing data of a specified type
- **Row**: Single record in a table
- **Data Type**: Defines what kind of data a column can hold

### Key SQL Statements

#### CREATE DATABASE
```sql
CREATE DATABASE database_name;
```
- Creates a new database
- Always end with semicolon (`;`)
- Use descriptive names (lowercase_with_underscores)

#### CREATE TABLE
```sql
CREATE TABLE table_name (
    column_name data_type,
    column_name data_type
);
```
- Defines table structure with columns and data types
- Each column on new line (indented) for readability
- Close with parenthesis and semicolon

#### INSERT INTO
```sql
INSERT INTO table_name (column1, column2, column3)
VALUES ('value1', 'value2', value3),
       ('value4', 'value5', value6);
```
- Adds data rows to table
- Text and dates: use single quotes `'text'` or `'2021-10-30'`
- Numbers: no quotes needed `36200`
- Order of values must match column order
- Multiple rows separated by commas

## Data Types Covered

| Data Type | Description | Example |
|-----------|-------------|---------|
| `bigserial` | Auto-incrementing integer | 1, 2, 3... |
| `varchar(n)` | Variable-length text (max n chars) | `varchar(50)` |
| `date` | Date value | `'2011-10-30'` |
| `numeric` | Decimal numbers | `36200.50` |

## Important Rules

### Quoting Rules
- ✅ **Quote**: Text (`'Janet'`), Dates (`'2011-10-30'`)
- ❌ **Don't Quote**: Numbers (`36200`, `43500.50`)

### Date Format
- Use international standard: `YYYY-MM-DD`
- Example: `'2011-10-30'` (October 30, 2011)
- Prevents confusion across regions

### Syntax Rules
- Always end statements with semicolon (`;`)
- Commas separate column names and values
- Parentheses group column definitions and row values

## pgAdmin Workflow

### Creating Database
1. Connect to PostgreSQL server
2. Select `postgres` database
3. Open Query Tool (Tools → Query Tool)
4. Execute `CREATE DATABASE name;`
5. Refresh Databases to see new database

### Creating Table
1. Connect to target database (click database name)
2. Open Query Tool
3. Execute `CREATE TABLE` statement
4. Refresh Schemas → public → Tables to see new table

### Inserting Data
1. Ensure connected to correct database
2. Open Query Tool
3. Execute `INSERT INTO` statement
4. Check output: "Query returned successfully: X rows affected"

### Viewing Data
- Right-click table → View/Edit Data → All Rows
- Or use SQL `SELECT` (covered in Chapter 2)

## Common Errors & Solutions

### Syntax Error
```
ERROR: syntax error at or near "("
```
- **Cause**: Missing comma, quote, or parenthesis
- **Solution**: Check line number mentioned in error, verify syntax

### Forgot Semicolon
- **Symptom**: Query doesn't execute or unexpected behavior
- **Solution**: Always end statements with `;`

### Wrong Quotes
- **Error**: Using double quotes for text values
- **Solution**: Use single quotes `'text'` not `"text"`

### Date Format Error
- **Error**: Invalid date format
- **Solution**: Use `YYYY-MM-DD` format: `'2011-10-30'`

## SQL Formatting Best Practices

### Keywords
- Uppercase SQL keywords: `CREATE`, `TABLE`, `INSERT`, `INTO`, `VALUES`
- Lowercase data types: `varchar`, `bigserial`, `numeric`, `date`

### Naming
- Use `lowercase_and_underscores` for table/column names
- Avoid camelCase: ❌ `firstName` ✅ `first_name`
- Be descriptive: `teachers` not `t1`

### Indentation
- Indent clauses (2 or 4 spaces)
- Each column on new line in CREATE TABLE
- Align VALUES for readability

## Example: Complete Table Creation

```sql
-- Step 1: Create database
CREATE DATABASE analysis;

-- Step 2: Connect to database (in pgAdmin, click database name)

-- Step 3: Create table
CREATE TABLE teachers (
    id bigserial,
    first_name varchar(25),
    last_name varchar(50),
    school varchar(50),
    hire_date date,
    salary numeric
);

-- Step 4: Insert data
INSERT INTO teachers (first_name, last_name, school, hire_date, salary)
VALUES ('Janet', 'Smith', 'F.D. Roosevelt HS', '2011-10-30', 36200),
       ('Lee', 'Reynolds', 'F.D. Roosevelt HS', '1993-05-22', 65000),
       ('Samuel', 'Cole', 'Myers Middle School', '2005-08-01', 43500),
       ('Samantha', 'Bush', 'Myers Middle School', '2011-10-30', 36200),
       ('Betty', 'Diaz', 'Myers Middle School', '2005-08-30', 43500),
       ('Kathleen', 'Roush', 'F.D. Roosevelt HS', '2010-10-22', 38500);
```

## Key Takeaways

### Database Design
- ✅ Create separate database per project
- ✅ Organize related tables together
- ✅ Use meaningful names

### Table Structure
- ✅ Define columns with appropriate data types
- ✅ Use auto-incrementing IDs (`bigserial`) for unique identifiers
- ✅ Set reasonable length limits for text columns

### Data Insertion
- ✅ Match value order to column order
- ✅ Quote text and dates, not numbers
- ✅ Use standard date format (`YYYY-MM-DD`)
- ✅ Let auto-increment handle ID columns

### Best Practices
- ✅ Always use semicolons
- ✅ Format code for readability
- ✅ Use descriptive names
- ✅ Follow naming conventions (`lowercase_and_underscores`)

## Memory Aids

### CREATE Statement Pattern
```
CREATE [OBJECT_TYPE] [object_name] (
    [definitions]
);
```

### INSERT Pattern
```
INSERT INTO [table] ([columns])
VALUES ([values]),
       ([values]);
```

### Data Type Quick Reference
- **Text**: `varchar(n)` - variable length text
- **Numbers**: `numeric` - decimals, `integer` - whole numbers
- **Auto-ID**: `bigserial` - auto-incrementing
- **Dates**: `date` - date values

### Quote Checklist
- Text? → Single quotes `'text'`
- Date? → Single quotes `'2021-10-30'`
- Number? → No quotes `12345`

## Next Steps
- Chapter 2: Learn to query data with `SELECT`
- Practice creating tables with different data types
- Experiment with INSERT statements
- Try creating related tables (students, classes, etc.)
