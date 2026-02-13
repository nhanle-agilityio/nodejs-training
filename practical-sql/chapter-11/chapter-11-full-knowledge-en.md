# Chapter 11: Working with Dates and Times

## Introduction

Columns filled with dates and times can indicate when events happened or how long they took, and that can lead to interesting lines of inquiry. What patterns exist in the moments on a timeline? Which events were shortest or longest? What relationships exist between a particular activity and the time of day or season in which it occurred?

In this chapter, we'll explore these kinds of questions using SQL data types for dates and times and their related functions. We'll start with a closer look at data types and functions related to dates and times. Then we'll explore a data set that contains information on trips by New York City taxicabs to look for patterns and try to discover what, if any, story the data tells. We'll also explore time zones using Amtrak data to calculate the duration of train trips across the United States.

## Data Types and Functions for Dates and Times

Chapter 3 explored primary SQL data types, but to review, here are the four data types related to dates and times:

### date
- Records only the date.
- PostgreSQL accepts several date formats. For example, valid formats for adding the 21st day of September 2018 are `September 21, 2018` or `9/21/2018`.
- **Recommended format:** `YYYY-MM-DD` (e.g., `2018-09-21`), the ISO 8601 international standard format and also the default PostgreSQL date output.
- Using the ISO format helps avoid confusion when sharing data internationally.

### time
- Records only the time.
- Adding `with time zone` makes the column time zone aware.
- ISO 8601 format: `HH:MM:SS`, where HH = hour, MM = minutes, SS = seconds.
- Optional time zone designator; e.g., 2:24 pm in San Francisco during standard time: `14:24 PST`.

### timestamp
- Records the date and time.
- Add `with time zone` to make the column time zone aware.
- PostgreSQL shorthand: `timestamptz` = `timestamp with time zone`.
- Format: `YYYY-MM-DD HH:MM:SS TZ`.
- Time zones can be specified in three formats: UTC offset, area/location designator, or standard abbreviation.

### interval
- Holds a value representing a unit of time in the format `quantity unit`.
- Does not record start or end of a period, only its duration.
- Examples: `12 days`, `8 hours`.

### Key Behaviors

- **date**, **time**, and **timestamp** are *datetime* types; their values are *datetimes*.
- **interval** is an *interval* type; its values are *intervals*.
- All four types track the system clock and calendar nuances (e.g., June has 30 days; June 31 is invalid; February 29 valid only in leap years).

## Manipulating Dates and Times

We can use SQL functions to perform calculations on dates and times or extract components from them. ANSI SQL outlines a handful of functions, but many database managers deviate from the standard. If you're using a database other than PostgreSQL, check its documentation.

### Extracting Components: `date_part(text, value)`

**Syntax:**
```sql
date_part(text, value)
```

- First input: string naming the part to extract (`year`, `month`, `day`, `hour`, `minute`, `week`, `quarter`, `epoch`, etc.).
- Second input: date, time, or timestamp value.

**Example (Listing 11-1):**
```sql
SELECT
    date_part('year', '2019-12-01 18:37:12 EST'::timestamptz) AS "year",
    date_part('month', '2019-12-01 18:37:12 EST'::timestamptz) AS "month",
    date_part('day', '2019-12-01 18:37:12 EST'::timestamptz) AS "day",
    date_part('hour', '2019-12-01 18:37:12 EST'::timestamptz) AS "hour",
    date_part('minute', '2019-12-01 18:37:12 EST'::timestamptz) AS "minute",
    date_part('seconds', '2019-12-01 18:37:12 EST'::timestamptz) AS "seconds",
    date_part('timezone_hour', '2019-12-01 18:37:12 EST'::timestamptz) AS "tz",
    date_part('week', '2019-12-01 18:37:12 EST'::timestamptz) AS "week",
    date_part('quarter', '2019-12-01 18:37:12 EST'::timestamptz) AS "quarter",
    date_part('epoch', '2019-12-01 18:37:12 EST'::timestamptz) AS "epoch";
```

**Output (Eastern time zone):**

| year | month | day | hour | minute | seconds | tz  | week | quarter | epoch     |
|------|-------|-----|------|--------|---------|-----|------|---------|-----------|
| 2019 | 12    | 1   | 18   | 37     | 12      | -5  | 48   | 4       | 1575243432 |

