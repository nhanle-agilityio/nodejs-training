# Chương 3: Hiểu Về Kiểu Dữ Liệu

## Giới Thiệu

Bất cứ khi nào bạn khám phá một cơ sở dữ liệu mới, việc kiểm tra kiểu dữ liệu được chỉ định cho mỗi cột trong mỗi bảng là rất quan trọng. Nếu may mắn, bạn có thể có được một từ điển dữ liệu: một tài liệu liệt kê mỗi cột, chỉ định xem nó là số, ký tự hay kiểu khác, và giải thích các giá trị cột. Thật không may, nhiều tổ chức không tạo và duy trì tài liệu tốt, vì vậy không có gì bất thường khi nghe, "Chúng tôi không có từ điển dữ liệu." Trong trường hợp đó, hãy cố gắng học bằng cách kiểm tra cấu trúc bảng trong pgAdmin.

Việc hiểu về kiểu dữ liệu là quan trọng vì lưu trữ dữ liệu ở định dạng phù hợp là điều cơ bản để xây dựng cơ sở dữ liệu có thể sử dụng và thực hiện phân tích chính xác. Ngoài ra, kiểu dữ liệu là một khái niệm lập trình áp dụng cho nhiều hơn chỉ SQL. Các khái niệm bạn sẽ khám phá trong chương này sẽ chuyển giao tốt sang các ngôn ngữ bổ sung mà bạn có thể muốn học.

## Cơ Bản Về Kiểu Dữ Liệu

Trong cơ sở dữ liệu SQL, mỗi cột trong bảng có thể chứa một và chỉ một kiểu dữ liệu, được định nghĩa trong câu lệnh CREATE TABLE. Bạn khai báo kiểu dữ liệu sau khi đặt tên cột.

### Ví Dụ Định Nghĩa Bảng

```sql
CREATE TABLE eagle_watch (
    observed_date date,
    eagles_seen integer
);
```

Trong bảng này có tên `eagle_watch` (cho kiểm kê hàng năm về đại bàng hói), cột `observed_date` được khai báo để chứa giá trị ngày tháng bằng cách thêm khai báo kiểu `date` sau tên của nó. Tương tự, `eagles_seen` được đặt để chứa số nguyên với khai báo kiểu `integer`.

### Ba Danh Mục Chính

Các kiểu dữ liệu này nằm trong ba danh mục bạn sẽ gặp nhiều nhất:
- **Ký tự** - Bất kỳ ký tự hoặc ký hiệu nào
- **Số** - Bao gồm số nguyên và phân số
- **Ngày tháng và thời gian** - Các kiểu chứa thông tin thời gian

## Kiểu Dữ Liệu Ký Tự

Các kiểu chuỗi ký tự là các kiểu đa mục đích phù hợp cho bất kỳ kết hợp nào của văn bản, số và ký hiệu. Các kiểu ký tự bao gồm:

### char(n)

Một cột có độ dài cố định trong đó độ dài ký tự được chỉ định bởi `n`. Một cột được đặt ở `char(20)` lưu trữ 20 ký tự mỗi hàng bất kể bạn chèn bao nhiêu ký tự. Nếu bạn chèn ít hơn 20 ký tự trong bất kỳ hàng nào, PostgreSQL sẽ đệm phần còn lại của cột đó bằng khoảng trắng.

**Đặc Điểm:**
- Một phần của tiêu chuẩn SQL
- Cũng có thể được chỉ định với tên dài hơn `character(n)`
- Hiện nay ít được sử dụng
- Chủ yếu là di tích của các hệ thống máy tính cũ
- Có thể tiêu thụ nhiều không gian lưu trữ hơn cần thiết

**Ví Dụ:**
```sql
CREATE TABLE example (
    code char(2)  -- Cho mã bưu chính tiểu bang Hoa Kỳ
);
```

### varchar(n)

