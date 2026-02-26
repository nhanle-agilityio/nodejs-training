# Chapter 1: The Relational Database — Comprehensive Summary

*Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*

---

## 1. What Is a Database?

### Definition
A **database** is an organized collection of data used for the purpose of modeling some type of organization or organizational process. It does not matter whether you use spreadsheets or a database application program—as long as you gather data in some organized manner for a specific purpose, you have a database.

### Two Types of Databases in Database Management

#### Operational Databases
- **Purpose:** The backbone of many companies, organizations, and institutions
- **Primary use:** Online Transaction Processing (OLTP) scenarios
- **Context:** Situations where there is a need to collect, modify, and maintain data on a daily basis
- **Data type:** **Dynamic data** — changes constantly and always reflects up-to-the-minute information
- **Examples of users:** Retail stores, manufacturing companies, hospitals and clinics, publishing houses
- **Why:** Their data is in a constant state of flux

#### Analytical Databases
- **Purpose:** Store and track historical and time-dependent data
- **Primary use:** Online Analytical Processing (OLAP) scenarios
- **Context:** Need to track trends, view statistical data over a long period, make tactical or strategic business projections
- **Data type:** **Static data** — never (or very rarely) modified
- **Information:** Reflects a point-in-time snapshot of the data
- **Examples of users:** Chemical labs, geological companies, marketing-analysis firms
- **Note:** Often use data from operational databases as their main data source

**Important distinction:** Operational and analytical databases fulfill very different data-processing needs. Creating their structures requires radically different design methodologies. **This book focuses on designing operational databases** because they are still the most commonly used type in the world today.

---

## 2. The Relational Database

### History and Origin
- **Conceived:** 1969
- **Founder:** Dr. Edgar F. Codd (IBM research scientist, late 1960s)
- **Context:** Dr. Codd was dissatisfied with existing database models and products
- **Approach:** Applied disciplines and structures of mathematics to solve problems
- **Problems addressed:** Data redundancy, weak data integrity, overdependence on physical implementation
- **Landmark publication:** "A Relational Model of Data for Large Shared Databanks" (June 1970)

### Mathematical Foundation
The relational model is based on two branches of mathematics:
1. **Set theory**
2. **First-order predicate logic**

**Note on terminology:** The name "relational" derives from the mathematical term **relation** (from set theory), **not** from the fact that tables can be related to one another—a common misconception.

### Core Structures
- **Relations** → Perceived by users as **tables**
- **Tuples** → **Records** (rows)
- **Attributes** → **Fields** (columns)

### Two Critical Characteristics
1. **Physical order is immaterial:** The physical order of records or fields in a table is completely irrelevant
2. **Unique identification:** Each record is identified by a field that contains a unique value

These characteristics allow data to exist **independently of how it is physically stored**. Users do not need to know the physical location of a record to retrieve its data.

### Relationships
The relational model categorizes relationships as:
- **One-to-one**
- **One-to-many**
- **Many-to-many**

Relationship establishment: A relationship between a pair of tables is established **implicitly** through **matching values of a shared field**.

**Example:** CLIENTS and AGENTS tables share a one-to-many relationship via AGENT ID. A specific agent is associated with one or more clients through matching AGENT ID values.

**Data access:** Users familiar with table relationships can access data in almost unlimited ways—from directly related tables and indirectly related tables (through chains of relationships).

---

## 3. Retrieving Data

### SQL (Structured Query Language)
- **Role:** Standard language used to create, modify, maintain, and query relational databases
- **Scope:** Directly related to the relational database model

### Three Components of a Basic SQL Query
1. **SELECT…FROM statement**
   - SELECT: Indicates which fields to display
   - FROM: Indicates which table(s) contain those fields
2. **WHERE clause** — Filters records by imposing criteria against one or more fields
3. **ORDER BY clause** — Sorts results in ascending or descending order

### Implementation in RDBMS Software
- Major RDBMS programs incorporate various SQL implementations
- Options range from: manual "raw" SQL entry → query builders → query forms
- **Example:** Microsoft SQL Server offers "Query Designer" window for building complex queries
- Queries can be saved for future use

**Practical note:** You may not need to write SQL if your software provides a query builder or you use a custom application. However, a basic understanding of SQL helps you:
- Understand and troubleshoot queries built with query-building tools
- Work effectively with high-end database software (e.g., Oracle, Microsoft SQL Server)

---

