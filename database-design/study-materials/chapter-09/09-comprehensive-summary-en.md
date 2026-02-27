# Chapter 9: Field Specifications — Comprehensive Summary

*Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*

---

## Overview

Chapter 9 covers **defining field specifications** for each field in the database. Field specifications establish and enforce **field-level integrity** and form the **data dictionary**. Each specification has three categories of elements: **General**, **Physical**, and **Logical**. Three specification types: **Unique**, **Generic**, and **Replica**.

---

## 1. Why Field Specifications Are Important

- **Establish and enforce field-level integrity** — Guarantee data is consistent and valid.
- **Enhance overall data integrity** — Field-level integrity is one of four components (with table, relationship, and business rules).
- **Compel understanding of data** — Define nature and purpose; judge if data is necessary.
- **Constitute the data dictionary** — Complete specifications = literal dictionary of database structure. Used when implementing in RDBMS; guide for fields, validation, and user interface.

*Time spent on field specifications is an investment, not a waste. Skipping or partial completion leads to inconsistent data and wasted time fixing problems.*

---

## 2. Field-Level Integrity

A field attains field-level integrity when it has a complete set of field specifications and conforms to the **Elements of the Ideal Field**. Field-level integrity warrants:

- Identity and purpose are clear; tables containing the field are identified.
- Field definitions are consistent throughout the database.
- Values are consistent and valid.
- Types of modifications are clearly identified.

**Elements of the Ideal Field (review):**

1. Represents a distinct characteristic of the table's subject
2. Contains only a single value
3. Cannot be deconstructed into smaller components
4. Does not contain calculated or concatenated value
5. Unique within entire database (except FK)
6. Retains majority of characteristics when appearing as foreign key

---

## 3. Anatomy of a Field Specification

Three categories of elements:

### General Elements

| Element | Purpose |
|---------|---------|
| **Field Name** | Minimal words uniquely identifying the field |
| **Parent Table** | Table that contains the field |
| **Specification Type** | Unique, Generic, or Replica |
| **Source Specification** | (Replica only) Reference to generic/source spec |
| **Shared By** | Other tables sharing this field (explicit relationship) |
| **Alias(es)** | Alternate name(s) for rare cases (e.g., two occurrences in same table) |
| **Description** | Complete interpretation of the field |

#### Guidelines for Field Description (8)

1. Accurately identify field and state purpose; supplement field name
2. Clear and succinct; minimum words
3. Refrain from restating/rephrasing field name
4. No technical jargon, acronyms, abbreviations
5. No implementation-specific information
6. Independent (not dependent on another field's description)
7. No examples
8. State role within table or relationship to subject

**Alias use:** When two occurrences of the same field are needed in one table (e.g., PRESIDENT ID and VICE PRESIDENT ID for EMPLOYEE ID NUMBER). Use judiciously.

### Physical Elements

| Element | Purpose |
|---------|---------|
| **Data Type** | Nature of data stored |
| **Length** | Total characters allowed |
| **Decimal Places** | Precision for real numbers |
| **Character Support** | Which character types allowed |

**Data Types:**

- **Alphanumeric** — Letters, numbers, keyboard characters, special characters
- **Numeric** — Whole numbers and real numbers (no leading zeroes)
- **DateTime** — Dates, times, or both

**Character Support options:**
- Letters (incl. é, ñ)
- Numbers (0–9)
- Keyboard characters (comma, $, !, %, etc.)
- Special characters (copyright, pi, etc.)

### Logical Elements

| Element | Purpose |
|---------|---------|
| **Key Type** | Non-key, Primary, Alternate (Foreign in Ch.10) |
| **Key Structure** | Simple or Composite |
| **Uniqueness** | Unique or Non-unique |
| **Null Support** | No Nulls or Nulls Allowed |
| **Values Entered By** | User or System |
| **Required Value** | Yes or No |
| **Range of Values** | Valid values (General, Integrity-specific, Business-specific) |
| **Edit Rule** | When value can be entered; whether editable |

**Edit Rule options:**

1. Enter Now, Edits Allowed
2. Enter Later, Edits Allowed
3. Enter Now, Edits Not Allowed
4. Enter Later, Edits Not Allowed
5. Not Determined At This Time

**Range of Values categories:**
- **General** — Every possible value
- **Integrity-specific** — Based on field's role in relationship (Ch.10)
- **Business-specific** — From business rules (Ch.11)

*Avoid "Other" and "Miscellaneous" in Range of Values.*

**Null:** Does not represent blank. Use judiciously. Use true values ("N/A", "Not Applicable") when applicable.

---

## 4. Specification Types

| Type | When to Use | Notes |
|------|-------------|-------|
| **Unique** | Default; field appears once or is primary key | All elements except Source Specification |
| **Generic** | Template for other fields (e.g., STATE) | Nonspecific name; broad settings; no Parent Table, Shared By, Alias, Source Spec |
| **Replica** | Based on Generic or is foreign key | Draws from source; can alter or add elements |

**Examples:**
- Generic STATE → Replica VENDSTATE, CUSTSTATE, EMPSTATE
- VENDOR ID NUMBER: Unique (also Shared By PRODUCTS)

---

## 5. Defining Field Specifications

**Process:**

1. Define as many specifications as possible before meetings.
2. Meet with users and management.
3. Explain elements; ensure understanding.
4. Review specs; participants suggest refinements.
5. Work on remaining/unfamiliar fields with participants.
6. Refine Logical Elements with staff input.

**Strategy:** Don't rush. Work with representative people familiar with data. Schedule as many meetings as needed.

---

## 6. Example: Mike's Bikes

- Define specs for PRODUCT DESCRIPTION and other straightforward fields.
- CATEGORY field: Range of Values unknown; specify general range; revisit when defining business rules (Ch.11).
- Review with Mike and staff; confirm element settings.

---

## Review Questions (Self-Check)

1. State two major reasons why field specifications are important.
2. What do you gain by establishing field-level integrity?
3. What are the three categories of elements in a field specification?
4. Name the three types of specifications.
5. Why is it beneficial to compose a proper field description?
6. What does the Data Type element indicate?
7. What does the Character Support element indicate?
8. What types of keys are indicated on a field specification?
9. True or False: Null represents a blank value.
10. What is the significance of the Range of Values element?
11. What is the purpose of an Edit Rule?
12. When do you use a generic specification?

---

## Learning Outcomes Alignment

After studying this chapter, you should be able to:

- **Define** field specifications with General, Physical, and Logical elements
- **Compose** proper field descriptions using the guidelines
- **Choose** Unique, Generic, or Replica specification type appropriately
- **Establish** field-level integrity
- **Work** with users and management to define complete specifications

*Proceed to Chapter 10: Table Relationships*
