# Chương 8: Trích Xuất Thông Tin Bằng Nhóm Hóa và Tóm Tắt

## Giới Thiệu

Mỗi tập dữ liệu đều kể một câu chuyện, và công việc của nhà phân tích dữ liệu là tìm ra câu chuyện đó là gì. Trong Chương 2, bạn đã học về việc phỏng vấn dữ liệu bằng các câu lệnh SELECT, bao gồm sắp xếp cột, tìm giá trị duy nhất và lọc kết quả. Bạn cũng đã học các kiến thức cơ bản về toán SQL, kiểu dữ liệu, thiết kế bảng và kết nối bảng. Với tất cả các công cụ này, bạn đã sẵn sàng để tóm tắt dữ liệu bằng cách nhóm hóa và các hàm SQL.

Tóm tắt dữ liệu cho phép chúng ta xác định thông tin hữu ích mà chúng ta không thể thấy được nếu không có. Trong chương này, chúng ta sẽ sử dụng tổ chức quen thuộc là thư viện địa phương của bạn làm ví dụ.

Bất chấp những thay đổi trong cách mọi người tiêu thụ thông tin, thư viện vẫn là một phần quan trọng của cộng đồng trên toàn thế giới. Nhưng internet và những tiến bộ trong công nghệ thư viện đã thay đổi cách chúng ta sử dụng thư viện. Ví dụ, sách điện tử và truy cập trực tuyến vào tài liệu kỹ thuật số hiện có một vị trí vĩnh viễn trong thư viện cùng với sách và tạp chí.

Ở Hoa Kỳ, Viện Dịch vụ Bảo tàng và Thư viện (IMLS) đo lường hoạt động thư viện như một phần của Khảo sát Thư viện Công cộng hàng năm. Khảo sát thu thập dữ liệu từ hơn 9.000 thực thể quản lý thư viện, được định nghĩa bởi khảo sát là các cơ quan cung cấp dịch vụ thư viện cho một địa phương cụ thể. Một số cơ quan là hệ thống thư viện quận, và những cơ quan khác là một phần của các khu học chính. Dữ liệu về mỗi cơ quan bao gồm số lượng chi nhánh, nhân viên, sách, giờ mở cửa mỗi năm, v.v. IMLS đã thu thập dữ liệu mỗi năm kể từ năm 1988 và bao gồm tất cả các cơ quan thư viện công cộng ở 50 tiểu bang cộng với Quận Columbia và một số lãnh thổ, chẳng hạn như Samoa thuộc Mỹ.

Đối với bài tập này, chúng ta sẽ đảm nhận vai trò của một nhà phân tích vừa nhận được một bản sao mới của tập dữ liệu thư viện để tạo báo cáo mô tả các xu hướng từ dữ liệu. Chúng ta sẽ cần tạo hai bảng, một bảng có dữ liệu từ khảo sát năm 2014 và bảng thứ hai từ khảo sát năm 2009. Sau đó, chúng ta sẽ tóm tắt dữ liệu thú vị hơn trong mỗi bảng và kết nối các bảng để xem các xu hướng năm năm.

Trong quá trình phân tích, bạn sẽ học các kỹ thuật SQL để tóm tắt dữ liệu bằng cách sử dụng các hàm tổng hợp và nhóm hóa.

## Tạo Bảng Khảo Sát Thư Viện

Hãy tạo các bảng khảo sát thư viện năm 2014 và 2009 và nhập dữ liệu. Chúng ta sẽ sử dụng kiểu dữ liệu phù hợp cho mỗi cột và thêm ràng buộc và chỉ mục vào mỗi bảng để duy trì tính toàn vẹn dữ liệu và tăng tốc truy vấn.

### Tạo Bảng Dữ Liệu Thư Viện 2014

Chúng ta sẽ bắt đầu bằng cách tạo bảng cho dữ liệu thư viện năm 2014. Sử dụng câu lệnh CREATE TABLE, chúng ta sẽ xây dựng `pls_fy2014_pupld14a`, một bảng cho Tệp Dữ liệu Thư viện Công cộng năm tài chính 2014 từ Khảo sát Thư viện Công cộng. Tệp Dữ liệu Thư viện Công cộng tóm tắt dữ liệu ở cấp cơ quan, đếm hoạt động tại tất cả các điểm phục vụ của cơ quan, bao gồm thư viện trung tâm, thư viện chi nhánh và xe thư viện.

**Quy Ước Đặt Tên:**
- `pls` đề cập đến tiêu đề khảo sát (Public Libraries Survey - Khảo sát Thư viện Công cộng)
- `fy2014` là năm tài chính mà dữ liệu bao phủ
- `pupld14a` là tên của tệp cụ thể từ khảo sát

Để đơn giản, chúng ta đã chọn chỉ 72 trong số các cột liên quan hơn từ 159 cột trong tệp khảo sát gốc.

```
STABR	FSCSKEY	LIBID	LIBNAME	OBEREG	RSTATUS	STATSTRU	STATNAME	STATADDR	LONGITUD	LATITUDE	FIPSST	FIPSCO	ADDRESS	CITY	ZIP	ZIP4	CNTY	PHONE	C_RELATN	C_LEGBAS	C_ADMIN	GEOCODE	LSABOUND	STARTDAT	ENDDATE	POPU_LSA	CENTLIB	BRANLIB	BKMOB	MASTER	LIBRARIA	TOTSTAFF	LOCGVT	STGVT	FEDGVT	TOTINCM	SALARIES	BENEFIT	STAFFEXP	PRMATEXP	ELMATEXP	TOTEXPCO	TOTOPEXP	LCAP_REV	SCAP_REV	FCAP_REV	CAP_REV	CAPITAL	BKVOL	EBOOK	AUDIO_PH	AUDIO_DL	VIDEO_PH	VIDEO_DL	DATABASE	SUBSCRIP	HRS_OPEN	VISITS	REFERENC	REGBOR	TOTCIR	KIDCIRCL	ELMATCIR	LOANTO	LOANFM	TOTPRO	TOTATTEN	GPTERMS	PITUSR	WIFISESS	YR_SUB

```

