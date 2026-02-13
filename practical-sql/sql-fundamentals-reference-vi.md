# SQL Cơ Bản: Tài Liệu Tham Chiếu Thực Hành (Chương 1–11)

Tài liệu tham chiếu gọn, tổng hợp kiến thức SQL thiết yếu cho thực hành thực tế. Dùng để ôn nhanh, giảng dạy hoặc hướng dẫn người mới.

---

## 1. Cấu Trúc SQL Cốt Lõi

### Thứ Tự Mệnh Đề (bắt buộc)

```
SELECT → FROM → [WHERE] → [GROUP BY] → [HAVING] → [ORDER BY]
```

### Quy Tắc Trích Dẫn

| Loại   | Dùng trích dẫn? | Ví dụ                      |
|--------|------------------|----------------------------|
| Văn bản | Có               | `'Janet'`, `'Roosevelt'`   |
| Ngày   | Có               | `'2011-10-30'`             |
| Số     | Không            | `36200`, `43500.50`        |

**Định dạng ngày:** `YYYY-MM-DD` (ISO 8601)

---

## 2. Định Nghĩa Dữ Liệu

### CREATE TABLE

```sql
CREATE TABLE table_name (
    id bigserial PRIMARY KEY,
    name varchar(50) NOT NULL,
    amount numeric(10,2),
    created_at timestamptz
);
```

### Kiểu Dữ Liệu (Cơ Bản)

| Nhóm        | Dùng cho               | Các kiểu              |
|-------------|-------------------------|------------------------|
| Văn bản     | Hầu hết cột             | `varchar(n)`, `text`   |
| Số nguyên   | ID, số lượng            | `integer`, `bigint`    |
| Tự tăng     | Khóa chính              | `bigserial`            |
| Số chính xác| Tiền tệ                 | `numeric(p,s)`         |
| Ngày        | Sự kiện                 | `date`, `timestamptz`  |
| Thời lượng  | Khoảng thời gian        | `interval`             |

**Lưu ý:** Dùng `numeric`/`decimal` cho tiền (không dùng float). Dùng `timestamptz` cho timestamp. Giữ số 0 đầu với `varchar` cho mã.

### Chuyển Kiểu

```sql
CAST(column AS numeric)   -- Chuẩn
column::numeric           -- Viết tắt PostgreSQL
```

---

## 3. Truy Vấn Dữ Liệu

### SELECT Cơ Bản

```sql
SELECT * FROM table;                          -- Tất cả cột
SELECT col1, col2 FROM table;                 -- Cột cụ thể
SELECT DISTINCT col FROM table;               -- Giá trị duy nhất
SELECT col AS alias FROM table;               -- Bí danh
```

### Lọc (WHERE)

```sql
WHERE col = 'value'           -- Bằng
WHERE col > 100               -- So sánh
WHERE col BETWEEN 1 AND 10    -- Khoảng (bao gồm 1 và 10)
WHERE col IN ('a','b','c')    -- Thuộc tập hợp
WHERE col IS NULL             -- Kiểm tra NULL (dùng IS, không dùng =)
WHERE col IS NOT NULL
WHERE col LIKE 'Sam%'         -- Mẫu (% = bất kỳ, _ = một ký tự)
WHERE col ILIKE 'sam%'        -- Không phân biệt hoa thường (PostgreSQL)
WHERE a AND b                 -- Cả hai đúng
WHERE a OR b                  -- Ít nhất một đúng
WHERE NOT a                   -- Phủ định
```

### Sắp Xếp

```sql
ORDER BY col ASC;    -- Tăng dần (mặc định)
ORDER BY col DESC;   -- Giảm dần
ORDER BY col1, col2 DESC;
```

---

## 4. Phép Toán & Phần Trăm

### Phép Chia

```sql
-- Chia số nguyên → số nguyên (mất phần thập phân)
SELECT 11 / 6;   -- 1

-- Chia thập phân → giữ phần thập phân
SELECT 11.0 / 6;
SELECT CAST(11 AS numeric) / 6;
```