**Notes:**
- `tz`: UTC offset (e.g., EST = -5). PostgreSQL reports the offset, not the name.
- **week**: ISO 8601 (weeks start Monday). A week can span December into January.
- **quarter**: 1–4.
- **epoch**: Seconds since 12 am, January 1, 1970 UTC. Used for absolute timestamp math.

**Alternative: `extract()`**
```sql
extract('year' from '2019-12-01 18:37:12 EST'::timestamptz)
```
- Same logic as `date_part()`, but `extract()` is less widely supported (e.g., absent in SQL Server).

### Creating Datetime Values from Components

Use when year, month, and day (and optionally time) exist in separate columns:

| Function | Returns | Example |
|----------|---------|---------|
| `make_date(year, month, day)` | `date` | `make_date(2018, 2, 22)` → `2018-02-22` |
| `make_time(hour, minute, seconds)` | `time` (no TZ) | `make_time(18, 4, 30.3)` → `18:04:30.3` |
| `make_timestamptz(year, month, day, hour, minute, second, time zone)` | `timestamptz` | `make_timestamptz(2018, 2, 22, 18, 4, 30.3, 'Europe/Lisbon')` |

**Listing 11-2:**
```sql
SELECT make_date(2018, 2, 22);
SELECT make_time(18, 4, 30.3);
SELECT make_timestamptz(2018, 2, 22, 18, 4, 30.3, 'Europe/Lisbon');
```

**Output (client in US Eastern):**
```
2018-02-22
18:04:30.3
2018-02-22 13:04:30.3-05
```
- Lisbon (18:04) is 5 hours ahead of Eastern, so output shows 13:04 Eastern.

### Retrieving Current Date and Time

These record the time at the **start** of the query (or transaction):

| Function | Returns |
|----------|---------|
| `current_date` | Current date |
| `current_time` | Current time with time zone |
| `current_timestamp` | Current timestamp with time zone |
| `now()` | PostgreSQL shorthand for `current_timestamp` |
| `localtime` | Current time without time zone |
| `localtimestamp` | Current timestamp without time zone |

**PostgreSQL-specific:** `clock_timestamp()` — records time as it elapses during query execution (e.g., each row gets the actual update time). Can slow large queries.

**Listing 11-3:**
```sql
CREATE TABLE current_time_example (
    time_id bigserial,
    current_timestamp_col timestamp with time zone,
    clock_timestamp_col timestamp with time zone
);

INSERT INTO current_time_example (current_timestamp_col, clock_timestamp_col)
(SELECT current_timestamp, clock_timestamp()
 FROM generate_series(1, 1000));

SELECT * FROM current_time_example;
```
- `current_timestamp_col`: Same for all rows.
- `clock_timestamp_col`: Increases with each row inserted.

## Working with Time Zones

### Finding Your Time Zone

```sql
SHOW timezone;
-- e.g., US/Eastern
```

```sql
SHOW ALL;  -- All server parameters
```

### Listing Time Zones

```sql
SELECT * FROM pg_timezone_abbrevs;
SELECT * FROM pg_timezone_names;
```

Filter by region:
```sql
SELECT * FROM pg_timezone_names WHERE name LIKE 'Europe%';
```

Columns include `name`, `abbrev`, `utc_offset`, `is_dst`.

### Setting the Time Zone (Per Session)

```sql
SET timezone TO 'US/Pacific';
```

- Change lasts for the session.
- Affects how timestamps are displayed.

### Using `AT TIME ZONE`

View a timestamp in a different time zone without changing the session:

```sql
SELECT test_date AT TIME ZONE 'Asia/Seoul' FROM time_zone_test;
```

- If input is `timestamptz`, output is `timestamp` (without TZ).
- If input has no TZ, output is `timestamptz`.

**Listing 11-6:**
```sql
SET timezone TO 'US/Pacific';
CREATE TABLE time_zone_test (test_date timestamp with time zone);
INSERT INTO time_zone_test VALUES ('2020-01-01 4:00');

SELECT test_date FROM time_zone_test;
-- 2020-01-01 04:00:00-08

SET timezone TO 'US/Eastern';
SELECT test_date FROM time_zone_test;
-- 2020-01-01 07:00:00-05  (4am Pacific = 7am Eastern)

SELECT test_date AT TIME ZONE 'Asia/Seoul' FROM time_zone_test;
-- 2020-01-01 21:00:00  (4am Pacific = 9pm Seoul)
```

## Calculations with Dates and Times

Arithmetic works with datetime and interval types using `+`, `-`, `*`, `/`.

