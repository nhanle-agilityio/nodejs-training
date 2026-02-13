# Chương 7: Thiết Kế Bảng Dữ Liệu Hiệu Quả

## Giới Thiệu

Sự tỉ mỉ trong chi tiết có thể là một điều tốt. Khi bạn đang vội ra khỏi cửa, việc biết chắc chìa khóa của bạn sẽ được treo ở móc nơi bạn luôn để chúng là điều an tâm. Điều tương tự cũng đúng với thiết kế cơ sở dữ liệu. Khi bạn cần khai thác một mẩu thông tin từ hàng chục bảng và hàng triệu hàng, bạn sẽ đánh giá cao sự tỉ mỉ đó. Khi bạn tổ chức dữ liệu thành một tập hợp các bảng được điều chỉnh tốt và đặt tên thông minh, trải nghiệm phân tích sẽ trở nên dễ quản lý hơn.

Trong chương này, chúng ta sẽ xây dựng dựa trên Chương 6 bằng cách giới thiệu các thực hành tốt nhất để tổ chức và điều chỉnh cơ sở dữ liệu SQL, cho dù chúng là của bạn hay những cơ sở dữ liệu bạn kế thừa để phân tích. Bạn đã biết cách tạo các bảng cơ bản và thêm các cột với kiểu dữ liệu phù hợp và khóa chính. Bây giờ, chúng ta sẽ đi sâu hơn vào thiết kế bảng bằng cách khám phá các quy tắc và quy ước đặt tên, các cách để duy trì tính toàn vẹn của dữ liệu của bạn, và cách thêm chỉ mục vào bảng để tăng tốc truy vấn.

## Đặt Tên Bảng, Cột và Các Định Danh Khác

Các nhà phát triển có xu hướng tuân theo các mẫu phong cách SQL khác nhau khi đặt tên bảng, cột và các đối tượng khác (được gọi là định danh). Một số thích sử dụng camel case, như trong `berrySmoothie`, nơi các từ được nối với nhau và chữ cái đầu tiên của mỗi từ được viết hoa ngoại trừ từ đầu tiên. Pascal case, như trong `BerrySmoothie`, tuân theo một mẫu tương tự nhưng cũng viết hoa chữ cái đầu tiên của từ đầu tiên. Với snake case, như trong `berry_smoothie`, tất cả các từ đều viết thường và được phân tách bằng dấu gạch dưới. Cho đến nay, chúng ta đã sử dụng snake case trong hầu hết các ví dụ, chẳng hạn như trong bảng `us_counties_2010`.

Bạn sẽ tìm thấy những người ủng hộ nhiệt tình cho mỗi quy ước đặt tên, và một số sở thích được gắn với các ứng dụng cơ sở dữ liệu hoặc ngôn ngữ lập trình cụ thể. Ví dụ, Microsoft khuyến nghị Pascal case cho người dùng SQL Server của họ. Dù bạn chọn quy ước nào, điều quan trọng nhất là chọn một phong cách và áp dụng nó một cách nhất quán. Hãy đảm bảo kiểm tra xem tổ chức của bạn có hướng dẫn phong cách hay không hoặc đề xuất hợp tác tạo một cái, và sau đó tuân theo nó một cách nghiêm ngặt.

**Vấn Đề Với Đặt Tên Không Nhất Quán:**
Trộn lẫn các phong cách hoặc không tuân theo phong cách nào thường dẫn đến một mớ hỗn độn. Sẽ khó biết bảng nào là mới nhất, bảng nào là bản sao lưu, hoặc sự khác biệt giữa hai bảng có tên tương tự. Ví dụ, hãy tưởng tượng kết nối với một cơ sở dữ liệu và tìm thấy tập hợp các bảng sau:
- `Customers`
- `customers`
- `custBackup`
- `customer_analysis`
- `customer_test2`
- `customer_testMarch2012`
- `customeranalysis`

Ngoài ra, làm việc mà không có một sơ đồ đặt tên nhất quán làm cho người khác khó khăn khi tìm hiểu dữ liệu của bạn và làm cho bạn khó khăn khi tiếp tục công việc đã bỏ dở.

## Sử Dụng Dấu Ngoặc Kép Quanh Định Danh Để Cho Phép Chữ Hoa/Thường Hỗn Hợp

SQL ANSI chuẩn và nhiều biến thể SQL cụ thể cho cơ sở dữ liệu coi các định danh là không phân biệt chữ hoa/chữ thường trừ khi bạn cung cấp một dấu phân cách xung quanh chúng—thường là dấu ngoặc kép. Hãy xem xét hai câu lệnh CREATE TABLE giả định này cho PostgreSQL:

```sql
CREATE TABLE customers (
    customer_id serial,
    --snip--
);

CREATE TABLE Customers (
    customer_id serial,
    --snip--
);
```

Khi bạn thực thi các câu lệnh này theo thứ tự, lệnh CREATE TABLE đầu tiên tạo một bảng có tên `customers`. Nhưng thay vì tạo một bảng thứ hai có tên `Customers`, câu lệnh thứ hai sẽ ném ra lỗi: **relation "customers" already exists**. Vì bạn không đặt dấu ngoặc kép quanh định danh, PostgreSQL coi `customers` và `Customers` là cùng một định danh, bỏ qua chữ hoa/chữ thường.

Nếu bạn muốn giữ nguyên chữ hoa và tạo một bảng riêng có tên `Customers`, bạn phải đặt dấu ngoặc kép xung quanh định danh, như sau:

```sql
CREATE TABLE "Customers" (
    customer_id serial,
    --snip--
);
```

Bây giờ, PostgreSQL giữ nguyên chữ C viết hoa và tạo cả `Customers` và `customers`. Sau đó, để truy vấn `Customers` thay vì `customers`, bạn sẽ phải đặt dấu ngoặc kép quanh tên của nó trong câu lệnh SELECT:

```sql
SELECT * FROM "Customers";
```

Tất nhiên, bạn sẽ không muốn có hai bảng với tên tương tự như vậy vì rủi ro nhầm lẫn cao. Ví dụ này chỉ đơn giản minh họa hành vi của SQL trong PostgreSQL.

### Cạm Bẫy Khi Sử Dụng Dấu Ngoặc Kép Quanh Định Danh

Sử dụng dấu ngoặc kép cũng cho phép các ký tự không được phép khác trong một định danh, bao gồm cả khoảng trắng. Nhưng hãy lưu ý những mặt tiêu cực của phương pháp này: ví dụ, bạn có thể muốn đặt dấu ngoặc kép quanh `"trees planted"` và sử dụng nó làm tên cột trong cơ sở dữ liệu tái trồng rừng, nhưng sau đó tất cả người dùng sẽ phải cung cấp dấu ngoặc kép trong mọi tham chiếu tiếp theo đến cột đó. Bỏ qua dấu ngoặc kép và cơ sở dữ liệu sẽ phản hồi bằng lỗi, xác định `trees` và `planted` là các cột riêng biệt thiếu dấu phẩy giữa chúng. Một lựa chọn dễ đọc và đáng tin cậy hơn là sử dụng snake case, như trong `trees_planted`.

