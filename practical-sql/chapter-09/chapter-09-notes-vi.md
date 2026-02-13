# Chương 9: Kiểm Tra và Sửa Đổi Dữ Liệu - Ghi Chú & Điểm Quan Trọng

## Tham Chiếu Nhanh

### Vấn Đề Dữ Liệu Bẩn

| Vấn Đề | Cách Tìm | Cách Sửa |
|--------|----------|----------|
| Giá trị bị thiếu | `WHERE column IS NULL` | `UPDATE ... SET column = value WHERE ...` |
| Địa chỉ trùng lặp | `GROUP BY ... HAVING count(*) > 1` | Điều tra và quyết định |
| Cách đánh vần không nhất quán | `GROUP BY column ORDER BY column` | `UPDATE ... SET column = 'standard' WHERE column LIKE 'pattern%'` |
| Giá trị định dạng sai | `length(column)` | `UPDATE ... SET column = 'prefix' \|\| column` |

### Lệnh ALTER TABLE

| Thao Tác | Cú Pháp |
|----------|---------|
| Thêm cột | `ALTER TABLE table ADD COLUMN column data_type;` |
| Xóa cột | `ALTER TABLE table DROP COLUMN column;` |
| Thay đổi kiểu dữ liệu | `ALTER TABLE table ALTER COLUMN column SET DATA TYPE data_type;` |
| Thêm NOT NULL | `ALTER TABLE table ALTER COLUMN column SET NOT NULL;` |
| Xóa NOT NULL | `ALTER TABLE table ALTER COLUMN column DROP NOT NULL;` |
| Đổi tên bảng | `ALTER TABLE table RENAME TO new_name;` |

### Cú Pháp UPDATE

**Cơ bản:**
```sql
UPDATE table SET column = value;
```

**Với WHERE:**
```sql
UPDATE table SET column = value WHERE condition;
```

**Nhiều cột:**
```sql
UPDATE table 
SET column_a = value_a,
    column_b = value_b
WHERE condition;
```

**Từ bảng khác (ANSI):**
```sql
UPDATE table
SET column = (SELECT column FROM table_b WHERE ...)
WHERE EXISTS (SELECT column FROM table_b WHERE ...);
```

**Từ bảng khác (PostgreSQL):**
```sql
UPDATE table
SET column = table_b.column
FROM table_b
WHERE table.column = table_b.column;
```

### Cú Pháp DELETE

**Xóa tất cả hàng:**
```sql
DELETE FROM table_name;
```

**Xóa hàng cụ thể:**
```sql
DELETE FROM table_name WHERE condition;
```

### Khối Giao Dịch

```sql
START TRANSACTION;  -- hoặc BEGIN
-- Các câu lệnh SQL của bạn ở đây
SELECT * FROM table;  -- Xác minh thay đổi
COMMIT;  -- Lưu thay đổi
-- hoặc
ROLLBACK;  -- Loại bỏ thay đổi
```

## Phỏng Vấn Dữ Liệu

### Tìm Địa Chỉ Trùng Lặp

```sql
SELECT company, street, city, st, count(*) AS address_count
FROM table_name
GROUP BY company, street, city, st
HAVING count(*) > 1
ORDER BY company, street, city, st;
```

### Tìm Giá Trị Bị Thiếu

```sql
-- Đếm giá trị NULL
SELECT st, count(*) AS st_count
FROM table_name
GROUP BY st
ORDER BY st;

-- Tìm hàng có NULL
SELECT * FROM table_name
WHERE column_name IS NULL;
```

**Lưu ý:** Sử dụng `ORDER BY column NULLS FIRST` hoặc `NULLS LAST` để điều khiển vị trí NULL.

### Tìm Giá Trị Không Nhất Quán

```sql
SELECT column_name, count(*) AS count
FROM table_name
GROUP BY column_name
ORDER BY column_name ASC;
```

### Tìm Giá Trị Định Dạng Sai

```sql
-- Kiểm tra phân phối độ dài
SELECT length(column_name), count(*) AS length_count
FROM table_name
GROUP BY length(column_name)
ORDER BY length(column_name) ASC;

-- Tìm hàng bị ảnh hưởng
SELECT st, count(*) AS st_count
FROM table_name
WHERE length(zip) < 5
GROUP BY st
ORDER BY st ASC;
```

## Chiến Lược Sao Lưu

### Tạo Sao Lưu Bảng

```sql
CREATE TABLE table_backup AS
SELECT * FROM table;
```

