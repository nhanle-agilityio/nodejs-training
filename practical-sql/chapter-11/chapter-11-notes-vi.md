# Chương 11: Làm Việc với Ngày và Giờ - Ghi Chú & Điểm Chính

## Tham Chiếu Nhanh

### Kiểu Dữ Liệu
| Kiểu | Lưu | Ví dụ |
|------|-----|-------|
| `date` | Chỉ ngày | `2018-09-21` |
| `time` | Chỉ giờ | `14:24:00 PST` |
| `timestamp` / `timestamptz` | Ngày + giờ (+ TZ) | `2019-12-01 18:37:12 EST` |
| `interval` | Chỉ độ dài | `12 days`, `8 hours` |

**Định dạng ngày khuyên dùng:** `YYYY-MM-DD` (ISO 8601)

## Các Hàm Chính

### Trích Xuất: `date_part(text, value)`
```sql
date_part('year', timestamp_col)   -- 2019
date_part('month', timestamp_col)  -- 12
date_part('day', timestamp_col)    -- 1
date_part('hour', timestamp_col)   -- 18
date_part('minute', timestamp_col) -- 37
date_part('week', timestamp_col)   -- 48 (ISO, Thứ Hai bắt đầu)
date_part('quarter', timestamp_col)-- 4
date_part('epoch', timestamp_col)  -- giây từ 1970-01-01 UTC
date_part('timezone_hour', ts_col) -- độ lệch UTC (-5)
```

**Cách khác:** `extract('year' from timestamp_col)` — ít DBMS hỗ trợ

### Tạo Datetime
```sql
make_date(2018, 2, 22)                                    -- 2018-02-22
make_time(18, 4, 30.3)                                    -- 18:04:30.3
make_timestamptz(2018, 2, 22, 18, 4, 30.3, 'Europe/Lisbon')
```

### Thời Gian Hiện Tại
| Hàm | Trả về |
|-----|--------|
| `current_date` | Ngày |
| `current_timestamp` / `now()` | Timestamp có TZ |
| `clock_timestamp()` | Thời gian theo từng thời điểm truy vấn |

## Múi Giờ

```sql
SHOW timezone;                    -- Xem hiện tại
SET timezone TO 'US/Pacific';     -- Đặt cho phiên
SELECT ts_col AT TIME ZONE 'Asia/Seoul';  -- Xem theo múi giờ khác
SELECT * FROM pg_timezone_names WHERE name LIKE 'Europe%';
```

- `AT TIME ZONE` chỉ đổi đầu ra; dữ liệu trên server không đổi
- Đầu vào timestamptz → đầu ra timestamp (không TZ)
- Đầu vào timestamp (không TZ) → đầu ra timestamptz

## Số Học

```sql
'9/30/1929'::date - '9/27/1929'::date   -- 3 (ngày)
'9/30/1929'::date + '5 years'::interval -- 9/30/1934
arrival - departure                      -- interval (thời gian chuyến)
```

## Định Dạng: `to_char()`

```sql
to_char(departure, 'YYYY-MM-DD HH12:MI a.m. TZ')
```

Mẫu thường dùng: `YYYY`, `MM`, `DD`, `HH12`, `HH24`, `MI`, `SS`, `a.m.`, `TZ`

## Mẫu Thường Gặp

### Đếm Theo Giờ
```sql
SELECT date_part('hour', pickup_datetime) AS trip_hour, count(*)
FROM trips
GROUP BY trip_hour
ORDER BY trip_hour;
```

### Thời Gian Chuyến Trung Vị
```sql
SELECT date_part('hour', pickup_datetime) AS trip_hour,
    percentile_cont(.5) WITHIN GROUP (ORDER BY dropoff_datetime - pickup_datetime) AS median_trip
FROM trips
GROUP BY trip_hour;
```

### Interval Tích Lũy (dùng epoch)
```sql
sum(date_part('epoch', (arrival - departure))) OVER (ORDER BY trip_id) * interval '1 second'
```
- Tránh `sum(interval)` trực tiếp — ra dạng khó đọc như `2 days 85:47:00`

## Thực Hành Tốt

1. ✅ Dùng `YYYY-MM-DD` cho ngày
2. ✅ Dùng `timestamptz` khi có nhiều múi giờ
3. ✅ Chỉ định múi giờ (CST, EST, PST) khi insert
4. ✅ Dùng `date_part('epoch', interval)` cho interval tích lũy
5. ❌ Không cộng interval trực tiếp — dùng epoch

## Mẹo Ghi Nhớ

- **date_part** = trích phần (year, hour, week, epoch)
- **make_date/time/timestamptz** = tạo từ các phần
- **epoch** = giây từ 1970-01-01 UTC
- **AT TIME ZONE** = xem timestamp theo múi giờ khác
- **arrival - departure** = interval (thời lượng)
- **to_char** = định dạng timestamp để hiển thị
