# Chương 9: Kiểm Tra và Sửa Đổi Dữ Liệu

## Giới Thiệu

Nếu bạn yêu cầu tôi đề xuất một lời chúc mừng cho một lớp nhà phân tích dữ liệu mới tốt nghiệp, tôi có thể sẽ nâng ly và nói, "Chúc dữ liệu của bạn luôn không có lỗi và luôn đến với cấu trúc hoàn hảo!" Cuộc sống sẽ lý tưởng nếu những cảm xúc này khả thi. Trong thực tế, đôi khi bạn sẽ nhận được dữ liệu ở trạng thái tồi tệ đến mức khó phân tích mà không cần sửa đổi nó theo một cách nào đó. Đây được gọi là **dữ liệu bẩn**, một nhãn chung cho dữ liệu có lỗi, giá trị bị thiếu hoặc tổ chức kém khiến các truy vấn chuẩn không hiệu quả. Khi dữ liệu được chuyển đổi từ loại tệp này sang loại tệp khác hoặc khi một cột nhận sai kiểu dữ liệu, thông tin có thể bị mất. Lỗi đánh máy và sự không nhất quán trong chính tả cũng có thể dẫn đến dữ liệu bẩn. Dù nguyên nhân là gì, dữ liệu bẩn là nỗi đau của nhà phân tích dữ liệu.

Trong chương này, bạn sẽ sử dụng SQL để làm sạch dữ liệu bẩn cũng như thực hiện các tác vụ bảo trì hữu ích khác. Bạn sẽ học cách kiểm tra dữ liệu để đánh giá chất lượng của nó và cách sửa đổi dữ liệu và bảng để làm cho phân tích dễ dàng hơn. Nhưng các kỹ thuật bạn sẽ học sẽ hữu ích cho nhiều hơn chỉ làm sạch dữ liệu. Khả năng thực hiện thay đổi đối với dữ liệu và bảng cho bạn các tùy chọn để cập nhật hoặc thêm thông tin mới vào cơ sở dữ liệu của bạn khi nó trở nên có sẵn, nâng cơ sở dữ liệu của bạn từ một bộ sưu tập tĩnh lên một bản ghi sống động.

## Nhập Dữ Liệu Về Nhà Sản Xuất Thịt, Gia Cầm và Trứng

Đối với ví dụ này, chúng ta sẽ sử dụng một thư mục các nhà sản xuất thịt, gia cầm và trứng của Hoa Kỳ. Dịch vụ An toàn Thực phẩm và Thanh tra (FSIS), một cơ quan trong Bộ Nông nghiệp Hoa Kỳ, biên soạn và cập nhật cơ sở dữ liệu này mỗi tháng. FSIS chịu trách nhiệm kiểm tra động vật và thực phẩm tại hơn 6.000 nhà máy chế biến thịt, lò mổ, trang trại và các cơ sở tương tự. Nếu thanh tra viên phát hiện vấn đề, chẳng hạn như nhiễm khuẩn hoặc thực phẩm dán nhãn sai, cơ quan có thể phát hành thu hồi. Bất kỳ ai quan tâm đến kinh doanh nông nghiệp, chuỗi cung ứng thực phẩm hoặc các đợt bùng phát bệnh do thực phẩm sẽ thấy thư mục này hữu ích.

Tệp chúng ta sẽ sử dụng đến từ trang thư mục trên data.gov, một trang web do chính phủ liên bang Hoa Kỳ điều hành lập danh mục hàng nghìn tập dữ liệu từ các cơ quan liên bang khác nhau. Chúng ta sẽ kiểm tra dữ liệu gốc như khi nó có sẵn để tải xuống, ngoại trừ cột ZIP Codes (tôi sẽ giải thích lý do sau).

### Tạo Bảng

```sql
CREATE TABLE meat_poultry_egg_inspect (
    est_number varchar(50) CONSTRAINT est_number_key PRIMARY KEY,
    company varchar(100),
    street varchar(100),
    city varchar(30),
    st varchar(2),
    zip varchar(5),
    phone varchar(14),
    grant_date date,
    activities text,
    dbas text
);

COPY meat_poultry_egg_inspect
FROM 'C:\YourDirectory\MPI_Directory_by_Establishment_Name.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ',');

CREATE INDEX company_idx ON meat_poultry_egg_inspect (company);
```

**Điểm Quan Trọng:**
- Bảng `meat_poultry_egg_inspect` có 10 cột
- Chúng ta thêm ràng buộc khóa chính tự nhiên cho cột `est_number`, chứa giá trị duy nhất cho mỗi hàng xác định cơ sở
- Hầu hết các cột còn lại liên quan đến tên và địa chỉ của công ty
- Cột `activities` mô tả các hoạt động tại công ty
- Chúng ta đặt các cột `activities` và `dbas` thành `text`, một kiểu dữ liệu trong PostgreSQL cho phép chúng ta lên đến 1GB ký tự, vì một số chuỗi trong các cột dài hàng nghìn ký tự
- Chúng ta nhập tệp CSV và sau đó tạo chỉ mục trên cột `company` để tăng tốc tìm kiếm các công ty cụ thể

**Số Đếm Hàng:** Kết quả sẽ hiển thị 6.287 hàng.

## Phỏng Vấn Tập Dữ Liệu

Phỏng vấn dữ liệu là phần yêu thích của tôi trong phân tích. Chúng ta phỏng vấn một tập dữ liệu để khám phá các chi tiết của nó: nó chứa gì, nó có thể trả lời những câu hỏi nào, và nó phù hợp như thế nào cho mục đích của chúng ta, giống như một cuộc phỏng vấn việc làm tiết lộ liệu một ứng viên có các kỹ năng cần thiết cho vị trí hay không.

Các truy vấn tổng hợp bạn đã học trong Chương 8 là một công cụ phỏng vấn hữu ích vì chúng thường phơi bày các hạn chế của tập dữ liệu hoặc đặt ra các câu hỏi bạn có thể muốn hỏi trước khi rút ra kết luận trong phân tích của bạn và giả định tính hợp lệ của các phát hiện của bạn.

### Tìm Nhiều Công Ty Ở Cùng Địa Chỉ

Ví dụ, các hàng của bảng `meat_poultry_egg_inspect` mô tả các nhà sản xuất thực phẩm. Thoạt nhìn, chúng ta có thể giả định rằng mỗi công ty trong mỗi hàng hoạt động ở một địa chỉ riêng biệt. Nhưng không bao giờ an toàn để giả định trong phân tích dữ liệu, vì vậy hãy kiểm tra:

```sql
SELECT company,
       street,
       city,
       st,
       count(*) AS address_count
FROM meat_poultry_egg_inspect
GROUP BY company, street, city, st
HAVING count(*) > 1
ORDER BY company, street, city, st;
```

**Cách hoạt động:**
- Chúng ta nhóm các công ty theo các kết hợp duy nhất của các cột `company`, `street`, `city`, và `st`
- Sau đó chúng ta sử dụng `count(*)`, trả về số hàng cho mỗi kết hợp của các cột đó
- Sử dụng mệnh đề HAVING, chúng ta lọc kết quả để chỉ hiển thị các trường hợp nơi nhiều hơn một hàng có cùng kết hợp giá trị

**Kết quả:** Truy vấn trả về 23 hàng, có nghĩa là có gần hai tá trường hợp nơi cùng một công ty được liệt kê nhiều lần ở cùng địa chỉ.

