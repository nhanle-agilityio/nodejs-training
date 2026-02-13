# Chương 10: Các Hàm Thống Kê trong SQL

## Giới Thiệu

Cơ sở dữ liệu SQL thường không phải là công cụ đầu tiên mà một nhà phân tích dữ liệu chọn khi thực hiện phân tích thống kê đòi hỏi nhiều hơn việc chỉ tính tổng và trung bình. Thông thường, phần mềm được chọn sẽ là các gói thống kê đầy đủ tính năng, chẳng hạn như SPSS hoặc SAS, các ngôn ngữ lập trình R hoặc Python, hoặc thậm chí Excel. Tuy nhiên, ANSI SQL chuẩn, bao gồm cả triển khai của PostgreSQL, cung cấp một số hàm thống kê mạnh mẽ có thể tiết lộ nhiều điều về dữ liệu của bạn mà không cần phải xuất tập dữ liệu sang chương trình khác.

Trong chương này, chúng ta sẽ khám phá các hàm thống kê SQL này cùng với các hướng dẫn về khi nào nên sử dụng chúng. Thống kê là một chủ đề rộng lớn đáng có một cuốn sách riêng, vì vậy chúng ta chỉ lướt qua bề mặt ở đây. Tuy nhiên, bạn sẽ học cách áp dụng các khái niệm thống kê cấp cao để giúp bạn rút ra ý nghĩa từ dữ liệu của mình bằng cách sử dụng một tập dữ liệu mới từ Cục Điều tra Dân số Hoa Kỳ. Bạn cũng sẽ học cách sử dụng SQL để tạo các so sánh bằng cách sử dụng xếp hạng và tỷ lệ với dữ liệu tội phạm FBI làm chủ đề của chúng ta.

## Tạo Bảng Thống Kê Điều Tra Dân Số

Hãy quay lại một trong những nguồn dữ liệu yêu thích của tôi, Cục Điều tra Dân số Hoa Kỳ. Trong Chương 4 và 5, bạn đã sử dụng Điều tra Dân số 2010 để nhập dữ liệu và thực hiện các phép toán và thống kê cơ bản. Lần này bạn sẽ sử dụng các điểm dữ liệu hạt được biên soạn từ Khảo sát Cộng đồng Mỹ (ACS) 5 Năm 2011–2015, một cuộc khảo sát riêng biệt do Cục Điều tra Dân số thực hiện.

### Hiểu Điều Tra Dân Số vs. Khảo Sát Cộng Đồng Mỹ

Mỗi sản phẩm dữ liệu Điều tra Dân số Hoa Kỳ có phương pháp luận riêng. Điều tra Dân số là một cuộc đếm đầy đủ dân số Hoa Kỳ, được thực hiện mỗi 10 năm thông qua một biểu mẫu được gửi đến mọi hộ gia đình trong nước. Một trong những mục đích chính của nó là xác định số ghế mà mỗi bang có trong Hạ viện Hoa Kỳ. Ngược lại, ACS là một cuộc khảo sát hàng năm đang diễn ra của khoảng 3,5 triệu hộ gia đình Hoa Kỳ. Nó điều tra chi tiết về thu nhập, giáo dục, việc làm, tổ tiên và nhà ở. Các tổ chức khu vực tư nhân và công cộng đều sử dụng dữ liệu ACS để theo dõi xu hướng và đưa ra các quyết định khác nhau.

Hiện tại, Cục Điều tra Dân số đóng gói dữ liệu ACS thành hai bản phát hành: một tập dữ liệu 1 năm cung cấp ước tính cho các địa lý có dân số từ 20.000 trở lên, và một tập dữ liệu 5 năm bao gồm tất cả các địa lý. Vì đây là một cuộc khảo sát, kết quả ACS là các ước tính và có sai số, điều mà tôi đã bỏ qua để ngắn gọn nhưng bạn sẽ thấy được bao gồm trong một tập dữ liệu ACS đầy đủ.

### Tạo Bảng

```sql
CREATE TABLE acs_2011_2015_stats (
    geoid varchar(14) CONSTRAINT geoid_key PRIMARY KEY,
    county varchar(50) NOT NULL,
    st varchar(20) NOT NULL,
    pct_travel_60_min numeric(5,3) NOT NULL,
    pct_bachelors_higher numeric(5,3) NOT NULL,
    pct_masters_higher numeric(5,3) NOT NULL,
    median_hh_income integer,
    CHECK (pct_masters_higher <= pct_bachelors_higher)
);

COPY acs_2011_2015_stats
FROM 'C:\YourDirectory\acs_2011_2015_stats.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ',');

SELECT * FROM acs_2011_2015_stats;
```

**Điểm Chính:**
- Bảng `acs_2011_2015_stats` có bảy cột
- Ba cột đầu tiên bao gồm một `geoid` duy nhất đóng vai trò là khóa chính, tên của hạt, và tên bang `st`
- Bốn cột tiếp theo hiển thị ba phần trăm được rút ra cho mỗi hạt từ dữ liệu thô trong bản phát hành ACS, cộng với một chỉ số kinh tế khác

**Mô Tả Cột:**
- `pct_travel_60_min`: Tỷ lệ phần trăm công nhân từ 16 tuổi trở lên đi làm hơn 60 phút
- `pct_bachelors_higher`: Tỷ lệ phần trăm người từ 25 tuổi trở lên có trình độ học vấn là bằng cử nhân trở lên. (Ở Hoa Kỳ, bằng cử nhân thường được trao sau khi hoàn thành giáo dục đại học bốn năm.)
- `pct_masters_higher`: Tỷ lệ phần trăm người từ 25 tuổi trở lên có trình độ học vấn là bằng thạc sĩ trở lên. (Ở Hoa Kỳ, bằng thạc sĩ là bằng cấp cao cấp đầu tiên kiếm được sau khi hoàn thành bằng cử nhân.)
- `median_hh_income`: Thu nhập hộ gia đình trung vị của hạt bằng đô la điều chỉnh lạm phát năm 2015. Như bạn đã học trong Chương 5, giá trị trung vị là điểm giữa trong một tập hợp số được sắp xếp, trong đó một nửa giá trị lớn hơn điểm giữa và một nửa nhỏ hơn. Vì trung bình có thể bị lệch bởi một vài giá trị rất lớn hoặc rất nhỏ, báo cáo của chính phủ về dữ liệu kinh tế, chẳng hạn như thu nhập, có xu hướng sử dụng trung vị. Trong cột này, chúng ta bỏ qua ràng buộc NOT NULL vì một hạt không có dữ liệu được báo cáo.

