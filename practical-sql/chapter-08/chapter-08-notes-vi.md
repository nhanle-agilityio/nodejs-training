# Chương 8: Trích Xuất Thông Tin Bằng Nhóm Hóa và Tóm Tắt - Ghi Chú & Điểm Quan Trọng

## Tham Chiếu Nhanh

### Các Hàm Tổng Hợp

| Hàm | Mục Đích | Xử Lý NULL |
|-----|----------|------------|
| `count(*)` | Đếm tất cả hàng | Bao gồm NULL |
| `count(column)` | Đếm giá trị không NULL | Loại trừ NULL |
| `count(DISTINCT column)` | Đếm giá trị duy nhất | Loại trừ NULL |
| `max(column)` | Tìm giá trị tối đa | Bỏ qua NULL |
| `min(column)` | Tìm giá trị tối thiểu | Bỏ qua NULL |
| `sum(column)` | Tổng các giá trị số | Bỏ qua NULL |
| `avg(column)` | Tính trung bình | Bỏ qua NULL |

### Cú Pháp GROUP BY

```sql
SELECT column1, aggregate_function(column2)
FROM table_name
GROUP BY column1
ORDER BY aggregate_function(column2) DESC;
```

**Quy tắc:**
- Tất cả các cột không tổng hợp phải có trong GROUP BY
- Có thể nhóm theo nhiều cột
- ORDER BY có thể sử dụng hàm tổng hợp hoặc bí danh cột

### HAVING vs WHERE

| Mệnh Đề | Khi Sử Dụng | Lọc |
|---------|------------|-----|
| WHERE | Trước khi nhóm | Hàng |
| HAVING | Sau khi nhóm | Nhóm |

**Điểm quan trọng:** Các hàm tổng hợp không thể được sử dụng trong mệnh đề WHERE

## Các Hàm Tổng Hợp

### count()

**Đếm tất cả hàng:**
```sql
SELECT count(*) FROM table_name;
```

**Đếm giá trị không NULL:**
```sql
SELECT count(column_name) FROM table_name;
```

**Đếm giá trị duy nhất:**
```sql
SELECT count(DISTINCT column_name) FROM table_name;
```

**Ví dụ:**
```sql
SELECT count(libname) FROM pls_fy2014_pupld14a;        -- 9305
SELECT count(DISTINCT libname) FROM pls_fy2014_pupld14a; -- 8515
```

### max() và min()

**Tìm phạm vi:**
```sql
SELECT max(column_name), min(column_name)
FROM table_name;
```

**Trường hợp sử dụng:**
- Hiểu phạm vi dữ liệu
- Xác định vấn đề chất lượng dữ liệu
- Tìm giá trị ngoại lai

**Ví dụ:**
```sql
SELECT max(visits), min(visits) FROM pls_fy2014_pupld14a;
-- Kết quả: max=17729020, min=-3
-- -3 cho biết "không áp dụng" (vấn đề chất lượng dữ liệu!)
```

### sum()

**Tổng các giá trị số:**
```sql
SELECT sum(column_name) FROM table_name;
```

**Với lọc:**
```sql
SELECT sum(visits) AS total_visits
FROM pls_fy2014_pupld14a
WHERE visits >= 0;  -- Lọc ra các giá trị chỉ báo
```

## GROUP BY

### GROUP BY Cơ Bản

**Loại bỏ bản sao (giống DISTINCT):**
```sql
SELECT stabr
FROM pls_fy2014_pupld14a
GROUP BY stabr
ORDER BY stabr;
```

### GROUP BY với count()

**Đếm theo danh mục:**
```sql
SELECT stabr, count(*)
FROM pls_fy2014_pupld14a
GROUP BY stabr
ORDER BY count(*) DESC;
```

**Kết quả hiển thị các tiểu bang hàng đầu:**
```
stabr | count
------|------
NY    | 756
IL    | 625
TX    | 556
```

### GROUP BY Nhiều Cột

**Đếm các kết hợp duy nhất:**
```sql
SELECT stabr, stataddr, count(*)
FROM pls_fy2014_pupld14a
GROUP BY stabr, stataddr
ORDER BY stabr ASC, count(*) DESC;
```