**Xác minh:**
```sql
SELECT
    (SELECT count(*) FROM table) AS original,
    (SELECT count(*) FROM table_backup) AS backup;
```

**Lưu ý:** Chỉ mục KHÔNG được sao chép. Tạo chúng riêng biệt nếu cần.

### Tạo Bản Sao Cột

```sql
ALTER TABLE table ADD COLUMN column_copy data_type;
UPDATE table SET column_copy = column;
```

**Trường hợp sử dụng:** Bảo vệ thêm trước khi sửa đổi các cột quan trọng.

## Khôi Phục Giá Trị Bị Thiếu

### Quy Trình Từng Bước

1. **Tạo bản sao cột:**
```sql
ALTER TABLE table ADD COLUMN st_copy varchar(2);
UPDATE table SET st_copy = st;
```

2. **Cập nhật giá trị bị thiếu:**
```sql
UPDATE table SET st = 'MN' WHERE est_number = 'V18677A';
UPDATE table SET st = 'AL' WHERE est_number = 'M45319+P45319';
UPDATE table SET st = 'WI' WHERE est_number = 'M263A+P263A+V263A';
```

3. **Xác minh:**
```sql
SELECT * FROM table WHERE st IS NULL;  -- Không nên trả về gì
```

### Khôi Phục Từ Sao Lưu

**Từ bản sao cột:**
```sql
UPDATE table SET st = st_copy;
```

**Từ bảng sao lưu:**
```sql
UPDATE table original
SET st = backup.st
FROM table_backup backup
WHERE original.est_number = backup.est_number;
```

## Chuẩn Hóa Giá Trị

### Tạo Cột Chuẩn Hóa

```sql
ALTER TABLE table ADD COLUMN company_standard varchar(100);
UPDATE table SET company_standard = company;
```

### Cập Nhật Với LIKE

```sql
UPDATE table
SET company_standard = 'Armour-Eckrich Meats'
WHERE company LIKE 'Armour%';
```

**Khớp mẫu:**
- `LIKE 'Armour%'` - Bắt đầu bằng "Armour"
- `LIKE '%Armour'` - Kết thúc bằng "Armour"
- `LIKE '%Armour%'` - Chứa "Armour"

## Sửa Chữa Giá Trị Với Nối Chuỗi

### Hiểu Nối Chuỗi

Toán tử `||` nối các chuỗi:
```sql
SELECT 'abc' || '123';  -- Kết quả: 'abc123'
```

### Sửa Chữa Mã ZIP

**Bước 1: Tạo sao lưu**
```sql
ALTER TABLE table ADD COLUMN zip_copy varchar(5);
UPDATE table SET zip_copy = zip;
```

**Bước 2: Khôi phục hai số không đầu (PR, VI)**
```sql
UPDATE table
SET zip = '00' || zip
WHERE st IN('PR','VI') AND length(zip) = 3;
```

**Bước 3: Khôi phục một số không đầu (New England)**
```sql
UPDATE table
SET zip = '0' || zip
WHERE st IN('CT','MA','ME','NH','NJ','RI','VT') AND length(zip) = 4;
```

**Bước 4: Xác minh**
```sql
SELECT length(zip), count(*) AS length_count
FROM table
GROUP BY length(zip)
ORDER BY length(zip) ASC;
-- Nên hiển thị tất cả hàng với length = 5
```

## Cập Nhật Qua Các Bảng

### Tạo Bảng Tham Chiếu

```sql
CREATE TABLE state_regions (
    st varchar(2) CONSTRAINT st_key PRIMARY KEY,
    region varchar(20) NOT NULL
);

COPY state_regions FROM 'path/to/file.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ',');
```

### Cập Nhật Với Truy Vấn Con

```sql
ALTER TABLE table ADD COLUMN inspection_date date;

UPDATE table inspect
SET inspection_date = '2019-12-01'
WHERE EXISTS (SELECT state_regions.region
              FROM state_regions
              WHERE inspect.st = state_regions.st
              AND state_regions.region = 'New England');
```

**Cách hoạt động:**
- Sử dụng WHERE EXISTS với truy vấn con
- Kết nối bảng sử dụng cột khớp
- Chỉ cập nhật hàng khớp

## Xóa Dữ Liệu

### Xóa Hàng

```sql
-- Xóa tất cả hàng
DELETE FROM table_name;

-- Xóa hàng cụ thể
DELETE FROM table_name WHERE condition;

-- Ví dụ: Xóa lãnh thổ
DELETE FROM table_name WHERE st IN('PR','VI');
```

