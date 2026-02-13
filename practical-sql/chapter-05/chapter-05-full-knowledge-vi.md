# Chương 5: Toán Học Cơ Bản và Thống Kê Với SQL

## Giới Thiệu

Nếu dữ liệu của bạn bao gồm bất kỳ kiểu dữ liệu số nào chúng ta đã khám phá trong Chương 3—số nguyên, số thập phân hoặc số điểm nổi—sớm hay muộn phân tích của bạn sẽ bao gồm một số phép tính. Ví dụ, bạn có thể muốn biết giá trị trung bình của tất cả các giá trị đô la trong một cột, hoặc cộng các giá trị trong hai cột để tạo tổng cho mỗi hàng. SQL xử lý các phép tính từ toán học cơ bản đến thống kê nâng cao.

Trong chương này, chúng ta sẽ bắt đầu với những điều cơ bản và tiến tới các hàm toán học và thống kê cơ bản. Chúng ta cũng sẽ thảo luận về các phép tính liên quan đến phần trăm và thay đổi phần trăm. Đối với một số bài tập, chúng ta sẽ sử dụng dữ liệu Điều Tra Dân Số 2010 mà bạn đã nhập trong Chương 4.

## Toán Tử Toán Học

Hãy bắt đầu với toán học cơ bản bạn đã học ở trường tiểu học. SQL cung cấp chín toán tử toán học bạn sẽ sử dụng thường xuyên nhất trong các phép tính của mình. Bốn toán tử đầu tiên (cộng, trừ, nhân và chia) là một phần của tiêu chuẩn ANSI SQL được triển khai trong tất cả các hệ thống cơ sở dữ liệu. Các toán tử khác là toán tử cụ thể của PostgreSQL, mặc dù nếu bạn đang sử dụng cơ sở dữ liệu khác, nó có thể có các hàm hoặc toán tử để thực hiện các thao tác đó.

### Toán Tử Toán Học Cơ Bản

| Toán Tử | Mô Tả |
|---------|-------|
| `+` | Phép cộng |
| `-` | Phép trừ |
| `*` | Phép nhân |
| `/` | Phép chia (chỉ trả về thương số, không có phần dư) |
| `%` | Modulo (chỉ trả về phần dư) |
| `^` | Lũy thừa |
| `\|/` | Căn bậc hai |
| `\|\|/` | Căn bậc ba |
| `!` | Giai thừa |

**Lưu Ý:** Toán tử modulo (`%`) hoạt động trong Microsoft SQL Server và MySQL cũng như với PostgreSQL. Nếu bạn đang sử dụng hệ thống cơ sở dữ liệu khác, hãy kiểm tra tài liệu của nó.

### Toán Học và Kiểu Dữ Liệu

Khi bạn làm việc với các ví dụ, hãy lưu ý kiểu dữ liệu của mỗi kết quả, được liệt kê bên dưới tên cột trong lưới kết quả của pgAdmin. Kiểu được trả về cho một phép tính sẽ thay đổi tùy thuộc vào thao tác và kiểu dữ liệu của các số đầu vào.

**Đối với các phép tính có toán tử giữa hai số** (cộng, trừ, nhân và chia), kiểu dữ liệu được trả về tuân theo mẫu này:
- Hai số nguyên trả về một số nguyên
- Một numeric ở một trong hai phía của toán tử trả về một numeric
- Bất cứ thứ gì với số điểm nổi trả về số điểm nổi kiểu `double precision`

**Đối với các hàm lũy thừa, căn và giai thừa:**
- Mỗi hàm lấy một số trước hoặc sau toán tử
- Trả về các kiểu numeric và điểm nổi, ngay cả khi đầu vào là số nguyên

Đôi khi kiểu dữ liệu của kết quả sẽ phù hợp với nhu cầu của bạn; những lúc khác, bạn có thể cần sử dụng `CAST` để thay đổi kiểu dữ liệu, chẳng hạn như nếu bạn cần đưa kết quả vào một hàm nhận một kiểu nhất định.

### Cộng, Trừ và Nhân

Hãy bắt đầu với phép cộng, trừ và nhân số nguyên đơn giản:

```sql
SELECT 2 + 2;    -- Trả về 4
SELECT 9 - 1;    -- Trả về 8
SELECT 3 * 4;    -- Trả về 12
```

**Lưu Ý:** Với PostgreSQL, SQL Server của Microsoft, MySQL và một số hệ thống quản lý cơ sở dữ liệu khác, có thể bỏ qua tên bảng cho các thao tác toán học và chuỗi khi kiểm tra. Để dễ đọc, hãy sử dụng một khoảng trắng trước và sau toán tử toán học.

