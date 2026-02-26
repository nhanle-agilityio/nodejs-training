# Chapter 7: Establishing Table Structures — Comprehensive Summary

*Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*

---

## Overview

Chapter 7 covers **Phase 3** of the design process: **establishing table structures**. You define tables (preliminary then final), associate fields with each table, refine fields, and refine table structures. Organizations track subjects; each subject is represented by a table. Tables form the foundation of the database; proper design guarantees a solid foundation.

---

## 1. Defining the Preliminary Table List

Use three procedures to develop the Preliminary Table List:

### Procedure 1: Identifying Implied Subjects (from Preliminary Field List)

**Why start with fields, not subjects?** The list of subjects may seem more intuitive, but missing tables is a risk. Studying fields lets you identify subjects from an **unbiased viewpoint**—the fields "talk" to you. Cross-check against subjects identified during interviews.

**Process:** Review the Preliminary Field List. Ask: *Does a certain set of fields define or describe a particular subject?* When you infer a subject, add it to a new Preliminary Table List. Continue until you've scanned all fields.

### Procedure 2: Using the List of Subjects (Merge)

Merge the list of subjects (from interviews) with the first version of the Preliminary Table List. Three-step process:

| Step | Action |
|------|--------|
| **1. Resolve duplicate items** | Items on both lists with the **same name**. Determine: different subjects? → Rename each; add both. Same subject? → Cross out on subjects list; keep on Preliminary Table List. |
| **2. Resolve items representing same subject** | Items with **different names** but same subject. Select the best name; use it as sole identifier. Cross out the counterpart on the other list. |
| **3. Combine** | Add remaining items from subjects list to Preliminary Table List. Discard subjects list. Result = second version of Preliminary Table List. |

### Procedure 3: Using the Mission Objectives

Use mission objectives to find subjects you may have overlooked. Apply Subject-Identification Technique to each mission objective; cross-check against Preliminary Table List:

1. **Match** → Same subject? Cross out duplicate. Different subjects? Rename and add both.
2. **Synonymous names** → Same subject? Select best name for Preliminary Table List.
3. **New subject** → Add to Preliminary Table List.

---

## 2. Defining the Final Table List

Transform the Preliminary Table List into a **Final Table List** by adding: refined table names, table type, and table description.

### Table Types

| Type | Description |
|------|-------------|
| **Data** | Represents subject important to org; primary foundation of database information |
| **Linking** | Establishes link between two tables in many-to-many relationship |
| **Subset** | Fields related to a data table; describes the data table's subject in a specific manner |
| **Validation** | Relatively static data; crucial for data integrity |

*Initially, designate all tables as data tables. Assign linking, subset, and validation types later.*

### Guidelines for Creating Table Names (8)

1. **Unique, descriptive, meaningful** to entire organization
2. **Accurately, clearly, unambiguously** identifies the subject
3. **Minimum words** necessary
4. **No physical-characteristic words** (file, record, table)
5. **No acronyms or abbreviations**
6. **No proper names** or words that unduly restrict data
7. **No name identifying more than one subject** (avoid "and," "or," slash, ampersand; avoid "Miscellaneous")
8. **Use plural form** of the name

### Guidelines for Composing Table Descriptions (6)

1. **Accurate definition** — Anyone can identify the table without confusion
2. **Explain importance** — Why the data matters to the organization
3. **Clear and succinct** — Avoid restating the name; not too brief or verbose
4. **No implementation-specific info** — Don't mention how/where the table is used
5. **Independent** — Don't make one description dependent on another
6. **No examples** — Well-defined description is self-explanatory

### Interviewing Users and Management

Conduct interviews (often together) to establish each table's definition and importance. Get consensus. Compose final descriptions using the guidelines. Confer again for acceptance. Final Table List complete when everyone agrees.

---

## 3. Associating Fields with Each Table

**Process:** Assign fields from the Preliminary Field List to each table on the Final Table List. Determine which fields best represent characteristics of each table's subject. List fields under each table name. If a field represents characteristics of more than one table, assign it to both. Refinement later will reveal appropriateness.

**Technique:** Use sheets of paper; write table names across the top; list fields underneath. Avoid using an RDBMS until design is complete.

---

## 4. Refining the Fields

### Guidelines for Creating Field Names (7)

1. Unique, descriptive, meaningful (exception: fields establishing relationships)
2. Accurately, clearly, unambiguously identifies the characteristic
3. Minimum words necessary
4. No acronyms; use abbreviations judiciously
5. No redundant/synonymous words that confuse meaning
6. No names identifying more than one characteristic (avoid and, or, slash, ampersand)
7. Use **singular** form (tables = plural; fields = singular)

### Elements of the Ideal Field (6)

1. **Represents a distinct characteristic** of the table's subject
2. **Contains only a single value** (no multivalued field)
3. **Cannot be deconstructed** into smaller components (no multipart/composite field)
4. **Does not contain** calculated or concatenated value
5. **Unique** within entire database (except relationship-establishing fields)
6. **Retains majority of properties** when appearing in more than one table

### Resolving Multipart Fields

**Multipart field** = stores two or more distinct items in one value (e.g., INSTNAME with first + last; INSTADDRESS with street, city, state, ZIP).

**Resolution:** Identify distinct items; treat each as an individual field. Ask: *What specific items does this field's value represent?* Transform each item into a new field.

**Example:** INSTNAME → INSTFIRST NAME, INSTLAST NAME. INSTADDRESS → INSTSTREET ADDRESS, INSTCITY, INSTSTATE, INSTZIPCODE.

**Hidden multipart:** INSTRUMENT ID may encode category (AMP, GUIT) + ID number—deconstruct into separate fields.