**Một nhược điểm khác của việc đặt dấu ngoặc kép** là nó cho phép bạn sử dụng các từ khóa dành riêng của SQL, chẳng hạn như `TABLE`, `WHERE`, hoặc `SELECT`, làm định danh. Từ khóa dành riêng là những từ mà SQL chỉ định là có ý nghĩa đặc biệt trong ngôn ngữ. Hầu hết các nhà phát triển cơ sở dữ liệu không thích sử dụng từ khóa dành riêng làm định danh. Ít nhất nó gây nhầm lẫn, và tệ nhất là bỏ qua hoặc quên đặt dấu ngoặc kép quanh từ khóa đó sau này sẽ dẫn đến lỗi vì cơ sở dữ liệu sẽ diễn giải từ đó như một lệnh thay vì một định danh.

**Lưu ý:** Đối với PostgreSQL, bạn có thể tìm thấy danh sách các từ khóa được tài liệu hóa tại https://www.postgresql.org/docs/current/static/sql-keywords-appendix.html. Ngoài ra, nhiều trình soạn thảo mã và công cụ cơ sở dữ liệu, bao gồm pgAdmin, sẽ tự động làm nổi bật các từ khóa bằng một màu cụ thể.

## Hướng Dẫn Đặt Tên Định Danh

Với gánh nặng bổ sung của việc đặt dấu ngoặc kép và các vấn đề tiềm ẩn của nó, tốt nhất là giữ tên định danh của bạn đơn giản, không có dấu ngoặc kép và nhất quán. Dưới đây là các khuyến nghị:

### Sử Dụng Snake Case

Snake case dễ đọc và đáng tin cậy, như được thể hiện trong ví dụ `trees_planted` trước đó. Nó được sử dụng trong toàn bộ tài liệu chính thức của PostgreSQL và giúp làm cho các tên nhiều từ dễ hiểu: `video_on_demand` có ý nghĩa hơn ngay từ cái nhìn đầu tiên so với `videoondemand`.

### Đặt Tên Dễ Hiểu

Tránh các chữ viết tắt khó hiểu. Nếu bạn đang xây dựng một cơ sở dữ liệu liên quan đến du lịch, `arrival_time` là một lời nhắc nhở tốt hơn về nội dung như một tên cột so với `arv_tm`.

### Đối Với Tên Bảng, Sử Dụng Số Nhiều

Bảng chứa các hàng, và mỗi hàng đại diện cho một thể hiện của một thực thể. Vì vậy, sử dụng tên số nhiều cho bảng, chẳng hạn như `teachers`, `vehicles`, hoặc `departments`.

### Lưu Ý Độ Dài

Số ký tự tối đa được phép cho tên định danh khác nhau tùy theo ứng dụng cơ sở dữ liệu:
- Tiêu chuẩn SQL là 128 ký tự
- PostgreSQL giới hạn bạn ở 63 ký tự
- Tối đa của hệ thống Oracle là 30 ký tự

Nếu bạn đang viết mã có thể được tái sử dụng trong một hệ thống cơ sở dữ liệu khác, hãy nghiêng về các tên định danh ngắn hơn.

### Khi Tạo Bản Sao Của Bảng

Sử dụng tên sẽ giúp bạn quản lý chúng sau này. Một phương pháp là thêm ngày `YYYY_MM_DD` vào tên bảng khi bạn tạo nó, chẳng hạn như `tire_sizes_2017_10_20`. Một lợi ích bổ sung là các tên bảng sẽ được sắp xếp theo thứ tự ngày tháng.

## Kiểm Soát Giá Trị Cột Với Ràng Buộc

Kiểu dữ liệu của một cột đã định nghĩa rộng rãi loại dữ liệu mà nó sẽ chấp nhận: số nguyên so với ký tự, chẳng hạn. Nhưng SQL cung cấp một số ràng buộc bổ sung cho phép chúng ta chỉ định thêm các giá trị chấp nhận được cho một cột dựa trên các quy tắc và kiểm tra logic. Với ràng buộc, chúng ta có thể tránh hiện tượng "rác vào, rác ra", điều xảy ra khi dữ liệu chất lượng kém dẫn đến phân tích không chính xác hoặc không đầy đủ. Ràng buộc giúp duy trì chất lượng dữ liệu và đảm bảo tính toàn vẹn của các mối quan hệ giữa các bảng.

Trong Chương 6, bạn đã học về khóa chính và khóa ngoại, đây là hai trong số các ràng buộc được sử dụng phổ biến nhất. Hãy xem xét lại chúng cũng như các loại ràng buộc bổ sung sau:

- **CHECK**: Đánh giá xem dữ liệu có nằm trong các giá trị chúng ta chỉ định hay không
- **UNIQUE**: Đảm bảo rằng các giá trị trong một cột hoặc nhóm cột là duy nhất trong mỗi hàng trong bảng
- **NOT NULL**: Ngăn chặn các giá trị NULL trong một cột

### Ràng Buộc Cột vs. Ràng Buộc Bảng

Chúng ta có thể thêm ràng buộc theo hai cách: như một ràng buộc cột hoặc như một ràng buộc bảng.

- **Ràng buộc cột**: Chỉ áp dụng cho cột đó. Nó được khai báo với tên cột và kiểu dữ liệu trong câu lệnh CREATE TABLE, và nó được kiểm tra bất cứ khi nào có thay đổi đối với cột.

- **Ràng buộc bảng**: Chúng ta có thể cung cấp tiêu chí áp dụng cho một hoặc nhiều cột. Chúng ta khai báo nó trong câu lệnh CREATE TABLE ngay sau khi định nghĩa tất cả các cột của bảng, và nó được kiểm tra bất cứ khi nào có thay đổi đối với một hàng trong bảng.

## Khóa Chính: Tự Nhiên vs. Thay Thế

Trong Chương 6, bạn đã học về việc cung cấp cho một bảng một khóa chính: một cột hoặc tập hợp các cột có giá trị xác định duy nhất mỗi hàng trong một bảng. Khóa chính là một ràng buộc, và nó áp đặt hai quy tắc lên cột hoặc các cột tạo nên khóa:

1. Mỗi cột trong khóa phải có một giá trị duy nhất cho mỗi hàng.
2. Không có cột nào trong khóa có thể có giá trị bị thiếu.

Khóa chính cũng cung cấp một phương tiện để liên kết các bảng với nhau và duy trì tính toàn vẹn tham chiếu, đó là đảm bảo rằng các hàng trong các bảng liên quan có các giá trị khớp khi chúng ta mong đợi chúng.

### Sử Dụng Các Cột Hiện Có Cho Khóa Tự Nhiên