### Công Thức

```sql
-- Phần trăm: (phần / tổng) * 100
(CAST(part AS numeric) / whole) * 100

-- Thay đổi phần trăm: ((mới - cũ) / cũ) * 100
round((new - old) / old * 100, 1)

-- Tỷ lệ trên 1.000: (số đếm / dân số) * 1000
(events::numeric / population) * 1000
```

### Làm Tròn

```sql
round(value, so_chu_so_thap_phan)
```

---

## 5. Tổng Hợp

### Các Hàm

| Hàm | Mục đích | NULL |
|-----|----------|------|
| `count(*)` | Mọi hàng | Bao gồm |
| `count(col)` | Giá trị khác NULL | Loại |
| `count(DISTINCT col)` | Giá trị duy nhất | Loại |
| `sum(col)` | Tổng | Bỏ qua |
| `avg(col)` | Trung bình | Bỏ qua |
| `max(col)`, `min(col)` | Phạm vi | Bỏ qua |

### GROUP BY

```sql
SELECT category, count(*), sum(amount)
FROM table
WHERE amount >= 0           -- Lọc hàng trước
GROUP BY category
HAVING sum(amount) > 1000   -- Lọc nhóm sau
ORDER BY count(*) DESC;
```

**Quy tắc:** Mọi cột không tổng hợp trong `SELECT` phải có trong `GROUP BY`.

### WHERE vs HAVING

- **WHERE** — lọc hàng trước khi nhóm.
- **HAVING** — lọc nhóm sau khi tổng hợp.

---

## 6. JOIN

### Các Loại

| Join | Kết quả |
|------|---------|
| `JOIN` / `INNER JOIN` | Chỉ hàng khớp |
| `LEFT JOIN` | Tất cả bên trái + khớp (NULL nếu không khớp) |
| `RIGHT JOIN` | Tất cả bên phải + khớp |
| `FULL OUTER JOIN` | Tất cả từ cả hai |
| `CROSS JOIN` | Mọi tổ hợp (tránh dùng với bảng lớn) |

### Cú Pháp

```sql
SELECT a.col1, b.col2
FROM table_a a
JOIN table_b b ON a.id = b.a_id;
```

### Khóa

- **Primary Key**: định danh duy nhất cho hàng; không NULL.
- **Foreign Key**: tham chiếu primary key bảng khác.

### NULL Trong JOIN

```sql
-- Hàng trong A không có khớp trong B
SELECT a.*
FROM table_a a
LEFT JOIN table_b b ON a.id = b.id
WHERE b.id IS NULL;
```

---

## 7. Ràng Buộc & Chỉ Mục

### Ràng Buộc

| Ràng buộc | Mục đích |
|-----------|----------|
| `PRIMARY KEY` | Định danh duy nhất |
| `FOREIGN KEY ... REFERENCES` | Liên kết bảng khác |
| `UNIQUE` | Không trùng (cho phép NULL) |
| `CHECK (điều_kiện)` | Quy tắc giá trị |
| `NOT NULL` | Cột bắt buộc |

### Chỉ Mục

```sql
CREATE INDEX idx_name ON table (column);
DROP INDEX idx_name;
```

**Khi nào:** Cột dùng trong JOIN và WHERE; kiểm tra bằng `EXPLAIN ANALYZE`.

---

## 8. Sửa Đổi Dữ Liệu

### INSERT

```sql
INSERT INTO table (col1, col2)
VALUES ('a', 1), ('b', 2);
```

### UPDATE

```sql
UPDATE table SET col = 'value' WHERE condition;
-- Luôn dùng WHERE để tránh cập nhật mọi hàng
```

### DELETE

```sql
DELETE FROM table WHERE condition;
```

### ALTER TABLE

```sql
ALTER TABLE table ADD COLUMN col type;
ALTER TABLE table DROP COLUMN col;
ALTER TABLE table ALTER COLUMN col SET DATA TYPE type;
ALTER TABLE table RENAME TO new_name;
```

---

## 9. Giao Dịch & An Toàn