Đầu ra hiển thị trong một cột, như với bất kỳ kết quả truy vấn nào. Nhưng vì chúng ta không truy vấn bảng và chỉ định cột, kết quả xuất hiện bên dưới tên `?column?`, biểu thị một cột không xác định. Điều đó ổn—chúng ta không ảnh hưởng đến bất kỳ dữ liệu nào trong bảng, chỉ hiển thị kết quả.

### Phép Chia và Modulo

Phép chia với SQL trở nên phức tạp hơn một chút vì sự khác biệt giữa toán học với số nguyên và toán học với số thập phân. Thêm vào modulo, một toán tử chỉ trả về phần dư trong phép chia, và kết quả có thể gây nhầm lẫn.

```sql
SELECT 11 / 6;                              -- Trả về 1 (phép chia số nguyên)
SELECT 11 % 6;                              -- Trả về 5 (phần dư)
SELECT 11.0 / 6;                            -- Trả về 1.83333 (phép chia thập phân)
SELECT CAST(11 AS numeric(3,1)) / 6;        -- Trả về 1.83333 (ép buộc thập phân)
```

**Điểm Chính:**
- Khi chia hai số nguyên, SQL chỉ trả về thương số nguyên (không có phần dư)
- Để lấy phần dư, sử dụng toán tử modulo `%`
- Để có phép chia thập phân, sử dụng giá trị numeric/decimal hoặc `CAST` một số nguyên thành numeric

**Trường Hợp Sử Dụng Modulo:**
- Lấy phần dư
- Kiểm tra điều kiện (ví dụ: kiểm tra xem một số có chẵn không: `number % 2 = 0`)

### Lũy Thừa, Căn và Giai Thừa

SQL theo phong cách PostgreSQL cũng cung cấp các toán tử để bình phương, lập phương hoặc nâng một số cơ số lên lũy thừa, cũng như tìm căn hoặc giai thừa của một số:

```sql
SELECT 3 ^ 4;           -- Lũy thừa: 3 mũ 4 = 81
SELECT |/ 10;           -- Căn bậc hai: √10
SELECT sqrt(10);        -- Căn bậc hai (hàm): √10
SELECT ||/ 10;          -- Căn bậc ba: ∛10
SELECT 4 !;             -- Giai thừa: 4! = 4 × 3 × 2 × 1 = 24
```

**Lưu Ý:**
- Toán tử lũy thừa (`^`) nâng một số cơ số lên lũy thừa
- Căn bậc hai có thể được tìm bằng toán tử `|/` hoặc hàm `sqrt(n)`
- Căn bậc ba sử dụng toán tử `||/`
- Giai thừa (`!`) là toán tử hậu tố (đến sau số)
- Giai thừa hữu ích để xác định có bao nhiêu cách các mục có thể được sắp xếp

**Quan Trọng:** Các toán tử này là cụ thể cho PostgreSQL; chúng không phải là một phần của tiêu chuẩn SQL. Nếu bạn đang sử dụng ứng dụng cơ sở dữ liệu khác, hãy kiểm tra tài liệu của nó để xem cách nó triển khai các thao tác này.

### Chú Ý Thứ Tự Thao Tác

SQL tuân theo tiêu chuẩn toán học đã được thiết lập cho thứ tự thao tác (ưu tiên toán tử). Đối với các toán tử PostgreSQL đã thảo luận cho đến nay, thứ tự là:

1. **Lũy thừa và căn**
2. **Nhân, chia, modulo**
3. **Cộng và trừ**

Với các quy tắc này, bạn sẽ cần đặt một thao tác trong ngoặc đơn nếu bạn muốn tính toán nó theo thứ tự khác.

**Ví Dụ:**
```sql
SELECT 7 + 8 * 9;        -- Trả về 79 (nhân trước)
SELECT (7 + 8) * 9;      -- Trả về 135 (cộng trước do ngoặc đơn)

SELECT 3 ^ 3 - 1;        -- Trả về 26 (lũy thừa trước: 27 - 1)
SELECT 3 ^ (3 - 1);      -- Trả về 9 (trừ trước: 3^2)
```

Hãy ghi nhớ ưu tiên toán tử để tránh phải sửa phân tích của bạn sau này!

## Thực Hiện Toán Học Trên Các Cột Bảng Điều Tra Dân Số

Hãy sử dụng các toán tử toán học SQL được sử dụng thường xuyên nhất trên dữ liệu thực bằng cách khám phá bảng dân số Điều Tra Dân Số 2010, `us_counties_2010`, mà bạn đã nhập trong Chương 4. Thay vì sử dụng số trong truy vấn, chúng ta sẽ sử dụng tên của các cột chứa các số. Khi chúng ta thực thi truy vấn, phép tính sẽ xảy ra trên mỗi hàng của bảng.

### Hiểu Về Dữ Liệu Chủng Tộc Điều Tra Dân Số

