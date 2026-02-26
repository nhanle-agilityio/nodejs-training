# Chapter 2: Design Objectives — Comprehensive Summary

*Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*

---

## 1. Why Should You Be Concerned with Database Design?

### The Temptation
Many RDBMS programs offer:
- Sample databases you can copy and modify
- Ability to borrow tables from samples for other databases
- Tools that guide you through defining and creating tables

### Critical Understanding
- **These tools do NOT help you design a database** — they only help you create physical tables
- **Use tools AFTER you've created the logical database structure** — not before
- RDBMS tools and samples minimize **implementation time**, giving you more time for applications

### The Primary Reason: Data Integrity
Database design is **crucial** to the:
- **Consistency** of data
- **Integrity** of data
- **Accuracy** of data

**Consequences of improper design:**
- Difficult to retrieve certain types of information
- Risk of searches producing inaccurate information
- **Inaccurate information** is the most detrimental result — it can adversely affect your organization's bottom line

**Rule of thumb:** If your database affects daily business operations or influences future business direction, **you must be concerned with database design**.

### The Architect Analogy
- **Custom home:** First engage an architect (design) → then hire a contractor (build)
- **Architect** creates blueprints for size, shape, structural/mechanical/electrical systems
- **Contractor** procures labor, materials, and builds according to specifications

**Database parallel:**
- **Logical database design** = Architectural blueprints (describes size, shape, systems; addresses informational and operational needs)
- **Physical implementation** = Completed home (tables, relationships, data integrity)
- **Applications** = Interior and fixtures (interaction with data)

**Bottom line:** Implementing a good design yields accurate information, stores data more efficiently, and is easier to manage and maintain.

---

## 2. The Importance of Theory

### Definition of Theory (in this context)
"General propositions used as principles" — **not** conjectures or proposals.

### Theory in Other Disciplines
- **Structural engineers** → Theories of physics
- **Composers** → Music theory
- **Automotive/Aerospace** → Aerodynamics theories

### Chief Advantage of Theory
**Theory helps you predict outcomes** — you can predict what will likely happen if you perform certain actions.