```sql
CREATE TABLE pls_fy2014_pupld14a (
    stabr varchar(2) NOT NULL,
    fscskey varchar(6) CONSTRAINT fscskey2014_key PRIMARY KEY,
    libid varchar(20) NOT NULL,
    libname varchar(100) NOT NULL,
    obereg varchar(2) NOT NULL,
    rstatus integer NOT NULL,
    statstru varchar(2) NOT NULL,
    statname varchar(2) NOT NULL,
    stataddr varchar(2) NOT NULL,
    longitud numeric(10,7) NOT NULL,
    latitude numeric(10,7) NOT NULL,
    fipsst varchar(2) NOT NULL,
    fipsco varchar(3) NOT NULL,
    address varchar(35) NOT NULL,
    city varchar(20) NOT NULL,
    zip varchar(5) NOT NULL,
    zip4 varchar(4) NOT NULL,
    cnty varchar(20) NOT NULL,
    phone varchar(10) NOT NULL,
    c_relatn varchar(2) NOT NULL,
    c_legbas varchar(2) NOT NULL,
    c_admin varchar(2) NOT NULL,
    geocode varchar(1) NOT NULL,
    lsabound varchar(1) NOT NULL,
    startdat varchar(10) NOT NULL,
    enddate varchar(10) NOT NULL,
    popu_lsa integer NOT NULL,
    centlib integer NOT NULL,
    branlib integer NOT NULL,
    bkmob integer NOT NULL,
    master integer NOT NULL,
    libraria integer NOT NULL,
    totstaff integer NOT NULL,
    locgvt integer NOT NULL,
    stgvt integer NOT NULL,
    fedgvt integer NOT NULL,
    totincm integer NOT NULL,
    salaries integer NOT NULL,
    benefit integer NOT NULL,
    staffexp integer NOT NULL,
    prmatexp integer NOT NULL,
    elmatexp integer NOT NULL,
    totexpco integer NOT NULL,
    totopexp integer NOT NULL,
    lcap_rev integer NOT NULL,
    scap_rev integer NOT NULL,
    fcap_rev integer NOT NULL,
    cap_rev integer NOT NULL,
    capital integer NOT NULL,
    bkvol integer NOT NULL,
    ebook integer NOT NULL,
    audio_ph integer NOT NULL,
    audio_dl integer NOT NULL,
    video_ph integer NOT NULL,
    video_dl integer NOT NULL,
    databases integer NOT NULL,
    subscrip integer NOT NULL,
    hrs_open integer NOT NULL,
    visits integer NOT NULL,
    referenc integer NOT NULL,
    regbor integer NOT NULL,
    totcir integer NOT NULL,
    kidcircl integer NOT NULL,
    elmatcir integer NOT NULL,
    loanto integer NOT NULL,
    loanfm integer NOT NULL,
    totpro integer NOT NULL,
    totatten integer NOT NULL,
    gpterms integer NOT NULL,
    pitusr integer NOT NULL,
    wifisess integer NOT NULL,
    yr_sub integer NOT NULL
);

CREATE INDEX libname2014_idx ON pls_fy2014_pupld14a (libname);
CREATE INDEX stabr2014_idx ON pls_fy2014_pupld14a (stabr);
CREATE INDEX city2014_idx ON pls_fy2014_pupld14a (city);
CREATE INDEX visits2014_idx ON pls_fy2014_pupld14a (visits);

COPY pls_fy2014_pupld14a
FROM 'C:\YourDirectory\pls_fy2014_pupld14a.csv'
WITH (FORMAT CSV, HEADER);
```

**Điểm Quan Trọng:**
- Chúng ta gán ràng buộc khóa chính cho cột có tên `fscskey`, một mã duy nhất được gán cho mỗi thư viện. Vì nó là duy nhất, có mặt trong mỗi hàng và khó có khả năng thay đổi, nó có thể phục vụ như khóa chính tự nhiên.
- Định nghĩa cho mỗi cột bao gồm kiểu dữ liệu phù hợp và ràng buộc NOT NULL nơi các cột không có giá trị bị thiếu.
- Lưu ý: Cột có tên `database` trong tệp CSV đã được đổi thành `databases` trong bảng vì `database` là từ khóa dành riêng của SQL.
- Các cột `startdat` và `enddat` chứa ngày tháng, nhưng chúng ta đã đặt kiểu dữ liệu của chúng thành `varchar(10)` vì trong tệp CSV các cột đó bao gồm các giá trị không phải ngày tháng, và việc nhập của chúng ta sẽ thất bại nếu chúng ta cố gắng sử dụng kiểu dữ liệu ngày tháng.
- Sau khi tạo bảng, chúng ta thêm chỉ mục vào các cột chúng ta sẽ sử dụng cho truy vấn. Điều này cung cấp kết quả nhanh hơn khi chúng ta tìm kiếm cột cho một thư viện cụ thể.

### Tạo Bảng Dữ Liệu Thư Viện 2009

Tạo bảng cho dữ liệu thư viện năm 2009 tuân theo các bước tương tự. Hầu hết các khảo sát đang diễn ra sẽ có một số thay đổi từ năm này sang năm khác vì những người tạo khảo sát nghĩ ra các câu hỏi mới hoặc sửa đổi các câu hỏi hiện có, vì vậy các cột được bao gồm sẽ hơi khác trong bảng này.

**Ví dụ:** Tệp năm 2014 có cột `wifisess`, liệt kê số lượng phiên Wi-Fi hàng năm mà thư viện cung cấp, nhưng cột này không tồn tại trong dữ liệu năm 2009.

```
STABR	FSCSKEY	LIBID	LIBNAME	ADDRESS	CITY	ZIP	ZIP4	CNTY	PHONE	C_RELATN	C_LEGBAS	C_ADMIN	GEOCODE	LSABOUND	STARTDAT	ENDDATE	POPU_LSA	CENTLIB	BRANLIB	BKMOB	MASTER	LIBRARIA	TOTSTAFF	LOCGVT	STGVT	FEDGVT	TOTINCM	SALARIES	BENEFIT	STAFFEXP	PRMATEXP	ELMATEXP	TOTEXPCO	TOTOPEXP	LCAP_REV	SCAP_REV	FCAP_REV	CAP_REV	CAPITAL	BKVOL	EBOOK	AUDIO	VIDEO	DATABASE	SUBSCRIP	HRS_OPEN	VISITS	REFERENC	REGBOR	TOTCIR	KIDCIRCL	LOANTO	LOANFM	TOTPRO	TOTATTEN	GPTERMS	PITUSR	YR_SUB	OBEREG	RSTATUS	STATSTRU	STATNAME	STATADDR	LONGITUD	LATITUDE	FIPSST	FIPSCO

```