**Phân tích:** Điều này không nhất thiết là vấn đề. Có thể có lý do hợp lệ để một công ty xuất hiện nhiều lần ở cùng địa chỉ. Ví dụ, hai loại nhà máy chế biến có thể tồn tại với cùng tên. Mặt khác, chúng ta có thể đã tìm thấy lỗi nhập dữ liệu. Dù bằng cách nào, việc loại bỏ các mối quan tâm về tính hợp lệ của tập dữ liệu trước khi dựa vào nó là thực hành tốt, và kết quả nên thúc đẩy chúng ta điều tra các trường hợp riêng lẻ trước khi rút ra kết luận.

### Kiểm Tra Giá Trị Bị Thiếu

Hãy bắt đầu kiểm tra các giá trị bị thiếu bằng cách đặt một câu hỏi cơ bản: có bao nhiêu công ty chế biến thịt, gia cầm và trứng ở mỗi tiểu bang? Tìm hiểu xem chúng ta có giá trị từ tất cả các tiểu bang hay không và liệu có hàng nào thiếu mã tiểu bang sẽ phục vụ như một kiểm tra hữu ích khác trên dữ liệu.

```sql
SELECT st,
       count(*) AS st_count
FROM meat_poultry_egg_inspect
GROUP BY st
ORDER BY st;
```

**Kết quả:** Kết quả của bạn nên bao gồm 57 hàng, được nhóm theo mã bưu điện tiểu bang trong cột `st`. Tại sao nhiều hơn 50 tiểu bang Hoa Kỳ? Vì dữ liệu bao gồm Puerto Rico và các lãnh thổ Hoa Kỳ không hợp nhất khác, chẳng hạn như Guam và Samoa thuộc Mỹ.

**Vấn đề:** Tuy nhiên, hàng ở cuối danh sách có số đếm là 3 và giá trị NULL trong cột `st_count`. Để tìm hiểu điều này có nghĩa là gì, hãy truy vấn các hàng nơi cột `st` có giá trị NULL.

**Lưu ý:** Tùy thuộc vào triển khai cơ sở dữ liệu, các giá trị NULL sẽ xuất hiện đầu tiên hoặc cuối cùng trong một cột được sắp xếp. Trong PostgreSQL, chúng xuất hiện cuối cùng theo mặc định. Tiêu chuẩn ANSI SQL không chỉ định một hoặc cái kia, nhưng nó cho phép bạn thêm `NULLS FIRST` hoặc `NULLS LAST` vào mệnh đề ORDER BY để chỉ định sở thích. Ví dụ, để làm cho các giá trị NULL xuất hiện đầu tiên trong truy vấn trước đó, mệnh đề sẽ đọc `ORDER BY st NULLS FIRST`.

### Tìm Giá Trị Bị Thiếu Với IS NULL

```sql
SELECT est_number,
       company,
       city,
       st,
       zip
FROM meat_poultry_egg_inspect
WHERE st IS NULL;
```

**Kết quả:** Truy vấn này trả về ba hàng không có giá trị trong cột `st`:
- `V18677A` - Atlas Inspection, Inc. - Blaine - 55449
- `M45319+P45319` - Hall-Namie Packing Company, Inc - 36671
- `M263A+P263A+V263A` - Jones Dairy Farm - 53538

**Phân tích:** Nếu chúng ta muốn có số đếm chính xác các cơ sở mỗi tiểu bang, các giá trị bị thiếu này sẽ dẫn đến kết quả không chính xác. Để tìm nguồn gốc của dữ liệu bẩn này, đáng để thực hiện kiểm tra trực quan nhanh của tệp gốc đã tải xuống từ data.gov. Trong trường hợp này, kiểm tra trực quan xác nhận rằng, thực sự, không có tiểu bang nào được liệt kê trong các hàng đó trong tệp CSV, vì vậy lỗi là tự nhiên với dữ liệu, không phải một lỗi được giới thiệu trong quá trình nhập.

**Nhiệm Vụ Làm Sạch:** Chúng ta sẽ cần thêm các giá trị bị thiếu vào cột `st` để làm sạch bảng này.

### Kiểm Tra Giá Trị Dữ Liệu Không Nhất Quán

Dữ liệu không nhất quán là một yếu tố khác có thể cản trở phân tích của chúng ta. Chúng ta có thể kiểm tra dữ liệu được nhập không nhất quán trong một cột bằng cách sử dụng GROUP BY với `count()`. Khi bạn quét các giá trị không trùng lặp trong kết quả, bạn có thể phát hiện các biến thể trong cách viết tên hoặc các thuộc tính khác.

Ví dụ, nhiều trong số 6.200 công ty trong bảng của chúng ta là nhiều địa điểm thuộc sở hữu của một vài tập đoàn thực phẩm đa quốc gia, chẳng hạn như Cargill hoặc Tyson Foods. Để tìm hiểu mỗi công ty sở hữu bao nhiêu địa điểm, chúng ta sẽ cố gắng đếm các giá trị trong cột `company`:

```sql
SELECT company,
       count(*) AS company_count
FROM meat_poultry_egg_inspect
GROUP BY company
ORDER BY company ASC;
```

**Kết quả:** Cuộn qua kết quả tiết lộ một số trường hợp trong đó tên công ty được đánh vần theo nhiều cách khác nhau. Ví dụ, lưu ý các mục cho thương hiệu Armour-Eckrich:
- `Armour - Eckrich Meats, LLC` - 1
- `Armour-Eckrich Meats LLC` - 3
- `Armour-Eckrich Meats, Inc.` - 1
- `Armour-Eckrich Meats, LLC` - 2

**Phân tích:** Ít nhất bốn cách đánh vần khác nhau được hiển thị cho bảy cơ sở có khả năng thuộc sở hữu của cùng một công ty. Nếu sau này chúng ta thực hiện bất kỳ tổng hợp nào theo công ty, sẽ hữu ích để chuẩn hóa các tên để tất cả các mục được đếm hoặc tổng hợp được nhóm đúng cách.

**Nhiệm Vụ Làm Sạch:** Chúng ta sẽ cần chuẩn hóa tên công ty.

### Kiểm Tra Giá Trị Định Dạng Sai Sử Dụng length()

Đó là một ý tưởng tốt để kiểm tra các giá trị bất ngờ trong một cột nên được định dạng nhất quán. Ví dụ, mỗi mục trong cột `zip` trong bảng `meat_poultry_egg_inspect` nên được định dạng theo kiểu mã ZIP của Hoa Kỳ với năm chữ số. Tuy nhiên, đó không phải là những gì có trong tập dữ liệu của chúng ta.

**Vấn Đề:** Khi tôi chuyển đổi tệp Excel gốc sang tệp CSV, tôi đã lưu mã ZIP ở định dạng số "General" trong bảng tính thay vì như giá trị văn bản. Bằng cách đó, bất kỳ mã ZIP nào bắt đầu bằng số không, chẳng hạn như 07502 cho Paterson, NJ, đã mất số không đầu vì một số nguyên không thể bắt đầu bằng số không. Kết quả là, 07502 xuất hiện trong bảng như 7502.

**Kiểm Tra Vấn Đề:**

```sql
SELECT length(zip),
       count(*) AS length_count
FROM meat_poultry_egg_inspect
GROUP BY length(zip)
ORDER BY length(zip) ASC;
```

**Kết quả:** Kết quả xác nhận lỗi định dạng:
- 3 ký tự: 86 hàng
- 4 ký tự: 496 hàng
- 5 ký tự: 5.705 hàng

**Phân tích:** 496 mã ZIP có độ dài bốn ký tự, và 86 có độ dài ba ký tự, có nghĩa là các số này ban đầu có hai số không đầu mà quá trình chuyển đổi của tôi đã loại bỏ một cách sai lầm.

**Tìm Các Tiểu Bang Bị Ảnh Hưởng:**

