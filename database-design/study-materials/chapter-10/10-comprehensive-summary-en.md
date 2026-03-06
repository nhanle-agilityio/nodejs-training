# Chapter 10: Table Relationships — Comprehensive Summary

*Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*

---

## Overview

Chapter 10 covers **identifying and establishing table relationships**. Relationships connect related tables, minimize redundant data, enable multitable views, and ensure **relationship-level integrity**. Three types: **one-to-one (1:1)**, **one-to-many (1:N)**, and **many-to-many (M:N)**. Self-referencing relationships exist within a single table. Many-to-many is resolved with a **linking table**.

---

## 1. Why Relationships Are Important

- **Establish connection** between logically related tables
- **Refine structures** and minimize redundant data
- **Enable drawing data** from multiple tables (views)
- **Ensure relationship-level integrity** (reliable connections; proper insert/update/delete)

---

## 2. Types of Relationships

### One-to-One (1:1)

A record in Table A relates to **only one** record in Table B, and vice versa. Often involves subset table (e.g., EMPLOYEES ↔ COMPENSATION).

**Establish:** Copy parent's primary key into child table as foreign key. In subset tables, both tables share the same primary key.

### One-to-Many (1:N)

A record in Table A can relate to **one or more** records in Table B; a record in Table B relates to **only one** record in Table A. Most common relationship.

**Establish:** Copy primary key from "one" side into "many" side as foreign key.

### Many-to-Many (M:N)

A record in Table A can relate to **one or more** in Table B, and vice versa. Requires resolution.

**Problems if not resolved:** Redundant data, duplicate data, difficult retrieval, difficult insert/update/delete.

**Bad approaches:** Flattened multivalued fields (STUDENT ID 1, 2, 3 in CLASSES); adding multiple FK + descriptive fields to one table.

**Correct approach:** Create a **linking table**.

---

## 3. Linking Table (for M:N)

**Three-step procedure:**

1. **Define** linking table using copies of primary keys from both tables → these form composite primary key; each is a foreign key.
2. **Name** the table to represent the relationship (e.g., STUDENT CLASSES, PILOT CERTIFICATIONS).
3. **Add** to final table list (Table Type = Linking).

**Result:** M:N dissolved into two 1:N relationships (e.g., STUDENTS ↔ STUDENT CLASSES ↔ CLASSES).

**Adding fields to linking table:** When fields like QUOTE PRICE, QUANTITY ORDERED relate to the combination (order + product), move them from ORDERS to ORDER DETAILS (linking table). Remove redundant fields from parent tables.

---

## 4. Self-Referencing Relationships

Relationship between records **within the same table**. Can be 1:1, 1:N, or M:N.

- **1:1** — e.g., MEMBER sponsors one other MEMBER (SPONSOR ID)
- **1:N** — e.g., STAFF member manages multiple STAFF (MANAGER ID)
- **M:N** — e.g., PART comprises PARTS; part is component of other parts → use linking table (e.g., PART COMPONENTS)

**Establish 1:1 and 1:N:** Add foreign key in same table referencing its own primary key. Names often differ (e.g., MANAGER ID vs STAFF ID) for clarity.

**Consider:** Self-referencing may indicate need for new tables (e.g., STAFF ↔ MANAGER could become DEPARTMENTS table).

---

## 5. Identifying Existing Relationships

### Table Matrix

Create matrix: tables across top and down left side (same order). For each pair, determine relationship from each perspective.

### Question Types

1. **Associative:** *Can a single record in (Table A) be associated with one or more records in (Table B)?*
2. **Contextual:**
   - Ownership: *Can a single order contain one or more products?*
   - Action: *Does a single instructor teach one or more classes?*

For self-referencing: *Can a single staff member be associated with one or more other staff members?*

### Formulas (perspective A + perspective B)

| A | B | Official |
|---|---|----------|
| 1:1 | 1:1 | 1:1 |
| 1:N | 1:1 | 1:N |
| 1:N | 1:N | M:N |

---

