# Chapter 14: Bad Design—What Not to Do — Study Notes

*Designs to avoid*

---

## Three Bad Approaches

### 1. Flat-File ("One Big Table")

- Multipart fields
- Calculated fields
- Unnecessary duplicate fields
- No true primary key
- Multiple subjects in one table
- **Avoid completely**

### 2. Spreadsheet Design

- Spreadsheet ≠ relational database
- Duplicate, multipart, multivalued fields
- Tedious for data tasks
- **Solution:** Full design process → RDBMS

### 3. RDBMS-Driven Design

- Designing around software capabilities, not requirements
- RDBMS provides implementation tools—not design principles
- Constrained by knowledge and skill level
- **Solution:** Design logical structure first; ignore RDBMS; choose RDBMS after

---

## Spreadsheet vs Database Mindset

| Spreadsheet | Database |
|-------------|----------|
| Master sheet + duplicates | Shared resource; same data for all |
| Layout = storage | Normalized storage; flexible presentation |
| Limited integrity | Better integrity, consistency |

---

## Key Principle

**Design logical structure without regard to any RDBMS.** Focus on information requirements. Implementation and RDBMS choice come after design is complete.

---

## Final Thought

Knowing database design → better RDBMS comprehension and tool use. Design principles explain *why* RDBMS provides certain tools.
