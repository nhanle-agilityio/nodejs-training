# Chương 4: Nhập và Xuất Dữ Liệu

## Giới Thiệu

Cho đến nay, bạn đã học cách thêm một vài hàng vào bảng bằng cách sử dụng câu lệnh SQL INSERT. Việc chèn từng hàng hữu ích cho việc tạo bảng kiểm tra nhanh hoặc thêm một vài hàng vào bảng hiện có. Nhưng có khả năng bạn sẽ cần tải hàng trăm, hàng nghìn hoặc thậm chí hàng triệu hàng, và không ai muốn viết các câu lệnh INSERT riêng biệt trong những tình huống đó. May mắn thay, bạn không phải làm vậy.

Nếu dữ liệu của bạn tồn tại trong một tệp văn bản có phân cách (với một hàng bảng mỗi dòng văn bản và mỗi giá trị cột được phân tách bằng dấu phẩy hoặc ký tự khác), PostgreSQL có thể nhập dữ liệu hàng loạt qua lệnh **COPY** của nó. Lệnh này là triển khai cụ thể của PostgreSQL với các tùy chọn để bao gồm hoặc loại trừ cột và xử lý các loại văn bản có phân cách khác nhau.

Theo hướng ngược lại, COPY cũng sẽ xuất dữ liệu từ các bảng PostgreSQL hoặc từ kết quả của truy vấn sang tệp văn bản có phân cách. Kỹ thuật này hữu ích khi bạn muốn chia sẻ dữ liệu với đồng nghiệp hoặc chuyển nó sang định dạng khác, chẳng hạn như tệp Excel.

## Ba Bước Để Nhập Dữ Liệu

Ba bước tạo thành phác thảo của hầu hết các lần nhập bạn sẽ thực hiện:

1. **Chuẩn bị dữ liệu nguồn** ở dạng tệp văn bản có phân cách
2. **Tạo bảng** để lưu trữ dữ liệu
3. **Viết script COPY** để thực hiện nhập

Sau khi nhập xong, chúng ta sẽ kiểm tra dữ liệu và xem xét các tùy chọn bổ sung cho việc nhập và xuất.

## Làm Việc Với Tệp Văn Bản Có Phân Cách

Tệp văn bản có phân cách là định dạng tệp phổ biến nhất có thể di chuyển giữa các hệ thống độc quyền và mã nguồn mở, vì vậy chúng ta sẽ tập trung vào loại tệp đó. Nếu bạn muốn chuyển dữ liệu từ định dạng độc quyền của chương trình cơ sở dữ liệu khác trực tiếp sang PostgreSQL, chẳng hạn như Microsoft Access hoặc MySQL, bạn sẽ cần sử dụng công cụ của bên thứ ba.

**Lưu Ý:** Nếu bạn đang sử dụng SQL với trình quản lý cơ sở dữ liệu khác, hãy kiểm tra tài liệu của cơ sở dữ liệu đó để xem cách nó xử lý nhập hàng loạt. Cơ sở dữ liệu MySQL, ví dụ, có câu lệnh `LOAD DATA INFILE`, và SQL Server của Microsoft có lệnh `BULK INSERT` riêng của nó.

### Hiểu Về Tệp Có Phân Cách

Nhiều ứng dụng phần mềm lưu trữ dữ liệu ở định dạng độc nhất, và việc dịch một định dạng dữ liệu sang định dạng khác có thể khó khăn. May mắn thay, hầu hết phần mềm có thể nhập từ và xuất sang tệp văn bản có phân cách, đây là định dạng dữ liệu phổ biến phục vụ như một điểm giữa.

**Định Nghĩa:** Tệp văn bản có phân cách chứa các hàng dữ liệu, và mỗi hàng đại diện cho một hàng trong bảng. Trong mỗi hàng, một ký tự phân tách, hoặc phân cách, mỗi cột dữ liệu.

**Các Ký Tự Phân Cách Phổ Biến:**
- Dấu phẩy (phổ biến nhất) - CSV (Comma-Separated Values)
- Dấu ống (`|`)
- Tab
- Dấu chấm phẩy (`;`)
- Các ký tự khác (dấu và, v.v.)

**Ví Dụ Hàng Có Phân Cách Bằng Dấu Phẩy:**
```
John,Doe,123 Main St.,Hyde Park,NY,845-555-1212
```