**Cảnh báo:** Không thể hoàn tác! Luôn sao lưu trước.

### Xóa Cột

```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

**Cảnh báo:** Tất cả dữ liệu trong cột bị xóa vĩnh viễn.

### Xóa Bảng

```sql
DROP TABLE table_name;
```

**Cảnh báo:** Toàn bộ bảng và tất cả dữ liệu bị xóa vĩnh viễn.

**Lưu ý:** Nếu bảng có ràng buộc khóa ngoại, giải quyết chúng trước.

## Khối Giao Dịch

### Cú Pháp

```sql
START TRANSACTION;  -- hoặc BEGIN
-- Các câu lệnh SQL
SELECT * FROM table;  -- Xác minh
COMMIT;  -- Lưu
-- hoặc
ROLLBACK;  -- Loại bỏ
```

### Ví Dụ: Kiểm Tra Cập Nhật

```sql
START TRANSACTION;
UPDATE table SET company = 'Tên Mới' WHERE company = 'Tên Cũ';
SELECT company FROM table WHERE company LIKE 'Tên Mới%';
ROLLBACK;  -- Loại bỏ nếu tìm thấy sai lầm
```

**Lợi ích:**
- Kiểm tra thay đổi trước khi cam kết
- Hoàn tác sai lầm dễ dàng
- Thay đổi không hiển thị với người khác cho đến khi COMMIT

## Tối Ưu Hóa Hiệu Suất

### Vấn Đề Với Cập Nhật Lớn

Khi cập nhật bảng lớn, PostgreSQL tạo phiên bản hàng mới nhưng không xóa phiên bản cũ, làm tăng kích thước bảng.

### Giải Pháp: Sao Chép Bảng Thay Vì

**Bước 1: Tạo bảng với cột mới**
```sql
CREATE TABLE table_backup AS
SELECT *,
       '2018-02-07'::date AS reviewed_date
FROM table;
```

**Bước 2: Đổi tên bảng**
```sql
ALTER TABLE table RENAME TO table_temp;
ALTER TABLE table_backup RENAME TO table;
ALTER TABLE table_temp RENAME TO table_backup;
```

**Lợi ích:**
- Tránh cập nhật hàng
- Ngăn chặn tăng kích thước bảng
- Nhanh hơn cho bảng lớn

## Điểm Quan Trọng

### Thực Hành Tốt Nhất

1. ✅ **Luôn sao lưu trước khi sửa đổi**
   - Tạo sao lưu bảng: `CREATE TABLE backup AS SELECT * FROM table;`
   - Tạo bản sao cột cho các cột quan trọng

2. ✅ **Sử dụng khối giao dịch để kiểm tra**
   - Kiểm tra thay đổi trước khi cam kết
   - Hoàn tác nếu tìm thấy sai lầm

3. ✅ **Xác minh thay đổi trước khi cam kết**
   - Sử dụng SELECT để kiểm tra kết quả
   - Đếm hàng trước và sau

4. ✅ **Sử dụng mệnh đề WHERE cẩn thận**
   - Luôn chỉ định điều kiện trong UPDATE/DELETE
   - Kiểm tra với SELECT trước

5. ✅ **Giữ các cột gốc**
   - Tạo phiên bản chuẩn hóa, không thay thế bản gốc
   - Cho phép so sánh và hoàn tác

6. ✅ **Tài liệu hóa tất cả thay đổi**
   - Theo dõi những gì đã được sửa đổi và tại sao

### Mẫu Thường Dùng

**Sao lưu trước khi sửa đổi:**
```sql
CREATE TABLE table_backup AS SELECT * FROM table;
ALTER TABLE table ADD COLUMN column_copy data_type;
UPDATE table SET column_copy = column;
```

**Cập nhật giá trị bị thiếu:**
```sql
UPDATE table SET column = 'value' WHERE column IS NULL;
```

**Chuẩn hóa giá trị:**
```sql
ALTER TABLE table ADD COLUMN column_standard data_type;
UPDATE table SET column_standard = column;
UPDATE table SET column_standard = 'standard' WHERE column LIKE 'pattern%';
```

**Sửa chữa với nối chuỗi:**
```sql
UPDATE table SET column = 'prefix' || column WHERE condition;
```

**Kiểm tra với giao dịch:**
```sql
START TRANSACTION;
UPDATE table SET column = value WHERE condition;
SELECT * FROM table WHERE condition;
ROLLBACK;  -- hoặc COMMIT;
```

### Khi Nào Sử Dụng Mỗi Lệnh

**ALTER TABLE:**
- Thêm/xóa cột
- Thay đổi kiểu dữ liệu
- Thêm/xóa ràng buộc
- Đổi tên bảng

**UPDATE:**
- Sửa giá trị bị thiếu
- Chuẩn hóa dữ liệu không nhất quán
- Sửa chữa giá trị định dạng sai
- Cập nhật dựa trên bảng khác

**DELETE:**
- Xóa dữ liệu sai
- Dọn dẹp dữ liệu thử nghiệm
- Xóa bản ghi lỗi thời

**Khối Giao Dịch:**
- Kiểm tra thay đổi
- Đảm bảo tính nhất quán
- Hoàn tác sai lầm

### Danh Sách Kiểm Tra Chất Lượng Dữ Liệu

Trước khi sửa đổi dữ liệu:

- [ ] Tạo sao lưu bảng
- [ ] Tạo bản sao cột cho các cột quan trọng
- [ ] Kiểm tra giá trị bị thiếu (`IS NULL`)
- [ ] Kiểm tra bản sao (`GROUP BY ... HAVING count(*) > 1`)
- [ ] Kiểm tra giá trị không nhất quán (`GROUP BY column`)
- [ ] Kiểm tra giá trị định dạng sai (`length()`)
- [ ] Sử dụng khối giao dịch để kiểm tra
- [ ] Xác minh thay đổi với SELECT
- [ ] Tài liệu hóa tất cả sửa đổi

### Lỗi Thường Gặp

❌ **Cập nhật không có WHERE:**
```sql
-- SAI - Cập nhật TẤT CẢ hàng!
UPDATE table SET column = 'value';

