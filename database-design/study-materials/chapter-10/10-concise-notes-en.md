# Chapter 10: Table Relationships — Study Notes

*Quick reference for relationship establishment*

---

## Three Relationship Types

| Type | Definition | Establish |
|------|------------|-----------|
| **1:1** | One A ↔ one B | Copy parent PK into child as FK |
| **1:N** | One A ↔ many B; one B ↔ one A | Copy parent PK into child as FK |
| **M:N** | One A ↔ many B; one B ↔ many A | **Linking table** |

---

## Linking Table (M:N)

1. Create table with copies of both PKs → composite PK + two FKs
2. Name (e.g., STUDENT CLASSES)
3. Add to Final Table List (type = Linking)

**Result:** M:N → two 1:N (A ↔ Linking ↔ B)

**Fields in linking table:** When QUOTE PRICE, QTY relate to order+product, move from ORDERS to ORDER DETAILS.

---

## Self-Referencing

| Type | Example | Method |
|------|---------|--------|
| 1:1 | Member sponsors one member | SPONSOR ID (FK) |
| 1:N | Staff manages staff | MANAGER ID (FK) |
| M:N | Part comprises parts | PART COMPONENTS (linking) |

---

## Identifying Relationships

**Table matrix** — tables across top and left. Ask:

- Associative: *Can single (A) associate with one or more (B)?*
- Contextual: *Can single order contain one or more products?*

**Formulas:** 1:1+1:1=1:1 | 1:N+1:1=1:N | 1:N+1:N=M:N

---

## Elements of a Foreign Key

1. **Same name** as parent PK (except self-ref)
2. **Replica** spec (modify: Type=Replica, Source=parent PK, Description)
3. **Values from** parent PK only

**Logical for FK:** Key Type=Foreign; Uniqueness=Non-unique (1:N) or Unique (1:1); Values Entered By=User; Range=existing PK; Edit Rule=Enter Now, Edits Allowed

---

## Relationship Characteristics

### Deletion Rule

Deny | Restrict (default) | Cascade | Nullify | Set Default

### Type of Participation

Mandatory (|) | Optional (○)

### Degree of Participation

(min, max) or (min, N) for unlimited

---

## Checklist

1. Relationships identified
2. Relationships established
3. FK comply with Elements
4. Deletion rule set
5. Type of participation set
6. Degree of participation set

---

## Memory Aids

| Concept | Key point |
|---------|-----------|
| **M:N** | Resolve with linking table |
| **FK name** | Same as parent PK (except self-ref) |
| **Deletion** | Restrict by default |
| **Linking table** | Composite PK from both tables |