Bạn triển khai khóa tự nhiên bằng cách sử dụng một hoặc nhiều cột hiện có của bảng thay vì tạo một cột và điền nó bằng các giá trị nhân tạo để hoạt động như khóa. Nếu các giá trị của một cột tuân theo ràng buộc khóa chính—duy nhất cho mỗi hàng và không bao giờ trống—nó có thể được sử dụng như một khóa tự nhiên. Một giá trị trong cột có thể thay đổi miễn là giá trị mới không gây ra vi phạm ràng buộc.

**Ví dụ:** Số nhận dạng bằng lái xe do Sở Giao thông Vận tải địa phương cấp. Trong một khu vực tài phán của chính phủ, chẳng hạn như một tiểu bang ở Hoa Kỳ, chúng ta có lý do hợp lý để mong đợi rằng tất cả người lái xe sẽ nhận được một ID duy nhất trên bằng lái xe của họ. Nhưng nếu chúng ta đang biên soạn cơ sở dữ liệu bằng lái xe quốc gia, chúng ta có thể không thể đưa ra giả định đó; một số tiểu bang có thể độc lập cấp cùng một mã ID. Trong trường hợp đó, cột `driver_id` có thể không có giá trị duy nhất và không thể được sử dụng như khóa tự nhiên trừ khi nó được kết hợp với một hoặc nhiều cột bổ sung.

**Các ví dụ khác về khóa tự nhiên:**
- Số bộ phận
- Số sê-ri
- ISBN của sách

### Giới Thiệu Các Cột Cho Khóa Thay Thế

Thay vì dựa vào dữ liệu hiện có, khóa thay thế thường bao gồm một cột duy nhất mà bạn điền bằng các giá trị nhân tạo. Điều này có thể là một số tuần tự được tự động tạo bởi cơ sở dữ liệu; ví dụ, sử dụng kiểu dữ liệu serial. Một số nhà phát triển thích sử dụng UUID (Universally Unique Identifier), là một mã bao gồm 32 chữ số thập lục phân xác định phần cứng hoặc phần mềm máy tính. Đây là một ví dụ:
```
2911d8a8-6dea-4a46-af23-d64175a08237
```

### Ưu và Nhược Điểm Của Các Loại Khóa

**Lý do được nêu để sử dụng khóa tự nhiên:**
- Dữ liệu đã tồn tại trong bảng, và bạn không cần thêm cột để tạo khóa
- Vì dữ liệu khóa tự nhiên có ý nghĩa, nó có thể giảm nhu cầu kết nối bảng khi tìm kiếm

**Lý do được nêu để sử dụng khóa thay thế:**
- Vì khóa thay thế không có ý nghĩa gì trong chính nó và các giá trị của nó độc lập với dữ liệu trong bảng, nếu dữ liệu của bạn thay đổi sau này, bạn không bị giới hạn bởi cấu trúc khóa
- Khóa tự nhiên có xu hướng tiêu thụ nhiều dung lượng lưu trữ hơn các số nguyên thường được sử dụng cho khóa thay thế

**Thực Hành Tốt Nhất:** Một bảng được thiết kế tốt nên có một hoặc nhiều cột có thể phục vụ như khóa tự nhiên. Một ví dụ là bảng sản phẩm với mã sản phẩm duy nhất. Nhưng trong một bảng nhân viên, có thể khó tìm bất kỳ cột đơn lẻ nào, hoặc thậm chí nhiều cột, sẽ là duy nhất trên cơ sở từng hàng để phục vụ như khóa chính. Trong trường hợp đó, bạn có thể tạo khóa thay thế, nhưng bạn có thể nên xem xét lại cấu trúc bảng.

### Cú Pháp Khóa Chính

#### Cú Pháp Ràng Buộc Cột

```sql
CREATE TABLE natural_key_example (
    license_id varchar(10) CONSTRAINT license_key PRIMARY KEY,
    first_name varchar(50),
    last_name varchar(50)
);
```

**Ưu điểm:**
- Dễ hiểu ngay từ cái nhìn đầu tiên cột nào được chỉ định là khóa chính
- Bạn có thể bỏ qua từ khóa CONSTRAINT và tên cho khóa, và chỉ cần sử dụng `PRIMARY KEY`

#### Cú Pháp Ràng Buộc Bảng

```sql
CREATE TABLE natural_key_example (
    license_id varchar(10),
    first_name varchar(50),
    last_name varchar(50),
    CONSTRAINT license_key PRIMARY KEY (license_id)
);
```

**Khi nào sử dụng:** Bạn phải sử dụng cú pháp ràng buộc bảng khi bạn muốn tạo khóa chính sử dụng nhiều hơn một cột (khóa chính tổng hợp).

### Ví Dụ Vi Phạm Khóa Chính

```sql
INSERT INTO natural_key_example (license_id, first_name, last_name)
VALUES ('T229901', 'Lynn', 'Malero');

INSERT INTO natural_key_example (license_id, first_name, last_name)
VALUES ('T229901', 'Sam', 'Tracy');
```

Khi bạn thực thi câu lệnh INSERT đầu tiên, máy chủ tải một hàng vào bảng mà không có vấn đề gì. Khi bạn cố gắng thực thi câu lệnh thứ hai, máy chủ phản hồi bằng lỗi:

```
ERROR: duplicate key value violates unique constraint "license_key"
DETAIL: Key (license_id)=(T229901) already exists.
```

Trước khi thêm hàng, máy chủ đã kiểm tra xem `license_id` của `T229901` đã có trong bảng chưa. Vì nó đã có, và vì khóa chính theo định nghĩa phải là duy nhất cho mỗi hàng, máy chủ đã từ chối thao tác.

### Tạo Khóa Chính Tổng Hợp

Nếu chúng ta muốn tạo khóa tự nhiên nhưng một cột duy nhất trong bảng không đủ để đáp ứng các yêu cầu khóa chính về tính duy nhất, chúng ta có thể tạo một khóa phù hợp từ sự kết hợp của các cột, được gọi là **khóa chính tổng hợp**.

**Ví dụ:** Một bảng theo dõi việc đi học của học sinh. Sự kết hợp của cột ID học sinh và cột ngày sẽ cho chúng ta dữ liệu duy nhất cho mỗi hàng, theo dõi học sinh có ở trường hay không mỗi ngày trong năm học.

```sql
CREATE TABLE natural_key_composite_example (
    student_id varchar(10),
    school_day date,
    present boolean,
    CONSTRAINT student_key PRIMARY KEY (student_id, school_day)
);
```

Cú pháp tuân theo cùng định dạng ràng buộc bảng để thêm khóa chính cho một cột, nhưng chúng ta truyền hai (hoặc nhiều hơn) cột làm đối số thay vì một.

**Ví dụ vi phạm:**
```sql
INSERT INTO natural_key_composite_example (student_id, school_day, present)
VALUES(775, '1/22/2017', 'Y');

INSERT INTO natural_key_composite_example (student_id, school_day, present)
VALUES(775, '1/23/2017', 'Y');

INSERT INTO natural_key_composite_example (student_id, school_day, present)
VALUES(775, '1/23/2017', 'N');
```

