# Chương 7: Thiết Kế Bảng Dữ Liệu Hiệu Quả - Ghi Chú & Điểm Quan Trọng

## Tham Chiếu Nhanh

### Quy Ước Đặt Tên

**Snake Case** (Được Khuyến Nghị)
- Định dạng: `berry_smoothie`, `us_counties_2010`
- Tất cả chữ thường, các từ được phân tách bằng dấu gạch dưới
- Được sử dụng trong toàn bộ tài liệu PostgreSQL
- Ví dụ: `video_on_demand` vs `videoondemand`

**Camel Case**
- Định dạng: `berrySmoothie`
- Từ đầu tiên chữ thường, các từ tiếp theo viết hoa

**Pascal Case**
- Định dạng: `BerrySmoothie`
- Chữ cái đầu tiên của từ đầu tiên cũng viết hoa
- Microsoft khuyến nghị cho SQL Server

### Hướng Dẫn Đặt Tên

1. **Sử dụng snake case** - Dễ đọc và đáng tin cậy
2. **Đặt tên dễ hiểu** - `arrival_time` không phải `arv_tm`
3. **Sử dụng số nhiều cho bảng** - `teachers`, `vehicles`, `departments`
4. **Lưu ý độ dài** - SQL: 128 ký tự, PostgreSQL: 63 ký tự, Oracle: 30 ký tự
5. **Hậu tố ngày cho bản sao** - `tire_sizes_2017_10_20`

### Định Danh Có Dấu Ngoặc Kép

- PostgreSQL coi định danh là **không phân biệt chữ hoa/chữ thường** trừ khi có dấu ngoặc kép
- `customers` và `Customers` giống nhau nếu không có dấu ngoặc kép
- Sử dụng dấu ngoặc kép để giữ nguyên chữ hoa: `CREATE TABLE "Customers"`
- **Cạm bẫy:**
  - Yêu cầu dấu ngoặc kép trong mọi tham chiếu
  - Cho phép khoảng trắng và từ khóa dành riêng (không khuyến nghị)

## Tổng Quan Ràng Buộc

| Ràng Buộc | Mục Đích | Cho Phép NULL? |
|-----------|----------|----------------|
| PRIMARY KEY | Định danh duy nhất cho mỗi hàng | Không |
| FOREIGN KEY | Tham chiếu khóa chính của bảng khác | Có |
| CHECK | Xác thực dữ liệu chống lại tiêu chí | Có |
| UNIQUE | Đảm bảo giá trị duy nhất | Có (nhiều NULL) |
| NOT NULL | Ngăn chặn giá trị trống | Không |

## Khóa Chính

### Khóa Tự Nhiên vs Khóa Thay Thế

**Khóa Tự Nhiên**
- Sử dụng cột hiện có từ bảng
- Ví dụ: ID bằng lái xe, số bộ phận, ISBN
- Ưu điểm: Dữ liệu đã tồn tại, có ý nghĩa, giảm kết nối
- Nhược điểm: Nhiều dung lượng lưu trữ hơn, ít linh hoạt hơn

**Khóa Thay Thế**
- Giá trị nhân tạo (thường là số nguyên tự động tăng)
- Ví dụ: `bigserial`, UUID
- Ưu điểm: Linh hoạt, độc lập với dữ liệu, ít dung lượng lưu trữ hơn
- Nhược điểm: Không có ý nghĩa nội tại

**Khuyến nghị:** Sử dụng `bigserial` (không phải `serial`) để tránh tràn

### Cú Pháp Khóa Chính

**Ràng Buộc Cột:**
```sql
CREATE TABLE example (
    id varchar(10) CONSTRAINT id_key PRIMARY KEY,
    name varchar(50)
);
-- Hoặc đơn giản hơn:
CREATE TABLE example (
    id varchar(10) PRIMARY KEY,
    name varchar(50)
);
```

**Ràng Buộc Bảng:**
```sql
CREATE TABLE example (
    id varchar(10),
    name varchar(50),
    CONSTRAINT id_key PRIMARY KEY (id)
);
```

**Khóa Chính Tổng Hợp:**
```sql
CREATE TABLE attendance (
    student_id varchar(10),
    school_day date,
    present boolean,
    CONSTRAINT student_key PRIMARY KEY (student_id, school_day)
);
```

### Quy Tắc Khóa Chính

1. Mỗi cột trong khóa phải có giá trị duy nhất cho mỗi hàng
2. Không có cột nào trong khóa có thể có giá trị bị thiếu (NULL)
3. Lỗi vi phạm: `duplicate key value violates unique constraint`

## Khóa Ngoại

### Cú Pháp Cơ Bản

