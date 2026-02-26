# Chapter 3: Terminology — Comprehensive Summary (Detailed)

*Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*

---

## Why This Terminology Is Important

Before learning the design process, you must understand the specialized vocabulary of relational database design. This terminology serves three critical purposes:

1. **Express the relational database model's ideas and concepts** — Much derives from set theory and first-order predicate logic (the model's mathematical basis).
2. **Clarify the design process** — Once you know these terms, the design process becomes clearer and easier to follow.
3. **Universal usage** — You'll encounter these terms in software manuals, course materials, commercial books, and database websites.

**Note:** The glossary at the end of the book provides concise definitions for all terms. Additional terms are introduced later in context. This chapter covers four categories: **value-related**, **structure-related**, **relationship-related**, and **integrity-related**.

---

## 1. Value-Related Terms

### Data

**Definition:** Data is the values you store in the database.

**Key characteristics:**
- **Static** — Data remains in the same state until you modify it by some manual or automated process.
- **Meaningless in isolation** — Raw data (e.g., "92883") gives no context. Is it a ZIP code? A part number? A customer ID? You cannot know until you process it.
- **Example:** A list of numbers and names without context is just data.

**Design implication:** You store data; your goal in design is to structure it so it can be transformed into meaningful information.

---

### Information

**Definition:** Information is data that you process in a manner that makes it meaningful and useful when you work with it or view it.

**Key characteristics:**
- **Dynamic** — Constantly changes relative to the data stored; you can process and present it in an unlimited number of ways.
- **Presentation forms:** SQL SELECT results, forms on screen, printed reports, dashboards, etc.
- **Example:** The same raw data, when formatted as a patient invoice report, becomes information — meaningful to anyone who views it.

**Critical axiom (memorize this):**
> **Data is what you store; information is what you retrieve.**

**Why this matters for design:** You design a database to provide meaningful information. That information is available only if (1) the appropriate data exists in the database, and (2) the database is structured to support that information. Understanding this distinction makes the logic behind the design process crystal clear.

**Industry note:** Unfortunately, "data" and "information" are often used interchangeably (and erroneously) in trade magazines, books, and websites — even by experienced authors. Be precise in your own work.

---

### Null

**Definition:** Null is a condition that represents a **missing or unknown** value.

**Critical clarification:** Null is **not** any of the following:
- **Not zero** — Zero can mean account balance, ticket count, stock level, etc. Null means "we don't know."
- **Not blank spaces** — A text string of one or more spaces is a valid character to SQL (e.g., `'   '` is as legitimate as `'abc'`). Blank can be meaningful (e.g., Washington D.C. has no county — blank might represent "not in any county").
- **Not always a zero-length string** — `''` (two consecutive single quotes) can be meaningful in some contexts (e.g., an employee with no middle initial). Null and zero-length string are different.

#### The Value of Null (When to Use It)

Null is useful when used for its stated purpose. Common reasons a field value may be Null:

| Reason | Explanation | Example |
|-------|-------------|---------|
| **Missing value (human error)** | Data wasn't collected | You forgot to ask Susan Black for her county; after calling her, you can correct it. |
| **Unknown value (undefined)** | Value doesn't exist yet | CATEGORIES table lacks a category for new fall classes you plan to offer. |
| **Truly unknown** | Nobody knows the value | Mr. Russo doesn't know his county; you don't know it either — truly unknown until someone finds out. |
| **Does not apply** | One of two mutually exclusive fields must be Null | EMPLOYEES table has SALARY and HOURLYRATE; an employee paid salary has Null in HOURLYRATE, and vice versa. |
| **Not applicable** | Value is irrelevant for this record | Male patient who is bald — HAIRCOLOR is "not applicable." **Recommendation:** Use a true value like "N/A" or "Not Applicable" instead of Null for clarity. |

**Design principle:** Whether you allow Nulls depends on how you use the data. Consider each field's purpose.

#### The Problem with Null (Why It Can Be Problematic)

**Major disadvantage:** Null has an adverse effect on **mathematical operations**.

**Rule:** Any operation involving a Null evaluates to Null.

| Expression | Result |
|------------|--------|
| (25 × 3) + 4 | 79 |
| (Null × 3) + 4 | Null |
| (25 × Null) + 4 | Null |
| (25 × 3) + Null | Null |

**Rationale:** If a number is unknown, the result is necessarily unknown — logically sound, but practically risky.

**Concrete example — Calculated fields:** If TOTAL VALUE = [SRP] × [QTY ON HAND], and QTY ON HAND is Null for some products, then TOTAL VALUE is Null for those records. If you sum all TOTAL VALUE fields, you get an **inaccurate total** — and the RDBMS will **not** alert you. The error is undetected.

