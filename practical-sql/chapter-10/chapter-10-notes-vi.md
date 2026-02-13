# Chương 10: Các Hàm Thống Kê trong SQL - Ghi Chú & Điểm Chính

## Tham Chiếu Nhanh

### Khái Niệm Cốt Lõi
- **Các hàm thống kê** trong SQL giúp phân tích mối quan hệ và mẫu trong dữ liệu
- **Tương quan** đo lường sức mạnh mối quan hệ giữa các biến
- **Hồi quy** dự đoán giá trị dựa trên mối quan hệ
- **Xếp hạng** sắp xếp dữ liệu với các vị trí có số
- **Tỷ lệ** chuẩn hóa dữ liệu cho so sánh công bằng

## Các Hàm Chính

### Tương Quan: `corr(Y, X)`
```sql
SELECT corr(median_hh_income, pct_bachelors_higher) AS correlation
FROM acs_2011_2015_stats;
```

**Điểm Chính:**
- Trả về hệ số tương quan Pearson (r)
- Phạm vi: -1 đến 1
- Dương = mối quan hệ trực tiếp (cả hai cùng tăng)
- Âm = mối quan hệ nghịch đảo (một tăng, một giảm)
- Gần 0 = mối quan hệ yếu/không có

**Hướng Dẫn Giải Thích:**
- 0 = Không có mối quan hệ
- 0.1-0.29 = Mối quan hệ yếu
- 0.3-0.59 = Mối quan hệ vừa phải
- 0.6-0.99 = Mối quan hệ mạnh đến gần hoàn hảo
- 1 = Mối quan hệ hoàn hảo

**Quan Trọng:** Tương quan ≠ Nhân quả!

### Các Hàm Hồi Quy

#### `regr_slope(Y, X)`
```sql
SELECT regr_slope(median_hh_income, pct_bachelors_higher) AS slope
FROM acs_2011_2015_stats;
```
- Trả về hệ số góc (b) của đường hồi quy
- Cho thấy thay đổi trong Y trên mỗi đơn vị thay đổi của X

#### `regr_intercept(Y, X)`
```sql
SELECT regr_intercept(median_hh_income, pct_bachelors_higher) AS y_intercept
FROM acs_2011_2015_stats;
```
- Trả về giao điểm y (a) của đường hồi quy
- Giá trị của Y khi X = 0

#### `regr_r2(Y, X)`
```sql
SELECT regr_r2(median_hh_income, pct_bachelors_higher) AS r_squared
FROM acs_2011_2015_stats;
```
- Trả về hệ số xác định (r²)
- Phạm vi: 0 đến 1
- Cho thấy tỷ lệ phần trăm sự biến thiên được giải thích bởi biến độc lập
- Ví dụ: 0.465 = 47% sự biến thiên được giải thích

**Công Thức Hồi Quy:** Y = bX + a

### Các Hàm Xếp Hạng

#### `rank()`
```sql
SELECT company, rank() OVER (ORDER BY widget_output DESC)
FROM widget_companies;
```
- Bao gồm khoảng trống sau trận hòa
- Ví dụ: 1, 2, 3, 3, 5 (bỏ qua 4)

#### `dense_rank()`
```sql
SELECT company, dense_rank() OVER (ORDER BY widget_output DESC)
FROM widget_companies;
```
- Không có khoảng trống sau trận hòa
- Ví dụ: 1, 2, 3, 3, 4 (không bỏ qua)

**Khuyến Nghị:** Sử dụng `rank()` cho hầu hết các tình huống (chính xác hơn)

### Xếp Hạng Trong Các Nhóm: `PARTITION BY`
```sql
SELECT 
    category,
    store,
    rank() OVER (PARTITION BY category ORDER BY unit_sales DESC)
FROM store_sales;
```
- Xếp hạng trong mỗi danh mục riêng biệt
- Hữu ích cho: người biểu diễn hàng đầu theo bộ phận, phim hay nhất theo thể loại, v.v.

## Tính Tỷ Lệ

### Công Thức
```
Tỷ lệ trên 1.000 = (Số đếm / Dân số) × 1.000
```

