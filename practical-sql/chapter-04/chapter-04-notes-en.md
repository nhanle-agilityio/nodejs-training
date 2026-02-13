# Chapter 4: Importing and Exporting Data - Notes & Key Takeaways

## Quick Reference

### Three Steps for Importing
1. Prep source data as delimited text file
2. Create table to store data
3. Write COPY script to perform import

## Delimited Text Files

### Key Concepts
- **Delimited file**: Rows of data, each column separated by a delimiter character
- **CSV**: Comma-Separated Values (most common)
- **Text qualifier**: Character (usually `"`) that wraps values containing delimiters
- **Header row**: Column names at top of file (exclude on import with `HEADER`)

### Common Delimiters
- Comma (`,`)
- Pipe (`|`)
- Tab
- Semicolon (`;`)

### Example
```
FIRSTNAME,LASTNAME,STREET
John,Doe,"123 Main St., Apt 200"
```

## COPY Command - Import

### Basic Syntax
```sql
COPY table_name
FROM 'path/to/file.csv'
WITH (FORMAT CSV, HEADER);
```

### File Path Formats
- **Windows**: `'C:\Users\Name\Desktop\file.csv'`
- **macOS/Linux**: `'/Users/name/Desktop/file.csv'`
- Always use single quotes around path

### Common Options
- `FORMAT CSV` - Comma-separated format
- `FORMAT TEXT` - Tab-delimited (default)
- `FORMAT BINARY` - Binary format (rare)
- `HEADER` - File has header row (exclude on import, include on export)
- `DELIMITER '|'` - Specify delimiter character
- `QUOTE '"'` - Specify text qualifier (default is `"`)

### Import Subset of Columns
```sql
COPY table_name (col1, col2, col3)
FROM 'path/to/file.csv'
WITH (FORMAT CSV, HEADER);
```

### Adding Default Values During Import
Use temporary table pattern:
```sql
CREATE TEMPORARY TABLE temp_table (LIKE main_table);
COPY temp_table (col1, col2) FROM 'file.csv' WITH (FORMAT CSV, HEADER);
INSERT INTO main_table (col1, col2, col3)
SELECT col1, col2, 'default_value' FROM temp_table;
DROP TABLE temp_table;
```

## COPY Command - Export

### Export All Data
```sql
COPY table_name
TO 'path/to/export.txt'
WITH (FORMAT CSV, HEADER, DELIMITER '|');
```

### Export Specific Columns
```sql
COPY table_name (col1, col2, col3)
TO 'path/to/export.txt'
WITH (FORMAT CSV, HEADER);
```

### Export Query Results
```sql
COPY (
    SELECT col1, col2
    FROM table_name
    WHERE condition
)
TO 'path/to/export.txt'
WITH (FORMAT CSV, HEADER);
```

## pgAdmin Import/Export Wizard

### When to Use
- When connected to remote PostgreSQL instance
- When you don't have filesystem access
- For GUI-based import/export

### Steps
1. Right-click table → **Import/Export**
2. Choose Import or Export
3. Select file, format (CSV), options
4. Click **OK**

## Census Data Example

### Table Structure Highlights
```sql
CREATE TABLE us_counties_2010 (
    geo_name varchar(90),              -- County name
    state_us_abbreviation varchar(2),   -- State code
    summary_level varchar(3),          -- Geography code (preserves leading zeros)
    area_land bigint,                  -- Square meters (very large values)
    area_water bigint,
    internal_point_lat numeric(10,7),  -- Latitude (7 decimal places)
    internal_point_lon numeric(10,7),  -- Longitude
    p0010001 integer,                  -- Total population
    -- ... many more columns
);
```

### Key Design Decisions
- Use `varchar` for codes to preserve leading zeros (e.g., "050" not "50")
- Use `bigint` for very large area values (Alaska counties)
- Use `numeric(10,7)` for coordinates (precision matters)

### Import Census Data
```sql
COPY us_counties_2010
FROM 'C:\YourDirectory\us_counties_2010.csv'
WITH (FORMAT CSV, HEADER);
```

**Success**: `Query returned successfully: 3143 rows affected`

## Key Takeaways

### Best Practices
1. ✅ Always check for data dictionaries when available
2. ✅ Use appropriate data types based on data dictionary
3. ✅ Preserve leading zeros with `varchar` for codes
4. ✅ Use `bigint` for very large numbers
5. ✅ Verify imports: check row counts and sample data
6. ✅ Use temporary tables for complex transformations
7. ✅ Specify columns explicitly for subset imports
8. ✅ Use `HEADER` to exclude header rows on import
9. ✅ Use `HEADER` to include header rows on export
10. ✅ Choose file extensions based on delimiter used

### Common Errors
- **"extra data after last expected column"**: CSV has more columns than table
- **"missing data for column"**: CSV missing required columns (specify column list)
- **Permission errors**: Check file path and permissions

### Data Type Selection Guide
- **Codes with leading zeros**: `varchar` (e.g., "050", "001")
- **Very large numbers**: `bigint` (e.g., area in square meters)
- **Precise decimals**: `numeric(precision, scale)` (e.g., coordinates)
- **Regular integers**: `integer` (e.g., population counts)

### Temporary Tables
- Exist only for current session
- Automatically deleted on disconnect
- Useful for multi-step import transformations
- Created with `CREATE TEMPORARY TABLE` or `CREATE TEMP TABLE`

## Quick Syntax Cheat Sheet

### Import
```sql
COPY table FROM 'file' WITH (FORMAT CSV, HEADER);
COPY table (cols) FROM 'file' WITH (FORMAT CSV, HEADER);
```

### Export
```sql
COPY table TO 'file' WITH (FORMAT CSV, HEADER);
COPY table (cols) TO 'file' WITH (FORMAT CSV, HEADER);
COPY (SELECT ...) TO 'file' WITH (FORMAT CSV, HEADER);
```

### Options
- `FORMAT CSV|TEXT|BINARY`
- `HEADER` or `HEADER ON`
- `DELIMITER 'char'`
- `QUOTE 'char'`

## Memory Tips

- **COPY FROM** = Import (data comes FROM file)
- **COPY TO** = Export (data goes TO file)
- **HEADER** = Exclude on import, include on export
- **Temporary tables** = Session-only, use for transformations
- **varchar for codes** = Preserves leading zeros
- **bigint for areas** = Handles very large values
- **numeric(10,7)** = 10 total digits, 7 after decimal
