# Chapter 2: Design Objectives — Concise Notes

*Quick reference for studying, reviewing, and explaining concepts*

---

## Why Care About Database Design?

- RDBMS tools/samples **create physical tables**, NOT logical design
- Use tools **after** logical structure — not before
- **Primary reason:** Design = crucial to **consistency, integrity, accuracy** of data
- Bad design → hard retrieval, **inaccurate information** (worst result, affects bottom line)

### Architect Analogy
Logical design = blueprints | Physical implementation = completed home | App = interior

---

## Theory

- **Theory** = "General propositions as principles" (not conjectures)
- **Chief advantage:** Predict outcomes
- Relational DB based on **set theory + first-order predicate logic** → guarantees accuracy
- You **don't need to know the math** (like aerodynamics for driving)
- **Design** = arranging building blocks for desired result

---

## Good Design Methodology — 5 Advantages

1. **Sound structure** — avoid redundant/duplicate/invalid/missing data
2. **Organized techniques** — step-by-step, informed decisions
3. **Fewer mistakes** — recognize errors, correct them, avoid rework
4. **Faster design** — trial-and-error wastes time
5. **Better RDBMS use** — understand tools and how to implement

---

## Objectives of Good Design (5)

| # | Objective |
|---|-----------|
| 1 | Supports required + ad hoc information retrieval |
| 2 | Tables constructed properly (single subject, distinct fields, minimal redundancy, unique ID) |
| 3 | Data integrity at field, table, relationship levels |
| 4 | Supports business rules |
| 5 | Lends itself to future growth |

---

## Benefits of Good Design (4)

- **Easy modify/maintain** — changes don't cascade badly
- **Easy data changes** — minimal duplicates = change in one place
- **Easy retrieval** — well-built tables, clear relationships
- **Easy app dev** — less workaround for design problems

---

## Traditional Design: 3 Phases

1. **Requirements analysis** — business exam, interviews, assess needs
2. **Data modeling** — ER diagrams (or semantic-object, ORM, UML)
3. **Normalization** — decompose tables, test against normal forms (1NF→6NF, BCNF, DK/NF)

---

## This Book's Method

- **Uses:** Requirements analysis + simple ER diagramming
- **Skips:** Explicit normalization process, normal forms
- **Why:** Normal forms confusing without formal theory
- **How:** Translates 3NF result into plain English — "Table has unique ID field; each field describes the subject"
- **Ideal table** — characteristics from normalized tables as guidelines throughout
- **Critical:** Follow faithfully — **no shortcuts** = fully normalized result

---

## Memory Aids

- **Logical first, physical second** — like architect before contractor
- **Inaccurate info** = worst result of bad design
- **Theory** → predict; **math** → guarantee
- **Methodology** → organized, faster, fewer mistakes
- **No shortcuts** — methodology works only when complete