Một cột có độ dài thay đổi trong đó độ dài tối đa được chỉ định bởi `n`. Nếu bạn chèn ít ký tự hơn mức tối đa, PostgreSQL sẽ không lưu trữ các khoảng trắng thừa. Ví dụ, chuỗi "blue" sẽ chiếm bốn khoảng trắng, trong khi chuỗi "123" sẽ chiếm ba. Trong các cơ sở dữ liệu lớn, thực hành này tiết kiệm đáng kể không gian.

**Đặc Điểm:**
- Được bao gồm trong tiêu chuẩn SQL
- Cũng có thể được chỉ định bằng tên dài hơn `character varying(n)`
- Linh hoạt và tiết kiệm không gian hơn `char(n)`
- Được khuyến nghị cho hầu hết các cột văn bản

**Ví Dụ:**
```sql
CREATE TABLE example (
    name varchar(100),
    description varchar(500)
);
```

### text

Một cột có độ dài thay đổi không giới hạn. Theo tài liệu PostgreSQL, chuỗi ký tự dài nhất có thể bạn có thể lưu trữ là khoảng 1 gigabyte.

**Đặc Điểm:**
- Không phải một phần của tiêu chuẩn SQL
- Các triển khai tương tự trong các hệ thống cơ sở dữ liệu khác (Microsoft SQL Server, MySQL)
- Tùy chọn linh hoạt nhất
- Không cần chỉ định độ dài tối đa

**Ví Dụ:**
```sql
CREATE TABLE example (
    notes text,
    description text
);
```

### Cân Nhắc Hiệu Suất

Theo tài liệu PostgreSQL, không có sự khác biệt đáng kể về hiệu suất giữa ba kiểu (`char`, `varchar`, `text`). Điều đó có thể khác nếu bạn đang sử dụng trình quản lý cơ sở dữ liệu khác, vì vậy thông minh là kiểm tra tài liệu. Tính linh hoạt và tiết kiệm không gian tiềm năng của `varchar` và `text` dường như mang lại cho chúng lợi thế.

**Thực Hành Tốt:** Thông thường, sử dụng `varchar` với giá trị `n` đủ để xử lý các giá trị ngoại lai là một chiến lược vững chắc. Đối với các cột sẽ luôn có cùng số ký tự (như mã bưu chính tiểu bang Hoa Kỳ), `char(2)` có thể là cách tốt để báo hiệu dữ liệu nó nên chứa.

## Kiểu Dữ Liệu Số

Các cột số chứa các loại số khác nhau, nhưng đó không phải là tất cả: chúng cũng cho phép bạn thực hiện các phép tính trên những số đó. Đó là một sự khác biệt quan trọng so với các số bạn lưu trữ dưới dạng chuỗi trong cột ký tự, không thể cộng, nhân, chia hoặc thực hiện bất kỳ phép toán nào khác.

Ngoài ra, các số được lưu trữ dưới dạng ký tự sắp xếp khác với các số được lưu trữ dưới dạng số, sắp xếp theo thứ tự văn bản thay vì thứ tự số. Vì vậy, nếu bạn đang làm toán hoặc thứ tự số là quan trọng, hãy sử dụng kiểu số.

Các kiểu số SQL bao gồm:
- **Số nguyên** - Số nguyên, cả dương và âm
- **Điểm cố định và điểm nổi** - Hai định dạng của phân số của số nguyên

## Kiểu Dữ Liệu Số Nguyên

Các kiểu dữ liệu số nguyên là các kiểu số phổ biến nhất bạn sẽ tìm thấy khi khám phá dữ liệu trong cơ sở dữ liệu SQL. Hãy nghĩ về tất cả những nơi số nguyên xuất hiện trong cuộc sống: số đường phố hoặc căn hộ của bạn, số seri trên tủ lạnh của bạn, số trên vé xổ số. Đây là các số nguyên, cả dương và âm, bao gồm cả số không.

### Các Kiểu Số Nguyên Chuẩn