### Khối Giao Dịch

```sql
START TRANSACTION;
-- Các lệnh của bạn
SELECT * FROM table;  -- Kiểm tra
COMMIT;   -- Lưu
-- hoặc
ROLLBACK; -- Hủy
```

### Sao Lưu Trước Khi Sửa

```sql
CREATE TABLE backup AS SELECT * FROM table;
ALTER TABLE table ADD COLUMN col_copy type;
UPDATE table SET col_copy = col;
```

---

## 10. Nhập/Xuất

### COPY

```sql
-- Nhập
COPY table FROM '/path/file.csv' WITH (FORMAT CSV, HEADER);

-- Xuất
COPY table TO '/path/file.csv' WITH (FORMAT CSV, HEADER);

-- Xuất kết quả truy vấn
COPY (SELECT * FROM table WHERE condition) TO '/path/file.csv' WITH (FORMAT CSV, HEADER);
```

---

## 11. Thống Kê & Phân Tích

### Tương Quan

```sql
SELECT corr(Y, X) FROM table;
-- Phạm vi: -1 đến 1. Tương quan ≠ nhân quả
```

### Hồi Quy

```sql
SELECT regr_slope(Y, X), regr_intercept(Y, X), regr_r2(Y, X) FROM table;
-- Y = slope * X + intercept. r² = phần biến thiên được giải thích (0–1)
```

### Xếp Hạng

```sql
rank() OVER (ORDER BY col DESC)           -- Có khoảng sau trận hòa
dense_rank() OVER (ORDER BY col DESC)     -- Không khoảng
rank() OVER (PARTITION BY category ORDER BY col DESC)  -- Trong nhóm
```

---

## 12. Ngày & Giờ

### Kiểu

| Kiểu | Lưu |
|------|-----|
| `date` | Chỉ ngày |
| `time` | Chỉ giờ |
| `timestamptz` | Ngày + giờ + múi giờ |
| `interval` | Thời lượng |

### Hàm

```sql
date_part('hour', ts_col)   -- hour, minute, year, week, quarter, epoch
make_date(2018, 2, 22)
current_timestamp / now()
```

### Múi Giờ

```sql
SHOW timezone;
SET timezone TO 'US/Eastern';
SELECT ts_col AT TIME ZONE 'Asia/Seoul';
```

### Thời Lượng

```sql
arrival - departure   -- interval
date + interval '5 days'
```

---

## Mẫu Thường Dùng (Cheat Sheet)

```sql
-- Tìm trùng lặp
SELECT col, count(*) FROM table GROUP BY col HAVING count(*) > 1;

-- Tìm thiếu (hàng trong A không có trong B)
SELECT a.* FROM a LEFT JOIN b ON a.id = b.id WHERE b.id IS NULL;

-- Thay đổi phần trăm theo nhóm
SELECT cat, round((CAST(sum(new) AS numeric) - sum(old)) / sum(old) * 100, 1)
FROM t GROUP BY cat;

-- Trung vị
percentile_cont(.5) WITHIN GROUP (ORDER BY col)

-- Top N theo danh mục
SELECT * FROM (
  SELECT *, rank() OVER (PARTITION BY cat ORDER BY val DESC) r
  FROM t
) x WHERE r <= 5;
```

---

## Tóm Tắt Thực Hành Tốt

1. Dùng `snake_case` cho tên.
2. Dùng `YYYY-MM-DD` cho ngày.
3. Dùng `numeric` cho tiền, không dùng float.
4. Dùng `timestamptz` cho timestamp.
5. Ép kiểu sang `numeric` khi chia số nguyên.
6. Luôn dùng `WHERE` với `UPDATE`/`DELETE`.
7. Sao lưu hoặc dùng giao dịch trước khi sửa.
8. Tạo chỉ mục cho cột dùng trong JOIN và WHERE.
9. Lọc giá trị đặc biệt (ví dụ âm) trước khi tổng hợp.
10. Dùng `LEFT JOIN` + `IS NULL` để tìm khớp thiếu.
