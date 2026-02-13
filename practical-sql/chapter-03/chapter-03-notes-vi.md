# Chương 3: Hiểu Về Kiểu Dữ Liệu - Ghi Chú & Điểm Chính

## Tham Chiếu Nhanh

### Kiểu Ký Tự

| Kiểu | Lưu Trữ | Độ Dài Tối Đa | Đệm | Trường Hợp Sử Dụng |
|------|---------|---------------|-----|-------------------|
| `char(n)` | Cố định | n ký tự | Có (khoảng trắng) | Mã độ dài cố định (ví dụ: mã tiểu bang) |
| `varchar(n)` | Biến đổi | n ký tự | Không | Hầu hết các cột văn bản (khuyến nghị) |
| `text` | Biến đổi | ~1 GB | Không | Văn bản độ dài không giới hạn |

**Hiệu Suất:** Không có sự khác biệt đáng kể trong PostgreSQL

**Thực Hành Tốt:** Sử dụng `varchar(n)` với độ dài đủ cho các giá trị ngoại lai

### Kiểu Số Nguyên

| Kiểu | Lưu Trữ | Phạm Vi |
|------|---------|---------|
| `smallint` | 2 bytes | -32,768 đến +32,767 |
| `integer` | 4 bytes | -2,147,483,648 đến +2,147,483,647 |
| `bigint` | 8 bytes | -9,223,372,036,854,775,808 đến +9,223,372,036,854,775,807 |

**Hướng Dẫn:** Sử dụng `bigint` làm mặc định trừ khi không gian là quan trọng

### Kiểu Serial (Tự Động Tăng)

| Kiểu | Lưu Trữ | Phạm Vi |
|------|---------|---------|
| `smallserial` | 2 bytes | 1 đến 32,767 |
| `serial` | 4 bytes | 1 đến 2,147,483,647 |
| `bigserial` | 8 bytes | 1 đến 9,223,372,036,854,775,807 |

**Lưu Ý:** Khoảng trống có thể xảy ra nếu hàng bị xóa hoặc chèn bị hủy bỏ

### Kiểu Thập Phân

#### Điểm Cố Định (Chính Xác)

| Kiểu | Lưu Trữ | Độ Chính Xác | Scale | Trường Hợp Sử Dụng |
|------|---------|--------------|-------|-------------------|
| `numeric(p,s)` | Biến đổi | Lên đến 131,072 chữ số trước | Lên đến 16,383 chữ số sau | Tiền, phép tính chính xác |
| `decimal(p,s)` | Biến đổi | Giống numeric | Giống numeric | Giống numeric |

**Cú Pháp:** `numeric(precision, scale)`
- **precision** = tổng số chữ số (trái + phải của dấu thập phân)
- **scale** = chữ số sau dấu thập phân

**Ví Dụ:** `numeric(5,2)` → 123.45 (3 chữ số trước, 2 sau)

#### Điểm Nổi (Không Chính Xác)

| Kiểu | Lưu Trữ | Độ Chính Xác | Trường Hợp Sử Dụng |
|------|---------|--------------|-------------------|
| `real` | 4 bytes | 6 chữ số thập phân | Phép tính khoa học |
| `double precision` | 8 bytes | 15 chữ số thập phân | Phép tính khoa học |

**⚠️ Cảnh Báo:** Toán điểm nổi có thể tạo ra lỗi!
```sql
-- Ví dụ: 0.7 * 10000000
-- Fixed: 7000000.00000
-- Float: 6999999.88079071
```

### Kiểu Ngày/Thời Gian

| Kiểu | Lưu Trữ | Mô Tả | Phạm Vi |
|------|---------|-------|---------|
| `timestamp` | 8 bytes | Ngày và thời gian | 4713 TCN đến 294276 SCN |
| `date` | 4 bytes | Chỉ ngày | 4713 TCN đến 5874897 SCN |
| `time` | 8 bytes | Chỉ thời gian | 00:00:00 đến 24:00:00 |
| `interval` | 16 bytes | Khoảng thời gian | +/- 178 triệu năm |

**Thực Hành Tốt:** Luôn sử dụng `timestamp with time zone` (hoặc `timestamptz`)