Mẫu Điều Tra Dân Số 2010 mà mỗi hộ gia đình nhận được—cái gọi là "mẫu ngắn"—cho phép mọi người chọn một hoặc nhiều hộp dưới câu hỏi về chủng tộc. Những người chọn một hộp được tính trong các danh mục như "Chỉ Người Da Trắng" hoặc "Chỉ Người Da Đen hoặc Người Mỹ Gốc Phi". Những người trả lời chọn nhiều hơn một hộp được lập bảng trong danh mục tổng thể "Hai hoặc Nhiều Chủng Tộc", và tập dữ liệu điều tra dân số phân tích chi tiết những điều đó.

### Sử Dụng Bí Danh Cột

Trong `us_counties_2010`, mỗi cột dữ liệu chủng tộc và hộ gia đình chứa một mã điều tra dân số. Ví dụ, cột "Chỉ Người Châu Á" được báo cáo là `p0010006`. Mặc dù những mã đó có thể tiết kiệm và gọn gàng, chúng làm cho việc hiểu cột nào là cột nào trở nên khó khăn khi truy vấn trả về chỉ với mã đó.

Chúng ta có thể sử dụng từ khóa `AS` để cung cấp cho mỗi cột một bí danh dễ đọc hơn trong tập kết quả:

```sql
SELECT geo_name,
       state_us_abbreviation AS "st",
       p0010001 AS "Total Population",
       p0010003 AS "White Alone",
       p0010004 AS "Black or African American Alone",
       p0010005 AS "Am Indian/Alaska Native Alone",
       p0010006 AS "Asian Alone",
       p0010007 AS "Native Hawaiian and Other Pacific Islander Alone",
       p0010008 AS "Some Other Race Alone",
       p0010009 AS "Two or More Races"
FROM us_counties_2010;
```

**Lưu Ý:** Chúng ta có thể đổi tên tất cả các cột khi nhập, nhưng với điều tra dân số, tốt nhất là sử dụng mã để tham chiếu đến cùng tên cột trong tài liệu nếu cần.

### Cộng và Trừ Các Cột

Bây giờ, hãy thử một phép tính đơn giản trên hai cột chủng tộc, cộng số người xác định là chỉ người da trắng hoặc chỉ người da đen trong mỗi quận:

```sql
SELECT geo_name,
       state_us_abbreviation AS "st",
       p0010003 AS "White Alone",
       p0010004 AS "Black Alone",
       p0010003 + p0010004 AS "Total White and Black"
FROM us_counties_2010;
```

Cung cấp `p0010003 + p0010004` như một trong các cột trong câu lệnh SELECT xử lý phép tính. Một lần nữa, chúng ta sử dụng từ khóa `AS` để cung cấp một bí danh dễ đọc cho cột. Nếu bạn không cung cấp bí danh, PostgreSQL sử dụng nhãn `?column?`, điều này ít hữu ích hơn nhiều.

### Xác Minh Dữ Liệu Với Toán Học

Hãy xây dựng trên điều này để kiểm tra dữ liệu của chúng ta và xác minh rằng chúng ta đã nhập các cột đúng cách. Sáu cột chủng tộc "Alone" cộng với cột "Two or More Races" nên cộng lại bằng cùng số với tổng dân số:

```sql
SELECT geo_name,
       state_us_abbreviation AS "st",
       p0010001 AS "Total",
       p0010003 + p0010004 + p0010005 + p0010006 + p0010007
       + p0010008 + p0010009 AS "All Races",
       (p0010003 + p0010004 + p0010005 + p0010006 + p0010007
       + p0010008 + p0010009) - p0010001 AS "Difference"
FROM us_counties_2010
ORDER BY "Difference" DESC;
```

Truy vấn này bao gồm:
- Tổng dân số
- Một phép tính cộng bảy cột chủng tộc như "All Races"
- Một cột trừ cột tổng dân số từ tổng các cột chủng tộc

Cột "Difference" nên chứa số không trong mỗi hàng nếu tất cả dữ liệu ở đúng vị trí. Để tránh phải quét tất cả 3,143 hàng, chúng ta thêm mệnh đề `ORDER BY` trên cột được đặt tên. Bất kỳ hàng nào hiển thị sự khác biệt sẽ xuất hiện ở đầu hoặc cuối kết quả truy vấn.

**Thực Hành Tốt:** Bất cứ khi nào bạn gặp hoặc nhập một tập dữ liệu mới, hãy thực hiện các kiểm tra nhỏ như thế này. Chúng giúp bạn hiểu rõ hơn về dữ liệu và ngăn chặn bất kỳ vấn đề tiềm ẩn nào trước khi bạn đi sâu vào phân tích.

## Tìm Phần Trăm Của Toàn Bộ