### Resolving Multivalued Fields (3 Steps)

**Multivalued field** = can store two or more occurrences of the same value (often plural name; value contains commas).

**Problems:** Hard to retrieve, sort; limits number of values; data redundancy if "flattened" into single value per record.

**Resolution:**

1. Remove the field; use it as basis for a **new table**. Rename if needed (e.g., CATEGORIES TAUGHT → CATEGORY TAUGHT).
2. Use field(s) from original table to **relate** original to new table. Those fields appear in both tables.
3. Assign name, type, description to new table; add to Final Table List.

**Dependent field:** If another field (e.g., MAXIMUM LEVEL TAUGHT) has one-to-one association with the multivalued field, include the dependent field in the new table structure.

---

## 5. Refining the Table Structures

### Redundant Data vs. Duplicate Fields

**Redundant data** = value repeated in a field because of (a) field's role in relating two tables—acceptable; or (b) field/table anomaly—unacceptable.

**Duplicate field** = field in two or more tables because of: relating tables (necessary); multiple occurrences of value (unnecessary); perceived need for supplemental info (unnecessary).

### Elements of the Ideal Table (6)

1. **Represents a single subject** (object or event)
2. **Has a primary key**
3. **No multipart or multivalued fields**
4. **No calculated fields**
5. **No unnecessary duplicate fields**
6. **Only absolute minimum redundant data**

### Resolving Unnecessary Duplicate Fields

| Type | Resolution |
|------|------------|
| **Reference fields** | Provide supplemental info from another table (e.g., MANPHONE, WEB SITE in INSTRUMENTS when already in MANUFACTURERS). **Remove** from the table. Use views to combine fields when needed. |
| **Multiple occurrences** | INSTRUMENT 1, INSTRUMENT 2, INSTRUMENT 3 = flattened multivalued field. Resolve as multivalued field: create new table (e.g., STUDENT INSTRUMENTS) with linking fields. |
| **Two sets** | Two flattened multivalued fields (e.g., instruments + checkout dates). Visualize each; resolve both; handle one-to-one association between values (include dependent in new table). |

### Subset Tables

**Subset table** = represents a **subordinate subject** of a particular data table. Contains fields germane to the subordinate subject + field(s) from data table to relate them. Does **not** contain fields common to both—those stay in the data table.

**When to create:** Table has many blank values; fields fall into distinct groups (e.g., equipment vs. books in INVENTORY).

**Steps:**

1. Use specialized fields to create new subset tables (e.g., EQUIPMENT, BOOKS).
2. Add linking field(s) (e.g., ITEM NAME) to relate subset to data table.
3. Add to Final Table List; type = "Subset."

### Refining Previously Unidentified Subset Tables

Tables with almost identical structures (e.g., FULL-TIME EMPLOYEES, PART-TIME EMPLOYEES) are often subset tables. Common fields duplicated unnecessarily.

**Steps:**

1. Remove common fields; use as basis for **new data table** (e.g., EMPLOYEES).
2. Give new table appropriate name.
3. Ensure subset tables represent subordinate subjects; rename as needed.
4. Add data table to Final Table List; type = "Data."

---

## Review Questions (Self-Check)

1. How do you identify and establish tables for a new database?
2. Why do you use the Preliminary Field List to help you define tables?
3. What action do you take when an item on the list of subjects and a differently named item on the Preliminary Table List both represent the same subject?
4. What information does the Final Table List provide?
5. State three guidelines for creating table names.
6. State two guidelines for composing table descriptions.
7. How do you assign fields to a table on the Final Table List?
8. State three guidelines for creating field names.
9. What two problems can poorly designed fields cause?
10. What can you use to resolve field anomalies?
11. State three of the Elements of the Ideal Field.
12. Under what condition is redundant data acceptable?
13. In general terms, what three steps do you follow to resolve a multivalued field?
14. When is it necessary to use a duplicate field in a table?
15. How can you refine table structures?
16. State three of the Elements of the Ideal Table.
17. What is a subset table?

### Answers

1. Using the **Preliminary Table List**.
2. Because the fields on the list **may imply subjects** that the database needs to track.
3. Select the name that **best represents the subject** and use it as the sole identifier.
4. The **name, type, and description** of each table.
5. Any three of the eight guidelines (unique/descriptive; unambiguous; minimum words; no physical words; no acronyms; no proper names; no multi-subject; plural).
6. Any two of the six guidelines (accurate definition; explain importance; clear/succinct; no implementation info; independent; no examples).
7. By determining which fields **best represent characteristics** of the table's subject.
8. Any three of the seven guidelines.
9. **Duplicate data** and **redundant data**.
10. Ensuring the field complies with the **Elements of the Ideal Field**.
11. Any three of the six elements.
12. When it is the result of resolving a multivalued field or unnecessary duplicate field (in initial stages), or when it results from **relating two tables**.
13. (1) Remove the field and use it as basis for new table; (2) Use field(s) from original table to relate them; (3) Assign name, type, description to new table and add to Final Table List.
14. When the field **establishes a relationship** between two tables.
15. By ensuring each table complies with the **Elements of the Ideal Table**.
16. Any three of the six elements.
17. A table that represents a **subordinate subject** of a particular data table.

---

## Learning Outcomes Alignment

After studying this chapter, you should be able to:
- **Define** the Preliminary and Final Table Lists using fields, subjects, and mission objectives
- **Apply** guidelines for table names and table descriptions
- **Associate** fields with tables and **refine** fields (multipart, multivalued)
- **Refine** table structures (duplicate fields, subset tables)

*Proceed to Chapter 8: Keys*
