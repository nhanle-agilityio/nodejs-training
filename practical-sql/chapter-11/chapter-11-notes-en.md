# Chapter 11: Working with Dates and Times - Notes & Key Takeaways

## Quick Reference

### Data Types
| Type | Stores | Example |
|------|--------|---------|
| `date` | Date only | `2018-09-21` |
| `time` | Time only | `14:24:00 PST` |
| `timestamp` / `timestamptz` | Date + time (+ TZ) | `2019-12-01 18:37:12 EST` |
| `interval` | Duration only | `12 days`, `8 hours` |

**Recommended date format:** `YYYY-MM-DD` (ISO 8601)

## Key Functions

### Extracting Components: `date_part(text, value)`
```sql
date_part('year', timestamp_col)   -- 2019
date_part('month', timestamp_col)  -- 12
date_part('day', timestamp_col)    -- 1
date_part('hour', timestamp_col)  -- 18
date_part('minute', timestamp_col) -- 37
date_part('week', timestamp_col)   -- 48 (ISO, Monday start)
date_part('quarter', timestamp_col) -- 4
date_part('epoch', timestamp_col)   -- seconds since 1970-01-01 UTC
date_part('timezone_hour', ts_col) -- UTC offset (-5)
```

**Alternative:** `extract('year' from timestamp_col)` — less widely supported

### Creating Datetimes
```sql
make_date(2018, 2, 22)                                    -- 2018-02-22
make_time(18, 4, 30.3)                                    -- 18:04:30.3
make_timestamptz(2018, 2, 22, 18, 4, 30.3, 'Europe/Lisbon')
```

### Current Date/Time
| Function | Returns |
|----------|---------|
| `current_date` | Date |
| `current_timestamp` / `now()` | Timestamp with TZ |
| `clock_timestamp()` | Time as query runs (per-row) |

## Time Zones

```sql
SHOW timezone;                    -- Get current
SET timezone TO 'US/Pacific';      -- Set for session
SELECT ts_col AT TIME ZONE 'Asia/Seoul';  -- View in different TZ
SELECT * FROM pg_timezone_names WHERE name LIKE 'Europe%';
```

- `AT TIME ZONE` changes output; data on server unchanged
- timestamptz input → output timestamp (no TZ)
- timestamp (no TZ) input → output timestamptz

## Arithmetic

```sql
'9/30/1929'::date - '9/27/1929'::date   -- 3 (days)
'9/30/1929'::date + '5 years'::interval -- 9/30/1934
arrival - departure                      -- interval (trip duration)
```

## Formatting: `to_char()`

```sql
to_char(departure, 'YYYY-MM-DD HH12:MI a.m. TZ')
```

Common patterns: `YYYY`, `MM`, `DD`, `HH12`, `HH24`, `MI`, `SS`, `a.m.`, `TZ`

## Common Patterns

### Count by Hour
```sql
SELECT date_part('hour', pickup_datetime) AS trip_hour, count(*)
FROM trips
GROUP BY trip_hour
ORDER BY trip_hour;
```

### Median Trip Time
```sql
SELECT date_part('hour', pickup_datetime) AS trip_hour,
    percentile_cont(.5) WITHIN GROUP (ORDER BY dropoff_datetime - pickup_datetime) AS median_trip
FROM trips
GROUP BY trip_hour;
```

### Cumulative Interval (use epoch)
```sql
sum(date_part('epoch', (arrival - departure))) OVER (ORDER BY trip_id) * interval '1 second'
```
- Avoid raw `sum(interval)` — produces confusing format like `2 days 85:47:00`

## Export for Visualization
```sql
COPY (SELECT date_part('hour', pickup) AS hour, count(*) FROM trips GROUP BY hour ORDER BY hour)
TO '/path/hourly.csv' WITH (FORMAT CSV, HEADER, DELIMITER ',');
```

## Best Practices

1. ✅ Use `YYYY-MM-DD` for dates
2. ✅ Use `timestamptz` when multiple time zones
3. ✅ Specify time zone (CST, EST, PST) when inserting
4. ✅ Use `date_part('epoch', interval)` for cumulative intervals
5. ❌ Don't sum intervals directly — use epoch workaround

## Memory Tips

- **date_part** = extract component (year, hour, week, epoch)
- **make_date/time/timestamptz** = build from parts
- **epoch** = seconds since 1970-01-01 UTC
- **AT TIME ZONE** = view timestamp in different TZ
- **arrival - departure** = interval (duration)
- **to_char** = format timestamp for display
