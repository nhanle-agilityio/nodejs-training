# Chapter 15: Bending or Breaking the Rules — Comprehensive Summary

*Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*

---

## Overview

Chapter 15 discusses **when and how** it may be permissible to bend or break proper database design rules. Following rules is paramount for data integrity. Only **two circumstances** justify deviations—and only if inescapable. If you must break rules, **document everything**. Try all other performance improvements first; depart from design only as a **last resort**.

---

## 1. Following Rules Is Paramount

Use a good design method to ensure database integrity. Consequences of improper data integrity are serious. Unless one of two specific circumstances is an inescapable imperative, use proper design techniques.

---

## 2. When May You Bend or Break the Rules?

### Circumstance 1: Designing an Analytical Database

**Analytical database** — Stores and tracks historical, time-dependent data. Often contains calculated fields and aggregate function results. Recording state of data at given moments.

**Violation:** Tables contain calculated fields (normally forbidden). **Acceptable** because of how the data is used.

**Recommendation:**
- Properly design the database first
- Break rules only after judicious consideration
- Make deliberate decision; understand why necessary
- **Note:** Analytical databases require a radically different methodology—acquire a good book on the subject

### Circumstance 2: Improving Processing Performance

**Most common reason** people feel compelled to break rules. When RDBMS is slow on multitable queries or complex reports, some alter table structures (e.g., add every field needed for the report).

**Problem:** Increases speed but introduces duplicate fields, redundant data, editing problems—trading one performance problem for another. Violates proper design.

**Real dilemma:** Sometimes you must choose between performance and design principles.

---

## 3. Is It Worth It?

The question is really about **data integrity**, not performance. Breaking rules for performance introduces data-integrity problems. Ask: *Is the perceived performance gain worth reduced data integrity?*

**Problems from breaking rules:**
- **Inconsistent data** — Duplicate fields require synchronization
- **Redundant data** — Must edit each instance of redundant value
- **Impaired data integrity** — Violates table-level, relationship-level integrity; you must compensate
- **Inaccurate information** — Cannot expect accuracy with these problems

---

## 4. Improving Performance by Other Means First

**Do all you can before breaking rules.** Consider these first:

| Option | Description |
|--------|-------------|
| **Hardware** | Faster CPU, more memory, SSD, better printer, network upgrade |
| **Operating system** | Optimize for peak performance; configuration options |
| **Database structure** | Ensure proper design; poor design contributes to poor performance |
| **Database implementation** | Take full advantage of RDBMS; define efficiently |
| **Application program** | Well-written? Best use of RDBMS tools? Reports/queries efficiently designed? |

**Depart from design only as a last resort.** Design properly first; relax rules only for very specific reasons.

---

## 5. Documenting Your Actions

**If you must break rules—document everything.**

**Record:**
1. **Reason** for breaking rules (e.g., processing performance, report speed)
2. **Design principle** being violated
3. **Aspect modified** — Which field, table, relationship, or view
4. **Specific modifications** — Exact changes made
5. **Anticipated effects** — On database, application programs, forms, reports, code

Add to database documentation. Even if you reverse changes later, the record prevents repeating the same mistakes.

---

## Key Takeaways

- Two circumstances: Analytical database; performance (last resort)
- Performance ≠ worth sacrificing integrity; try hardware, OS, structure, implementation, app first
- If you break rules: document reason, principle violated, aspect, modifications, effects
- Design properly first; relax rules only deliberately and for specific reasons

---

*Proceed to Chapter 16: In Closing*