### Định Dạng Múi Giờ

```sql
'2018-12-31 01:00 EST'                    -- Viết tắt
'2018-12-31 01:00 -8'                     -- Độ lệch UTC
'2018-12-31 01:00 Australia/Melbourne'   -- Tên múi giờ
now()                                      -- Thời gian hiện tại
```

## Chuyển Đổi Kiểu

### Hàm CAST()

```sql
-- Cú pháp chuẩn
CAST(tên_cột AS kiểu_đích)

-- Ví dụ
CAST(timestamp_column AS varchar(10))
CAST(numeric_column AS integer)
CAST(numeric_column AS varchar(6))
```

### Ký Hiệu Tắt (Chỉ PostgreSQL)

```sql
-- Cú pháp dấu hai chấm đôi
tên_cột::kiểu_đích

-- Ví dụ
timestamp_column::varchar(10)
numeric_column::integer
```

**Lưu Ý:** `::` chỉ dành cho PostgreSQL, không phải tiêu chuẩn ANSI SQL

## Chọn Kiểu Dữ Liệu

### Hướng Dẫn

1. **Sử dụng số nguyên khi có thể** - Trừ khi bạn cần số thập phân
2. **Cho số thập phân chính xác** (tiền, v.v.) → Sử dụng `numeric`/`decimal`
3. **Cho phép tính không chính xác** → Sử dụng `real`/`double precision` (chỉ khi độ chính xác không quan trọng)
4. **Chọn kiểu đủ lớn** - Nghiêng về phía lớn hơn trừ khi không gian quan trọng

### Cây Quyết Định

```
Cần số nguyên?
├─ Có → Sử dụng kiểu số nguyên (smallint/integer/bigint)
│         └─ Cần tự động tăng? → Sử dụng kiểu serial
│
└─ Không → Cần phép tính chính xác?
         ├─ Có (tiền, v.v.) → Sử dụng numeric/decimal
         └─ Không (khoa học) → Sử dụng real/double precision
```

## Các Mẫu Thường Gặp

### Cột Ký Tự

```sql
-- Mẫu phổ biến nhất
first_name varchar(50)
last_name varchar(50)
description text

-- Mã cố định
state_code char(2)        -- Mã tiểu bang Hoa Kỳ
country_code char(2)      -- Mã quốc gia ISO
```

### Cột Số

```sql
-- ID (tự động tăng)
id bigserial

-- Số nguyên
age integer
quantity integer
year smallint

-- Tiền (chính xác)
price numeric(10,2)
salary numeric(12,2)

-- Đo lường (không chính xác OK)
temperature real
distance double precision
```

### Cột Ngày/Thời Gian

```sql
-- Luôn sử dụng múi giờ cho timestamps
created_at timestamp with time zone
updated_at timestamptz

-- Chỉ ngày
birth_date date
hire_date date

-- Khoảng thời gian
duration interval
contract_period interval
```

## Quy Tắc Chính

### Kiểu Ký Tự
- ✅ `varchar(n)` - Linh hoạt nhất, được khuyến nghị
- ✅ `text` - Cho độ dài không giới hạn
- ⚠️ `char(n)` - Chỉ cho mã độ dài cố định

### Kiểu Số Nguyên
- ✅ `bigint` - Mặc định an toàn
- ✅ `integer` - Khi không gian quan trọng
- ✅ `smallint` - Chỉ cho giá trị bị ràng buộc (ngày, năm)

### Kiểu Thập Phân
- ✅ `numeric`/`decimal` - Cho phép tính chính xác (tiền)
- ⚠️ `real`/`double precision` - Chỉ khi không chính xác OK
- ❌ Không bao giờ sử dụng float cho tiền!

### Kiểu Ngày/Thời Gian
- ✅ Luôn sử dụng `timestamp with time zone`
- ✅ Sử dụng `interval` cho phép tính thời gian
- ✅ Sử dụng `date` khi không cần thời gian

## Mẹo Ghi Nhớ

### Chọn Kiểu Ký Tự
```
Mã độ dài cố định? → char(2)
Biết độ dài tối đa? → varchar(n)
Không giới hạn? → text
```