Hãy đi sâu hơn vào dữ liệu điều tra dân số để tìm sự khác biệt có ý nghĩa trong nhân khẩu học dân số của các quận. Một cách để làm điều này (với bất kỳ tập dữ liệu nào, thực tế) là tính toán phần trăm của toàn bộ mà một biến cụ thể đại diện.

### Công Thức Phần Trăm

Để tính phần trăm của toàn bộ, chia số trong câu hỏi cho tổng. Ví dụ, nếu bạn có một giỏ 12 quả táo và sử dụng 9 trong một chiếc bánh, đó sẽ là `9 / 12` hoặc `.75`—thường được biểu thị là 75 phần trăm.

### Tính Phần Trăm Trong SQL

Để tính cho mỗi quận phần trăm dân số báo cáo chủng tộc của họ là Châu Á:

```sql
SELECT geo_name,
       state_us_abbreviation AS "st",
       (CAST(p0010006 AS numeric(8,1)) / p0010001) * 100 AS "pct_asian"
FROM us_counties_2010
ORDER BY "pct_asian" DESC;
```

**Điểm Chính:**
- Truy vấn chia `p0010006` (số lượng chỉ người Châu Á) cho `p0010001` (tổng dân số)
- Nếu chúng ta sử dụng dữ liệu như kiểu số nguyên ban đầu của chúng, chúng ta sẽ không nhận được kết quả phân số mà chúng ta cần: mỗi hàng sẽ hiển thị kết quả là 0, thương số
- Thay vào đó, chúng ta ép buộc phép chia thập phân bằng cách sử dụng `CAST` trên một trong các số nguyên
- Phần cuối nhân kết quả với 100 để trình bày kết quả như một phân số của 100—cách hầu hết mọi người hiểu phần trăm

**Ví Dụ Kết Quả:**
```
geo_name                    | st | pct_asian
----------------------------|----|-----------------------
Honolulu County             | HI | 43.89497769109962474000
Aleutians East Borough      | AK | 35.97580388411333970100
San Francisco County        | CA | 33.27165361664607226500
```

## Theo Dõi Thay Đổi Phần Trăm

Một chỉ số quan trọng khác trong phân tích dữ liệu là thay đổi phần trăm: một số lớn hơn hoặc nhỏ hơn bao nhiêu so với số khác? Các phép tính thay đổi phần trăm thường được sử dụng khi phân tích thay đổi theo thời gian, và chúng đặc biệt hữu ích để so sánh thay đổi giữa các mục tương tự.

### Công Thức Thay Đổi Phần Trăm

Công thức để tính thay đổi phần trăm có thể được biểu thị như sau:
```
(số mới – số cũ) / số cũ
```

Vì vậy, nếu bạn sở hữu một quầy nước chanh và bán 73 ly nước chanh hôm nay và 59 ly hôm qua, bạn sẽ tính thay đổi phần trăm từng ngày như sau:
```
(73 – 59) / 59 = .237 = 23.7%
```

### Ví Dụ: Thay Đổi Chi Tiêu Phòng Ban

Hãy thử điều này với một tập hợp nhỏ dữ liệu kiểm tra liên quan đến chi tiêu trong các phòng ban của một chính phủ địa phương giả định:

```sql
CREATE TABLE percent_change (
    department varchar(20),
    spend_2014 numeric(10,2),
    spend_2017 numeric(10,2)
);

INSERT INTO percent_change
VALUES
('Building', 250000, 289000),
('Assessor', 178556, 179500),
('Library', 87777, 90001),
('Clerk', 451980, 650000),
('Police', 250000, 223000),
('Recreation', 199000, 195000);

SELECT department,
       spend_2014,
       spend_2017,
       round((spend_2017 - spend_2014) / spend_2014 * 100, 1) AS "pct_change"
FROM percent_change;
```

**Cách Hoạt Động:**
- Công thức thay đổi phần trăm trừ `spend_2014` từ `spend_2017` và sau đó chia cho `spend_2014`
- Chúng ta nhân với 100 để biểu thị kết quả như một phần của 100
- Hàm `round()` loại bỏ tất cả trừ một chữ số thập phân
- Hàm nhận hai đối số: cột hoặc biểu thức cần làm tròn, và số chữ số thập phân để hiển thị

**Kết Quả:**
```
department  | spend_2014  | spend_2017  | pct_change
------------|-------------|-------------|----------
Building    | 250000.00   | 289000.00   | 15.6
Assessor    | 178556.00   | 179500.00   | 0.5
Library     | 87777.00    | 90001.00    | 2.5
Clerk       | 451980.00   | 650000.00   | 43.8
Police      | 250000.00   | 223000.00   | -10.8
Recreation  | 199000.00   | 195000.00   | -2.0
```

## Hàm Tổng Hợp Cho Trung Bình và Tổng

