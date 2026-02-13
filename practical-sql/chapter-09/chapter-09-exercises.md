# Chapter 9: Try It Yourself — Exercises & Solutions

## Context

The `meat_poultry_egg_inspect` table has an `activities` column with text like:
- "Poultry Processing, Poultry Slaughter"
- "Meat Processing, Poultry Processing"

**Goal:** Count how many plants process meat and how many process poultry.

---

## Exercise 1

**Task:** Create two new columns called `meat_processing` and `poultry_processing` in your table. Each can be of the type boolean.

### Suggested Solution

```sql
ALTER TABLE meat_poultry_egg_inspect
ADD COLUMN meat_processing boolean,
ADD COLUMN poultry_processing boolean;
```

---

## Exercise 2

**Task:** Using UPDATE, set `meat_processing = TRUE` on any row where the `activities` column contains the text "Meat Processing". Do the same update on the `poultry_processing` column, but this time look for the text "Poultry Processing" in activities.

### Suggested Solution

```sql
UPDATE meat_poultry_egg_inspect
SET meat_processing = TRUE
WHERE activities ILIKE '%Meat Processing%';

UPDATE meat_poultry_egg_inspect
SET poultry_processing = TRUE
WHERE activities ILIKE '%Poultry Processing%';
```

---

## Exercise 3

**Task:** Use the data from the new, updated columns to count how many plants perform each type of activity. For a bonus challenge, count how many plants perform both activities.

### Suggested Solution

```sql
SELECT count(*) FILTER (WHERE meat_processing) AS meat_plants,
       count(*) FILTER (WHERE poultry_processing) AS poultry_plants,
       count(*) FILTER (WHERE meat_processing AND poultry_processing) AS both_plants
FROM meat_poultry_egg_inspect;
```

**Alternative (without FILTER):**
```sql
SELECT count(*) AS meat_plants FROM meat_poultry_egg_inspect WHERE meat_processing;
SELECT count(*) AS poultry_plants FROM meat_poultry_egg_inspect WHERE poultry_processing;
SELECT count(*) AS both_plants FROM meat_poultry_egg_inspect 
WHERE meat_processing AND poultry_processing;
```