### Ví Dụ SQL
```sql
SELECT 
    city,
    round((property_crime::numeric / population) * 1000, 1) AS pc_per_1000
FROM fbi_crime_data_2015
WHERE population >= 500000
ORDER BY (property_crime::numeric / population) DESC;
```

**Điểm Chính:**
- Luôn ép kiểu sang `numeric` khi chia số nguyên
- Sử dụng `round()` để dễ đọc
- Tỷ lệ cho phép so sánh công bằng trên các kích thước dân số khác nhau

## Các Mẫu Thường Gặp

### Làm Tròn Giá Trị Tương Quan
```sql
SELECT round(corr(Y, X)::numeric, 2) AS correlation
FROM table_name;
```

### Nhiều Tương Quan
```sql
SELECT
    round(corr(var1, var2)::numeric, 2) AS corr1,
    round(corr(var3, var4)::numeric, 2) AS corr2
FROM table_name;
```

### Phân Tích Hồi Quy Hoàn Chỉnh
```sql
SELECT 
    round(regr_slope(Y, X)::numeric, 2) AS slope,
    round(regr_intercept(Y, X)::numeric, 2) AS y_intercept,
    round(regr_r2(Y, X)::numeric, 3) AS r_squared
FROM table_name;
```

### Xếp Hạng với Nhiều Cột
```sql
SELECT 
    column1,
    column2,
    rank() OVER (ORDER BY value_column DESC) AS overall_rank,
    rank() OVER (PARTITION BY category ORDER BY value_column DESC) AS category_rank
FROM table_name;
```

## Thực Hành Tốt Nhất

### ✅ Nên Làm
1. Sử dụng `corr()` để khám phá dữ liệu sơ bộ
2. Làm tròn giá trị tương quan/hồi quy để dễ đọc
3. Sử dụng `rank()` cho hầu hết các tình huống xếp hạng
4. Tính tỷ lệ khi so sánh các kích thước dân số khác nhau
5. Sử dụng `PARTITION BY` cho xếp hạng trong các nhóm
6. Ép kiểu sang `numeric` khi chia số nguyên cho tỷ lệ

### ❌ Không Nên Làm
1. Đừng nhầm lẫn tương quan với nhân quả
2. Đừng sử dụng số đếm thô để so sánh trên các kích thước khác nhau
3. Đừng bỏ qua kiểm tra ý nghĩa thống kê (cho sản xuất)
4. Đừng sử dụng `dense_rank()` khi bạn cần số đếm vị trí chính xác

## Các Lưu Ý Quan Trọng

### Hạn Chế của Tương Quan
- **Tương quan ≠ Nhân quả**: Tương quan mạnh không có nghĩa là một cái gây ra cái kia
- **Ý nghĩa thống kê**: Kết quả nên được kiểm tra về ý nghĩa
- **Tương quan giả**: Nhiều biến tương quan nhưng không có ý nghĩa
- **Ví dụ**: Tỷ lệ ly hôn ở Maine vs. tiêu thụ bơ thực vật

### Hạn Chế của Hồi Quy
- Các biến nên tuân theo phân phối chuẩn (đường cong chuông)
- Cần kiểm tra bổ sung trước khi chấp nhận kết quả
- Các hàm SQL là sơ bộ - sử dụng công cụ chuyên dụng cho phân tích nghiêm ngặt

### Hạn Chế của Tỷ Lệ
- FBI không khuyến khích xếp hạng từ dữ liệu tội phạm
- Nhiều yếu tố ảnh hưởng đến tỷ lệ (mật độ dân số, kinh tế, khí hậu)
- Báo cáo không đầy đủ có thể ảnh hưởng đến chất lượng dữ liệu

## Khi Nào Sử Dụng Mỗi Hàm

| Hàm | Sử Dụng Khi |
|-----|-------------|
| `corr(Y, X)` | Đo lường sức mạnh mối quan hệ, khám phá sơ bộ |
| `regr_slope(Y, X)` | Dự đoán giá trị, hiểu tỷ lệ thay đổi |
| `regr_intercept(Y, X)` | Tìm giá trị cơ sở, tạo mô hình hồi quy |
| `regr_r2(Y, X)` | Đo lường sự biến thiên được giải thích, đánh giá độ phù hợp mô hình |
| `rank()` | Tạo xếp hạng có số, bảng xếp hạng |
| `dense_rank()` | Xếp hạng không có khoảng trống (hiếm khi cần) |
| `PARTITION BY` | Xếp hạng trong các danh mục/nhóm |
| Tỷ lệ | So sánh các quần thể có kích thước khác nhau |