Lưu ý rằng dấu phẩy phân tách mỗi phần dữ liệu—tên, họ, đường phố, thị trấn, tiểu bang và điện thoại—không có khoảng trắng. Dấu phẩy cho phần mềm biết xử lý mỗi mục như một cột riêng biệt, khi nhập hoặc xuất.

### Trích Dẫn Các Cột Chứa Ký Tự Phân Cách

Sử dụng dấu phẩy làm ký tự phân cách cột dẫn đến một tình huống khó xử tiềm ẩn: nếu giá trị trong cột bao gồm dấu phẩy thì sao? Ví dụ, đôi khi mọi người kết hợp số căn hộ với địa chỉ đường phố, như trong "123 Main St., Apartment 200". Trừ khi hệ thống phân cách tính đến dấu phẩy thừa đó, trong quá trình nhập, dòng sẽ xuất hiện có thêm cột và gây ra lỗi nhập.

**Giải Pháp:** Tệp có phân cách bọc các cột chứa ký tự phân cách bằng một ký tự tùy ý được gọi là **text qualifier** (bộ định tính văn bản) cho SQL biết bỏ qua ký tự phân cách được giữ bên trong. Hầu hết thời gian trong tệp có phân cách bằng dấu phẩy, text qualifier được sử dụng là dấu ngoặc kép.

**Ví Dụ:**
```
John,Doe,"123 Main St., Apartment 200",Hyde Park,NY,845-555-1212
```

Khi nhập, cơ sở dữ liệu sẽ nhận ra rằng dấu ngoặc kép biểu thị một cột bất kể nó có tìm thấy ký tự phân cách trong dấu ngoặc kép hay không. Khi nhập tệp CSV, PostgreSQL theo mặc định bỏ qua các ký tự phân cách bên trong các cột được đặt trong dấu ngoặc kép, nhưng bạn có thể chỉ định một text qualifier khác nếu việc nhập của bạn yêu cầu.

### Xử Lý Hàng Tiêu Đề

Một tính năng khác bạn thường tìm thấy trong tệp văn bản có phân cách là **hàng tiêu đề**. Như tên gọi, đó là một hàng duy nhất ở đầu, hoặc phần đầu, của tệp liệt kê tên của mỗi trường dữ liệu. Thông thường, tiêu đề được tạo trong quá trình xuất dữ liệu từ cơ sở dữ liệu.

**Ví Dụ:**
```
FIRSTNAME,LASTNAME,STREET,CITY,STATE,PHONE
John,Doe,"123 Main St., Apartment 200",Hyde Park,NY,845-555-1212
```

**Mục Đích Của Hàng Tiêu Đề:**
1. Các giá trị trong hàng tiêu đề xác định dữ liệu trong mỗi cột, đặc biệt hữu ích khi bạn đang giải mã nội dung tệp
2. Một số trình quản lý cơ sở dữ liệu (mặc dù không phải PostgreSQL) sử dụng hàng tiêu đề để ánh xạ các cột trong tệp có phân cách với các cột đúng trong bảng nhập

**Quan Trọng:** Vì PostgreSQL không sử dụng hàng tiêu đề, chúng ta không muốn hàng đó được nhập vào bảng, vì vậy chúng ta sẽ sử dụng tùy chọn `HEADER` trong lệnh COPY để loại trừ nó.

## Sử Dụng COPY Để Nhập Dữ Liệu

Để nhập dữ liệu từ tệp bên ngoài vào cơ sở dữ liệu của chúng ta, trước tiên chúng ta cần kiểm tra tệp CSV nguồn và xây dựng bảng trong PostgreSQL để chứa dữ liệu. Sau đó, câu lệnh SQL cho việc nhập tương đối đơn giản.

### Cú Pháp COPY Nhập Cơ Bản

```sql
COPY tên_bảng
FROM 'C:\YourDirectory\your_file.csv'
WITH (FORMAT CSV, HEADER);
```

**Các Thành Phần:**
- **COPY** - Từ khóa theo sau là tên của bảng đích (phải đã tồn tại)
- **FROM** - Từ khóa xác định đường dẫn đầy đủ đến tệp nguồn, bao gồm tên của nó
- **WITH** - Từ khóa cho phép bạn chỉ định các tùy chọn, được bao quanh bởi dấu ngoặc đơn

### Định Dạng Đường Dẫn Tệp