Tiêu chuẩn SQL cung cấp ba kiểu số nguyên: `smallint`, `integer`, và `bigint`. Sự khác biệt giữa ba kiểu là kích thước tối đa của các số mà chúng có thể chứa.

| Kiểu Dữ Liệu | Kích Thước Lưu Trữ | Phạm Vi |
|--------------|-------------------|---------|
| `smallint` | 2 bytes | -32,768 đến +32,767 |
| `integer` | 4 bytes | -2,147,483,648 đến +2,147,483,647 |
| `bigint` | 8 bytes | -9,223,372,036,854,775,808 đến +9,223,372,036,854,775,807 |

### Chọn Kiểu Số Nguyên

**bigint:**
- Mặc dù nó tiêu tốn nhiều lưu trữ nhất, `bigint` sẽ bao phủ hầu hết mọi yêu cầu bạn sẽ có với cột số
- Việc sử dụng nó là bắt buộc nếu bạn đang làm việc với các số lớn hơn khoảng 2,1 tỷ
- Bạn có thể dễ dàng làm cho nó trở thành mặc định của bạn và không bao giờ lo lắng

**integer:**
- Nếu bạn tự tin rằng các số sẽ vẫn nằm trong giới hạn số nguyên, kiểu đó là lựa chọn tốt
- Nó không tiêu thụ nhiều không gian như `bigint` (một mối quan tâm khi xử lý hàng triệu hàng dữ liệu)

**smallint:**
- Khi các giá trị dữ liệu sẽ vẫn bị ràng buộc, `smallint` có ý nghĩa
- Các ngày trong tháng hoặc năm là ví dụ tốt
- Kiểu `smallint` sẽ sử dụng một nửa lưu trữ như `integer`
- Đó là quyết định thiết kế cơ sở dữ liệu thông minh nếu các giá trị cột sẽ luôn vừa trong phạm vi của nó

**Quan Trọng:** Nếu bạn cố gắng chèn một số vào bất kỳ cột nào trong số này nằm ngoài phạm vi của nó, cơ sở dữ liệu sẽ dừng thao tác và trả về lỗi ngoài phạm vi.

## Số Nguyên Tự Động Tăng (Kiểu Serial)

Trong Chương 1, khi bạn tạo bảng teachers, bạn đã tạo cột `id` với khai báo `bigserial`. Điều này và các anh em của nó `smallserial` và `serial` không phải là kiểu dữ liệu thực sự mà là một triển khai đặc biệt của các kiểu `smallint`, `integer`, và `bigint` tương ứng.

Khi bạn thêm cột với kiểu serial, PostgreSQL sẽ tự động tăng giá trị trong cột mỗi khi bạn chèn hàng, bắt đầu từ 1, lên đến tối đa của mỗi kiểu số nguyên.

### Các Kiểu Serial

Các kiểu serial là triển khai của tiêu chuẩn ANSI SQL cho các cột danh tính được đánh số tự động. Mỗi trình quản lý cơ sở dữ liệu triển khai chúng theo cách riêng. Ví dụ, Microsoft SQL Server sử dụng từ khóa `IDENTITY` để đặt cột tự động tăng.

| Kiểu Dữ Liệu | Kích Thước Lưu Trữ | Phạm Vi |
|--------------|-------------------|---------|
| `smallserial` | 2 bytes | 1 đến 32,767 |
| `serial` | 4 bytes | 1 đến 2,147,483,647 |
| `bigserial` | 8 bytes | 1 đến 9,223,372,036,854,775,807 |

### Sử Dụng Kiểu Serial

Để sử dụng kiểu serial trên cột, khai báo nó trong câu lệnh CREATE TABLE như bạn sẽ làm với kiểu số nguyên:

```sql
CREATE TABLE people (
    id serial,
    person_name varchar(100)
);
```

Mỗi khi một `person_name` mới được thêm vào bảng, cột `id` sẽ tăng lên 1.