**Ràng Buộc CHECK:**
- Chúng ta bao gồm ràng buộc CHECK bạn đã học trong Chương 7 để kiểm tra rằng các con số cho bằng cử nhân bằng hoặc cao hơn những con số cho bằng thạc sĩ, vì ở Hoa Kỳ, bằng cử nhân được kiếm trước hoặc đồng thời với bằng thạc sĩ. Một hạt hiển thị điều ngược lại có thể cho thấy dữ liệu được nhập không đúng hoặc một cột bị gắn nhãn sai.

**Số Hàng:** Sau khi nhập, có 3.142 hàng được nhập, mỗi hàng tương ứng với một hạt được khảo sát trong bản phát hành Điều tra Dân số này.

## Đo Lường Tương Quan với corr(Y, X)

Các nhà nghiên cứu thường muốn hiểu mối quan hệ giữa các biến, và một trong những thước đo mối quan hệ như vậy là tương quan. Trong phần này, chúng ta sẽ sử dụng hàm `corr(Y, X)` để đo lường tương quan và điều tra mối quan hệ nào tồn tại, nếu có, giữa tỷ lệ phần trăm người trong một hạt đã đạt được bằng cử nhân và thu nhập hộ gia đình trung vị trong hạt đó. Chúng ta cũng sẽ xác định xem, theo dữ liệu của chúng ta, một dân số được giáo dục tốt hơn có thường tương đương với thu nhập cao hơn không và mối quan hệ giữa trình độ giáo dục và thu nhập mạnh đến mức nào nếu có.

### Hiểu Tương Quan

**Hệ Số Tương Quan Pearson:**
Đầu tiên, một số nền tảng. Hệ số tương quan Pearson (thường được ký hiệu là r) là một thước đo để định lượng sức mạnh của mối quan hệ tuyến tính giữa hai biến. Nó cho thấy mức độ mà sự tăng hoặc giảm trong một biến tương quan với sự thay đổi trong biến khác. Các giá trị r nằm trong khoảng từ −1 đến 1. Mỗi đầu của phạm vi cho thấy một tương quan hoàn hảo, trong khi các giá trị gần bằng không cho thấy một phân phối ngẫu nhiên không có tương quan.

**Tương Quan Dương:**
Một giá trị r dương cho thấy một mối quan hệ trực tiếp: khi một biến tăng, biến kia cũng tăng. Khi được vẽ trên biểu đồ phân tán, các điểm dữ liệu đại diện cho mỗi cặp giá trị trong một mối quan hệ trực tiếp sẽ dốc lên từ trái sang phải.

**Tương Quan Âm:**
Một giá trị r âm cho thấy một mối quan hệ nghịch đảo: khi một biến tăng, biến kia giảm. Các chấm đại diện cho một mối quan hệ nghịch đảo sẽ dốc xuống từ trái sang phải trên biểu đồ phân tán.

**Giải Thích Hệ Số Tương Quan:**

| Hệ số tương quan (+/−) | Ý nghĩa có thể có |
|------------------------|-------------------|
| 0 | Không có mối quan hệ |
| 0.1 đến 0.29 | Mối quan hệ yếu |
| 0.3 đến 0.59 | Mối quan hệ vừa phải |
| 0.6 đến 0.99 | Mối quan hệ mạnh đến gần hoàn hảo |
| 1 | Mối quan hệ hoàn hảo |

**Lưu ý:** Các nhà thống kê khác nhau có thể đưa ra các giải thích khác nhau.

### Sử Dụng Hàm corr(Y, X)

Trong ANSI SQL chuẩn và PostgreSQL, chúng ta tính hệ số tương quan Pearson bằng cách sử dụng `corr(Y, X)`. Đây là một trong số các hàm tổng hợp nhị phân trong SQL và được đặt tên như vậy vì các hàm này chấp nhận hai đầu vào.

**Hiểu Y và X:**
- Trong các hàm tổng hợp nhị phân, đầu vào Y là biến phụ thuộc mà sự biến thiên của nó phụ thuộc vào giá trị của biến khác
- X là biến độc lập mà giá trị của nó không phụ thuộc vào biến khác

**Lưu Ý Quan Trọng:** Mặc dù SQL chỉ định các đầu vào Y và X cho hàm `corr()`, các phép tính tương quan không phân biệt giữa biến phụ thuộc và biến độc lập. Việc đổi thứ tự đầu vào trong `corr()` tạo ra kết quả giống nhau. Tuy nhiên, để thuận tiện và dễ đọc, các ví dụ này sắp xếp các biến đầu vào theo biến phụ thuộc và độc lập.

### Ví Dụ: Tương Quan Giáo Dục và Thu Nhập

Chúng ta sẽ sử dụng hàm `corr(Y, X)` để khám phá mối quan hệ giữa trình độ giáo dục và thu nhập:

```sql
SELECT corr(median_hh_income, pct_bachelors_higher)
AS bachelors_income_r
FROM acs_2011_2015_stats;
```

**Kết Quả:** Kết quả của bạn nên là một giá trị r chỉ trên 0.68 được đưa ra như kiểu dữ liệu double precision số thực:
```
bachelors_income_r
------------------
0.682185675451399
```