**Examples:**
```sql
SELECT '9/30/1929'::date - '9/27/1929'::date;   -- 3 (days)
SELECT '9/30/1929'::date + '5 years'::interval; -- 9/30/1934
```

Subtracting two timestamps produces an **interval**.

## Finding Patterns in New York City Taxi Data

### Creating and Loading the Table

**Listing 11-7:**
```sql
CREATE TABLE nyc_yellow_taxi_trips_2016_06_01 (
    trip_id bigserial PRIMARY KEY,
    vendor_id varchar(1) NOT NULL,
    tpep_pickup_datetime timestamp with time zone NOT NULL,
    tpep_dropoff_datetime timestamp with time zone NOT NULL,
    passenger_count integer NOT NULL,
    trip_distance numeric(8,2) NOT NULL,
    pickup_longitude numeric(18,15) NOT NULL,
    pickup_latitude numeric(18,15) NOT NULL,
    rate_code_id varchar(2) NOT NULL,
    store_and_fwd_flag varchar(1) NOT NULL,
    dropoff_longitude numeric(18,15) NOT NULL,
    dropoff_latitude numeric(18,15) NOT NULL,
    payment_type varchar(1) NOT NULL,
    fare_amount numeric(9,2) NOT NULL,
    extra numeric(9,2) NOT NULL,
    mta_tax numeric(5,2) NOT NULL,
    tip_amount numeric(9,2) NOT NULL,
    tolls_amount numeric(9,2) NOT NULL,
    improvement_surcharge numeric(9,2) NOT NULL,
    total_amount numeric(9,2) NOT NULL
);

COPY nyc_yellow_taxi_trips_2016_06_01 (
    vendor_id, tpep_pickup_datetime, tpep_dropoff_datetime, passenger_count,
    trip_distance, pickup_longitude, pickup_latitude, rate_code_id,
    store_and_fwd_flag, dropoff_longitude, dropoff_latitude, payment_type,
    fare_amount, extra, mta_tax, tip_amount, tolls_amount, improvement_surcharge, total_amount
)
FROM 'C:\YourDirectory\yellow_tripdata_2016_06_01.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ',');

CREATE INDEX tpep_pickup_idx ON nyc_yellow_taxi_trips_2016_06_01 (tpep_pickup_datetime);
```

- Row count after import: 368,774.
- Key columns: `tpep_pickup_datetime`, `tpep_dropoff_datetime`.
- Timestamps include time zone (e.g., -4 for Eastern DST).

For matching book results:
```sql
SET timezone TO 'US/Eastern';
```

### The Busiest Time of Day

**Listing 11-8:**
```sql
SELECT
    date_part('hour', tpep_pickup_datetime) AS trip_hour,
    count(*)
FROM nyc_yellow_taxi_trips_2016_06_01
GROUP BY trip_hour
ORDER BY trip_hour;
```

- Returns 24 rows (0–23).
- Peak typically between 6 pm and 10 pm on June 1, 2016.

### Exporting to CSV for Visualization

**Listing 11-9:**
```sql
COPY (
    SELECT date_part('hour', tpep_pickup_datetime) AS trip_hour, count(*)
    FROM nyc_yellow_taxi_trips_2016_06_01
    GROUP BY trip_hour
    ORDER BY trip_hour
)
TO 'C:\YourDirectory\hourly_pickups_2016_06_01.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ',');
```

### When Do Trips Take the Longest?

**Listing 11-10 — Median trip time by hour:**
```sql
SELECT
    date_part('hour', tpep_pickup_datetime) AS trip_hour,
    percentile_cont(.5) WITHIN GROUP (ORDER BY tpep_dropoff_datetime - tpep_pickup_datetime) AS median_trip
FROM nyc_yellow_taxi_trips_2016_06_01
GROUP BY trip_hour
ORDER BY trip_hour;
```

- Trip duration = `tpep_dropoff_datetime - tpep_pickup_datetime` (interval).
- 1 pm typically has the longest median trip (~15 min); early morning hours are shortest.

## Finding Patterns in Amtrak Data

### Creating the Train Rides Table