**Windows:**
```sql
FROM 'C:\Users\Anthony\Desktop\my_file.csv'
```
Bắt đầu bằng chữ cái ổ đĩa, dấu hai chấm, dấu gạch chéo ngược và tên thư mục.

**macOS/Linux:**
```sql
FROM '/Users/anthony/Desktop/my_file.csv'
```
Bắt đầu từ thư mục gốc hệ thống bằng dấu gạch chéo về phía trước và tiếp tục từ đó.

**Quan Trọng:** Trong cả hai trường hợp, đường dẫn đầy đủ và tên tệp được bao quanh bởi dấu ngoặc đơn.

### Các Tùy Chọn COPY

Từ khóa WITH cho phép bạn chỉ định các tùy chọn mà bạn có thể điều chỉnh cho tệp đầu vào hoặc đầu ra của mình. Đây là các tùy chọn bạn sẽ thường sử dụng:

#### FORMAT

Sử dụng tùy chọn `FORMAT format_name` để chỉ định loại tệp bạn đang đọc hoặc ghi. Tên định dạng là:
- **CSV** - Tệp CSV chuẩn (phổ biến nhất)
- **TEXT** - Phân cách bằng tab theo mặc định (được sử dụng chủ yếu bởi các chương trình sao lưu tích hợp của PostgreSQL)
- **BINARY** - Dữ liệu được lưu trữ dưới dạng chuỗi byte (hiếm khi cần)

**Lưu Ý:** Trong định dạng TEXT, ký tự tab là ký tự phân cách theo mặc định (mặc dù bạn có thể chỉ định ký tự khác) và các ký tự backslash như `\r` được nhận dạng như các tương đương ASCII của chúng.

#### HEADER

**Khi nhập:** Sử dụng `HEADER` để chỉ định rằng tệp nguồn có hàng tiêu đề. Bạn cũng có thể chỉ định nó dài dòng là `HEADER ON`, điều này cho cơ sở dữ liệu biết bắt đầu nhập với dòng thứ hai của tệp, ngăn chặn việc nhập không mong muốn của tiêu đề.

**Khi xuất:** Sử dụng `HEADER` cho cơ sở dữ liệu biết bao gồm tên cột như một hàng tiêu đề trong tệp đầu ra, điều này thường hữu ích để làm.

#### DELIMITER

Tùy chọn `DELIMITER 'character'` cho phép bạn chỉ định ký tự nào mà tệp nhập hoặc xuất của bạn sử dụng làm ký tự phân cách. Ký tự phân cách phải là một ký tự đơn và không thể là carriage return.

**Quan Trọng:** Nếu bạn sử dụng `FORMAT CSV`, ký tự phân cách giả định là dấu phẩy. Bạn có thể chỉ định một ký tự phân cách khác nếu dữ liệu của bạn sử dụng một. Ví dụ, nếu bạn nhận được dữ liệu phân cách bằng dấu ống:
```sql
DELIMITER '|'
```

#### QUOTE

Trước đó, bạn đã học rằng trong CSV, dấu phẩy bên trong một giá trị cột đơn sẽ làm hỏng việc nhập của bạn trừ khi giá trị cột được bao quanh bởi một ký tự phục vụ như text qualifier, cho cơ sở dữ liệu biết xử lý giá trị bên trong như một cột. Theo mặc định, PostgreSQL sử dụng dấu ngoặc kép, nhưng nếu CSV bạn đang nhập sử dụng ký tự khác, bạn có thể chỉ định nó bằng tùy chọn `QUOTE 'quote_character'`.

## Nhập Dữ Liệu Điều Tra Dân Số Mô Tả Các Quận

Tập dữ liệu bạn sẽ làm việc trong bài tập nhập này lớn hơn đáng kể so với bảng teachers bạn đã tạo trong Chương 1. Nó chứa dữ liệu điều tra dân số về mỗi quận ở Hoa Kỳ và có 3,143 hàng và 91 cột.

### Hiểu Về Điều Tra Dân Số Hoa Kỳ

Cứ 10 năm một lần, chính phủ tiến hành kiểm đếm đầy đủ dân số—một trong số các chương trình đang diễn ra của Cục Điều Tra Dân Số để thu thập dữ liệu nhân khẩu học. Mỗi hộ gia đình ở Mỹ nhận được một bảng câu hỏi về mỗi người trong đó—tuổi, giới tính, chủng tộc và liệu họ có phải là người gốc Tây Ban Nha hay không. Hiến pháp Hoa Kỳ yêu cầu kiểm đếm để xác định có bao nhiêu thành viên từ mỗi tiểu bang tạo nên Hạ Viện Hoa Kỳ.