**Phân Tích:**
- Giá trị r dương này cho thấy khi trình độ giáo dục của một hạt tăng, thu nhập hộ gia đình có xu hướng tăng
- Mối quan hệ không hoàn hảo, nhưng giá trị r cho thấy mối quan hệ khá mạnh
- Chúng ta có thể hình dung mẫu này bằng cách vẽ các biến trên biểu đồ phân tán
- Mỗi điểm dữ liệu đại diện cho một hạt Hoa Kỳ; vị trí của điểm dữ liệu trên trục x cho thấy tỷ lệ phần trăm dân số từ 25 tuổi trở lên có bằng cử nhân trở lên
- Vị trí của điểm dữ liệu trên trục y đại diện cho thu nhập hộ gia đình trung vị của hạt

**Mẫu Hình Ảnh:** Mặc dù hầu hết các điểm dữ liệu được nhóm lại với nhau ở góc dưới bên trái của biểu đồ, chúng thường dốc lên từ trái sang phải. Ngoài ra, các điểm lan ra thay vì tuân theo một đường thẳng nghiêm ngặt. Nếu chúng ở trên một đường thẳng dốc lên từ trái sang phải, giá trị r sẽ là 1, cho thấy một mối quan hệ tuyến tính dương hoàn hảo.

### Kiểm Tra Các Tương Quan Bổ Sung

Bây giờ hãy tính các hệ số tương quan cho các cặp biến còn lại:

```sql
SELECT
    round(
        corr(median_hh_income, pct_bachelors_higher)::numeric, 2
    ) AS bachelors_income_r,
    round(
        corr(pct_travel_60_min, median_hh_income)::numeric, 2
    ) AS income_travel_r,
    round(
        corr(pct_travel_60_min, pct_bachelors_higher)::numeric, 2
    ) AS bachelors_travel_r
FROM acs_2011_2015_stats;
```

**Cách Hoạt Động:**
- Lần này chúng ta sẽ làm cho đầu ra dễ đọc hơn bằng cách làm tròn các giá trị thập phân
- Chúng ta sẽ làm điều này bằng cách bọc hàm `corr(Y, X)` bên trong hàm `round()` của SQL, hàm này nhận hai đầu vào: giá trị số cần được làm tròn và một giá trị nguyên cho biết số chữ số thập phân để làm tròn giá trị đầu tiên
- Nếu tham số thứ hai bị bỏ qua, giá trị được làm tròn đến số nguyên gần nhất
- Vì `corr(Y, X)` trả về một giá trị số thực theo mặc định, chúng ta sẽ thay đổi nó thành kiểu numeric bằng cách sử dụng ký hiệu `::` mà bạn đã học trong Chương 3

**Kết Quả:**
```
bachelors_income_r | income_travel_r | bachelors_travel_r
-------------------|-----------------|-------------------
0.68               | 0.05            | -0.14
```

**Phân Tích:**
- Giá trị `bachelors_income_r` là 0.68, giống như lần chạy đầu tiên của chúng ta nhưng được làm tròn đến hai chữ số thập phân
- So với `bachelors_income_r`, hai tương quan còn lại là yếu
- Giá trị `income_travel_r` cho thấy tương quan giữa thu nhập và tỷ lệ phần trăm những người đi làm hơn một giờ gần như bằng không. Điều này cho thấy thu nhập hộ gia đình trung vị của một hạt ít liên quan đến việc mất bao lâu để mọi người đi làm
- Giá trị `bachelors_travel_r` cho thấy tương quan của bằng cử nhân và đi lại cũng thấp ở mức -0.14. Giá trị âm cho thấy một mối quan hệ nghịch đảo: khi giáo dục tăng, tỷ lệ phần trăm dân số đi lại hơn một giờ giảm. Mặc dù điều này thú vị, một hệ số tương quan gần bằng không như vậy cho thấy một mối quan hệ yếu

### Các Lưu Ý Quan Trọng

Khi kiểm tra tương quan, chúng ta cần lưu ý một số cảnh báo:

