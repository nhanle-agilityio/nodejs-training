# Chương 14: Thiết kế Sai—Những điều Không nên làm

**Nguồn:** *Database Design for Mere Mortals*, Ấn bản kỷ niệm 25 năm (Phiên bản thứ tư)  
**Tác giả:** Michael J. Hernandez  
**Nhà xuất bản:** Pearson Education

---

*"Sai lầm luôn là điểm khởi đầu."*  
—CESARE PAVESE

---

## Các chủ đề trong chương này

- Thiết kế Flat-File
- Thiết kế Kiểu Bảng tính
- Đối phó Tư duy Bảng tính
- Thiết kế Dựa trên Phần mềm Cơ sở Dữ liệu
- Suy nghĩ Cuối cùng
- Tóm tắt

---

## Tại sao chương này ở cuối sách

Bạn có thể đánh giá đúng nguy hiểm của cơ sở dữ liệu thiết kế kém khi đã học cách thiết kế đúng. Bạn có thể tự xác định tại sao thiết kế cụ thể sai—nhìn vào thiết kế và nhận ra vấn đề cấu trúc ngay. Bạn cũng có kiến thức cần thiết để tìm giải pháp. Trong chương này bạn sẽ thấy **ba cách tiếp cận thiết kế phổ biến nhất** dẫn đến cơ sở dữ liệu cấu trúc kém. Cách sửa cơ sở dữ liệu thiết kế sai: đưa qua **quy trình thiết kế hoàn chỉnh** bạn vừa học.

---

## Thiết kế "Flat-File"

Thiết kế flat-file (còn gọi "ném-tất-cả-vào-một-bảng-lớn") tồn tại nhiều năm và phổ biến trong cơ sở dữ liệu thiết kế cho hệ thống không quan hệ.

**Các vấn đề:**
- **Trường đa phần:** SALES REP NAME gồm tên và họ; CUSTOMER ADDRESS gồm đường, thành phố, bang, ZIP
- **Trường tính toán:** ORDER AMOUNT; ITEM # EXTENSION (số lượng × giá)
- **Trường trùng không cần thiết:** ITEM 1, ITEM 2, ITEM 3; tương tự cho QUANTITY, PRICE
- **Không có khóa chính thực:** ORDER NUMBER có thể lặp nếu khách đặt hơn ba mặt hàng
- **Bảng đại diện nhiều chủ đề:** Khách hàng, đơn hàng, mặt hàng (và đại diện bán hàng)

**Kết quả:** Dữ liệu dư thừa, không nhất quán; thiếu tính toàn vẹn dữ liệu. **Tránh hoàn toàn.**

---

## Thiết kế Kiểu Bảng tính

Bảng tính là công cụ tốt cho tính toán phức tạp và phân tích thống kê. Trái với quan niệm phổ biến, **bảng tính không phải cơ sở dữ liệu quan hệ tốt**. Nếu tổ chức cần thu thập, lưu trữ, duy trì và thao tác dữ liệu—dùng đúng công cụ: thiết kế và triển khai cơ sở dữ liệu thực.

**Vấn đề khi dùng bảng tính làm "cơ sở dữ liệu":**
- **Trường trùng:** Mỗi instance lặp STORE NUMBER, MANAGER NAME, ASSISTANT MANAGER NAME
- **Trường đa phần:** Ô lưu số cửa hàng + số điện thoại; tên + họ quản lý
- **Trường đa trị:** ASSISTANT MANAGER có thể có nhiều giá trị cho mỗi cửa hàng
- **Khó sử dụng:** Tác vụ dữ liệu dễ trong RDBMS lại tẻ nhạt trong bảng tính

**Giải pháp:** Tách dữ liệu khỏi bảng tính; đưa qua quy trình thiết kế cơ sở dữ liệu đầy đủ; triển khai trong RDBMS phù hợp.

---

## Đối phó Tư duy Bảng tính

Khi chuyển sang cơ sở dữ liệu và RDBMS thực, bạn phải **phá bỏ tư duy bảng tính**. Một số cách xem dữ liệu (layout bảng tính điển hình) không còn có sẵn. Bảng tính lưu dữ liệu đúng như bạn thấy trên báo cáo; cơ sở dữ liệu lưu trong các trường chuẩn hóa. Báo cáo từ cơ sở dữ liệu trình bày khác nhưng rõ như nhau.

