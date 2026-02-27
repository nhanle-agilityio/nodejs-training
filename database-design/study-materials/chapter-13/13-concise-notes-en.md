# Chapter 13: Reviewing Data Integrity — Study Notes

*Final stage checklist*

---

## Purpose

**Final review** of overall data integrity before declaring design complete. Ensures nothing overlooked; provides peace of mind. *Garbage in, garbage out!*

---

## Modular Review Checklist

### Table-Level (Ch. 6, 7, 8)

- No duplicate/calculated/multivalued/multipart fields
- No duplicate records
- Every record has PK; each PK conforms to Elements

### Field-Level (Ch. 9)

- Each field conforms to Elements of Ideal Field
- Field specs defined for each field

### Relationship-Level (Ch. 10)

- Relationship established
- Deletion rules defined
- Type and degree of participation correct

### Business Rules (Ch. 11)

- Meaningful constraints
- Proper category
- Defined and established
- Specs/characteristics modified
- Validation tables where needed
- Business Rule Specifications completed

### Views (Ch. 12)

- Correct base tables and fields
- Calculated fields pertinent
- Filters correct
- View diagram + View Specifications for each

---

## Documentation Repository

| Item | ✓ |
|------|---|
| Final table list | |
| Field Specifications sheets | |
| Calculated field list | |
| Table structure diagrams | |
| Relationship diagrams | |
| Business Rule Specifications sheets | |
| View diagrams | |
| View Specifications sheets | |
| Notes (appendix) | |
| Analysis samples (appendix) | |

---

## Why Documentation Vital

1. **Record** — Complete logical structure
2. **Blueprint** — Implementation specs; RDBMS-agnostic
3. **Impact** — Assess modification effects

---

## Status

Logical design **complete**. Ready for physical implementation.