**Trường Hợp Sử Dụng Phổ Biến:** Các nhà tạo cơ sở dữ liệu thường sử dụng kiểu serial để tạo số ID duy nhất, còn được gọi là khóa, cho mỗi hàng trong bảng. Mỗi hàng sau đó có ID riêng mà các bảng khác trong cơ sở dữ liệu có thể tham chiếu. Vì cột tự động tăng, bạn không cần chèn số vào cột đó khi thêm dữ liệu; PostgreSQL xử lý điều đó cho bạn.

**Lưu Ý Quan Trọng:** Mặc dù cột với kiểu serial tự động tăng mỗi khi hàng được thêm, một số tình huống sẽ tạo khoảng trống trong chuỗi số trong cột. Nếu một hàng bị xóa, ví dụ, giá trị trong hàng đó không bao giờ được thay thế. Hoặc, nếu việc chèn hàng bị hủy bỏ, chuỗi cho cột vẫn sẽ được tăng.

## Số Thập Phân

Ngược lại với số nguyên, số thập phân biểu diễn một số nguyên cộng với một phân số của số nguyên; phân số được biểu diễn bởi các chữ số theo sau dấu thập phân. Trong cơ sở dữ liệu SQL, chúng được xử lý bởi các kiểu dữ liệu điểm cố định và điểm nổi.

### Số Điểm Cố Định

Kiểu điểm cố định, còn được gọi là kiểu độ chính xác tùy ý, là `numeric(precision,scale)`. Bạn cung cấp đối số `precision` như số chữ số tối đa ở bên trái và bên phải của dấu thập phân, và đối số `scale` như số chữ số cho phép ở bên phải của dấu thập phân.

**Tên Thay Thế:** Bạn cũng có thể chỉ định kiểu này bằng cách sử dụng `decimal(precision,scale)`. Cả hai đều là một phần của tiêu chuẩn ANSI SQL.

**Chi Tiết Quan Trọng:**
- Nếu bạn bỏ qua việc chỉ định giá trị scale, scale sẽ được đặt thành không; trên thực tế, điều đó tạo ra một số nguyên
- Nếu bạn bỏ qua việc chỉ định precision và scale, cơ sở dữ liệu sẽ lưu trữ các giá trị có độ chính xác và scale bất kỳ lên đến mức tối đa được phép
- Tối đa: lên đến 131,072 chữ số trước dấu thập phân và 16,383 chữ số sau dấu thập phân

**Ví Dụ:** Để ghi lại lượng mưa trong cơ sở dữ liệu sử dụng tổng cộng năm chữ số (precision) và tối đa hai chữ số ở bên phải của dấu thập phân (scale), bạn sẽ chỉ định nó là `numeric(5,2)`. Cơ sở dữ liệu sẽ luôn trả về hai chữ số ở bên phải của dấu thập phân, ngay cả khi bạn không nhập số chứa hai chữ số. Ví dụ: 1.47, 1.00, và 121.50.

### Kiểu Điểm Nổi

Hai kiểu điểm nổi là `real` và `double precision`. Sự khác biệt giữa hai kiểu là lượng dữ liệu chúng lưu trữ.

**Đặc Điểm:**
- Kiểu `real` cho phép độ chính xác đến sáu chữ số thập phân
- Kiểu `double precision` cho phép độ chính xác đến 15 chữ số thập phân
- Cả hai đều bao gồm số chữ số ở cả hai bên của dấu chấm
- Các kiểu điểm nổi này còn được gọi là kiểu độ chính xác thay đổi
- Cơ sở dữ liệu lưu trữ số trong các phần đại diện cho các chữ số và một số mũ—vị trí nơi dấu thập phân thuộc về
- Không giống như `numeric`, nơi chúng ta chỉ định precision và scale cố định, dấu thập phân trong một cột nhất định có thể "nổi" tùy thuộc vào số

### So Sánh: Điểm Cố Định vs Điểm Nổi