## 6. Establishing Each Relationship

| Type | Method |
|------|--------|
| **1:1** | Copy parent PK into child as FK (often FK = child PK in subset) |
| **1:N** | Copy parent PK into child as FK |
| **M:N** | Create linking table with both PKs as composite PK + FKs |

**Diagram:** PK at start of line, FK at end. Crow's foot on "many" side.

---

## 7. Elements of a Foreign Key

1. **Same name** as parent primary key (exception: self-referencing for clarity)
2. **Replica** of parent's field specifications (with adjustments)
3. **Draws values** exclusively from parent primary key

### Field Specification Modifications for FK

**General:** Specification Type = Replica; Parent Table = FK's table; Source Specification = parent PK name; Description = FK's purpose.

**Logical:** Key Type = Foreign; Uniqueness = Non-unique (1:N) or Unique (1:1); Values Entered By = User; Range of Values = existing PK values; Edit Rule = Enter Now, Edits Allowed.

---

## 8. Relationship Characteristics

### Deletion Rule

What happens to child records when parent record is deleted?

| Rule | Action |
|------|--------|
| **Deny** | Don't delete; mark inactive |
| **Restrict** | Don't delete if related child records exist |
| **Cascade** | Delete parent + all related child records |
| **Nullify** | Delete parent; set FK to Null in child |
| **Set Default** | Delete parent; set FK to default in child |

*Default: Restrict.*

### Type of Participation

- **Mandatory** — At least one record must exist before entering in related table (vertical line)
- **Optional** — No requirement (circle)

### Degree of Participation

(min, max) — e.g., (0,15) = 0 to 15 related records. Use "N" for unlimited.

---

## 9. Relationship-Level Integrity

A relationship attains this when:

- Connection is sound (PK/FK or linking table)
- Insert is meaningful (type of participation)
- Delete produces no adverse effects (deletion rule)
- Meaningful limit on interrelated records (degree of participation)

---

## 10. Example: Mike's Bikes

- CUSTOMERS ↔ INVOICES: 1:N
- EMPLOYEES ↔ INVOICES: 1:N
- VENDORS ↔ PRODUCTS: 1:N
- INVOICES ↔ PRODUCTS: M:N → INVOICE PRODUCTS (linking table)

Refine foreign keys; set deletion rules, participation type, degree. Verify with Mike.

---

## Review Questions (Self-Check)

1. State two major reasons why a relationship is important.
2. Name the three types of relationships.
3. Which relationship poses the most problems?
4. State two problems with a many-to-many relationship.
5. What is a self-referencing relationship?
6. How do you begin identifying relationships?
7. What are the two types of questions for identifying relationships?
8. What symbol designates 1:N in the matrix?
9. How do you determine the official relationship between a pair?
10. How do you establish a 1:N relationship?
11. True or False: Retrieving from self-referencing tables can be tedious.
12. How do you establish self-referencing M:N?
13. How do you refine foreign keys?
14. Which element categories do you modify for FK specs?
15. What does a deletion rule determine?
16. Name the two types of participation.
17. What does degree of participation indicate?
18. When does a relationship attain relationship-level integrity?

### Answers

1. Establishes connection; minimizes redundancy; enables multitable data retrieval; ensures relationship-level integrity.
2. One-to-one, one-to-many, many-to-many.
3. Many-to-many.
4. Redundant/duplicate data; difficult insert/update/delete.
5. Relationship between records within the same table.
6. Create table matrix.
7. Associative and contextual.
8. 1:N.
9. Formula: 1:1+1:1=1:1; 1:N+1:1=1:N; 1:N+1:N=M:N.
10. Copy PK from "one" side into "many" side as FK.
11. **True.**
12. Create linking table with fields from same parent table.
13. Comply with Elements of a Foreign Key.
14. General and Logical.
15. What RDBMS does with child records when parent is deleted.
16. Mandatory and Optional.
17. Min/max number of related records.
18. When properly established and characteristics appropriately set.

---

*Proceed to Chapter 11: Business Rules*
