# Chapter 15: Bending or Breaking the Rules — Study Notes

*When deviations may be acceptable*

---

## Rule: Follow Proper Design First

Only **two circumstances** justify bending/breaking rules. Otherwise: use proper techniques.

---

## Two Permissible Circumstances

### 1. Analytical Database

- Historical, time-dependent data
- Often contains calculated fields, aggregates
- Violation (calculated fields) **acceptable** due to use case
- **Action:** Design properly first; break only after judicious consideration
- **Note:** Requires different methodology—get specialized book

### 2. Processing Performance

- **Last resort only**
- Common temptation: add fields to table for report speed
- **Problem:** Duplicate fields, redundancy, editing issues
- **Question:** Is performance gain worth reduced data integrity?

---

## Try Before Breaking

| First try | Before altering design |
|-----------|------------------------|
| Hardware | CPU, memory, SSD, network |
| OS | Optimize configuration |
| Structure | Ensure proper design |
| Implementation | RDBMS capabilities, efficiency |
| Application | Well-written? Efficient queries/reports? |

---

## Problems from Breaking Rules

- Inconsistent data (sync duplicate fields)
- Redundant data (edit each instance)
- Impaired integrity (compensate manually)
- Inaccurate information

---

## Document if You Break

1. Reason
2. Design principle violated
3. Aspect modified (field, table, relationship, view)
4. Specific modifications
5. Anticipated effects (database, apps, forms, reports, code)

Add to documentation. Prevents repeating same mistakes even if reversed.
