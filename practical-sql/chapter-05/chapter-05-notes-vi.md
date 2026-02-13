# Chương 5: Toán Học Cơ Bản và Thống Kê Với SQL - Ghi Chú & Điểm Quan Trọng

## Tham Chiếu Nhanh

### Toán Tử Toán Học

| Toán Tử | Mô Tả | Ví Dụ | Kết Quả |
|---------|-------|-------|---------|
| `+` | Phép cộng | `2 + 2` | 4 |
| `-` | Phép trừ | `9 - 1` | 8 |
| `*` | Phép nhân | `3 * 4` | 12 |
| `/` | Phép chia | `11 / 6` | 1 (số nguyên) |
| `/` | Chia thập phân | `11.0 / 6` | 1.83333 |
| `%` | Modulo (phần dư) | `11 % 6` | 5 |
| `^` | Lũy thừa | `3 ^ 4` | 81 |
| `\|/` | Căn bậc hai | `\|/ 10` | √10 |
| `sqrt()` | Hàm căn bậc hai | `sqrt(10)` | √10 |
| `\|\|/` | Căn bậc ba | `\|\|/ 10` | ∛10 |
| `!` | Giai thừa | `4 !` | 24 |

**Lưu Ý:** Lũy thừa, căn và giai thừa là cụ thể cho PostgreSQL.

### Thứ Tự Thao Tác

1. **Lũy thừa và căn**
2. **Nhân, chia, modulo**
3. **Cộng và trừ**

**Sử dụng ngoặc đơn** để thay đổi thứ tự:
```sql
SELECT 7 + 8 * 9;        -- 79 (nhân trước)
SELECT (7 + 8) * 9;      -- 135 (cộng trước)
```

## Hành Vi Kiểu Dữ Liệu

### Thao Tác Hai Số (+, -, *, /)
- Hai số nguyên → số nguyên
- Numeric ở một bên → numeric
- Có điểm nổi → double precision

### Thao Tác Một Số (^, |/, ||/, !)
- Luôn trả về numeric hoặc điểm nổi, ngay cả với đầu vào số nguyên

### Ép Buộc Chia Thập Phân
```sql
SELECT 11.0 / 6;                    -- Sử dụng giá trị thập phân
SELECT CAST(11 AS numeric(3,1)) / 6;  -- CAST số nguyên
```

## Phép Tính Cột

### Cộng/Trừ Cơ Bản
```sql
SELECT cột1, cột2, cột1 + cột2 AS "Tổng"
FROM tên_bảng;
```

### Sử Dụng Bí Danh Cột
```sql
SELECT p0010001 AS "Total Population",
       p0010003 AS "White Alone"
FROM us_counties_2010;
```

**Không có bí danh:** PostgreSQL sử dụng nhãn `?column?`

### Xác Minh Dữ Liệu
```sql
SELECT cột_tổng,
       cột1 + cột2 + cột3 AS "Tổng",
       (cột1 + cột2 + cột3) - cột_tổng AS "Khác Biệt"
FROM tên_bảng
ORDER BY "Khác Biệt" DESC;
```

## Phần Trăm

### Công Thức
```
(phần / toàn bộ) * 100
```

### Ví Dụ SQL
```sql
SELECT (CAST(cột_phần AS numeric(8,1)) / cột_toàn_bộ) * 100 AS "pct"
FROM tên_bảng;
```

**Điểm Chính:** Phải CAST sang numeric cho phép chia thập phân, nếu không kết quả là 0

## Thay Đổi Phần Trăm

### Công Thức
```
((mới - cũ) / cũ) * 100
```

### Ví Dụ SQL
```sql
SELECT round((cột_mới - cột_cũ) / cột_cũ * 100, 1) AS "pct_change"
FROM tên_bảng;
```

**Hàm round():** `round(giá_trị, số_chữ_số_thập_phân)`

## Hàm Tổng Hợp

