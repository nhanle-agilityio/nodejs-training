# Chương 4: Nhập và Xuất Dữ Liệu - Ghi Chú & Điểm Quan Trọng

## Tham Chiếu Nhanh

### Ba Bước Để Nhập
1. Chuẩn bị dữ liệu nguồn dưới dạng tệp văn bản có phân cách
2. Tạo bảng để lưu trữ dữ liệu
3. Viết script COPY để thực hiện nhập

## Tệp Văn Bản Có Phân Cách

### Khái Niệm Chính
- **Tệp có phân cách**: Các hàng dữ liệu, mỗi cột được phân tách bằng ký tự phân cách
- **CSV**: Giá trị được phân tách bằng dấu phẩy (phổ biến nhất)
- **Text qualifier**: Ký tự (thường là `"`) bọc các giá trị chứa ký tự phân cách
- **Hàng tiêu đề**: Tên cột ở đầu tệp (loại trừ khi nhập bằng `HEADER`)

### Các Ký Tự Phân Cách Phổ Biến
- Dấu phẩy (`,`)
- Dấu ống (`|`)
- Tab
- Dấu chấm phẩy (`;`)

### Ví Dụ
```
FIRSTNAME,LASTNAME,STREET
John,Doe,"123 Main St., Apt 200"
```

## Lệnh COPY - Nhập

### Cú Pháp Cơ Bản
```sql
COPY tên_bảng
FROM 'đường/dẫn/tệp.csv'
WITH (FORMAT CSV, HEADER);
```

### Định Dạng Đường Dẫn Tệp
- **Windows**: `'C:\Users\Tên\Desktop\tệp.csv'`
- **macOS/Linux**: `'/Users/tên/Desktop/tệp.csv'`
- Luôn sử dụng dấu ngoặc đơn quanh đường dẫn

### Các Tùy Chọn Phổ Biến
- `FORMAT CSV` - Định dạng phân tách bằng dấu phẩy
- `FORMAT TEXT` - Phân tách bằng tab (mặc định)
- `FORMAT BINARY` - Định dạng nhị phân (hiếm)
- `HEADER` - Tệp có hàng tiêu đề (loại trừ khi nhập, bao gồm khi xuất)
- `DELIMITER '|'` - Chỉ định ký tự phân cách
- `QUOTE '"'` - Chỉ định text qualifier (mặc định là `"`)

### Nhập Tập Hợp Con Các Cột
```sql
COPY tên_bảng (cột1, cột2, cột3)
FROM 'đường/dẫn/tệp.csv'
WITH (FORMAT CSV, HEADER);
```

### Thêm Giá Trị Mặc Định Trong Quá Trình Nhập
Sử dụng mẫu bảng tạm thời:
```sql
CREATE TEMPORARY TABLE bảng_tạm (LIKE bảng_chính);
COPY bảng_tạm (cột1, cột2) FROM 'tệp.csv' WITH (FORMAT CSV, HEADER);
INSERT INTO bảng_chính (cột1, cột2, cột3)
SELECT cột1, cột2, 'giá_trị_mặc_định' FROM bảng_tạm;
DROP TABLE bảng_tạm;
```

## Lệnh COPY - Xuất

### Xuất Tất Cả Dữ Liệu
```sql
COPY tên_bảng
TO 'đường/dẫn/xuất.txt'
WITH (FORMAT CSV, HEADER, DELIMITER '|');
```

### Xuất Các Cột Cụ Thể
```sql
COPY tên_bảng (cột1, cột2, cột3)
TO 'đường/dẫn/xuất.txt'
WITH (FORMAT CSV, HEADER);
```

### Xuất Kết Quả Truy Vấn
```sql
COPY (
    SELECT cột1, cột2
    FROM tên_bảng
    WHERE điều_kiện
)
TO 'đường/dẫn/xuất.txt'
WITH (FORMAT CSV, HEADER);
```

## Trình Hướng Dẫn Nhập/Xuất pgAdmin

### Khi Nào Sử Dụng
- Khi kết nối với phiên bản PostgreSQL từ xa
- Khi bạn không có quyền truy cập hệ thống tệp
- Để nhập/xuất dựa trên GUI

### Các Bước
1. Nhấp chuột phải vào bảng → **Import/Export**
2. Chọn Import hoặc Export
3. Chọn tệp, định dạng (CSV), tùy chọn
4. Nhấp **OK**

## Ví Dụ Dữ Liệu Điều Tra Dân Số

