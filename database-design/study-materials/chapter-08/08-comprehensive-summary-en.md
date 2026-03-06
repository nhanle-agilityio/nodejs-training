# Chapter 8: Keys — Comprehensive Summary

*Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*

---

## Overview

Chapter 8 covers **establishing keys** for each table. Keys ensure unique record identification, enforce integrity, and establish table relationships. Four main types: **candidate**, **primary**, **foreign**, and **non-keys**. Foreign keys are assigned later (Chapter 10). Each table must have at least one candidate key; one is selected as the primary key.

---

## 1. Why Keys Are Important

Keys are crucial for three reasons:

1. **Ensure each record is precisely identified** — A table represents a collection of similar objects or events; each record is a unique instance. A key allows you to identify each instance.
2. **Establish and enforce integrity** — Keys are major components of table-level and relationship-level integrity (unique records, matching values for relationships).
3. **Establish table relationships** — Keys link tables (covered in Chapter 10).

---

## 2. Establishing Keys for Each Table

### Candidate Keys

A **candidate key** is a field or set of fields that **uniquely identifies a single record** of the table's subject. Each table must have at least one candidate key. You eventually choose one candidate key to become the primary key.

Before designating a field as a candidate key, it must comply with all **Elements of a Candidate Key**:

| # | Element |
|---|---------|
| 1 | Cannot be a **multipart field** |
| 2 | Must contain **unique values** |
| 3 | Cannot contain **Nulls** |
| 4 | Value cannot breach **security or privacy rules** (e.g., SSN, passwords) |
| 5 | Value is **not optional** in whole or in part |
| 6 | Comprises **minimum number of fields** to define uniqueness |
| 7 | Values must **uniquely and exclusively identify** each record |
| 8 | Value must **exclusively identify** the value of each field within the record |
| 9 | Value can be modified **only in rare or extreme cases** |

**Marking:** Write "CK" next to candidate key fields. Composite candidate key = "CCK" (or CCK1, CCK2 if multiple).

**Example — EMPLOYEES table:**
- EMPLOYEE ID ✓ (eligible)
- SOCIAL SECURITY NUMBER ✗ (can be null; privacy; **avoid using SSN as key**)
- EMPLAST NAME ✗ (duplicate values)
- EMPFIRST NAME + EMPLAST NAME ✓ (composite candidate key—with caveats)
- EMPZIPCODE ✗ (duplicate values)
- EMPHOME PHONE ✗ (duplicate values, subject to change, can be null)

### Artificial Candidate Keys

When a table has **no candidate key**, create an **artificial (surrogate) candidate key**: a new field conforming to all Elements, added to the table.

**Use when:**
1. No field or combination qualifies as a candidate key (e.g., PARTS table — PART NUMBER added).
2. A new single-field key would be stronger than an existing composite (e.g., EMPLOYEE ID instead of EMPFIRST NAME + EMPLAST NAME).

**Note:** ID fields (EMPLOYEE ID, VENDOR ID, DEPARTMENT ID) are commonly used as artificial candidate keys. They always conform, make great primary keys, and simplify relationship establishment.

### Primary Keys

The **primary key** is the most important key. It must conform to the same elements as a candidate key. You **select** it from the pool of candidate keys.

**Elements of a Primary Key** — Same as Elements of a Candidate Key (9 elements).

**Selection guidelines:**
1. Prefer **simple (single-field)** over composite candidate key.
2. Prefer candidate key that **incorporates part of the table name** (e.g., SALES INVOICE NUMBER for SALES INVOICES).

**Critical test before finalizing:** The primary key must **exclusively identify the value of each field** in every record. If it does not identify a field's value, **remove that field** from the table (add to another table or discard).

**Test procedure:**
1. Load table with sample data.
2. Select a record; note primary key value.
3. For each field, ask: *Does this primary key value exclusively identify the current value of \<fieldname\>?*
   - Yes → move to next field.
   - No → **remove the field**; move to next.
4. Repeat until all fields examined.

**Marking:** Replace "CK" with "PK". Composite primary key = "CPK".

