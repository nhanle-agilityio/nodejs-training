# Chapter 7: Table Design That Works for You - Notes & Key Takeaways

## Quick Reference

### Naming Conventions

**Snake Case** (Recommended)
- Format: `berry_smoothie`, `us_counties_2010`
- All lowercase, words separated by underscores
- Used throughout PostgreSQL documentation
- Example: `video_on_demand` vs `videoondemand`

**Camel Case**
- Format: `berrySmoothie`
- First word lowercase, subsequent words capitalized

**Pascal Case**
- Format: `BerrySmoothie`
- First letter of first word also capitalized
- Microsoft recommends for SQL Server

### Naming Guidelines

1. **Use snake case** - Readable and reliable
2. **Make names understandable** - `arrival_time` not `arv_tm`
3. **Use plurals for tables** - `teachers`, `vehicles`, `departments`
4. **Mind the length** - SQL: 128 chars, PostgreSQL: 63 chars, Oracle: 30 chars
5. **Date suffixes for copies** - `tire_sizes_2017_10_20`

### Quoted Identifiers

- PostgreSQL treats identifiers as **case-insensitive** unless quoted
- `customers` and `Customers` are the same without quotes
- Use quotes to preserve case: `CREATE TABLE "Customers"`
- **Pitfalls:**
  - Requires quotes on every reference
  - Allows spaces and reserved keywords (not recommended)

## Constraints Overview

| Constraint | Purpose | NULL Allowed? |
|------------|---------|---------------|
| PRIMARY KEY | Unique identifier for each row | No |
| FOREIGN KEY | References another table's primary key | Yes |
| CHECK | Validates data against criteria | Yes |
| UNIQUE | Ensures unique values | Yes (multiple NULLs) |
| NOT NULL | Prevents empty values | No |

## Primary Keys

### Natural Keys vs Surrogate Keys

**Natural Key**
- Uses existing column(s) from the table
- Examples: driver's license ID, part number, ISBN
- Pros: Data already exists, meaningful, reduces joins
- Cons: More storage, less flexible

**Surrogate Key**
- Artificial values (usually auto-incrementing integers)
- Examples: `bigserial`, UUID
- Pros: Flexible, independent of data, less storage
- Cons: No inherent meaning

**Recommendation:** Use `bigserial` (not `serial`) to avoid overflow

### Primary Key Syntax

**Column Constraint:**
```sql
CREATE TABLE example (
    id varchar(10) CONSTRAINT id_key PRIMARY KEY,
    name varchar(50)
);
-- Or simpler:
CREATE TABLE example (
    id varchar(10) PRIMARY KEY,
    name varchar(50)
);
```

**Table Constraint:**
```sql
CREATE TABLE example (
    id varchar(10),
    name varchar(50),
    CONSTRAINT id_key PRIMARY KEY (id)
);
```

**Composite Primary Key:**
```sql
CREATE TABLE attendance (
    student_id varchar(10),
    school_day date,
    present boolean,
    CONSTRAINT student_key PRIMARY KEY (student_id, school_day)
);
```

### Primary Key Rules

1. Each column in key must have unique value per row
2. No column in key can have missing values (NULL)
3. Violation error: `duplicate key value violates unique constraint`

## Foreign Keys

### Basic Syntax

```sql
CREATE TABLE registrations (
    registration_id varchar(10),
    license_id varchar(10) REFERENCES licenses (license_id),
    CONSTRAINT reg_key PRIMARY KEY (registration_id)
);
```

### ON DELETE CASCADE

```sql
CREATE TABLE registrations (
    registration_id varchar(10),
    license_id varchar(10) REFERENCES licenses (license_id) ON DELETE CASCADE
);
```

**Effect:** Deleting a row in `licenses` automatically deletes related rows in `registrations`

### Foreign Key Rules

- Values must exist in referenced table's primary key
- Insert order matters: referenced table first
- Delete order matters: dependent table first (unless CASCADE)

## CHECK Constraint

### Syntax

**Column Constraint:**
```sql
CREATE TABLE example (
    salary integer CHECK (salary > 0)
);
```

**Table Constraint:**
```sql
CREATE TABLE example (
    user_role varchar(50),
    salary integer,
    CONSTRAINT check_role CHECK (user_role IN('Admin', 'Staff')),
    CONSTRAINT check_salary CHECK (salary > 0)
);
```

### Examples

**Single condition:**
```sql
CONSTRAINT check_salary CHECK (salary > 0)
```

**Multiple conditions:**
```sql
CONSTRAINT grad_check CHECK (credits >= 120 AND tuition = 'Paid')
```

**Cross-column check:**
```sql
CONSTRAINT sale_check CHECK (sale_price < retail_price)
```

## UNIQUE Constraint

### Syntax

```sql
CREATE TABLE contacts (
    contact_id bigserial PRIMARY KEY,
    email varchar(200),
    CONSTRAINT email_unique UNIQUE (email)
);
```

### Key Points

- Similar to PRIMARY KEY but allows NULL values
- Multiple NULL values allowed
- Error: `duplicate key value violates unique constraint`

## NOT NULL Constraint

### Syntax

```sql
CREATE TABLE students (
    student_id bigserial,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    CONSTRAINT student_key PRIMARY KEY (student_id)
);
```

