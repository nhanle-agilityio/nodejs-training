# Chương 1: Tạo Cơ Sở Dữ Liệu và Bảng Đầu Tiên - Ghi Chú & Điểm Chính

## Tham Chiếu Nhanh

### Khái Niệm Cốt Lõi
- **Bảng**: Lưới các hàng và cột lưu trữ dữ liệu
- **Cơ sở dữ liệu**: Tập hợp các đối tượng (bảng, hàm, vai trò người dùng)
- **Cột**: Trường/thuộc tính chứa dữ liệu của một kiểu được chỉ định
- **Hàng**: Một bản ghi duy nhất trong bảng
- **Kiểu Dữ Liệu**: Định nghĩa loại dữ liệu mà cột có thể chứa

### Các Câu Lệnh SQL Chính

#### CREATE DATABASE
```sql
CREATE DATABASE tên_cơ_sở_dữ_liệu;
```
- Tạo cơ sở dữ liệu mới
- Luôn kết thúc bằng dấu chấm phẩy (`;`)
- Sử dụng tên mô tả (chữ_thường_và_gạch_dưới)

#### CREATE TABLE
```sql
CREATE TABLE tên_bảng (
    tên_cột kiểu_dữ_liệu,
    tên_cột kiểu_dữ_liệu
);
```
- Định nghĩa cấu trúc bảng với các cột và kiểu dữ liệu
- Mỗi cột trên dòng mới (thụt lề) để dễ đọc
- Đóng bằng ngoặc đơn và dấu chấm phẩy

#### INSERT INTO
```sql
INSERT INTO tên_bảng (cột1, cột2, cột3)
VALUES ('giá_trị1', 'giá_trị2', giá_trị3),
       ('giá_trị4', 'giá_trị5', giá_trị6);
```
- Thêm các hàng dữ liệu vào bảng
- Văn bản và ngày tháng: sử dụng dấu ngoặc đơn `'văn_bản'` hoặc `'2021-10-30'`
- Số: không cần dấu ngoặc kép `36200`
- Thứ tự giá trị phải khớp với thứ tự cột
- Nhiều hàng được phân tách bằng dấu phẩy

## Các Kiểu Dữ Liệu Đã Học

| Kiểu Dữ Liệu | Mô Tả | Ví Dụ |
|--------------|-------|-------|
| `bigserial` | Số nguyên tự động tăng | 1, 2, 3... |
| `varchar(n)` | Văn bản có độ dài thay đổi (tối đa n ký tự) | `varchar(50)` |
| `date` | Giá trị ngày tháng | `'2011-10-30'` |
| `numeric` | Số thập phân | `36200.50` |

## Quy Tắc Quan Trọng

### Quy Tắc Trích Dẫn
- ✅ **Trích dẫn**: Văn bản (`'Janet'`), Ngày tháng (`'2011-10-30'`)
- ❌ **Không trích dẫn**: Số (`36200`, `43500.50`)

### Định Dạng Ngày
- Sử dụng tiêu chuẩn quốc tế: `YYYY-MM-DD`
- Ví dụ: `'2011-10-30'` (30 tháng 10, 2011)
- Tránh nhầm lẫn giữa các khu vực

### Quy Tắc Cú Pháp
- Luôn kết thúc câu lệnh bằng dấu chấm phẩy (`;`)
- Dấu phẩy phân tách tên cột và giá trị
- Ngoặc đơn nhóm định nghĩa cột và giá trị hàng

## Quy Trình Làm Việc Với pgAdmin

### Tạo Cơ Sở Dữ Liệu
1. Kết nối với máy chủ PostgreSQL
2. Chọn cơ sở dữ liệu `postgres`
3. Mở Query Tool (Tools → Query Tool)
4. Thực thi `CREATE DATABASE tên;`
5. Làm mới Databases để xem cơ sở dữ liệu mới

### Tạo Bảng
1. Kết nối với cơ sở dữ liệu đích (nhấp vào tên cơ sở dữ liệu)
2. Mở Query Tool
3. Thực thi câu lệnh `CREATE TABLE`
4. Làm mới Schemas → public → Tables để xem bảng mới

### Chèn Dữ Liệu
1. Đảm bảo kết nối với cơ sở dữ liệu đúng
2. Mở Query Tool
3. Thực thi câu lệnh `INSERT INTO`
4. Kiểm tra đầu ra: "Query returned successfully: X rows affected"

### Xem Dữ Liệu
- Nhấp chuột phải vào bảng → View/Edit Data → All Rows
- Hoặc sử dụng SQL `SELECT` (sẽ học trong Chương 2)

## Lỗi Thường Gặp & Giải Pháp

### Lỗi Cú Pháp
```
ERROR: syntax error at or near "("
```
- **Nguyên nhân**: Thiếu dấu phẩy, dấu ngoặc kép hoặc ngoặc đơn
- **Giải pháp**: Kiểm tra số dòng được đề cập trong lỗi, xác minh cú pháp

### Quên Dấu Chấm Phẩy
- **Triệu chứng**: Truy vấn không thực thi hoặc hành vi không mong đợi
- **Giải pháp**: Luôn kết thúc câu lệnh bằng `;`

