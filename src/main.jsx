import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const rootElement = document.getElementById('root');

function BootError({ error }) {
  return (
    <main className="boot-error" role="alert">
      <p>NOVA / BOOT DIAGNOSTIC</p>
      <h1>Không thể khởi động giao diện.</h1>
      <p>Kiểm tra bạn đang chạy <code>npm run dev</code> tại đúng thư mục chứa tệp <code>src/MainShowcase.jsx</code>.</p>
      <pre>{error instanceof Error ? error.message : String(error)}</pre>
    </main>
  );
}

if (!rootElement) {
  throw new Error('Không tìm thấy phần tử #root trong index.html.');
}

const root = createRoot(rootElement);

import('./App.jsx')
  .then(({ default: App }) => {
    root.render(<StrictMode><App /></StrictMode>);
  })
  .catch((error) => {
    root.render(<BootError error={error} />);
  });
