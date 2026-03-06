# Database Design — Master Summary

*Database Design for Mere Mortals®, 25th Anniversary Edition — Essential Knowledge & Practical Workflow*

---

## Part 1: Core Knowledge Summary

### 1.1 Why Database Design Matters

| Concept | Key Takeaway |
|---------|--------------|
| **Design vs. Implementation** | RDBMS tools help you *create* tables—they do **not** help you *design*. Design the logical structure first, implement afterward. |
| **Data Integrity** | Proper design ensures **consistent**, **valid**, and **accurate** data. Poor design → inaccurate information → bad decisions. |
| **Architect Analogy** | Logical design = blueprints. Physical implementation = building. Applications = interior/fixtures. |

### 1.2 Objectives of Good Design

1. **Information retrieval** — Supports required and ad hoc queries
2. **Proper table construction** — One subject per table; minimal redundancy; unique identifiers
3. **Data integrity** — At field, table, and relationship levels
4. **Business rules** — Organizational constraints built into the structure
5. **Future growth** — Easy to modify and extend

### 1.3 Four Levels of Data Integrity

| Level | Purpose | How Achieved |
|-------|---------|--------------|
| **Field-level** | Valid, consistent values in each field | Field specifications; Elements of Ideal Field |
| **Table-level** | Each table represents one subject; no duplicate records | Keys; Elements of Ideal Table |
| **Relationship-level** | Reliable connections; correct insert/update/delete | Foreign keys; deletion rules; participation |
| **Business rules** | Organizational constraints | Validation tables; modified specs; relationship characteristics |

### 1.4 Elements of the Ideal Field

1. Represents a *distinct characteristic* of the table's subject
2. Contains only *one value* (no multivalued)
3. *Cannot be broken down* (no multipart)
4. Does *not* contain calculated or concatenated values
5. *Unique* within the entire database structure
6. *Retains* most characteristics when used as foreign key

### 1.5 Elements of the Ideal Table

1. Represents a *single subject* (object or event)
2. Has a *primary key*
3. No multipart or multivalued fields
4. No calculated fields
5. No unnecessary duplicate fields
6. *Minimum* redundant data

### 1.6 Relationship Types & How to Establish

| Type | Definition | Establishment |
|------|-------------|---------------|
| **1:1** | One record in A ↔ one in B | Copy parent PK into child as FK (often FK = child PK in subset) |
| **1:N** | One in A ↔ many in B; one in B ↔ one in A | Copy PK from "one" side into "many" side as FK |
| **M:N** | One in A ↔ many in B; one in B ↔ many in A | Create **linking table** with both PKs as composite PK + FKs |

**Rule:** M:N is resolved into *two 1:N* relationships via a linking table.

### 1.7 Elements of a Foreign Key

1. Same name as parent primary key (exception: self-referencing)
2. Replica of parent's field specifications (with modifications)
3. Draws values exclusively from parent primary key

### 1.8 Key Design Principles

- **One subject per table** — Never mix multiple subjects
- **No calculated fields in tables** — Use views or application logic
- **No multivalued fields** — Resolve by creating new tables
- **Always complete the full process** — No shortcuts
- **Interview users and management** — At every major phase
- **Design logic first, RDBMS second** — Don't let the software dictate structure

### 1.9 What to Avoid

| Anti-pattern | Problem | Resolution |
|--------------|---------|------------|
| **Flat-file design** | Everything in one table; multipart, calculated, duplicate fields | Run through full design process |
| **Spreadsheet-as-DB** | Wrong tool; duplicate/multipart/multivalued | Design properly; implement in RDBMS |
| **RDBMS-driven design** | Software dictates structure; no principles | Design logical structure first; choose RDBMS after |

---

## Part 2: Standard Database Design Workflow

A practical, step-by-step workflow for any database design task.

