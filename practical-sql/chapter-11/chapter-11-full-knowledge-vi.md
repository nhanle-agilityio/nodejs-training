# Chương 11: Làm Việc với Ngày và Giờ

## Giới Thiệu

Các cột chứa ngày và giờ có thể cho biết sự kiện xảy ra khi nào hoặc kéo dài bao lâu, và điều đó dẫn đến những câu hỏi thú vị. Có mẫu nào trên dòng thời gian? Sự kiện nào ngắn nhất hoặc dài nhất? Mối quan hệ giữa hoạt động cụ thể với thời điểm trong ngày hoặc mùa trong năm là gì?

Trong chương này, chúng ta sẽ khám phá những câu hỏi đó qua các kiểu dữ liệu SQL cho ngày và giờ cùng các hàm liên quan. Bắt đầu bằng các kiểu dữ liệu và hàm, sau đó dùng dữ liệu taxi vàng New York để tìm mẫu và câu chuyện trong dữ liệu. Cuối cùng là múi giờ với dữ liệu Amtrak để tính thời gian chuyến tàu trên khắp Hoa Kỳ.

## Các Kiểu Dữ Liệu và Hàm cho Ngày và Giờ

### date
- Chỉ lưu ngày.
- PostgreSQL chấp nhận nhiều định dạng, ví dụ: `September 21, 2018` hoặc `9/21/2018`.
- **Định dạng khuyên dùng:** `YYYY-MM-DD` (ví dụ `2018-09-21`), chuẩn ISO 8601 và là đầu ra mặc định của PostgreSQL.
- Giúp tránh nhầm lẫn khi chia sẻ dữ liệu quốc tế.

### time
- Chỉ lưu giờ.
- Thêm `with time zone` để cột nhận biết múi giờ.
- Định dạng ISO 8601: `HH:MM:SS`. Có thể thêm múi giờ, ví dụ `14:24 PST`.

### timestamp
- Lưu cả ngày và giờ.
- Thêm `with time zone` để cột nhận biết múi giờ.
- Viết tắt PostgreSQL: `timestamptz` = `timestamp with time zone`.
- Định dạng: `YYYY-MM-DD HH:MM:SS TZ`.
- Múi giờ có thể chỉ định bằng độ lệch UTC, tên vùng, hoặc viết tắt.

### interval
- Lưu giá trị thời gian dạng `số lượng đơn_vị`.
- Chỉ lưu độ dài khoảng thời gian, không lưu điểm bắt đầu/kết thúc.
- Ví dụ: `12 days`, `8 hours`.

### Hành Vi Chính

- **date**, **time**, **timestamp** thuộc kiểu *datetime*; giá trị là *datetimes*.
- **interval** thuộc kiểu *interval*; giá trị là *intervals*.
- Cả bốn kiểu tuân theo lịch (ví dụ: tháng 6 có 30 ngày; 31/6 không hợp lệ; 29/2 chỉ hợp lệ năm nhuận).

## Thao Tác Ngày và Giờ

Có thể dùng hàm SQL để tính toán hoặc trích xuất các thành phần. Nhiều DBMS khác PostgreSQL có khác biệt; nên kiểm tra tài liệu.

### Trích Xuất Thành Phần: `date_part(text, value)`

**Cú pháp:**
```sql
date_part(text, value)
```

- Tham số 1: chuỗi chỉ định phần cần trích xuất (`year`, `month`, `day`, `hour`, `minute`, `week`, `quarter`, `epoch`, v.v.).
- Tham số 2: giá trị date, time hoặc timestamp.

**Ví dụ (Listing 11-1):**
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

**Đầu ra (múi giờ Eastern):**

| year | month | day | hour | minute | seconds | tz  | week | quarter | epoch     |
|------|-------|-----|------|--------|---------|-----|------|---------|-----------|
| 2019 | 12    | 1   | 18   | 37     | 12      | -5  | 48   | 4       | 1575243432 |