```sql
SELECT st,
       count(*) AS st_count
FROM meat_poultry_egg_inspect
WHERE length(zip) < 5
GROUP BY st
ORDER BY st ASC;
```

**Kết quả:** Các tiểu bang chủ yếu ở khu vực Đông Bắc của Hoa Kỳ nơi mã ZIP thường bắt đầu bằng số không:
- CT: 55
- MA: 101
- ME: 24
- NH: 18
- NJ: 244
- PR: 84
- RI: 27
- VI: 2
- VT: 27

**Tóm Tắt Nhiệm Vụ Làm Sạch:**
Cho đến nay, chúng ta cần sửa các vấn đề sau trong tập dữ liệu của chúng ta:
1. Giá trị bị thiếu cho ba hàng trong cột `st`
2. Cách đánh vần không nhất quán của ít nhất một tên công ty
3. Mã ZIP không chính xác do chuyển đổi tệp

## Sửa Đổi Bảng, Cột và Dữ Liệu

Hầu như không có gì trong cơ sở dữ liệu, từ bảng đến cột và các kiểu dữ liệu và giá trị chúng chứa, được đặt trong bê tông sau khi nó được tạo. Khi nhu cầu của bạn thay đổi, bạn có thể thêm cột vào bảng, thay đổi kiểu dữ liệu trên các cột hiện có và chỉnh sửa giá trị. May mắn thay, bạn có thể sử dụng SQL để sửa đổi, xóa hoặc thêm vào dữ liệu và cấu trúc hiện có.

Để thực hiện thay đổi cho cơ sở dữ liệu của chúng ta, chúng ta sẽ sử dụng hai lệnh SQL:
1. **ALTER TABLE**: Một phần của tiêu chuẩn ANSI SQL, cung cấp các tùy chọn để ADD COLUMN, ALTER COLUMN, và DROP COLUMN, trong số những tùy chọn khác
2. **UPDATE**: Cũng được bao gồm trong tiêu chuẩn SQL, cho phép bạn thay đổi giá trị trong các cột của bảng

### Sửa Đổi Bảng Với ALTER TABLE

Chúng ta có thể sử dụng câu lệnh ALTER TABLE để sửa đổi cấu trúc của bảng. Các ví dụ sau đây hiển thị cú pháp cho các thao tác phổ biến là một phần của ANSI SQL chuẩn.

**Thêm Cột:**
```sql
ALTER TABLE table ADD COLUMN column data_type;
```

**Xóa Cột:**
```sql
ALTER TABLE table DROP COLUMN column;
```

**Thay Đổi Kiểu Dữ Liệu:**
```sql
ALTER TABLE table ALTER COLUMN column SET DATA TYPE data_type;
```

**Thêm Ràng Buộc NOT NULL:**
```sql
ALTER TABLE table ALTER COLUMN column SET NOT NULL;
```

**Xóa Ràng Buộc NOT NULL:**
```sql
ALTER TABLE table ALTER COLUMN column DROP NOT NULL;
```

**Lưu ý quan trọng:** Trong PostgreSQL và một số hệ thống khác, thêm ràng buộc vào bảng khiến tất cả các hàng được kiểm tra để xem chúng có tuân thủ ràng buộc hay không. Nếu bảng có hàng triệu hàng, điều này có thể mất một lúc.

**Cảnh báo:** Khi bạn thực thi câu lệnh ALTER TABLE, bạn sẽ thấy thông báo đọc `ALTER TABLE` trong màn hình đầu ra pgAdmin. Nếu một thao tác vi phạm ràng buộc hoặc nếu bạn cố gắng thay đổi kiểu dữ liệu của cột và các giá trị hiện có trong cột sẽ không phù hợp với kiểu dữ liệu mới, PostgreSQL trả về lỗi. Nhưng PostgreSQL sẽ không đưa ra cảnh báo nào về việc xóa dữ liệu khi bạn xóa cột, vì vậy hãy cẩn thận thêm trước khi xóa cột.

### Sửa Đổi Giá Trị Với UPDATE

Câu lệnh UPDATE sửa đổi dữ liệu trong một cột trong tất cả các hàng hoặc trong một tập hợp con các hàng đáp ứng điều kiện.

**Cú Pháp Cơ Bản (Cập Nhật Tất Cả Hàng):**
```sql
UPDATE table
SET column = value;
```

**Cách hoạt động:**
- Đầu tiên chúng ta truyền UPDATE tên của bảng để cập nhật
- Sau đó truyền mệnh đề SET cột chứa các giá trị cần thay đổi
- Giá trị mới để đặt trong cột có thể là chuỗi, số, tên của cột khác, hoặc thậm chí một truy vấn hoặc biểu thức tạo giá trị

**Cập Nhật Nhiều Cột:**
```sql
UPDATE table
SET column_a = value,
    column_b = value;
```

**Cập Nhật Hàng Cụ Thể:**
```sql
UPDATE table
SET column = value
WHERE criteria;
```

**Cập Nhật Một Bảng Với Giá Trị Từ Bảng Khác (Tiêu Chuẩn ANSI):**
```sql
UPDATE table
SET column = (SELECT column
              FROM table_b
              WHERE table.column = table_b.column)
WHERE EXISTS (SELECT column
              FROM table_b
              WHERE table.column = table_b.column);
```

**Cập Nhật Một Bảng Với Giá Trị Từ Bảng Khác (Cụ Thể PostgreSQL):**
```sql
UPDATE table
SET column = table_b.column
FROM table_b
WHERE table.column = table_b.column;
```

**Lưu ý:** Khi bạn thực thi câu lệnh UPDATE, PostgreSQL trả về thông báo nêu `UPDATE` cùng với số hàng bị ảnh hưởng.

## Tạo Bảng Sao Lưu

Trước khi sửa đổi bảng, đó là một ý tưởng tốt để tạo một bản sao để tham khảo và sao lưu trong trường hợp bạn vô tình phá hủy một số dữ liệu.

### Tạo Sao Lưu Bảng

```sql
CREATE TABLE meat_poultry_egg_inspect_backup AS
SELECT * FROM meat_poultry_egg_inspect;
```

**Cách hoạt động:**
- Điều này sử dụng một biến thể của câu lệnh CREATE TABLE quen thuộc để tạo một bảng mới dựa trên dữ liệu và cấu trúc hiện có của bảng chúng ta muốn sao chép
- Sau khi chạy câu lệnh CREATE TABLE, kết quả sẽ là một bản sao nguyên sơ của bảng của bạn với tên được chỉ định mới

**Xác Minh Sao Lưu:**
```sql
SELECT
    (SELECT count(*) FROM meat_poultry_egg_inspect) AS original,
    (SELECT count(*) FROM meat_poultry_egg_inspect_backup) AS backup;
```

**Kết quả:** Kết quả sẽ trả về số đếm 6.287 từ cả hai bảng. Nếu số đếm khớp, bạn có thể chắc chắn rằng bảng sao lưu của bạn là một bản sao chính xác của cấu trúc và nội dung của bảng gốc.

**Lưu ý quan trọng:** Chỉ mục không được sao chép khi tạo sao lưu bảng bằng câu lệnh CREATE TABLE. Nếu bạn quyết định chạy truy vấn trên sao lưu, hãy đảm bảo tạo chỉ mục riêng trên bảng đó.

## Khôi Phục Giá Trị Cột Bị Thiếu

Trước đó trong chương này, truy vấn đã tiết lộ rằng ba hàng trong bảng `meat_poultry_egg_inspect` không có giá trị trong cột `st`. Để có số đếm đầy đủ các cơ sở trong mỗi tiểu bang, chúng ta cần điền các giá trị bị thiếu đó bằng cách sử dụng câu lệnh UPDATE.