## Kiểu Dữ Liệu & Ép Kiểu

### Cho Tính Tỷ Lệ
```sql
-- Luôn ép kiểu sang numeric khi chia số nguyên
(property_crime::numeric / population) * 1000
```

### Cho Làm Tròn
```sql
-- Ép kiểu sang numeric trước khi làm tròn
round(corr(Y, X)::numeric, 2)
round(regr_slope(Y, X)::numeric, 2)
```

## Ví Dụ Truy Vấn

### Tương Quan Giáo Dục vs. Thu Nhập
```sql
SELECT corr(median_hh_income, pct_bachelors_higher) AS bachelors_income_r
FROM acs_2011_2015_stats;
-- Kết quả: ~0.68 (mối quan hệ dương mạnh)
```

### Dự Đoán Thu Nhập Từ Giáo Dục
```sql
SELECT 
    round(regr_slope(median_hh_income, pct_bachelors_higher)::numeric, 2) AS slope,
    round(regr_intercept(median_hh_income, pct_bachelors_higher)::numeric, 2) AS y_intercept
FROM acs_2011_2015_stats;
-- Sử dụng công thức: Y = slope * X + y_intercept
-- Ví dụ: Y = 926.95 * 30 + 27901.15 = $55.710
```

### Xếp Hạng Công Ty
```sql
SELECT 
    company,
    widget_output,
    rank() OVER (ORDER BY widget_output DESC) AS rank
FROM widget_companies;
```

### Xếp Hạng Cửa Hàng Theo Danh Mục
```sql
SELECT 
    category,
    store,
    unit_sales,
    rank() OVER (PARTITION BY category ORDER BY unit_sales DESC) AS rank
FROM store_sales;
```

### Tỷ Lệ Tội Phạm
```sql
SELECT 
    city,
    st,
    round((property_crime::numeric / population) * 1000, 1) AS pc_per_1000
FROM fbi_crime_data_2015
WHERE population >= 500000
ORDER BY pc_per_1000 DESC;
```

## Điểm Chính Cần Nhớ

1. **Các hàm thống kê** cung cấp phân tích mạnh mẽ mà không cần xuất dữ liệu
2. **Tương quan** đo lường mối quan hệ nhưng không chứng minh nhân quả
3. **Hồi quy** dự đoán giá trị bằng cách sử dụng phương trình tuyến tính
4. **Xếp hạng** sắp xếp dữ liệu với `rank()` hoặc `dense_rank()`
5. **PARTITION BY** cho phép xếp hạng trong các nhóm
6. **Tỷ lệ** chuẩn hóa dữ liệu cho so sánh công bằng
7. Luôn **làm tròn** giá trị tương quan/hồi quy để dễ đọc
8. Luôn **ép kiểu sang numeric** khi chia số nguyên
9. Sử dụng các hàm thống kê SQL cho **phân tích sơ bộ**
10. Cân nhắc **ý nghĩa thống kê** cho sử dụng sản xuất

## Mẹo Ghi Nhớ

- **corr()** = Tương quan (sức mạnh mối quan hệ)
- **regr_** = Hồi quy (các hàm dự đoán)
- **rank()** = Xếp hạng có khoảng trống (phổ biến nhất)
- **dense_rank()** = Xếp hạng không có khoảng trống (hiếm)
- **PARTITION BY** = Xếp hạng trong các nhóm
- **Công thức tỷ lệ** = (Số đếm / Dân số) × 1.000
- **Phạm vi r** = -1 đến 1 (âm = nghịch đảo, dương = trực tiếp)
- **Phạm vi r²** = 0 đến 1 (tỷ lệ phần trăm được giải thích)

## Xem Trước Chương Tiếp Theo

Chương 11: Làm Việc với Ngày và Giờ
- Các kiểu dữ liệu ngày/giờ
- Trích xuất các thành phần
- Xử lý múi giờ
- Tính toán ngày
