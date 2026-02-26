# Chapter 6: Analyzing the Current Database — Comprehensive Summary

*Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*

---

## Overview

Chapter 6 covers **Phase 2** of the design process: **analyzing the current database** (or data collection methods) to understand how the organization uses, manages, and maintains its data. The maxim: *To determine where you should go, you must first understand where you are.*

---

## 1. Getting to Know the Current Database

### Goals of Analysis

1. **Determine** whether the database supports the organization's current information requirements
2. **Uncover** existing structural deficiencies
3. **Determine** how the database needs to evolve to support future information requirements

### Three Key Questions

- What types of data does the organization use?
- How does the organization use that data?
- How does the organization manage and maintain that data?

### Types of Current "Databases"

| Type | Description |
|------|-------------|
| **Paper-based** (file systems) | Forms, handwritten/printed documents in folders or notebooks; identified by coding schemes; stored in file cabinets. Many businesses still use some form of paper-based system. |
| **Legacy** | In existence and use for **five years or more**. Resides on mainframes, servers, PCs, or cloud. Structure depends on developer skills, tools, and RDBMS. Often has improper/inefficient structures, duplicate fields, redundant data. |
| **Human knowledge base** | Based on memory of key employees (e.g., customer info, product details). Crucial to conducting business. |

### Critical Rule

> **Do not adopt the current database structure as the basis for the new structure.**

Copying the existing structure transfers hidden problems (awkward tables, poorly defined relationships, inconsistent field specs) into the new database. Define the new structure explicitly. If the old database were problem-free, you wouldn't be building a new one.

---

## 2. Conducting the Analysis — Three Steps

### Step 1: Review How Data Is Collected

**Paper-based:** Gather one sample of each document type (forms, lists, binders). Find the most complete entry; make a copy; store in a folder.

**Computer programs:** Refer to word processors, spreadsheets, databases, web pages. Gather screenshots that represent how data is collected. Many use word processors or spreadsheets ingeniously for data. Create screenshots; paste into document; note program name and date; print and store.

**Web pages:** Examine pages used to collect data via Internet. Same procedure — screenshot, document, URL, date, print, store.

**Organize folders clearly** — time invested pays dividends later.

### Step 2: Review How Information Is Presented

Review:
- **Reports** — Typed, printed, or computer-generated documents that present data meaningfully
- **Screen presentations** (slide shows) — PowerPoint, Google Slides, Keynote; review only those that draw data from the database
- **Web pages** — Same as reports; review those with direct bearing on database data

For each: gather samples, document, store. For presentations and web pages, capture slides/pages that use database data. Mark folders with presentation name, filename, date. Avoid combining multiple presentations accidentally.

### Step 3: Conduct Interviews with Users and Management

**Why conduct interviews after gathering samples:**
1. Provide **details** about the samples you assembled
2. Provide **information on how the organization uses its data**
3. **Instrumental** in defining preliminary field and table structures
4. Help define **future information requirements**

---

## 3. Basic Interview Techniques

### Open-Ended vs. Closed Questions

- **Open-ended** — General; focus on specific **subjects**. Elicit descriptive responses.
- **Closed** — Specific; focus on particular **details** of a subject.

**Pattern:** Start with open-ended → identify subjects → select subject → ask more specific (closed) questions about it.

### Subject-Identification Technique

**Process:** As you ask open-ended questions, identify **subjects** in the response by listening for **nouns** that represent a person, place, thing, or event. (Ignore nouns that represent characteristics for now.)

- Subjects = person, place, thing, event
- List nouns as you identify them (one occurrence per subject)
- Use the list to generate further questions and later to define tables

**Example:** From "I'm responsible for ten clients... I write up a sales order... give it to my assistant" → subjects: Account Representative, Appointment, Assistant, Clients, Items, Merchandise, Sales Order, Season, Showroom.

### Characteristic-Identification Technique

**Process:** After identifying subjects, pick one and ask follow-up questions to obtain **characteristics**. Listen for nouns that represent **characteristics** of the subject (usually singular form: "phone number," "address"). Subject nouns are often possessive ("client's phone number").

- List characteristics on a **separate sheet** from subjects (critical — reason becomes clear in Chapter 7)
- Characteristics eventually become **fields**
- Continue for each subject until list is complete

**Example:** For "sales order" → characteristics: Name, Address, Phone Number, Email Address, Fax Number, Shipping Address, Items, Totals.

---

## 4. Interviewing Users

**Speak to users first** — they are the "front lines" with the clearest picture of daily operations. Their information helps you understand management's answers.

### Four Issues to Address

| Issue | Objective |
|-------|-----------|
| **1. Data type and usage** | Identify types of data users use and how they use it. Start with open-ended questions; use Subject/Characteristic techniques. |
| **2. Review samples** | Clarify how each sample is used; assign description to each; attach to sample. Never assume — e.g., if "SRP" is unclear, have participant clarify. Complex samples (multiple subjects) require more work. |
| **3. Current information requirements** | Determine whether users receive info based on data they don't control. For each report: Does user create/maintain the data? If no, identify origin. Follow-up questions are crucial. |
| **4. Additional information requirements** | What extra info do users need? Have them note on reports (sticky notes, etc.) with reasons. Identify new subjects/characteristics; add to lists. |
| **5. Future information requirements** | What info will they need as org evolves? Use questions about evolution's effect. Answers are speculative but help anticipate. Sketch new reports; identify subjects/characteristics. |