### Tạo Bản Sao Cột

Mặc dù chúng ta đã sao lưu bảng này, hãy cẩn thận thêm và tạo một bản sao của cột `st` trong bảng để chúng ta vẫn có dữ liệu gốc nếu chúng ta mắc một số lỗi nghiêm trọng ở đâu đó!

```sql
ALTER TABLE meat_poultry_egg_inspect ADD COLUMN st_copy varchar(2);
UPDATE meat_poultry_egg_inspect
SET st_copy = st;
```

**Cách hoạt động:**
- Câu lệnh ALTER TABLE thêm một cột có tên `st_copy` sử dụng cùng kiểu dữ liệu `varchar` như cột `st` gốc
- Tiếp theo, mệnh đề SET của câu lệnh UPDATE điền cột `st_copy` mới tạo của chúng ta với các giá trị trong cột `st`
- Vì chúng ta không chỉ định bất kỳ tiêu chí nào bằng mệnh đề WHERE, các giá trị trong mỗi hàng được cập nhật, và PostgreSQL trả về thông báo `UPDATE 6287`

**Lưu ý quan trọng:** Trên một bảng rất lớn, thao tác này có thể mất một lúc và cũng tăng đáng kể kích thước bảng. Tạo bản sao cột ngoài sao lưu bảng không hoàn toàn cần thiết, nhưng nếu bạn là người kiên nhẫn, thận trọng, nó có thể đáng giá.

**Xác Minh Bản Sao:**
```sql
SELECT st, st_copy
FROM meat_poultry_egg_inspect
ORDER BY st;
```

Truy vấn SELECT trả về 6.287 hàng hiển thị cả hai cột chứa giá trị ngoại trừ ba hàng có giá trị bị thiếu.

### Cập Nhật Hàng Nơi Giá Trị Bị Thiếu

Để cập nhật những hàng thiếu giá trị, đầu tiên chúng ta tìm các giá trị chúng ta cần bằng cách tìm kiếm trực tuyến nhanh: Atlas Inspection nằm ở Minnesota; Hall-Namie Packing ở Alabama; và Jones Dairy ở Wisconsin. Thêm các tiểu bang đó vào các hàng phù hợp:

```sql
UPDATE meat_poultry_egg_inspect
SET st = 'MN'
WHERE est_number = 'V18677A';

UPDATE meat_poultry_egg_inspect
SET st = 'AL'
WHERE est_number = 'M45319+P45319';

UPDATE meat_poultry_egg_inspect
SET st = 'WI'
WHERE est_number = 'M263A+P263A+V263A';
```

**Cách hoạt động:**
- Vì chúng ta muốn mỗi câu lệnh UPDATE ảnh hưởng đến một hàng duy nhất, chúng ta bao gồm mệnh đề WHERE cho mỗi câu lệnh xác định `est_number` duy nhất của công ty, là khóa chính của bảng
- Khi chúng ta chạy mỗi truy vấn, PostgreSQL phản hồi với thông báo `UPDATE 1`, cho thấy chỉ một hàng được cập nhật cho mỗi truy vấn

**Xác minh:** Nếu chúng ta chạy lại mã để tìm các hàng nơi `st` là NULL, truy vấn sẽ không trả về gì. Thành công! Số đếm các cơ sở theo tiểu bang của chúng ta bây giờ đã hoàn chỉnh.

### Khôi Phục Giá Trị Gốc

Điều gì xảy ra nếu chúng ta làm hỏng cập nhật bằng cách cung cấp giá trị sai hoặc cập nhật các hàng sai? Vì chúng ta đã sao lưu toàn bộ bảng và cột `st` trong bảng, chúng ta có thể dễ dàng sao chép dữ liệu trở lại từ một trong hai vị trí.

**Tùy Chọn 1: Khôi Phục Từ Bản Sao Cột**
```sql
UPDATE meat_poultry_egg_inspect
SET st = st_copy;
```

**Tùy Chọn 2: Khôi Phục Từ Bảng Sao Lưu**
```sql
UPDATE meat_poultry_egg_inspect original
SET st = backup.st
FROM meat_poultry_egg_inspect_backup backup
WHERE original.est_number = backup.est_number;
```

**Cách hoạt động:**
- Để khôi phục các giá trị từ cột sao lưu trong `meat_poultry_egg_inspect` bạn đã tạo, chạy truy vấn UPDATE đặt `st` thành các giá trị trong `st_copy`. Cả hai cột sẽ lại có các giá trị gốc giống hệt nhau
- Ngoài ra, bạn có thể tạo UPDATE đặt `st` thành các giá trị trong cột `st` từ bảng `meat_poultry_egg_inspect_backup` bạn đã tạo

## Cập Nhật Giá Trị Để Nhất Quán

Trong truy vấn trước đó của chúng ta, chúng ta đã phát hiện một số trường hợp nơi tên của một công ty duy nhất được nhập không nhất quán. Nếu chúng ta muốn tổng hợp dữ liệu theo tên công ty, sự không nhất quán như vậy sẽ cản trở chúng ta làm như vậy.

### Tạo Cột Chuẩn Hóa

Chúng ta có thể chuẩn hóa cách đánh vần tên công ty này bằng cách sử dụng câu lệnh UPDATE. Để bảo vệ dữ liệu của chúng ta, chúng ta sẽ tạo một cột mới cho các cách đánh vần chuẩn hóa, sao chép các tên trong `company` vào cột mới, và làm việc trong cột mới để tránh can thiệp vào dữ liệu gốc.

```sql
ALTER TABLE meat_poultry_egg_inspect ADD COLUMN company_standard varchar(100);
UPDATE meat_poultry_egg_inspect
SET company_standard = company;
```

### Cập Nhật Với LIKE

Bây giờ, hãy nói rằng chúng ta muốn bất kỳ tên nào trong `company` chứa chuỗi "Armour" xuất hiện trong `company_standard` như "Armour-Eckrich Meats". Chúng ta có thể cập nhật tất cả các hàng khớp với chuỗi "Armour" bằng cách sử dụng mệnh đề WHERE:

```sql
UPDATE meat_poultry_egg_inspect
SET company_standard = 'Armour-Eckrich Meats'
WHERE company LIKE 'Armour%';

SELECT company, company_standard
FROM meat_poultry_egg_inspect
WHERE company LIKE 'Armour%';
```

**Cách hoạt động:**
- Phần quan trọng của truy vấn này là mệnh đề WHERE sử dụng từ khóa LIKE đã được giới thiệu với lọc trong Chương 2
- Bao gồm cú pháp ký tự đại diện `%` ở cuối chuỗi "Armour" cập nhật tất cả các hàng bắt đầu bằng những ký tự đó bất kể những gì đến sau chúng
- Mệnh đề cho phép chúng ta nhắm mục tiêu tất cả các cách đánh vần đa dạng được sử dụng cho tên công ty

**Kết quả:** Các giá trị cho Armour-Eckrich trong `company_standard` bây giờ được chuẩn hóa với cách đánh vần nhất quán. Nếu chúng ta muốn chuẩn hóa các tên công ty khác trong bảng, chúng ta sẽ tạo câu lệnh UPDATE cho mỗi trường hợp. Chúng ta cũng sẽ giữ cột `company` gốc để tham khảo.

## Sửa Chữa Mã ZIP Sử Dụng Nối Chuỗi

