import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight,
  CircleHelp, Clock3, Facebook, Film, Instagram, Linkedin, MapPin, Menu,
  Play, Search, ShieldCheck, Sparkles, Star, Ticket, UserRound, X
} from 'lucide-react';

const heroSlides = [
  {
    title: 'DUNE', accent: 'PART TWO', kicker: 'KIỆT TÁC ĐIỆN ẢNH · TRỞ LẠI IMAX',
    description: 'Paul Atreides hợp lực cùng Chani và người Fremen trên hành trình trả thù những kẻ đã hủy hoại gia đình mình.',
    meta: ['2024', '166 phút', 'Khoa học viễn tưởng'], age: 'T13', rating: '8.8',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=92'
  },
  {
    title: 'INTERSTELLAR', accent: 'KỶ NIỆM 10 NĂM', kicker: 'TRẢI NGHIỆM LẠI · IMAX 70MM',
    description: 'Một nhóm nhà thám hiểm vượt qua lỗ sâu trong không gian để tìm kiếm hy vọng cuối cùng cho nhân loại.',
    meta: ['2014', '169 phút', 'Phiêu lưu · Chính kịch'], age: 'T13', rating: '8.7',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2200&q=92'
  },
  {
    title: 'THE BATMAN', accent: 'ĐÊM GOTHAM', kicker: 'SUẤT CHIẾU ĐẶC BIỆT · DOLBY ATMOS',
    description: 'Khi một tên sát nhân hàng loạt nhắm vào giới tinh hoa Gotham, Batman buộc phải giải mã những manh mối đen tối.',
    meta: ['2022', '176 phút', 'Hành động · Trinh thám'], age: 'T16', rating: '7.8',
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=2200&q=92'
  }
];