Hai câu lệnh INSERT đầu tiên thực thi tốt vì không có sự trùng lặp giá trị trong sự kết hợp của các cột khóa. Nhưng câu lệnh thứ ba gây ra lỗi vì các giá trị `student_id` và `school_day` mà nó chứa khớp với một sự kết hợp đã tồn tại trong bảng:

```
ERROR: duplicate key value violates unique constraint "student_key"
DETAIL: Key (student_id, school_day)=(775, 2017-01-23) already exists.
```

Bạn có thể tạo khóa tổng hợp với nhiều hơn hai cột. Cơ sở dữ liệu cụ thể bạn đang sử dụng áp đặt giới hạn về số lượng cột bạn có thể sử dụng.

### Tạo Khóa Thay Thế Tự Động Tăng

Nếu một bảng bạn đang tạo không có cột phù hợp cho khóa chính tự nhiên, bạn có thể có vấn đề về tính toàn vẹn dữ liệu; trong trường hợp đó, tốt nhất là xem xét lại cách bạn đang cấu trúc cơ sở dữ liệu. Nếu bạn đang kế thừa dữ liệu để phân tích hoặc cảm thấy mạnh mẽ về việc sử dụng khóa thay thế, bạn có thể tạo một cột và điền nó bằng các giá trị duy nhất.

**Sử dụng các kiểu serial:** Một cách dễ dàng để tạo khóa chính thay thế là với một số nguyên tự động tăng sử dụng một trong các kiểu dữ liệu serial: `smallserial`, `serial`, và `bigserial`. Chúng tương ứng với các kiểu số nguyên `smallint`, `integer`, và `bigint` về phạm vi giá trị mà chúng xử lý và lượng dung lượng đĩa mà chúng tiêu thụ.

**Khuyến nghị:** Đối với khóa chính, có thể hấp dẫn để cố gắng tiết kiệm dung lượng đĩa bằng cách sử dụng `serial`, xử lý các số lớn đến 2,147,483,647. Nhưng nhiều nhà phát triển cơ sở dữ liệu đã nhận được cuộc gọi đêm khuya từ người dùng hoảng sợ muốn biết tại sao ứng dụng của họ bị hỏng, chỉ để phát hiện ra rằng cơ sở dữ liệu đang cố gắng tạo một số lớn hơn một so với tối đa của kiểu dữ liệu. Vì lý do này, với PostgreSQL, thường khôn ngoan là sử dụng `bigserial`, chấp nhận các số cao đến 9,2 tỷ tỷ. Bạn có thể đặt nó và quên nó.

```sql
CREATE TABLE surrogate_key_example (
    order_number bigserial,
    product_name varchar(50),
    order_date date,
    CONSTRAINT order_key PRIMARY KEY (order_number)
);

INSERT INTO surrogate_key_example (product_name, order_date)
VALUES ('Beachball Polish', '2015-03-17'),
       ('Wrinkle De-Atomizer', '2017-05-22'),
       ('Flux Capacitor', '1985-10-26');

SELECT * FROM surrogate_key_example;
```

**Kết quả:**
```
order_number | product_name          | order_date
-------------|----------------------|------------
1            | Beachball Polish     | 2015-03-17
2            | Wrinkle De-Atomizer  | 2017-05-22
3            | Flux Capacitor       | 1985-10-26
```

**Quan trọng:** Cơ sở dữ liệu sẽ thêm một vào `order_number` mỗi khi một hàng mới được chèn. Nhưng nó sẽ không điền bất kỳ khoảng trống nào trong chuỗi được tạo sau khi các hàng bị xóa.

## Khóa Ngoại

Với ràng buộc khóa ngoại, SQL rất hữu ích cung cấp một cách để đảm bảo dữ liệu trong các bảng liên quan không bị không liên quan, hoặc bị mồ côi. Khóa ngoại là một hoặc nhiều cột trong một bảng khớp với khóa chính của bảng khác. Nhưng khóa ngoại cũng áp đặt một ràng buộc: các giá trị được nhập phải đã tồn tại trong khóa chính hoặc khóa duy nhất khác của bảng mà nó tham chiếu. Nếu không, giá trị bị từ chối. Ràng buộc này đảm bảo rằng chúng ta không kết thúc với các hàng trong một bảng không có quan hệ với các hàng trong các bảng khác mà chúng ta có thể kết nối chúng.

### Ví Dụ Khóa Ngoại

```sql
CREATE TABLE licenses (
    license_id varchar(10),
    first_name varchar(50),
    last_name varchar(50),
    CONSTRAINT licenses_key PRIMARY KEY (license_id)
);

CREATE TABLE registrations (
    registration_id varchar(10),
    registration_date date,
    license_id varchar(10) REFERENCES licenses (license_id),
    CONSTRAINT registration_key PRIMARY KEY (registration_id, license_id)
);

INSERT INTO licenses (license_id, first_name, last_name)
VALUES ('T229901', 'Lynn', 'Malero');

INSERT INTO registrations (registration_id, registration_date, license_id)
VALUES ('A203391', '3/17/2017', 'T229901');

INSERT INTO registrations (registration_id, registration_date, license_id)
VALUES ('A75772', '3/17/2017', 'T000001');
```

**Cách hoạt động:**
- Bảng đầu tiên, `licenses`, sử dụng `license_id` duy nhất của người lái xe như khóa chính tự nhiên
- Bảng thứ hai, `registrations`, dùng để theo dõi đăng ký phương tiện
- Trong bảng `registrations`, chúng ta chỉ định cột `license_id` như khóa ngoại bằng cách thêm từ khóa `REFERENCES`, theo sau là tên bảng và cột để tham chiếu

**Khi chèn:**
- Khi chúng ta chèn một hàng vào `registrations`, cơ sở dữ liệu sẽ kiểm tra xem giá trị được chèn vào `license_id` đã tồn tại trong cột khóa chính `license_id` của bảng `licenses` chưa
- Nếu không, cơ sở dữ liệu trả về lỗi

**Ví dụ lỗi:**
```
ERROR: insert or update on table "registrations" violates foreign key constraint "registrations_license_id_fkey"
DETAIL: Key (license_id)=(T000001) is not present in table "licenses".
```

### Ý Nghĩa Thực Tế

**Thứ tự chèn:** Chúng ta không thể thêm dữ liệu vào một bảng chứa khóa ngoại trước khi bảng khác được tham chiếu bởi khóa có các bản ghi liên quan, hoặc chúng ta sẽ gặp lỗi. Trong ví dụ này, chúng ta sẽ phải tạo bản ghi bằng lái xe trước khi chèn bản ghi đăng ký liên quan.