Bản sửa cuối cùng của chúng ta sửa chữa các giá trị trong cột `zip` đã mất số không đầu do kết quả của lỗi dữ liệu có chủ ý của tôi. Đối với các công ty ở Puerto Rico và Quần đảo Virgin thuộc Mỹ, chúng ta cần khôi phục hai số không đầu cho các giá trị trong `zip` vì (ngoài một cơ sở xử lý IRS ở Holtsville, NY) chúng là những địa điểm duy nhất ở Hoa Kỳ nơi mã ZIP bắt đầu bằng hai số không. Sau đó, đối với các tiểu bang khác, nằm chủ yếu ở New England, chúng ta sẽ khôi phục một số không đầu duy nhất.

### Hiểu Nối Chuỗi

Chúng ta sẽ sử dụng UPDATE một lần nữa nhưng lần này kết hợp với toán tử chuỗi dấu ống đôi (`||`), thực hiện nối chuỗi. Nối chuỗi kết hợp hai hoặc nhiều giá trị chuỗi hoặc không phải chuỗi thành một. Ví dụ, chèn `||` giữa các chuỗi `abc` và `123` kết quả là `abc123`. Toán tử dấu ống đôi là tiêu chuẩn SQL cho nối chuỗi được hỗ trợ bởi PostgreSQL. Bạn có thể sử dụng nó trong nhiều ngữ cảnh, chẳng hạn như truy vấn UPDATE và SELECT, để cung cấp đầu ra tùy chỉnh từ dữ liệu hiện có cũng như dữ liệu mới.

### Tạo Sao Lưu Mã ZIP

Đầu tiên, hãy tạo một bản sao sao lưu của cột `zip` theo cùng cách chúng ta đã tạo sao lưu của cột `st` trước đó:

```sql
ALTER TABLE meat_poultry_egg_inspect ADD COLUMN zip_copy varchar(5);
UPDATE meat_poultry_egg_inspect
SET zip_copy = zip;
```

### Khôi Phục Hai Số Không Đầu

Tiếp theo, chúng ta sử dụng mã để thực hiện cập nhật đầu tiên cho Puerto Rico và Quần đảo Virgin:

```sql
UPDATE meat_poultry_egg_inspect
SET zip = '00' || zip
WHERE st IN('PR','VI') AND length(zip) = 3;
```

**Cách hoạt động:**
- Chúng ta sử dụng SET để đặt cột `zip` thành một giá trị là kết quả của việc nối chuỗi `00` và nội dung hiện có của cột `zip`
- Chúng ta giới hạn UPDATE chỉ cho những hàng nơi cột `st` có mã tiểu bang PR và VI sử dụng toán tử so sánh IN từ Chương 2
- Chúng ta thêm kiểm tra cho các hàng nơi độ dài của `zip` là 3
- Toàn bộ câu lệnh này sau đó sẽ chỉ cập nhật các giá trị zip cho Puerto Rico và Quần đảo Virgin

**Kết quả:** PostgreSQL sẽ trả về thông báo `UPDATE 86`, đó là số hàng chúng ta mong đợi thay đổi dựa trên số đếm trước đó của chúng ta.

### Khôi Phục Một Số Không Đầu

Hãy sửa chữa các mã ZIP còn lại bằng cách sử dụng truy vấn tương tự:

```sql
UPDATE meat_poultry_egg_inspect
SET zip = '0' || zip
WHERE st IN('CT','MA','ME','NH','NJ','RI','VT') AND length(zip) = 4;
```

**Kết quả:** PostgreSQL sẽ trả về thông báo `UPDATE 496`.

### Xác Minh Bản Sửa

Bây giờ, hãy kiểm tra tiến trình của chúng ta. Trước đó trong chương, khi chúng ta tổng hợp các hàng trong cột `zip` theo độ dài, chúng ta tìm thấy 86 hàng có ba ký tự và 496 có bốn. Sử dụng cùng truy vấn bây giờ trả về kết quả mong muốn hơn: tất cả các hàng đều có mã ZIP năm chữ số.

```sql
SELECT length(zip), count(*) AS length_count
FROM meat_poultry_egg_inspect
GROUP BY length(zip)
ORDER BY length(zip) ASC;
```

**Kết quả:** Tất cả 6.287 hàng bây giờ có mã ZIP năm chữ số.

**Lưu ý:** Trong ví dụ này chúng ta đã sử dụng nối chuỗi, nhưng bạn có thể sử dụng các hàm chuỗi SQL bổ sung để sửa đổi dữ liệu với UPDATE bằng cách thay đổi từ chữ hoa sang chữ thường, cắt bỏ khoảng trắng không mong muốn, thay thế ký tự trong chuỗi, và nhiều hơn nữa. Tôi sẽ thảo luận các hàm chuỗi bổ sung trong Chương 13 khi chúng ta xem xét các kỹ thuật nâng cao để làm việc với văn bản.

## Cập Nhật Giá Trị Qua Các Bảng

Trong phần "Sửa Đổi Giá Trị Với UPDATE", tôi đã hiển thị cú pháp ANSI SQL chuẩn và cụ thể PostgreSQL để cập nhật giá trị trong một bảng dựa trên giá trị trong bảng khác. Cú pháp này đặc biệt có giá trị trong cơ sở dữ liệu quan hệ nơi khóa chính và khóa ngoại thiết lập mối quan hệ bảng. Nó cũng hữu ích khi dữ liệu trong một bảng có thể là ngữ cảnh cần thiết để cập nhật giá trị trong bảng khác.

### Tạo Bảng Vùng Tiểu Bang

Ví dụ, hãy nói rằng chúng ta đang đặt ngày kiểm tra cho mỗi công ty trong bảng của chúng ta. Chúng ta muốn làm điều này theo vùng Hoa Kỳ, chẳng hạn như Đông Bắc, Thái Bình Dương, v.v., nhưng những chỉ định vùng đó không tồn tại trong bảng của chúng ta. Tuy nhiên, chúng tồn tại trong một tập dữ liệu chúng ta có thể thêm vào cơ sở dữ liệu của chúng ta cũng chứa mã tiểu bang `st` khớp.

```sql
CREATE TABLE state_regions (
    st varchar(2) CONSTRAINT st_key PRIMARY KEY,
    region varchar(20) NOT NULL
);

COPY state_regions
FROM 'C:\YourDirectory\state_regions.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ',');
```

**Cách hoạt động:**
- Chúng ta sẽ tạo hai cột trong bảng `state_regions`: một cột chứa mã tiểu bang hai ký tự `st` và cột kia chứa tên vùng
- Chúng ta đặt ràng buộc khóa chính cho cột `st`, chứa giá trị `st_key` duy nhất để xác định mỗi tiểu bang
- Trong dữ liệu bạn đang nhập, mỗi tiểu bang có mặt và được gán cho một vùng Điều tra Dân số Hoa Kỳ, và các lãnh thổ bên ngoài Hoa Kỳ được dán nhãn là khu vực ngoài biên

### Thêm và Cập Nhật Ngày Kiểm Tra

Tiếp theo, hãy quay lại bảng `meat_poultry_egg_inspect`, thêm cột cho ngày kiểm tra, và sau đó điền vào cột đó với các tiểu bang New England:

```sql
ALTER TABLE meat_poultry_egg_inspect ADD COLUMN inspection_date date;

UPDATE meat_poultry_egg_inspect inspect
SET inspection_date = '2019-12-01'
WHERE EXISTS (SELECT state_regions.region
              FROM state_regions
              WHERE inspect.st = state_regions.st
              AND state_regions.region = 'New England');
```