### Dấu Ngoặc Kép Sai
- **Lỗi**: Sử dụng dấu ngoặc kép cho giá trị văn bản
- **Giải pháp**: Sử dụng dấu ngoặc đơn `'văn_bản'` không phải `"văn_bản"`

### Lỗi Định Dạng Ngày
- **Lỗi**: Định dạng ngày không hợp lệ
- **Giải pháp**: Sử dụng định dạng `YYYY-MM-DD`: `'2011-10-30'`

## Thực Hành Tốt Về Định Dạng SQL

### Từ Khóa
- Viết hoa từ khóa SQL: `CREATE`, `TABLE`, `INSERT`, `INTO`, `VALUES`
- Viết thường kiểu dữ liệu: `varchar`, `bigserial`, `numeric`, `date`

### Đặt Tên
- Sử dụng `chữ_thường_và_gạch_dưới` cho tên bảng/cột
- Tránh camelCase: ❌ `firstName` ✅ `first_name`
- Mô tả rõ ràng: `teachers` không phải `t1`

### Thụt Lề
- Thụt lề các mệnh đề (2 hoặc 4 khoảng trắng)
- Mỗi cột trên dòng mới trong CREATE TABLE
- Căn chỉnh VALUES để dễ đọc

## Ví Dụ: Tạo Bảng Hoàn Chỉnh

```sql
-- Bước 1: Tạo cơ sở dữ liệu
CREATE DATABASE analysis;

-- Bước 2: Kết nối với cơ sở dữ liệu (trong pgAdmin, nhấp vào tên cơ sở dữ liệu)

-- Bước 3: Tạo bảng
CREATE TABLE teachers (
    id bigserial,
    first_name varchar(25),
    last_name varchar(50),
    school varchar(50),
    hire_date date,
    salary numeric
);

-- Bước 4: Chèn dữ liệu
INSERT INTO teachers (first_name, last_name, school, hire_date, salary)
VALUES ('Janet', 'Smith', 'F.D. Roosevelt HS', '2011-10-30', 36200),
       ('Lee', 'Reynolds', 'F.D. Roosevelt HS', '1993-05-22', 65000),
       ('Samuel', 'Cole', 'Myers Middle School', '2005-08-01', 43500),
       ('Samantha', 'Bush', 'Myers Middle School', '2011-10-30', 36200),
       ('Betty', 'Diaz', 'Myers Middle School', '2005-08-30', 43500),
       ('Kathleen', 'Roush', 'F.D. Roosevelt HS', '2010-10-22', 38500);
```

## Điểm Chính Cần Nhớ

### Thiết Kế Cơ Sở Dữ Liệu
- ✅ Tạo cơ sở dữ liệu riêng cho mỗi dự án
- ✅ Tổ chức các bảng liên quan cùng nhau
- ✅ Sử dụng tên có ý nghĩa

### Cấu Trúc Bảng
- ✅ Định nghĩa cột với kiểu dữ liệu phù hợp
- ✅ Sử dụng ID tự động tăng (`bigserial`) cho định danh duy nhất
- ✅ Đặt giới hạn độ dài hợp lý cho cột văn bản

### Chèn Dữ Liệu
- ✅ Khớp thứ tự giá trị với thứ tự cột
- ✅ Trích dẫn văn bản và ngày tháng, không trích dẫn số
- ✅ Sử dụng định dạng ngày chuẩn (`YYYY-MM-DD`)
- ✅ Để tự động tăng xử lý cột ID

### Thực Hành Tốt
- ✅ Luôn sử dụng dấu chấm phẩy
- ✅ Định dạng mã để dễ đọc
- ✅ Sử dụng tên mô tả
- ✅ Tuân theo quy ước đặt tên (`chữ_thường_và_gạch_dưới`)

## Mẹo Ghi Nhớ

### Mẫu Câu Lệnh CREATE
```
CREATE [LOẠI_ĐỐI_TƯỢNG] [tên_đối_tượng] (
    [định_nghĩa]
);
```

### Mẫu INSERT
```
INSERT INTO [bảng] ([cột])
VALUES ([giá_trị]),
       ([giá_trị]);
```

### Tham Chiếu Nhanh Kiểu Dữ Liệu
- **Văn bản**: `varchar(n)` - văn bản có độ dài thay đổi
- **Số**: `numeric` - số thập phân, `integer` - số nguyên
- **ID tự động**: `bigserial` - tự động tăng
- **Ngày tháng**: `date` - giá trị ngày

### Danh Sách Kiểm Tra Trích Dẫn
- Văn bản? → Dấu ngoặc đơn `'văn_bản'`
- Ngày? → Dấu ngoặc đơn `'2021-10-30'`
- Số? → Không trích dẫn `12345`

## Bước Tiếp Theo
- Chương 2: Học cách truy vấn dữ liệu với `SELECT`
- Thực hành tạo bảng với các kiểu dữ liệu khác nhau
- Thử nghiệm với câu lệnh INSERT
- Thử tạo các bảng liên quan (students, classes, v.v.)