```sql
CREATE TABLE pls_fy2009_pupld09a (
    stabr varchar(2) NOT NULL,
    fscskey varchar(6) CONSTRAINT fscskey2009_key PRIMARY KEY,
    libid varchar(20) NOT NULL,
    libname varchar(100) NOT NULL,
    address varchar(35) NOT NULL,
    city varchar(20) NOT NULL,
    zip varchar(5) NOT NULL,
    zip4 varchar(4) NOT NULL,
    cnty varchar(20) NOT NULL,
    phone varchar(10) NOT NULL,
    c_relatn varchar(2) NOT NULL,
    c_legbas varchar(2) NOT NULL,
    c_admin varchar(2) NOT NULL,
    geocode varchar(1) NOT NULL,
    lsabound varchar(1) NOT NULL,
    startdat varchar(10) NOT NULL,
    enddate varchar(10) NOT NULL,
    popu_lsa integer NOT NULL,
    centlib integer NOT NULL,
    branlib integer NOT NULL,
    bkmob integer NOT NULL,
    master integer NOT NULL,
    libraria integer NOT NULL,
    totstaff integer NOT NULL,
    locgvt integer NOT NULL,
    stgvt integer NOT NULL,
    fedgvt integer NOT NULL,
    totincm integer NOT NULL,
    salaries integer NOT NULL,
    benefit integer NOT NULL,
    staffexp integer NOT NULL,
    prmatexp integer NOT NULL,
    elmatexp integer NOT NULL,
    totexpco integer NOT NULL,
    totopexp integer NOT NULL,
    lcap_rev integer NOT NULL,
    scap_rev integer NOT NULL,
    fcap_rev integer NOT NULL,
    cap_rev integer NOT NULL,
    capital integer NOT NULL,
    bkvol integer NOT NULL,
    ebook integer NOT NULL,
    audio integer NOT NULL,
    video integer NOT NULL,
    databases integer NOT NULL,
    subscrip integer NOT NULL,
    hrs_open integer NOT NULL,
    visits integer NOT NULL,
    referenc integer NOT NULL,
    regbor integer NOT NULL,
    totcir integer NOT NULL,
    kidcircl integer NOT NULL,
    loanto integer NOT NULL,
    loanfm integer NOT NULL,
    totpro integer NOT NULL,
    totatten integer NOT NULL,
    gpterms integer NOT NULL,
    pitusr integer NOT NULL,
    yr_sub integer NOT NULL,
    obereg varchar(2) NOT NULL,
    rstatus integer NOT NULL,
    statstru varchar(2) NOT NULL,
    statname varchar(2) NOT NULL,
    stataddr varchar(2) NOT NULL,
    longitud numeric(10,7) NOT NULL,
    latitude numeric(10,7) NOT NULL,
    fipsst varchar(2) NOT NULL,
    fipsco varchar(3) NOT NULL
);

CREATE INDEX libname2009_idx ON pls_fy2009_pupld09a (libname);
CREATE INDEX stabr2009_idx ON pls_fy2009_pupld09a (stabr);
CREATE INDEX city2009_idx ON pls_fy2009_pupld09a (city);
CREATE INDEX visits2009_idx ON pls_fy2009_pupld09a (visits);

COPY pls_fy2009_pupld09a
FROM 'C:\YourDirectory\pls_fy2009_pupld09a.csv'
WITH (FORMAT CSV, HEADER);
```

Chúng ta sử dụng `fscskey` làm khóa chính một lần nữa, và chúng ta tạo chỉ mục trên `libname` và các cột khác.

## Khám Phá Dữ Liệu Thư Viện Sử Dụng Các Hàm Tổng Hợp

Các hàm tổng hợp kết hợp các giá trị từ nhiều hàng và trả về một kết quả duy nhất dựa trên một thao tác trên các giá trị đó. Ví dụ, bạn có thể trả về trung bình của các giá trị với hàm `avg()`, như bạn đã học trong Chương 5. Đó chỉ là một trong nhiều hàm tổng hợp trong SQL. Một số là một phần của tiêu chuẩn SQL, và những hàm khác cụ thể cho PostgreSQL và các trình quản lý cơ sở dữ liệu khác. Hầu hết các hàm tổng hợp được sử dụng trong chương này là một phần của SQL chuẩn.

Trong phần này, chúng ta sẽ làm việc qua dữ liệu thư viện bằng cách sử dụng các hàm tổng hợp trên một và nhiều cột, và sau đó khám phá cách bạn có thể mở rộng việc sử dụng chúng bằng cách nhóm các kết quả chúng trả về với các giá trị từ các cột bổ sung.

### Đếm Hàng và Giá Trị Sử Dụng count()

Sau khi nhập một tập dữ liệu, một bước đầu tiên hợp lý là đảm bảo bảng có số hàng mong đợi. Ví dụ, tài liệu IMLS cho dữ liệu năm 2014 nói rằng tệp chúng ta đã nhập có 9.305 hàng, và tệp năm 2009 có 9.299 hàng. Khi chúng ta đếm số hàng trong các bảng đó, kết quả phải khớp với các số đếm đó.

Hàm tổng hợp `count()`, là một phần của tiêu chuẩn ANSI SQL, giúp dễ dàng kiểm tra số hàng và thực hiện các tác vụ đếm khác.

#### Đếm Tất Cả Hàng

Nếu chúng ta cung cấp dấu hoa thị làm đầu vào, chẳng hạn như `count(*)`, dấu hoa thị hoạt động như ký tự đại diện, vì vậy hàm trả về số hàng bảng bất kể chúng có bao gồm giá trị NULL hay không.

```sql
SELECT count(*)
FROM pls_fy2014_pupld14a;

SELECT count(*)
FROM pls_fy2009_pupld09a;
```

**Kết quả:**
- Đối với `pls_fy2014_pupld14a`: 9.305 hàng
- Đối với `pls_fy2009_pupld09a`: 9.299 hàng

Cả hai kết quả đều khớp với số hàng chúng ta mong đợi.

**Lưu ý:** Bạn cũng có thể kiểm tra số hàng bằng giao diện pgAdmin, nhưng nó khá cồng kềnh. Nhấp chuột phải vào tên bảng trong trình duyệt đối tượng của pgAdmin và chọn View/Edit Data→All Rows sẽ thực thi một truy vấn SQL cho tất cả các hàng. Sau đó, một thông báo pop-up trong khung kết quả hiển thị số hàng, nhưng nó biến mất sau vài giây.

So sánh số hàng bảng với những gì tài liệu nói là quan trọng vì nó sẽ cảnh báo chúng ta về các vấn đề như hàng bị thiếu hoặc các trường hợp chúng ta có thể đã nhập sai tệp.