**Điểm cần nhớ:** Bạn phải điều chỉnh cách nghĩ về làm việc với dữ liệu. Cơ sở dữ liệu thực là **tài nguyên chia sẻ**—mọi người có quyền truy cập cùng dữ liệu độc lập; mọi người nhận cùng tập giá trị. Khác với bảng tính, nơi "bản master" nằm trên máy một người và người khác cố đồng bộ bản sao. Cơ sở dữ liệu cho kiểm soát tốt hơn về tính toàn vẹn, nhất quán và hợp lệ; cung cấp nhiều cách truy xuất.

---

## Thiết kế Dựa trên Phần mềm Cơ sở Dữ liệu

**RDBMS không cung cấp cơ sở, quy trình hay lý do** để thiết kế cơ sở dữ liệu theo cách cụ thể—chỉ cung cấp **công cụ** triển khai. Phương pháp thiết kế chính thức cung cấp **nguyên lý và lý luận** cần thiết để định nghĩa cơ sở dữ liệu đúng và hiệu quả.

Nhiều người vô tình **thiết kế cơ sở dữ liệu chỉ dựa trên RDBMS** họ sẽ dùng—thường vì đã quen với phần mềm đó hoặc tổ chức đang dùng. Đây là cách tiếp cận không khôn ngoan. Các vấn đề:

- **Quyết định dựa trên nhận thức** khả năng RDBMS—vd: không áp mức độ tham gia vì nghĩ RDBMS không hỗ trợ
- **RDBMS chi phối thiết kế** thay vì thiết kế từ yêu cầu thông tin; xảy ra khi RDBMS hỗ trợ hạn chế đặc tả trường, đặc điểm mối quan hệ
- **Giới hạn bởi kiến thức**—vd: không triển khai đặc điểm mối quan hệ vì không biết làm
- **Giới hạn bởi kỹ năng**—ảnh hưởng hiệu quả triển khai

**Kết quả:** Cấu trúc sai, tính toàn vẹn không đủ, dữ liệu không nhất quán, thông tin sai. Tạo cơ sở dữ liệu trong RDBMS có thể dễ một cách sai lầm—bạn có thể có cơ sở dữ liệu "chạy" nhưng thiết kế kém mà không biết. RDBMS bạn quen có thể không phù hợp yêu cầu tổ chức.

**Thực hành tốt:** Luôn thiết kế **cấu trúc logic cơ sở dữ liệu không quan tâm bất kỳ RDBMS nào**. Bằng cách đó, bạn có xu hướng thiết kế cấu trúc vững chắc vì tập trung vào yêu cầu thông tin. Sau khi thiết kế hoàn thành, xác định rõ cách triển khai (ứng dụng đơn người dùng, client/server, web, v.v.) và RDBMS nào dùng.

---

## Suy nghĩ Cuối cùng

Qua năm dạy thiết kế cơ sở dữ liệu, tôi quan sát: Người quen với **nguyên lý cơ bản thiết kế đúng** **hiểu RDBMS và công cụ của nó tốt hơn** người ít hoặc không biết thiết kế cơ sở dữ liệu. Tôi tin vì họ hiểu *tại sao* RDBMS cung cấp công cụ nhất định và *cách* (nên) sử dụng. Vì lý do này—và nhiều lý do khác trong sách—học và hiểu kỹ thuật thiết kế cơ sở dữ liệu tốt là lợi thế rõ ràng. Cuốn sách không vạch con đường duy nhất, nhưng là một con đường thẳng, chắc chắn và dễ đi.

---

## Tóm tắt

Chương đối chiếu thiết kế cơ sở dữ liệu quan hệ với các định dạng thiết kế yếu hơn. Thiết kế flat-file có nhiều vấn đề nghiêm trọng—tránh hoàn toàn. Thiết kế bảng tính rất hạn chế. Thiết kế quanh RDBMS phụ thuộc nguy hiểm vào sự quen thuộc và kỹ năng với phần mềm; không cung cấp nguyên lý và lý luận. Trong ngắn hạn sản phẩm phần mềm có vẻ tốt, nhưng không hoạt động tốt lâu dài bằng phương pháp thiết kế trong sách này.