### Điểm Nổi Bật Cấu Trúc Bảng
```sql
CREATE TABLE us_counties_2010 (
    geo_name varchar(90),              -- Tên quận
    state_us_abbreviation varchar(2),   -- Mã tiểu bang
    summary_level varchar(3),          -- Mã địa lý (bảo tồn số không đứng đầu)
    area_land bigint,                  -- Mét vuông (giá trị rất lớn)
    area_water bigint,
    internal_point_lat numeric(10,7),  -- Vĩ độ (7 chữ số thập phân)
    internal_point_lon numeric(10,7),  -- Kinh độ
    p0010001 integer,                  -- Tổng dân số
    -- ... nhiều cột khác
);
```

### Quyết Định Thiết Kế Chính
- Sử dụng `varchar` cho mã để bảo tồn số không đứng đầu (ví dụ: "050" không phải "50")
- Sử dụng `bigint` cho giá trị diện tích rất lớn (các quận Alaska)
- Sử dụng `numeric(10,7)` cho tọa độ (độ chính xác quan trọng)

### Nhập Dữ Liệu Điều Tra Dân Số
```sql
COPY us_counties_2010
FROM 'C:\YourDirectory\us_counties_2010.csv'
WITH (FORMAT CSV, HEADER);
```

**Thành Công**: `Query returned successfully: 3143 rows affected`

## Điểm Quan Trọng

### Thực Hành Tốt
1. ✅ Luôn kiểm tra từ điển dữ liệu khi có sẵn
2. ✅ Sử dụng kiểu dữ liệu phù hợp dựa trên từ điển dữ liệu
3. ✅ Bảo tồn số không đứng đầu với `varchar` cho mã
4. ✅ Sử dụng `bigint` cho số rất lớn
5. ✅ Xác minh nhập: kiểm tra số hàng và dữ liệu mẫu
6. ✅ Sử dụng bảng tạm thời cho các chuyển đổi phức tạp
7. ✅ Chỉ định cột một cách rõ ràng cho nhập tập hợp con
8. ✅ Sử dụng `HEADER` để loại trừ hàng tiêu đề khi nhập
9. ✅ Sử dụng `HEADER` để bao gồm hàng tiêu đề khi xuất
10. ✅ Chọn phần mở rộng tệp dựa trên ký tự phân cách được sử dụng

### Lỗi Thường Gặp
- **"extra data after last expected column"**: CSV có nhiều cột hơn bảng
- **"missing data for column"**: CSV thiếu cột bắt buộc (chỉ định danh sách cột)
- **Lỗi quyền**: Kiểm tra đường dẫn tệp và quyền

### Hướng Dẫn Chọn Kiểu Dữ Liệu
- **Mã có số không đứng đầu**: `varchar` (ví dụ: "050", "001")
- **Số rất lớn**: `bigint` (ví dụ: diện tích tính bằng mét vuông)
- **Số thập phân chính xác**: `numeric(độ_chính_xác, tỷ_lệ)` (ví dụ: tọa độ)
- **Số nguyên thông thường**: `integer` (ví dụ: số lượng dân số)

### Bảng Tạm Thời
- Chỉ tồn tại cho phiên hiện tại
- Tự động xóa khi ngắt kết nối
- Hữu ích cho các chuyển đổi nhập nhiều bước
- Được tạo với `CREATE TEMPORARY TABLE` hoặc `CREATE TEMP TABLE`

## Bảng Tóm Tắt Cú Pháp Nhanh

### Nhập
```sql
COPY bảng FROM 'tệp' WITH (FORMAT CSV, HEADER);
COPY bảng (cột) FROM 'tệp' WITH (FORMAT CSV, HEADER);
```

### Xuất
```sql
COPY bảng TO 'tệp' WITH (FORMAT CSV, HEADER);
COPY bảng (cột) TO 'tệp' WITH (FORMAT CSV, HEADER);
COPY (SELECT ...) TO 'tệp' WITH (FORMAT CSV, HEADER);
```

### Tùy Chọn
- `FORMAT CSV|TEXT|BINARY`
- `HEADER` hoặc `HEADER ON`
- `DELIMITER 'ký_tự'`
- `QUOTE 'ký_tự'`

## Mẹo Ghi Nhớ

- **COPY FROM** = Nhập (dữ liệu đến TỪ tệp)
- **COPY TO** = Xuất (dữ liệu đi ĐẾN tệp)
- **HEADER** = Loại trừ khi nhập, bao gồm khi xuất
- **Bảng tạm thời** = Chỉ cho phiên, sử dụng cho chuyển đổi
- **varchar cho mã** = Bảo tồn số không đứng đầu
- **bigint cho diện tích** = Xử lý giá trị rất lớn
- **numeric(10,7)** = 10 chữ số tổng cộng, 7 sau dấu thập phân
