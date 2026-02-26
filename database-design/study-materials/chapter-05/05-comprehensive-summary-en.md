# Chapter 5: Starting the Process — Comprehensive Summary

*Database Design for Mere Mortals®, 25th Anniversary Edition — Fourth Edition*

---

## Overview

Chapter 5 covers **Phase 1** of the database design process: defining the **mission statement** and **mission objectives**. You "start" by defining the end result — the purpose of the database and the tasks it will support. Both provide focus and direction for the design.

**Note:** The book includes guidance for conducting interviews via meeting platforms (Skype, Zoom, Teams, Google Meet, etc.), reflecting remote work and WFH scenarios. The chapter focuses on conceptual issues; platform-specific how-to is left to vendor documentation.

---

## 1. Conducting Interviews

### Why Interviews Matter

Interviews are an **integral part** of database design and play a key role during certain phases:

- **Communication link** — Between you (the developer) and the people for whom you're designing
- **Design success** — Help ensure your design efforts succeed
- **Critical information** — Affect the design of the database structure (e.g., participation type/degree for relationships)
- **Tool** — Gather new insights, clarify facts you don't understand

**Rule:** Always conduct **each** interview in the design process — regardless of database type or number of people. Neglecting or omitting interviews leads to missing important information and can adversely affect the final structure.

**Small organizations / self:** Conduct "self-interviews" — you act as both interviewer and interviewee.

**Skill:** Interviewing is learnable with patience, diligence, and practice.

---

### Participant Guidelines (For the People You Interview)

| Guideline | Purpose |
|-----------|---------|
| **Make intentions clear** | Tell participants the subject, who else participates, start time, whether part of a series. Reassure that it's not a performance assessment. Builds trust. |
| **Appreciate participation** | Let them know their responses are valuable. Many believe their input goes unnoticed — acknowledging it increases motivation and engagement. Showing how you've used earlier contributions (in follow-up interviews) is very effective. |
| **Establish yourself as arbitrator** | Minor disputes will arise. As developer, you have an objective viewpoint. Your decisions serve the database structure. Refer non-database disputes to appropriate authority. |

---

### Interviewer Guidelines (For You)

| Guideline | Details |
|-----------|---------|
| **Choose meeting platform** | Skype, Zoom, WebEx, Teams, Google Meet. Use org's standard if applicable. For small orgs, pick the most intuitive for your audience. |
| **Limit participants** | Reasonable, practical limit per interview. Large groups → intimidation rises (fear of looking ignorant in front of colleagues). Fewer = more relaxed, easier participation. |
| **Separate users and management** | Each group has different perspective on org and how data is used. Separating allows leverage of unique perspectives. Avoids conflicts when groups disagree. Lack of communication between them can complicate interviews — judge based on your knowledge of the org. |
| **Prepare questions beforehand** | Provides focus, direction, continuity. Interview flows smoothly. Coming up with questions off the top of your head is rarely a good idea. |
| **Use open-ended questions** | Open-ended allows varied, elaborate answers (e.g., "How do you feel about our service?"). Closed questions supply their own responses and limit answers (e.g., "Was service poor, average, or good?"). Use closed questions sparingly, intentionally. |
| **Note-taking** | Assign a transcriber, or record (notify participants first — privacy/confidentiality). Or enlist a participant as note-taker. Detailed record is important. |
| **Give equal attention** | Pay complete attention to the speaker. Boredom or preoccupation reduces participation; interest encourages it. |
| **Handle vague answers** | Be patient. Try restating your best approximation and asking if that's what they meant. |
| **Keep pace** | Set personal time limits per question/topic. Don't inform participants; table points to proceed. Follow up with owner afterward for resolution. |
| **Maintain control** | **Single most important guideline.** Lose control → things go wrong. Redirect off-topic discussion. If someone dominates, politely explain you need feedback from all participants. Exclude if necessary. |

---

## 2. Defining the Mission Statement

### Purpose

- Declares the **specific purpose** of the database in general terms
- Provides **focus** for design efforts
- Prevents diversion into unnecessarily large or complex structures

### Characteristics of a Well-Written Mission Statement

1. **Unambiguous**
2. **Succinct and to the point** — Verbose statements confuse and obscure purpose
3. **Free of phrases that describe specific tasks** — Save those for mission objectives

**Analogy:** A mission statement is like a candle flame at the end of a dark tunnel — it guides you to the end of the design process.

### Poor vs. Good Example

**Poor (verbose, lists tasks, unclear purpose):**
> "The purpose of the Whatcom County Hearing Examiner's database is to keep track of applications for land use, maintain data on applicants, keep a record of all hearings, keep a record of all decisions, keep a record of all appeals, maintain data on department employees, and maintain data for general office use."

**Better (clear purpose, succinct):**
> "The purpose of the Whatcom County Hearing Examiner's database is to maintain the data the examiner's office uses to make decisions on land-use requests submitted by citizens of Whatcom County."

### Composing a Mission Statement