```
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 1: DEFINE PURPOSE & SCOPE                                 │
├─────────────────────────────────────────────────────────────────┤
│  1.1 Mission Statement  →  "The purpose of this database is to…"  │
│  1.2 Mission Objectives → "Track X; Generate Y; Manage Z…"       │
│  1.3 Interview users & management; refine with feedback          │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 2: GATHER & REFINE DATA REQUIREMENTS                       │
├─────────────────────────────────────────────────────────────────┤
│  2.1 Review current system (DB, paper, spreadsheets)              │
│  2.2 Conduct interviews → identify fields & subjects              │
│  2.3 Compile Preliminary Field List                              │
│  2.4 Remove calculated fields → put on separate list             │
│  2.5 Send refined list for review; incorporate feedback          │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 3: DEFINE TABLES & FIELDS                                 │
├─────────────────────────────────────────────────────────────────┤
│  3.1 Identify subjects → Preliminary Table List                   │
│      • From field list (fields "imply" subjects)                  │
│      • From subject list (interviews)                             │
│      • From mission objectives                                    │
│  3.2 Merge & resolve duplicates; create Final Table List         │
│  3.3 Assign fields from field list to each table                  │
│  3.4 Refine fields:                                               │
│      • Resolve multipart → split into atomic fields               │
│      • Resolve multivalued → new table + relationship             │
│      • Remove fields not representing table subject               │
│  3.5 Review table structures (Elements of Ideal Table)           │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 4: ESTABLISH KEYS                                         │
├─────────────────────────────────────────────────────────────────┤
│  4.1 Identify candidate keys for each table                      │
│      • Must uniquely identify each record                         │
│      • Must conform to Elements of Candidate Key                  │
│  4.2 Create artificial key if no natural candidate exists        │
│  4.3 Select primary key from candidates (prefer simple)          │
│  4.4 Test: PK must exclusively identify every field value         │
│      → Remove any field it doesn't identify                       │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 5: DEFINE FIELD SPECIFICATIONS                             │
├─────────────────────────────────────────────────────────────────┤
│  5.1 For each field: define data type, length, null support       │
│  5.2 Define logical elements: range, edit rule, required value   │
│  5.3 Interview users to validate and complete specs               │
│  5.4 Document on Field Specifications sheet                      │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 6: ESTABLISH RELATIONSHIPS                                 │
├─────────────────────────────────────────────────────────────────┤
│  6.1 Create table matrix; identify relationships (1:1, 1:N, M:N) │
│  6.2 For 1:1 & 1:N: copy parent PK into child as FK              │
│  6.3 For M:N: create linking table with composite PK             │
│  6.4 Refine all FKs (name, specs, values from parent)             │
│  6.5 Set relationship characteristics:                           │
│      • Deletion rule (Restrict, Cascade, Nullify, etc.)           │
│      • Type of participation (Mandatory/Optional)                │
│      • Degree of participation (min, max)                        │
│  6.6 Review table structures again                                │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 7: DEFINE BUSINESS RULES                                   │
├─────────────────────────────────────────────────────────────────┤
│  7.1 Interview users & management → identify constraints         │
│  7.2 Field-specific: modify field specs (Range, Required, etc.)   │
│  7.3 Relationship-specific: modify participation, deletion       │
│  7.4 Create validation tables for finite value sets               │
│  7.5 Document each rule on Business Rule Specifications sheet    │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 8: DEFINE VIEWS                                            │
├─────────────────────────────────────────────────────────────────┤
│  8.1 Identify needed views (reports, multitable access, security) │
│  8.2 Define data, aggregate, validation views                     │
│  8.3 Add calculated fields and filters as needed                  │
│  8.4 Document each view on View Specifications sheet             │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 9: REVIEW & ASSEMBLE                                       │
├─────────────────────────────────────────────────────────────────┤
│  9.1 Final review: table, field, relationship, business-rule      │
│      integrity                                                   │
│  9.2 Assemble all documentation                                  │
│  9.3 Ready for physical implementation in RDBMS                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 3: Practical Example — Small Bookstore Orders

**Scenario:** A small bookstore wants to track customers, their orders, and products sold. Walk through the workflow step by step.

---

### Step 1: Requirements → Mission Statement & Objectives

**Interviews reveal:**
- Store sells books and merchandise
- Customers place orders (in person or online)
- Each order can have multiple items; each product can appear in many orders
- Need reports: sales by product, orders by customer, monthly revenue

**Mission Statement:**
> *"The purpose of this database is to manage customer information, track product inventory, and record sales orders for a small bookstore."*

**Mission Objectives:**
1. Track customer contact information and order history
2. Maintain product catalog with categories and prices
3. Record orders with line items (product, quantity, price at time of sale)
4. Support reporting on sales by customer, product, and time period

---

### Step 2: Data Requirements → Preliminary Field List

**From forms, spreadsheets, and interviews:**

| Raw Data | Notes |
|----------|-------|
| Customer name, email, phone, address | Customer info |
| Order number, order date, customer | Order info |
| Product name, category, current price | Product info |
| Quantity ordered, unit price | Per order line |
| Order total | **Calculated** — exclude; use in view |
| Category name | Separate subject? |

**Preliminary Field List (refined):**
- CUSTOMER ID, CUSTFIRST NAME, CUSTLAST NAME, CUSTEMAIL, CUSTPHONE, CUSTADDRESS, CUSTCITY, CUSTSTATE, CUSTZIP
- ORDER NUMBER, ORDER DATE, CUSTOMER (ref: who placed it)
- PRODUCT NUMBER, PRODUCT NAME, CATEGORY, CURRENT PRICE
- QUANTITY ORDERED, UNIT PRICE (per line)

**Subjects identified:** Customers, Orders, Products, Categories

---

### Step 3: Entities → Tables & Fields

**Preliminary Table List (merged & resolved):**
- CUSTOMERS
- ORDERS
- PRODUCTS
- CATEGORIES (validation—finite list)

**Assign fields; refine:**

| Table | Fields | Refinements |
|-------|--------|-------------|
| **CUSTOMERS** | CUSTOMER ID, CUSTFIRST NAME, CUSTLAST NAME, CUSTEMAIL, CUSTPHONE, CUSTADDRESS, CUSTCITY, CUSTSTATE, CUSTZIP | CUSTADDRESS multipart? → CUSTSTREET, CUSTCITY, CUSTSTATE, CUSTZIP |
| **ORDERS** | ORDER NUMBER, ORDER DATE, CUSTOMER ID | CUSTOMER ID links to CUSTOMERS |
| **PRODUCTS** | PRODUCT NUMBER, PRODUCT NAME, CATEGORY ID, CURRENT PRICE | CATEGORY ID links to CATEGORIES |
| **CATEGORIES** | CATEGORY ID, CATEGORY NAME | Validation table |
| **ORDER DETAILS** | ORDER NUMBER, PRODUCT NUMBER, QUANTITY ORDERED, UNIT PRICE | Linking table for Orders ↔ Products |

**Why ORDER DETAILS?** One order has many products; one product appears in many orders → **M:N**. Resolve with linking table.

**Final Table List:**

| Table | Type | Description |
|-------|------|-------------|
| CUSTOMERS | Data | People who purchase from the bookstore |
| ORDERS | Data | Individual sales transactions |
| PRODUCTS | Data | Items available for sale |
| CATEGORIES | Validation | Product categories (Fiction, Nonfiction, etc.) |
| ORDER DETAILS | Linking | Line items linking orders to products |

---

### Step 4: Keys

| Table | Candidate Key | Primary Key |
|-------|---------------|-------------|
| CUSTOMERS | CUSTOMER ID | CUSTOMER ID |
| ORDERS | ORDER NUMBER | ORDER NUMBER |
| PRODUCTS | PRODUCT NUMBER | PRODUCT NUMBER |
| CATEGORIES | CATEGORY ID | CATEGORY ID |
| ORDER DETAILS | (ORDER NUMBER + PRODUCT NUMBER) | Composite: ORDER NUMBER, PRODUCT NUMBER |

**Test:** For ORDER DETAILS, does (ORDER NUMBER, PRODUCT NUMBER) exclusively identify QUANTITY ORDERED and UNIT PRICE? Yes. ✓

---

### Step 5: Relationships

**Relationship matrix (simplified):**

| From \ To | CUSTOMERS | ORDERS | PRODUCTS | CATEGORIES |
|-----------|-----------|--------|----------|------------|
| CUSTOMERS | — | 1:N | — | — |
| ORDERS | 1:N | — | M:N | — |
| PRODUCTS | — | M:N | — | 1:N |
| CATEGORIES | — | — | 1:N | — |

**Establishment:**
1. **CUSTOMERS ↔ ORDERS (1:N):** Add CUSTOMER ID (FK) to ORDERS
2. **ORDERS ↔ PRODUCTS (M:N):** ORDER DETAILS already has ORDER NUMBER + PRODUCT NUMBER as composite PK; each is FK
3. **CATEGORIES ↔ PRODUCTS (1:N):** Add CATEGORY ID (FK) to PRODUCTS

**Relationship characteristics (examples):**
- ORDERS.CUSTOMER ID: Mandatory; Deletion = Restrict (can't delete customer with orders)
- ORDER DETAILS: Both FKs mandatory; Deletion = Cascade from ORDER (delete order → delete its lines)

---

### Step 6: Normalization Check (Elements of Ideal Table)

| Check | Result |
|-------|--------|
| One subject per table? | ✓ Each table has single subject |
| Primary key? | ✓ All tables have PK |
| No multipart/multivalued? | ✓ Resolved in refinement |
| No calculated fields? | ✓ Order total in view, not table |
| No unnecessary duplicates? | ✓ |
| Minimum redundancy? | ✓ UNIT PRICE in ORDER DETAILS is intentional (price at sale)—not redundant with CURRENT PRICE |

---

### Step 7: Business Rules (Examples)

**From interviews:**
1. *"We must have an email for every customer."* → CUSTEMAIL: Required Value = Yes, Null Support = No Nulls
2. *"Unit price in order must match product price at time of order."* → Application-level; document for implementation
3. *"Category must be from our approved list."* → CATEGORIES validation table; PRODUCTS.CATEGORY ID FK

---

### Step 8: Final Schema (Logical)

```
CUSTOMERS
├── CUSTOMER ID (PK)
├── CUSTFIRST NAME
├── CUSTLAST NAME
├── CUSTEMAIL
├── CUSTPHONE
├── CUSTSTREET
├── CUSTCITY
├── CUSTSTATE
└── CUSTZIP