#### Đếm Giá Trị Có Trong Một Cột

Để trả về số hàng trong một cột cụ thể chứa giá trị, chúng ta cung cấp tên của một cột làm đầu vào cho hàm `count()` thay vì dấu hoa thị.

```sql
SELECT count(salaries)
FROM pls_fy2014_pupld14a;
```

**Kết quả:** 5.983 hàng có giá trị trong `salaries`.

Con số này thấp hơn nhiều so với số hàng tồn tại trong bảng. Trong dữ liệu năm 2014, ít hơn hai phần ba các cơ quan báo cáo lương, và bạn sẽ muốn lưu ý thực tế đó khi báo cáo bất kỳ kết quả nào của các phép tính được thực hiện trên các cột đó. Kiểm tra này quan trọng vì mức độ các giá trị có mặt trong một cột có thể ảnh hưởng đến quyết định của bạn về việc có tiếp tục phân tích hay không.

#### Đếm Giá Trị Duy Nhất Trong Một Cột

Trong Chương 2, chúng ta đã đề cập đến từ khóa DISTINCT, là một phần của tiêu chuẩn SQL. Khi được thêm sau SELECT trong một truy vấn, DISTINCT trả về một danh sách các giá trị duy nhất. Chúng ta có thể sử dụng nó để xem các giá trị duy nhất trong một cột, hoặc chúng ta có thể xem các kết hợp duy nhất của các giá trị từ nhiều cột. Một cách sử dụng khác của DISTINCT là thêm nó vào hàm `count()`, điều này khiến hàm trả về số đếm các giá trị duy nhất từ một cột.

```sql
SELECT count(libname)
FROM pls_fy2014_pupld14a;

SELECT count(DISTINCT libname)
FROM pls_fy2014_pupld14a;
```

**Kết quả:**
- Truy vấn đầu tiên: 9.305 (khớp với số hàng trong bảng)
- Truy vấn thứ hai: 8.515 (tên thư viện duy nhất)

Sử dụng DISTINCT để loại bỏ các bản sao giảm số lượng tên thư viện xuống 8.515 tên duy nhất. Điều này cho thấy 530 cơ quan thư viện chia sẻ tên của họ với một hoặc nhiều cơ quan khác. Như một ví dụ, chín cơ quan thư viện được đặt tên là OXFORD PUBLIC LIBRARY trong bảng, mỗi cơ quan ở một thành phố hoặc thị trấn có tên Oxford ở các tiểu bang khác nhau, bao gồm Alabama, Connecticut, Kansas và Pennsylvania, trong số những tiểu bang khác.

### Tìm Giá Trị Tối Đa và Tối Thiểu Sử Dụng max() và min()

Biết số lớn nhất và nhỏ nhất trong một cột hữu ích vì một vài lý do. Đầu tiên, nó giúp chúng ta có cảm nhận về phạm vi của các giá trị được báo cáo cho một biến cụ thể. Thứ hai, các hàm được sử dụng, `max()` và `min()`, có thể tiết lộ các vấn đề bất ngờ với dữ liệu.

Cả `max()` và `min()` đều hoạt động theo cùng một cách: bạn sử dụng câu lệnh SELECT theo sau là hàm với tên của một cột được cung cấp.

```sql
SELECT max(visits), min(visits)
FROM pls_fy2014_pupld14a;
```

**Kết quả:**
```
max      | min
---------|----
17729020 | -3
```

**Phân tích:**
- Giá trị tối đa hơn 17,7 triệu là hợp lý cho một hệ thống thư viện thành phố lớn.
- Nhưng -3 là tối thiểu? Trên bề mặt, kết quả đó có vẻ như một sai sót, nhưng hóa ra những người tạo khảo sát thư viện đang sử dụng một quy ước phổ biến nhưng có vấn đề trong thu thập dữ liệu: sử dụng số âm hoặc một số giá trị nhân tạo cao như một chỉ báo.

**Trong trường hợp này, những người tạo khảo sát đã sử dụng số âm để chỉ ra:**
1. Giá trị -1 cho biết "không phản hồi" cho câu hỏi đó.
2. Giá trị -3 cho biết "không áp dụng" và được sử dụng khi một cơ quan thư viện đã đóng cửa tạm thời hoặc vĩnh viễn.

**Quan trọng:** Chúng ta sẽ cần tính đến và loại trừ các giá trị âm khi khám phá dữ liệu, vì tổng một cột và bao gồm các giá trị âm sẽ dẫn đến tổng không chính xác. Chúng ta có thể làm điều này bằng cách sử dụng mệnh đề WHERE để lọc chúng. Thật tốt khi chúng ta phát hiện ra vấn đề này ngay bây giờ thay vì sau này sau khi dành nhiều thời gian cho phân tích sâu hơn!

**Lưu ý:** Một lựa chọn tốt hơn cho kịch bản giá trị âm này là sử dụng NULL trong các hàng trong cột visits nơi dữ liệu phản hồi vắng mặt, và sau đó tạo một cột `visits_flag` riêng để chứa các mã giải thích lý do. Kỹ thuật này tách các giá trị số khỏi thông tin về chúng.

## Tổng Hợp Dữ Liệu Sử Dụng GROUP BY

Khi bạn sử dụng mệnh đề GROUP BY với các hàm tổng hợp, bạn có thể nhóm kết quả theo các giá trị trong một hoặc nhiều cột. Điều này cho phép chúng ta thực hiện các thao tác như `sum()` hoặc `count()` cho mỗi tiểu bang trong bảng của chúng ta hoặc cho mỗi loại cơ quan thư viện.

### Hiểu GROUP BY

Một mình, GROUP BY, cũng là một phần của ANSI SQL chuẩn, loại bỏ các giá trị trùng lặp khỏi kết quả, tương tự như DISTINCT.

```sql
SELECT stabr
FROM pls_fy2014_pupld14a
GROUP BY stabr
ORDER BY stabr;
```

**Cách hoạt động:**
- Mệnh đề GROUP BY theo sau mệnh đề FROM và bao gồm tên cột để nhóm.
- Trong trường hợp này, chúng ta đang chọn `stabr`, chứa viết tắt tiểu bang, và nhóm theo cột đó.
- Sau đó, chúng ta cũng sử dụng ORDER BY `stabr` để các kết quả được nhóm theo thứ tự bảng chữ cái.

