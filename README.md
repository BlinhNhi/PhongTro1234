# Dự Án Phongtro123 
Là 1 dự án được phát triển từ React JS , Node Js , My SQL.
Dự Án Phongtro123 được phát triển để kết nối người thuê và chủ nhà trọ có thể tìm kiếm nhà thuê dễ dàng hơn .  Với Phongtro123 người cho thuê có thể tạo bài viết , quản lý bài viết .
Người thuê có thể liên hệ chủ trọ thuê nhà 1 cách dễ dàng.
Nếu bạn thấy đồ án của tôi hay , hãy cho tôi 1  ⭐ trên Github nhé !!

## Các Bước Chạy Chương Trình
- Cài Đặt IDE( Visual Studio Code , Laragon,Postman...)
- Cài Đặt Node JS
- Backend ()
  - Installation Laragon (or XAMPP,...)
    ```bash
    Cài Đặt MySql
    Tạo 1 tài khoản và chạy SQL Server và chạy trên dịch vụ của Chorme hoặc Windown.
    Tạo 1 database có tên là  "phongtro123".
    Mở terminal của Visual Studio Code nhập lệnh cd server -> cd src -> npx sequelize db:migrate để tạo bảng trong database.
    Mở Postman Chọn method Post : nhập đường dẫn : http://localhost:5000/api/v1/insert -> chọn send để có thể tạo data cho database.
    ```
  - Frontend ()
  - Website:
    - Cài Đặt NodeJS
    - Cài Đặt dependencies
      ```bash
      $ npm i
      $ npm start
      ```
  ## Chức Năng :
      - Đăng Nhập , Đăng Xuất vào hệ thông với authentication , mã hoá password
      - Quản Lý Bài Đăng ,  Sửa Thông Tin Cá Nhân
      - Tìm Kiếm bằng cách lọc theo Khu vực , Giá , Diện tích
      - View của tất cả bài viết của những người cho thuê
      -   …
  
  ## Công Nghệ:

       -   MySql - Là 1 hệ thống quản lý data .
       -   Node JS : là một nền tảng được xây dựng trên V8 JavaScript Engine – trình thông dịch thực thi mã JavaScript.
       -   ReactJS - là thư viện JavaScript phổ biến nhất để xây dựng giao diện người dùng (UI).
       -   Redux - là một predictable state management tool cho các ứng dụng Javascript. Nó giúp bạn viết các ứng dụng hoạt động một cách nhất quán,
           chạy trong các môi trường khác nhau (client, server, and native) và dễ dàng để test.
       -   Cloudinary : là 1 thư viện hỗ trợ lưu trữ hình ảnh , bên thứ 3
  ## Screenshots:
  - WEBSITE:
    <h3>Login Page:</h3>
    <img src="https://github.com/user-attachments/assets/61b92561-de83-4a43-80f9-adf09af0e457" width="700px" height="400px" alt="Login">

    <h3>Register Page:</h3>
    <img src="https://github.com/user-attachments/assets/2e6cf873-cc87-4fa7-a26f-46a69b0db021" width="700px" height="400px" alt="Register">

     <h3>Trang Quản Lý Tin:</h3>
    <img src="https://github.com/user-attachments/assets/eca3ed49-f81d-4c5c-86ad-960fb4ce87bb" width="700px" height="400px" alt="Manager New">

     <h3>Trang Chủ:</h3>
    <img src="https://github.com/user-attachments/assets/758c655b-4e2c-4b4c-be1e-735c39c028ab" width="700px" height="400px" alt="Home">

    
    <h3>Tìm Kiếm , Lọc Bài viết:</h3>
    <img src="https://github.com/user-attachments/assets/142f2a16-f710-4eb1-843a-42f03edeeafa" width="700px" height="400px" alt="Home">