**Listing 11-11:**
```sql
SET timezone TO 'US/Central';

CREATE TABLE train_rides (
    trip_id bigserial PRIMARY KEY,
    segment varchar(50) NOT NULL,
    departure timestamp with time zone NOT NULL,
    arrival timestamp with time zone NOT NULL
);

INSERT INTO train_rides (segment, departure, arrival)
VALUES
    ('Chicago to New York', '2017-11-13 21:30 CST', '2017-11-14 18:23 EST'),
    ('New York to New Orleans', '2017-11-15 14:15 EST', '2017-11-16 19:32 CST'),
    ('New Orleans to Los Angeles', '2017-11-17 13:45 CST', '2017-11-18 9:00 PST'),
    ('Los Angeles to San Francisco', '2017-11-19 10:10 PST', '2017-11-19 21:24 PST'),
    ('San Francisco to Denver', '2017-11-20 9:10 PST', '2017-11-21 18:38 MST'),
    ('Denver to Chicago', '2017-11-22 19:10 MST', '2017-11-23 14:50 CST');

SELECT * FROM train_rides;
```

- Specifying each city’s time zone (CST, EST, PST, MST) is essential for correct duration calculations.
- With `SET timezone TO 'US/Central'`, output is shown in Central time (e.g., -06 in November).

### Calculating Segment Duration

**Listing 11-12:**
```sql
SELECT segment,
    to_char(departure, 'YYYY-MM-DD HH12:MI a.m. TZ') AS departure,
    arrival - departure AS segment_time
FROM train_rides;
```

**`to_char()` formatting:**
- `YYYY-MM-DD`: Date.
- `HH12`: 12-hour clock.
- `MI`: Minutes.
- `a.m.`: AM/PM.
- `TZ`: Time zone.

**Output examples:**
- `19:53:00` for trips &lt; 24 hours.
- `1 day 08:28:00` for trips &gt; 24 hours.

Subtracting two `timestamptz` values produces a correct `interval` across time zones.

### Calculating Cumulative Trip Time

**Listing 11-13 (naive approach):**
```sql
SELECT segment,
    arrival - departure AS segment_time,
    sum(arrival - departure) OVER (ORDER BY trip_id) AS cume_time
FROM train_rides;
```

- Output like `2 days 85:47:00` — day and hour parts are summed separately; hard to read.

**Listing 11-14 (better):**
```sql
SELECT segment,
    arrival - departure AS segment_time,
    sum(date_part('epoch', (arrival - departure))) OVER (ORDER BY trip_id) * interval '1 second' AS cume_time
FROM train_rides;
```

- `date_part('epoch', interval)` gives seconds.
- `sum(...) * interval '1 second'` converts back to interval.
- Output: `133:47:00` (total ~5 days 13 hours 47 minutes).

## Summary

### Key Concepts

- **Data types:** `date`, `time`, `timestamp`, `interval`.
- **Extraction:** `date_part()`, `extract()`.
- **Creation:** `make_date()`, `make_time()`, `make_timestamptz()`.
- **Current time:** `current_timestamp`, `now()`, `clock_timestamp()`.
- **Time zones:** `SHOW timezone`, `SET timezone TO`, `AT TIME ZONE`, `pg_timezone_names`.
- **Arithmetic:** Subtract dates/timestamps, add intervals.
- **Formatting:** `to_char()` for display.
- **Duration:** `arrival - departure` → interval; use `epoch` for cumulative seconds.

### Best Practices

1. Use ISO format `YYYY-MM-DD` for dates.
2. Use `timestamp with time zone` when multiple zones are involved.
3. Specify time zones for input data (CST, EST, PST, etc.) when known.
4. Use `date_part('epoch', interval)` for reliable cumulative interval math.
5. Prefer `date_part()` over `extract()` for PostgreSQL-centric code.

### Common Patterns

```sql
-- Extract hour for grouping
date_part('hour', timestamp_col)

-- Trip duration
tpep_dropoff_datetime - tpep_pickup_datetime

-- Median trip time
percentile_cont(.5) WITHIN GROUP (ORDER BY arrival - departure)

-- Format timestamp
to_char(departure, 'YYYY-MM-DD HH12:MI a.m. TZ')

-- Cumulative interval via epoch
sum(date_part('epoch', (arrival - departure))) OVER (ORDER BY trip_id) * interval '1 second'
```

## Try It Yourself

1. Using NYC taxi data, calculate each ride length from pickup and drop-off. Sort longest to shortest.
2. Using `AT TIME ZONE`, show the date and time in London, Johannesburg, Moscow, and Melbourne when January 1, 2100 arrives in New York City.
3. (Bonus) Use Chapter 10 statistics to find correlation and r² for trip time vs. `total_amount`, and `trip_distance` vs. `total_amount`, for rides ≤ 3 hours.