**Kết quả hiển thị mã thay đổi địa chỉ theo tiểu bang:**
```
stabr | stataddr | count
------|----------|------
AK    | 00       | 70
AK    | 15       | 10
AK    | 07       | 5
```

## Kết Nối Bảng Với Tổng Hợp

### Kết Nối Cơ Bản Với sum()

```sql
SELECT sum(pls14.visits) AS visits_2014,
       sum(pls09.visits) AS visits_2009
FROM pls_fy2014_pupld14a pls14 
JOIN pls_fy2009_pupld09a pls09
ON pls14.fscskey = pls09.fscskey
WHERE pls14.visits >= 0 AND pls09.visits >= 0;
```

**Điểm quan trọng:**
- Sử dụng bí danh bảng để dễ đọc
- Lọc giá trị âm trước khi tổng hợp
- INNER JOIN chỉ bao gồm các hàng khớp

### GROUP BY Với Bảng Được Kết Nối

**Tính phần trăm thay đổi theo tiểu bang:**
```sql
SELECT pls14.stabr,
       sum(pls14.visits) AS visits_2014,
       sum(pls09.visits) AS visits_2009,
       round( (CAST(sum(pls14.visits) AS decimal(10,1)) - sum(pls09.visits)) /
              sum(pls09.visits) * 100, 2 ) AS pct_change
FROM pls_fy2014_pupld14a pls14 
JOIN pls_fy2009_pupld09a pls09
ON pls14.fscskey = pls09.fscskey
WHERE pls14.visits >= 0 AND pls09.visits >= 0
GROUP BY pls14.stabr
ORDER BY pct_change DESC;
```

**Công thức phần trăm thay đổi:**
```
((new_value - old_value) / old_value) * 100
```

## Mệnh Đề HAVING

### Cú Pháp

```sql
SELECT column, aggregate_function(column)
FROM table_name
WHERE condition  -- Lọc hàng
GROUP BY column
HAVING aggregate_function(column) > threshold  -- Lọc nhóm
ORDER BY aggregate_function(column);
```

### Ví Dụ: Lọc Các Tiểu Bang Lớn

```sql
SELECT pls14.stabr,
       sum(pls14.visits) AS visits_2014,
       sum(pls09.visits) AS visits_2009,
       round( (CAST(sum(pls14.visits) AS decimal(10,1)) - sum(pls09.visits)) /
              sum(pls09.visits) * 100, 2 ) AS pct_change
FROM pls_fy2014_pupld14a pls14 
JOIN pls_fy2009_pupld09a pls09
ON pls14.fscskey = pls09.fscskey
WHERE pls14.visits >= 0 AND pls09.visits >= 0
GROUP BY pls14.stabr
HAVING sum(pls14.visits) > 50000000  -- Chỉ các tiểu bang có >50M lượt viếng thăm
ORDER BY pct_change DESC;
```

**Kết quả:** Chỉ hiển thị 6 tiểu bang lớn nhất

## Vấn Đề Chất Lượng Dữ Liệu

### Giá Trị Âm Như Chỉ Báo

**Vấn đề:** Một số khảo sát sử dụng số âm để chỉ ra:
- `-1`: Không phản hồi
- `-3`: Không áp dụng

**Giải pháp:** Lọc trước khi tổng hợp
```sql
WHERE visits >= 0
```

**Cách tiếp cận tốt hơn:** Sử dụng NULL và cột cờ riêng

### Giá Trị Bị Thiếu

**Kiểm tra giá trị bị thiếu:**
```sql
SELECT count(*) AS total_rows,
       count(column_name) AS non_null_rows,
       count(*) - count(column_name) AS null_rows
FROM table_name;
```

## Mẫu Thường Dùng

### Mẫu 1: Đếm Theo Danh Mục

```sql
SELECT category, count(*)
FROM table_name
GROUP BY category
ORDER BY count(*) DESC;
```

### Mẫu 2: Tổng Với Lọc

```sql
SELECT category, sum(value)
FROM table_name
WHERE value >= 0  -- Lọc chỉ báo
GROUP BY category;
```

### Mẫu 3: Phần Trăm Thay Đổi Theo Thời Gian

