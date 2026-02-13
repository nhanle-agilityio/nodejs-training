# Chapter 11: Try It Yourself — Exercises & Solutions

## Exercise 1

**Task:** Using the New York City taxi data, calculate the length of each ride using the pickup and drop-off timestamps. Sort the query results from the longest ride to the shortest. Do you notice anything about the longest or shortest trips that you might want to ask city officials about?

### Suggested Solution

```sql
SELECT trip_id,
       tpep_pickup_datetime,
       tpep_dropoff_datetime,
       tpep_dropoff_datetime - tpep_pickup_datetime AS trip_length
FROM nyc_yellow_taxi_trips_2016_06_01
ORDER BY trip_length DESC;
```

**Observations:** Very long trips may be overnight or data errors; very short trips may be cancellations or meter issues. Worth checking with officials.

---

## Exercise 2

**Task:** Using the AT TIME ZONE keywords, write a query that displays the date and time for London, Johannesburg, Moscow, and Melbourne the moment January 1, 2100, arrives in New York City.

### Suggested Solution

```sql
SELECT ('2100-01-01 00:00:00'::timestamp AT TIME ZONE 'America/New_York')
           AT TIME ZONE 'Europe/London' AS london,
       ('2100-01-01 00:00:00'::timestamp AT TIME ZONE 'America/New_York')
           AT TIME ZONE 'Africa/Johannesburg' AS johannesburg,
       ('2100-01-01 00:00:00'::timestamp AT TIME ZONE 'America/New_York')
           AT TIME ZONE 'Europe/Moscow' AS moscow,
       ('2100-01-01 00:00:00'::timestamp AT TIME ZONE 'America/New_York')
           AT TIME ZONE 'Australia/Melbourne' AS melbourne;
```

---

## Exercise 3 (Bonus)

**Task:** Use the statistics functions in Chapter 10 to calculate the correlation coefficient and r-squared values using trip time and the `total_amount` column in the New York City taxi data. Do the same with the `trip_distance` and `total_amount` columns. Limit the query to rides that last three hours or less.

### Suggested Solution

```sql
-- Correlation: trip time vs total_amount
SELECT round(corr(
    extract(epoch from (tpep_dropoff_datetime - tpep_pickup_datetime)),
    total_amount
)::numeric, 2) AS trip_time_amount_r,
round(regr_r2(
    extract(epoch from (tpep_dropoff_datetime - tpep_pickup_datetime)),
    total_amount
)::numeric, 3) AS trip_time_amount_r2
FROM nyc_yellow_taxi_trips_2016_06_01
WHERE tpep_dropoff_datetime - tpep_pickup_datetime <= interval '3 hours';

-- Correlation: trip_distance vs total_amount
SELECT round(corr(trip_distance, total_amount)::numeric, 2) AS distance_amount_r,
       round(regr_r2(trip_distance, total_amount)::numeric, 3) AS distance_amount_r2
FROM nyc_yellow_taxi_trips_2016_06_01
WHERE tpep_dropoff_datetime - tpep_pickup_datetime <= interval '3 hours';
```