**Thứ tự xóa:** Điều ngược lại áp dụng khi chúng ta xóa dữ liệu. Để duy trì tính toàn vẹn tham chiếu, ràng buộc khóa ngoại ngăn chúng ta xóa một hàng từ `licenses` trước khi xóa bất kỳ hàng liên quan nào trong `registrations`, vì làm như vậy sẽ để lại một bản ghi mồ côi. Chúng ta sẽ phải xóa hàng liên quan trong `registrations` trước, và sau đó xóa hàng trong `licenses`.

### Tự Động Xóa Các Bản Ghi Liên Quan Với CASCADE

Để xóa một hàng trong `licenses` và có hành động đó tự động xóa bất kỳ hàng liên quan nào trong `registrations`, chúng ta có thể chỉ định hành vi đó bằng cách thêm `ON DELETE CASCADE` khi định nghĩa ràng buộc khóa ngoại.

```sql
CREATE TABLE registrations (
    registration_id varchar(10),
    registration_date date,
    license_id varchar(10) REFERENCES licenses (license_id) ON DELETE CASCADE,
    CONSTRAINT registration_key PRIMARY KEY (registration_id, license_id)
);
```

**Lợi ích:**
- Cho phép chúng ta xóa bằng lái xe mà không cần phải xóa thủ công bất kỳ đăng ký nào liên quan đến nó
- Duy trì tính toàn vẹn dữ liệu bằng cách đảm bảo việc xóa bằng lái xe không để lại các hàng mồ côi trong đăng ký

## Ràng Buộc CHECK

Ràng buộc CHECK đánh giá xem dữ liệu được thêm vào một cột có đáp ứng các tiêu chí mong đợi hay không, mà chúng ta chỉ định bằng một kiểm tra logic. Nếu các tiêu chí không được đáp ứng, cơ sở dữ liệu trả về lỗi. Ràng buộc CHECK cực kỳ có giá trị vì nó có thể ngăn các cột bị tải với dữ liệu vô nghĩa. Ví dụ, ngày sinh của nhân viên mới có lẽ không nên quá 120 năm trong quá khứ, vì vậy bạn có thể đặt giới hạn cho ngày sinh. Hoặc, trong hầu hết các trường học, Z không phải là điểm chữ cái hợp lệ cho một khóa học, vì vậy chúng ta có thể chèn các ràng buộc chỉ chấp nhận các giá trị A–F.

### Cú Pháp Ràng Buộc CHECK

Như với khóa chính, chúng ta có thể triển khai ràng buộc CHECK như một ràng buộc cột hoặc một ràng buộc bảng.

**Ràng buộc cột:** Khai báo nó trong câu lệnh CREATE TABLE sau tên cột và kiểu dữ liệu: `CHECK (logical expression)`

**Ràng buộc bảng:** Sử dụng cú pháp `CONSTRAINT constraint_name CHECK (logical expression)` sau khi tất cả các cột được định nghĩa.

### Ví Dụ Ràng Buộc CHECK

```sql
CREATE TABLE check_constraint_example (
    user_id bigserial,
    user_role varchar(50),
    salary integer,
    CONSTRAINT user_id_key PRIMARY KEY (user_id),
    CONSTRAINT check_role_in_list CHECK (user_role IN('Admin', 'Staff')),
    CONSTRAINT check_salary_not_zero CHECK (salary > 0)
);
```

**Cách hoạt động:**
- CHECK đầu tiên kiểm tra xem các giá trị được nhập vào cột `user_role` có khớp với một trong hai chuỗi được định nghĩa trước, Admin hoặc Staff, bằng cách sử dụng toán tử IN của SQL
- CHECK thứ hai kiểm tra xem các giá trị được nhập vào cột `salary` có lớn hơn 0 hay không, vì không ai nên kiếm được số tiền âm
- Cả hai kiểm tra đều là biểu thức Boolean—các câu lệnh đánh giá là đúng hoặc sai. Nếu một giá trị được kiểm tra bởi ràng buộc đánh giá là đúng, kiểm tra vượt qua

**Lưu ý:** Các nhà phát triển có thể tranh luận về việc logic kiểm tra thuộc về cơ sở dữ liệu, trong ứng dụng phía trước cơ sở dữ liệu, chẳng hạn như hệ thống nhân sự, hoặc cả hai. Một lợi thế của kiểm tra trong cơ sở dữ liệu là cơ sở dữ liệu sẽ duy trì tính toàn vẹn dữ liệu trong trường hợp thay đổi ứng dụng, ngay cả khi một hệ thống mới được xây dựng hoặc người dùng được cung cấp các cách khác để thêm dữ liệu.

### Kết Hợp Nhiều Kiểm Tra

Nếu chúng ta sử dụng cú pháp ràng buộc bảng, chúng ta cũng có thể kết hợp nhiều hơn một kiểm tra trong một câu lệnh CHECK duy nhất:

```sql
CONSTRAINT grad_check CHECK (credits >= 120 AND tuition = 'Paid')
```

Lưu ý rằng chúng ta kết hợp hai kiểm tra logic bằng cách đặt chúng trong dấu ngoặc đơn và kết nối chúng với AND. Ở đây, cả hai biểu thức Boolean phải đánh giá là đúng để toàn bộ kiểm tra vượt qua.

### Kiểm Tra Giá Trị Qua Các Cột

Bạn cũng có thể kiểm tra giá trị qua các cột, như trong ví dụ sau đây nơi chúng ta muốn đảm bảo giá bán của một mặt hàng là giảm giá so với giá gốc:

```sql
CONSTRAINT sale_check CHECK (sale_price < retail_price)
```

Bên trong dấu ngoặc đơn, biểu thức logic kiểm tra rằng giá bán nhỏ hơn giá bán lẻ.

## Ràng Buộc UNIQUE

Chúng ta cũng có thể đảm bảo rằng một cột có giá trị duy nhất trong mỗi hàng bằng cách sử dụng ràng buộc UNIQUE. Nếu việc đảm bảo giá trị duy nhất nghe có vẻ tương tự như mục đích của khóa chính, thì đúng vậy. Nhưng UNIQUE có một sự khác biệt quan trọng. Trong khóa chính, không có giá trị nào có thể là NULL, nhưng ràng buộc UNIQUE cho phép nhiều giá trị NULL trong một cột.

### Ví Dụ Ràng Buộc UNIQUE

```sql
CREATE TABLE unique_constraint_example (
    contact_id bigserial CONSTRAINT contact_id_key PRIMARY KEY,
    first_name varchar(50),
    last_name varchar(50),
    email varchar(200),
    CONSTRAINT email_unique UNIQUE (email)
);

INSERT INTO unique_constraint_example (first_name, last_name, email)
VALUES ('Samantha', 'Lee', 'slee@example.org');

INSERT INTO unique_constraint_example (first_name, last_name, email)
VALUES ('Betty', 'Diaz', 'bdiaz@example.org');

INSERT INTO unique_constraint_example (first_name, last_name, email)
VALUES ('Sasha', 'Lee', 'slee@example.org');
```