**Ghi chú:**
- `tz`: độ lệch UTC (ví dụ EST = -5).
- **week**: ISO 8601 (tuần bắt đầu Thứ Hai).
- **quarter**: 1–4.
- **epoch**: Số giây kể từ 00:00 ngày 1/1/1970 UTC — hữu ích cho tính toán tuyệt đối.

**Thay thế: `extract()`**
```sql
extract('year' from '2019-12-01 18:37:12 EST'::timestamptz)
```
- Logic giống `date_part()`, nhưng `extract()` ít được hỗ trợ (ví dụ không có trong SQL Server).

### Tạo Giá Trị Datetime Từ Các Thành Phần

Dùng khi năm, tháng, ngày (và có thể giờ) nằm trong các cột riêng:

| Hàm | Trả về | Ví dụ |
|-----|--------|-------|
| `make_date(year, month, day)` | `date` | `make_date(2018, 2, 22)` → `2018-02-22` |
| `make_time(hour, minute, seconds)` | `time` (không TZ) | `make_time(18, 4, 30.3)` → `18:04:30.3` |
| `make_timestamptz(year, month, day, hour, minute, second, time zone)` | `timestamptz` | `make_timestamptz(2018, 2, 22, 18, 4, 30.3, 'Europe/Lisbon')` |

### Lấy Ngày và Giờ Hiện Tại

Ghi nhận thời điểm **bắt đầu** truy vấn (hoặc giao dịch):

| Hàm | Trả về |
|-----|--------|
| `current_date` | Ngày hiện tại |
| `current_time` | Giờ hiện tại (có múi giờ) |
| `current_timestamp` | Timestamp hiện tại (có múi giờ) |
| `now()` | Cách viết ngắn PostgreSQL cho `current_timestamp` |
| `localtime` | Giờ hiện tại (không múi giờ) |
| `localtimestamp` | Timestamp hiện tại (không múi giờ) |

**Đặc thù PostgreSQL:** `clock_timestamp()` — ghi nhận thời gian thực trong khi truy vấn chạy (ví dụ mỗi hàng nhận thời gian cập nhật thực tế). Có thể làm chậm truy vấn lớn.

## Làm Việc với Múi Giờ

### Xem Múi Giờ Hiện Tại

```sql
SHOW timezone;
-- ví dụ US/Eastern

SHOW ALL;  -- mọi tham số của server
```

### Liệt Kê Múi Giờ

```sql
SELECT * FROM pg_timezone_abbrevs;
SELECT * FROM pg_timezone_names;
```

Lọc theo vùng:
```sql
SELECT * FROM pg_timezone_names WHERE name LIKE 'Europe%';
```

### Đặt Múi Giờ (Theo Phiên)

```sql
SET timezone TO 'US/Pacific';
```

- Chỉ ảnh hưởng trong phiên hiện tại.
- Ảnh hưởng cách hiển thị timestamp.

### Dùng `AT TIME ZONE`

Xem timestamp theo múi giờ khác mà không đổi cài đặt phiên:

```sql
SELECT test_date AT TIME ZONE 'Asia/Seoul' FROM time_zone_test;
```

- Nếu dữ liệu là `timestamptz`, đầu ra là `timestamp` (không TZ).
- Nếu dữ liệu không có TZ, đầu ra là `timestamptz`.

## Tính Toán với Ngày và Giờ

Có thể dùng phép `+`, `-`, `*`, `/` với datetime và interval.

**Ví dụ:**
```sql
SELECT '9/30/1929'::date - '9/27/1929'::date;   -- 3 (ngày)
SELECT '9/30/1929'::date + '5 years'::interval; -- 9/30/1934
```

Trừ hai timestamp cho ra một **interval**.

## Tìm Mẫu trong Dữ Liệu Taxi New York

### Tạo và Import Bảng

```sql
CREATE TABLE nyc_yellow_taxi_trips_2016_06_01 (
    trip_id bigserial PRIMARY KEY,
    vendor_id varchar(1) NOT NULL,
    tpep_pickup_datetime timestamp with time zone NOT NULL,
    tpep_dropoff_datetime timestamp with time zone NOT NULL,
    ...
);

COPY nyc_yellow_taxi_trips_2016_06_01 (...) FROM '...' WITH (FORMAT CSV, HEADER, DELIMITER ',');
CREATE INDEX tpep_pickup_idx ON nyc_yellow_taxi_trips_2016_06_01 (tpep_pickup_datetime);
```

