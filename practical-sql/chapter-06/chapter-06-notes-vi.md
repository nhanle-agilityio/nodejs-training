# Chương 6: Kết Nối Bảng Trong Cơ Sở Dữ Liệu Quan Hệ - Ghi Chú & Điểm Quan Trọng

## Tham Chiếu Nhanh

### Cú Pháp JOIN Cơ Bản
```sql
SELECT *
FROM table_a JOIN table_b
ON table_a.key_column = table_b.foreign_key_column;
```

## Khái Niệm Chính

### Khóa Chính (Primary Keys)
- Cột xác định duy nhất mỗi hàng
- Phải có giá trị duy nhất cho mỗi hàng
- Không thể có giá trị thiếu
- Được định nghĩa với `CONSTRAINT tên PRIMARY KEY (cột)`

### Khóa Ngoại (Foreign Keys)
- Cột tham chiếu khóa chính trong bảng khác
- Giá trị phải tồn tại trong khóa chính của bảng được tham chiếu
- Có thể trống (không giống khóa chính)
- Có thể chứa giá trị trùng lặp (không giống khóa chính)
- Được định nghĩa với `REFERENCES tên_bảng (tên_cột)`

### Ràng Buộc UNIQUE
- Đảm bảo giá trị duy nhất trong cột
- Có thể là cột đơn hoặc kết hợp cột
- Ngăn chặn dữ liệu trùng lặp

## Các Loại Kết Nối

| Loại Kết Nối | Trả Về | Khi Nào Sử Dụng |
|--------------|--------|-----------------|
| **JOIN / INNER JOIN** | Hàng có khớp trong cả hai bảng | Dữ liệu cấu trúc tốt, chỉ cần hàng khớp |
| **LEFT JOIN** | Tất cả hàng từ trái + khớp từ phải | Cần tất cả hàng từ bảng trái, tìm giá trị thiếu |
| **RIGHT JOIN** | Tất cả hàng từ phải + khớp từ trái | Cần tất cả hàng từ bảng phải |
| **FULL OUTER JOIN** | Tất cả hàng từ cả hai bảng | Hợp nhất dữ liệu trùng lặp, hình dung mức độ khớp |
| **CROSS JOIN** | Tất cả kết hợp có thể | Sử dụng tiết kiệm, chỉ trên bảng nhỏ |

### JOIN (INNER JOIN)
```sql
SELECT *
FROM table_a JOIN table_b
ON table_a.id = table_b.id;
```
**Trả về:** Chỉ các hàng khớp từ cả hai bảng

### LEFT JOIN
```sql
SELECT *
FROM table_a LEFT JOIN table_b
ON table_a.id = table_b.id;
```
**Trả về:** Tất cả hàng từ bảng trái + hàng khớp từ phải (NULL cho không khớp)

### RIGHT JOIN
```sql
SELECT *
FROM table_a RIGHT JOIN table_b
ON table_a.id = table_b.id;
```
**Trả về:** Tất cả hàng từ bảng phải + hàng khớp từ trái (NULL cho không khớp)

### FULL OUTER JOIN
```sql
SELECT *
FROM table_a FULL OUTER JOIN table_b
ON table_a.id = table_b.id;
```
**Trả về:** Tất cả hàng từ cả hai bảng (NULL cho không khớp)

### CROSS JOIN
```sql
SELECT *
FROM table_a CROSS JOIN table_b;
```
**Trả về:** Tích Descartes (tất cả kết hợp)
**Cảnh báo:** Tránh trên bảng lớn! (250K × 250K = 62.5 tỷ hàng)

## Giá Trị NULL

### Hiểu Về NULL
- Giá trị đặc biệt đại diện cho dữ liệu thiếu/không xác định
- Khác với 0 hoặc chuỗi trống `""`
- Có thể sử dụng trên tất cả kiểu dữ liệu
- Xuất hiện trong kết quả kết nối khi không tìm thấy khớp

### Tìm Giá Trị Thiếu
```sql
SELECT *
FROM table_a LEFT JOIN table_b
ON table_a.id = table_b.id
WHERE table_b.id IS NULL;
```

### Tìm Hàng Có Dữ Liệu
```sql
WHERE table_b.id IS NOT NULL;
```

## Quan Hệ Bảng

### Một-Một
- Một hàng trong bảng đầu khớp một hàng trong bảng thứ hai
- Ví dụ: Bảng dữ liệu điều tra dân số tiểu bang (một tiểu bang = một hàng trong mỗi bảng)

### Một-Nhiều
- Một hàng trong bảng đầu khớp nhiều hàng trong bảng thứ hai
- Ví dụ: Phòng ban → Nhân viên (một phòng ban có nhiều nhân viên)

### Nhiều-Nhiều
- Nhiều hàng trong bảng đầu khớp nhiều hàng trong bảng thứ hai
- Ví dụ: Cầu thủ → Vị trí (mỗi cầu thủ có thể chơi nhiều vị trí)

## Chọn Cột Trong Kết Nối

### Vấn Đề: Mơ Hồ
```sql
SELECT id  -- LỖI: không rõ ràng!
FROM table_a JOIN table_b
ON table_a.id = table_b.id;
```