1. **Tương quan không ngụ ý nhân quả:** Ngay cả một tương quan mạnh cũng không ngụ ý nhân quả. Chúng ta không thể nói rằng sự thay đổi trong một biến gây ra sự thay đổi trong biến khác, chỉ là các thay đổi di chuyển cùng nhau. Để xác minh, hãy tìm kiếm Google về "tương quan và nhân quả." Nhiều biến tương quan tốt nhưng không có ý nghĩa. (Xem http://www.tylervigen.com/spurious-correlations để xem các ví dụ về tương quan không chứng minh nhân quả, bao gồm tương quan giữa tỷ lệ ly hôn ở Maine và tiêu thụ bơ thực vật.)

2. **Ý nghĩa thống kê:** Các tương quan nên được kiểm tra để xác định xem chúng có ý nghĩa thống kê không. Các kiểm tra đó nằm ngoài phạm vi của cuốn sách này nhưng đáng để tự nghiên cứu.

**Kết Luận:** Tuy nhiên, hàm SQL `corr(Y, X)` là một công cụ tiện lợi để nhanh chóng kiểm tra tương quan giữa các biến.

## Dự Đoán Giá Trị với Phân Tích Hồi Quy

Các nhà nghiên cứu không chỉ muốn hiểu mối quan hệ giữa các biến; họ cũng muốn dự đoán giá trị bằng cách sử dụng dữ liệu có sẵn. Ví dụ, giả sử 30 phần trăm dân số của một hạt có bằng cử nhân trở lên. Với xu hướng trong dữ liệu của chúng ta, chúng ta sẽ mong đợi thu nhập hộ gia đình trung vị của hạt đó là bao nhiêu? Tương tự, đối với mỗi phần trăm tăng trong giáo dục, chúng ta sẽ mong đợi tăng bao nhiêu, trung bình, trong thu nhập?

Chúng ta có thể trả lời cả hai câu hỏi bằng cách sử dụng hồi quy tuyến tính. Nói một cách đơn giản, phương pháp hồi quy tìm phương trình tuyến tính tốt nhất, hoặc đường thẳng, mô tả mối quan hệ giữa một biến độc lập (chẳng hạn như giáo dục) và một biến phụ thuộc (chẳng hạn như thu nhập). ANSI SQL chuẩn và PostgreSQL bao gồm các hàm thực hiện hồi quy tuyến tính.

### Hiểu Hồi Quy Tuyến Tính

Đường thẳng chạy qua giữa tất cả các điểm dữ liệu được gọi là **đường hồi quy bình phương nhỏ nhất**, xấp xỉ "đường phù hợp nhất" cho một đường thẳng mô tả tốt nhất mối quan hệ giữa các biến. Phương trình cho đường hồi quy giống như công thức hệ số góc-giao điểm mà bạn có thể nhớ từ toán học trung học nhưng được viết bằng các biến có tên khác: **Y = bX + a**.

**Các Thành Phần Công Thức:**
- **Y**: Giá trị dự đoán, cũng là giá trị trên trục y, hoặc biến phụ thuộc
- **b**: Hệ số góc của đường thẳng, có thể dương hoặc âm. Nó đo lường bao nhiêu đơn vị giá trị trục y sẽ tăng hoặc giảm cho mỗi đơn vị giá trị trục x
- **X**: Đại diện cho một giá trị trên trục x, hoặc biến độc lập
- **a**: Giao điểm y, giá trị tại đó đường thẳng cắt trục y khi giá trị X bằng không

### Tính Hệ Số Góc và Giao Điểm

Hãy áp dụng công thức này bằng cách sử dụng SQL. Trước đó, chúng ta đã đặt câu hỏi về thu nhập hộ gia đình trung vị dự kiến trong một hạt sẽ là bao nhiêu nếu tỷ lệ phần trăm người có bằng cử nhân trở lên trong hạt đó là 30 phần trăm.

Trong biểu đồ phân tán của chúng ta, tỷ lệ phần trăm với bằng cử nhân nằm dọc theo trục x, được đại diện bởi X trong phép tính. Hãy cắm giá trị đó vào công thức đường hồi quy thay cho X:
```
Y = b(30) + a
```

Để tính Y, đại diện cho thu nhập hộ gia đình trung vị dự đoán, chúng ta cần hệ số góc của đường thẳng, b, và giao điểm y, a. Để có được các giá trị này, chúng ta sẽ sử dụng các hàm SQL `regr_slope(Y, X)` và `regr_intercept(Y, X)`:

```sql
SELECT
    round(
        regr_slope(median_hh_income, pct_bachelors_higher)::numeric, 2
    ) AS slope,
    round(
        regr_intercept(median_hh_income, pct_bachelors_higher)::numeric, 2
    ) AS y_intercept
FROM acs_2011_2015_stats;
```

**Cách Hoạt Động:**
- Sử dụng các biến `median_hh_income` và `pct_bachelors_higher` làm đầu vào cho cả hai hàm, chúng ta sẽ đặt giá trị kết quả của hàm `regr_slope(Y, X)` là `slope` và đầu ra cho hàm `regr_intercept(Y, X)` là `y_intercept`

**Kết Quả:**
```
slope   | y_intercept
--------|------------
926.95  | 27901.15
```

**Phân Tích:**
- Giá trị hệ số góc cho thấy đối với mỗi đơn vị tăng trong tỷ lệ phần trăm bằng cử nhân, chúng ta có thể mong đợi thu nhập hộ gia đình trung vị của một hạt sẽ tăng 926.95. Hệ số góc luôn đề cập đến thay đổi trên một đơn vị của X
- Giá trị y_intercept cho thấy khi đường hồi quy cắt trục y, nơi tỷ lệ phần trăm với bằng cử nhân ở mức 0, giá trị trục y là 27901.15

### Đưa Ra Dự Đoán

Bây giờ hãy cắm cả hai giá trị vào phương trình để có giá trị Y:
```
Y = 926.95(30) + 27901.15
Y = 55709.65
```

**Dự Đoán:** Dựa trên phép tính của chúng ta, trong một hạt mà 30 phần trăm người từ 25 tuổi trở lên có bằng cử nhân trở lên, chúng ta có thể mong đợi thu nhập hộ gia đình trung vị trong hạt đó là khoảng $55.710.

**Lưu Ý Quan Trọng:**
- Tất nhiên, dữ liệu của chúng ta bao gồm các hạt có thu nhập trung vị cao hơn và thấp hơn giá trị dự đoán đó, nhưng chúng ta mong đợi điều này vì các điểm dữ liệu trong biểu đồ phân tán của chúng ta không xếp hàng hoàn hảo dọc theo đường hồi quy
- Nhớ lại rằng hệ số tương quan chúng ta tính được là 0.68, cho thấy một mối quan hệ mạnh nhưng không hoàn hảo giữa giáo dục và thu nhập
- Các yếu tố khác có thể đã góp phần vào sự biến thiên trong thu nhập

## Tìm Hiệu Ứng của Biến Độc Lập với r-squared

Trước đó trong chương, chúng ta đã tính hệ số tương quan, r, để xác định hướng và sức mạnh của mối quan hệ giữa hai biến. Chúng ta cũng có thể tính mức độ mà sự biến thiên trong biến x (độc lập) giải thích sự biến thiên trong biến y (phụ thuộc) bằng cách bình phương giá trị r để tìm hệ số xác định, thường được gọi là **r-squared**.

### Hiểu r-squared

Một giá trị r-squared nằm giữa không và một và cho biết tỷ lệ phần trăm của sự biến thiên được giải thích bởi biến độc lập. Ví dụ, nếu r-squared bằng 0.1, chúng ta sẽ nói rằng biến độc lập giải thích 10 phần trăm sự biến thiên trong biến phụ thuộc, hoặc không nhiều.

### Tính r-squared

Để tìm r-squared, chúng ta sử dụng hàm `regr_r2(Y, X)` trong SQL. Hãy áp dụng nó cho các biến giáo dục và thu nhập của chúng ta:

```sql
SELECT round(
    regr_r2(median_hh_income, pct_bachelors_higher)::numeric, 3
) AS r_squared
FROM acs_2011_2015_stats;
```

**Cách Hoạt Động:**
- Lần này chúng ta sẽ làm tròn đầu ra đến chữ số thập phân thứ ba gần nhất và đặt kết quả là `r_squared`

**Kết Quả:**
```
r_squared
---------
0.465
```

**Phân Tích:**
- Giá trị r-squared là 0.465 cho thấy khoảng 47 phần trăm sự biến thiên trong thu nhập hộ gia đình trung vị trong một hạt có thể được giải thích bởi tỷ lệ phần trăm người có bằng cử nhân trở lên trong hạt đó
- Điều gì giải thích 53 phần trăm còn lại của sự biến thiên trong thu nhập hộ gia đình? Bất kỳ số yếu tố nào cũng có thể giải thích phần còn lại của sự biến thiên, và các nhà thống kê thường sẽ kiểm tra nhiều kết hợp biến để xác định chúng là gì

### Các Cân Nhắc Quan Trọng

Nhưng trước khi bạn sử dụng những con số này trong tiêu đề hoặc bài thuyết trình, đáng để xem lại các điểm sau:

1. **Tương quan không chứng minh nhân quả:** Để xác minh, hãy tìm kiếm Google về "tương quan và nhân quả." Nhiều biến tương quan tốt nhưng không có ý nghĩa. (Xem http://www.tylervigen.com/spurious-correlations để xem các ví dụ về tương quan không chứng minh nhân quả, bao gồm tương quan giữa tỷ lệ ly hôn ở Maine và tiêu thụ bơ thực vật.) Các nhà thống kê thường thực hiện kiểm tra ý nghĩa trên kết quả để đảm bảo các giá trị không chỉ đơn giản là kết quả của tính ngẫu nhiên.

2. **Cần kiểm tra bổ sung:** Các nhà thống kê cũng áp dụng các kiểm tra bổ sung cho dữ liệu trước khi chấp nhận kết quả của phân tích hồi quy, bao gồm việc các biến có tuân theo phân phối đường cong chuông chuẩn và đáp ứng các tiêu chí khác cho một kết quả hợp lệ không.

**Kết Luận:** Với các yếu tố này, các hàm thống kê SQL hữu ích như một cuộc khảo sát sơ bộ về dữ liệu của bạn trước khi thực hiện phân tích nghiêm ngặt hơn. Nếu công việc của bạn liên quan đến thống kê, một nghiên cứu đầy đủ về thực hiện hồi quy là đáng giá.

## Tạo Xếp Hạng với SQL

Xếp hạng thường xuất hiện trên tin tức. Bạn sẽ thấy chúng được sử dụng ở bất cứ đâu từ bảng xếp hạng phòng vé cuối tuần đến bảng xếp hạng giải đấu của đội thể thao. Bạn đã học cách sắp xếp kết quả truy vấn dựa trên giá trị trong một cột, nhưng SQL cho phép bạn đi xa hơn và tạo xếp hạng có số. Xếp hạng hữu ích cho phân tích dữ liệu theo nhiều cách, chẳng hạn như theo dõi thay đổi theo thời gian nếu bạn có dữ liệu trong nhiều năm. Bạn cũng có thể đơn giản sử dụng xếp hạng như một sự thật trong một báo cáo. Hãy khám phá cách tạo xếp hạng bằng cách sử dụng SQL.

### Hiểu Các Hàm Cửa Sổ

ANSI SQL chuẩn bao gồm một số hàm xếp hạng, nhưng chúng ta sẽ chỉ tập trung vào hai: `rank()` và `dense_rank()`. Cả hai đều là **các hàm cửa sổ**, thực hiện các phép tính trên các tập hợp hàng chúng ta chỉ định bằng cách sử dụng mệnh đề OVER. Không giống như các hàm tổng hợp, nhóm các hàng trong khi tính kết quả, các hàm cửa sổ hiển thị kết quả cho mỗi hàng trong bảng.

### Xếp Hạng với rank() và dense_rank()

Sự khác biệt giữa `rank()` và `dense_rank()` là cách chúng xử lý giá trị xếp hạng tiếp theo sau một trận hòa: `rank()` bao gồm một khoảng trống trong thứ tự xếp hạng, nhưng `dense_rank()` thì không. Khái niệm này dễ hiểu hơn trong thực tế, vì vậy hãy xem một ví dụ.

**Ví Dụ: Các Công Ty Widget**

Hãy xem xét một nhà phân tích Phố Wall theo dõi thị trường sản xuất widget cạnh tranh cao. Nhà phân tích muốn xếp hạng các công ty theo sản lượng hàng năm:

```sql
CREATE TABLE widget_companies (
    id bigserial,
    company varchar(30) NOT NULL,
    widget_output integer NOT NULL
);

INSERT INTO widget_companies (company, widget_output)
VALUES
('Morse Widgets', 125000),
('Springfield Widget Masters', 143000),
('Best Widgets', 196000),
('Acme Inc.', 133000),
('District Widget Inc.', 201000),
('Clarke Amalgamated', 620000),
('Stavesacre Industries', 244000),
('Bowers Widget Emporium', 201000);

SELECT
    company,
    widget_output,
    rank() OVER (ORDER BY widget_output DESC),
    dense_rank() OVER (ORDER BY widget_output DESC)
FROM widget_companies;
```

**Cách Hoạt Động:**
- Lưu ý cú pháp trong câu lệnh SELECT bao gồm `rank()` và `dense_rank()`
- Sau tên hàm, chúng ta sử dụng mệnh đề OVER và trong ngoặc đơn đặt một biểu thức chỉ định "cửa sổ" các hàng mà hàm sẽ hoạt động
- Trong trường hợp này, chúng ta muốn cả hai hàm hoạt động trên tất cả các hàng của cột `widget_output`, được sắp xếp theo thứ tự giảm dần

**Kết Quả:**
```
company                    | widget_output | rank | dense_rank
---------------------------|---------------|------|----------
Clarke Amalgamated         | 620000        | 1    | 1
Stavesacre Industries      | 244000        | 2    | 2
Bowers Widget Emporium     | 201000        | 3    | 3
District Widget Inc.       | 201000        | 3    | 3
Best Widgets              | 196000        | 5    | 4
Springfield Widget Masters | 143000        | 6    | 5
Acme Inc.                  | 133000        | 7    | 6
Morse Widgets              | 125000        | 8    | 7
```

**Hiểu Sự Khác Biệt:**
- Các cột được tạo bởi các hàm `rank()` và `dense_rank()` hiển thị xếp hạng của mỗi công ty dựa trên giá trị `widget_output` từ cao xuống thấp, với Clarke Amalgamated ở vị trí số một
- Để xem `rank()` và `dense_rank()` khác nhau như thế nào, hãy kiểm tra hàng thứ năm, Best Widgets
- Với `rank()`, Best Widgets là công ty xếp hạng cao thứ năm, cho thấy có bốn công ty có sản lượng nhiều hơn và không có công ty nào xếp hạng ở vị trí thứ tư, vì `rank()` cho phép một khoảng trống trong thứ tự khi xảy ra trận hòa
- Ngược lại, `dense_rank()`, không cho phép khoảng trống trong thứ tự xếp hạng, phản ánh thực tế rằng Best Widgets có số sản lượng cao thứ tư bất kể có bao nhiêu công ty sản xuất nhiều hơn. Do đó, Best Widgets xếp hạng ở vị trí thứ tư bằng cách sử dụng `dense_rank()`

**Khuyến Nghị:** Cả hai cách xử lý trận hòa đều có giá trị, nhưng trong thực tế `rank()` được sử dụng thường xuyên nhất. Đây cũng là điều tôi khuyên dùng, vì nó phản ánh chính xác hơn tổng số công ty được xếp hạng, được thể hiện bởi thực tế rằng Best Widgets có bốn công ty phía trước nó trong tổng sản lượng, không phải ba.

### Xếp Hạng Trong Các Nhóm Con với PARTITION BY

Xếp hạng chúng ta vừa làm là một xếp hạng tổng thể đơn giản dựa trên sản lượng widget. Nhưng đôi khi bạn sẽ muốn tạo xếp hạng trong các nhóm hàng trong một bảng. Ví dụ, bạn có thể muốn xếp hạng nhân viên chính phủ theo mức lương trong mỗi bộ phận hoặc xếp hạng phim theo doanh thu phòng vé trong mỗi thể loại.

Để sử dụng các hàm cửa sổ theo cách này, chúng ta sẽ thêm PARTITION BY vào mệnh đề OVER. Mệnh đề PARTITION BY chia các hàng bảng theo giá trị trong một cột chúng ta chỉ định.

**Ví Dụ: Doanh Số Cửa Hàng Theo Danh Mục**

Đây là một ví dụ sử dụng dữ liệu giả về các cửa hàng tạp hóa:

```sql
CREATE TABLE store_sales (
    store varchar(30),
    category varchar(30) NOT NULL,
    unit_sales bigint NOT NULL,
    CONSTRAINT store_category_key PRIMARY KEY (store, category)
);

INSERT INTO store_sales (store, category, unit_sales)
VALUES
('Broders', 'Cereal', 1104),
('Wallace', 'Ice Cream', 1863),
('Broders', 'Ice Cream', 2517),
('Cramers', 'Ice Cream', 2112),
('Broders', 'Beer', 641),
('Cramers', 'Cereal', 1003),
('Cramers', 'Beer', 640),
('Wallace', 'Cereal', 980),
('Wallace', 'Beer', 988);

SELECT
    category,
    store,
    unit_sales,
    rank() OVER (PARTITION BY category ORDER BY unit_sales DESC)
FROM store_sales;
```

**Cách Hoạt Động:**
- Trong bảng, mỗi hàng bao gồm danh mục sản phẩm của cửa hàng và doanh số cho danh mục đó
- Câu lệnh SELECT cuối cùng tạo một tập kết quả cho thấy doanh số của mỗi cửa hàng xếp hạng như thế nào trong mỗi danh mục
- Yếu tố mới là việc thêm PARTITION BY vào mệnh đề OVER
- Trên thực tế, mệnh đề này nói với chương trình tạo xếp hạng từng danh mục một, sử dụng doanh số đơn vị của cửa hàng theo thứ tự giảm dần

**Kết Quả:**
```
category  | store    | unit_sales | rank
----------|----------|------------|------
Beer      | Wallace  | 988        | 1
Beer      | Broders  | 641        | 2
Beer      | Cramers  | 640        | 3
Cereal    | Broders  | 1104       | 1
Cereal    | Cramers  | 1003       | 2
Cereal    | Wallace  | 980        | 3
Ice Cream | Broders  | 2517       | 1
Ice Cream | Cramers  | 2112       | 2
Ice Cream | Wallace  | 1863       | 3
```

**Phân Tích:**
- Lưu ý rằng tên danh mục được sắp xếp và nhóm trong cột danh mục như kết quả của PARTITION BY trong mệnh đề OVER
- Các hàng cho mỗi danh mục được sắp xếp theo doanh số đơn vị danh mục với cột xếp hạng hiển thị xếp hạng
- Sử dụng bảng này, chúng ta có thể thấy ngay cách mỗi cửa hàng xếp hạng trong một danh mục thực phẩm. Ví dụ, Broders dẫn đầu doanh số cho ngũ cốc và kem, nhưng Wallace thắng trong danh mục bia

**Ứng Dụng Khác:** Bạn có thể áp dụng khái niệm này cho nhiều tình huống khác: ví dụ, đối với mỗi nhà sản xuất ô tô, tìm phương tiện có nhiều khiếu nại của người tiêu dùng nhất; tìm ra tháng nào có lượng mưa nhiều nhất trong mỗi năm trong số 20 năm qua; tìm đội có nhiều chiến thắng nhất chống lại các tay ném tay trái; và vân vân.

**Lưu Ý:** SQL cung cấp các hàm cửa sổ bổ sung. Kiểm tra tài liệu PostgreSQL chính thức tại https://www.postgresql.org/docs/current/static/tutorial-window.html để xem tổng quan về các hàm cửa sổ, và kiểm tra https://www.postgresql.org/docs/current/static/functions-window.html để xem danh sách các hàm cửa sổ.

## Tính Tỷ Lệ cho So Sánh Có Ý Nghĩa

Mặc dù hữu ích và thú vị, xếp hạng dựa trên số đếm thô không phải lúc nào cũng có ý nghĩa; trên thực tế, chúng có thể gây hiểu lầm.

### Vấn Đề với Số Đếm Thô

Hãy xem xét ví dụ này về thống kê tội phạm: theo Cục Điều tra Liên bang Hoa Kỳ (FBI), vào năm 2015, Thành phố New York báo cáo khoảng 130.000 tội phạm tài sản, bao gồm trộm cắp, trộm cắp, trộm xe cơ giới và phóng hỏa. Trong khi đó, Chicago báo cáo khoảng 80.000 tội phạm tài sản cùng năm.

Vậy, bạn có nhiều khả năng gặp rắc rối ở Thành phố New York, phải không? Không nhất thiết. Vào năm 2015, Thành phố New York có hơn 8 triệu cư dân, trong khi Chicago có 2,7 triệu. Với bối cảnh đó, chỉ so sánh tổng số tội phạm tài sản ở hai thành phố không có ý nghĩa lắm.

### Giải Pháp: Tính Tỷ Lệ

Một cách chính xác hơn để so sánh những con số này là biến chúng thành tỷ lệ. Các nhà phân tích thường tính tỷ lệ trên 1.000 người, hoặc một bội số của con số đó, để so sánh công bằng. Đối với tội phạm tài sản trong ví dụ này, phép toán đơn giản: chia số vụ vi phạm cho dân số và sau đó nhân thương số đó với 1.000.

**Công Thức:**
```
(Số vụ vi phạm / Dân số) × 1.000 = Tỷ lệ trên 1.000 người
```

**Ví Dụ:** Nếu một thành phố có 80 vụ trộm xe và dân số 15.000, bạn có thể tính tỷ lệ trộm xe trên 1.000 người như sau:
```
(80 / 15.000) × 1.000 = 5,3 vụ trộm xe trên một nghìn cư dân
```

### Tạo Bảng Dữ Liệu Tội Phạm FBI

Đây là phép toán dễ dàng với SQL, vì vậy hãy thử nó bằng cách sử dụng dữ liệu cấp thành phố được biên soạn từ báo cáo Tội phạm ở Hoa Kỳ năm 2015 của FBI:

```sql
CREATE TABLE fbi_crime_data_2015 (
    st varchar(20),
    city varchar(50),
    population integer,
    violent_crime integer,
    property_crime integer,
    burglary integer,
    larceny_theft integer,
    motor_vehicle_theft integer,
    CONSTRAINT st_city_key PRIMARY KEY (st, city)
);

COPY fbi_crime_data_2015
FROM 'C:\YourDirectory\fbi_crime_data_2015.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ',');

SELECT * FROM fbi_crime_data_2015
ORDER BY population DESC;
```

**Điểm Chính:**
- Bảng `fbi_crime_data_2015` bao gồm bang, tên thành phố và dân số cho thành phố đó
- Tiếp theo là số tội phạm được báo cáo bởi cảnh sát trong các danh mục, bao gồm tội phạm bạo lực, trộm xe và tội phạm tài sản

### Tính Tỷ Lệ Tội Phạm Tài Sản

Để tính tội phạm tài sản trên 1.000 người trong các thành phố có hơn 500.000 người và sắp xếp chúng:

```sql
SELECT
    city,
    st,
    population,
    property_crime,
    round(
        (property_crime::numeric / population) * 1000, 1
    ) AS pc_per_1000
FROM fbi_crime_data_2015
WHERE population >= 500000
ORDER BY (property_crime::numeric / population) DESC;
```

**Cách Hoạt Động:**
- Trong Chương 5, bạn đã học rằng khi chia một số nguyên cho một số nguyên, một trong các giá trị phải là numeric hoặc decimal để kết quả bao gồm các chữ số thập phân
- Chúng ta làm điều đó trong phép tính tỷ lệ với ký hiệu dấu hai chấm đôi của PostgreSQL
- Vì chúng ta không cần thấy nhiều chữ số thập phân, chúng ta bọc câu lệnh trong hàm `round()` để làm tròn đầu ra đến phần mười gần nhất
- Sau đó chúng ta đặt tên cột được tính là `pc_per_1000` để dễ tham chiếu

**Kết Quả:**
```
city          | st          | population | property_crime | pc_per_1000
--------------|-------------|------------|----------------|------------
Tucson        | Arizona     | 529675     | 35185          | 66.4
San Francisco | California  | 863782     | 53019          | 61.4
Albuquerque   | New Mexico  | 559721     | 33993          | 60.7
Memphis       | Tennessee   | 657936     | 37047          | 56.3
Seattle       | Washington  | 683700     | 37754          | 55.2
--snip--
El Paso       | Texas       | 686077     | 13133          | 19.1
New York      | New York    | 8550861    | 129860         | 15.2
```

**Phân Tích:**
- Tucson, Arizona, có tỷ lệ tội phạm tài sản cao nhất, tiếp theo là San Francisco, California
- Ở cuối là Thành phố New York, với tỷ lệ bằng một phần tư của Tucson
- Nếu chúng ta đã so sánh các thành phố chỉ dựa trên số tội phạm tài sản thô, chúng ta sẽ có một kết quả khác xa so với kết quả chúng ta rút ra bằng cách tính tỷ lệ trên một nghìn

### Các Lưu Ý Quan Trọng

Tôi sẽ thiếu sót nếu không chỉ ra rằng trang web FBI tại https://ucr.fbi.gov/ucr-statistics-their-proper-use/ không khuyến khích tạo xếp hạng từ dữ liệu tội phạm của họ, nói rằng làm như vậy tạo ra "nhận thức sai lệch ảnh hưởng xấu đến các thực thể địa lý và cư dân của chúng." Họ chỉ ra rằng sự biến thiên trong tội phạm và tỷ lệ tội phạm trên khắp đất nước thường do một số yếu tố từ mật độ dân số đến điều kiện kinh tế và thậm chí cả khí hậu. Ngoài ra, dữ liệu tội phạm của FBI có những thiếu sót được ghi nhận rõ ràng, bao gồm báo cáo không đầy đủ của các cơ quan cảnh sát.

**Kết Luận:** Điều đó nói rằng, việc hỏi tại sao một địa phương có tỷ lệ tội phạm cao hơn hoặc thấp hơn những địa phương khác vẫn đáng theo đuổi, và tỷ lệ cung cấp một số thước đo so sánh bất chấp những hạn chế nhất định.

## Tóm Tắt

Điều đó kết thúc việc khám phá các hàm thống kê trong SQL, xếp hạng và tỷ lệ. Bây giờ bộ công cụ phân tích SQL của bạn bao gồm các cách để tìm mối quan hệ giữa các biến bằng cách sử dụng các hàm thống kê, tạo xếp hạng từ dữ liệu được sắp xếp và so sánh đúng các số thô bằng cách biến chúng thành tỷ lệ. Bộ công cụ đó đang bắt đầu trông ấn tượng!

### Các Khái Niệm Chính Đã Bao Gồm

- **Tương quan**: Sử dụng `corr(Y, X)` để đo lường mối quan hệ giữa các biến
- **Hồi quy tuyến tính**: Sử dụng `regr_slope(Y, X)` và `regr_intercept(Y, X)` để dự đoán giá trị
- **R-squared**: Sử dụng `regr_r2(Y, X)` để đo lường bao nhiêu sự biến thiên được giải thích
- **Xếp hạng**: Sử dụng các hàm cửa sổ `rank()` và `dense_rank()`
- **PARTITION BY**: Xếp hạng trong các nhóm con
- **Tỷ lệ**: Tính tỷ lệ trên 1.000 để so sánh có ý nghĩa

### Thực Hành Tốt Nhất

1. ✅ Hiểu tương quan vs. nhân quả
2. ✅ Sử dụng tương quan như phân tích sơ bộ, không phải kết luận cuối cùng
3. ✅ Cân nhắc kiểm tra ý nghĩa thống kê
4. ✅ Sử dụng `rank()` cho hầu hết các tình huống xếp hạng
5. ✅ Sử dụng PARTITION BY cho xếp hạng trong các nhóm
6. ✅ Tính tỷ lệ thay vì so sánh số đếm thô
7. ✅ Làm tròn các giá trị tương quan và hồi quy để dễ đọc
8. ✅ Thận trọng khi giải thích kết quả thống kê

### Các Mẫu Thường Gặp

**Tương quan:**
```sql
SELECT corr(dependent_var, independent_var) AS correlation
FROM table_name;
```

**Hồi quy:**
```sql
SELECT 
    regr_slope(Y, X) AS slope,
    regr_intercept(Y, X) AS y_intercept,
    regr_r2(Y, X) AS r_squared
FROM table_name;
```

**Xếp hạng:**
```sql
SELECT column, rank() OVER (ORDER BY value_column DESC)
FROM table_name;
```

**Xếp hạng trong các nhóm:**
```sql
SELECT category, value, rank() OVER (PARTITION BY category ORDER BY value DESC)
FROM table_name;
```

**Tính tỷ lệ:**
```sql
SELECT 
    city,
    round((crimes::numeric / population) * 1000, 1) AS rate_per_1000
FROM table_name
WHERE population >= threshold;
```

### Khi Nào Sử Dụng Mỗi Hàm

**corr(Y, X):**
- Khi bạn muốn đo lường sức mạnh mối quan hệ
- Để khám phá dữ liệu sơ bộ
- Để xác định các biến đáng phân tích thêm

**regr_slope(Y, X) / regr_intercept(Y, X):**
- Khi bạn muốn dự đoán giá trị
- Để hiểu Y thay đổi bao nhiêu trên mỗi đơn vị của X
- Để tạo mô hình hồi quy

**regr_r2(Y, X):**
- Để đo lường bao nhiêu sự biến thiên được giải thích
- Để đánh giá độ phù hợp mô hình
- Để so sánh các mô hình khác nhau

**rank() / dense_rank():**
- Khi bạn cần xếp hạng có số
- Để tạo bảng xếp hạng
- Để theo dõi thay đổi theo thời gian

**PARTITION BY:**
- Khi xếp hạng trong các danh mục
- Để so sánh các mục trong các nhóm
- Để tìm những người biểu diễn hàng đầu theo danh mục

**Tỷ lệ:**
- Khi so sánh các quần thể có kích thước khác nhau
- Để chuẩn hóa dữ liệu cho so sánh công bằng
- Để so sánh thống kê có ý nghĩa

## Các Bước Tiếp Theo

Tiếp theo, chúng ta sẽ đi sâu hơn vào dữ liệu ngày và giờ, sử dụng các hàm SQL để trích xuất thông tin chúng ta cần.
