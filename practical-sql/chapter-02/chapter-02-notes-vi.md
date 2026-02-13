# Chương 2: Bắt Đầu Khám Phá Dữ Liệu Với SELECT - Ghi Chú & Điểm Chính

## Tham Chiếu Nhanh

### Cú Pháp SELECT Cơ Bản

```sql
-- Chọn tất cả các cột
SELECT * FROM tên_bảng;

-- Chọn các cột cụ thể
SELECT cột1, cột2 FROM tên_bảng;

-- Chọn các giá trị duy nhất
SELECT DISTINCT cột FROM tên_bảng;

-- Chọn với sắp xếp
SELECT cột1, cột2 
FROM tên_bảng 
ORDER BY cột1 DESC;

-- Chọn với lọc
SELECT cột1, cột2 
FROM tên_bảng 
WHERE điều_kiện;

-- Truy vấn hoàn chỉnh
SELECT cột1, cột2 
FROM tên_bảng 
WHERE điều_kiện 
ORDER BY cột1 DESC;
```

## Các Từ Khóa SQL Chính

| Từ Khóa | Mục Đích | Ví Dụ |
|---------|----------|-------|
| `SELECT` | Truy xuất dữ liệu từ bảng | `SELECT * FROM teachers` |
| `FROM` | Chỉ định bảng nguồn | `FROM teachers` |
| `DISTINCT` | Chỉ trả về giá trị duy nhất | `SELECT DISTINCT school` |
| `ORDER BY` | Sắp xếp kết quả | `ORDER BY salary DESC` |
| `WHERE` | Lọc các hàng | `WHERE salary > 40000` |
| `ASC` | Thứ tự tăng dần (mặc định) | `ORDER BY name ASC` |
| `DESC` | Thứ tự giảm dần | `ORDER BY salary DESC` |
| `AND` | Cả hai điều kiện phải đúng | `WHERE x = 1 AND y = 2` |
| `OR` | Ít nhất một điều kiện đúng | `WHERE x = 1 OR y = 2` |
| `NOT` | Phủ định điều kiện | `WHERE NOT x = 1` |

## Các Toán Tử So Sánh

| Toán Tử | Ý Nghĩa | Ví Dụ |
|---------|---------|-------|
| `=` | Bằng | `WHERE name = 'John'` |
| `<>` hoặc `!=` | Không bằng | `WHERE name <> 'John'` |
| `>` | Lớn hơn | `WHERE salary > 50000` |
| `<` | Nhỏ hơn | `WHERE age < 30` |
| `>=` | Lớn hơn hoặc bằng | `WHERE salary >= 50000` |
| `<=` | Nhỏ hơn hoặc bằng | `WHERE age <= 30` |
| `BETWEEN` | Trong phạm vi (bao gồm) | `WHERE salary BETWEEN 40000 AND 60000` |
| `IN` | Khớp một trong tập hợp | `WHERE name IN ('John', 'Jane')` |
| `LIKE` | Khớp mẫu (phân biệt chữ hoa chữ thường) | `WHERE name LIKE 'Sam%'` |
| `ILIKE` | Khớp mẫu (không phân biệt chữ hoa chữ thường) | `WHERE name ILIKE 'sam%'` |

## Khớp Mẫu Với LIKE/ILIKE

### Ký Tự Đại Diện
- `%` - Khớp một hoặc nhiều ký tự
- `_` - Khớp chính xác một ký tự

### Ví Dụ Mẫu
```sql
LIKE 'b%'      -- Bắt đầu bằng 'b'
LIKE '%ak%'    -- Chứa 'ak'
LIKE '_aker'   -- 5 ký tự kết thúc bằng 'aker'
LIKE 'ba_er'   -- 'ba' + bất kỳ ký tự nào + 'er'
```

### LIKE vs ILIKE
- `LIKE` - Phân biệt chữ hoa chữ thường (tiêu chuẩn ANSI SQL)
- `ILIKE` - Không phân biệt chữ hoa chữ thường (chỉ PostgreSQL)

**Thực Hành Tốt:** Sử dụng `ILIKE` để tránh bỏ sót kết quả do biến thể chữ hoa chữ thường.

## Các Toán Tử Logic

### AND
```sql
WHERE điều_kiện1 AND điều_kiện2
-- Cả hai điều kiện phải đúng
```

