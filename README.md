# NOVA Cinema — INFINITY

Giao diện trang chủ đặt vé điện ảnh xây dựng bằng React, Framer Motion và Lucide React.

## Chạy dự án

```bash
npm install
npm run dev
```

## Kết nối `MainShowcase`

`src/App.jsx` đã import trực tiếp component:

```jsx
import MainShowcase from './MainShowcase.jsx';

export default function App() {
  return <main><MainShowcase /></main>;
}
```

Styles dùng chung nằm trong `src/styles.css` và được import một lần từ `src/main.jsx`. Component tự quản lý trạng thái tuần tự của quy trình đặt vé: đổi rạp sẽ đặt lại phim/ngày/suất, còn đổi phim sẽ đặt lại ngày/suất.