```sql
CREATE TABLE registrations (
    registration_id varchar(10),
    license_id varchar(10) REFERENCES licenses (license_id),
    CONSTRAINT reg_key PRIMARY KEY (registration_id)
);
```

### ON DELETE CASCADE

```sql
CREATE TABLE registrations (
    registration_id varchar(10),
    license_id varchar(10) REFERENCES licenses (license_id) ON DELETE CASCADE
);
```

**Hiệu ứng:** Xóa một hàng trong `licenses` tự động xóa các hàng liên quan trong `registrations`

### Quy Tắc Khóa Ngoại

- Giá trị phải tồn tại trong khóa chính của bảng được tham chiếu
- Thứ tự chèn quan trọng: bảng được tham chiếu trước
- Thứ tự xóa quan trọng: bảng phụ thuộc trước (trừ khi CASCADE)

## Ràng Buộc CHECK

### Cú Pháp

**Ràng Buộc Cột:**
```sql
CREATE TABLE example (
    salary integer CHECK (salary > 0)
);
```

**Ràng Buộc Bảng:**
```sql
CREATE TABLE example (
    user_role varchar(50),
    salary integer,
    CONSTRAINT check_role CHECK (user_role IN('Admin', 'Staff')),
    CONSTRAINT check_salary CHECK (salary > 0)
);
```

### Ví Dụ

**Điều kiện đơn:**
```sql
CONSTRAINT check_salary CHECK (salary > 0)
```

**Nhiều điều kiện:**
```sql
CONSTRAINT grad_check CHECK (credits >= 120 AND tuition = 'Paid')
```

**Kiểm tra qua cột:**
```sql
CONSTRAINT sale_check CHECK (sale_price < retail_price)
```

## Ràng Buộc UNIQUE

### Cú Pháp

```sql
CREATE TABLE contacts (
    contact_id bigserial PRIMARY KEY,
    email varchar(200),
    CONSTRAINT email_unique UNIQUE (email)
);
```

### Điểm Quan Trọng

- Tương tự PRIMARY KEY nhưng cho phép giá trị NULL
- Cho phép nhiều giá trị NULL
- Lỗi: `duplicate key value violates unique constraint`

## Ràng Buộc NOT NULL

### Cú Pháp

```sql
CREATE TABLE students (
    student_id bigserial,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    CONSTRAINT student_key PRIMARY KEY (student_id)
);
```

### Điểm Quan Trọng

- Ngăn chặn giá trị trống trong cột
- Bắt buộc cho khóa chính
- Sử dụng cho các cột thiết yếu (tên, ID, v.v.)

## Sửa Đổi Ràng Buộc

### Xóa Ràng Buộc

```sql
-- Khóa chính, khóa ngoại, hoặc UNIQUE
ALTER TABLE table_name DROP CONSTRAINT constraint_name;

-- NOT NULL
ALTER TABLE table_name ALTER COLUMN column_name DROP NOT NULL;
```

### Thêm Ràng Buộc

```sql
-- Khóa chính
ALTER TABLE table_name ADD CONSTRAINT constraint_name PRIMARY KEY (column_name);

-- Khóa ngoại
ALTER TABLE table_name ADD CONSTRAINT constraint_name 
    FOREIGN KEY (column_name) REFERENCES other_table (other_column);

-- UNIQUE
ALTER TABLE table_name ADD CONSTRAINT constraint_name UNIQUE (column_name);

-- NOT NULL
ALTER TABLE table_name ALTER COLUMN column_name SET NOT NULL;
```

**Quan trọng:** Chỉ có thể thêm ràng buộc nếu dữ liệu hiện có tuân theo quy tắc ràng buộc

## Chỉ Mục

### Chỉ Mục B-Tree (Mặc Định PostgreSQL)

- Được tạo tự động trên các cột PRIMARY KEY và UNIQUE
- Hữu ích cho các toán tử đẳng thức và phạm vi: `<`, `<=`, `=`, `>=`, `>`, `BETWEEN`
- Được lưu trữ riêng biệt với dữ liệu bảng
- Được cập nhật tự động khi INSERT/UPDATE/DELETE

### Tạo Chỉ Mục

```sql
CREATE INDEX index_name ON table_name (column_name);
```

**Ví dụ:**
```sql
CREATE INDEX street_idx ON new_york_addresses (street);
```

### Xóa Chỉ Mục

```sql
DROP INDEX index_name;
```

### Đánh Giá Với EXPLAIN ANALYZE

**Trước chỉ mục:**
```sql
EXPLAIN ANALYZE SELECT * FROM new_york_addresses WHERE street = 'BROADWAY';
-- Hiển thị: Seq Scan (quét tuần tự)
-- Thời gian thực thi: ~290 ms
```