Cho đến nay, chúng ta đã thực hiện các thao tác toán học trên các cột trong mỗi hàng của bảng. SQL cũng cho phép bạn tính toán một kết quả từ các giá trị trong cùng một cột bằng cách sử dụng **hàm tổng hợp**. Hàm tổng hợp tính toán một kết quả duy nhất từ nhiều đầu vào.

### Hàm Tổng Hợp Phổ Biến

Hai hàm tổng hợp được sử dụng nhiều nhất trong phân tích dữ liệu là `avg()` và `sum()`.

### Sử Dụng sum() và avg()

Quay lại bảng điều tra dân số `us_counties_2010`, hợp lý là muốn tính tổng dân số của tất cả các quận cộng với dân số trung bình của tất cả các quận:

```sql
SELECT sum(p0010001) AS "County Sum",
       round(avg(p0010001), 0) AS "County Average"
FROM us_counties_2010;
```

**Kết Quả:**
```
County Sum  | County Average
------------|---------------
308745538   | 98233
```

Dân số cho tất cả các quận ở Hoa Kỳ vào năm 2010 cộng lại lên đến khoảng 308.7 triệu, và dân số quận trung bình là 98,233.

**Lưu Ý:** Chúng ta sử dụng hàm `round()` để loại bỏ các số sau dấu thập phân trong phép tính trung bình.

## Tìm Trung Vị

Giá trị trung vị trong một tập hợp số là một chỉ số quan trọng, nếu không quan trọng hơn, so với trung bình. Đây là sự khác biệt giữa trung vị và trung bình, và tại sao trung vị quan trọng:

### Trung Bình vs. Trung Vị

- **Trung bình**: Tổng của tất cả các giá trị chia cho số lượng giá trị
- **Trung vị**: Giá trị "giữa" trong một tập hợp giá trị đã được sắp xếp

### Tại Sao Trung Vị Quan Trọng

Hãy xem xét ví dụ này: giả sử sáu đứa trẻ, tuổi 10, 11, 10, 9, 13 và 12, đi tham quan. Thật dễ dàng để cộng các tuổi và chia cho sáu để có tuổi trung bình của nhóm:
```
(10 + 11 + 10 + 9 + 13 + 12) / 6 = 10.8
```

Vì các tuổi nằm trong một phạm vi hẹp, trung bình 10.8 là một đại diện tốt của nhóm. Nhưng trung bình ít hữu ích hơn khi các giá trị được nhóm lại, hoặc lệch, về một đầu của phân phối, hoặc nếu nhóm bao gồm các giá trị ngoại lai.

Ví dụ, điều gì sẽ xảy ra nếu một người giám sát lớn tuổi hơn tham gia chuyến tham quan? Với các tuổi 10, 11, 10, 9, 13, 12 và 46, tuổi trung bình tăng đáng kể:
```
(10 + 11 + 10 + 9 + 13 + 12 + 46) / 7 = 15.9
```

Bây giờ trung bình không đại diện tốt cho nhóm vì giá trị ngoại lai làm lệch nó, làm cho nó trở thành một chỉ số không đáng tin cậy.

### Cách Trung Vị Hoạt Động

Trung vị là điểm giữa trong một danh sách giá trị đã được sắp xếp—điểm mà tại đó một nửa giá trị lớn hơn và một nửa nhỏ hơn. Sử dụng ví dụ chuyến tham quan, chúng ta sắp xếp tuổi của những người tham dự từ thấp đến cao:
```
9, 10, 10, 11, 12, 13, 46
```

Giá trị giữa (trung vị) là 11. Một nửa giá trị cao hơn, và một nửa thấp hơn. Với nhóm này, trung vị 11 là một bức tranh tốt hơn về tuổi điển hình so với trung bình 15.9.

**Nếu tập hợp giá trị là số chẵn**, bạn tính trung bình của hai số giữa để tìm trung vị. Hãy thêm một học sinh khác (tuổi 12) vào chuyến tham quan:
```
9, 10, 10, 11, 12, 12, 13, 46
```

Bây giờ, hai giá trị giữa là 11 và 12. Để tìm trung vị, chúng ta tính trung bình chúng: 11.5.

### Ứng Dụng Thực Tế

Trung vị được báo cáo thường xuyên trong tin tức tài chính. Các báo cáo về giá nhà thường sử dụng trung vị vì một vài giao dịch bán nhà lớn trong một mã ZIP vốn khiêm tốn có thể làm cho trung bình trở nên vô dụng. Điều tương tự cũng áp dụng cho mức lương của cầu thủ thể thao: một hoặc hai siêu sao có thể làm lệch trung bình của đội.

**Một kiểm tra tốt** là tính cả trung bình và trung vị cho một nhóm giá trị. Nếu chúng gần nhau, nhóm có thể được phân phối bình thường (đường cong chuông quen thuộc), và trung bình hữu ích. Nếu chúng xa nhau, các giá trị không được phân phối bình thường và trung vị là đại diện tốt hơn.

