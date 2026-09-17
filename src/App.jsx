import { Menu, Search, Ticket, UserRound } from 'lucide-react';
import MainShowcase from './MainShowcase.jsx';

function NovaMark() {
  return <a className="brand" href="#top" aria-label="NOVA Cinema — về đầu trang"><span className="brand-icon">N</span><span>NOVA<small>CINEMA / INFINITY</small></span></a>;
}

export default function App() {
  return (
    <div id="top" className="app-shell">
      <header className="site-header">
        <NovaMark />
        <nav aria-label="Điều hướng chính"><a href="#movies">Phim</a><a href="#booking">Lịch chiếu</a><a href="#party">Party</a><a href="#membership">Thành viên</a></nav>
        <div className="header-actions"><button aria-label="Tìm kiếm"><Search size={19} /></button><button className="login"><UserRound size={17} /> Đăng nhập</button><button className="mobile-menu" aria-label="Mở trình đơn"><Menu /></button></div>
      </header>
      <main><MainShowcase /></main>
      <footer id="membership"><NovaMark /><p>© 2026 NOVA Cinema. Điện ảnh không giới hạn.</p><a href="#booking"><Ticket size={16} /> Đặt vé ngay</a></footer>
    </div>
  );
}
