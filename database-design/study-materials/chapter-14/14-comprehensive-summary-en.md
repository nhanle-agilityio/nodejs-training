# Chapter 14: Bad Design—What Not to Do — Comprehensive Summary

*Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*

---

## Overview

Chapter 14 (Part III: Other Database Design Issues) covers **three common design approaches that lead to poorly structured databases**. Now that you know proper design, you can appreciate the dangers and identify problems and solutions. The chapter appears at the end so you can recognize bad design after learning good design. **Resolution:** Take improperly designed databases through the complete design process.

---

## 1. "Flat-File" Design

*Also known as "throw-everything-into-one-big-table" design.* Common in nonrelational systems.

**Problems:**
- **Multipart fields** — SALES REP NAME (first + last), CUSTOMER ADDRESS (street, city, state, ZIP)
- **Calculated fields** — ORDER AMOUNT, ITEM # EXTENSION (manually calculated)
- **Unnecessary duplicate fields** — ITEM 1, ITEM 2, ITEM 3; QUANTITY 1/2/3; PRICE 1/2/3
- **No true primary key** — ORDER NUMBER can repeat if customer orders more than three items
- **Table represents multiple subjects** — Customers, orders, items (and sales reps)

**Result:** Redundant data, inconsistent data, lack of data integrity.

**Avoid completely.**

---

## 2. Spreadsheet Design

Spreadsheets are great for calculations and statistical analysis—**not** for relational databases. Using a spreadsheet as a database leads to:

**Problems:**
- **Duplicate fields** — Each "instance" repeats fields (STORE NUMBER, MANAGER NAME, ASSISTANT MANAGER NAME)
- **Multipart fields** — Store number + phone in one cell; manager first + last names in another
- **Multivalued fields** — ASSISTANT MANAGER can have multiple values per store
- **Difficult to use** — Data tasks that are easy in an RDBMS are tedious in spreadsheets

**Solution:** Remove data from spreadsheet; take through full database design process; implement in suitable RDBMS.

### Dealing with Spreadsheet View Mindset

When moving to a real database:
- **Break away** from spreadsheet view mindset
- Certain viewing layouts (e.g., typical spreadsheet report) are unavailable in a database
- Database stores data in normalized fields; reports present differently but are just as clear
- **Database advantages:** Shared resource; everyone accesses same data; no "master sheet" + duplicate copies; better data integrity; more retrieval flexibility

---

## 3. Database Design Based on the Database Software

**RDBMS provides tools for implementation—not a design procedure or rationale.** A formal design method provides principles and rationale.

**Traps of designing around RDBMS:**
- **Perceptions of RDBMS limitations** — e.g., skip degree of participation because you think RDBMS doesn't support it
- **RDBMS dictates design** — Instead of driving design from information requirements; limited RDBMS support for field specs, relationship characteristics
- **Constraint by knowledge** — Don't implement features you don't know how to do
- **Constraint by skill level** — Affects how well you implement specs and business rules

**Results:** Improper structure, insufficient data integrity, inconsistent data, inaccurate information. Database may "work" but have poor design without your knowing. RDBMS may not suit requirements.

**Best practice:** Design **logical structure without regard to any RDBMS**. Focus on organization's information requirements. After design is complete, determine implementation (single-user, client/server, web-based) and which RDBMS to use.

---

## 4. A Final Thought

People who know database design fundamentals have **better comprehension** of their RDBMS and its tools than those who don't. They understand *why* the RDBMS provides certain tools and *how* to use them. Learn good database design for this reason—and the many others in the book.

---

## Key Takeaways

| Bad Approach | Core Problem | Resolution |
|--------------|--------------|------------|
| **Flat-file** | Everything in one table; multipart, calculated, duplicate fields; no PK; multiple subjects | Take through full design process |
| **Spreadsheet** | Wrong tool; duplicate/multipart/multivalued; tedious | Design properly; implement in RDBMS |
| **RDBMS-driven** | Software dictates design; no principles; constrained by knowledge/skill | Design logical structure first; choose RDBMS later |

---

*Proceed to Chapter 15: Bending or Breaking the Rules*
