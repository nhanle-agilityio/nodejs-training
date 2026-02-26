# Chapter 8: Keys — Study Notes

*Quick reference for Phase 3 key establishment*

---

## Four Types of Keys

| Type | Purpose | Assigned When |
|------|---------|---------------|
| **Candidate** | Uniquely identifies a record | This chapter |
| **Primary** | Chosen from candidates; main identifier | This chapter |
| **Alternate** | Remaining candidates; alternative ID | This chapter |
| **Foreign** | Links tables in relationships | Chapter 10 |
| **Non-key** | Characteristic field; no key role | — |

---

## Elements of a Candidate Key (9)

1. Not multipart
2. Unique values
3. No Nulls
4. No security/privacy breach (SSN, passwords)
5. Not optional (whole or part)
6. Minimum fields for uniqueness
7. Uniquely identifies each record
8. Exclusively identifies each field value in record
9. Modified only rarely

**Mark:** CK (single) | CCK / CCK1, CCK2 (composite)

---

## Artificial Candidate Key

**When:** No field(s) qualify as candidate key, or new single-field key would be stronger than composite.

**How:** Create new field conforming to all Elements; add to table. Common: EMPLOYEE ID, VENDOR ID, PART NUMBER, etc.

---

## Primary Key Selection

- Choose from **candidate keys**.
- Prefer **simple** over composite.
- Prefer key with **table name** in it (e.g., SALES INVOICE NUMBER for SALES INVOICES).

**Critical test:** Primary key must **exclusively identify** each field value in every record. If not → remove that field.

**Test steps:**
1. Load sample data
2. Pick record; note PK value
3. For each field: *Does PK exclusively identify \<field\>?* Yes → next. No → remove field.
4. Repeat until done

**Mark:** PK (single) | CPK (composite)

**Rules:**
- One and only one PK per table
- Unique PK per table (except 1:1 or subset table)

---

## Alternate Keys

Remaining candidate keys → "AK" or "CAK". Useful in RDBMS for alternative record lookup. Not used in design process.

---

## Table-Level Integrity

- No duplicate records
- PK exclusively identifies each record
- Every PK value unique
- PK values not null

---

## Subset Tables

Subset table shares **same primary key** as its parent data table (e.g., SERVICES shares PRODUCT NUMBER with PRODUCTS).

---

## Review Checklist (Interviews)

1. Subjects represented
2. Table names/descriptions suitable
3. Field names suitable
4. All appropriate fields assigned

---

## Memory Aids

| Concept | Key point |
|---------|-----------|
| **Candidate key** | Uniquely identifies record; must pass all 9 Elements |
| **Artificial key** | When no natural candidate exists |
| **Primary key** | Selected candidate; must exclusively identify every field |
| **SSN as key** | Avoid—null possible; privacy |
| **Subset table** | Same PK as parent data table |