### Key Points

- Prevents empty values in column
- Required for primary keys
- Use for essential columns (names, IDs, etc.)

## Modifying Constraints

### Removing Constraints

```sql
-- Primary key, foreign key, or UNIQUE
ALTER TABLE table_name DROP CONSTRAINT constraint_name;

-- NOT NULL
ALTER TABLE table_name ALTER COLUMN column_name DROP NOT NULL;
```

### Adding Constraints

```sql
-- Primary key
ALTER TABLE table_name ADD CONSTRAINT constraint_name PRIMARY KEY (column_name);

-- Foreign key
ALTER TABLE table_name ADD CONSTRAINT constraint_name 
    FOREIGN KEY (column_name) REFERENCES other_table (other_column);

-- UNIQUE
ALTER TABLE table_name ADD CONSTRAINT constraint_name UNIQUE (column_name);

-- NOT NULL
ALTER TABLE table_name ALTER COLUMN column_name SET NOT NULL;
```

**Important:** Can only add constraint if existing data obeys the constraint rules

## Indexes

### B-Tree Index (PostgreSQL Default)

- Created automatically on PRIMARY KEY and UNIQUE columns
- Useful for equality and range operators: `<`, `<=`, `=`, `>=`, `>`, `BETWEEN`
- Stored separately from table data
- Updated automatically on INSERT/UPDATE/DELETE

### Creating an Index

```sql
CREATE INDEX index_name ON table_name (column_name);
```

**Example:**
```sql
CREATE INDEX street_idx ON new_york_addresses (street);
```

### Removing an Index

```sql
DROP INDEX index_name;
```

### Benchmarking with EXPLAIN ANALYZE

**Before index:**
```sql
EXPLAIN ANALYZE SELECT * FROM new_york_addresses WHERE street = 'BROADWAY';
-- Shows: Seq Scan (sequential scan)
-- Execution time: ~290 ms
```

**After index:**
```sql
CREATE INDEX street_idx ON new_york_addresses (street);
EXPLAIN ANALYZE SELECT * FROM new_york_addresses WHERE street = 'BROADWAY';
-- Shows: Bitmap Index Scan on street_idx
-- Execution time: ~6 ms
```

**Performance improvement:** ~48x faster (290ms → 6ms)

### When to Use Indexes

1. **Columns used in JOINs** - Foreign keys (primary keys already indexed)
2. **Columns in WHERE clauses** - Frequently searched columns
3. **Consult documentation** - Learn about index types for your data types
4. **Test with EXPLAIN ANALYZE** - Measure before and after

### Index Trade-offs

**Benefits:**
- Significantly faster queries
- Automatic maintenance

**Costs:**
- Increases database size
- Slows down INSERT/UPDATE/DELETE (index must be updated)
- Not always needed

## Key Takeaways

### Best Practices

1. ✅ Use snake case consistently
2. ✅ Make names clear and avoid abbreviations
3. ✅ Use plural names for tables
4. ✅ Use `bigserial` for surrogate keys (not `serial`)
5. ✅ Add foreign key constraints for referential integrity
6. ✅ Use CHECK constraints to validate data
7. ✅ Index columns used in JOINs and WHERE clauses
8. ✅ Test index performance with EXPLAIN ANALYZE

### Decision Matrix

**Natural Key vs Surrogate Key:**
- Natural: When unique column(s) exist and have meaning
- Surrogate: When no suitable natural key exists

**When to Add Index:**
- Columns in JOINs (especially foreign keys)
- Columns frequently in WHERE clauses
- After measuring with EXPLAIN ANALYZE

**Constraint Selection:**
- PRIMARY KEY: Unique identifier (required)
- FOREIGN KEY: References other table
- CHECK: Validate against criteria
- UNIQUE: Unique values but allow NULLs
- NOT NULL: Required columns

## Common Patterns

### Complete Table Example

```sql
CREATE TABLE employees (
    employee_id bigserial,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(200),
    department_id integer,
    salary integer,
    CONSTRAINT employee_key PRIMARY KEY (employee_id),
    CONSTRAINT email_unique UNIQUE (email),
    CONSTRAINT check_salary CHECK (salary > 0),
    CONSTRAINT dept_fkey FOREIGN KEY (department_id) 
        REFERENCES departments (dept_id) ON DELETE CASCADE
);

CREATE INDEX dept_idx ON employees (department_id);
```

### Error Messages

- Primary key violation: `duplicate key value violates unique constraint`
- Foreign key violation: `insert or update violates foreign key constraint`
- CHECK violation: `new row violates check constraint`
- UNIQUE violation: `duplicate key value violates unique constraint`
- NOT NULL violation: `null value in column violates not-null constraint`

## Quick Checklist

When designing a table:

- [ ] Choose naming convention (snake case recommended)
- [ ] Identify primary key (natural or surrogate)
- [ ] Add foreign keys for relationships
- [ ] Add CHECK constraints for validation
- [ ] Add UNIQUE constraints where needed
- [ ] Mark required columns as NOT NULL
- [ ] Create indexes on foreign keys and frequently searched columns
- [ ] Test with EXPLAIN ANALYZE