**Cách hoạt động:**
- Câu lệnh ALTER TABLE tạo cột `inspection_date` trong bảng `meat_poultry_egg_inspect`
- Trong câu lệnh UPDATE, chúng ta bắt đầu bằng cách đặt tên bảng sử dụng bí danh `inspect` để làm cho mã dễ đọc hơn
- Tiếp theo, mệnh đề SET gán giá trị ngày `2019-12-01` cho cột `inspection_date` mới
- Cuối cùng, mệnh đề WHERE EXISTS bao gồm một truy vấn con kết nối bảng `meat_poultry_egg_inspect` với bảng `state_regions` chúng ta đã tạo và chỉ định các hàng cần cập nhật
- Truy vấn con (trong dấu ngoặc đơn, bắt đầu với SELECT) tìm các hàng trong bảng `state_regions` nơi cột `region` khớp với chuỗi "New England"
- Đồng thời, nó kết nối bảng `meat_poultry_egg_inspect` với bảng `state_regions` sử dụng cột `st` từ cả hai bảng
- Trên thực tế, truy vấn đang nói với cơ sở dữ liệu tìm tất cả các mã `st` tương ứng với vùng New England và sử dụng các mã đó để lọc cập nhật

**Kết quả:** Khi bạn chạy mã, bạn sẽ nhận được thông báo `UPDATE 252`, đó là số lượng công ty ở New England.

**Xem Giá Trị Đã Cập Nhật:**
```sql
SELECT st, inspection_date
FROM meat_poultry_egg_inspect
GROUP BY st, inspection_date
ORDER BY st;
```

**Kết quả:** Kết quả sẽ hiển thị các ngày kiểm tra đã cập nhật cho tất cả các công ty New England. Phần đầu của đầu ra cho thấy Connecticut đã nhận được ngày, ví dụ, nhưng các tiểu bang bên ngoài New England vẫn là NULL vì chúng ta chưa cập nhật chúng.

**Lưu ý:** Để điền ngày cho các vùng bổ sung, thay thế một vùng khác cho "New England" và chạy lại truy vấn.

## Xóa Dữ Liệu Không Cần Thiết

Cách không thể đảo ngược nhất để sửa đổi dữ liệu là xóa nó hoàn toàn. SQL bao gồm các tùy chọn để xóa hàng và cột khỏi bảng cùng với các tùy chọn để xóa toàn bộ bảng hoặc cơ sở dữ liệu. Chúng ta muốn thực hiện các thao tác này một cách thận trọng, chỉ xóa dữ liệu hoặc bảng chúng ta không cần. Không có sao lưu, dữ liệu sẽ mất vĩnh viễn.

**Lưu ý quan trọng:** Dễ dàng loại trừ dữ liệu không mong muốn trong truy vấn bằng cách sử dụng mệnh đề WHERE, vì vậy hãy quyết định xem bạn có thực sự cần xóa dữ liệu hay chỉ có thể lọc nó ra. Các trường hợp nơi xóa có thể là giải pháp tốt nhất bao gồm dữ liệu có lỗi hoặc dữ liệu được nhập không đúng cách.

Trong phần này, chúng ta sẽ sử dụng nhiều câu lệnh SQL để xóa dữ liệu không cần thiết:
- **DELETE FROM**: Để xóa hàng khỏi bảng
- **ALTER TABLE DROP COLUMN**: Để xóa cột khỏi bảng
- **DROP TABLE**: Để xóa toàn bộ bảng khỏi cơ sở dữ liệu

**Cảnh báo:** Viết và thực thi các câu lệnh này khá đơn giản, nhưng làm như vậy đi kèm với một cảnh báo. Nếu xóa hàng, cột hoặc bảng sẽ gây ra vi phạm ràng buộc, chẳng hạn như ràng buộc khóa ngoại được đề cập trong Chương 7, bạn cần xử lý ràng buộc đó trước. Điều đó có thể liên quan đến việc xóa ràng buộc, xóa dữ liệu trong bảng khác, hoặc xóa bảng khác. Mỗi trường hợp là duy nhất và sẽ yêu cầu một cách khác nhau để làm việc xung quanh ràng buộc.

### Xóa Hàng Khỏi Bảng

Sử dụng câu lệnh DELETE FROM, chúng ta có thể xóa tất cả các hàng khỏi bảng, hoặc chúng ta có thể sử dụng mệnh đề WHERE để chỉ xóa phần khớp với biểu thức chúng ta cung cấp.

**Xóa Tất Cả Hàng:**
```sql
DELETE FROM table_name;
```

**Lưu ý:** Nếu bảng của bạn có số lượng hàng lớn, có thể nhanh hơn để xóa bảng và tạo phiên bản mới bằng cách sử dụng câu lệnh CREATE TABLE gốc. Để xóa bảng, sử dụng lệnh DROP TABLE.

**Xóa Hàng Đã Chọn:**
```sql
DELETE FROM table_name WHERE expression;
```

**Ví dụ:** Nếu chúng ta muốn bảng các nhà chế biến thịt, gia cầm và trứng của chúng ta chỉ bao gồm các cơ sở ở 50 tiểu bang Hoa Kỳ, chúng ta có thể xóa các công ty ở Puerto Rico và Quần đảo Virgin khỏi bảng:

```sql
DELETE FROM meat_poultry_egg_inspect
WHERE st IN('PR','VI');
```

**Kết quả:** PostgreSQL sẽ trả về thông báo `DELETE 86`. Điều này có nghĩa là 86 hàng nơi cột `st` chứa PR hoặc VI đã được xóa khỏi bảng.

### Xóa Cột Khỏi Bảng

Trong khi làm việc trên cột `zip` trong bảng `meat_poultry_egg_inspect` trước đó trong chương này, chúng ta đã tạo một cột sao lưu có tên `zip_copy`. Bây giờ chúng ta đã hoàn thành việc sửa các vấn đề trong `zip`, chúng ta không còn cần `zip_copy` nữa. Chúng ta có thể xóa cột sao lưu, bao gồm tất cả dữ liệu trong cột, khỏi bảng bằng cách sử dụng từ khóa DROP trong câu lệnh ALTER TABLE.