## 4. Advantages of a Relational Database

| Advantage | Description |
|-----------|-------------|
| **Built-in multilevel integrity** | Data integrity at field level (data accuracy), table level (no duplicate records, detect missing primary keys), relationship level (valid relationships), business level (accuracy in business context) |
| **Logical and physical data independence** | Changes to logical design or physical implementation by vendors need not adversely affect applications built on the database |
| **Guaranteed data consistency and accuracy** | Various levels of integrity ensure consistent, accurate data |
| **Easy data retrieval** | Users can retrieve data from a single table or from any number of related tables, enabling almost unlimited ways to view information |

### Historical Note on Performance
- **Past concern:** Relational databases were perceived to run slowly
- **Reality:** The fault was not the relational model itself but ancillary technology (insufficient processing speed, memory, storage)
- **Today:** Advances in hardware and software over 50 years have made performance largely insignificant

---

## 5. Relational Database Management Systems (RDBMS)

### Definition
An **RDBMS** is a software application program used to:
- Create relational databases
- Maintain relational databases
- Modify relational databases
- Manipulate relational databases

Many RDBMS programs also provide tools to create end-user applications that interact with the stored data.

### Quality Factor
The quality of an RDBMS is a direct function of **how well it supports the relational database model**. Even among "true" RDBMSs, support varies among vendors. There has yet to be a full implementation of the relational model's potential.

### Examples of RDBMS
IBM DB2, IBM Informix, Microsoft Access, Microsoft SQL Server, MySQL, Oracle RDBMS, PostgreSQL, SAP SQL Anywhere, SAP Sybase ASE, SQLite

---

## 6. What's Next? (Future of the Relational Database)

### Technology Evolution
- Relational databases are ~50 years old and remain the most widely used type
- Technology advances (processing speed, memory, storage) have:
  - Reduced issues with multi-table queries and report generation
  - Made RDBMS more robust and scalable
  - Enabled greater data integrity support

### Emergence of Non-Relational Systems
- **Driver:** Need to store data that doesn't fit neatly into table/field/record structure
- **Examples of such data:** Photos, read-only web app data, graph data, geospatial data, analytics data
- **Non-relational examples:** MongoDB, Couchbase, HBase, Cassandra, Redis

### Why the Relational Database Endures
1. **Ubiquity:** Used everywhere—small business to corporate systems, desktops to personal devices
2. **Strengths:** Easy to use and maintain, great at data integrity, sound structures (when built correctly), scalable
3. **Market share:** IDC forecasts >80% of operational database market through 2022; Gartner forecasts ≥70% of new applications through 2020
4. **Pragmatic note:** The relational database is not "one size fits all"—other models serve specific needs

---

## Review Questions (Self-Check)

1. Name the two main types of databases in use today.
2. What type of data does an analytical database store?
3. True or False: An operational database is used primarily in OLTP scenarios.
4. Name one of the branches of mathematics on which the relational model is based.
5. How does a relational database store data?
6. Name the three types of relationships in a relational database.
7. How do you retrieve data in a relational database?
8. State two advantages of a relational database.
9. What is a relational database management system?
10. True or False: Mobile devices are limited to gigabytes of storage.
11. State why database software companies have had a hard time implementing the relational database.

### Answers

1. **Operational** and **analytical**.
2. **Static data**.
3. **True.** An operational database is used primarily in OLTP scenarios.
4. **Set theory** and **first-order predicate logic**.
5. A relational database stores data in **relations**, which the user perceives as **tables**.
6. **One-to-one**, **one-to-many**, and **many-to-many**.
7. By using **SQL** (Structured Query Language).
8. Any two of: built-in multilevel integrity; logical and physical data independence from database applications; guaranteed data consistency and accuracy; easy data retrieval.
9. An **RDBMS** is a software program you use to create, maintain, modify, and manipulate a relational database.
10. **False.** Mobile devices can have gigabytes or terabytes of storage.
11. Processing speed, memory, and storage were **insufficient** to provide database software vendors with a platform on which to build a full implementation of the relational database.

---

## Learning Outcomes Alignment

After studying this chapter, you should be able to:
- **Understand database management systems:** Define databases, distinguish operational vs. analytical databases, and explain what an RDBMS is
- **Design relational databases:** Understand the relational model's foundations (tables, records, fields), how relationships work, and how data is retrieved via SQL

*Proceed to Chapter 2: Design Objectives*