**Nguồn Dữ Liệu:** Đối với bài tập này, tải xuống tệp `us_counties_2010.csv` từ https://www.nostarch.com/practicalSQL/ và lưu nó vào một thư mục trên máy tính của bạn.

### Tạo Bảng us_counties_2010

Cấu trúc bảng bao gồm nhiều cột. Đây là phiên bản rút gọn hiển thị các cột chính:

```sql
CREATE TABLE us_counties_2010 (
    geo_name varchar(90),
    state_us_abbreviation varchar(2),
    summary_level varchar(3),
    region smallint,
    division smallint,
    state_fips varchar(2),
    county_fips varchar(3),
    area_land bigint,
    area_water bigint,
    population_count_100_percent integer,
    housing_unit_count_100_percent integer,
    internal_point_lat numeric(10,7),
    internal_point_lon numeric(10,7),
    p0010001 integer,
    p0010002 integer,
    p0010003 integer,
    p0010004 integer,
    p0010005 integer,
    p0010006 integer,
    p0010007 integer,
    p0010008 integer,
    p0010009 integer,
    p0010010 integer,
    p0010011 integer,
    p0010012 integer,
    p0010013 integer,
    p0010014 integer,
    p0010015 integer,
    p0010016 integer,
    p0010017 integer,
    p0010018 integer,
    p0010019 integer,
    p0010020 integer,
    p0010021 integer,
    p0010022 integer,
    p0010023 integer,
    p0010024 integer,
    p0010025 integer,
    p0010026 integer,
    p0010047 integer,
    p0010063 integer,
    p0010070 integer,
    p0020001 integer,
    p0020002 integer,
    p0020003 integer,
    p0020004 integer,
    p0020005 integer,
    p0020006 integer,
    p0020007 integer,
    p0020008 integer,
    p0020009 integer,
    p0020010 integer,
    p0020011 integer,
    p0020012 integer,
    p0020028 integer,
    p0020049 integer,
    p0020065 integer,
    p0020072 integer,
    p0030001 integer,
    p0030002 integer,
    p0030003 integer,
    p0030004 integer,
    p0030005 integer,
    p0030006 integer,
    p0030007 integer,
    p0030008 integer,
    p0030009 integer,
    p0030010 integer,
    p0030026 integer,
    p0030047 integer,
    p0030063 integer,
    p0030070 integer,
    p0040001 integer,
    p0040002 integer,
    p0040003 integer,
    p0040004 integer,
    p0040005 integer,
    p0040006 integer,
    p0040007 integer,
    p0040008 integer,
    p0040009 integer,
    p0040010 integer,
    p0040011 integer,
    p0040012 integer,
    p0040028 integer,
    p0040049 integer,
    p0040065 integer,
    p0040072 integer,
    h0010001 integer,
    h0010002 integer,
    h0010003 integer
);
```

**Giải Thích Các Cột Chính:**

1. **geo_name** - Tên quận (varchar(90) vì độ dài tối đa là 90 ký tự)
2. **state_us_abbreviation** - Viết tắt tiểu bang hai ký tự (varchar(2))
3. **summary_level** - Mã cấp độ địa lý (varchar(3) vì nó chứa số không đứng đầu như "050")
4. **region, division** - Mã vị trí 0-9 (smallint)
5. **state_fips, county_fips** - Mã liên bang có số không đứng đầu (varchar để bảo tồn số không)
6. **area_land, area_water** - Mét vuông (bigint vì một số giá trị vượt quá tối đa của integer)
7. **internal_point_lat, internal_point_lon** - Tọa độ (numeric(10,7) cho lên đến 7 chữ số thập phân)
8. **p0010001, p0010002, v.v.** - Số lượng dân số theo chủng tộc và dân tộc (integer)

**Quyết Định Thiết Kế Quan Trọng:**
- Sử dụng `varchar` cho mã bảo tồn số không đứng đầu (ví dụ: "050" không phải "50")
- Sử dụng `bigint` cho diện tích xử lý các giá trị rất lớn (ví dụ: các quận Alaska)
- Sử dụng `numeric(10,7)` cho tọa độ cung cấp độ chính xác đủ