| Kiểu Dữ Liệu | Kích Thước Lưu Trữ | Loại Lưu Trữ | Phạm Vi |
|--------------|-------------------|--------------|---------|
| `numeric`, `decimal` | biến đổi | Điểm cố định | Lên đến 131,072 chữ số trước dấu thập phân; lên đến 16,383 chữ số sau |
| `real` | 4 bytes | Điểm nổi | Độ chính xác 6 chữ số thập phân |
| `double precision` | 8 bytes | Điểm nổi | Độ chính xác 15 chữ số thập phân |

### Ví Dụ: Các Kiểu Số Trong Hành Động

```sql
CREATE TABLE number_data_types (
    numeric_column numeric(20,5),
    real_column real,
    double_column double precision
);

INSERT INTO number_data_types
VALUES
(.7, .7, .7),
(2.13579, 2.13579, 2.13579),
(2.1357987654, 2.1357987654, 2.1357987654);

SELECT * FROM number_data_types;
```

**Kết Quả:**
- Cột `numeric`, được đặt với scale là năm, lưu trữ năm chữ số sau dấu thập phân bất kể bạn có chèn nhiều hay không. Nếu ít hơn năm, nó đệm phần còn lại bằng số không. Nếu nhiều hơn năm, nó làm tròn chúng.
- Các cột `real` và `double precision` chỉ lưu trữ số chữ số hiện có mà không đệm. Số được làm tròn khi chèn vào cột `real` vì kiểu đó có tối đa sáu chữ số độ chính xác. Cột `double precision` có thể chứa lên đến 15 chữ số, vì vậy nó lưu trữ toàn bộ số.

### Vấn Đề Với Toán Điểm Nổi

Nếu bạn đang nghĩ, "Chà, các số được lưu trữ dưới dạng điểm nổi trông giống như các số được lưu trữ dưới dạng cố định," hãy thận trọng. Cách máy tính lưu trữ số điểm nổi có thể dẫn đến lỗi toán học không mong muốn.

**Ví Dụ:**
```sql
SELECT
    numeric_column * 10000000 AS "Fixed",
    real_column * 10000000 AS "Float"
FROM number_data_types
WHERE numeric_column = .7;
```

**Kết Quả Mong Đợi:** Cả hai nên bằng 7,000,000

**Kết Quả Thực Tế:**
- Fixed: 7000000.00000
- Float: 6999999.88079071

Không có gì ngạc nhiên khi các kiểu điểm nổi được gọi là "không chính xác." Lý do toán điểm nổi tạo ra lỗi như vậy là máy tính cố gắng ép nhiều thông tin vào một số bit hữu hạn.

**Cân Nhắc Lưu Trữ:** Lưu trữ được yêu cầu bởi kiểu dữ liệu `numeric` là biến đổi, và tùy thuộc vào precision và scale được chỉ định, `numeric` có thể tiêu thụ đáng kể nhiều không gian hơn các kiểu điểm nổi. Nếu bạn đang làm việc với hàng triệu hàng, đáng để cân nhắc xem bạn có thể sống với toán điểm nổi tương đối không chính xác không.

### Chọn Kiểu Dữ Liệu Số Của Bạn

Đây là ba hướng dẫn cần cân nhắc khi xử lý các kiểu dữ liệu số:

1. **Sử dụng số nguyên khi có thể.** Trừ khi dữ liệu của bạn sử dụng số thập phân, hãy gắn bó với các kiểu số nguyên.

2. **Nếu bạn đang làm việc với dữ liệu thập phân và cần các phép tính chính xác** (xử lý tiền, ví dụ), hãy chọn `numeric` hoặc tương đương của nó, `decimal`. Các kiểu float sẽ tiết kiệm không gian, nhưng sự không chính xác của toán điểm nổi sẽ không vượt qua trong nhiều ứng dụng. Chỉ sử dụng chúng khi độ chính xác không quan trọng.

