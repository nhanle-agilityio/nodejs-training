# Chapter 9: Field Specifications — Study Notes

*Quick reference for field-level integrity*

---

## Three Categories of Elements

| Category | Focus |
|----------|-------|
| **General** | Purpose, parent table, type, description |
| **Physical** | Data type, length, decimal places, character support |
| **Logical** | Key type, uniqueness, null, required, range, edit rule |

---

## Specification Types

| Type | Use When |
|------|----------|
| **Unique** | Field appears once or is primary key |
| **Generic** | Template for similar fields (e.g., STATE) |
| **Replica** | Based on Generic or is foreign key |

---

## General Elements

- Field Name, Parent Table, Specification Type
- Source Specification (Replica only)
- Shared By (tables that share field)
- Alias(es) — for two occurrences in same table
- Description

**Description guidelines:** Accurate, clear, succinct; no jargon, no examples, independent.

---

## Physical Elements

**Data Types:** Alphanumeric | Numeric | DateTime

**Character Support:** Letters, Numbers, Keyboard chars, Special chars

---

## Logical Elements

| Element | Common Settings |
|---------|-----------------|
| Key Type | Non-key, Primary, Alternate |
| Uniqueness | Unique (for PK/AK) or Non-unique |
| Null Support | No Nulls (typical) or Nulls Allowed |
| Required Value | Yes (PK) or No |
| Range of Values | General / Integrity-specific / Business-specific |
| Edit Rule | Enter Now/Later + Edits Allowed/Not Allowed |

**Avoid:** "Other" and "Miscellaneous" in Range of Values.

**Null ≠ blank.** Use true values ("N/A") when valid.

---

## Field-Level Integrity

- Identity/purpose clear
- Definitions consistent
- Values consistent and valid
- Modification types identified

**Elements of Ideal Field:** Single value, no multipart/calculated, unique (except FK), retains characteristics as FK.

---

## Process

1. Define as many specs as possible
2. Explain elements to participants
3. Review and refine with users/management
4. Work on remaining fields together

---

## Memory Aids

| Concept | Key point |
|---------|-----------|
| **Field specs** | Data dictionary; field-level integrity |
| **Generic** | Template; nonspecific name; broad settings |
| **Replica** | Based on Generic or FK; can customize |
| **Alias** | When same field appears twice in one table |
| **Range of Values** | Avoid "Other"/"Miscellaneous" |