ORDERS
├── ORDER NUMBER (PK)
├── ORDER DATE
└── CUSTOMER ID (FK → CUSTOMERS)

PRODUCTS
├── PRODUCT NUMBER (PK)
├── PRODUCT NAME
├── CURRENT PRICE
└── CATEGORY ID (FK → CATEGORIES)

CATEGORIES
├── CATEGORY ID (PK)
└── CATEGORY NAME

ORDER DETAILS
├── ORDER NUMBER (PK, FK → ORDERS)
├── PRODUCT NUMBER (PK, FK → PRODUCTS)
├── QUANTITY ORDERED
└── UNIT PRICE
```

**Sample view:** `ORDER SUMMARY` — Orders with customer names, order total (Sum of QUANTITY × UNIT PRICE per order)

---

## Summary: From Requirements to Schema

| Stage | Input | Output | Key Question |
|-------|-------|--------|--------------|
| **Requirements** | Interviews, forms, reports | Mission statement, objectives | *What is the purpose? What tasks?* |
| **Data** | Current system review | Field list, subject list | *What data exists? What's needed?* |
| **Entities** | Field list + subjects | Tables with assigned fields | *What subjects do we track?* |
| **Refinement** | Tables + fields | No multipart/multivalued; single subject | *Does each field belong?* |
| **Keys** | Tables | Primary keys; candidate keys | *What uniquely identifies each row?* |
| **Relationships** | Tables + logic | FK placements; linking tables | *How do tables connect? 1:1, 1:N, M:N?* |
| **Business rules** | Interviews | Modified specs; validation tables | *What constraints does the org need?* |
| **Views** | User needs | View definitions | *How do users access data?* |
| **Final** | All above | Complete documentation | *Ready to implement?* |

---

*Use this summary as a quick reference and the workflow as your checklist when starting any database design task.*