**Sau chỉ mục:**
```sql
CREATE INDEX street_idx ON new_york_addresses (street);
EXPLAIN ANALYZE SELECT * FROM new_york_addresses WHERE street = 'BROADWAY';
-- Hiển thị: Bitmap Index Scan on street_idx
-- Thời gian thực thi: ~6 ms
```

**Cải thiện hiệu suất:** Nhanh hơn ~48 lần (290ms → 6ms)

### Khi Nào Sử Dụng Chỉ Mục

1. **Cột được sử dụng trong JOIN** - Khóa ngoại (khóa chính đã được lập chỉ mục)
2. **Cột trong mệnh đề WHERE** - Các cột thường xuyên được tìm kiếm
3. **Tham khảo tài liệu** - Tìm hiểu về các loại chỉ mục cho kiểu dữ liệu của bạn
4. **Kiểm tra với EXPLAIN ANALYZE** - Đo lường trước và sau

### Đánh Đổi Chỉ Mục

**Lợi ích:**
- Truy vấn nhanh hơn đáng kể
- Bảo trì tự động

**Chi phí:**
- Tăng kích thước cơ sở dữ liệu
- Làm chậm INSERT/UPDATE/DELETE (chỉ mục phải được cập nhật)
- Không phải lúc nào cũng cần thiết

## Điểm Quan Trọng

### Thực Hành Tốt Nhất

1. ✅ Sử dụng snake case nhất quán
2. ✅ Đặt tên rõ ràng và tránh chữ viết tắt
3. ✅ Sử dụng tên số nhiều cho bảng
4. ✅ Sử dụng `bigserial` cho khóa thay thế (không phải `serial`)
5. ✅ Thêm ràng buộc khóa ngoại cho tính toàn vẹn tham chiếu
6. ✅ Sử dụng ràng buộc CHECK để xác thực dữ liệu
7. ✅ Lập chỉ mục các cột được sử dụng trong JOIN và mệnh đề WHERE
8. ✅ Kiểm tra hiệu suất chỉ mục với EXPLAIN ANALYZE

### Ma Trận Quyết Định

**Khóa Tự Nhiên vs Khóa Thay Thế:**
- Tự nhiên: Khi có cột duy nhất và có ý nghĩa
- Thay thế: Khi không có khóa tự nhiên phù hợp

**Khi Nào Thêm Chỉ Mục:**
- Cột trong JOIN (đặc biệt là khóa ngoại)
- Cột thường xuyên trong mệnh đề WHERE
- Sau khi đo lường với EXPLAIN ANALYZE

**Lựa Chọn Ràng Buộc:**
- PRIMARY KEY: Định danh duy nhất (bắt buộc)
- FOREIGN KEY: Tham chiếu bảng khác
- CHECK: Xác thực chống lại tiêu chí
- UNIQUE: Giá trị duy nhất nhưng cho phép NULL
- NOT NULL: Cột bắt buộc

## Mẫu Thường Dùng

### Ví Dụ Bảng Hoàn Chỉnh

```sql
CREATE TABLE employees (
    employee_id bigserial,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(200),
    department_id integer,
    salary integer,
    CONSTRAINT employee_key PRIMARY KEY (employee_id),
    CONSTRAINT email_unique UNIQUE (email),
    CONSTRAINT check_salary CHECK (salary > 0),
    CONSTRAINT dept_fkey FOREIGN KEY (department_id) 
        REFERENCES departments (dept_id) ON DELETE CASCADE
);

CREATE INDEX dept_idx ON employees (department_id);
```

### Thông Báo Lỗi

- Vi phạm khóa chính: `duplicate key value violates unique constraint`
- Vi phạm khóa ngoại: `insert or update violates foreign key constraint`
- Vi phạm CHECK: `new row violates check constraint`
- Vi phạm UNIQUE: `duplicate key value violates unique constraint`
- Vi phạm NOT NULL: `null value in column violates not-null constraint`

## Danh Sách Kiểm Tra Nhanh

Khi thiết kế bảng:

- [ ] Chọn quy ước đặt tên (khuyến nghị snake case)
- [ ] Xác định khóa chính (tự nhiên hoặc thay thế)
- [ ] Thêm khóa ngoại cho các mối quan hệ
- [ ] Thêm ràng buộc CHECK để xác thực
- [ ] Thêm ràng buộc UNIQUE khi cần
- [ ] Đánh dấu các cột bắt buộc là NOT NULL
- [ ] Tạo chỉ mục trên khóa ngoại và các cột thường xuyên được tìm kiếm
- [ ] Kiểm tra với EXPLAIN ANALYZE