**Rules:**
1. Each table has **one and only one** primary key.
2. Each primary key in the database must be **unique** — no two tables share the same primary key (exception: one-to-one relationship or subset table).

### Alternate Keys

**Alternate keys** = remaining candidate keys after the primary key is selected. Mark with "AK" or "CAK" (composite alternate key). Provide alternative means of uniquely identifying a record in the RDBMS. Not used in the design process; useful at implementation.

### Non-keys

A **non-key** is any field that is not a candidate, primary, alternate, or foreign key. It represents a characteristic of the subject; its value is determined by the primary key. No special marking.

---

## 3. Table-Level Integrity

Table-level integrity ensures:

- No **duplicate records**
- Primary key **exclusively identifies** each record
- Every primary key value is **unique**
- Primary key values are **not null**

Established by defining a primary key that complies with the Elements of a Primary Key.

---

## 4. Reviewing the Initial Table Structures

Conduct interviews with users and management to review:

1. **Appropriate subjects** — Ensure no important subject is missing.
2. **Table names and descriptions** — Suitable and meaningful; clarify if confusing.
3. **Field names** — Suitable and meaningful; explain renames for new DB standards; mention RDBMS can display different label.
4. **Fields assigned** — Verify all necessary characteristics are in place; add any overlooked fields.

---

## 5. Example: Mike's Bikes

- **CUSTOMERS:** No candidate key (STATUS, CUSTHOME PHONE, CUSTFIRST + CUSTLAST all ineligible). Create artificial key **CUSTOMER ID**.
- **EMPLOYEES:** Two candidate keys — EMPLOYEE NUMBER, EMPFIRST NAME + EMPLAST NAME. Choose **EMPLOYEE NUMBER** as primary key (employees use numbers). Test that it exclusively identifies each field value.
- **PRODUCTS, VENDORS:** Establish primary keys.
- **SERVICES (subset table):** Must share the **same primary key** as PRODUCTS — use **PRODUCT NUMBER**. Subset tables inherit the data table's primary key.
- **Interview:** Add CALL PRIORITY to VENDORS per Mike's request.

---

## Review Questions (Self-Check)

1. State three reasons why keys are important.
2. What are the four main types of keys?
3. What is the purpose of a candidate key?
4. State four items of the Elements of a Candidate Key.
5. True or False: A candidate key can be composed of more than one field.
6. Can a table have more than one candidate key?
7. What is an artificial candidate key?
8. What is the most important key you assign to a table?
9. Why is this key important?
10. How do you establish a primary key?
11. State four items of the Elements of a Primary Key.
12. What must you do before you finalize your selection of a primary key?
13. What is an alternate key?
14. What do you ensure by establishing table-level integrity?
15. Why should you review the initial table structures?

### Answers

1. (1) Ensure each record is precisely identified; (2) Establish and enforce integrity; (3) Establish table relationships.
2. Candidate, primary, foreign, non-key.
3. Uniquely identify each record in the table.
4. Any four of: not multipart; unique values; no Nulls; no security/privacy breach; value not optional; minimum number of fields; uniquely identifies each record; exclusively identifies each field; modified only in rare cases.
5. **True.**
6. **Yes.**
7. A field (or set) you create when no natural candidate key exists—conforms to all Elements.
8. Primary key.
9. Uniquely identifies each record; main component of table-level integrity.
10. Select from candidate keys; modify field specs if needed; mark in diagram.
11. Same as Elements of Candidate Key.
12. Test that PK exclusively identifies each field value; remove fields it doesn't identify.
13. A candidate key not selected as primary key.
14. Each record uniquely identified; no duplicate records; each PK conforms to Elements.
15. Verify structure before establishing relationships.

---

## Learning Outcomes Alignment

After studying this chapter, you should be able to:

- **Identify** candidate keys using the Elements of a Candidate Key
- **Create** artificial candidate keys when necessary
- **Select** primary keys from candidate keys
- **Test** that primary key exclusively identifies each field value
- **Establish** table-level integrity
- **Review** initial table structures with users and management

*Proceed to Chapter 9: Field Specifications*