**Cách hoạt động:**
- `contact_id` phục vụ như khóa chính thay thế, xác định duy nhất mỗi hàng
- Chúng ta cũng có cột `email`, điểm liên lạc chính với mỗi người
- Chúng ta mong đợi cột này chỉ chứa các địa chỉ email duy nhất, nhưng những địa chỉ đó có thể thay đổi theo thời gian
- Chúng ta sử dụng UNIQUE để đảm bảo rằng bất cứ khi nào chúng ta thêm hoặc cập nhật email của một liên hệ, chúng ta không cung cấp một cái đã tồn tại

**Ví dụ lỗi:**
```
ERROR: duplicate key value violates unique constraint "email_unique"
DETAIL: Key (email)=(slee@example.org) already exists.
```

## Ràng Buộc NOT NULL

Trong Chương 6, bạn đã học về NULL, một giá trị đặc biệt trong SQL đại diện cho điều kiện không có dữ liệu trong một hàng trong một cột hoặc giá trị không xác định. Bạn cũng đã học rằng các giá trị NULL không được phép trong khóa chính, vì khóa chính cần xác định duy nhất mỗi hàng trong một bảng. Nhưng sẽ có các cột khác ngoài khóa chính nơi bạn không muốn cho phép giá trị trống.

### Ví Dụ Ràng Buộc NOT NULL

```sql
CREATE TABLE not_null_example (
    student_id bigserial,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    CONSTRAINT student_id_key PRIMARY KEY (student_id)
);
```

**Cách hoạt động:**
- Chúng ta khai báo NOT NULL cho các cột `first_name` và `last_name` vì có khả năng chúng ta sẽ yêu cầu những thông tin đó trong một bảng theo dõi thông tin học sinh
- Nếu chúng ta cố gắng INSERT vào bảng và không bao gồm giá trị cho các cột đó, cơ sở dữ liệu sẽ thông báo cho chúng ta về vi phạm

## Xóa Ràng Buộc Hoặc Thêm Chúng Sau

Cho đến nay, chúng ta đã đặt ràng buộc trên bảng tại thời điểm tạo. Bạn cũng có thể xóa ràng buộc hoặc sau đó thêm một ràng buộc vào bảng hiện có bằng cách sử dụng `ALTER TABLE`, lệnh SQL thực hiện thay đổi đối với bảng và cột.

### Xóa Ràng Buộc

**Để xóa khóa chính, khóa ngoại hoặc ràng buộc UNIQUE:**
```sql
ALTER TABLE table_name DROP CONSTRAINT constraint_name;
```

**Để xóa ràng buộc NOT NULL:**
```sql
ALTER TABLE table_name ALTER COLUMN column_name DROP NOT NULL;
```

Câu lệnh hoạt động trên cột, vì vậy bạn phải sử dụng các từ khóa `ALTER COLUMN` bổ sung.

### Thêm Ràng Buộc

**Để thêm khóa chính, khóa ngoại hoặc ràng buộc UNIQUE:**
```sql
ALTER TABLE table_name ADD CONSTRAINT constraint_name PRIMARY KEY (column_name);
ALTER TABLE table_name ADD CONSTRAINT constraint_name FOREIGN KEY (column_name) REFERENCES other_table (other_column);
ALTER TABLE table_name ADD CONSTRAINT constraint_name UNIQUE (column_name);
```

**Để thêm ràng buộc NOT NULL:**
```sql
ALTER TABLE table_name ALTER COLUMN column_name SET NOT NULL;
```

### Ví Dụ: Sửa Đổi Ràng Buộc

```sql
ALTER TABLE not_null_example DROP CONSTRAINT student_id_key;
ALTER TABLE not_null_example ADD CONSTRAINT student_id_key PRIMARY KEY (student_id);
ALTER TABLE not_null_example ALTER COLUMN first_name DROP NOT NULL;
ALTER TABLE not_null_example ALTER COLUMN first_name SET NOT NULL;
```

**Lưu ý quan trọng:** Bạn chỉ có thể thêm ràng buộc vào bảng hiện có nếu dữ liệu trong cột mục tiêu tuân theo giới hạn của ràng buộc. Ví dụ, bạn không thể đặt ràng buộc khóa chính trên một cột có giá trị trùng lặp hoặc trống.

## Tăng Tốc Truy Vấn Với Chỉ Mục

Giống như chỉ mục của sách giúp bạn tìm thông tin nhanh hơn, bạn có thể tăng tốc truy vấn bằng cách thêm chỉ mục vào một hoặc nhiều cột. Cơ sở dữ liệu sử dụng chỉ mục như một phím tắt thay vì quét từng hàng để tìm dữ liệu. Đó là một bức tranh đơn giản hóa về những gì, trong cơ sở dữ liệu SQL, là một chủ đề không tầm thường. Tôi có thể viết nhiều chương về chỉ mục SQL và điều chỉnh cơ sở dữ liệu cho hiệu suất, nhưng thay vào đó tôi sẽ cung cấp hướng dẫn chung về sử dụng chỉ mục và một ví dụ cụ thể cho PostgreSQL minh họa lợi ích của chúng.

### B-Tree: Chỉ Mục Mặc Định Của PostgreSQL

Trong khi theo dõi cuốn sách này, bạn đã tạo một số chỉ mục, có thể mà không biết. Mỗi khi bạn thêm khóa chính hoặc ràng buộc UNIQUE vào bảng, PostgreSQL (cũng như hầu hết các hệ thống cơ sở dữ liệu) đặt chỉ mục trên cột. Chỉ mục được lưu trữ riêng biệt với dữ liệu bảng, nhưng chúng được truy cập tự động khi bạn chạy truy vấn và được cập nhật mỗi khi một hàng được thêm hoặc xóa khỏi bảng.

Trong PostgreSQL, loại chỉ mục mặc định là **chỉ mục B-Tree**. Nó được tạo tự động trên các cột được chỉ định cho khóa chính hoặc ràng buộc UNIQUE, và nó cũng là loại được tạo theo mặc định khi bạn thực thi câu lệnh CREATE INDEX. B-Tree, viết tắt của balanced tree (cây cân bằng), được đặt tên như vậy vì cấu trúc tổ chức dữ liệu theo cách mà khi bạn tìm kiếm một giá trị, nó nhìn từ đỉnh cây xuống qua các nhánh cho đến khi nó định vị dữ liệu bạn muốn.

**Chỉ mục B-Tree hữu ích cho:**
- Dữ liệu có thể được sắp xếp và tìm kiếm bằng các toán tử đẳng thức và phạm vi, chẳng hạn như `<`, `<=`, `=`, `>=`, `>`, và `BETWEEN`

**Các loại chỉ mục PostgreSQL khác:**
- PostgreSQL tích hợp các loại chỉ mục bổ sung, bao gồm Generalized Inverted Index (GIN) và Generalized Search Tree (GiST)
- Mỗi loại có công dụng riêng biệt, và chúng sẽ được tích hợp trong các chương sau về tìm kiếm văn bản đầy đủ và truy vấn sử dụng các kiểu hình học

