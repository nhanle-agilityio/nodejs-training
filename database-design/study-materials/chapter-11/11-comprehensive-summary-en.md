# Chapter 11: Business Rules — Comprehensive Summary

*Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*

---

## Overview

Chapter 11 covers **defining and establishing business rules**—the final component of overall data integrity. Business rules impose constraints on fields or relationships based on how the organization perceives and uses its data. Two major types: **database-oriented** (established in logical design) and **application-oriented** (established in physical design or application). Database-oriented rules fall into **field-specific** and **relationship-specific** categories. **Validation tables** enforce rules that limit a field's range of values.

---

## 1. What Are Business Rules?

A **business rule** is a statement that imposes a constraint on a specific aspect of the database, such as field specification elements or relationship characteristics. Rules are based on how the organization perceives, uses, and conducts business with its data.

**Purposes:**
- Guide choices (which data to store, how to define relationships)
- Influence data collection, relationship establishment, information provision, security/confidentiality
- Make field values contextually meaningful (e.g., SHIP DATE cannot be prior to ORDER DATE)

**Key point:** Creating generic business rules for multiple organizations is nearly impossible—each organization needs its own set. Same rule can apply to different orgs for different reasons (e.g., "max 2 instruments per student" at two schools: one for focus, one for inventory limits).

**Constraint outside logical design:** Some rules (e.g., "CHECK-IN DATE must be tested before allowing another checkout") cannot be established within logical design; they must be implemented in physical design or application.

---

## 2. Types of Business Rules

### Database-Oriented

- Impose constraints **within logical design**
- Implemented by modifying **field specification elements**, **relationship characteristics**, or both
- Example: VENDSTATE limited to WA, OR, ID, MT for Pacific Northwest vendors

### Application-Oriented

- Cannot be established within logical design
- Must be established in **physical design** or **database application**
- Example: "Preferred" customers receive 15% discount (calculation + criterion)
- Implementation: RDBMS tools or programming code (beyond scope of this book)

*Focus of this chapter: database-oriented business rules ("business rules" henceforth).*

---

## 3. Categories of Business Rules

### Field-Specific

Constrain **elements of a field specification**. May affect one or many elements.

**Examples:**
- *Order dates cannot be earlier than May 16, 2018* → Range of Values (ORDER DATE)
- *We must store Canadian ZIP codes* → Data Type, Length, Character Support (CUSTZIPCODE)

### Relationship-Specific

Constrain **relationship characteristics** (deletion rule, type of participation, degree of participation).

**Example:** *Each class must have 5–20 students* → degree of participation (5,20) for CLASSES ↔ STUDENT CLASSES; may imply Mandatory for STUDENT CLASSES.

---

## 4. Defining and Establishing Business Rules

**Order:** Field-specific first, then relationship-specific (avoids confusion).

**Working with users and management:** Schedule meetings; define rules as a group so constraints are meaningful and unambiguous.

---

## 5. Field-Specific Business Rules — Six Steps

1. **Select a table** — Any table; consider subject, usage, relationships.
2. **Review each field** — Ask: *Is a constraint necessary for any element in this specification?*
3. **Define the business rules** — Transform constraints into clear statements.
4. **Establish** — Modify appropriate field specification elements (Required Value, Null Support, Edit Rule, Range of Values, etc.).
5. **Determine what actions test the rule** — Insert? Delete? Update? Record or field?
6. **Record on Business Rule Specifications sheet** — Document the rule.

**Actions that test rules:** Insert record/field value, delete record/field value, update field value.

---

## 6. Relationship-Specific Business Rules — Six Steps

1. **Select a relationship** — Review diagram; consider what tables provide and why they're related.
2. **Review relationship** — Ask: *Is there a need to impose a limitation based on how the organization conducts business?*
3. **Define the business rules** — Transform constraints into statements.
4. **Establish** — Modify relationship characteristics (degree, type of participation, deletion rule).
5. **Determine what actions test the rule** — If violation on delete → may need **Restrict deletion rule for child table** (exception to Ch. 10).
6. **Record on Business Rule Specifications sheet** — Document the rule.

**Restrict for child table:** When deleting a child record would violate a required business rule (e.g., "instructor must teach at least one class"), establish Restrict deletion rule for the child table.

---

## 7. Business Rule Specifications Sheet

**Elements:**
- **Statement** — Clear, succinct text of the rule
- **Constraint** — Brief explanation of how it applies
- **Type** — Database oriented or Application oriented
- **Category** — Field specific or Relationship specific
- **Test On** — Insert, Delete, Update (which actions test the rule)
- **Structures Affected** — Field(s) or Table(s)
- **Field Elements Affected** — (field-specific) Which elements
- **Relationship Characteristics Affected** — (relationship-specific) Which characteristics
- **Action Taken** — Date, person, modifications made (critical for troubleshooting)

**Advantages:** Documents all rules; standard format; easier tracking and troubleshooting.

---

## 8. Validation Tables

**Definition:** A validation (lookup) table stores values used to enforce data integrity. Rarely modified after population.

**Typical structure:** Two fields — (1) Primary key, used to enforce integrity; (2) Non-key field storing values required by another field.

### Using Validation Tables to Support Business Rules

When a rule limits a field's **range of values** (and the set is fixed, possibly large):

1. **Create validation table** with valid values.
2. **Establish 1:N relationship** — parent table ↔ validation table (child gets FK from validation PK).
3. **Replace** the original field with FK to validation table (or use validation table's PK).
4. **Modify Range of Values** — *Any value within [field] in [validation table].*
5. **Set relationship characteristics:**
   - Deletion Rule: Restrict
   - Type: STATES Mandatory; SUPPLIERS Optional
   - Degree: (1,1) for STATES; (0,N) for SUPPLIERS

**Example:** SUPPSTATE limited to western states → STATES validation table; SUPPLIERS.STATE (FK) draws from STATES.STATE.

---

## 9. Reviewing Business Rule Specifications Sheets

- Review each sheet; ensure rule is properly established and all areas marked.
- Fix errors; repeat until all reviewed.
- Revisit rules often—add, modify, or remove as organization changes.

**Ongoing task:** Business rules will require future modifications as the organization evolves.

---

## 10. Example: Mike's Bikes

**Field-specific:** CATEGORY in PRODUCTS → validation table CATEGORIES; PRODUCTS.CATEGORY ID (FK); Range of Values = values in CATEGORIES.CATEGORY ID.

**Relationship-specific:** VENDORS ↔ PRODUCTS → *Every vendor must supply at least one product* → Mandatory + (1,N) for PRODUCTS; Restrict deletion rule based on PRODUCTS.

---

## Review Questions (Self-Check)

1. What is a business rule?
2. Name the two major types of business rules.
3. Can you establish application-oriented rules in logical design?
4. What are the two categories of database-oriented rules?
5. What is a field-specific business rule?
6. When is a business rule tested?
7. How do you document a business rule?
8. State two advantages of a Business Rule Specifications sheet.
9. What is the purpose of the Action Taken section?
10. What is the purpose of a validation table?
11. What is the typical structure of a validation table?
12. What is the association between a business rule and a validation table?
13. Why should you review completed Business Rule Specifications sheets?

---

*Proceed to Chapter 12: Views*