**Kết quả:** Điều này sẽ tạo ra một kết quả với các viết tắt tiểu bang duy nhất từ bảng năm 2014. Không có bản sao trong 56 hàng được trả về. Các viết tắt bưu điện hai chữ cái chuẩn này bao gồm 50 tiểu bang cộng với Washington, D.C., và một số lãnh thổ Hoa Kỳ, chẳng hạn như Samoa thuộc Mỹ và Quần đảo Virgin thuộc Mỹ.

### Nhóm Nhiều Cột

Bạn không bị giới hạn chỉ nhóm một cột. Chúng ta có thể sử dụng mệnh đề GROUP BY trên nhiều cột:

```sql
SELECT city, stabr
FROM pls_fy2014_pupld14a
GROUP BY city, stabr
ORDER BY city, stabr;
```

**Kết quả:** Các kết quả được sắp xếp theo thành phố và sau đó theo tiểu bang, và đầu ra hiển thị các kết hợp duy nhất theo thứ tự đó. Việc nhóm này trả về 9.088 hàng, ít hơn 217 hàng so với tổng số hàng bảng. Kết quả cho thấy có nhiều trường hợp tệp bao gồm nhiều hơn một cơ quan thư viện cho một kết hợp thành phố và tiểu bang cụ thể.

### Kết Hợp GROUP BY với count()

Nếu chúng ta kết hợp GROUP BY với một hàm tổng hợp, chẳng hạn như `count()`, chúng ta có thể rút ra thông tin mô tả hơn từ dữ liệu của chúng ta. Ví dụ, chúng ta biết 9.305 cơ quan thư viện có trong bảng năm 2014. Chúng ta có thể lấy số đếm các cơ quan theo tiểu bang và sắp xếp chúng để xem tiểu bang nào có nhiều nhất.

```sql
SELECT stabr, count(*)
FROM pls_fy2014_pupld14a
GROUP BY stabr
ORDER BY count(*) DESC;
```

**Cách hoạt động:**
- Không giống như trong các ví dụ trước, bây giờ chúng ta đang yêu cầu các giá trị trong cột `stabr` và số đếm của các giá trị đó.
- Trong danh sách các cột để truy vấn, chúng ta chỉ định `stabr` và hàm `count()` với dấu hoa thị làm đầu vào của nó. Như trước đây, dấu hoa thị khiến `count()` bao gồm các giá trị NULL.
- Ngoài ra, khi chúng ta chọn các cột riêng lẻ cùng với một hàm tổng hợp, chúng ta phải bao gồm các cột trong mệnh đề GROUP BY. Nếu không, cơ sở dữ liệu sẽ trả về lỗi yêu cầu chúng ta làm như vậy. Lý do là bạn không thể nhóm các giá trị bằng cách tổng hợp và có các giá trị cột không được nhóm trong cùng một truy vấn.
- Để sắp xếp các kết quả và có tiểu bang với số lượng cơ quan lớn nhất ở đầu, chúng ta có thể ORDER BY hàm `count()` theo thứ tự giảm dần sử dụng DESC.

**Kết quả:** Các kết quả cho thấy New York, Illinois và Texas là các tiểu bang có số lượng cơ quan thư viện lớn nhất vào năm 2014:

```
stabr | count
------|------
NY    | 756
IL    | 625
TX    | 556
IA    | 543
PA    | 455
MI    | 389
WI    | 381
MA    | 370
--snip--
```

**Lưu ý Quan Trọng:** Hãy nhớ rằng bảng của chúng ta đại diện cho các cơ quan thư viện phục vụ một địa phương. Chỉ vì New York, Illinois và Texas có số lượng cơ quan thư viện lớn nhất không có nghĩa là chúng có số lượng điểm phục vụ lớn nhất nơi bạn có thể bước vào và xem qua các kệ sách. Một cơ quan có thể chỉ có một thư viện trung tâm, hoặc nó có thể không có thư viện trung tâm nhưng có 23 chi nhánh trải rộng quanh một quận. Để đếm các điểm phục vụ, mỗi hàng trong bảng cũng có giá trị trong các cột `centlib` và `branlib`, ghi lại số lượng thư viện trung tâm và chi nhánh, tương ứng. Để tìm tổng, chúng ta sẽ sử dụng hàm tổng hợp `sum()` trên cả hai cột.

### Sử Dụng GROUP BY Trên Nhiều Cột với count()

Chúng ta có thể thu thập thêm thông tin từ dữ liệu của chúng ta bằng cách kết hợp GROUP BY với hàm `count()` và nhiều cột. Ví dụ, cột `stataddr` trong cả hai bảng chứa một mã cho biết liệu địa chỉ của cơ quan có thay đổi trong năm qua hay không. Các giá trị trong `stataddr` là:
- `00`: Không thay đổi so với năm trước
- `07`: Chuyển đến địa điểm mới
- `15`: Thay đổi địa chỉ nhỏ

```sql
SELECT stabr, stataddr, count(*)
FROM pls_fy2014_pupld14a
GROUP BY stabr, stataddr
ORDER BY stabr ASC, count(*) DESC;
```

**Cách hoạt động:**
- Các phần chính của truy vấn là tên cột và hàm `count()` sau SELECT, và đảm bảo cả hai cột được phản ánh trong mệnh đề GROUP BY.
- Hiệu ứng của việc nhóm theo hai cột là `count()` sẽ hiển thị số lượng các kết hợp duy nhất của `stabr` và `stataddr`.
- Để làm cho đầu ra dễ đọc hơn, hãy sắp xếp trước theo mã tiểu bang theo thứ tự tăng dần và sau đó theo số đếm theo thứ tự giảm dần.

**Kết quả:**
```
stabr | stataddr | count
------|----------|------
AK    | 00       | 70
AK    | 15       | 10
AK    | 07       | 5
AL    | 00       | 221
AL    | 07       | 3
AR    | 00       | 58
AS    | 00       | 1
AZ    | 00       | 91
--snip--
```

**Phân tích:** Một vài hàng đầu tiên của kết quả cho thấy mã 00 (không thay đổi địa chỉ) là giá trị phổ biến nhất cho mỗi tiểu bang. Chúng ta mong đợi điều đó vì có khả năng có nhiều cơ quan thư viện chưa thay đổi địa chỉ hơn những cơ quan đã thay đổi. Kết quả giúp đảm bảo chúng ta đang phân tích dữ liệu một cách hợp lý. Nếu mã 07 (chuyển đến địa điểm mới) là phổ biến nhất trong mỗi tiểu bang, điều đó sẽ đặt ra câu hỏi về việc chúng ta đã viết truy vấn đúng chưa hoặc liệu có vấn đề với dữ liệu hay không.