### COPY vs \copy: Hiểu Sự Khác Biệt

**Quan Trọng:** Có hai cách để nhập dữ liệu trong PostgreSQL:

#### 1. COPY (Server-Side)
- Lệnh `COPY` yêu cầu PostgreSQL **server** đọc tệp
- Server phải có quyền truy cập vào tệp trên hệ thống tệp của server
- Thường yêu cầu quyền superuser hoặc cấu hình quyền truy cập đặc biệt
- **Lỗi phổ biến:** `Permission denied` khi server không thể đọc tệp

**Khi nào sử dụng:** Khi bạn có quyền superuser và tệp nằm trên máy chủ PostgreSQL

#### 2. \copy (Client-Side) - **Khuyến Nghị**
- Lệnh `\copy` là lệnh **client-side** của psql
- Client (máy tính của bạn) đọc tệp và gửi dữ liệu đến server
- Không yêu cầu quyền đặc biệt trên server
- **Giải pháp cho lỗi Permission denied**

**Khi nào sử dụng:** Khi bạn đang làm việc từ máy client hoặc gặp lỗi permission

### Thực Hiện Nhập Điều Tra Dân Số

#### Cách 1: Sử dụng \copy (Chỉ Hoạt Động Trong psql Command Line)

**Quan Trọng:** `\copy` chỉ hoạt động trong **psql command line**, KHÔNG hoạt động trong SQL query interface như pgAdmin Query Tool.

Nếu bạn đang sử dụng **psql** từ terminal/command line:

```bash
psql -d your_database_name
```

Sau đó trong psql:

```sql
\copy us_counties_2010 FROM '/home/nhanle/Documents/us_counties_2010.csv' WITH (FORMAT CSV, HEADER);
```

**Lưu Ý Quan Trọng:** 
- `\copy` **KHÔNG có dấu chấm phẩy** ở cuối (đây là lệnh psql meta-command, không phải SQL)
- **KHÔNG hoạt động** trong pgAdmin Query Tool hoặc các SQL interface khác
- Đường dẫn phải là đường dẫn tuyệt đối hoặc tương đối từ thư mục hiện tại
- Hoạt động với bất kỳ tệp nào bạn có quyền đọc

#### Cách 2: Sử dụng COPY (Server-Side) - Sửa Lỗi Permission Denied

Nếu bạn đang sử dụng **pgAdmin Query Tool** hoặc SQL interface khác, bạn cần sửa quyền truy cập tệp:

**Bước 1: Tìm user PostgreSQL**
```bash
ps aux | grep postgres
# Hoặc
sudo -u postgres psql -c "SELECT current_user;"
```

**Bước 2: Cấp quyền đọc cho user PostgreSQL (thường là `postgres`)**

```bash
# Kiểm tra quyền hiện tại
ls -l /home/nhanle/Documents/us_counties_2010.csv

# Cấp quyền đọc cho user postgres (thay 'postgres' bằng user PostgreSQL của bạn)
sudo chmod 644 /home/nhanle/Documents/us_counties_2010.csv
sudo chown postgres:postgres /home/nhanle/Documents/us_counties_2010.csv

# Hoặc di chuyển tệp đến thư mục mà PostgreSQL có quyền truy cập
sudo cp /home/nhanle/Documents/us_counties_2010.csv /tmp/us_counties_2010.csv
sudo chmod 644 /tmp/us_counties_2010.csv
sudo chown postgres:postgres /tmp/us_counties_2010.csv
```

**Bước 3: Sử dụng COPY với đường dẫn đã sửa**

Nếu bạn đã di chuyển tệp sang `/tmp`:
```sql
COPY us_counties_2010
FROM '/tmp/us_counties_2010.csv'
WITH (FORMAT CSV, HEADER);
```

Hoặc nếu bạn đã cấp quyền cho tệp gốc:
```sql
COPY us_counties_2010
FROM '/home/nhanle/Documents/us_counties_2010.csv'
WITH (FORMAT CSV, HEADER);
```

**Lưu Ý:** 
- COPY yêu cầu đường dẫn trên máy server, không phải máy client
- Tệp phải có quyền đọc cho user PostgreSQL (thường là `postgres`)
- Nếu vẫn gặp lỗi permission, hãy sử dụng **Cách 3: pgAdmin Import Wizard** (dễ nhất)

