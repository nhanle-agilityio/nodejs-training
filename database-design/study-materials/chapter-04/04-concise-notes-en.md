# Chapter 4: Conceptual Overview — Concise Notes

*Quick reference for studying, reviewing, and explaining concepts*

---

## Golden Rule
**Complete the entire design process** — no shortcuts. "Simple" DB? Still yes. Type/size/purpose irrelevant.

- Integrity level ∝ thoroughness of following process  
- Partial = nearly as bad as none  
- *"There's never time to do it right, but there's always time to do it over!"*

---

## The 7 Phases (Order matters!)

| # | Phase | Who | Key Output |
|---|-------|-----|------------|
| 1 | **Mission** | Dev + Owner + Mgmt (statement); Dev + Mgmt + Users (objectives) | Purpose + user tasks |
| 2 | **Analysis** | Dev + Users + Mgmt | Field list (fundamental data requirements) |
| 3 | **Data structures** | Dev | Tables, fields, keys, field specs |
| 4 | **Relationships** | Dev + Users + Mgmt | PK/FK or linking tables; participation |
| 5 | **Business rules** | Dev + Users + Mgmt | Constraints; validation tables |
| 6 | **Views** | Dev + Users + Mgmt | Views with tables, fields, criteria |
| 7 | **Integrity review** | Dev | Table, field, relationship, business rule checks |

---

## Phase 1: Mission
- **Mission statement** = Purpose of DB (Dev, Owner, Mgmt)
- **Mission objectives** = Tasks users perform (Dev, Mgmt, Users)

## Phase 2: Analysis
- Current DB: legacy or paper-based
- Review: collection, presentation, web apps
- **Interviews** → Users (daily use, info needs); Mgmt (overall requirements)
- Output: Initial field list → remove calculated fields → refine → review with stakeholders

## Phase 3: Data Structures
- Tables from mission objectives + field list
- Refine multipart/multivalued → single value
- Primary key for each table
- Field specs (interview for characteristics)

## Phase 4: Relationships
- Identify relations (users help!)
- PK/FK (1:1, 1:N) or linking table (M:N)
- Participation type + degree

## Phase 5: Business Rules
- Constraints from org's view/use of data
- Users: specific (e.g., ship date > order date)
- Mgmt: general (e.g., max 20 per agent)
- Validation tables for finite-value fields

## Phase 6: Views
- Users need detail vs. summary
- Define with tables, fields, criteria

## Phase 7: Integrity Review
1. Table-level
2. Field-level
3. Relationship-level
4. Business rules

→ **Ready for RDBMS implementation** (never truly "done")

---

## Memory Aids
- **7 phases, 1→7** — Don't skip
- **Interviews** in phases 1, 2, 4, 5, 6
- **Mission** = why; **Objectives** = what users do
- **Field list** = foundation for tables
