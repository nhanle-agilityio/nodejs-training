# Chapter 1: Try It Yourself — Exercises & Solutions

## Exercise 1

**Task:** Imagine you're building a database to catalog all the animals at your local zoo. You want one table to track the kinds of animals in the collection and another table to track the specifics on each animal. Write CREATE TABLE statements for each table that include some of the columns you need. Why did you include the columns you chose?

### Suggested Solution

```sql
CREATE TABLE animal_types (
    type_id bigserial,
    type_name varchar(100) NOT NULL,
    CONSTRAINT type_key PRIMARY KEY (type_id)
);

CREATE TABLE animals (
    animal_id bigserial,
    animal_name varchar(100) NOT NULL,
    type_id bigint REFERENCES animal_types (type_id),
    birth_date date,
    acquired_date date,
    CONSTRAINT animal_key PRIMARY KEY (animal_id)
);
```

**Why these columns?**
- `animal_types`: Separates species/type from individual animals to avoid duplication.
- `animals`: Links to type via `type_id` (foreign key); tracks individual identity and important dates.

---

## Exercise 2

**Task:** Now create INSERT statements to load sample data into the tables. How can you view the data via the pgAdmin tool? Create an additional INSERT statement for one of your tables. Purposely omit one of the required commas separating the entries in the VALUES clause of the query. What is the error message? Would it help you find the error in the code?

### Suggested Solution

```sql
-- Insert animal types
INSERT INTO animal_types (type_name)
VALUES ('Mammal'), ('Bird'), ('Reptile');

-- Insert animals
INSERT INTO animals (animal_name, type_id, birth_date, acquired_date)
VALUES
    ('Leo', 1, '2018-05-15', '2019-01-10'),
    ('Polly', 2, '2020-03-22', '2020-06-01');

-- View data in pgAdmin: Right-click table → View/Edit Data → All Rows
-- Or use: SELECT * FROM animal_types; SELECT * FROM animals;
```

**Intentional error (missing comma):**
```sql
INSERT INTO animal_types (type_name)
VALUES ('Fish') ('Amphibian');  -- Missing comma between values
```

**Typical error:** `ERROR: syntax error at or near "("` — helps you locate where the parser failed (around the second value).