**Examples:**
- Drop a stone → it falls (Newton's Law of Gravity)
- Place flat stone on flat stone → it stays (theory enables pyramids, cathedrals, buildings)
- **Database:** Related tables → you can draw data from both simultaneously based on matching values of a shared field (predictable result)

### Relational Database and Mathematics
- Based on **set theory** and **first-order predicate logic**
- This mathematical foundation **guarantees accurate information**
- Provides basis for good design methodologies and building blocks for sound structures

### Do You Need to Know the Math?
**No.** You don't need to know set theory or first-order predicate logic to use a relational database — just as you don't need aerodynamics to drive a car. Theory provides the foundation; it makes the model predictable, reliable, and sound. Theory describes building blocks and guidelines for arrangement. **Arranging building blocks to achieve a desired result = design.**

---

## 3. The Advantage of Learning a Good Design Methodology

### The Alternative
You could learn by trial and error — but it takes very long and requires repairing many mistakes.

### The Best Approach
Learn a good database-design methodology (like the one in this book) and then design your database.

### Five Advantages of a Good Methodology

| Advantage | Description |
|-----------|-------------|
| **Sound structure skills** | Avoid redundant data, duplicate data, invalid data, absent required data — all produce erroneous information and make queries/reports difficult or meaningless |
| **Organized techniques** | Step-by-step guidance; organized techniques enable informed decisions on every aspect |
| **Minimize missteps** | Recognize errors and have tools to correct them; avoid unnecessarily repeating design steps |
| **Easier, faster design** | Trial-and-error lacks logic and organization — wastes valuable time |
| **Better RDBMS use** | Understand why RDBMS provides certain tools and how to use them for implementation |

**Recommendation:** Choose a methodology, learn it well, and use it faithfully — whether the one in this book or another established methodology.

---

## 4. Objectives of Good Design

You must achieve these objectives to design a sound database structure. Keep them in mind throughout the design process.

| Objective | Description |
|-----------|-------------|
| **Information retrieval** | Database supports both required and ad hoc information retrieval — stores data for defined requirements and possible ad hoc user queries |
| **Proper table construction** | Each table represents a single subject; composed of relatively distinct fields; minimal redundant data; identified by a field with unique values |
| **Data integrity** | Imposed at field, table, and relationship levels — guarantees valid and accurate structures and values at all times |
| **Business rules** | Database supports rules relevant to the organization; data provides valid, accurate, meaningful business information |
| **Future growth** | Structure is easy to modify or expand as information requirements change and grow |

---

## 5. Benefits of Good Design

Time invested in design is time well spent. Good design saves time long-term by avoiding constant revamping of poorly designed structures.

| Benefit | Description |
|---------|-------------|
| **Easy to modify and maintain** | Changes to a field, table, or relationship need not adversely affect others |
| **Easy data modification** | Changing a field value doesn't affect other fields; minimal duplicate fields means modifying a value in one place only |
| **Easy information retrieval** | Queries are easy because tables are well constructed and relationships properly established; inter-table relationships are obvious |
| **Easy application development** | More time on programming and data manipulation; fewer workarounds for poor design problems |

---

## 6. Database-Design Methods

### Traditional Design Methods
Three phases: **Requirements analysis** → **Data modeling** → **Normalization**

#### Phase 1: Requirements Analysis
- Examine the business being modeled
- Interviews with users and management
- Assess current system and analyze future needs
- Assess information requirements for the business as a whole
- *(The design process in this book follows this line of thinking)*

#### Phase 2: Data Modeling
- Model database structure using a data-modeling method
- **Methods:** Entity-Relationship (ER) diagramming, semantic-object modeling, object-role modeling, UML modeling
- Each provides means of **visually representing** tables, relationships, relationship characteristics
- **This book uses:** Basic version of ER diagramming (incorporated into the design process itself)
- During this phase: Define fields, assign primary keys, identify/implement data integrity levels, establish relationships via foreign keys

#### Phase 3: Normalization
- **Definition:** Process of decomposing large tables into smaller ones to eliminate redundant data, duplicate data, and avoid insert/update/delete problems
- **Process:** Test table structures against normal forms; modify if problems found
- **Normal form:** Specific set of rules used to test a table structure to ensure it is sound and problem-free
- **Normal forms in use:** First (1NF), Second (2NF), Third (3NF), Fourth (4NF), Fifth (5NF), Sixth (6NF), Boyce-Codd (BCNF), Domain/Key Normal Form (DK/NF)

### The Design Method in This Book
- Incorporates requirements analysis and simple ER-diagramming
- **Does NOT incorporate** traditional normalization process or normal forms
- **Reason:** Normal forms can be confusing without formal relational database theory study

**Example of 3NF definition (technical):** "A relation is in 3NF if and only if it is in 2NF and every non-key attribute is non-transitively dependent on the primary key." — Relatively meaningless to those unfamiliar with the terms.

**Same idea, plain English:** "A table should have a field that uniquely identifies each of its records, and each field in the table should describe the subject that the table represents."

- The methodology was developed by translating normal-form results into plain-English guidelines
- **Main advantage:** Removes intimidating aspects; normalization is transparent (incorporated via guidelines throughout)
- **Another advantage:** Clear, easy to implement — guidelines written in plain English
- **Critical:** Methodology yields fully normalized structure **only if followed faithfully** — no shortcuts, circumvention, or omission

---

## 7. Normalization (Author's Approach)

### The Problem (Late 1980s)
- Traditional methodology was difficult to employ
- Normalization process and endless iterations were sore points

### The Solution
1. **Idea:** A thoroughly normalized table is properly and efficiently designed
2. **Question 1:** Could we identify specific characteristics of such a table and state them as attributes of an ideal table structure?
3. **Question 2:** Could we use that ideal table as a model for all tables we create?
4. **Answer:** Yes to both — hence the "ideal table" approach

### Process
- Compile guidelines from final characteristics of well-defined databases that passed each normal form
- Apply guidelines throughout design process (creation and correction)
- Formulate guidelines for domains, subtypes, relationships, data integrity, referential integrity
- Result: Normalization is transparent — incorporated throughout via guidelines
- *(See Appendix G for detailed explanation)*

---

## Review Questions (Self-Check)

1. When is the best time to use an RDBMS program's design tools?
2. True or False: Design is crucial to the consistency, integrity, and accuracy of data.
3. What is the most detrimental result of improper database design?
4. What fact makes the relational database structurally sound and able to guarantee accurate information?
5. State two advantages of learning a design methodology.
6. True or False: You will use your RDBMS program more effectively if you understand database design.
7. State two objectives of good design.
8. What helps to guarantee that data structures and their values are valid and accurate at all times?
9. State two benefits of applying good design techniques.
10. True or False: You can take shortcuts through some of the design processes and still arrive at a good, sound design.

### Answers

1. **After you design the logical structure** of the database.
2. **True.** Design is crucial to the consistency, integrity, and accuracy of data.
3. **Inaccurate information**.
4. The relational database model is based on **set theory and first-order predicate logic**.
5. Any two of: gives you skills to design a sound structure; provides organized step-by-step techniques; minimizes missteps and reiterations; makes design easier and faster; helps you use RDBMS more fully and effectively.
6. **True.** Understanding database design helps you use your RDBMS program more effectively.
7. Any two of: supports required and ad hoc information retrieval; tables constructed properly and efficiently; data integrity at field, table, and relationship levels; supports business rules; lends itself to future growth.
8. **Data integrity**.
9. Any two of: structure easy to modify and maintain; data easy to modify; information easy to retrieve; end-user applications easy to develop.
10. **False.** You cannot take shortcuts and still arrive at a good, sound design.

---

## Learning Outcomes Alignment

After studying this chapter, you should be able to:
- **Understand database management systems:** Explain why design matters, the role of theory, and the value of a methodology
- **Design relational databases:** Articulate objectives and benefits of good design, understand the traditional vs. book methodology, and appreciate the role of normalization (without memorizing normal forms)

*Proceed to Chapter 3: Terminology*