### OR
```sql
WHERE điều_kiện1 OR điều_kiện2
-- Ít nhất một điều kiện phải đúng
```

### Dấu Ngoặc Đơn Để Nhóm
```sql
WHERE school = 'Roosevelt' 
AND (salary < 38000 OR salary > 40000)
-- Nhóm các điều kiện OR lại với nhau
```

**Quan Trọng:** Sử dụng dấu ngoặc đơn để làm rõ logic phức tạp và đảm bảo thứ tự đánh giá đúng.

## ORDER BY

### Một Cột
```sql
ORDER BY tên_cột ASC   -- Tăng dần (mặc định)
ORDER BY tên_cột DESC  -- Giảm dần
```

### Nhiều Cột
```sql
ORDER BY cột1 ASC, cột2 DESC
-- Sắp xếp theo cột1 trước, sau đó cột2
```

**Lưu Ý:** Bạn có thể sắp xếp theo các cột không có trong danh sách SELECT, nhưng rõ ràng hơn là bao gồm chúng.

## DISTINCT

### Một Cột
```sql
SELECT DISTINCT school FROM teachers;
-- Trả về tên trường duy nhất
```

### Nhiều Cột
```sql
SELECT DISTINCT school, salary FROM teachers;
-- Trả về các kết hợp duy nhất của trường và lương
```

**Trường Hợp Sử Dụng:** Tìm các giá trị duy nhất giúp đánh giá chất lượng dữ liệu và phát hiện sự không nhất quán.

## Cấu Trúc Truy Vấn Hoàn Chỉnh

### Thứ Tự Chuẩn
```sql
SELECT danh_sách_cột
FROM tên_bảng
WHERE điều_kiện
ORDER BY danh_sách_cột;
```

**Quan Trọng:** SQL yêu cầu thứ tự từ khóa cụ thể này.

## Các Mẫu Truy Vấn Thường Gặp

### Tìm Tất Cả Bản Ghi
```sql
SELECT * FROM tên_bảng;
```

### Tìm Các Cột Cụ Thể
```sql
SELECT cột1, cột2 FROM tên_bảng;
```

### Tìm Giá Trị Duy Nhất
```sql
SELECT DISTINCT cột FROM tên_bảng;
```

### Lọc Theo Khớp Chính Xác
```sql
SELECT * FROM tên_bảng WHERE cột = 'giá_trị';
```

### Lọc Theo Phạm Vi
```sql
SELECT * FROM tên_bảng 
WHERE cột BETWEEN giá_trị1 AND giá_trị2;
```

### Lọc Theo Mẫu
```sql
SELECT * FROM tên_bảng 
WHERE cột ILIKE 'mẫu%';
```

### Lọc Với Nhiều Điều Kiện
```sql
SELECT * FROM tên_bảng 
WHERE điều_kiện1 AND điều_kiện2;
```

### Sắp Xếp Kết Quả
```sql
SELECT * FROM tên_bảng 
ORDER BY cột DESC;
```

### Ví Dụ Hoàn Chỉnh
```sql
SELECT first_name, last_name, salary
FROM teachers
WHERE school LIKE '%Roosevelt%'
AND salary > 40000
ORDER BY salary DESC;
```

## Mẹo Đánh Giá Chất Lượng Dữ Liệu

Khi khám phá dữ liệu:
1. ✅ Bắt đầu với `SELECT *` để xem tất cả dữ liệu
2. ✅ Sử dụng `DISTINCT` để tìm các giá trị duy nhất
3. ✅ Kiểm tra các biến thể đánh vần
4. ✅ Xác minh định dạng ngày tháng
5. ✅ Tìm các giá trị thiếu
6. ✅ Kiểm tra các mẫu không mong đợi

## Hành Vi Sắp Xếp Văn Bản

PostgreSQL sắp xếp các ký tự theo thứ tự này (UTF-8):
1. Dấu câu
2. Số 0-9
3. Dấu câu nhiều hơn
4. Chữ cái viết hoa A-Z
5. Dấu câu nhiều hơn
6. Chữ cái viết thường a-z
7. Ký tự đặc biệt

**Kết Quả:** "Ladybug" xuất hiện trước "ladybug" trong sắp xếp.

## Cân Nhắc Hiệu Suất

