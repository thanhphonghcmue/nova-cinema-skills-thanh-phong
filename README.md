# NOVA Cinema — INFINITY

Giao diện trang chủ đặt vé điện ảnh xây dựng bằng React, Framer Motion và Lucide React.

## Chạy dự án

Chạy các lệnh **trong cùng thư mục có `index.html`, `package.json` và `src/MainShowcase.jsx`**:

```bash
npm install
npm run dev
```

Sau đó mở địa chỉ Vite in ra trong terminal (mặc định là `http://localhost:5173`). Không tạo thêm một dự án Vite bên trong thư mục này.

## Kết nối `MainShowcase`

`src/App.jsx` đã import trực tiếp component:

```jsx
import MainShowcase from './MainShowcase.jsx';

export default function App() {
  return <main><MainShowcase /></main>;
}
```

Styles dùng chung nằm trong `src/styles.css` và được import một lần từ `src/main.jsx`. Component tự quản lý trạng thái tuần tự của quy trình đặt vé: đổi rạp sẽ đặt lại phim/ngày/suất, còn đổi phim sẽ đặt lại ngày/suất.

## Nếu trình duyệt chỉ hiện trang trắng

Ảnh lỗi cho thấy có **hai cấp `package.json` và hai thư mục `node_modules`**, trong khi thư mục `src` đang chạy không có `MainShowcase.jsx`. Khi Vite được chạy ở cấp ngoài nhưng mã nguồn lại nằm ở cấp trong (hoặc ngược lại), entry point đúng sẽ không được nạp.

1. Dừng mọi Vite server đang chạy.
2. Trong terminal, `cd` đến thư mục chứa đồng thời `index.html`, `package.json`, `vite.config.js` và thư mục `src`.
3. Xác nhận `src` chứa đủ `App.jsx`, `MainShowcase.jsx`, `main.jsx` và `styles.css`.
4. Chỉ giữ một cấp dự án; xóa thư mục dự án lồng nhau nếu đã vô tình chạy `npm create vite` hai lần.
5. Chạy lại `npm install && npm run dev`, rồi hard refresh trình duyệt.

`src/main.jsx` có màn hình chẩn đoán khởi động. Nếu import component hoặc dependency thất bại, trang sẽ hiển thị thông báo lỗi cụ thể thay vì một màn hình trắng.

## Cách dễ nhất trên Windows

Sau khi tải **Download ZIP** từ GitHub và giải nén, nhấp đúp `start-nova.bat`. Script luôn chuyển terminal về đúng thư mục dự án, kiểm tra `MainShowcase.jsx`, tự cài dependency khi cần và sau đó khởi động Vite.

Bạn cũng có thể chạy `npm run doctor` trước khi chạy ứng dụng. Lệnh này kiểm tra phiên bản Node, các file bắt buộc và cảnh báo nếu phát hiện một project `package.json` khác bị lồng bên trong.