## Xem Lại sum() Để Kiểm Tra Lượt Viếng Thăm Thư Viện

Cho đến nay, chúng ta đã kết hợp nhóm hóa với các hàm tổng hợp, như `count()`, trên các cột trong một bảng duy nhất để cung cấp kết quả được nhóm theo giá trị của cột. Bây giờ hãy mở rộng kỹ thuật để bao gồm nhóm hóa và tổng hợp trên các bảng được kết nối sử dụng dữ liệu thư viện năm 2014 và 2009. Mục tiêu của chúng ta là xác định các xu hướng trong lượt viếng thăm thư viện kéo dài trong khoảng thời gian năm năm đó. Để làm điều này, chúng ta cần tính tổng bằng cách sử dụng hàm tổng hợp `sum()`.

### Lọc Các Giá Trị Âm

Trước khi đi sâu vào các truy vấn này, hãy giải quyết vấn đề sử dụng các giá trị -3 và -1 để chỉ ra "không áp dụng" và "không phản hồi." Để ngăn chặn các số âm này không có ý nghĩa như số lượng ảnh hưởng đến phân tích, chúng ta sẽ lọc chúng ra bằng cách sử dụng mệnh đề WHERE để giới hạn các truy vấn đến các hàng nơi các giá trị trong visits lớn hơn hoặc bằng không.

### Tính Tổng Lượt Viếng Thăm Từ Các Bảng Riêng Lẻ

Hãy bắt đầu bằng cách tính tổng lượt viếng thăm hàng năm đến thư viện từ các bảng riêng lẻ năm 2014 và 2009:

```sql
SELECT sum(visits) AS visits_2014
FROM pls_fy2014_pupld14a
WHERE visits >= 0;

SELECT sum(visits) AS visits_2009
FROM pls_fy2009_pupld09a
WHERE visits >= 0;
```

**Kết quả:**
- Đối với năm 2014, lượt viếng thăm tổng cộng khoảng 1,4 tỷ: `1425930900`
- Đối với năm 2009, lượt viếng thăm tổng cộng khoảng 1,6 tỷ: `1591799201`

**Phân tích:** Chúng ta đang phát hiện ra điều gì đó ở đây, nhưng có thể không phải là tin tốt. Xu hướng dường như chỉ ra sự giảm xuống với lượt viếng thăm giảm khoảng 10 phần trăm từ năm 2009 đến năm 2014.

### Tính Tổng Lượt Viếng Thăm Từ Các Bảng Được Kết Nối

Các truy vấn này tổng hợp lượt viếng thăm tổng thể. Nhưng từ số đếm hàng chúng ta đã chạy trước đó trong chương, chúng ta biết rằng mỗi bảng chứa một số lượng cơ quan thư viện khác nhau: 9.305 trong năm 2014 và 9.299 trong năm 2009 do các cơ quan mở, đóng hoặc sáp nhập. Vì vậy, hãy xác định tổng lượt viếng thăm sẽ khác như thế nào nếu chúng ta giới hạn phân tích cho các cơ quan thư viện tồn tại trong cả hai bảng. Chúng ta có thể làm điều đó bằng cách kết nối các bảng:

```sql
SELECT sum(pls14.visits) AS visits_2014,
       sum(pls09.visits) AS visits_2009
FROM pls_fy2014_pupld14a pls14 JOIN pls_fy2009_pupld09a pls09
ON pls14.fscskey = pls09.fscskey
WHERE pls14.visits >= 0 AND pls09.visits >= 0;
```

**Cách hoạt động:**
- Ở đầu, chúng ta sử dụng hàm tổng hợp `sum()` để tổng hợp các cột visits từ các bảng năm 2014 và 2009.
- Khi chúng ta kết nối các bảng trên các khóa chính của bảng, chúng ta đang khai báo bí danh bảng. Ở đây, chúng ta khai báo `pls14` làm bí danh cho bảng năm 2014 và `pls09` làm bí danh cho bảng năm 2009 để tránh phải viết các tên bảng đầy đủ dài hơn trong toàn bộ truy vấn.
- Lưu ý rằng chúng ta sử dụng JOIN chuẩn, còn được gọi là INNER JOIN. Điều đó có nghĩa là kết quả truy vấn sẽ chỉ bao gồm các hàng nơi các giá trị khóa chính của cả hai bảng (cột `fscskey`) khớp.
- Sử dụng mệnh đề WHERE, chúng ta trả về các hàng nơi cả hai bảng có giá trị lớn hơn hoặc bằng không trong cột visits. Điều này sẽ ngăn chặn các giá trị âm nhân tạo ảnh hưởng đến các tổng.

**Kết quả:**
```
visits_2014 | visits_2009
------------|------------
1417299241  | 1585455205
```

**Phân tích:** Các kết quả tương tự như những gì chúng ta tìm thấy bằng cách truy vấn các bảng riêng biệt, mặc dù các tổng này nhỏ hơn sáu đến tám triệu. Lý do là truy vấn chỉ tham chiếu các cơ quan có `fscskey` trong cả hai bảng. Tuy nhiên, xu hướng giảm vẫn giữ nguyên. Chúng ta sẽ cần đào sâu hơn một chút để có được câu chuyện đầy đủ.

**Lưu ý:** Mặc dù chúng ta đã kết nối các bảng trên `fscskey`, hoàn toàn có thể một số cơ quan thư viện xuất hiện trong cả hai bảng đã sáp nhập hoặc tách ra giữa năm 2009 và 2014. Một cuộc gọi đến IMLS hỏi về các cảnh báo khi làm việc với dữ liệu này là một ý tưởng tốt.

### Nhóm Tổng Lượt Viếng Thăm Theo Tiểu Bang

Bây giờ chúng ta biết lượt viếng thăm thư viện giảm cho toàn bộ Hoa Kỳ giữa năm 2009 và 2014, bạn có thể tự hỏi, "Mọi phần của đất nước có thấy sự giảm sút không, hay mức độ của xu hướng khác nhau theo khu vực?" Chúng ta có thể trả lời câu hỏi này bằng cách sửa đổi truy vấn trước đó của chúng ta để nhóm theo mã tiểu bang. Hãy cũng sử dụng phép tính phần trăm thay đổi để so sánh xu hướng theo tiểu bang.