- ⚠️ `LIKE` và `ILIKE` có thể chậm trên các bảng lớn
- ✅ Sử dụng chỉ mục để cải thiện hiệu suất khớp mẫu
- ✅ Giới hạn các cột trong SELECT để giảm truyền dữ liệu
- ✅ Sử dụng điều kiện WHERE cụ thể để giảm số hàng được xử lý

## Mẹo Ghi Nhớ

### Mẫu Câu Lệnh SELECT
```
SELECT [DISTINCT] các_cột
FROM bảng
[WHERE điều_kiện]
[ORDER BY các_cột [ASC|DESC]];
```

### Thứ Tự Ưu Tiên Toán Tử
1. Dấu ngoặc đơn `()`
2. NOT
3. AND
4. OR

### BETWEEN Là Bao Gồm
```sql
WHERE x BETWEEN 1 AND 10
-- Bao gồm cả 1 và 10
```

### DISTINCT Với Nhiều Cột
- Trả về các **kết hợp** giá trị duy nhất
- Không phải giá trị duy nhất cho mỗi cột riêng biệt

## Lỗi Thường Gặp

### ❌ Thứ Tự Sai
```sql
WHERE cột ORDER BY cột  -- Sai!
```

### ✅ Thứ Tự Đúng
```sql
SELECT * FROM bảng 
WHERE điều_kiện 
ORDER BY cột;
```

### ❌ Quên Dấu Ngoặc Kép Cho Văn Bản
```sql
WHERE name = John  -- Sai! (John được xử lý như cột)
WHERE name = 'John' -- Đúng
```

### ❌ Phân Biệt Chữ Hoa Chữ Thường Với LIKE
```sql
WHERE name LIKE 'sam%'  -- Có thể bỏ sót 'Sam' hoặc 'SAM'
WHERE name ILIKE 'sam%' -- Bắt tất cả các biến thể
```

## Ví Dụ Nhanh

### Tìm Giáo Viên Ở Trường Cụ Thể
```sql
SELECT * FROM teachers 
WHERE school = 'Myers Middle School';
```

### Tìm Giáo Viên Lương Cao
```sql
SELECT first_name, last_name, salary 
FROM teachers 
WHERE salary >= 50000 
ORDER BY salary DESC;
```

### Tìm Giáo Viên Được Tuyển Sau Ngày
```sql
SELECT * FROM teachers 
WHERE hire_date >= '2010-01-01' 
ORDER BY hire_date DESC;
```

### Tìm Giáo Viên Theo Mẫu Tên
```sql
SELECT * FROM teachers 
WHERE first_name ILIKE 'sam%';
```

### Tìm Giáo Viên Trong Phạm Vi Lương
```sql
SELECT * FROM teachers 
WHERE salary BETWEEN 40000 AND 60000;
```

### Truy Vấn Phức Tạp
```sql
SELECT first_name, last_name, school, salary
FROM teachers
WHERE school LIKE '%Roosevelt%'
AND (salary < 38000 OR salary > 40000)
ORDER BY school ASC, salary DESC;
```

## Điểm Chính Cần Nhớ

1. ✅ **SELECT** truy xuất dữ liệu, **FROM** chỉ định nguồn
2. ✅ **DISTINCT** loại bỏ các bản sao
3. ✅ **ORDER BY** sắp xếp kết quả (ASC mặc định, DESC để đảo ngược)
4. ✅ **WHERE** lọc các hàng dựa trên điều kiện
5. ✅ **LIKE/ILIKE** để khớp mẫu (sử dụng ILIKE cho không phân biệt chữ hoa chữ thường)
6. ✅ **AND/OR** kết hợp điều kiện (sử dụng dấu ngoặc đơn để rõ ràng)
7. ✅ **BETWEEN** bao gồm cả hai điểm cuối
8. ✅ Tuân theo thứ tự từ khóa: SELECT → FROM → WHERE → ORDER BY
9. ✅ Sử dụng dấu ngoặc kép cho giá trị văn bản, không cho số
10. ✅ Bắt đầu rộng (`SELECT *`), sau đó thu hẹp lại

## Bước Tiếp Theo
- Chương 3: Hiểu Về Kiểu Dữ Liệu
- Thực hành với các điều kiện WHERE khác nhau
- Thử nghiệm ORDER BY trên nhiều cột
- Thử kết hợp DISTINCT với WHERE và ORDER BY
