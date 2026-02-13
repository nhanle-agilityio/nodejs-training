# Chapter 3: Understanding Data Types - Notes & Key Takeaways

## Quick Reference

### Character Types

| Type | Storage | Max Length | Padding | Use Case |
|------|---------|------------|---------|----------|
| `char(n)` | Fixed | n chars | Yes (spaces) | Fixed-length codes (e.g., state codes) |
| `varchar(n)` | Variable | n chars | No | Most text columns (recommended) |
| `text` | Variable | ~1 GB | No | Unlimited length text |

**Performance:** No substantial difference in PostgreSQL

**Best Practice:** Use `varchar(n)` with sufficient length for outliers

### Integer Types

| Type | Storage | Range |
|------|---------|-------|
| `smallint` | 2 bytes | -32,768 to +32,767 |
| `integer` | 4 bytes | -2,147,483,648 to +2,147,483,647 |
| `bigint` | 8 bytes | -9,223,372,036,854,775,808 to +9,223,372,036,854,775,807 |

**Guideline:** Use `bigint` as default unless space is critical

### Serial Types (Auto-Incrementing)

| Type | Storage | Range |
|------|---------|-------|
| `smallserial` | 2 bytes | 1 to 32,767 |
| `serial` | 4 bytes | 1 to 2,147,483,647 |
| `bigserial` | 8 bytes | 1 to 9,223,372,036,854,775,807 |

**Note:** Gaps can occur if rows are deleted or inserts are aborted

### Decimal Types

#### Fixed-Point (Exact)

| Type | Storage | Precision | Scale | Use Case |
|------|---------|-----------|-------|----------|
| `numeric(p,s)` | Variable | Up to 131,072 digits before | Up to 16,383 digits after | Money, exact calculations |
| `decimal(p,s)` | Variable | Same as numeric | Same as numeric | Same as numeric |

**Syntax:** `numeric(precision, scale)`
- **precision** = total digits (left + right of decimal)
- **scale** = digits after decimal point

**Example:** `numeric(5,2)` → 123.45 (3 digits before, 2 after)

#### Floating-Point (Inexact)

| Type | Storage | Precision | Use Case |
|------|---------|-----------|----------|
| `real` | 4 bytes | 6 decimal digits | Scientific calculations |
| `double precision` | 8 bytes | 15 decimal digits | Scientific calculations |

**⚠️ Warning:** Floating-point math can produce errors!
```sql
-- Example: 0.7 * 10000000
-- Fixed: 7000000.00000
-- Float: 6999999.88079071
```

### Date/Time Types

| Type | Storage | Description | Range |
|------|---------|-------------|-------|
| `timestamp` | 8 bytes | Date and time | 4713 BC to 294276 AD |
| `date` | 4 bytes | Date only | 4713 BC to 5874897 AD |
| `time` | 8 bytes | Time only | 00:00:00 to 24:00:00 |
| `interval` | 16 bytes | Time interval | +/- 178M years |

**Best Practice:** Always use `timestamp with time zone` (or `timestamptz`)

### Time Zone Formats

```sql
'2018-12-31 01:00 EST'                    -- Abbreviation
'2018-12-31 01:00 -8'                     -- UTC offset
'2018-12-31 01:00 Australia/Melbourne'   -- Time zone name
now()                                      -- Current time
```

## Type Conversion

### CAST() Function

```sql
-- Standard syntax
CAST(column_name AS target_type)

-- Examples
CAST(timestamp_column AS varchar(10))
CAST(numeric_column AS integer)
CAST(numeric_column AS varchar(6))
```

### Shortcut Notation (PostgreSQL Only)

```sql
-- Double colon syntax
column_name::target_type

-- Examples
timestamp_column::varchar(10)
numeric_column::integer
```

**Note:** `::` is PostgreSQL-specific, not ANSI SQL standard

## Choosing Data Types

### Guidelines

1. **Use integers when possible** - Unless you need decimals
2. **For exact decimals** (money, etc.) → Use `numeric`/`decimal`
3. **For inexact calculations** → Use `real`/`double precision` (only when exactness not important)
4. **Choose big enough type** - Err on the side of bigger unless space is critical

### Decision Tree

```
Need whole numbers?
├─ Yes → Use integer types (smallint/integer/bigint)
│         └─ Need auto-increment? → Use serial types
│
└─ No → Need exact calculations?
         ├─ Yes (money, etc.) → Use numeric/decimal
         └─ No (scientific) → Use real/double precision
```

## Common Patterns

### Character Columns