### sum()
```sql
SELECT sum(tên_cột) AS "Tổng"
FROM tên_bảng;
```

### avg()
```sql
SELECT round(avg(tên_cột), 0) AS "Trung Bình"
FROM tên_bảng;
```

**Lưu Ý:** Sử dụng `round()` để định dạng kết quả thập phân

## Trung Vị vs. Trung Bình

### Trung Bình
- Tổng tất cả giá trị / số lượng giá trị
- Tốt cho dữ liệu được phân phối bình thường
- Nhạy cảm với giá trị ngoại lai

### Trung Vị
- Giá trị giữa trong tập hợp đã sắp xếp
- Tốt hơn cho dữ liệu lệch hoặc có giá trị ngoại lai
- Chỉ số mạnh mẽ hơn

**Kiểm Tra:** So sánh trung bình và trung vị
- Gần nhau → phân phối bình thường (sử dụng trung bình)
- Xa nhau → lệch (sử dụng trung vị)

## Tìm Trung Vị

### Sử Dụng percentile_cont()
```sql
SELECT percentile_cont(.5)
WITHIN GROUP (ORDER BY tên_cột) AS "Trung Vị"
FROM tên_bảng;
```

**Điểm Chính:** Sử dụng `percentile_cont(.5)` KHÔNG phải `percentile_disc(.5)`

### percentile_cont() vs. percentile_disc()
- **percentile_cont()**: Giá trị liên tục (có thể là thập phân giữa các số)
- **percentile_disc()**: Giá trị rời rạc (làm tròn thành số thực tế trong tập hợp)

**Cho trung vị:** Luôn sử dụng `percentile_cont(.5)`

### Ví Dụ Với Dữ Liệu Điều Tra Dân Số
```sql
SELECT round(avg(p0010001), 0) AS "Trung Bình",
       percentile_cont(.5) WITHIN GROUP (ORDER BY p0010001) AS "Trung Vị"
FROM us_counties_2010;
```

**Kết Quả:**
- Trung bình: 98,233
- Trung vị: 25,857

**Giải Thích:** Trung vị thấp hơn nhiều cho thấy dữ liệu bị lệch (một vài quận rất lớn đẩy trung bình lên)

## Tứ Phân Vị và Phân Vị

### Tìm Tứ Phân Vị
```sql
SELECT percentile_cont(array[.25,.5,.75])
WITHIN GROUP (ORDER BY tên_cột) AS "tứ_phân_vị"
FROM tên_bảng;
```

**Kết Quả:** Mảng `{11104.5,25857,66699}`
- Tứ phân vị đầu tiên (phần trăm thứ 25): 11,104.5
- Tứ phân vị thứ hai (trung vị): 25,857
- Tứ phân vị thứ ba (phần trăm thứ 75): 66,699

### Sử Dụng unnest() Để Hiển Thị Hàng
```sql
SELECT unnest(
    percentile_cont(array[.25,.5,.75])
    WITHIN GROUP (ORDER BY tên_cột)
) AS "tứ_phân_vị"
FROM tên_bảng;
```

**Kết Quả:** Mỗi tứ phân vị trong hàng riêng biệt

### Phân Vị Phổ Biến
- **Tứ phân vị**: 4 nhóm (sử dụng `.25, .5, .75`)
- **Ngũ phân vị**: 5 nhóm (sử dụng `.2, .4, .6, .8`)
- **Thập phân vị**: 10 nhóm (sử dụng `.1, .2, ..., .9`)

## Hàm median() Tùy Chỉnh

### Tạo Hàm
```sql
CREATE OR REPLACE FUNCTION _final_median(anyarray)
RETURNS float8 AS
$$
WITH q AS
(
    SELECT val FROM unnest($1) val
    WHERE VAL IS NOT NULL
    ORDER BY 1
),
cnt AS (SELECT COUNT(*) AS c FROM q)
SELECT AVG(val)::float8
FROM (
    SELECT val FROM q
    LIMIT  2 - MOD((SELECT c FROM cnt), 2)
    OFFSET GREATEST(CEIL((SELECT c FROM cnt) / 2.0) - 1,0)
) q2;
$$
LANGUAGE sql IMMUTABLE;

CREATE AGGREGATE median(anyelement) (
    SFUNC=array_append,
    STYPE=anyarray,
    FINALFUNC=_final_median,
    INITCOND='{}'
);
```

