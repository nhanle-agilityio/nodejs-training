# Chapter 7: Establishing Table Structures — Study Notes (Expanded)

*Detailed notes for studying, reviewing, and explaining Phase 3 concepts*

---

## What This Chapter Covers

Chapter 7 is about **Phase 3**: **establishing table structures**. You create the Preliminary Table List → Final Table List → associate fields → refine fields → refine table structures. Each table = one subject. Tables = foundation of the database.

---

## Three Procedures for Preliminary Table List

| # | Source | Action |
|---|--------|--------|
| **1** | Preliminary Field List | Infer subjects from field groupings. Unbiased view—fields "talk." |
| **2** | List of subjects | Merge: (1) resolve duplicates, (2) resolve same-subject-different-name, (3) combine. |
| **3** | Mission objectives | Subject-ID technique; cross-check for missed subjects. |

### Merge Steps (List of subjects + Preliminary Table List)

- **Duplicate** (same name): Different subjects? Rename both, add both. Same subject? Cross out on subjects list.
- **Same subject, different names**: Pick best name; use as sole identifier. Cross out counterpart.
- **Combine**: Add remainder to Preliminary Table List; discard subjects list.

---

## Final Table List

Add to each table: **refined name**, **type**, **description**.

### Table Types

- **Data** — Primary subject; foundation of info
- **Linking** — M:N relationships (later)
- **Subset** — Subordinate subject of data table
- **Validation** — Static lookup (later)

*Initially: all = data tables.*

### Table Name Guidelines (8)

- Unique, descriptive, meaningful
- Unambiguous; min words; no physical words (file, record, table)
- No acronyms, abbreviations, proper names
- No multi-subject (and, or, slash, ampersand, "Miscellaneous")
- **Plural** form

### Table Description Guidelines (6)

- Accurate definition + why important
- Clear, succinct; no implementation info; independent; no examples

---

## Associating Fields

Assign fields from Preliminary Field List to tables. Which fields **best represent characteristics** of each table's subject? Use paper; list under each table name.

---

## Refining Fields

### Field Name Guidelines (7)

- Unique, descriptive (exception: relationship fields)
- Unambiguous; min words
- No acronyms; abbreviations judiciously
- No redundant/synonymous words; no multi-characteristic
- **Singular** form (tables = plural; fields = singular)

### Elements of the Ideal Field (6)

1. Distinct characteristic of subject
2. Single value only
3. Cannot be deconstructed (no multipart)
4. No calculated/concatenated value
5. Unique in DB (except relationship fields)
6. Retains properties when in multiple tables

### Multipart Field → Split

INSTNAME (first + last) → INSTFIRST NAME, INSTLAST NAME  
INSTADDRESS (street, city, state, ZIP) → four separate fields  
INSTRUMENT ID (category + number) → two fields

### Multivalued Field → New Table (3 steps)

1. **Remove** field; use as basis for **new table**. Rename if needed.
2. **Relate** via field(s) from original table (appear in both).
3. **Add** new table to Final Table List (name, type, description).

*Dependent field (1:1 with multivalued)? Include in new table.*

---

## Refining Table Structures

### Redundant Data vs. Duplicate Field

- **Redundant data** OK when from relating tables; NOT OK from anomaly
- **Duplicate field** necessary only when **establishing relationship**

### Elements of the Ideal Table (6)

1. Single subject
2. Has primary key
3. No multipart/multivalued fields
4. No calculated fields
5. No unnecessary duplicate fields
6. Minimal redundant data

### Unnecessary Duplicate Fields

| Type | Fix |
|------|-----|
| **Reference** (info from other table) | Remove. Use views to combine. |
| **Multiple occurrences** (INSTRUMENT 1, 2, 3) | Treat as flattened multivalued → new table |

### Subset Table

**Definition:** Subordinate subject of a data table. Has own fields + linking field(s) from data table. Common fields stay in data table.

**When:** Many blank values; fields split into distinct groups (e.g., equipment vs. books).

**Steps:** Create subset table(s); add linking field; add to Final Table List (type = Subset).

### Previously Unidentified Subset Tables

Tables with nearly identical structure (e.g., FULL-TIME EMPLOYEES, PART-TIME EMPLOYEES) = subset tables. Extract common fields → new data table (e.g., EMPLOYEES); subset tables become subordinate.

---

## Memory Aids

| Concept | Key point |
|---------|-----------|
| **Preliminary Table List** | From fields (implied subjects) + subjects (merge) + mission objectives |
| **Table names** | Plural; unique; unambiguous; no acronyms |
| **Field names** | Singular; unique; unambiguous |
| **Multipart** | Split into separate fields |
| **Multivalued** | New table + relate |
| **Duplicate field** | OK only for relationship |
| **Subset table** | Subordinate subject; linking field from data table |

---

## Quick Reference

- **Ideal Field:** Single value, no multipart, no calculated, unique
- **Ideal Table:** Single subject, PK, no multipart/multivalued/calculated/unnecessary duplicates
- **Reference field** = Remove
- **Flattened multivalued** (Field1, Field2, Field3) = Resolve as multivalued