3. **Chọn kiểu số đủ lớn.** Trừ khi bạn đang thiết kế cơ sở dữ liệu để chứa hàng triệu hàng, hãy nghiêng về phía lớn hơn. Khi sử dụng `numeric` hoặc `decimal`, đặt precision đủ lớn để chứa số chữ số ở cả hai bên của dấu thập phân. Với số nguyên, sử dụng `bigint` trừ khi bạn hoàn toàn chắc chắn các giá trị cột sẽ bị ràng buộc để vừa vào các kiểu `integer` hoặc `smallint` nhỏ hơn.

## Ngày Tháng và Thời Gian

Bất cứ khi nào bạn nhập ngày vào biểu mẫu tìm kiếm, bạn đang gặt hái lợi ích của cơ sở dữ liệu có nhận thức về thời gian hiện tại (nhận từ máy chủ) cộng với khả năng xử lý định dạng cho ngày tháng, thời gian và các sắc thái của lịch, chẳng hạn như năm nhuận và múi giờ. Điều này là điều cần thiết cho việc kể chuyện với dữ liệu, vì vấn đề khi nào điều gì đó xảy ra thường là câu hỏi có giá trị như ai, cái gì, hoặc bao nhiêu người tham gia.

### Kiểu Dữ Liệu Ngày và Thời Gian

Hỗ trợ ngày và thời gian của PostgreSQL bao gồm bốn kiểu dữ liệu chính:

| Kiểu Dữ Liệu | Kích Thước Lưu Trữ | Mô Tả | Phạm Vi |
|--------------|-------------------|-------|---------|
| `timestamp` | 8 bytes | Ngày và thời gian | 4713 TCN đến 294276 SCN |
| `date` | 4 bytes | Ngày (không có thời gian) | 4713 TCN đến 5874897 SCN |
| `time` | 8 bytes | Thời gian (không có ngày) | 00:00:00 đến 24:00:00 |
| `interval` | 16 bytes | Khoảng thời gian | +/- 178,000,000 năm |

### timestamp

Ghi lại ngày và thời gian, hữu ích cho một loạt các tình huống bạn có thể theo dõi: khởi hành và đến của các chuyến bay hành khách, lịch trình của các trận đấu Major League Baseball, hoặc các sự cố dọc theo dòng thời gian.

**Cân Nhắc Múi Giờ:** Thông thường, bạn sẽ muốn thêm các từ khóa `with time zone` để đảm bảo rằng thời gian được ghi lại cho một sự kiện bao gồm múi giờ nơi nó xảy ra. Nếu không, các thời gian được ghi lại ở các nơi khác nhau trên thế giới trở nên không thể so sánh.

**Định Dạng:** Định dạng `timestamp with time zone` là một phần của tiêu chuẩn SQL; với PostgreSQL bạn có thể chỉ định cùng kiểu dữ liệu bằng cách sử dụng `timestamptz`.

### date

Chỉ ghi lại ngày.

### time

Chỉ ghi lại thời gian. Một lần nữa, bạn sẽ muốn thêm các từ khóa `with time zone`.

### interval

Chứa một giá trị đại diện cho một đơn vị thời gian được biểu diễn ở định dạng `số_lượng đơn_vị`. Nó không ghi lại điểm bắt đầu hoặc kết thúc của khoảng thời gian, chỉ độ dài của nó. Ví dụ bao gồm "12 ngày" hoặc "8 giờ".

**Trường Hợp Sử Dụng:** Bạn thường sẽ sử dụng kiểu này cho các phép tính hoặc lọc trên các cột ngày và thời gian khác.

### Ví Dụ: timestamp và interval Trong Hành Động

```sql
CREATE TABLE date_time_types (
    timestamp_column timestamp with time zone,
    interval_column interval
);

INSERT INTO date_time_types
VALUES
('2018-12-31 01:00 EST','2 days'),
('2018-12-31 01:00 -8','1 month'),
('2018-12-31 01:00 Australia/Melbourne','1 century'),
(now(),'1 week');

SELECT * FROM date_time_types;
```