### Giải Pháp: Tiền Tố Bảng
```sql
SELECT table_a.id,
       table_a.name,
       table_b.description
FROM table_a JOIN table_b
ON table_a.id = table_b.id;
```

### Sử Dụng Bí Danh Cột
```sql
SELECT table_a.id AS a_id,
       table_a.name,
       table_b.description
FROM table_a JOIN table_b
ON table_a.id = table_b.id;
```

## Bí Danh Bảng

### Tạo Bí Danh
```sql
SELECT a.id,
       a.name,
       b.description
FROM table_a AS a JOIN table_b AS b
ON a.id = b.id;
```

**Lợi Ích:**
- Mã sạch hơn, dễ đọc hơn
- Cú pháp ngắn gọn hơn
- Dễ bảo trì hơn

## Kết Nối Nhiều Bảng

### Ví Dụ Kết Nối Ba Bảng
```sql
SELECT lt.id, lt.name, en.enrollment, gr.grades
FROM schools_left AS lt 
LEFT JOIN schools_enrollment AS en
ON lt.id = en.id
LEFT JOIN schools_grades AS gr
ON lt.id = gr.id;
```

**Điểm Chính:**
- Có thể kết nối không giới hạn bảng (kiểm tra giới hạn DB)
- Mỗi kết nối thêm mệnh đề ON
- Có thể kết nối trên các cột khác nhau
- Sử dụng bí danh để dễ đọc

## Toán Học Trên Bảng Đã Kết Nối

### Ví Dụ: Thay Đổi Phần Trăm Theo Thời Gian
```sql
SELECT c2010.geo_name,
       c2010.p0010001 AS pop_2010,
       c2000.p0010001 AS pop_2000,
       c2010.p0010001 - c2000.p0010001 AS raw_change,
       round((CAST(c2010.p0010001 AS numeric(8,1)) - c2000.p0010001)
       / c2000.p0010001 * 100, 1) AS pct_change
FROM us_counties_2010 c2010 
INNER JOIN us_counties_2000 c2000
ON c2010.state_fips = c2000.state_fips
AND c2010.county_fips = c2000.county_fips
ORDER BY pct_change DESC;
```

**Điểm Chính:**
- Sử dụng tiền tố/ bí danh bảng khi tham chiếu cột
- Có thể kết nối trên nhiều cột (sử dụng AND)
- Có thể sử dụng điều kiện bất đẳng thức (`<>`, `>`, `<`, v.v.)
- Thao tác toán học hoạt động giống như truy vấn bảng đơn

## Điểm Quan Trọng

### Thực Hành Tốt
1. ✅ Luôn sử dụng tiền tố bảng hoặc bí danh khi chọn cột
2. ✅ Sử dụng loại kết nối phù hợp dựa trên nhu cầu dữ liệu
3. ✅ Sử dụng LEFT/RIGHT JOIN khi cần tất cả hàng từ một bảng
4. ✅ Sử dụng INNER JOIN khi chỉ cần hàng khớp
5. ✅ Sử dụng IS NULL để tìm giá trị thiếu
6. ✅ Sử dụng bí danh bảng cho mã sạch hơn
7. ✅ Kết nối trên nhiều cột khi cần để xác định duy nhất
8. ✅ Xác minh chất lượng dữ liệu bằng cách kiểm tra khớp thiếu
9. ✅ Hiểu quan hệ bảng trước khi viết kết nối
10. ✅ Sử dụng CROSS JOIN tiết kiệm và chỉ trên bảng nhỏ

### Các Mẫu Thường Gặp

#### Kết Nối Cơ Bản
```sql
SELECT t1.col1, t2.col2
FROM table1 t1
JOIN table2 t2 ON t1.id = t2.id;
```

#### Left Join Với Kiểm Tra NULL
```sql
SELECT t1.*
FROM table1 t1
LEFT JOIN table2 t2 ON t1.id = t2.id
WHERE t2.id IS NULL;
```

#### Kết Nối Nhiều Bảng
```sql
SELECT a.col1, b.col2, c.col3
FROM table_a a
JOIN table_b b ON a.id = b.a_id
JOIN table_c c ON b.id = c.b_id;
```

#### Kết Nối Trên Nhiều Cột
```sql
SELECT *
FROM table_a a
JOIN table_b b 
ON a.state_code = b.state_code
AND a.county_code = b.county_code;
```

## Mẹo Ghi Nhớ

- **JOIN = INNER JOIN**: Chỉ trả về hàng khớp
- **LEFT JOIN**: Giữ tất cả hàng trái, thêm khớp phải (NULL nếu không khớp)
- **RIGHT JOIN**: Giữ tất cả hàng phải, thêm khớp trái (NULL nếu không khớp)
- **FULL OUTER JOIN**: Giữ tất cả hàng từ cả hai (NULL cho không khớp)
- **CROSS JOIN**: Tất cả kết hợp (nguy hiểm trên bảng lớn!)
- **NULL**: Giá trị thiếu/không xác định (sử dụng IS NULL, không phải = NULL)
- **Bí danh bảng**: Sử dụng cho mã sạch hơn (từ khóa AS tùy chọn)
- **Nhiều cột**: Kết nối trên nhiều cột với AND
- **Khóa chính**: Định danh duy nhất (một mỗi bảng)
- **Khóa ngoại**: Tham chiếu khóa chính trong bảng khác