- Sau import: 368.774 hàng.
- Cột quan trọng: `tpep_pickup_datetime`, `tpep_dropoff_datetime`.

Để kết quả khớp sách:
```sql
SET timezone TO 'US/Eastern';
```

### Giờ Bận Nhất trong Ngày

```sql
SELECT
    date_part('hour', tpep_pickup_datetime) AS trip_hour,
    count(*)
FROM nyc_yellow_taxi_trips_2016_06_01
GROUP BY trip_hour
ORDER BY trip_hour;
```

- 24 hàng (0–23).
- Thường cao nhất khoảng 18h–22h.

### Chuyến Đi Dài Nhất Khi Nào?

```sql
SELECT
    date_part('hour', tpep_pickup_datetime) AS trip_hour,
    percentile_cont(.5) WITHIN GROUP (ORDER BY tpep_dropoff_datetime - tpep_pickup_datetime) AS median_trip
FROM nyc_yellow_taxi_trips_2016_06_01
GROUP BY trip_hour
ORDER BY trip_hour;
```

- Thời gian chuyến = `tpep_dropoff_datetime - tpep_pickup_datetime`.
- Thường 13h có median dài nhất (~15 phút); sáng sớm ngắn nhất.

## Dữ Liệu Tàu Amtrak

### Tạo Bảng Chuyến Tàu

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
    ...
```

- Chỉ định múi giờ từng thành phố (CST, EST, PST, MST) là cần thiết để tính thời gian chính xác.

### Tính Thời Gian Từng Chặng

```sql
SELECT segment,
    to_char(departure, 'YYYY-MM-DD HH12:MI a.m. TZ') AS departure,
    arrival - departure AS segment_time
FROM train_rides;
```

**Định dạng `to_char()`:**
- `YYYY-MM-DD`: ngày.
- `HH12`: đồng hồ 12 giờ.
- `MI`: phút.
- `a.m.`: AM/PM.
- `TZ`: múi giờ.

### Thời Gian Tích Lũy

**Cách đơn giản (khó đọc):**
```sql
SELECT segment,
    arrival - departure AS segment_time,
    sum(arrival - departure) OVER (ORDER BY trip_id) AS cume_time
FROM train_rides;
```
- Có thể ra dạng `2 days 85:47:00` — khó đọc.

**Cách tốt hơn:**
```sql
SELECT segment,
    arrival - departure AS segment_time,
    sum(date_part('epoch', (arrival - departure))) OVER (ORDER BY trip_id) * interval '1 second' AS cume_time
FROM train_rides;
```
- Dùng `epoch` để lấy giây, rồi nhân với `interval '1 second'`.
- Kết quả dạng `133:47:00`.

## Tóm Tắt

### Khái Niệm Chính

- **Kiểu dữ liệu:** `date`, `time`, `timestamp`, `interval`.
- **Trích xuất:** `date_part()`, `extract()`.
- **Tạo:** `make_date()`, `make_time()`, `make_timestamptz()`.
- **Thời gian hiện tại:** `current_timestamp`, `now()`, `clock_timestamp()`.
- **Múi giờ:** `SHOW timezone`, `SET timezone TO`, `AT TIME ZONE`, `pg_timezone_names`.
- **Tính toán:** trừ ngày/timestamp, cộng interval.
- **Định dạng:** `to_char()`.
- **Thời lượng:** `arrival - departure` → interval; dùng `epoch` cho tích lũy.

### Thực Hành Tốt

1. Dùng định dạng ISO `YYYY-MM-DD` cho ngày.
2. Dùng `timestamp with time zone` khi có nhiều múi giờ.
3. Chỉ định múi giờ khi nhập dữ liệu nếu biết.
4. Dùng `date_part('epoch', interval)` cho tính tích lũy chuẩn xác.
5. Ưu tiên `date_part()` hơn `extract()` trong môi trường PostgreSQL.
