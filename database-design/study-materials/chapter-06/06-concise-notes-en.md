# Chapter 6: Analyzing the Current Database — Study Notes (Expanded)

*Detailed notes for studying, reviewing, and explaining Phase 2 concepts*

---

## What This Chapter Covers

Chapter 6 is about **Phase 2**: **analyzing the current database** (or data collection methods) to understand how the organization uses, manages, and maintains its data. The key maxim: *To determine where you should go, you must first understand where you are.*

---

## Golden Rule

**Do NOT adopt the current database structure as the basis for the new one.** Copying transfers hidden problems (awkward tables, poor relationships, inconsistent fields) into the new database. Define the new structure explicitly.

---

## Types of Current "Databases"

| Type | Key points |
|------|------------|
| **Paper-based** | Forms, binders, file cabinets. Many orgs still use paper. Look for: inconsistent, erroneous, duplicate, redundant, incomplete data. |
| **Legacy** | In use **5+ years**. On mainframes, servers, PCs, cloud. Often poorly designed (duplicate fields, redundant data). Easier to analyze than paper — more structured, has application program. |
| **Human knowledge** | Key employees hold crucial info in memory. |

---

## The Three-Step Analysis Process

### Step 1: Review How Data Is Collected

**What to gather:** One sample of each document/form/screen used to record data.

- **Paper:** Forms, lists, binders. Find most complete entry; copy; store in folder.
- **Software:** Word processors, spreadsheets, databases, web pages. Many use Word/Excel ingeniously for data — check with someone familiar. Screenshot data-entry screens; note program + date; print; store.
- **Web:** Pages that collect data. Same procedure — screenshot, URL, date, store.

**Why organize:** Time invested in clear folders pays off during complex design phases.

### Step 2: Review How Information Is Presented

**What to gather:** Samples of how data is shown as information.

- **Reports** — Typed, printed, or computer-generated. Easier than collection — people know reports; copies often available.
- **Screen presentations** — PowerPoint, Slides, Keynote. Review only those that **draw data from the database**. Capture slides; don't accidentally combine multiple presentations.
- **Web pages** — Same logic; review pages that present database-derived information.

### Step 3: Conduct Interviews

**Why after samples:** Interviews provide (1) details about samples, (2) how org uses data, (3) basis for field/table structures, (4) future information requirements.

---

## Two Core Interview Techniques

### Subject-Identification Technique

**Purpose:** Identify **subjects** (person, place, thing, event) in a participant's response.

**How:** Listen for **nouns** that represent a person, place, thing, or event. Ignore nouns that are characteristics (for now). List each subject once.

**Pattern:** Person ("account representative"), Place ("showroom"), Thing ("merchandise"), Event ("appointment").

**Use:** Generate follow-up questions; later define **tables** (Chapter 7).

**Example:** "I'm responsible for ten clients... I write up a sales order... give it to my assistant" → subjects: Clients, Sales Order, Assistant, Merchandise, etc.

### Characteristic-Identification Technique

**Purpose:** Identify **characteristics** (attributes) of a subject — these become **fields**.

**How:** Pick a subject; ask follow-up questions. Listen for nouns that describe aspects of that subject. Characteristics often in singular form ("phone number"); subject nouns often possessive ("client's phone number").

**Critical:** Keep characteristics on a **separate list** from subjects. Do not mix them. (Reason becomes clear in Chapter 7.)

**Pattern:** For "client" → Name, Address, Phone Number, Email, etc.

---

## Interview Flow: Users First, Then Management

**Users first** — They have the clearest picture of daily operations. Their answers help you understand management's responses.

### User Interview — Four Issue Areas

| Area | Focus |
|------|-------|
| **Data type & usage** | What data do they use? How? Open-ended → Subject-ID → Characteristic-ID. |
| **Review samples** | How is each sample used? Write description; attach to sample. Never assume (e.g., clarify "SRP"). Complex samples = multiple subjects. |
| **Current info requirements** | Does user control the data behind reports they receive? If not, trace origin. Follow-up questions crucial. |
| **Additional & future** | What extra info do they need now? In future? Note on reports (sticky notes). Sketch new reports; identify subjects/characteristics. |

### Management Interview — Four Issue Areas

| Area | Focus |
|------|-------|
| **Current** | What reports do they receive? Any missing from your samples? Get new samples. |
| **Additional** | Supplemental info needed? Note on reports. |
| **Future** | Info needed as org evolves? Sketch new reports. |
| **Overall** | Generic class of info org needs? Any data org must maintain that wasn't discussed? |

---

## Compiling the Field Lists

### Preliminary Field List — Two-Step Refinement

**Step 1 — Refine characteristics list:**
- **Same name, different subject:** "Name" for Client vs. Employee → rename: "Client Name," "Employee Name"
- **Same characteristic, different names:** "Product #," "Product No." → keep clearest; remove duplicates
- **Subject vs. characteristic:** If item is a subject (collection, can be broken down), move to subjects list; identify its characteristics

**Step 2 — Check samples:**
- Highlight every characteristic on each sample
- Cross out those already on list
- Rename generic items (Name → Contact Name) if needed
- Add remaining to list

### Value List

Record characteristics that have **value lists** (enumerated acceptable values) — e.g., Ship Via: FedEx, UPS, DHL. Often enforces business rules. Use when defining field specs (Ch 9) and business rules (Ch 11).

### Calculated Field List

**Remove** calculated fields (string concatenation or math expression result) from Preliminary Field List. Place on **Calculated Field List**.

**Signals:** Names with amount, total, sum, average, minimum, maximum, count. Examples: Subtotal, Average Age, Customer Count.

### Final Review

Brief interviews with users and management to verify completeness. Add omissions. Date lists. Strive for completeness — some additions/deletions are inevitable as design progresses.

---

## Memory Aids

| Concept | Key point |
|---------|-----------|
| **Don't adopt** | Never use current structure as basis for new |
| **3 steps** | Collect → Present → Interview |
| **Subjects** | Nouns = person, place, thing, event. Separate list. |
| **Characteristics** | Nouns = attributes of subject. Separate list. Fields. |
| **Users first** | Then management |
| **Two lists** | Preliminary Field List (core) + Calculated Field List |
| **Unique names** | "Name" → "Client Name," "Employee Name" (subject prefix) |

---

## Quick Reference: Information Requirement Types

- **Current** — What they receive now; trace data origin
- **Additional** — What they need that's missing
- **Future** — What they'll need as org evolves
- **Overall** (management) — Generic class of info org needs