### Tìm Trung Vị Với Hàm Phần Trăm

PostgreSQL (như với hầu hết các cơ sở dữ liệu quan hệ) không có hàm `median()` tích hợp, tương tự như những gì bạn sẽ tìm thấy trong Excel hoặc các chương trình bảng tính khác. Nó cũng không được bao gồm trong tiêu chuẩn ANSI SQL. Nhưng chúng ta có thể sử dụng hàm phần trăm SQL để tìm trung vị cũng như các điểm phân vị hoặc điểm cắt khác, là các điểm chia một nhóm số thành các kích thước bằng nhau.

**Hàm phần trăm là một phần của tiêu chuẩn ANSI SQL.**

### Hiểu Về Phần Trăm

Trong thống kê, phần trăm biểu thị điểm trong một tập hợp dữ liệu đã được sắp xếp mà dưới đó một tỷ lệ phần trăm nhất định của dữ liệu được tìm thấy. Ví dụ, một bác sĩ có thể nói với bạn rằng chiều cao của bạn đặt bạn ở phần trăm thứ 60 cho một người trưởng thành trong nhóm tuổi của bạn. Điều đó có nghĩa là 60 phần trăm người có chiều cao bằng hoặc thấp hơn bạn.

Trung vị tương đương với phần trăm thứ 50—một lần nữa, một nửa giá trị ở dưới và một nửa ở trên.

### percentile_cont() vs. percentile_disc()

Hàm phần trăm SQL cho phép chúng ta tính toán trung vị dễ dàng, mặc dù chúng ta phải chú ý đến sự khác biệt trong cách hai phiên bản của hàm—`percentile_cont(n)` và `percentile_disc(n)`—xử lý các phép tính. Cả hai hàm đều là một phần của tiêu chuẩn ANSI SQL và có mặt trong PostgreSQL, Microsoft SQL Server và các cơ sở dữ liệu khác.

- **`percentile_cont(n)`**: Tính toán phần trăm như các giá trị **liên tục**. Nghĩa là, kết quả không phải là một trong các số trong tập dữ liệu nhưng có thể là giá trị thập phân giữa hai số. Điều này tuân theo phương pháp tính toán trung vị trên số lượng giá trị chẵn, trong đó trung vị là trung bình của hai số giữa.

- **`percentile_disc(n)`**: Chỉ trả về các giá trị **rời rạc**. Nghĩa là, kết quả được trả về sẽ được làm tròn thành một trong các số trong tập hợp.

**Ví Dụ:**
```sql
CREATE TABLE percentile_test (
    numbers integer
);

INSERT INTO percentile_test (numbers) VALUES
(1), (2), (3), (4), (5), (6);

SELECT
    percentile_cont(.5) WITHIN GROUP (ORDER BY numbers),
    percentile_disc(.5) WITHIN GROUP (ORDER BY numbers)
FROM percentile_test;
```

**Kết Quả:**
```
percentile_cont | percentile_disc
----------------|-----------------
3.5            | 3
```

Hàm `percentile_cont()` trả về những gì chúng ta mong đợi trung vị sẽ là: 3.5. Nhưng vì `percentile_disc()` tính toán các giá trị rời rạc, nó báo cáo 3, giá trị cuối cùng trong 50 phần trăm đầu tiên của các số. Vì phương pháp được chấp nhận để tính toán trung vị là tính trung bình của hai giá trị giữa trong một tập hợp số chẵn, **sử dụng `percentile_cont(.5)` để tìm trung vị**.

### Trung Vị và Phần Trăm Với Dữ Liệu Điều Tra Dân Số

Dữ liệu điều tra dân số của chúng ta có thể cho thấy cách trung vị kể một câu chuyện khác so với trung bình:

```sql
SELECT sum(p0010001) AS "County Sum",
       round(avg(p0010001), 0) AS "County Average",
       percentile_cont(.5)
       WITHIN GROUP (ORDER BY p0010001) AS "County Median"
FROM us_counties_2010;
```

**Kết Quả:**
```
County Sum  | County Average | County Median
------------|----------------|---------------
308745538   | 98233          | 25857
```

Trung vị và trung bình cách xa nhau, điều này cho thấy rằng trung bình có thể gây hiểu lầm. Tính đến năm 2010, một nửa các quận ở Mỹ có ít hơn 25,857 người, trong khi một nửa có nhiều hơn. Nếu bạn đưa ra một bài thuyết trình về nhân khẩu học Hoa Kỳ và nói với khán giả rằng "quận trung bình ở Mỹ có 98,200 người," họ sẽ rời đi với một bức tranh lệch về thực tế. Gần 40 quận có một triệu người trở lên tính đến Điều Tra Dân Số 2010, và Quận Los Angeles có gần 10 triệu. Điều đó đẩy trung bình lên cao hơn.