**Cú Pháp:**
```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

**Ví dụ:**
```sql
ALTER TABLE meat_poultry_egg_inspect DROP COLUMN zip_copy;
```

**Kết quả:** PostgreSQL trả về thông báo `ALTER TABLE`, và cột `zip_copy` sẽ bị xóa.

### Xóa Bảng Khỏi Cơ Sở Dữ Liệu

Câu lệnh DROP TABLE là một tính năng ANSI SQL chuẩn xóa bảng khỏi cơ sở dữ liệu. Câu lệnh này có thể hữu ích nếu, ví dụ, bạn có một bộ sưu tập các bản sao lưu, hoặc bảng làm việc, đã hết hữu ích. Nó cũng hữu ích trong các tình huống khác, chẳng hạn như khi bạn cần thay đổi cấu trúc của bảng đáng kể; trong trường hợp đó, thay vì sử dụng quá nhiều câu lệnh ALTER TABLE, bạn chỉ cần xóa bảng và tạo bảng khác bằng cách chạy câu lệnh CREATE TABLE mới.

**Cú Pháp:**
```sql
DROP TABLE table_name;
```

**Ví dụ:**
```sql
DROP TABLE meat_poultry_egg_inspect_backup;
```

**Kết quả:** Chạy truy vấn; PostgreSQL sẽ phản hồi với thông báo `DROP TABLE` để chỉ ra rằng bảng đã được xóa.

## Sử Dụng Khối Giao Dịch Để Lưu Hoặc Hoàn Tác Thay Đổi

Các thay đổi bạn đã thực hiện trên dữ liệu bằng các kỹ thuật trong chương này cho đến nay là cuối cùng. Nghĩa là, sau khi bạn chạy truy vấn DELETE hoặc UPDATE (hoặc bất kỳ truy vấn nào khác thay đổi dữ liệu hoặc cấu trúc cơ sở dữ liệu của bạn), cách duy nhất để hoàn tác thay đổi là khôi phục từ sao lưu. Tuy nhiên, bạn có thể kiểm tra các thay đổi của mình trước khi hoàn tất chúng và hủy thay đổi nếu nó không phải là những gì bạn dự định.

Bạn làm điều này bằng cách bọc câu lệnh SQL trong một **khối giao dịch**, là một nhóm câu lệnh bạn định nghĩa bằng cách sử dụng các từ khóa sau ở đầu và cuối truy vấn:

### Từ Khóa Giao Dịch

- **START TRANSACTION**: Báo hiệu bắt đầu khối giao dịch. Trong PostgreSQL, bạn cũng có thể sử dụng từ khóa `BEGIN` không phải ANSI SQL.
- **COMMIT**: Báo hiệu kết thúc khối và lưu tất cả thay đổi.
- **ROLLBACK**: Báo hiệu kết thúc khối và hoàn tác tất cả thay đổi.

**Cách hoạt động:** Thông thường, các lập trình viên cơ sở dữ liệu sử dụng khối giao dịch để định nghĩa bắt đầu và kết thúc của một chuỗi thao tác thực hiện một đơn vị công việc trong cơ sở dữ liệu. Một ví dụ là khi bạn mua vé cho một buổi biểu diễn Broadway. Một giao dịch thành công có thể liên quan đến hai bước: tính phí thẻ tín dụng của bạn và đặt chỗ của bạn để người khác không thể mua chúng. Một lập trình viên cơ sở dữ liệu sẽ muốn cả hai bước trong giao dịch xảy ra (nói, khi phí thẻ của bạn được thực hiện) hoặc không có bước nào xảy ra (nếu thẻ của bạn bị từ chối hoặc bạn hủy ở thanh toán). Định nghĩa cả hai bước như một giao dịch giữ chúng như một đơn vị; nếu một bước thất bại, bước kia cũng bị hủy.

### Ví Dụ: Sử Dụng Khối Giao Dịch

Sử dụng bảng `meat_poultry_egg_inspect`, hãy nói rằng chúng ta đang làm sạch dữ liệu bẩn liên quan đến công ty AGRO Merchants Oakland LLC. Bảng có ba hàng liệt kê công ty, nhưng một hàng có dấu phẩy thừa trong tên. Chúng ta muốn tên nhất quán, vì vậy chúng ta sẽ xóa dấu phẩy khỏi hàng thứ ba bằng cách sử dụng truy vấn UPDATE. Nhưng lần này chúng ta sẽ kiểm tra kết quả của cập nhật của chúng ta trước khi làm cho nó cuối cùng (và chúng ta sẽ cố ý mắc một sai lầm chúng ta muốn loại bỏ):

```sql
START TRANSACTION;
UPDATE meat_poultry_egg_inspect
SET company = 'AGRO Merchantss Oakland LLC'  -- Lỗi đánh máy có chủ ý
WHERE company = 'AGRO Merchants Oakland, LLC';
SELECT company
FROM meat_poultry_egg_inspect
WHERE company LIKE 'AGRO%'
ORDER BY company;
ROLLBACK;
```

**Cách hoạt động:**
- Chúng ta sẽ chạy mỗi câu lệnh riêng biệt, bắt đầu với `START TRANSACTION;`
- Cơ sở dữ liệu phản hồi với thông báo `START TRANSACTION`, cho bạn biết rằng bất kỳ thay đổi nào bạn thực hiện đối với dữ liệu sẽ không được làm vĩnh viễn trừ khi bạn phát hành lệnh COMMIT
- Tiếp theo, chúng ta chạy câu lệnh UPDATE, thay đổi tên công ty trong hàng nơi nó có dấu phẩy thừa. Tôi cố ý thêm một chữ `s` thừa vào tên được sử dụng trong mệnh đề SET để giới thiệu một sai lầm
- Khi chúng ta xem tên các công ty bắt đầu bằng các chữ cái "AGRO" bằng cách sử dụng câu lệnh SELECT, chúng ta thấy rằng, ồ, một tên công ty bây giờ bị đánh vần sai
- Thay vì chạy lại câu lệnh UPDATE để sửa lỗi đánh máy, chúng ta có thể đơn giản loại bỏ thay đổi bằng cách chạy lệnh `ROLLBACK;`
- Khi chúng ta chạy lại câu lệnh SELECT để xem tên công ty, chúng ta quay lại nơi chúng ta bắt đầu

**Từ đây:** Bạn có thể sửa câu lệnh UPDATE của mình bằng cách xóa chữ `s` thừa và chạy lại nó, bắt đầu với câu lệnh START TRANSACTION một lần nữa. Nếu bạn hài lòng với các thay đổi, chạy `COMMIT;` để làm cho chúng vĩnh viễn.

**Lưu ý quan trọng:** Khi bạn bắt đầu giao dịch, bất kỳ thay đổi nào bạn thực hiện đối với dữ liệu không hiển thị với người dùng cơ sở dữ liệu khác cho đến khi bạn thực thi COMMIT.

Khối giao dịch thường được sử dụng trong các hệ thống cơ sở dữ liệu phức tạp hơn. Ở đây bạn đã sử dụng chúng để thử một truy vấn và chấp nhận hoặc từ chối các thay đổi, tiết kiệm thời gian và đau đầu cho bạn.

## Cải Thiện Hiệu Suất Khi Cập Nhật Bảng Lớn

Vì cách PostgreSQL hoạt động nội bộ, thêm cột vào bảng và điền nó bằng giá trị có thể nhanh chóng làm tăng kích thước bảng. Lý do là cơ sở dữ liệu tạo một phiên bản mới của hàng hiện có mỗi khi giá trị được cập nhật, nhưng nó không xóa phiên bản hàng cũ. (Bạn sẽ học cách dọn dẹp các hàng cũ này khi tôi thảo luận bảo trì cơ sở dữ liệu trong "Khôi Phục Không Gian Chưa Sử Dụng Với VACUUM" trên trang 314.) Đối với tập dữ liệu nhỏ, sự gia tăng là không đáng kể, nhưng đối với bảng có hàng trăm nghìn hoặc hàng triệu hàng, thời gian cần thiết để cập nhật hàng và dung lượng đĩa bổ sung kết quả có thể đáng kể.

### Cách Tiếp Cận Thay Thế: Sao Chép Bảng Với Cột Mới

Thay vì thêm cột và điền nó bằng giá trị, chúng ta có thể tiết kiệm dung lượng đĩa bằng cách sao chép toàn bộ bảng và thêm cột đã điền trong thao tác. Sau đó, chúng ta đổi tên các bảng để bản sao thay thế bản gốc, và bản gốc trở thành sao lưu.

**Bước 1: Tạo Bảng Với Cột Mới**
```sql
CREATE TABLE meat_poultry_egg_inspect_backup AS
SELECT *,
       '2018-02-07'::date AS reviewed_date
