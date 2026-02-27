# Chapter 11: Business Rules — Study Notes

*Quick reference for business rule definition and establishment*

---

## Definition

**Business rule:** Statement imposing constraint on field specification elements or relationship characteristics. Based on how organization perceives, uses, conducts business with data.

---

## Two Types

| Type | Where Established | Example |
|------|------------------|---------|
| **Database-oriented** | Logical design (field specs, relationship characteristics) | VENDSTATE = WA, OR, ID, MT |
| **Application-oriented** | Physical design / application | Preferred customer 15% discount |

*Focus: database-oriented.*

---

## Two Categories (Database-Oriented)

| Category | Affects | Example |
|----------|---------|---------|
| **Field-specific** | Field specification elements | Range of Values, Required Value, Data Type |
| **Relationship-specific** | Relationship characteristics | Degree, Type of participation, Deletion rule |

---

## Six Steps — Field-Specific

1. Select table
2. Review each field → constraint needed?
3. Define rules
4. Modify field specification elements
5. Determine actions that test rule (insert/delete/update)
6. Record on Business Rule Specifications sheet

---

## Six Steps — Relationship-Specific

1. Select relationship
2. Review → constraint needed?
3. Define rules
4. Modify relationship characteristics
5. Determine actions; if delete violates → **Restrict for child table**
6. Record on Specifications sheet

---

## Business Rule Specifications Sheet

Statement | Constraint | Type | Category | Test On | Structures Affected | Action Taken

---

## Validation Tables

- **Purpose:** Enforce rule limiting field's range of values (fixed set)
- **Structure:** Typically 2 fields — PK + non-key value field
- **Process:** Create table → 1:N relationship → Replace field with FK → Range of Values = values in validation table
- **Relationship:** Restrict deletion; Mandatory for validation; Optional for parent (often)

---

## Checklist

1. Field-specific rules defined and established
2. Relationship-specific rules defined and established
3. Validation tables created where appropriate
4. Business Rule Specifications sheets completed
5. All sheets reviewed

---

## Memory Aids

| Concept | Key point |
|---------|-----------|
| **Database vs Application** | Database = logical design; Application = physical/app |
| **Field vs Relationship** | Field = spec elements; Relationship = characteristics |
| **Validation table** | Fixed set of values → validation table + FK |
| **Restrict child** | When delete child would violate required rule |