```sql
-- Most common pattern
first_name varchar(50)
last_name varchar(50)
description text

-- Fixed codes
state_code char(2)        -- US state codes
country_code char(2)      -- ISO country codes
```

### Numeric Columns

```sql
-- IDs (auto-incrementing)
id bigserial

-- Whole numbers
age integer
quantity integer
year smallint

-- Money (exact)
price numeric(10,2)
salary numeric(12,2)

-- Measurements (inexact OK)
temperature real
distance double precision
```

### Date/Time Columns

```sql
-- Always use time zone for timestamps
created_at timestamp with time zone
updated_at timestamptz

-- Date only
birth_date date
hire_date date

-- Time intervals
duration interval
contract_period interval
```

## Key Rules

### Character Types
- ✅ `varchar(n)` - Most flexible, recommended
- ✅ `text` - For unlimited length
- ⚠️ `char(n)` - Only for fixed-length codes

### Integer Types
- ✅ `bigint` - Safe default
- ✅ `integer` - When space matters
- ✅ `smallint` - Only for constrained values (days, years)

### Decimal Types
- ✅ `numeric`/`decimal` - For exact calculations (money)
- ⚠️ `real`/`double precision` - Only when inexactness OK
- ❌ Never use float for money!

### Date/Time Types
- ✅ Always use `timestamp with time zone`
- ✅ Use `interval` for time calculations
- ✅ Use `date` when time not needed

## Memory Aids

### Character Type Selection
```
Fixed length code? → char(2)
Known max length? → varchar(n)
Unlimited? → text
```

### Integer Type Selection
```
Very small range? → smallint
Normal range? → integer
Large numbers? → bigint
Need auto-increment? → serial/bigserial
```

### Decimal Type Selection
```
Need exact? → numeric/decimal
Inexact OK? → real/double precision
```

### Type Conversion
```
CAST(value AS type)  -- Standard
value::type          -- PostgreSQL shortcut
```

## Common Mistakes

### ❌ Using float for money
```sql
price real  -- Wrong! Use numeric instead
```

### ✅ Correct
```sql
price numeric(10,2)  -- Exact calculations
```

### ❌ Forgetting time zone
```sql
created_at timestamp  -- Wrong! Missing time zone
```

### ✅ Correct
```sql
created_at timestamp with time zone
```

### ❌ Using char for variable-length text
```sql
name char(100)  -- Wastes space, use varchar instead
```

### ✅ Correct
```sql
name varchar(100)
```

## Examples

### Table Creation

```sql
CREATE TABLE products (
    id bigserial,
    name varchar(100),
    description text,
    price numeric(10,2),
    quantity integer,
    created_at timestamp with time zone
);
```

### Type Conversion Examples

```sql
-- Convert timestamp to date string
SELECT CAST(created_at AS varchar(10));

-- Convert numeric to integer (rounds)
SELECT CAST(price AS integer);

-- PostgreSQL shortcut
SELECT created_at::varchar(10);
SELECT price::integer;
```

### Interval Calculations

```sql
-- Add 90 days to contract date
SELECT contract_date + interval '90 days';

-- Subtract 1 week
SELECT created_at - interval '1 week';

-- Calculate difference
SELECT created_at - updated_at AS time_diff;
```

## Quick Reference Tables

### Storage Sizes Summary

| Category | Type | Size |
|----------|------|------|
| Character | char(n) | Fixed n |
| Character | varchar(n) | Variable up to n |
| Character | text | Variable unlimited |
| Integer | smallint | 2 bytes |
| Integer | integer | 4 bytes |
| Integer | bigint | 8 bytes |
| Decimal | numeric | Variable |
| Decimal | real | 4 bytes |
| Decimal | double precision | 8 bytes |
| Date/Time | date | 4 bytes |
| Date/Time | timestamp | 8 bytes |
| Date/Time | interval | 16 bytes |

## Key Takeaways

1. ✅ **Character types:** Use `varchar` for most cases, `text` for unlimited
2. ✅ **Integer types:** Use `bigint` as default, `serial` for auto-increment
3. ✅ **Decimal types:** Use `numeric`/`decimal` for exact (money), avoid float
4. ✅ **Date/Time:** Always use `timestamp with time zone`
5. ✅ **Type conversion:** Use `CAST()` or `::` when needed
6. ✅ **Choose appropriate size:** Err on bigger unless space critical
7. ✅ **Avoid floating-point** for money or exact calculations
8. ✅ **Use serial types** for auto-incrementing ID columns

## Next Steps
- Chapter 4: Importing and Exporting Data
- Practice creating tables with different data types
- Experiment with type conversions
- Try interval calculations with dates