### Tìm Các Phân Vị Khác Với Hàm Phần Trăm

Bạn cũng có thể chia dữ liệu thành các nhóm nhỏ hơn bằng nhau. Phổ biến nhất là:
- **Tứ phân vị** (bốn nhóm bằng nhau)
- **Ngũ phân vị** (năm nhóm)
- **Thập phân vị** (10 nhóm)

Để tìm bất kỳ giá trị cá nhân nào, bạn chỉ cần cắm nó vào hàm phần trăm. Ví dụ, để tìm giá trị đánh dấu tứ phân vị đầu tiên, hoặc 25 phần trăm thấp nhất của dữ liệu, bạn sẽ sử dụng giá trị `.25`:
```sql
percentile_cont(.25)
```

Tuy nhiên, nhập các giá trị từng cái một là vất vả nếu bạn muốn tạo nhiều điểm cắt. Thay vào đó, bạn có thể truyền các giá trị vào `percentile_cont()` bằng cách sử dụng một **mảng**, một kiểu dữ liệu SQL chứa danh sách các mục:

```sql
SELECT percentile_cont(array[.25,.5,.75])
WITHIN GROUP (ORDER BY p0010001) AS "quartiles"
FROM us_counties_2010;
```

Trong ví dụ này, chúng ta tạo một mảng các điểm cắt bằng cách đặt các giá trị trong một constructor gọi là `array[]`. Bên trong dấu ngoặc vuông, chúng ta cung cấp các giá trị được phân tách bằng dấu phẩy đại diện cho ba điểm để cắt để tạo bốn tứ phân vị.

**Kết Quả:**
```
quartiles
---------------------
{11104.5,25857,66699}
```

Vì chúng ta đã truyền vào một mảng, PostgreSQL trả về một mảng, được ký hiệu bằng dấu ngoặc nhọn. Mỗi tứ phân vị được phân tách bằng dấu phẩy:
- Tứ phân vị đầu tiên là 11,104.5, có nghĩa là 25 phần trăm các quận có dân số bằng hoặc thấp hơn giá trị này
- Tứ phân vị thứ hai giống như trung vị: 25,857
- Tứ phân vị thứ ba là 66,699, có nghĩa là 25 phần trăm lớn nhất của các quận có ít nhất dân số lớn như vậy

### Sử Dụng unnest() Để Hiển Thị Mảng

Mảng đi kèm với nhiều hàm cho phép bạn thực hiện các tác vụ như thêm hoặc xóa giá trị hoặc đếm các phần tử. Một hàm tiện dụng để làm việc với kết quả được trả về là `unnest()`, làm cho mảng dễ đọc hơn bằng cách biến nó thành các hàng:

```sql
SELECT unnest(
    percentile_cont(array[.25,.5,.75])
    WITHIN GROUP (ORDER BY p0010001)
) AS "quartiles"
FROM us_counties_2010;
```

**Kết Quả:**
```
quartiles
---------
11104.5
25857
66699
```

Nếu chúng ta đang tính toán thập phân vị, kéo chúng từ mảng kết quả và hiển thị chúng trong các hàng sẽ đặc biệt hữu ích.

### Tạo Hàm median()

Mặc dù PostgreSQL không có hàm tổng hợp `median()` tích hợp, nếu bạn mạo hiểm, wiki PostgreSQL cung cấp một script để tạo một:

```sql
CREATE OR REPLACE FUNCTION _final_median(anyarray)
RETURNS float8 AS
$$
WITH q AS
(
    SELECT val
    FROM unnest($1) val
    WHERE VAL IS NOT NULL
    ORDER BY 1
),
cnt AS
(
    SELECT COUNT(*) AS c FROM q
)
SELECT AVG(val)::float8
FROM
(
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

**Lưu Ý:** Với những gì bạn đã học cho đến nay, mã để tạo hàm tổng hợp `median()` có thể trông khó hiểu. Mã chứa hai khối chính: một để tạo một hàm gọi là `_final_median` sắp xếp các giá trị trong cột và tìm điểm giữa, và một hàm thứ hai phục vụ như hàm tổng hợp có thể gọi `median()` và truyền các giá trị cho `_final_median`. Hiện tại, bạn có thể bỏ qua việc xem xét script từng dòng và chỉ cần thực thi mã.

**Sử dụng hàm median():**
```sql
SELECT sum(p0010001) AS "County Sum",
       round(AVG(p0010001), 0) AS "County Average",
       median(p0010001) AS "County Median",
       percentile_cont(.5)
       WITHIN GROUP (ORDER BY p0010001) AS "50th Percentile"