```sql
SELECT category,
       sum(new_value) AS new_sum,
       sum(old_value) AS old_sum,
       round( (CAST(sum(new_value) AS decimal(10,1)) - sum(old_value)) /
              sum(old_value) * 100, 2 ) AS pct_change
FROM new_table n JOIN old_table o
ON n.id = o.id
GROUP BY category
ORDER BY pct_change DESC;
```

### Mẫu 4: Lọc Nhóm

```sql
SELECT category, sum(value)
FROM table_name
GROUP BY category
HAVING sum(value) > threshold
ORDER BY sum(value) DESC;
```

## Điểm Quan Trọng

### Thực Hành Tốt Nhất

1. ✅ Luôn xác minh số đếm hàng sau khi nhập
2. ✅ Sử dụng `count(*)` vs `count(column)` để kiểm tra NULL
3. ✅ Sử dụng `count(DISTINCT column)` để tìm giá trị duy nhất
4. ✅ Sử dụng `max()` và `min()` để xác định vấn đề chất lượng dữ liệu
5. ✅ Lọc giá trị chỉ báo (số âm) trước khi tổng hợp
6. ✅ Sử dụng GROUP BY với các hàm tổng hợp để tóm tắt
7. ✅ Sử dụng HAVING để lọc nhóm, WHERE để lọc hàng
8. ✅ Kết nối bảng khi so sánh qua các khoảng thời gian
9. ✅ Tính phần trăm thay đổi để xác định xu hướng
10. ✅ Tham khảo ý kiến chuyên gia lĩnh vực cho kết quả bất ngờ

### Lỗi Thường Gặp

❌ **Sử dụng hàm tổng hợp trong WHERE:**
```sql
-- SAI
SELECT category, sum(value)
FROM table_name
WHERE sum(value) > 1000;  -- Lỗi!

-- ĐÚNG
SELECT category, sum(value)
FROM table_name
GROUP BY category
HAVING sum(value) > 1000;
```

❌ **Thiếu cột trong GROUP BY:**
```sql
-- SAI
SELECT category, subcategory, count(*)
FROM table_name
GROUP BY category;  -- Lỗi! subcategory không có trong GROUP BY

-- ĐÚNG
SELECT category, subcategory, count(*)
FROM table_name
GROUP BY category, subcategory;
```

❌ **Không lọc giá trị chỉ báo:**
```sql
-- SAI (bao gồm -1, -3 như chỉ báo)
SELECT sum(visits) FROM table_name;

-- ĐÚNG
SELECT sum(visits) FROM table_name
WHERE visits >= 0;
```

### Khi Nào Sử Dụng Mỗi Hàm

**count():**
- Xác minh nhập dữ liệu
- Đếm danh mục
- Tìm giá trị duy nhất

**max() / min():**
- Hiểu phạm vi dữ liệu
- Xác định giá trị ngoại lai
- Kiểm tra chất lượng dữ liệu

**sum():**
- Tổng các giá trị số
- So sánh tổng qua các nhóm
- Tính xu hướng

**GROUP BY:**
- Tóm tắt theo danh mục
- Đếm mỗi nhóm
- So sánh nhóm

**HAVING:**
- Lọc nhóm theo kết quả tổng hợp
- Loại trừ nhóm dưới/trên ngưỡng
- Tập trung phân tích vào tập con cụ thể

## Danh Sách Kiểm Tra Nhanh

Khi phân tích dữ liệu:

- [ ] Xác minh số đếm hàng khớp với tài liệu
- [ ] Kiểm tra giá trị bị thiếu (`count(*)` vs `count(column)`)
- [ ] Xác định giá trị duy nhất (`count(DISTINCT column)`)
- [ ] Kiểm tra phạm vi dữ liệu (`max()`, `min()`)
- [ ] Lọc giá trị chỉ báo trước khi tổng hợp
- [ ] Sử dụng GROUP BY cho tóm tắt theo danh mục
- [ ] Sử dụng HAVING để lọc nhóm
- [ ] Kết nối bảng để so sánh thời gian
- [ ] Tính phần trăm thay đổi cho xu hướng
- [ ] Tham khảo ý kiến chuyên gia cho kết quả bất ngờ