---

## 5. Interviewing Management

### Four Issues to Address

| Issue | Objective |
|-------|-----------|
| **1. Current information requirements** | Identify reports management receives; determine if any reports are missing from your samples. Obtain new report samples; identify subjects/characteristics; add to lists. |
| **2. Additional information requirements** | Does management need supplemental info? Same technique as user interviews — note on reports, identify new items. |
| **3. Future information requirements** | What info will management need as org evolves? Sketch new reports; identify subjects/characteristics. |
| **4. Overall information requirements** | In management's opinion, what **generic class** of information does the org need? Is there data the org must maintain that hasn't been discussed? Review all reports; ask if there's useful info not currently received by anyone. |

**Repeat** until no further information is identified. You may need to revisit this process as the design unfolds.

---

## 6. Compiling a Complete List of Fields

### The Preliminary Field List

Represents the organization's **fundamental data requirements** — the core set of fields you'll define. Created in two steps.

#### Step 1: Review and Refine the List of Characteristics

**Refine items with same name:** If "Name" appears multiple times, determine whether each instance represents a different subject (Client Name, Employee Name, Contact Name). Rename using subject as prefix. Same for generic items: Address, City, State, ZIP Code, Phone Number, Email Address.

**Refine items representing same characteristic:** "Product #," "Product No.," "Product Number" → keep one (clearest); remove duplicates.

**Ensure items are characteristics, not subjects:** Ask: Can it describe something? Is it a component/detail? Does it represent a collection? Can it be broken down? If it's a subject, move to subjects list and identify its characteristics.

Result: **First version** of Preliminary Field List.

#### Step 2: Check Samples for New Characteristics

- Highlight every characteristic on each sample
- Cross out those already on the list
- Cross out those with same meaning as existing (rename if needed — e.g., "Name" → "Contact Name")
- Add remaining to Preliminary Field List

Result: **Second version** of Preliminary Field List.

### Value Lists

When examining samples, record characteristics that incorporate **value lists** (enumerated lists) — acceptable range of values for a characteristic; often enforces business rules. Record the characteristic name and the values (or description if many). Don't record obvious sets (yes/no, true/false). Use when defining field specifications and business rules (Chapters 9, 11).

### The Calculated Field List

**Remove calculated fields** from the Preliminary Field List and place on a **Calculated Field List**. A calculated field stores the result of string concatenation or mathematical expression.

**Identifiers:** Names containing amount, total, sum, average, minimum, maximum, count. Examples: Subtotal, Average Age, Discount Amount, Customer Count.

Result: **Third version** of Preliminary Field List + Calculated Field List.

### Final Review

Conduct brief interviews with users and management to verify completeness. Add any omitted fields. Date your lists. Lists may not be absolutely final — you'll likely add/remove as design progresses — but strive for completeness.

---

## Review Questions (Self-Check)

1. State two goals of analyzing the current database.
2. True or False: You can adopt the current database structure as the basis for the new structure.
3. What is a legacy database?
4. State two steps of the analysis process.
5. Which types of computer software programs should you review during the analysis?
6. Why should you conduct interviews after you gather data collection and information presentation samples?
7. How do you use "open-ended" and "closed" questions?
8. What is the Subject-Identification Technique?
9. How do you identify specific attributes for a particular subject?
10. True or False: You should interview users and management at the same time.
11. What three basic types of information requirements must you identify?
12. What is the Preliminary Field List?
13. State why each item on the Preliminary Field List should have a unique name.
14. What is a value list?
15. What are calculated fields? What (if anything) should you do about them?

### Answers

1. Any two of: Determine whether the database supports current information requirements; uncover structural deficiencies; determine how the database needs to evolve for future requirements; identify types of data used; determine how the organization uses, manages, and maintains data.
2. **False.** Do not adopt the current structure as the basis for the new one.
3. A database that has been in existence and in use for **five years or more**.
4. Any two of: Reviewing the way data is collected; reviewing the manner in which information is presented; conducting interviews with users and management.
5. **Word processors, spreadsheets, databases, and web pages**.
6. Interviews provide details about samples, information on how the org uses data, help define preliminary field/table structures, and help define future information requirements.
7. **Open-ended** questions focus on specific subjects; **closed** questions focus on specific details of a subject.
8. A procedure to **identify subjects** within a participant's response by listening for nouns that represent a person, place, thing, or event.
9. By using the **Characteristic-Identification Technique** — asking follow-up questions and listening for nouns that represent characteristics of the subject.
10. **False.** Interview users and management **separately**.
11. **Current**, **additional**, and **future** information requirements.
12. The list that represents the organization's **fundamental data requirements** and constitutes the core set of fields you must define in the database.
13. To ensure each characteristic appears **only once** on the list.
14. A list that specifies the **acceptable range of values** for a particular characteristic and often enforces a given business rule.
15. Fields that store the result of **string concatenation or mathematical expression**. **Remove** them from the Preliminary Field List and place on a dedicated **Calculated Field List**.

---

## Learning Outcomes Alignment

After studying this chapter, you should be able to:
- **Analyze** paper-based and legacy databases without adopting their structure
- **Conduct** the three-step analysis (collection, presentation, interviews)
- **Apply** Subject-Identification and Characteristic-Identification techniques
- **Compile** the Preliminary Field List and Calculated Field List

*Proceed to Chapter 7: Establishing Table Structures*