```sql
SELECT pls14.stabr,
       sum(pls14.visits) AS visits_2014,
       sum(pls09.visits) AS visits_2009,
       round( (CAST(sum(pls14.visits) AS decimal(10,1)) - sum(pls09.visits)) /
              sum(pls09.visits) * 100, 2 ) AS pct_change
FROM pls_fy2014_pupld14a pls14 JOIN pls_fy2009_pupld09a pls09
ON pls14.fscskey = pls09.fscskey
WHERE pls14.visits >= 0 AND pls09.visits >= 0
GROUP BY pls14.stabr
ORDER BY pct_change DESC;
```

**Cách hoạt động:**
- Chúng ta theo sau từ khóa SELECT với cột `stabr` từ bảng năm 2014; cột đó xuất hiện trong mệnh đề GROUP BY. Không quan trọng cột `stabr` của bảng nào chúng ta sử dụng vì chúng ta chỉ truy vấn các cơ quan xuất hiện trong cả hai bảng.
- Sau SELECT, chúng ta cũng bao gồm phép tính phần trăm thay đổi quen thuộc mà bạn đã học trong Chương 5, nhận bí danh `pct_change` để dễ đọc.
- Chúng ta kết thúc truy vấn với mệnh đề ORDER BY, sử dụng bí danh cột `pct_change`.

**Kết quả:** Khi bạn chạy truy vấn, phần đầu của kết quả hiển thị 10 tiểu bang hoặc lãnh thổ có sự gia tăng lượt viếng thăm từ năm 2009 đến năm 2014. Phần còn lại của kết quả cho thấy sự suy giảm. Oklahoma, ở cuối bảng xếp hạng, đã giảm 35 phần trăm!

```
stabr | visits_2014 | visits_2009 | pct_change
------|-------------|-------------|------------
GU    | 103593      | 60763       | 70.49
DC    | 4230790     | 2944774     | 43.67
LA    | 17242110    | 15591805    | 10.58
MT    | 4582604     | 4386504     | 4.47
AL    | 17113602    | 16933967    | 1.06
AR    | 10762521    | 10660058    | 0.96
KY    | 19256394    | 19113478    | 0.75
CO    | 32978245    | 32782247    | 0.60
SC    | 18178677    | 18105931    | 0.40
SD    | 3899554     | 3890392     | 0.24
MA    | 42011647     | 42237888    | -0.54
AK    | 3486955      | 3525093     | -1.08
--snip--
RI    | 5259143      | 6612167     | -20.46
NC    | 33952977     | 43111094    | -21.24
PR    | 193279       | 257032      | -24.80
GA    | 28891017     | 40922598    | -29.40
OK    | 13678542     | 21171452    | -35.39
```

**Phân tích:** Dữ liệu hữu ích này nên dẫn một nhà phân tích dữ liệu điều tra những gì đang thúc đẩy các thay đổi, đặc biệt là những thay đổi lớn nhất. Phân tích dữ liệu đôi khi có thể đặt ra nhiều câu hỏi như nó trả lời, nhưng đó là một phần của quá trình. Luôn đáng giá một cuộc gọi điện thoại đến một người có kiến thức về dữ liệu để cung cấp ngữ cảnh cho các kết quả. Đôi khi, họ có thể có một lời giải thích rất tốt. Những lần khác, một chuyên gia sẽ nói, "Điều đó nghe không đúng." Câu trả lời đó có thể đưa bạn quay lại người giữ dữ liệu hoặc tài liệu để tìm hiểu xem bạn có bỏ sót một mã hoặc một sắc thái với dữ liệu hay không.

## Lọc Một Truy Vấn Tổng Hợp Sử Dụng HAVING

Chúng ta có thể tinh chỉnh phân tích của chúng ta bằng cách kiểm tra một tập hợp con của các tiểu bang và lãnh thổ có đặc điểm tương tự. Với phần trăm thay đổi trong lượt viếng thăm, có ý nghĩa khi tách các tiểu bang lớn khỏi các tiểu bang nhỏ. Trong một tiểu bang nhỏ như Rhode Island, một thư viện đóng cửa có thể có tác động đáng kể. Một lần đóng cửa duy nhất ở California có thể hầu như không được chú ý trong một số đếm toàn tiểu bang. Để xem các tiểu bang có khối lượng lượt viếng thăm tương tự, chúng ta có thể sắp xếp kết quả theo bất kỳ cột visits nào, nhưng sẽ sạch hơn để có một tập kết quả nhỏ hơn trong truy vấn của chúng ta.

### Hiểu HAVING

Để lọc kết quả của các hàm tổng hợp, chúng ta cần sử dụng mệnh đề HAVING là một phần của ANSI SQL chuẩn. Bạn đã quen thuộc với việc sử dụng WHERE để lọc, nhưng các hàm tổng hợp, chẳng hạn như `sum()`, không thể được sử dụng trong mệnh đề WHERE vì chúng hoạt động ở cấp hàng, và các hàm tổng hợp hoạt động trên các hàng. Mệnh đề HAVING đặt điều kiện trên các nhóm được tạo bởi tổng hợp.

**Sự Khác Biệt Chính:**
- **WHERE**: Lọc các hàng trước khi nhóm và tổng hợp
- **HAVING**: Lọc các nhóm sau khi nhóm và tổng hợp

### Sử Dụng HAVING Để Lọc Kết Quả Tổng Hợp

Mã sửa đổi truy vấn bằng cách chèn mệnh đề HAVING sau GROUP BY:

```sql
SELECT pls14.stabr,
       sum(pls14.visits) AS visits_2014,
       sum(pls09.visits) AS visits_2009,
       round( (CAST(sum(pls14.visits) AS decimal(10,1)) - sum(pls09.visits)) /
              sum(pls09.visits) * 100, 2 ) AS pct_change
FROM pls_fy2014_pupld14a pls14 JOIN pls_fy2009_pupld09a pls09
ON pls14.fscskey = pls09.fscskey
WHERE pls14.visits >= 0 AND pls09.visits >= 0
GROUP BY pls14.stabr
HAVING sum(pls14.visits) > 50000000
ORDER BY pct_change DESC;
```

**Cách hoạt động:**
- Trong trường hợp này, chúng ta đã đặt kết quả truy vấn của chúng ta để chỉ bao gồm các hàng có tổng lượt viếng thăm trong năm 2014 lớn hơn 50 triệu. Đó là một giá trị tùy ý được chọn để chỉ hiển thị các tiểu bang rất lớn.
- Thêm mệnh đề HAVING giảm số hàng trong đầu ra xuống chỉ sáu.
- Trong thực tế, bạn có thể thử nghiệm với các giá trị khác nhau.