**Định Dạng Múi Giờ:**
1. **Viết Tắt:** EST (Giờ Chuẩn Miền Đông)
2. **Độ Lệch UTC:** -8 (tám giờ sau UTC, múi giờ Thái Bình Dương)
3. **Tên Múi Giờ:** Australia/Melbourne (sử dụng các giá trị từ cơ sở dữ liệu múi giờ chuẩn)
4. **Hàm:** `now()` nắm bắt thời gian giao dịch hiện tại từ phần cứng của bạn

**Quan Trọng:** Mặc dù chúng ta đã cung cấp cùng ngày và thời gian trong ba hàng đầu tiên, đầu ra của mỗi hàng khác nhau. Lý do là pgAdmin báo cáo ngày và thời gian tương đối với múi giờ của bạn, được chỉ định bởi độ lệch UTC ở cuối mỗi timestamp.

### Sử Dụng Kiểu Dữ Liệu interval Trong Phép Tính

Kiểu dữ liệu interval hữu ích cho các phép tính dễ hiểu trên dữ liệu ngày và thời gian. Ví dụ, giả sử bạn có cột chứa ngày khách hàng ký hợp đồng. Sử dụng dữ liệu interval, bạn có thể thêm 90 ngày vào mỗi ngày hợp đồng để xác định khi nào cần theo dõi với khách hàng.

**Ví Dụ:**
```sql
SELECT
    timestamp_column,
    interval_column,
    timestamp_column - interval_column AS new_date
FROM date_time_types;
```

Điều này tạo ra một cột được tính toán có tên `new_date` chứa kết quả của `timestamp_column` trừ `interval_column`. Trong mỗi hàng, chúng ta trừ đơn vị thời gian được chỉ định bởi kiểu dữ liệu interval từ ngày.

**Lưu Ý:** Các cột được tính toán được gọi là biểu thức; chúng ta sẽ sử dụng kỹ thuật này thường xuyên.

## Các Kiểu Khác

Các kiểu ký tự, số và ngày/thời gian bạn đã học cho đến nay có thể sẽ bao gồm phần lớn công việc bạn làm với SQL. Nhưng PostgreSQL hỗ trợ nhiều kiểu bổ sung, bao gồm nhưng không giới hạn:

- **Boolean** - Lưu trữ giá trị `true` hoặc `false`
- **Kiểu hình học** - Bao gồm điểm, đường, hình tròn và các đối tượng hai chiều khác
- **Kiểu địa chỉ mạng** - Chẳng hạn như địa chỉ IP hoặc MAC
- **UUID** - Định danh Duy Nhất Toàn Cầu, đôi khi được sử dụng như giá trị khóa duy nhất trong bảng
- **XML và JSON** - Các kiểu dữ liệu lưu trữ thông tin ở các định dạng có cấu trúc đó

Các kiểu này sẽ được trình bày khi cần trong suốt cuốn sách.

## Chuyển Đổi Giá Trị Với CAST

Thỉnh thoảng, bạn có thể cần chuyển đổi giá trị từ kiểu dữ liệu được lưu trữ của nó sang kiểu khác; ví dụ, khi bạn truy xuất số dưới dạng ký tự để bạn có thể kết hợp nó với văn bản, hoặc khi bạn phải xử lý ngày được lưu trữ dưới dạng ký tự như kiểu ngày thực tế để bạn có thể sắp xếp nó theo thứ tự ngày hoặc thực hiện phép tính khoảng thời gian.

### Hàm CAST()

Bạn có thể thực hiện các chuyển đổi này bằng cách sử dụng hàm `CAST()`. Hàm `CAST()` chỉ thành công khi kiểu dữ liệu đích có thể chứa giá trị gốc.

