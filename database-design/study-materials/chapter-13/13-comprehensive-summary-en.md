# Chapter 13: Reviewing Data Integrity — Comprehensive Summary

*Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*

---

## Overview

Chapter 13 covers the **final stage** of the database design process: **reviewing overall data integrity** one last time and **assembling the database documentation**. You've completed table structures, keys, field specifications, relationships, business rules, and views. This chapter ensures nothing was overlooked and provides a checklist for each integrity component plus guidance on organizing documentation.

---

## 1. Why You Should Review Data Integrity

Even after paying attention to every detail, perform one **final review** of overall data integrity:
- Ensure the integrity you established is **as sound as possible**
- A crack in integrity → inconsistent data or inaccurate information
- You may have overlooked something
- **Peace of mind** is worth the effort
- *Garbage in, garbage out!*

---

## 2. Reviewing and Refining Data Integrity

Take a **modular approach**—sequentially review each component. Use references to earlier chapters if problems arise.

### Table-Level Integrity

Review each table; ensure:
- No duplicate fields
- No calculated fields
- No multivalued fields
- No multipart fields
- No duplicate records
- Every record identified by primary key value
- Each primary key conforms to Elements of a Primary Key

*Resolve with:* Ch. 6 (Analyzing), Ch. 7 (Table Structures), Ch. 8 (Keys)

### Field-Level Integrity

Ensure:
- Each field conforms to Elements of the Ideal Field
- Field specifications defined for each field

*Resolve with:* Ch. 9 (Field Specifications)

### Relationship-Level Integrity

Examine each relationship; ensure:
- Relationship properly established
- Appropriate deletion rules defined
- Type of participation correctly identified for each table
- Proper degree of participation established

*Resolve with:* Ch. 10 (Table Relationships)

### Business Rules

Ensure:
- Each rule imposes a meaningful constraint
- Proper category determined for each rule
- Each rule properly defined and established
- Appropriate field spec elements or relationship characteristics modified
- Appropriate validation tables established
- Business Rule Specifications sheet completed for each rule

*Resolve with:* Ch. 11 (Business Rules)

### Views

(Not directly connected to data integrity, but review anyway.) Ensure:
- Each view built on necessary base tables
- Appropriate fields assigned to each view
- Each calculated field provides pertinent information or enhances display
- Each filter returns appropriate records
- Each view has a view diagram
- Each view diagram has a View Specifications sheet

*Resolve with:* Ch. 12 (Views)

---

## 3. Assembling the Database Documentation

Assemble all items into a **central repository** (binders or organized folders/files). The design repository should include:

| Document | Purpose |
|----------|---------|
| **Final table list** | All tables with descriptions |
| **Field Specifications sheets** | Each field's specs |
| **Calculated field list** | Calculated fields and expressions |
| **Table structure diagrams** | Visual structure of each table |
| **Relationship diagrams** | How tables relate |
| **Business Rule Specifications sheets** | Each rule documented |
| **View diagrams** | View structure |
| **View Specifications sheets** | View characteristics |

**Optional appendix:** Notes compiled during design; samples from analysis stage.

---

## 4. Importance of Documentation

**Three reasons documentation is vital:**

1. **Complete record** — Every aspect of logical structure; answer almost any question by referring to docs
2. **Specifications and instructions** — Like architect's blueprints; how database should be created during implementation; integrity to establish; not RDBMS-specific → full latitude for physical implementation
3. **Modification impact** — Determine effects of any structure changes; make informed decisions; avoid adverse effects by referencing docs first

---

## 5. Done at Last!

After completing the integrity review and assembling documentation, **the logical database design process is complete**. You have a properly designed database; implementation can proceed smoothly.

---

## 6. Example: Wrap-Up

Mike's Bikes—final meeting: Review each database structure against governing elements; review each integrity component (table, field, relationship, business rules); gather all documentation; assemble into binders; hand off to Mike. Database complete!

---

## Key Takeaways

- Final integrity review is a quality-control checkpoint
- Modular review: table → field → relationship → business rules → views
- Documentation = complete record + implementation specs + modification guide
- Logical design complete; ready for physical implementation

---

*Proceed to Chapter 14: Bad Design—What Not to Do (Part III)*
