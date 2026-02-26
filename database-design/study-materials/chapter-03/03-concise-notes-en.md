# Chapter 3: Terminology — Concise Notes

*Quick reference for studying, reviewing, and explaining concepts*

---

## Value-Related

| Term | Definition |
|------|------------|
| **Data** | Values you store. Static. Meaningless in isolation. |
| **Information** | Data processed to be meaningful. Dynamic. Unlimited presentation forms. |
| **Axiom** | **Data = store; Information = retrieve** |

### Null
- **Represents:** Missing or unknown value
- **NOT:** Zero, blank spaces, or (always) zero-length string
- **Use when:** Missing, undefined, unknown, does not apply
- **Problem:** Math ops → Null; aggregates affected → inaccurate results
- **Avoid Null** in calculated fields and aggregate inputs

---

## Structure-Related

| Term | Definition |
|------|-------------|
| **Table** | Stores data. One subject. Primary key required. Order irrelevant. |
| **Field** | Smallest structure. One value. Describes subject. Stores data. |
| **Record** | Unique instance of subject. All fields as unit. ID'd by PK. |
| **View** | Virtual table from base tables. Structure only stored. |

### Table Types
- **Data** — Dynamic, common, for information
- **Validation** — Static, for integrity, lookup
- **Linking** — Resolves M:N, has composite PK (both FKs)

### Bad Fields
- Multipart (2+ distinct items)
- Multivalued (many of same type)
- Calculated (derived; compute at retrieval)

### Keys
| Key | Role |
|-----|------|
| **Primary** | Uniquely IDs records; enforces table integrity; establishes relationships |
| **Foreign** | Copy of parent PK in child; links tables; ensures relationship integrity |

### Key vs. Index
- **Key** = Logical (identify, relate)
- **Index** = Physical (optimize processing)

---

## Relationship-Related

### Types
| Type | Structure | Example |
|------|-----------|---------|
| **1:1** | PK copy to child; both may share same PK | EMPLOYEES ↔ COMPENSATION |
| **1:N** | PK copy to child (many side) | AGENTS ↔ ENTERTAINERS |
| **M:N** | Linking table with both PKs as composite PK + FKs | STUDENTS ↔ CLASSES via STUDENT_CLASSES |

### Participation
- **Mandatory** — Must have parent record before child
- **Optional** — No requirement

### Degree
- **(min, max)** — e.g., 1,8 = 1–8 related records

---

## Integrity-Related

### Field Specification
Three element types: **General** (name, description), **Physical** (type, length), **Logical** (required, range, Null support)

### Data Integrity (4 types)
1. **Table-level** — No duplicates, PK unique, never Null
2. **Field-level** — Sound structure, valid values, consistent definitions
3. **Relationship-level** — Valid links, synchronized, no orphans
4. **Business rules** — Organization-specific restrictions

---

## Memory Aids
- Data **store** → Information **retrieve**
- Null = missing/unknown; zero ≠ Null
- Key = logical | Index = physical
- 1:1, 1:N (most common), M:N (need linking table)
- Participation: mandatory vs. optional
- Degree: (min, max)