**Quy Tắc:**
- Chuyển đổi số nguyên thành văn bản là có thể, vì các kiểu ký tự có thể bao gồm số
- Chuyển đổi văn bản có chữ cái trong bảng chữ cái thành số thì không

### Ví Dụ

```sql
-- Ví dụ 1: Chuyển đổi timestamp thành varchar
SELECT timestamp_column, CAST(timestamp_column AS varchar(10))
FROM date_time_types;
-- Chỉ trả về phân đoạn ngày (10 ký tự đầu tiên)

-- Ví dụ 2: Chuyển đổi numeric thành integer và varchar
SELECT numeric_column,
       CAST(numeric_column AS integer),
       CAST(numeric_column AS varchar(6))
FROM number_data_types;
-- Chuyển đổi integer làm tròn giá trị
-- Chuyển đổi varchar cắt ở ký tự thứ sáu

-- Ví dụ 3: Chuyển đổi không hợp lệ (sẽ lỗi)
SELECT CAST(char_column AS integer) FROM char_data_types;
-- Trả về lỗi: cú pháp đầu vào không hợp lệ cho số nguyên
```

### Ký Hiệu Tắt CAST

PostgreSQL cung cấp ký hiệu tắt ít rõ ràng hơn chiếm ít không gian hơn: dấu hai chấm đôi (`::`).

**Cú Pháp:**
```sql
-- CAST chuẩn
SELECT CAST(timestamp_column AS varchar(10))
FROM date_time_types;

-- Ký hiệu tắt
SELECT timestamp_column::varchar(10)
FROM date_time_types;
```

**Quan Trọng:** Sử dụng bất cứ thứ gì phù hợp với bạn, nhưng hãy nhận biết rằng dấu hai chấm đôi là triển khai chỉ dành cho PostgreSQL không được tìm thấy trong các biến thể SQL khác.

## Tóm Tắt

Bây giờ bạn đã được trang bị để hiểu rõ hơn về các sắc thái của định dạng dữ liệu bạn gặp phải khi khám phá cơ sở dữ liệu. Nếu bạn gặp các giá trị tiền tệ được lưu trữ dưới dạng số điểm nổi, bạn sẽ chắc chắn chuyển đổi chúng thành số thập phân trước khi thực hiện bất kỳ phép toán nào. Và bạn sẽ biết cách sử dụng loại cột văn bản phù hợp để giữ cho cơ sở dữ liệu của bạn không phát triển quá lớn.

### Các Khái Niệm Chính Đã Học

- **Kiểu Ký Tự:** `char(n)`, `varchar(n)`, `text`
- **Kiểu Số Nguyên:** `smallint`, `integer`, `bigint`
- **Kiểu Serial:** `smallserial`, `serial`, `bigserial` (tự động tăng)
- **Điểm Cố Định:** `numeric(precision,scale)`, `decimal(precision,scale)`
- **Điểm Nổi:** `real`, `double precision`
- **Kiểu Ngày/Thời Gian:** `timestamp`, `date`, `time`, `interval`
- **Chuyển Đổi Kiểu:** Hàm `CAST()` và ký hiệu tắt `::`

### Thực Hành Tốt

1. Sử dụng `varchar` với độ dài phù hợp cho hầu hết các cột văn bản
2. Sử dụng `bigint` làm mặc định cho số nguyên trừ khi không gian là quan trọng
3. Sử dụng `numeric`/`decimal` cho các phép tính thập phân chính xác (đặc biệt là tiền)
4. Tránh các kiểu điểm nổi khi độ chính xác quan trọng
5. Luôn sử dụng `timestamp with time zone` cho timestamps
6. Sử dụng kiểu `serial` cho các cột ID tự động tăng
7. Sử dụng `CAST()` hoặc `::` để chuyển đổi giữa các kiểu khi cần

## Bước Tiếp Theo

Tiếp theo, bạn sẽ tiếp tục với nền tảng SQL và học cách nhập dữ liệu bên ngoài vào cơ sở dữ liệu của bạn.
