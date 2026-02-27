# Chapter 12: Views — Comprehensive Summary

*Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*

---

## Overview

Chapter 12 covers **views**—virtual tables that draw data from base tables rather than storing data. Views are rebuilt and repopulated each time accessed. Three types defined during logical design: **data view** (examine/manipulate data), **aggregate view** (display aggregated data), and **validation view** (enforce range of values). Views support multitable access, reflect current data, allow customization, help enforce integrity, and support security. **View Specifications sheet** documents each view.

---

## 1. What Are Views?

A **view** is a **virtual table** composed of fields from one or more tables (or other views). The tables that comprise a view are its **base tables**. A view is "virtual" because:
- It draws data from base tables; it does not store data
- Only its structure is stored; RDBMS rebuilds and repopulates it on each access
- Many RDBMSs call views "saved queries"

*Note: Indexed (materialized) views store data and can be indexed—vendor-specific, beyond scope.*

**Why views are valuable:**
- Work with data from multiple tables simultaneously
- Reflect the most current information (rebuilt on each access)
- Customize to individual or group needs (reports, departmental info)
- Help enforce data integrity (validation views)
- Security/confidentiality—control what data users see

---

## 2. Anatomy of a View — Three Types

### Data View

Examine and manipulate data from one or more base tables.

**Single-table:** Use selected fields from one base table. Modifications flow through to base table. Field specs and business rules determine what modifications are allowed.

**Multitable:** Tables must bear a relationship to each other. Example: CLASS ROSTER from CLASSES + STUDENTS via STUDENT CLASSES. "Redundant" display (e.g., class name repeated per student) is acceptable—data is drawn from base tables, not physically stored. **Data view has no primary key** (it's not a table). You may include a base table's PK if it contributes to the information.

### Aggregate View

Display information produced by **aggregating** data (Sum, Average, Min, Max, Count). Can use one or more base tables plus **calculated fields** with aggregate functions plus **data fields** to group.

**Characteristics:**
- All data fields are **grouping fields** (values cannot be modified)
- Composed of grouping fields + calculated fields → **no data can be modified**
- Useful for reports and statistical information

### Validation View

Similar to validation table—helps enforce data integrity when a business rule limits a field's range of values. Difference: validation table stores its own data; validation view draws from base tables. Commonly defined with single base table, two or three fields (like validation table structure). Can restrict which fields users access while still providing valid range for FK.

---

## 3. Determining and Defining Views

**Working with users and management** to identify views. Review before meeting:
- Notes from design process (focus on reports)
- Report samples from analysis

**Points to identify view requirements:**
1. Review notes with group (mission objectives may spark view ideas)
2. Review data entry, report, presentation samples (summary-style reports)
3. Examine tables and subjects (confidentiality needs)
4. Analyze table relationships (multitable views)
5. Study business rules (validation views)

**Defining views:** Select tables and fields from relationship diagrams; create view diagram; add calculated fields and filters where appropriate.

---

## 4. Using Calculated Fields

Views **can** contain calculated fields (tables cannot). Calculated fields display result of concatenation, expression, or aggregate function.

**When to use:** If they provide pertinent, meaningful information or enhance how view displays data. Use calculated field list from Chapter 6 as source.

**Examples:**
- `Max(Order Date)` — last purchase date
- `CustLast Name & ", " & CustFirst Name` — full customer name

---

## 5. Imposing Criteria to Filter Data

**Filter (criterion):** Expression tested against a field's value. View includes record only if field meets criterion.

- Example: `CustState = "WA"` — only Washington customers
- Example: `CustCity In ("Bellevue", "Olympia", ...)` — specific cities

**Requirement:** Field being tested must be included in view structure. Cannot indicate filter on view diagram—record on View Specifications sheet.

---

## 6. View Specifications Sheet

Must accompany each view diagram. Contains:

| Item | Purpose |
|------|---------|
| **Name** | View name (follow table naming guidelines; view can identify more than one subject) |
| **Type** | Data, Aggregate, or Validation |
| **Base tables** | Names of base tables |
| **Calculated field expressions** | Record expressions for calculated fields |
| **Filters** | Field tested + expression used |

Use expressions you're familiar with; modify when implementing in RDBMS.

---

## 7. Reviewing View Documentation

- View defined properly? Correct type? Appropriate base tables? Necessary fields only?
- Calculated fields suitable? Pertinent? Enhance display?
- Filters retrieve required records? Filter needed? Will it work?
- **View diagram + View Specifications sheet for every view**

---

## 8. Example: Mike's Bikes

**PREFERRED CUSTOMERS:** Base table CUSTOMERS; fields CUSTOMER ID, CUSTFIRST NAME, CUSTLAST NAME, CUSTHOME PHONE, STATUS. Calculated field CUSTOMER NAME concatenates first + last. Filter: `Status = "Preferred"`.

**VENDOR PRODUCT COUNT:** Base tables VENDORS, PRODUCTS. VENDOR NAME from VENDORS; calculated field PRODUCT COUNT with `Count(ProdName)`. Aggregate view. No filter.

---

## Review Questions (Self-Check)

1. Why can you refer to a view as a virtual table?
2. State two reasons why views are valuable.
3. Name the types of views you can define during logical design.
4. What does RDBMS do each time you access a view?
5. What determines modifications you can make to view data?
6. What is the only requirement for a multitable data view?
7. Why doesn't a data view have its own primary key?
8. What is the purpose of an aggregate view?
9. What are the most common aggregate functions?
10. What is a grouping field?
11. True or False: You can modify data in an aggregate view.
12. What is the difference between a validation table and a validation view?
13. Name two points when identifying view requirements.
14. When should you use calculated fields?
15. How do you define a view for only science-fiction books?
16. Why must you complete a View Specifications sheet for every view?

---

*Proceed to Chapter 13: Reviewing Data Integrity*