### Đánh Giá Hiệu Suất Truy Vấn Với EXPLAIN

Chúng ta sẽ đo lường mức độ chỉ mục có thể cải thiện tốc độ truy vấn bằng cách kiểm tra hiệu suất trước và sau khi thêm một chỉ mục. Để làm điều này, chúng ta sẽ sử dụng lệnh `EXPLAIN` của PostgreSQL, cụ thể cho PostgreSQL và không phải là một phần của SQL chuẩn. Lệnh EXPLAIN cung cấp đầu ra liệt kê kế hoạch truy vấn cho một truy vấn cơ sở dữ liệu cụ thể. Điều này có thể bao gồm cách cơ sở dữ liệu dự định quét bảng, liệu nó có sử dụng chỉ mục hay không, v.v.

Nếu chúng ta thêm từ khóa `ANALYZE`, EXPLAIN sẽ thực hiện truy vấn và hiển thị thời gian thực thi thực tế, đó là những gì chúng ta muốn cho bài tập hiện tại.

### Ví Dụ: Địa Chỉ Thành Phố New York

Đối với bài tập này, chúng ta sẽ sử dụng một tập dữ liệu lớn bao gồm hơn 900.000 địa chỉ đường phố của Thành phố New York, được biên soạn bởi dự án OpenAddresses. Tệp với dữ liệu, `city_of_new_york.csv`, có sẵn để tải xuống cùng với tất cả các tài nguyên cho cuốn sách này.

```sql
CREATE TABLE new_york_addresses (
    longitude numeric(9,6),
    latitude numeric(9,6),
    street_number varchar(10),
    street varchar(32),
    unit varchar(7),
    postcode varchar(5),
    id integer CONSTRAINT new_york_key PRIMARY KEY
);

COPY new_york_addresses
FROM 'C:\YourDirectory\city_of_new_york.csv'
WITH (FORMAT CSV, HEADER);
```

Khi dữ liệu được tải, chạy một truy vấn SELECT nhanh để kiểm tra trực quan rằng bạn có 940.374 hàng và bảy cột. Một cách sử dụng phổ biến cho dữ liệu này có thể là tìm kiếm các kết quả khớp trong cột `street`, vì vậy chúng ta sẽ sử dụng ví dụ đó để khám phá hiệu suất chỉ mục.

### Ghi Lại Thời Gian Thực Thi Kiểm Soát

Chạy mỗi trong ba truy vấn một lần. Chúng ta đang sử dụng các truy vấn SELECT điển hình với mệnh đề WHERE nhưng với các từ khóa `EXPLAIN ANALYZE` được bao gồm ở đầu:

```sql
EXPLAIN ANALYZE SELECT * FROM new_york_addresses
WHERE street = 'BROADWAY';

EXPLAIN ANALYZE SELECT * FROM new_york_addresses
WHERE street = '52 STREET';

EXPLAIN ANALYZE SELECT * FROM new_york_addresses
WHERE street = 'ZWICKY AVENUE';
```

**Ví dụ đầu ra (trước chỉ mục):**
```
Seq Scan on new_york_addresses  (cost=0.00..20730.68 rows=3730 width=46)
(actual time=0.055..289.426 rows=3336 loops=1)
Filter: ((street)::text = 'BROADWAY'::text)
Rows Removed by Filter: 937038
Planning time: 0.617 ms
Execution time: 289.838 ms
```

**Điểm chính:**
- Đầu tiên chỉ ra rằng để tìm bất kỳ hàng nào nơi `street = 'BROADWAY'`, cơ sở dữ liệu sẽ thực hiện **quét tuần tự** của bảng
- Đó là từ đồng nghĩa cho quét toàn bộ bảng: mỗi hàng sẽ được kiểm tra, và cơ sở dữ liệu sẽ loại bỏ bất kỳ hàng nào không khớp với BROADWAY
- Thời gian thực thi (trên máy tính của tôi khoảng 290 mili giây) là thời gian sẽ mất

### Thêm Chỉ Mục

Bây giờ, hãy xem cách thêm chỉ mục thay đổi phương pháp tìm kiếm của truy vấn và tốc độ hoạt động:

```sql
CREATE INDEX street_idx ON new_york_addresses (street);
```

**Cách hoạt động:**
- Chúng ta cung cấp các từ khóa CREATE INDEX theo sau là tên chúng ta chọn cho chỉ mục, trong trường hợp này là `street_idx`
- Sau đó ON được thêm, theo sau là bảng mục tiêu và cột
- Thực thi câu lệnh CREATE INDEX, và PostgreSQL sẽ quét các giá trị trong cột street và xây dựng chỉ mục từ chúng
- Chúng ta chỉ cần tạo chỉ mục một lần

**Ví dụ đầu ra (sau chỉ mục):**
```
Bitmap Heap Scan on new_york_addresses  (cost=65.80..5962.17 rows=2758 width=46)
(actual time=1.792..9.816 rows=3336 loops=1)
Recheck Cond: ((street)::text = 'BROADWAY'::text)
Heap Blocks: exact=2157
    ->  Bitmap Index Scan on street_idx  (cost=0.00..65.11 rows=2758 width=0)
(actual time=1.253..1.253 rows=3336 loops=1)
Index Cond: ((street)::text = 'BROADWAY'::text)
Planning time: 0.163 ms
Execution time: 5.887 ms
```

**Cải thiện hiệu suất:**
- Thay vì quét tuần tự, thống kê EXPLAIN ANALYZE cho thấy cơ sở dữ liệu hiện đang sử dụng **quét chỉ mục** trên `street_idx` thay vì truy cập từng hàng
- Tốc độ truy vấn hiện nhanh hơn đáng kể

**So sánh hiệu suất:**

| Bộ Lọc Truy Vấn | Trước Chỉ Mục | Sau Chỉ Mục |
|------------------|---------------|--------------|
| WHERE street = 'BROADWAY' | 290 ms | 6 ms |
| WHERE street = '52 STREET' | 271 ms | 6 ms |
| WHERE street = 'ZWICKY AVENUE' | 306 ms | 1 ms |

Thời gian thực thi tốt hơn rất nhiều, hiệu quả nhanh hơn một phần tư giây hoặc hơn mỗi truy vấn. Một phần tư giây có ấn tượng không? Chà, cho dù bạn đang tìm kiếm câu trả lời trong dữ liệu bằng cách truy vấn lặp lại hoặc tạo hệ thống cơ sở dữ liệu cho hàng nghìn người dùng, việc tiết kiệm thời gian sẽ tích lũy.

### Xóa Chỉ Mục

Nếu bạn cần xóa chỉ mục khỏi bảng—có thể nếu bạn đang kiểm tra hiệu suất của một số loại chỉ mục—sử dụng lệnh DROP INDEX theo sau là tên của chỉ mục để xóa:

```sql
DROP INDEX street_idx;
```

## Cân Nhắc Khi Sử Dụng Chỉ Mục

