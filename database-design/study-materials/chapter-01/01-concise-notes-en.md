# Chapter 1: The Relational Database — Concise Notes

*Quick reference for studying, reviewing, and explaining concepts*

---

## Database = Organized collection of data
Models an organization or process. Spreadsheet or app—if organized for a purpose, it's a database.

## Two Database Types

| Type | Use | Data | Examples |
|------|-----|------|----------|
| **Operational** | OLTP, daily collect/modify/maintain | Dynamic, up-to-the-minute | Retail, hospitals, manufacturing |
| **Analytical** | OLAP, trends, projections | Static, point-in-time snapshot | Labs, geology, marketing analysis |

→ **Book focuses on operational** (most common)

---

## Relational Database (1969, Dr. Edgar F. Codd)

### Math: Set theory + First-order predicate logic
- "Relational" = from **relation** (set theory), NOT "tables related"

### Structure
- **Relation** = Table
- **Tuple** = Record (row)
- **Attribute** = Field (column)

### Two Key Traits
1. Physical order of rows/columns **doesn't matter**
2. Each record has a **unique identifier** (field with unique value)
→ Data independent of physical storage; no need to know location to retrieve.

### Relationships
- Types: **1:1**, **1:many**, **many:many**
- Established by **matching values in shared field**
- Access data from direct + indirect relationships (chains)

---

## SQL (Structured Query Language)
Standard for create, modify, maintain, query.

### Basic query = 3 parts
1. **SELECT...FROM** — which fields, which table(s)
2. **WHERE** — filter criteria
3. **ORDER BY** — sort order

---

## Relational DB Advantages
- **Multilevel integrity** (field, table, relationship, business)
- **Logical/physical independence** from apps
- **Consistent, accurate** data
- **Flexible retrieval** — almost unlimited ways to view

---

## RDBMS = Relational Database Management System
Software to create, maintain, modify, manipulate relational databases.
Examples: Oracle, SQL Server, MySQL, PostgreSQL, Access, SQLite, DB2, etc.

---

## Quick Facts
- ~50 years old, still dominant
- Past "slow" perception → was tech limitation, not model
- Non-relational (MongoDB, Cassandra, etc.) for data that doesn't fit table structure
- Forecasts: >80% operational market, ≥70% new apps

---

## Memory Aids
- **OLTP** = Operational, **dynamic**, daily use
- **OLAP** = Analytical, **static**, historical/trends
- **Relation** = mathematical term, not "related tables"
- **SQL** = SELECT (what), FROM (where), WHERE (filter), ORDER BY (sort)
