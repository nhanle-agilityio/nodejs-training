# Chapter 2: Try It Yourself — Exercises & Solutions

## Exercise 1

**Task:** The school district superintendent asks for a list of teachers in each school. Write a query that lists the schools in alphabetical order along with teachers ordered by last name A–Z.

### Suggested Solution

```sql
SELECT school, first_name, last_name
FROM teachers
ORDER BY school ASC, last_name ASC;
```

---

## Exercise 2

**Task:** Write a query that finds the one teacher whose first name starts with the letter S and who earns more than $40,000.

### Suggested Solution

```sql
SELECT first_name, last_name, school, salary
FROM teachers
WHERE first_name LIKE 'S%' AND salary > 40000;
```

**Note:** Use `ILIKE 'S%'` for case-insensitive matching in PostgreSQL.

---

## Exercise 3

**Task:** Rank teachers hired since January 1, 2010, ordered by highest paid to lowest.

### Suggested Solution

```sql
SELECT first_name, last_name, school, hire_date, salary
FROM teachers
WHERE hire_date >= '2010-01-01'
ORDER BY salary DESC;
```