FROM meat_poultry_egg_inspect;
```

**Cách hoạt động:**
- Truy vấn là một phiên bản sửa đổi của script sao lưu
- Ở đây, ngoài việc chọn tất cả các cột bằng cách sử dụng ký tự đại diện dấu hoa thị, chúng ta cũng thêm một cột có tên `reviewed_date` bằng cách cung cấp giá trị được ép kiểu như kiểu dữ liệu ngày và từ khóa AS
- Cú pháp đó thêm và điền `reviewed_date`, mà chúng ta có thể sử dụng để theo dõi lần cuối cùng chúng ta kiểm tra trạng thái của mỗi nhà máy

**Bước 2: Đổi Tên Bảng**
```sql
ALTER TABLE meat_poultry_egg_inspect RENAME TO meat_poultry_egg_inspect_temp;
ALTER TABLE meat_poultry_egg_inspect_backup RENAME TO meat_poultry_egg_inspect;
ALTER TABLE meat_poultry_egg_inspect_temp RENAME TO meat_poultry_egg_inspect_backup;
```

**Cách hoạt động:**
- Ở đây chúng ta sử dụng ALTER TABLE với mệnh đề RENAME TO để thay đổi tên bảng
- Câu lệnh đầu tiên thay đổi tên bảng gốc thành một tên kết thúc bằng `_temp`
- Câu lệnh thứ hai đổi tên bản sao chúng ta đã tạo thành tên gốc của bảng
- Cuối cùng, chúng ta đổi tên bảng kết thúc bằng `_temp` thành kết thúc `_backup`
- Bảng gốc bây giờ được gọi là `meat_poultry_egg_inspect_backup`, và bản sao với cột đã thêm được gọi là `meat_poultry_egg_inspect`

**Lợi ích:** Bằng cách sử dụng quy trình này, chúng ta tránh cập nhật hàng và làm cho cơ sở dữ liệu tăng kích thước bảng. Khi chúng ta cuối cùng xóa bảng `_backup`, bảng dữ liệu còn lại nhỏ hơn và không yêu cầu dọn dẹp.

## Tóm Tắt

Thu thập thông tin hữu ích từ dữ liệu đôi khi yêu cầu sửa đổi dữ liệu để loại bỏ sự không nhất quán, sửa lỗi và làm cho nó phù hợp hơn để hỗ trợ phân tích chính xác. Trong chương này bạn đã học một số công cụ hữu ích để giúp bạn đánh giá dữ liệu bẩn và làm sạch nó. Trong một thế giới hoàn hảo, tất cả các tập dữ liệu sẽ đến với mọi thứ sạch sẽ và hoàn chỉnh. Nhưng thế giới hoàn hảo như vậy không tồn tại, vì vậy khả năng thay đổi, cập nhật và xóa dữ liệu là không thể thiếu.

### Các Khái Niệm Chính Đã Được Bao Phủ

- **Dữ liệu bẩn**: Dữ liệu có lỗi, giá trị bị thiếu hoặc tổ chức kém
- **Phỏng vấn dữ liệu**: Sử dụng truy vấn tổng hợp để phát hiện vấn đề chất lượng dữ liệu
- **ALTER TABLE**: Sửa đổi cấu trúc bảng (ADD COLUMN, DROP COLUMN, ALTER COLUMN)
- **UPDATE**: Sửa đổi giá trị dữ liệu trong bảng
- **Chiến lược sao lưu**: Tạo sao lưu bảng và cột trước khi sửa đổi
- **Nối chuỗi**: Sử dụng toán tử `||` để kết hợp chuỗi
- **Khối giao dịch**: START TRANSACTION, COMMIT, ROLLBACK
- **DELETE**: Xóa hàng khỏi bảng
- **DROP COLUMN**: Xóa cột khỏi bảng
- **DROP TABLE**: Xóa toàn bộ bảng
- **Tối ưu hóa hiệu suất**: Sao chép bảng thay vì cập nhật bảng lớn

### Thực Hành Tốt Nhất

1. ✅ Luôn sao lưu bảng trước khi thực hiện thay đổi
2. ✅ Tạo bản sao cột để bảo vệ thêm
3. ✅ Sử dụng khối giao dịch để kiểm tra thay đổi trước khi cam kết
4. ✅ Xác minh thay đổi với truy vấn SELECT trước khi cam kết
5. ✅ Sử dụng mệnh đề WHERE cẩn thận trong câu lệnh UPDATE và DELETE
6. ✅ Giữ các cột gốc khi tạo phiên bản chuẩn hóa
7. ✅ Sử dụng LIKE với ký tự đại diện để khớp mẫu trong cập nhật
8. ✅ Sử dụng nối chuỗi để sửa chữa giá trị định dạng sai
9. ✅ Cân nhắc sao chép bảng thay vì cập nhật bảng lớn
10. ✅ Tài liệu hóa tất cả thay đổi được thực hiện đối với dữ liệu

### Mẫu Thường Dùng

**Tạo sao lưu:**
```sql
CREATE TABLE table_backup AS SELECT * FROM table;
```

**Tạo bản sao cột:**
```sql
ALTER TABLE table ADD COLUMN column_copy data_type;
UPDATE table SET column_copy = column;
```

**Cập nhật hàng cụ thể:**
```sql
UPDATE table SET column = value WHERE condition;
```

**Cập nhật với khớp mẫu:**
```sql
UPDATE table SET column = 'standard_value' WHERE column LIKE 'pattern%';
```

**Sửa chữa giá trị với nối chuỗi:**
```sql
UPDATE table SET column = 'prefix' || column WHERE condition;
```

**Sử dụng khối giao dịch:**
```sql
START TRANSACTION;
UPDATE table SET column = value WHERE condition;
SELECT * FROM table WHERE condition;  -- Xác minh thay đổi
ROLLBACK;  -- hoặc COMMIT;
```

**Xóa hàng:**
```sql
DELETE FROM table WHERE condition;
```

**Xóa cột:**
```sql
ALTER TABLE table DROP COLUMN column;
```

**Xóa bảng:**
```sql
DROP TABLE table;
```

### Khi Nào Sử Dụng Mỗi Lệnh

**ALTER TABLE:**
- Thêm cột mới
- Xóa cột không cần thiết
- Thay đổi kiểu dữ liệu
- Thêm hoặc xóa ràng buộc
- Đổi tên bảng

**UPDATE:**
- Sửa giá trị bị thiếu
- Chuẩn hóa dữ liệu không nhất quán
- Sửa chữa giá trị định dạng sai
- Cập nhật giá trị dựa trên bảng khác

**DELETE:**
- Xóa dữ liệu sai
- Dọn dẹp dữ liệu thử nghiệm
- Xóa bản ghi lỗi thời

**Khối Giao Dịch:**
- Kiểm tra thay đổi trước khi cam kết
- Đảm bảo tính nhất quán dữ liệu
- Hoàn tác sai lầm

### Vấn Đề Chất Lượng Dữ Liệu Cần Kiểm Tra

1. **Giá trị bị thiếu**: Sử dụng `IS NULL` để tìm
2. **Địa chỉ trùng lặp**: Sử dụng GROUP BY với HAVING
3. **Cách đánh vần không nhất quán**: Sử dụng GROUP BY với count()
4. **Giá trị định dạng sai**: Sử dụng hàm `length()`
5. **Kiểu dữ liệu sai**: Kiểm tra với `max()` và `min()`

## Các Bước Tiếp Theo

Hãy để tôi nhắc lại các nhiệm vụ quan trọng của việc làm việc an toàn. Hãy đảm bảo sao lưu bảng của bạn trước khi bạn bắt đầu thực hiện thay đổi. Tạo bản sao cột của bạn, quá, cho một mức độ bảo vệ bổ sung. Khi tôi thảo luận bảo trì cơ sở dữ liệu cho PostgreSQL sau này trong cuốn sách, bạn sẽ học cách sao lưu toàn bộ cơ sở dữ liệu. Những bước phòng ngừa này sẽ tiết kiệm cho bạn một thế giới đau đớn.

Trong chương tiếp theo, chúng ta sẽ quay lại toán học để khám phá một số hàm thống kê nâng cao của SQL và kỹ thuật phân tích.