Bạn đã thấy rằng chỉ mục có lợi ích hiệu suất đáng kể, vậy điều đó có nghĩa là bạn nên thêm chỉ mục vào mọi cột trong bảng không? Không nhanh như vậy! Chỉ mục có giá trị, nhưng chúng không phải lúc nào cũng cần thiết. Ngoài ra, chúng làm tăng kích thước cơ sở dữ liệu và áp đặt chi phí bảo trì khi ghi dữ liệu. Dưới đây là một số mẹo để đánh giá khi nào sử dụng chỉ mục:

### Khi Nào Sử Dụng Chỉ Mục

1. **Tham khảo tài liệu** cho trình quản lý cơ sở dữ liệu bạn đang sử dụng để tìm hiểu về các loại chỉ mục có sẵn và loại nào sử dụng trên các kiểu dữ liệu cụ thể. PostgreSQL, ví dụ, có thêm năm loại chỉ mục ngoài B-Tree. Một, được gọi là GiST, đặc biệt phù hợp với các kiểu dữ liệu hình học. Tìm kiếm văn bản đầy đủ cũng được hưởng lợi từ việc lập chỉ mục.

2. **Cân nhắc thêm chỉ mục vào bất kỳ cột nào bạn sẽ sử dụng trong kết nối bảng.** Khóa chính được lập chỉ mục theo mặc định trong PostgreSQL, nhưng các cột khóa ngoại trong các bảng liên quan thì không và là mục tiêu tốt cho chỉ mục.

3. **Thêm chỉ mục vào các cột sẽ thường xuyên xuất hiện trong mệnh đề WHERE của truy vấn.** Như bạn đã thấy, hiệu suất tìm kiếm được cải thiện đáng kể thông qua chỉ mục.

4. **Sử dụng EXPLAIN ANALYZE để kiểm tra hiệu suất** dưới nhiều cấu hình khác nhau nếu bạn không chắc chắn. Tối ưu hóa là một quá trình!

### Đánh Đổi

- **Lợi ích:** Hiệu suất truy vấn nhanh hơn đáng kể
- **Chi phí:** 
  - Làm tăng kích thước cơ sở dữ liệu
  - Áp đặt chi phí bảo trì khi ghi dữ liệu (chỉ mục phải được cập nhật khi dữ liệu thay đổi)
  - Không phải lúc nào cũng cần thiết

## Tóm Tắt

Với các công cụ bạn đã thêm vào bộ công cụ của mình trong chương này, bạn đã sẵn sàng đảm bảo rằng các cơ sở dữ liệu bạn xây dựng hoặc kế thừa phù hợp nhất cho việc thu thập và khám phá dữ liệu của bạn. Truy vấn của bạn sẽ chạy nhanh hơn, bạn có thể loại trừ các giá trị không mong muốn, và các đối tượng cơ sở dữ liệu của bạn sẽ có tổ chức nhất quán. Đó là một lợi ích cho bạn và cho những người khác chia sẻ dữ liệu của bạn.

### Các Khái Niệm Chính Đã Được Bao Phủ

- **Quy ước đặt tên**: Snake case, camel case, Pascal case
- **Định danh có dấu ngoặc kép**: Sử dụng dấu ngoặc kép để giữ nguyên chữ hoa/chữ thường và cho phép ký tự đặc biệt
- **Hướng dẫn đặt tên**: Sử dụng snake case, đặt tên dễ hiểu, sử dụng số nhiều cho bảng, lưu ý độ dài
- **Ràng buộc**: Khóa chính, khóa ngoại, CHECK, UNIQUE, NOT NULL
- **Khóa tự nhiên**: Sử dụng các cột hiện có làm khóa chính
- **Khóa thay thế**: Khóa tự động tăng (khuyến nghị bigserial)
- **Khóa chính tổng hợp**: Sử dụng nhiều cột làm khóa chính
- **Khóa ngoại với CASCADE**: Tự động xóa các bản ghi liên quan
- **ALTER TABLE**: Thêm và xóa ràng buộc
- **Chỉ mục**: Chỉ mục B-Tree, EXPLAIN ANALYZE, đánh giá hiệu suất

### Thực Hành Tốt Nhất

1. Sử dụng snake case nhất quán cho định danh
2. Đặt tên dễ hiểu và tránh các chữ viết tắt khó hiểu
3. Sử dụng tên số nhiều cho bảng
4. Lưu ý độ dài của tên định danh (xem xét khả năng tương thích giữa các cơ sở dữ liệu)
5. Sử dụng hậu tố ngày tháng khi tạo bản sao của bảng
6. Ưu tiên khóa tự nhiên khi có cột phù hợp
7. Sử dụng bigserial cho khóa thay thế (không phải serial) để tránh tràn
8. Thêm ràng buộc khóa ngoại để duy trì tính toàn vẹn tham chiếu
9. Sử dụng ràng buộc CHECK để xác thực dữ liệu
10. Sử dụng ràng buộc UNIQUE cho các cột nên là duy nhất nhưng không phải khóa chính
11. Sử dụng NOT NULL cho các cột bắt buộc
12. Thêm chỉ mục vào các cột được sử dụng trong kết nối và mệnh đề WHERE
13. Sử dụng EXPLAIN ANALYZE để đánh giá hiệu suất truy vấn
14. Kiểm tra hiệu suất chỉ mục trước và sau khi thêm chỉ mục

### Khi Nào Sử Dụng Mỗi Ràng Buộc

- **Khóa Chính**: Khi bạn cần một định danh duy nhất cho mỗi hàng
- **Khóa Ngoại**: Khi bạn cần tham chiếu các hàng trong bảng khác
- **CHECK**: Khi bạn cần xác thực dữ liệu chống lại các tiêu chí cụ thể
- **UNIQUE**: Khi bạn cần giá trị duy nhất nhưng cho phép NULL
- **NOT NULL**: Khi một cột phải luôn có giá trị

### Quyết Định Khóa Tự Nhiên vs. Khóa Thay Thế

- **Sử dụng khóa tự nhiên** khi: Có cột duy nhất phù hợp, dữ liệu có ý nghĩa, giảm nhu cầu kết nối
- **Sử dụng khóa thay thế** khi: Không có khóa tự nhiên phù hợp, bạn cần tính linh hoạt cho các thay đổi trong tương lai, dung lượng lưu trữ là mối quan tâm

## Các Bước Tiếp Theo

Chương này kết thúc phần đầu tiên của cuốn sách, tập trung vào việc cung cấp cho bạn những điều cần thiết để đi sâu vào cơ sở dữ liệu SQL. Tôi sẽ tiếp tục xây dựng dựa trên những nền tảng này khi chúng ta khám phá các truy vấn phức tạp hơn và các chiến lược phân tích dữ liệu. Trong chương tiếp theo, chúng ta sẽ sử dụng các hàm tổng hợp SQL để đánh giá chất lượng của tập dữ liệu và lấy thông tin có thể sử dụng từ nó.