**Kết quả:**
```
stabr | visits_2014 | visits_2009 | pct_change
------|-------------|-------------|------------
TX    | 72876601    | 78838400    | -7.56
CA    | 162787836   | 182181408   | -10.65
OH    | 82495138    | 92402369    | -10.72
NY    | 106453546   | 119810969   | -11.15
IL    | 72598213    | 82438755    | -11.94
FL    | 73165352    | 87730886    | -16.60
```

**Phân tích:** Mỗi trong số sáu tiểu bang đã trải qua sự suy giảm lượt viếng thăm, nhưng lưu ý rằng sự thay đổi phần trăm không rộng như trong tập đầy đủ các tiểu bang và lãnh thổ. Tùy thuộc vào những gì chúng ta học được từ các chuyên gia thư viện, xem xét các tiểu bang có hoạt động nhiều nhất như một nhóm có thể hữu ích trong việc mô tả xu hướng, cũng như xem xét các nhóm khác. Hãy nghĩ về một câu hoặc điểm gạch đầu dòng bạn có thể viết sẽ nói, "Ở các tiểu bang lớn nhất của quốc gia, lượt viếng thăm giảm từ 8 phần trăm đến 17 phần trăm giữa năm 2009 và 2014." Bạn có thể viết các câu tương tự về các tiểu bang cỡ trung bình và các tiểu bang nhỏ.

## Tóm Tắt

Nếu chương này đã truyền cảm hứng cho bạn đến thăm thư viện địa phương và mượn một vài cuốn sách, hãy hỏi một thủ thư xem chi nhánh của họ có thấy sự gia tăng hay giảm lượt viếng thăm trong vài năm qua không. Cơ hội là, bạn có thể đoán câu trả lời ngay bây giờ. Trong chương này, bạn đã học cách sử dụng các kỹ thuật SQL chuẩn để tóm tắt dữ liệu trong một bảng bằng cách nhóm các giá trị và sử dụng một số hàm tổng hợp. Bằng cách kết nối các tập dữ liệu, bạn đã có thể xác định một số xu hướng năm năm thú vị.

### Các Khái Niệm Chính Đã Được Bao Phủ

- **Các hàm tổng hợp**: `count()`, `max()`, `min()`, `sum()`
- **Mệnh đề GROUP BY**: Nhóm kết quả theo một hoặc nhiều cột
- **Mệnh đề HAVING**: Lọc các nhóm sau khi tổng hợp
- **DISTINCT với count()**: Đếm các giá trị duy nhất
- **Kết nối bảng với tổng hợp**: Kết hợp dữ liệu từ nhiều bảng
- **Tính toán phần trăm thay đổi**: So sánh các giá trị qua các khoảng thời gian
- **Vấn đề chất lượng dữ liệu**: Xử lý các giá trị âm được sử dụng như chỉ báo

### Thực Hành Tốt Nhất

1. Luôn xác minh số đếm hàng khớp với tài liệu sau khi nhập dữ liệu
2. Kiểm tra các giá trị bị thiếu bằng cách sử dụng `count(column)` vs `count(*)`
3. Sử dụng `count(DISTINCT column)` để tìm các giá trị duy nhất
4. Sử dụng `max()` và `min()` để xác định các vấn đề chất lượng dữ liệu
5. Lọc ra các giá trị chỉ báo (như số âm) trước khi tổng hợp
6. Sử dụng GROUP BY với các hàm tổng hợp để tóm tắt theo danh mục
7. Sử dụng HAVING để lọc nhóm, không phải WHERE (lọc hàng)
8. Kết nối bảng khi so sánh dữ liệu qua các khoảng thời gian
9. Tính phần trăm thay đổi để xác định xu hướng
10. Tham khảo ý kiến các chuyên gia lĩnh vực khi kết quả có vẻ bất ngờ

### Mẫu Thường Dùng

**Đếm hàng:**
```sql
SELECT count(*) FROM table_name;
```

**Đếm giá trị không NULL:**
```sql
SELECT count(column_name) FROM table_name;
```

**Đếm giá trị duy nhất:**
```sql
SELECT count(DISTINCT column_name) FROM table_name;
```

**Nhóm và đếm:**
```sql
SELECT column_name, count(*)
FROM table_name
GROUP BY column_name
ORDER BY count(*) DESC;
```

**Lọc tổng hợp:**
```sql
SELECT column_name, sum(value_column)
FROM table_name
GROUP BY column_name
HAVING sum(value_column) > threshold;
```

**Kết nối và tổng hợp:**
```sql
SELECT t1.category, sum(t1.value) AS value_1, sum(t2.value) AS value_2
FROM table1 t1 JOIN table2 t2 ON t1.id = t2.id
GROUP BY t1.category;
```

### Khi Nào Sử Dụng Mỗi Hàm Tổng Hợp

- **count()**: Khi bạn cần đếm hàng hoặc giá trị
- **max()**: Khi bạn cần tìm giá trị lớn nhất
- **min()**: Khi bạn cần tìm giá trị nhỏ nhất
- **sum()**: Khi bạn cần tổng các giá trị số
- **avg()**: Khi bạn cần tìm trung bình (đã được đề cập trong Chương 5)

### Khi Nào Sử Dụng GROUP BY

- Khi bạn muốn tóm tắt dữ liệu theo danh mục
- Khi bạn cần số đếm hoặc tổng mỗi nhóm
- Khi so sánh các giá trị qua các nhóm khác nhau
- Khi phân tích xu hướng theo khu vực, khoảng thời gian hoặc các danh mục khác

### Khi Nào Sử Dụng HAVING

- Khi bạn cần lọc nhóm dựa trên kết quả tổng hợp
- Khi bạn muốn loại trừ các nhóm không đáp ứng các tiêu chí nhất định
- Khi so sánh các giá trị tổng hợp với ngưỡng
- **Nhớ**: HAVING lọc nhóm, WHERE lọc hàng

## Các Bước Tiếp Theo

Bạn cũng đã học rằng dữ liệu không phải lúc nào cũng được đóng gói hoàn hảo. Việc sử dụng các giá trị âm trong cột như một chỉ báo thay vì như một giá trị số thực tế đã buộc chúng ta phải lọc ra những hàng đó. Thật không may, các tập dữ liệu thường xuyên cung cấp những thách thức như vậy. Trong chương tiếp theo, bạn sẽ học các kỹ thuật để làm sạch một tập dữ liệu có một số vấn đề. Trong các chương tiếp theo, bạn cũng sẽ khám phá thêm các hàm tổng hợp để giúp bạn tìm ra những câu chuyện trong dữ liệu của bạn.