FROM us_counties_2010;
```

**Kết Quả:**
```
County Sum  | County Average | County Median | 50th Percentile
------------|----------------|---------------|----------------
308745538   | 98233          | 25857         | 25857
```

Kết quả truy vấn cho thấy hàm trung vị và hàm phần trăm trả về cùng một giá trị.

**Khi nào sử dụng `median()` vs. `percentile_cont()`:**
- Cú pháp `median()` dễ nhớ hơn, mặc dù là một công việc để thiết lập cho mỗi cơ sở dữ liệu, và nó cụ thể cho PostgreSQL
- Trong thực tế, `median()` thực thi chậm hơn và có thể hoạt động kém trên các tập dữ liệu lớn hoặc máy chậm
- Mặt khác, `percentile_cont()` có thể di chuyển giữa một số trình quản lý cơ sở dữ liệu SQL, bao gồm Microsoft SQL Server, và cho phép bạn tìm bất kỳ phần trăm nào từ 0 đến 100
- Cuối cùng, bạn có thể thử cả hai và quyết định

## Tìm Mode

Ngoài ra, chúng ta có thể tìm **mode**, giá trị xuất hiện thường xuyên nhất, bằng cách sử dụng hàm `mode()` của PostgreSQL. Hàm không phải là một phần của SQL chuẩn và có cú pháp tương tự như các hàm phần trăm:

```sql
SELECT mode() WITHIN GROUP (ORDER BY p0010001)
FROM us_counties_2010;
```

**Kết Quả:** `21720`, một số lượng dân số được chia sẻ bởi các quận ở Mississippi, Oregon và West Virginia.

## Tóm Tắt

Làm việc với số là một bước quan trọng trong việc có được ý nghĩa từ dữ liệu của bạn, và với các kỹ năng toán học được đề cập trong chương này, bạn đã sẵn sàng xử lý nền tảng của phân tích số với SQL. Sau này trong cuốn sách, bạn sẽ tìm hiểu về các khái niệm thống kê sâu hơn bao gồm hồi quy và tương quan. Tại thời điểm này, bạn có những điều cơ bản về tổng, trung bình và phần trăm. Bạn cũng đã học cách trung vị có thể là đánh giá công bằng hơn về một nhóm giá trị so với trung bình. Điều đó một mình có thể giúp bạn tránh các kết luận không chính xác.

### Các Khái Niệm Chính Đã Học

- **Toán tử toán học**: Số học cơ bản, modulo, lũy thừa, căn, giai thừa
- **Hành vi kiểu dữ liệu**: Cách toán tử ảnh hưởng đến kiểu dữ liệu kết quả
- **Thứ tự thao tác**: Ưu tiên toán tử trong SQL
- **Phép tính cột**: Thực hiện toán học trên các cột bảng
- **Phần trăm**: Tính phần trăm của toàn bộ
- **Thay đổi phần trăm**: Theo dõi thay đổi theo thời gian
- **Hàm tổng hợp**: `sum()`, `avg()`
- **Trung vị**: Tìm giá trị giữa bằng cách sử dụng hàm phần trăm
- **Tứ phân vị và phân vị**: Chia dữ liệu thành các nhóm bằng nhau
- **Mode**: Tìm giá trị xuất hiện thường xuyên nhất

### Thực Hành Tốt

1. Luôn sử dụng `CAST` khi bạn cần phép chia thập phân từ các cột số nguyên
2. Sử dụng ngoặc đơn để kiểm soát thứ tự thao tác
3. Sử dụng bí danh cột (`AS`) để làm cho kết quả dễ đọc
4. Xác minh nhập dữ liệu với các kiểm tra toán học
5. Tính cả trung bình và trung vị để hiểu phân phối dữ liệu
6. Sử dụng `percentile_cont(.5)` cho phép tính trung vị (không phải `percentile_disc`)
7. Sử dụng `round()` để định dạng kết quả số một cách phù hợp
8. Cân nhắc sử dụng mảng với hàm phần trăm cho nhiều phân vị
9. Sử dụng `unnest()` để hiển thị kết quả mảng trong các hàng

### Khi Nào Sử Dụng Trung Bình vs. Trung Vị

- **Sử dụng trung bình** khi các giá trị được phân phối bình thường (đường cong chuông)
- **Sử dụng trung vị** khi các giá trị bị lệch hoặc chứa giá trị ngoại lai
- **So sánh cả hai** để hiểu phân phối dữ liệu của bạn

## Bước Tiếp Theo

Trong chương tiếp theo, chúng ta sẽ giới thiệu cho bạn sức mạnh của việc kết nối dữ liệu trong hai hoặc nhiều bảng để tăng các tùy chọn phân tích dữ liệu của bạn. Chúng ta sẽ sử dụng dữ liệu Điều Tra Dân Số 2010 mà bạn đã tải vào cơ sở dữ liệu phân tích và khám phá các tập dữ liệu bổ sung.