#### Cách 3: Sử dụng pgAdmin Import Wizard (Khuyến Nghị Nếu Gặp Lỗi Permission)

Đây là cách **dễ nhất** nếu bạn đang sử dụng pgAdmin và gặp lỗi permission:

1. Trong pgAdmin, click chuột phải vào bảng `us_counties_2010`
2. Chọn **Import/Export Data...**
3. Chọn tab **Import**
4. Click vào **...** bên cạnh Filename và chọn file CSV của bạn
5. Chọn Format: **csv**
6. Bật **Header** nếu file có header
7. Click **OK**

pgAdmin Import Wizard sẽ tự động xử lý việc đọc file từ máy client của bạn mà không cần quyền server-side.

**Thông Báo Thành Công:**
```
Query returned successfully: 3143 rows affected
```

**Xử Lý Lỗi:** Nếu bạn gặp vấn đề với CSV nguồn hoặc câu lệnh nhập của bạn, cơ sở dữ liệu sẽ đưa ra lỗi. Ví dụ:
```
ERROR: extra data after last expected column
SQL state: 22P04
Context: COPY us_counties_2010, line 2: "Autauga County,AL,050,3,6,01,001 ..."
```

**Xác Minh:** Ngay cả khi không có lỗi được báo cáo, luôn là ý tưởng tốt để quét trực quan dữ liệu bạn vừa nhập:

```sql
SELECT * FROM us_counties_2010;
```

Nên có 3,143 hàng được hiển thị trong pgAdmin. Bạn cũng có thể xác minh các cột cụ thể:

```sql
SELECT geo_name, state_us_abbreviation, area_land
FROM us_counties_2010
ORDER BY area_land DESC
LIMIT 3;
```

## Nhập Tập Hợp Con Các Cột Với COPY

Nếu tệp CSV không có dữ liệu cho tất cả các cột trong bảng cơ sở dữ liệu đích của bạn, bạn vẫn có thể nhập dữ liệu bạn có bằng cách chỉ định các cột nào có mặt trong dữ liệu.

### Ví Dụ Tình Huống

Bạn tạo một bảng có tên `supervisor_salaries`:

```sql
CREATE TABLE supervisor_salaries (
    town varchar(30),
    county varchar(30),
    supervisor varchar(30),
    start_date date,
    salary money,
    benefits money
);
```

Nhưng tệp CSV chỉ chứa các cột `town`, `supervisor`, và `salary`.

### Giải Pháp: Chỉ Định Các Cột

**Sử dụng \copy (Khuyến Nghị):**
```sql
\copy supervisor_salaries (town, supervisor, salary) FROM '/path/to/supervisor_salaries.csv' WITH (FORMAT CSV, HEADER);
```

**Hoặc sử dụng COPY (Server-Side):**
```sql
COPY supervisor_salaries (town, supervisor, salary)
FROM 'C:\YourDirectory\supervisor_salaries.csv'
WITH (FORMAT CSV, HEADER);
```

Bằng cách ghi chú trong ngoặc đơn ba cột hiện có sau tên bảng, chúng ta cho PostgreSQL biết chỉ tìm dữ liệu để điền những cột đó khi nó đọc CSV. Các cột khác sẽ vẫn là NULL.

## Thêm Giá Trị Mặc Định Vào Cột Trong Quá Trình Nhập

Nếu bạn muốn điền một cột trong quá trình nhập, ngay cả khi giá trị thiếu trong tệp CSV thì sao? Bạn có thể làm điều đó bằng cách sử dụng một **bảng tạm thời**.

### Bảng Tạm Thời

Bảng tạm thời chỉ tồn tại cho đến khi bạn kết thúc phiên cơ sở dữ liệu của mình. Khi bạn mở lại cơ sở dữ liệu (hoặc mất kết nối), những bảng đó biến mất. Chúng hữu ích cho việc thực hiện các thao tác trung gian trên dữ liệu như một phần của quy trình xử lý của bạn.

### Ví Dụ: Thêm Tên Quận