**Process:**
1. Conduct interview with **owner or manager** (or staff they designate)
2. **Learn about the organization** — Encourage discussion of many facets, even if not directly DB-related. More understanding = better design.
3. **Determine purpose** — Use open-ended questions. Translate need into a mission statement.

**Sample questions:**
- How would you describe the purpose of your organization to a new client?
- What is the major function of your organization?
- How would you define the single most important reason for the existence of your organization?
- What is the main focus of your organization?

**Key:** Mission statement is complete when you have a sentence that **describes the specific purpose** and is **understood and agreed upon by everyone concerned**. Different groups phrase differently; industry terminology may vary.

---

## 3. Defining the Mission Objectives

### Purpose

Mission objectives are **statements that represent general tasks** supported by the data in the database. Each objective = **one task**.

**Use throughout design:** Table structures, field specifications, relationship characteristics, views, data integrity, business rules. They guide development and ensure the final structure supports the mission statement.

### Characteristics of a Well-Written Mission Objective

1. **Declarative sentence** that clearly defines a general task
2. **Free from unnecessary details**
3. **Expressed in general terms**
4. **Succinct and to the point**
5. **Unambiguous**

**Rule:** If an objective describes **more than one task**, decompose it into two or more objectives.

### Poor vs. Good Example

**Poor (two tasks, unnecessary detail):**
> "We need to keep track of the entertainers we represent and the type of entertainment they provide, as well as the engagements that we book for them."

**Better (two separate objectives):**
> "Maintain complete entertainer information."  
> "Keep track of all the engagements we book."

### Composing Mission Objectives

**Process:**
1. Conduct interviews with **users and management**
2. **General discussions** — Conceptual, not analytical. Not analyzing current DB; getting overall idea of tasks the DB should support.
3. Ask open-ended questions about daily work, org function, what the DB should address
4. Record responses as **declarative sentences** — Easier to transform into mission objectives
5. **Look for implicit information** — "Reading between the lines." Explicit subjects are stated; implicit ones require inference (e.g., response about booking clients implies need for entertainer info and engagement details)

**Sample questions:**
- What kind of work do you perform on a daily basis?
- What kind of data do you work with?
- What types of reports do you generate?
- What types of things do you keep track of?
- How would you describe the type of work you do?

**Bottom line:** Mission objectives must be both **properly defined** and **well defined**; make sense to you and stakeholders; and capture **implicit** as well as explicit information from responses.

### Deriving Mission Objectives

Mission objectives can be derived from responses **explicitly** (subject stated directly) or **implicitly** (inferred from context).

**Complete when:** Properly defined, well defined, makes sense to you and those you're designing for.

---

## Review Questions (Self-Check)

1. Why are interviews important?
2. What problem can arise when you conduct an interview with a large number of people?
3. What is the primary reason for conducting separate interviews with users and management?
4. True or False: You'll commonly use closed questions in your interviews.
5. What kind of responses should you try to evoke from the interview participants?
6. What is the single most important guideline for every interview you conduct?
7. What is a mission statement?
8. State two characteristics of a well-written mission statement.
9. True or False: You need not learn about the organization to compose a mission statement.
10. When is your mission statement complete?
11. What is a mission objective?
12. State two characteristics of a well-written mission objective.
13. True or False: You should interview users and management to help you define mission objectives.
14. How does the staff's daily work relate to the mission objectives?
15. True or False: A mission objective can describe more than one task.
16. State two ways that a mission objective can be derived from a response.
17. When is a mission objective complete?

### Answers

1. They provide a communication link between you and stakeholders, help ensure design success, and provide critical information that affects the database structure.
2. The intimidation level of some participants rises in direct proportion to the number of participants.
3. Each group has a different perspective on the organization and how it uses data on a daily basis.
4. **False.** You'll commonly use **open-ended** questions.
5. **Complete, descriptive responses.**
6. **Always maintain control** of the interview.
7. A mission statement **declares the specific purpose** of the database in general terms.
8. Any two of: unambiguous; succinct and to the point; free of phrases that explicitly describe specific tasks.
9. **False.** You **must** learn about the organization.
10. When you have a sentence that describes the specific purpose and is **understood and agreed upon by everyone concerned**.
11. A statement that represents a **single, general task** supported by the data maintained in the database.
12. Any two of: declarative sentence, clearly defines general task, free from unnecessary details; expressed in general terms; succinct; unambiguous.
13. **True.**
14. Many of the tasks they perform **will become mission objectives**.
15. **False.** Each objective represents **one** task.
16. **Explicitly** (stated in response) or **implicitly** (inferred).
17. When it is both **properly defined and well defined**, and makes sense to you and those you're designing for.

---

## Learning Outcomes Alignment

After studying this chapter, you should be able to:
- **Conduct effective interviews** using participant and interviewer guidelines
- **Define a mission statement** that clearly states database purpose
- **Define mission objectives** that represent user tasks and guide the design process

*Proceed to Chapter 6: Analyzing the Current Database*