### Chọn Kiểu Số Nguyên
```
Phạm vi rất nhỏ? → smallint
Phạm vi bình thường? → integer
Số lớn? → bigint
Cần tự động tăng? → serial/bigserial
```

### Chọn Kiểu Thập Phân
```
Cần chính xác? → numeric/decimal
Không chính xác OK? → real/double precision
```

### Chuyển Đổi Kiểu
```
CAST(giá_trị AS kiểu)  -- Chuẩn
giá_trị::kiểu          -- Tắt PostgreSQL
```

## Lỗi Thường Gặp

### ❌ Sử dụng float cho tiền
```sql
price real  -- Sai! Sử dụng numeric thay thế
```

### ✅ Đúng
```sql
price numeric(10,2)  -- Phép tính chính xác
```

### ❌ Quên múi giờ
```sql
created_at timestamp  -- Sai! Thiếu múi giờ
```

### ✅ Đúng
```sql
created_at timestamp with time zone
```

### ❌ Sử dụng char cho văn bản độ dài thay đổi
```sql
name char(100)  -- Lãng phí không gian, sử dụng varchar thay thế
```

### ✅ Đúng
```sql
name varchar(100)
```

## Ví Dụ

### Tạo Bảng

```sql
CREATE TABLE products (
    id bigserial,
    name varchar(100),
    description text,
    price numeric(10,2),
    quantity integer,
    created_at timestamp with time zone
);
```

### Ví Dụ Chuyển Đổi Kiểu

```sql
-- Chuyển đổi timestamp thành chuỗi ngày
SELECT CAST(created_at AS varchar(10));

-- Chuyển đổi numeric thành integer (làm tròn)
SELECT CAST(price AS integer);

-- Tắt PostgreSQL
SELECT created_at::varchar(10);
SELECT price::integer;
```

### Phép Tính Interval

```sql
-- Thêm 90 ngày vào ngày hợp đồng
SELECT contract_date + interval '90 days';

-- Trừ 1 tuần
SELECT created_at - interval '1 week';

-- Tính sự khác biệt
SELECT created_at - updated_at AS time_diff;
```

## Bảng Tham Chiếu Nhanh

### Tóm Tắt Kích Thước Lưu Trữ

| Danh Mục | Kiểu | Kích Thước |
|----------|------|------------|
| Ký tự | char(n) | Cố định n |
| Ký tự | varchar(n) | Biến đổi lên đến n |
| Ký tự | text | Biến đổi không giới hạn |
| Số nguyên | smallint | 2 bytes |
| Số nguyên | integer | 4 bytes |
| Số nguyên | bigint | 8 bytes |
| Thập phân | numeric | Biến đổi |
| Thập phân | real | 4 bytes |
| Thập phân | double precision | 8 bytes |
| Ngày/Thời gian | date | 4 bytes |
| Ngày/Thời gian | timestamp | 8 bytes |
| Ngày/Thời gian | interval | 16 bytes |

## Điểm Chính Cần Nhớ

1. ✅ **Kiểu ký tự:** Sử dụng `varchar` cho hầu hết trường hợp, `text` cho không giới hạn
2. ✅ **Kiểu số nguyên:** Sử dụng `bigint` làm mặc định, `serial` cho tự động tăng
3. ✅ **Kiểu thập phân:** Sử dụng `numeric`/`decimal` cho chính xác (tiền), tránh float
4. ✅ **Ngày/Thời gian:** Luôn sử dụng `timestamp with time zone`
5. ✅ **Chuyển đổi kiểu:** Sử dụng `CAST()` hoặc `::` khi cần
6. ✅ **Chọn kích thước phù hợp:** Nghiêng về lớn hơn trừ khi không gian quan trọng
7. ✅ **Tránh điểm nổi** cho tiền hoặc phép tính chính xác
8. ✅ **Sử dụng kiểu serial** cho các cột ID tự động tăng

## Bước Tiếp Theo
- Chương 4: Nhập và Xuất Dữ Liệu
- Thực hành tạo bảng với các kiểu dữ liệu khác nhau
- Thử nghiệm chuyển đổi kiểu
- Thử phép tính interval với ngày tháng