```sql
-- Bước 1: Xóa dữ liệu hiện có
DELETE FROM supervisor_salaries;

-- Bước 2: Tạo bảng tạm thời
CREATE TEMPORARY TABLE supervisor_salaries_temp (LIKE supervisor_salaries);

-- Bước 3: Nhập vào bảng tạm thời
-- Sử dụng \copy nếu gặp lỗi permission:
\copy supervisor_salaries_temp (town, supervisor, salary) FROM '/path/to/supervisor_salaries.csv' WITH (FORMAT CSV, HEADER);
-- Hoặc COPY nếu có quyền server-side:
-- COPY supervisor_salaries_temp (town, supervisor, salary)
-- FROM 'C:\YourDirectory\supervisor_salaries.csv'
-- WITH (FORMAT CSV, HEADER);

-- Bước 4: Chèn vào bảng chính với giá trị mặc định
INSERT INTO supervisor_salaries (town, county, supervisor, salary)
SELECT town, 'Some County', supervisor, salary
FROM supervisor_salaries_temp;

-- Bước 5: Xóa bảng tạm thời
DROP TABLE supervisor_salaries_temp;
```

**Cách Hoạt Động:**
1. Tạo bảng tạm thời dựa trên bảng gốc bằng cách sử dụng `LIKE`
2. Nhập tệp CSV vào bảng tạm thời
3. Sử dụng câu lệnh INSERT với SELECT để điền bảng chính, chỉ định giá trị mặc định (như 'Some County') cho cột thiếu
4. Xóa bảng tạm thời (nó sẽ tự động biến mất khi bạn ngắt kết nối, nhưng thực hành tốt là xóa nó)

**Kết Quả:** Trường county được điền bằng giá trị mặc định 'Some County' cho tất cả các hàng.

## Sử Dụng COPY Để Xuất Dữ Liệu

Sự khác biệt chính giữa xuất và nhập dữ liệu với COPY là thay vì sử dụng `FROM` để xác định dữ liệu nguồn, bạn sử dụng `TO` cho đường dẫn và tên của tệp đầu ra. Bạn kiểm soát lượng dữ liệu cần xuất—toàn bộ bảng, chỉ một vài cột, hoặc để tinh chỉnh nó nhiều hơn, kết quả của truy vấn.

### Xuất Tất Cả Dữ Liệu

Xuất đơn giản nhất gửi mọi thứ trong bảng đến tệp:

```sql
COPY us_counties_2010
TO 'C:\YourDirectory\us_counties_export.txt'
WITH (FORMAT CSV, HEADER, DELIMITER '|');
```

**Lưu Ý:** Tôi đã sử dụng phần mở rộng tệp `.txt` ở đây vì hai lý do:
1. Nó chứng minh rằng bạn có thể xuất sang bất kỳ định dạng tệp văn bản nào
2. Chúng ta đang sử dụng dấu ống làm ký tự phân cách, không phải dấu phẩy. Thực hành tốt là tránh gọi tệp là `.csv` trừ khi chúng thực sự có dấu phẩy làm dấu phân cách.

### Xuất Các Cột Cụ Thể

Bạn không phải lúc nào cũng cần (hoặc muốn) xuất tất cả dữ liệu của mình. Bạn có thể có thông tin nhạy cảm cần được giữ riêng tư, hoặc bạn có thể chỉ cần các cột cụ thể cho công việc của mình.

```sql
COPY us_counties_2010 (geo_name, internal_point_lat, internal_point_lon)
TO 'C:\YourDirectory\us_counties_latlon_export.txt'
WITH (FORMAT CSV, HEADER, DELIMITER '|');
```

Bằng cách liệt kê các cột trong ngoặc đơn sau tên bảng, chúng ta chỉ xuất những cột đó. Bạn phải nhập các tên cột này chính xác như chúng được liệt kê trong dữ liệu để PostgreSQL nhận ra chúng.

### Xuất Kết Quả Truy Vấn

Ngoài ra, bạn có thể thêm truy vấn vào COPY để tinh chỉnh đầu ra của mình:

```sql
COPY (
    SELECT geo_name, state_us_abbreviation
    FROM us_counties_2010
    WHERE geo_name ILIKE '%mill%'
)
TO 'C:\YourDirectory\us_counties_mill_export.txt'
WITH (FORMAT CSV, HEADER, DELIMITER '|');
```

Điều này chỉ xuất các quận có tên chứa các chữ cái "mill" (không phân biệt chữ hoa chữ thường), sử dụng toán tử `ILIKE` và ký tự đại diện `%`.

## Nhập và Xuất Qua pgAdmin