### Sử Dụng median()
```sql
SELECT median(tên_cột) AS "Trung Vị"
FROM tên_bảng;
```

**Ưu Điểm:** Cú pháp dễ hơn
**Nhược Điểm:** Cụ thể cho PostgreSQL, chậm hơn, khó thiết lập hơn

**Khuyến Nghị:** Sử dụng `percentile_cont(.5)` để có thể di chuyển

## Mode

### Tìm Giá Trị Xuất Hiện Thường Xuyên Nhất
```sql
SELECT mode() WITHIN GROUP (ORDER BY tên_cột)
FROM tên_bảng;
```

**Lưu Ý:** Cụ thể cho PostgreSQL, không phải SQL chuẩn

## Điểm Quan Trọng

### Thực Hành Tốt
1. ✅ Luôn CAST sang numeric cho phép chia thập phân từ số nguyên
2. ✅ Sử dụng ngoặc đơn để kiểm soát thứ tự thao tác
3. ✅ Sử dụng bí danh cột (AS) cho kết quả dễ đọc
4. ✅ Xác minh nhập với kiểm tra toán học
5. ✅ Tính cả trung bình và trung vị để hiểu phân phối
6. ✅ Sử dụng `percentile_cont(.5)` cho trung vị (không phải `percentile_disc`)
7. ✅ Sử dụng `round()` để định dạng kết quả số
8. ✅ Sử dụng mảng với hàm phần trăm cho nhiều phân vị
9. ✅ Sử dụng `unnest()` để hiển thị kết quả mảng trong các hàng

### Khi Nào Sử Dụng Trung Bình vs. Trung Vị
- **Trung bình**: Dữ liệu được phân phối bình thường (đường cong chuông)
- **Trung vị**: Dữ liệu lệch hoặc có giá trị ngoại lai
- **So sánh cả hai**: Để hiểu phân phối dữ liệu

### Các Mẫu Thường Gặp

#### Tính Phần Trăm
```sql
(CAST(tử_số AS numeric) / mẫu_số) * 100
```

#### Thay Đổi Phần Trăm
```sql
round((mới - cũ) / cũ * 100, 1)
```

#### Xác Minh Dữ Liệu
```sql
SELECT cột_tổng, cột1 + cột2 + cột3 AS "Tổng",
       (cột1 + cột2 + cột3) - cột_tổng AS "Khác Biệt"
FROM bảng
WHERE (cột1 + cột2 + cột3) - cột_tổng != 0;
```

#### Trung Vị Với Tổng Hợp
```sql
SELECT percentile_cont(.5) WITHIN GROUP (ORDER BY cột) AS "Trung Vị"
FROM bảng;
```

## Mẹo Ghi Nhớ

- **Modulo %**: Trả về phần dư, hữu ích cho kiểm tra chẵn/lẻ (`n % 2 = 0`)
- **CAST cho số thập phân**: Luôn CAST khi chia số nguyên cho phần trăm
- **percentile_cont(.5)**: Sử dụng cho trung vị (liên tục, tính trung bình giá trị giữa)
- **percentile_disc(.5)**: Rời rạc, làm tròn thành số thực tế (không cho trung vị)
- **Thứ tự thao tác**: Lũy thừa → Nhân/Chia → Cộng/Trừ
- **Trung bình vs Trung vị**: So sánh cả hai để hiểu phân phối dữ liệu
- **round()**: Nhận (giá_trị, số_chữ_số_thập_phân)
- **unnest()**: Chuyển đổi mảng thành hàng để dễ đọc