**Concrete example — Aggregate functions:** `COUNT(fieldname)` returns Null if the field contains Null. A summary query might show "0" occurrences of an unspecified category, implying every product has a category — when in fact two products have Null (no category). The information is **inaccurate**.

**Design takeaway:** For fields used in calculations or aggregates, ensure values cannot be Null (or handle Null explicitly in your logic). These issues are addressed in Chapters 8 (Keys), 9 (Field Specifications), and 12 (Views).

---

## 2. Structure-Related Terms

### Table

**Definition:** In the relational model, data is stored in **relations**, which users perceive as **tables**. Each relation is composed of tuples (records) and attributes (fields).

**Characteristics:**
- **Chief structure** in the database.
- **Single subject** — Each table represents one specific subject (never multiple).
- **Logical order irrelevant** — The order of records and fields is of no importance.
- **Primary key** — Every table has at least one field that uniquely identifies each record.
- **Physical independence** — Because of the last two points, data can exist independently of physical storage; users don't need to know where a record is stored to retrieve it.

**Types of subjects a table can represent:**
- **Object** — Tangible: person, place, thing (e.g., pilots, products, students, buildings, equipment). Every object has characteristics you store and process.
- **Event** — Something that occurs at a point in time (e.g., judicial hearings, movie shoots, elections, doctor's appointments). Events also have characteristics you record.

#### Types of Tables

| Type | Purpose | Data nature | Use |
|------|---------|-------------|-----|
| **Data table** | Supply information | Dynamic — can modify, delete, process | Most common; you constantly interact with these. |
| **Validation table** (lookup table) | Implement data integrity | Static — rarely changes | Represents city names, skill categories, product codes, project IDs. Used to validate values entered into data tables. |
| **Linking table** (associative table) | Resolve many-to-many relationships | Varies | Connects two tables; copies of both primary keys form its structure. See "Many-to-Many" below. |

---

### Field

**Definition:** A field (attribute in theory) is the **smallest structure** in the database. It represents a **characteristic of the subject** of the table to which it belongs. Fields **store data**.

**Quality principle:** The quality of information you get is in **direct proportion** to the structural and data integrity of the fields. Fields cannot be overestimated in importance.

**Proper design rule:** Every field in a well-designed database contains **one and only one value**, and its name identifies the type of value (e.g., FIRSTNAME, LASTNAME, CITY, STATE, ZIPCODE). This makes data entry intuitive and sorting/filtering easy.

**Fields to avoid (in poorly designed databases):**
1. **Multipart field** (composite field) — Contains two or more distinct items (e.g., "Address" with street, city, state, ZIP in one field).
2. **Multivalued field** — Contains multiple instances of the same type of value (e.g., multiple phone numbers in one field).
3. **Calculated field** — Contains concatenated text or result of a mathematical expression (e.g., FullName = FirstName + LastName, or Total = Price × Quantity). These are derived; they should typically be computed at retrieval time, not stored.

*(Covered in detail in Chapter 7.)*

---

### Record

**Definition:** A record (tuple in theory) represents a **unique instance** of the subject of a table.

**Composition:** The entire set of fields in a table, whether or not they contain values — treated as a unit.

**Identification:** Each record is identified throughout the database by a **unique value in the primary key field**. Example: CLIENT ID uniquely identifies each client in the CLIENTS table.

**Example:** Sara Castilleja's record = unique instance of "Clients"; includes all fields; the values represent relevant facts about her.

**Design role:** Records are key to understanding table relationships — you need to know how a record in one table relates to records in another.

---

### View

**Definition:** A view is a **"virtual" table** composed of fields from one or more tables (called **base tables**). The view draws data from base tables rather than storing data itself. Only the **structure** of the view is stored in the database.

**RDBMS note:** Many RDBMS programs call views "saved queries."

**Example:** INSTRUMENT ASSIGNMENTS view draws from STUDENTS, INSTRUMENTS, and STUDENT INSTRUMENTS — displaying data from all three simultaneously based on matching STUDENT ID and INSTRUMENT ID.

**Three major reasons views matter:**
1. **Work with multiple tables** — Combine data from related tables in one place (tables must have relationships).
2. **Security** — Restrict users from viewing or manipulating specific fields in a table or group of tables.
3. **Data integrity** — A **validation view** can implement integrity rules.

**Indexed (materialized) view:** Some RDBMS (Oracle, SQL Server, DB2, Sybase) support views that *do* store data and can be indexed for faster processing. Used in data warehouses and OLAP. Vendor-specific; beyond this book's scope.

*(Design and use covered in Chapter 12.)*

---

### Keys

Keys are **special fields** with specific roles. The two most significant are primary and foreign keys.

#### Primary Key
- **Definition:** A field (or group of fields) that **uniquely identifies** each record within a table. Multiple fields = **composite primary key**.
- **Importance:** The most important key in the table.
- **Roles:**
  1. Primary key **value** identifies a specific record throughout the database.
  2. Primary key **field** identifies the table throughout the database.
  3. Enforces **table-level integrity** (no duplicates).
  4. Establishes **relationships** with other tables.
- **Rule:** Every table must have a primary key.

**Example:** AGENT ID in AGENTS table — uniquely identifies each agent, ensures no duplicate records, establishes relationship with ENTERTAINERS.

#### Foreign Key
- **Definition:** A copy of the primary key from another (parent) table, placed in a second (child) table to establish a relationship. Called "foreign" because the child table already has its own primary key; the one from the parent is "foreign" to it.
- **Establishment:** Take a copy of the parent's primary key → put it in the child table → it becomes a foreign key.
- **Roles:** Establishes relationships; implements **relationship-level integrity** — foreign key values must match existing primary key values (prevents "orphaned" records, e.g., an order without a customer).

**Example:** AGENT ID is primary key in AGENTS, foreign key in ENTERTAINERS (which has its own primary key ENTERTAINER ID). AGENT ID links the two tables.

*(Detailed in Chapters 8 and 10.)*

---

### Index

**Definition:** An index is a **physical structure** the RDBMS provides to **improve data processing** (e.g., speed up searches). How it works depends on the RDBMS.

**Critical distinction:**
- **Key** = **Logical** structure — identifies records, establishes relationships.
- **Index** = **Physical** structure — optimizes processing; stored on disk; has nothing to do with logical design.

**Common confusion:** These terms are often misused in the industry. Remember: keys = logical; indexes = physical optimization.

---

## 3. Relationship-Related Terms

### Relationships

**Definition:** A relationship exists between two tables when you can **associate records** of the first with those of the second.

**How established:**
- Via **primary and foreign keys** (one-to-one, one-to-many), or
- Via a **linking table** (many-to-many).

**Why relationships matter:**
- Enable **multitable views**.
- Crucial for **data integrity** — reduce redundant data, eliminate duplicate data.
- Every relationship can be characterized in three ways: **type**, **type of participation**, **degree of participation**.

---

### Types of Relationships (Cardinality)

#### One-to-One (1:1)
- **Definition:** A single record in Table A relates to **zero or one** record in Table B; a single record in Table B relates to **exactly one** record in Table A.
- **Structure:** Parent/child. Copy parent's primary key into child as foreign key.
- **Special:** The only relationship type where both tables may **share the same primary key** (the child uses the parent's primary key as its own).
- **Example:** EMPLOYEES (parent) ↔ COMPENSATION (child). One employee has zero or one compensation record; one compensation record belongs to exactly one employee. EMPLOYEE ID is primary key in both; also foreign key in COMPENSATION.

#### One-to-Many (1:N)
- **Definition:** A single record in Table A can relate to **zero, one, or many** records in Table B; a single record in Table B relates to **exactly one** record in Table A.
- **Structure:** Parent (one side) / Child (many side). Copy parent's primary key into child as foreign key.
- **Frequency:** The **most common** relationship type.
- **Integrity role:** Eliminates duplicate data, minimizes redundant data.
- **Example:** AGENTS (one) ↔ ENTERTAINERS (many). One agent has many entertainers; each entertainer has one agent. AGENT ID = foreign key in ENTERTAINERS.

#### Many-to-Many (M:N)
- **Definition:** A single record in Table A can relate to **zero, one, or many** records in Table B, and vice versa.
- **Problem if unresolved:** How do you associate a student with several classes, or a class with several students? Putting multiple CLASS fields in STUDENTS (or vice versa) causes data and integrity problems.
- **Solution:** Use a **linking table**. Create a new table with copies of both primary keys. Together they form the **composite primary key** of the linking table; separately, each serves as a **foreign key**.
- **Example:** STUDENTS ↔ CLASSES. Linking table STUDENT_CLASSES has STUDENT ID and CLASS ID — both together = composite primary key; each = foreign key to its respective table.
- **Unresolved M:N** = relationship not properly established (no linking table).

---

### Types of Participation

**Definition:** Whether a table **must** have records before the related table can have records.

For a relationship between TABLE_A and TABLE_B:
- **Mandatory (TABLE_A):** You must enter at least one record into TABLE_A before you can enter records into TABLE_B.
- **Optional (TABLE_A):** You are not required to enter any records into TABLE_A before entering records into TABLE_B.

**Example (AGENTS ↔ CLIENTS):** If every client must be assigned to an agent, AGENTS has **mandatory** participation (you need agents before clients). If clients can exist without agents, AGENTS has **optional** participation.

**Determination:** Based on how you use the data in relation to the other table. Business rules drive this.

---

### Degree of Participation

**Definition:** The **minimum and maximum number of records** in one table that can be related to a single record in the other table.

**Notation:** (minimum, maximum) — e.g., 1,10 means at least 1, at most 10.

**Example (AGENTS ↔ CLIENTS):**
- If an agent must handle at least 1 but no more than 8 clients: CLIENTS degree = **1,8**.
- If a client can only have one agent: AGENTS degree = **1,1**.

**Determination:** Based on how the data is related and how you use it. Business rules and constraints drive this.

*(Indicated in diagrams; details in Chapter 10.)*

---

## 4. Integrity-Related Terms

### Field Specification

**Definition:** A field specification (traditionally "domain") represents **all elements of a field** — everything that defines how the field is built, used, and constrained.

**Three types of elements:**

| Category | Purpose | Examples |
|----------|---------|----------|
| **General** | Most fundamental information | Field Name, Description, Parent Table |
| **Physical** | How the field is built and represented | Data Type, Length, Character Support |
| **Logical** | Values stored; constraints | Required Value, Range of Values, Null Support |

*(Full elements and usage in Chapter 9.)*

---

### Data Integrity

**Definition:** Data integrity refers to the **validity, consistency, and accuracy** of the data in a database.

**Fundamental principle:** The accuracy of information you retrieve is in **direct proportion** to the level of data integrity you impose. Neglect integrity and you risk hard-to-detect errors — and decisions based on inaccurate or invalid information.

**Four types of data integrity:**

| Type | Traditional name | Purpose |
|------|------------------|---------|
| **1. Table-level** | Entity integrity | No duplicate records; primary key is unique and never Null |
| **2. Field-level** | Domain integrity | Every field has sound structure; values are valid, consistent, accurate; same field types defined consistently (e.g., all CITY fields) |
| **3. Relationship-level** | Referential integrity | Relationship is sound; records stay synchronized when data is entered, updated, or deleted; no orphaned records (e.g., order without customer) |
| **4. Business rules** | (Organization-specific) | Restrictions based on how the organization perceives and uses data. Affect: value ranges, participation type/degree, synchronization rules. (Chapter 11) |

**Design takeaway:** All four types must be considered during design. They work together to ensure design quality and retrieval accuracy.

---

## Summary Table: Key Distinctions

| Concept | Distinction |
|---------|-------------|
| Data vs. Information | Data = store; Information = retrieve |
| Null | Missing/unknown — not zero, not blank. Useful when appropriate; problematic in math/aggregates |
| Key vs. Index | Key = logical (identify, relate); Index = physical (optimize) |
| Table types | Data (dynamic), Validation (static), Linking (resolve M:N) |
| Relationship types | 1:1, 1:N, M:N (use linking table) |
| Participation | Mandatory vs. Optional |
| Degree | (min, max) related records |
| Integrity | Table, Field, Relationship, Business Rules |

---

## Review Questions (Self-Check)

1. Why is terminology important?
2. Name the four categories of terms.
3. What is the difference between data and information?
4. What does Null represent?
5. What is the major disadvantage of Null?
6. What are the chief structures in the database?
7. Name the three types of tables.
8. What is a view?
9. State the difference between a key and an index.
10. What are the three types of relationships that can exist between a pair of tables?
11. What are the three ways in which you can characterize a relationship?
12. What is a field specification?
13. What three types of elements does a field specification incorporate?
14. What is data integrity?
15. Name the four types of data integrity.

### Answers

1. Terminology is important because it (a) expresses and defines the ideas and concepts of the relational database model, (b) expresses and defines the database design process itself, and (c) is used anywhere a relational database or RDBMS is discussed.
2. **Value-related**, **structure-related**, **relationship-related**, and **integrity-related**.
3. **Data** is the values you store in the database. **Information** is data that you process in a manner that makes it meaningful and useful when you work with it or view it.
4. **Missing or unknown value**.
5. Null has an **adverse effect on mathematical operations** (any operation involving Null evaluates to Null).
6. **Tables**.
7. **Data tables**, **linking tables**, and **validation tables**.
8. A **virtual table** composed of fields from one or more base tables in the database.
9. A **key** is a logical structure used to identify records within a table; an **index** is a physical structure used to optimize data processing.
10. **One-to-one**, **one-to-many**, and **many-to-many**.
11. By the **type of relationship**, the **manner in which each table participates**, and the **degree to which each table participates**.
12. A field specification represents **all the elements of a field**.
13. **General**, **physical**, and **logical**.
14. The **validity, consistency, and accuracy** of the data in a database.
15. **Field-level**, **table-level**, **relationship-level**, and **business rules**.

---

## Learning Outcomes Alignment

After studying this chapter, you should be able to:
- **Understand database management systems:** Use correct terminology; distinguish data from information; understand Null, keys, indexes, views, and table types.
- **Design relational databases:** Apply structure-related terms (tables, fields, records); establish and characterize relationships; define field specifications; implement the four levels of data integrity.

*Proceed to Chapter 4: Conceptual Overview*