Đôi khi, các lệnh COPY SQL sẽ không thể xử lý một số lần nhập và xuất nhất định, thường là khi bạn được kết nối với một phiên bản PostgreSQL đang chạy trên máy tính khác của bạn, có thể ở nơi khác trên mạng. Khi điều đó xảy ra, bạn có thể không có quyền truy cập vào hệ thống tệp của máy tính đó, điều này làm cho việc đặt đường dẫn trong mệnh đề FROM hoặc TO trở nên khó khăn.

### Sử Dụng Trình Hướng Dẫn Nhập/Xuất Của pgAdmin

Một giải pháp là sử dụng trình hướng dẫn nhập/xuất tích hợp của pgAdmin.

**Các Bước:**

1. **Định vị bảng:** Trong trình duyệt đối tượng của pgAdmin (ngăn dọc bên trái), định vị danh sách các bảng trong cơ sở dữ liệu analysis của bạn bằng cách chọn Databases → analysis → Schemas → public → Tables

2. **Mở Nhập/Xuất:** Nhấp chuột phải vào bảng bạn muốn nhập vào hoặc xuất từ, và chọn **Import/Export**

3. **Cấu Hình Nhập:**
   - Di chuyển thanh trượt Import/Export sang **Import**
   - Nhấp vào ba chấm bên phải hộp Filename để định vị tệp CSV của bạn
   - Từ danh sách thả xuống Format, chọn **csv**
   - Điều chỉnh tiêu đề, ký tự phân cách, trích dẫn và các tùy chọn khác khi cần
   - Nhấp **OK** để nhập dữ liệu

4. **Cấu Hình Xuất:**
   - Sử dụng cùng hộp thoại
   - Di chuyển thanh trượt sang **Export**
   - Làm theo các bước tương tự để cấu hình xuất

## Tóm Tắt

Bây giờ bạn đã học cách đưa dữ liệu bên ngoài vào cơ sở dữ liệu của mình, bạn có thể bắt đầu khám phá vô số tập dữ liệu, cho dù bạn muốn khám phá một trong hàng nghìn tập dữ liệu có sẵn công khai, hoặc dữ liệu liên quan đến sự nghiệp hoặc nghiên cứu của riêng bạn. Rất nhiều dữ liệu có sẵn ở định dạng CSV hoặc định dạng dễ dàng chuyển đổi sang CSV. Tìm từ điển dữ liệu để giúp bạn hiểu dữ liệu và chọn kiểu dữ liệu phù hợp cho mỗi trường.

### Các Khái Niệm Chính Đã Học

- **Tệp văn bản có phân cách** - Định dạng phổ biến cho trao đổi dữ liệu
- **Tệp CSV** - Giá trị được phân tách bằng dấu phẩy (phổ biến nhất)
- **Text qualifiers** - Ký tự bọc các giá trị chứa ký tự phân cách
- **Hàng tiêu đề** - Tên cột ở đầu tệp
- **Lệnh COPY** - Công cụ nhập/xuất hàng loạt của PostgreSQL
- **Bảng tạm thời** - Bảng chỉ tồn tại cho phiên
- **Nhập tập hợp con cột** - Chỉ nhập các cột cụ thể
- **Giá trị mặc định** - Thêm giá trị trong quá trình nhập bằng bảng tạm thời
- **Xuất dựa trên truy vấn** - Xuất kết quả truy vấn đã lọc

### Thực Hành Tốt

1. Luôn kiểm tra từ điển dữ liệu khi có sẵn
2. Sử dụng kiểu dữ liệu phù hợp dựa trên từ điển dữ liệu
3. Bảo tồn số không đứng đầu bằng cách sử dụng varchar cho mã
4. Sử dụng bigint cho số rất lớn
5. Xác minh nhập bằng cách kiểm tra số hàng và dữ liệu mẫu
6. Sử dụng bảng tạm thời cho các chuyển đổi nhập phức tạp
7. Chỉ định cột một cách rõ ràng khi nhập tập hợp con
8. Sử dụng tùy chọn HEADER để loại trừ hàng tiêu đề khi nhập
9. Sử dụng tùy chọn HEADER để bao gồm hàng tiêu đề khi xuất
10. Chọn phần mở rộng tệp phù hợp dựa trên ký tự phân cách được sử dụng

## Bước Tiếp Theo

Dữ liệu điều tra dân số bạn đã nhập như một phần của các bài tập trong chương này sẽ đóng vai trò chính trong chương tiếp theo, nơi chúng ta khám phá các hàm toán học với SQL.
