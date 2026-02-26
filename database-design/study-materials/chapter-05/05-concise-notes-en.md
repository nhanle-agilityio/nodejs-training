# Chapter 5: Starting the Process — Study Notes (Expanded)

*Detailed notes for studying, reviewing, and explaining Phase 1 concepts*

---

## What This Chapter Covers

Chapter 5 is about **Phase 1** of the design process: defining the **mission statement** (why the database exists) and **mission objectives** (what tasks it supports). You define the end result first — this gives you focus and direction for the entire design. Interviews are the primary tool for gathering this information.

---

## The Role of Interviews

### Why Interviews Matter

Interviews provide three things you cannot get elsewhere:
1. **A communication link** — Direct exchange with people who will use or own the database
2. **Design success** — Their input directly affects whether your design meets real needs
3. **Critical details** — e.g., relationship participation (mandatory/optional, min/max records) often requires asking users or management

**Important:** Never skip interviews. Missing one = missing information that could harm your final structure. For solo or small projects, conduct "self-interviews" (you are both interviewer and interviewee).

### Participant Guidelines (Setting Expectations)

Before interviewing, establish expectations for participants:
- **Make intentions clear** — Tell them the subject, who else joins, start time, whether it's part of a series. Reassure it's not a performance review. This builds trust.
- **Show appreciation** — Their input often goes unnoticed in other projects. Acknowledging value motivates them. In follow-up interviews, show how you used their earlier input — very effective.
- **You are the arbitrator** — Disputes will arise. As the developer, you make final calls on database-related matters. Refer non-database disputes to the appropriate authority.

### Interviewer Guidelines (Your Responsibilities)

| Guideline | What It Means |
|-----------|---------------|
| **Limit participants** | Large groups increase intimidation (people fear looking ignorant in front of colleagues). Smaller groups = more relaxed, better participation. |
| **Separate users and management** | Each group has a different perspective on the org and data use. Separating lets you leverage both. Also avoids conflicts when they disagree. |
| **Prepare questions** | Don't wing it. Prepared questions give focus, direction, and continuity. |
| **Use open-ended questions** | "How do you feel about our service?" (open) vs. "Was service poor, average, or good?" (closed). Open-ended elicits richer, more elaborate answers. Use closed questions sparingly. |
| **Handle note-taking** | Assign a transcriber, record (with permission), or enlist a participant. You need a detailed record. |
| **Give equal attention** | Boredom or preoccupation reduces participation. Sincere interest encourages it. |
| **Maintain control** | **Most important guideline.** Lose control → things go wrong. Redirect off-topic discussion. If someone dominates, politely explain you need everyone's input. |

---

## Mission Statement

### Definition

A mission statement **declares the specific purpose** of the database in general terms. It answers: *Why does this database exist?*

### Characteristics of a Good Mission Statement

- **Unambiguous** — No room for misinterpretation
- **Succinct** — Verbose statements obscure purpose
- **No specific tasks** — Save task descriptions for mission objectives

**Analogy:** Like a candle flame at the end of a tunnel — it guides you through the design process.

### Composing a Mission Statement

1. **Interview** the owner or manager (or designated staff)
2. **Learn about the organization** — Encourage broad discussion. The more you understand, the better your design.
3. **Translate need into one sentence** — Use open-ended questions such as: "What is the main focus of your organization?" or "How would you describe the purpose of your organization to a new client?"

**Complete when:** The sentence describes the specific purpose and is **understood and agreed upon** by everyone concerned. You must learn about the organization — you cannot compose a good mission statement without that understanding.

### Example: Poor vs. Good

**Poor:** "The purpose of the database is to keep track of applications, applicants, hearings, decisions, appeals, employees, and office data." (Lists tasks; purpose unclear)

**Good:** "The purpose of the database is to maintain the data the office uses to make decisions on land-use requests." (Clear purpose; succinct)

---

## Mission Objectives

### Definition

Mission objectives are **statements that represent general tasks** supported by the data in the database. Each objective = **one task**. They answer: *What will users do with this data?*

### Characteristics of a Good Mission Objective

- **Declarative sentence** — Clearly defines a general task
- **No unnecessary details** — Keep it high-level
- **General terms** — Succinct, unambiguous
- **One task per objective** — If you see two tasks, split into two objectives

### Composing Mission Objectives

1. **Interview** users and management (separately)
2. **Focus on general discussions** — Conceptual, not analytical. You're not dissecting the current DB; you're learning what tasks the DB should support.
3. **Ask open-ended questions** — e.g., "What kind of work do you perform daily?" "What types of things do you keep track of?" "What types of reports do you generate?"
4. **Record responses as declarative sentences** — Easier to convert into mission objectives
5. **Look for implicit information** — "Reading between the lines." Not everything is stated directly. A response about booking clients may imply: need for entertainer info, need for engagement details.

### Deriving Objectives

Objectives can be derived **explicitly** (subject stated in the response) or **implicitly** (inferred). Pay attention to both.

**Complete when:** Each objective is properly defined, well defined, and makes sense to you and stakeholders.

### Example: Poor vs. Good

**Poor:** "We need to keep track of entertainers, the type of entertainment they provide, and the engagements we book." (Two tasks + unnecessary detail)

**Good:** "Maintain complete entertainer information." / "Keep track of all engagements we book." (Two objectives; one task each; clear)

---

## How Mission Statement and Objectives Connect

- **Mission statement** = The "why" — purpose of the database
- **Mission objectives** = The "what" — tasks users perform with the data
- Staff's daily work tasks often **become** mission objectives
- Both guide table structures, fields, relationships, views, integrity, and business rules

---

## Memory Aids

| Concept | Key Point |
|---------|-----------|
| **Interviews** | Never skip. Provide critical info; maintain control. |
| **Open vs. closed** | Open = rich answers; closed = limited. Prefer open. |
| **Separate groups** | Users and management have different perspectives. |
| **Mission statement** | One sentence: purpose. No tasks. Must learn org first. |
| **Mission objectives** | One task per objective. Look for implicit + explicit. |
| **Complete when** | Statement: agreed by all. Objectives: properly + well defined. |

---

## Quick Reference: Sample Questions

**For mission statement:** "What is the single most important function of your organization?" / "How would you describe the purpose of your organization to a new client?"

**For mission objectives:** "What kind of work do you perform daily?" / "What types of things do you keep track of?" / "What types of reports do you generate?"
