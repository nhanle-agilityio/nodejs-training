# Chapter 12: Views — Study Notes

*Quick reference for view definition*

---

## Definition

**View:** Virtual table composed of fields from one or more base tables. Does not store data; RDBMS rebuilds on each access. Also called "saved queries."

---

## Three Types

| Type | Purpose | Modifiable? |
|------|---------|-------------|
| **Data** | Examine/manipulate data (single or multitable) | Yes* |
| **Aggregate** | Display aggregated data (Sum, Avg, Min, Max, Count) | No |
| **Validation** | Enforce range of values (like validation table) | — |

*Field specs and business rules determine what modifications allowed. Multitable: no PK modification.

---

## Why Views Valuable

- Work with multiple tables simultaneously
- Reflect most current data
- Customize for individuals/groups
- Enforce data integrity
- Security/confidentiality

---

## Requirements

- **Multitable data view:** Tables must bear relationship
- **Data view:** No primary key (not a table)
- **Aggregate view:** All data fields = grouping fields; no modifications
- **Filter:** Field tested must be in view structure

---

## Identifying Views

1. Review notes (reports)
2. Review report samples
3. Examine tables/subjects
4. Analyze relationships
5. Study business rules

---

## View Specifications Sheet

Name | Type | Base tables | Calculated field expressions | Filters

---

## Calculated Fields

- Views can contain them; tables cannot
- Use when pertinent or enhances display
- Expression: Max(), Count(), concatenation, etc.

---

## Filters

- Criterion = expression tested against field value
- Record on View Specifications sheet (not diagram)
- Field must be in view

---

## Memory Aids

| Concept | Key point |
|---------|-----------|
| **Virtual** | No stored data; rebuilt each access |
| **Data view** | No PK; multitable requires relationship |
| **Aggregate** | Grouping + calculated; read-only |
| **Validation view** | Draws from base; table stores own |