-- ĐÚNG
UPDATE table SET column = 'value' WHERE condition;
```

❌ **Xóa không có sao lưu:**
```sql
-- SAI - Không có cách khôi phục!
DELETE FROM table WHERE condition;

-- ĐÚNG
CREATE TABLE backup AS SELECT * FROM table;
DELETE FROM table WHERE condition;
```

❌ **Không kiểm tra trong giao dịch:**
```sql
-- SAI - Thay đổi là vĩnh viễn!
UPDATE table SET column = 'value' WHERE condition;

-- ĐÚNG
START TRANSACTION;
UPDATE table SET column = 'value' WHERE condition;
SELECT * FROM table WHERE condition;  -- Xác minh
COMMIT;  -- hoặc ROLLBACK;
```

## Tham Chiếu Nhanh: Tác Vụ Thường Dùng

### Tác Vụ: Sửa Mã Tiểu Bang Bị Thiếu

```sql
-- 1. Sao lưu
ALTER TABLE table ADD COLUMN st_copy varchar(2);
UPDATE table SET st_copy = st;

-- 2. Cập nhật
UPDATE table SET st = 'MN' WHERE est_number = 'V18677A';

-- 3. Xác minh
SELECT * FROM table WHERE st IS NULL;
```

### Tác Vụ: Chuẩn Hóa Tên Công Ty

```sql
-- 1. Tạo cột chuẩn hóa
ALTER TABLE table ADD COLUMN company_standard varchar(100);
UPDATE table SET company_standard = company;

-- 2. Cập nhật mẫu
UPDATE table SET company_standard = 'Tên Chuẩn'
WHERE company LIKE 'Mẫu%';

-- 3. Xác minh
SELECT company, company_standard FROM table WHERE company LIKE 'Mẫu%';
```

### Tác Vụ: Sửa Chữa Mã ZIP

```sql
-- 1. Sao lưu
ALTER TABLE table ADD COLUMN zip_copy varchar(5);
UPDATE table SET zip_copy = zip;

-- 2. Khôi phục số không
UPDATE table SET zip = '00' || zip WHERE st IN('PR','VI') AND length(zip) = 3;
UPDATE table SET zip = '0' || zip WHERE st IN('CT','MA','ME','NH','NJ','RI','VT') AND length(zip) = 4;

-- 3. Xác minh
SELECT length(zip), count(*) FROM table GROUP BY length(zip);
```

### Tác Vụ: Cập Nhật Từ Bảng Khác

```sql
-- 1. Tạo bảng tham chiếu
CREATE TABLE reference_table (
    key_column varchar(50) PRIMARY KEY,
    value_column varchar(50)
);

-- 2. Cập nhật
UPDATE main_table m
SET column = r.value_column
FROM reference_table r
WHERE m.key_column = r.key_column;
```