const movies = [
  { title: 'Dune: Part Two', genre: 'Khoa học viễn tưởng', duration: '166 phút', age: 'T13', format: 'IMAX', rating: '8.8', status: 'showing', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=720&q=88' },
  { title: 'Interstellar', genre: 'Phiêu lưu · Chính kịch', duration: '169 phút', age: 'T13', format: 'IMAX 70MM', rating: '8.7', status: 'showing', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=720&q=88' },
  { title: 'Furiosa', genre: 'Hành động · Phiêu lưu', duration: '148 phút', age: 'T18', format: 'DOLBY', rating: '7.5', status: 'showing', image: 'https://images.unsplash.com/photo-1517994112540-009c47ea476b?auto=format&fit=crop&w=720&q=88' },
  { title: 'The Batman', genre: 'Hành động · Trinh thám', duration: '176 phút', age: 'T16', format: '2D', rating: '7.8', status: 'showing', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=720&q=88' },
  { title: 'The Creator', genre: 'Khoa học viễn tưởng', duration: '133 phút', age: 'T13', format: '4DX', rating: '7.1', status: 'soon', image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=720&q=88' },
  { title: 'Beyond Earth', genre: 'Phiêu lưu · Kỳ ảo', duration: '142 phút', age: 'P', format: 'IMAX', rating: '8.2', status: 'soon', image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=720&q=88' }
];

const cinemas = ['NOVA Landmark 81', 'NOVA Sala', 'NOVA Thảo Điền', 'NOVA Gò Vấp'];
const dates = ['Hôm nay, 17/09', 'Thứ Sáu, 18/09', 'Thứ Bảy, 19/09'];
const showtimes = ['18:30 · IMAX', '20:15 · Dolby', '22:40 · 2D'];
const seatRows = [
  ['A', 8], ['B', 10], ['C', 10], ['D', 10], ['E', 10], ['F', 8]
];
const soldSeats = new Set(['A3', 'A4', 'B5', 'C2', 'C7', 'D8', 'E4', 'E5', 'F2']);

function Logo() {
  return <a href="#top" className="logo" aria-label="NOVA Cinema - Trang chủ"><span className="logo-mark"><i /><b>N</b></span><span><strong>NOVA</strong><small>CINEMA</small></span></a>;
}

function SelectBox({ icon: Icon, number, label, value, options, onChange, disabled }) {
  return <label className={`select-box ${disabled ? 'is-disabled' : ''}`}>
    <span className="step">0{number}</span><Icon size={18} />
    <span className="select-copy"><small>{label}</small><strong>{value || 'Vui lòng chọn'}</strong></span>
    <ChevronDown size={17} />
    <select value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} aria-label={label}>
      <option value="">Vui lòng chọn</option>{options.map((option) => <option key={option}>{option}</option>)}
    </select>
  </label>;
}

function BookingModal({ movie, onClose }) {
  const [selectedTime, setSelectedTime] = useState('20:15');
  const [selectedSeats, setSelectedSeats] = useState(['D4', 'D5']);
  useEffect(() => {
    const keyHandler = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', keyHandler); document.body.classList.add('modal-open');
    return () => { document.removeEventListener('keydown', keyHandler); document.body.classList.remove('modal-open'); };
  }, [onClose]);
  const toggleSeat = (seat) => setSelectedSeats((current) => current.includes(seat) ? current.filter((item) => item !== seat) : current.length < 8 ? [...current, seat] : current);
  const price = selectedSeats.reduce((total, seat) => total + (seat.startsWith('E') || seat.startsWith('F') ? 125000 : 95000), 0);
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <header className="modal-header"><div><span className="mini-label">ĐẶT VÉ TRỰC TUYẾN</span><h2 id="modal-title">CHỌN GHẾ CỦA BẠN</h2></div><button onClick={onClose} aria-label="Đóng cửa sổ"><X /></button></header>
      <div className="modal-body">
        <div className="seat-panel">
          <div className="showtime-strip"><div><img src={movie.image} alt="" /><span><small>PHIM ĐANG CHỌN</small><strong>{movie.title}</strong></span></div><div className="time-options">{['18:30', '20:15', '22:40'].map((time) => <button className={selectedTime === time ? 'active' : ''} key={time} onClick={() => setSelectedTime(time)}><b>{time}</b><small>IMAX · 2D</small></button>)}</div></div>
          <div className="screen"><span>MÀN HÌNH</span></div>
          <div className="seat-map">
            {seatRows.map(([row, count]) => <div className="seat-row" key={row}><span>{row}</span><div>{Array.from({ length: count }, (_, index) => { const seat = `${row}${index + 1}`; const vip = row === 'E' || row === 'F'; return <button key={seat} aria-label={`Ghế ${seat}`} disabled={soldSeats.has(seat)} className={`${vip ? 'vip' : ''} ${selectedSeats.includes(seat) ? 'selected' : ''}`} onClick={() => toggleSeat(seat)}><span>{index + 1}</span></button>; })}</div><span>{row}</span></div>)}
          </div>
          <div className="seat-legend"><span><i className="available" />Ghế thường</span><span><i className="vip" />Ghế VIP</span><span><i className="selected" />Đang chọn</span><span><i className="sold" />Đã bán</span></div>
        </div>
        <aside className="order-summary"><span className="mini-label">ĐƠN HÀNG CỦA BẠN</span><h3>{movie.title}</h3><div className="order-meta"><span><MapPin size={16} /> NOVA Landmark 81</span><span><CalendarDays size={16} /> Hôm nay, 17/09 · {selectedTime}</span><span><Film size={16} /> Phòng IMAX 01</span></div><hr />
          <div className="seat-selection"><span>Ghế đã chọn</span><strong>{selectedSeats.length ? selectedSeats.join(', ') : 'Chưa chọn'}</strong></div>
          <div className="price-line"><span>{selectedSeats.length} × vé xem phim</span><span>{price.toLocaleString('vi-VN')}đ</span></div><div className="price-line"><span>Phí dịch vụ</span><span>0đ</span></div>
          <div className="total"><span>TỔNG CỘNG</span><strong>{price.toLocaleString('vi-VN')}<small>đ</small></strong></div>
          <button className="pay-button" disabled={!selectedSeats.length}>TIẾP TỤC THANH TOÁN <ArrowRight size={18} /></button><p><ShieldCheck size={14} /> Thanh toán an toàn & bảo mật</p>
        </aside>
      </div>
    </section>
  </div>;
}

function MovieCard({ movie, onBook }) {
  return <article className="movie-card">
    <div className="poster"><img src={movie.image} alt={`Poster phim ${movie.title}`} /><div className="poster-shade" /><span className={`age age-${movie.age.toLowerCase()}`}>{movie.age}</span><span className="movie-format">{movie.format}</span><button onClick={() => onBook(movie)}><Ticket size={18} /> ĐẶT VÉ</button></div>
    <div className="movie-card-info"><h3>{movie.title}</h3><span><Star size={14} fill="currentColor" /> {movie.rating}</span></div><p>{movie.genre} · {movie.duration}</p>
  </article>;
}

export default function App() {
  const [slide, setSlide] = useState(0); const [tab, setTab] = useState('showing'); const [modalMovie, setModalMovie] = useState(null); const [mobileOpen, setMobileOpen] = useState(false);
  const [cinema, setCinema] = useState(''); const [movie, setMovie] = useState(''); const [date, setDate] = useState(''); const [time, setTime] = useState(''); const [searchOpen, setSearchOpen] = useState(false);
  const activeHero = heroSlides[slide]; const filteredMovies = useMemo(() => movies.filter((item) => item.status === tab), [tab]);
  useEffect(() => { const timer = setInterval(() => setSlide((current) => (current + 1) % heroSlides.length), 7000); return () => clearInterval(timer); }, []);
  const next = (direction) => setSlide((current) => (current + direction + heroSlides.length) % heroSlides.length);
  const openSelected = () => setModalMovie(movies.find((item) => item.title === movie) || movies[0]);
  return <div id="top" className="app-shell">
    <header className="site-header"><Logo /><nav className={mobileOpen ? 'open' : ''}><a href="#movies">Phim đang chiếu</a><a href="#booking">Lịch chiếu</a><a href="#offers">Giá vé / Ưu đãi</a><a href="#cinemas">Cụm rạp</a></nav>
      <div className="header-actions"><div className={`search-box ${searchOpen ? 'open' : ''}`}><Search size={18} /><input placeholder="Tìm phim, diễn viên..." aria-label="Tìm kiếm phim" /><button aria-label="Tìm kiếm" onClick={() => setSearchOpen(!searchOpen)} /></div><button className="member-button"><UserRound size={17} /><span>Đăng nhập</span></button><button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Mở menu"><Menu /></button></div>
    </header>
    <main>
      <section className="hero" style={{ '--hero-image': `url("${activeHero.image}")` }} aria-label="Phim nổi bật">
        <div className="hero-content"><p className="kicker"><span /> {activeHero.kicker}</p><h1><span>{activeHero.title}</span><em>{activeHero.accent}</em></h1><div className="hero-meta"><span className="hero-age">{activeHero.age}</span>{activeHero.meta.map((item) => <span key={item}>{item}</span>)}<span className="imdb"><b>IMDb</b><Star size={14} fill="currentColor" /> {activeHero.rating}</span></div><p className="hero-description">{activeHero.description}</p><div className="hero-buttons"><button className="primary-button" onClick={() => setModalMovie(movies[slide] || movies[0])}><Ticket size={19} /> ĐẶT VÉ NGAY</button><button className="secondary-button"><Play size={18} fill="currentColor" /> XEM TRAILER</button></div></div>
        <div className="slider-controls"><button onClick={() => next(-1)} aria-label="Slide trước"><ChevronLeft /></button><span><b>0{slide + 1}</b> / 0{heroSlides.length}</span><div>{heroSlides.map((item, index) => <button className={index === slide ? 'active' : ''} aria-label={`Xem ${item.title}`} onClick={() => setSlide(index)} key={item.title} />)}</div><button onClick={() => next(1)} aria-label="Slide tiếp"><ChevronRight /></button></div>
      </section>

      <section id="booking" className="quick-booking"><div className="quick-title"><span><Sparkles size={16} /> ĐẶT VÉ NHANH</span><small>Chỉ 4 bước · Không cần chờ</small></div><div className="quick-grid">
        <SelectBox number={1} label="CHỌN RẠP" icon={MapPin} value={cinema} options={cinemas} onChange={(value) => { setCinema(value); setMovie(''); setDate(''); setTime(''); }} />
        <SelectBox number={2} label="CHỌN PHIM" icon={Film} value={movie} options={movies.filter((item) => item.status === 'showing').map((item) => item.title)} onChange={(value) => { setMovie(value); setDate(''); setTime(''); }} disabled={!cinema} />
        <SelectBox number={3} label="CHỌN NGÀY" icon={CalendarDays} value={date} options={dates} onChange={(value) => { setDate(value); setTime(''); }} disabled={!movie} />
        <SelectBox number={4} label="CHỌN SUẤT" icon={Clock3} value={time} options={showtimes} onChange={setTime} disabled={!date} />
        <button className="quick-submit" disabled={!time} onClick={openSelected}>MUA VÉ NHANH <ArrowRight /></button>
      </div></section>

      <section id="movies" className="movies-section"><div className="section-head"><div><p className="kicker"><span /> TUYỂN CHỌN BỞI NOVA</p><h2>PHIM TẠI RẠP</h2></div><div className="tabs" role="tablist"><button className={tab === 'showing' ? 'active' : ''} onClick={() => setTab('showing')}>ĐANG CHIẾU <span>04</span></button><button className={tab === 'soon' ? 'active' : ''} onClick={() => setTab('soon')}>SẮP CHIẾU <span>02</span></button></div></div><div className="movie-grid">{filteredMovies.map((item) => <MovieCard key={item.title} movie={item} onBook={setModalMovie} />)}</div><button className="view-all">XEM TẤT CẢ PHIM <ArrowRight size={18} /></button></section>

      <section id="offers" className="offers-section"><div className="section-head"><div><p className="kicker"><span /> ĐẶC QUYỀN DÀNH CHO BẠN</p><h2>ƯU ĐÃI <i>NOVA</i></h2></div><p>Thêm nhiều trải nghiệm.<br />Vẫn trọn vẹn ngân sách.</p></div><div className="offer-grid">
        <article className="offer student"><div><span className="offer-tag">STUDENT DEAL</span><h3>ĐỒNG GIÁ<br /><strong>49K</strong></h3><p>Dành cho học sinh, sinh viên<br />từ thứ 2 đến thứ 6.</p><a href="#booking">XEM CHI TIẾT <ArrowRight size={16} /></a></div><div className="ticket-art"><span>NOVA</span><b>49K</b><small>ADMIT ONE</small></div></article>
        <article className="offer happy"><div><span className="offer-tag">HAPPY WEDNESDAY</span><h3>THỨ TƯ<br /><strong>VUI VẺ</strong></h3><p>Vé 2D chỉ từ 55K.<br />Mọi khách hàng, mọi suất chiếu.</p><a href="#booking">ĐẶT VÉ NGAY <ArrowRight size={16} /></a></div><div className="happy-orbit"><span><Star fill="currentColor" /></span><b>WED</b><small>ALL DAY</small></div></article>
        <article className="offer member"><div><span className="offer-tag">NOVA MEMBER</span><h3>CÀNG XEM<br /><strong>CÀNG LỜI</strong></h3><p>Tích điểm mỗi giao dịch.<br />Quà sinh nhật & suất chiếu sớm.</p><a href="#membership">GIA NHẬP NGAY <ArrowRight size={16} /></a></div><div className="member-card"><Logo /><span>MEMBER</span><small>2026 · 09 · 17</small></div></article>
      </div></section>
    </main>
    <footer id="cinemas"><div className="footer-top"><div><Logo /><p>Nơi mỗi thước phim trở thành<br />một trải nghiệm không thể quên.</p><div className="socials"><a href="#facebook" aria-label="Facebook"><Facebook /></a><a href="#instagram" aria-label="Instagram"><Instagram /></a><a href="#linkedin" aria-label="LinkedIn"><Linkedin /></a></div></div><div><h4>KHÁM PHÁ</h4><a href="#movies">Phim đang chiếu</a><a href="#booking">Lịch chiếu</a><a href="#offers">Ưu đãi</a><a href="#cinemas">Cụm rạp</a></div><div><h4>HỖ TRỢ</h4><a href="#faq">Câu hỏi thường gặp</a><a href="#contact">Liên hệ</a><a href="#rules">Điều khoản sử dụng</a><a href="#privacy">Chính sách bảo mật</a></div><div><h4>NHẬN TIN TỪ NOVA</h4><p>Lịch phim mới và ưu đãi gửi thẳng tới bạn.</p><form><input type="email" placeholder="Email của bạn" aria-label="Email nhận tin" /><button aria-label="Đăng ký"><ArrowRight /></button></form><small><Check size={13} /> Không spam. Chỉ có phim hay.</small></div></div><div className="footer-bottom"><span>© 2026 NOVA CINEMA. ALL RIGHTS RESERVED.</span><span><CircleHelp size={14} /> HOTLINE 1900 0069</span><span>BỘ VĂN HÓA, THỂ THAO & DU LỊCH · GIẤY PHÉP SỐ 0123/GP-BVHTTDL</span></div></footer>
    {modalMovie && <BookingModal movie={modalMovie} onClose={() => setModalMovie(null)} />}
  </div>;
}
