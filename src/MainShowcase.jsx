import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown, ArrowRight, CalendarDays, ChevronDown, Clock3, Film,
  MapPin, Play, Popcorn, ScanLine, Sparkles, Star, Ticket, UsersRound
} from 'lucide-react';

const cinemas = ['NOVA Landmark 81', 'NOVA Sala', 'NOVA Thảo Điền'];
const moviesByCinema = {
  'NOVA Landmark 81': ['Oppenheimer: IMAX Return', 'Dune: Part Two', 'Interstellar'],
  'NOVA Sala': ['Dune: Part Two', 'Furiosa', 'The Batman'],
  'NOVA Thảo Điền': ['Interstellar', 'The Creator', 'Godzilla Minus One']
};
const dates = ['Hôm nay, 17/09', 'Thứ sáu, 18/09', 'Thứ bảy, 19/09'];
const showtimes = ['18:30 · IMAX', '20:15 · Dolby', '22:40 · 2D'];

const movies = [
  { title: 'Oppenheimer', subtitle: 'The world forever changes', year: '2023', format: 'IMAX 70mm', age: 'T16', duration: '180 phút', rating: '9.1', image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=800&q=90' },
  { title: 'Dune: Part Two', subtitle: 'Long live the fighters', year: '2024', format: 'IMAX 1.43:1', age: 'T13', duration: '166 phút', rating: '9.0', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=90' },
  { title: 'Interstellar', subtitle: 'Mankind was born on Earth', year: '2014', format: 'IMAX 70mm', age: 'T13', duration: '169 phút', rating: '9.3', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=90' },
  { title: 'Furiosa', subtitle: 'A Mad Max saga', year: '2024', format: 'Dolby Atmos', age: 'T18', duration: '148 phút', rating: '8.7', image: 'https://images.unsplash.com/photo-1517994112540-009c47ea476b?auto=format&fit=crop&w=800&q=90' },
  { title: 'The Batman', subtitle: 'Unmask the truth', year: '2022', format: '2D', age: 'T16', duration: '176 phút', rating: '8.8', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=90' }
];

function StepSelect({ number, label, value, options, icon: Icon, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`step-select ${disabled ? 'disabled' : ''}`}>
      <button type="button" onClick={() => !disabled && setOpen(!open)} aria-expanded={open}>
        <span className="step-number">0{number}</span><Icon size={17} />
        <span className="step-copy"><small>{label}</small><strong>{value || 'Chọn tùy chọn'}</strong></span>
        <ChevronDown size={17} className={open ? 'rotated' : ''} />
      </button>
      <AnimatePresence>
        {open && <motion.div className="select-menu" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.16 }}>
          {options.map((option) => <button key={option} type="button" onClick={() => { onChange(option); setOpen(false); }}>{option}</button>)}
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

function MovieCard({ movie, index }) {
  return (
    <motion.article className="movie-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.07, duration: 0.45 }} whileHover={{ y: -10 }}>
      <span className="ranking" aria-label={`Hạng ${index + 1}`}>{index + 1}</span>
      <div className="poster-wrap">
        <img src={movie.image} alt={`Poster ${movie.title}`} />
        <div className="poster-grain" />
        <span className="poster-format"><ScanLine size={13} /> {movie.format}</span>
        <motion.div className="poster-actions" initial={false}>
          <button><Ticket size={17} /> Đặt vé ngay</button>
          <button className="group-button"><UsersRound size={17} /> Xếp cụm nhóm</button>
        </motion.div>
      </div>
      <div className="movie-info">
        <div><p className="eyebrow">NOVA SELECTED · {movie.year}</p><h3>{movie.title}</h3><p>{movie.subtitle}</p></div>
        <div className="rating"><Star size={15} fill="currentColor" /> {movie.rating}</div>
      </div>
      <div className="tech-tags"><span>{movie.age}</span><span>{movie.duration}</span><span>{movie.format}</span></div>
    </motion.article>
  );
}

export default function MainShowcase() {
  const [cinema, setCinema] = useState('');
  const [movie, setMovie] = useState('');
  const [date, setDate] = useState('');
  const [showtime, setShowtime] = useState('');
  const availableMovies = useMemo(() => cinema ? moviesByCinema[cinema] : [], [cinema]);
  const progress = [cinema, movie, date, showtime].filter(Boolean).length;
  const selectCinema = (value) => { setCinema(value); setMovie(''); setDate(''); setShowtime(''); };
  const selectMovie = (value) => { setMovie(value); setDate(''); setShowtime(''); };

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="projector-beam beam-one" /><div className="projector-beam beam-two" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="kicker"><span /> NOW SHOWING · NOVA ORIGINAL EXPERIENCE</p>
          <h1 id="hero-title">BEYOND<br /><em>THE FRAME.</em></h1>
          <p className="hero-description">Màn ảnh không chỉ để nhìn. Đó là nơi âm thanh chạm vào lồng ngực, ánh sáng tràn khỏi khuôn hình và mọi ghế ngồi đều trở thành tâm điểm.</p>
          <div className="hero-buttons"><a className="primary-cta" href="#booking"><Ticket size={19} /> Đặt vé trải nghiệm</a><button className="trailer-button"><span><Play size={16} fill="currentColor" /></span> Xem showreel</button></div>
        </motion.div>
        <div className="hero-spec"><span>SCREEN / 01</span><strong>1.43:1</strong><span>TRUE IMAX RATIO</span></div>
        <a className="scroll-cue" href="#booking">SCROLL TO EXPLORE <ArrowDown size={15} /></a>
      </section>

      <div className="ticker" aria-label="Thông số rạp"><motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 18, ease: 'linear', repeat: Infinity }}><span>DOLBY ATMOS</span> // 1.43:1 IMAX RATIO // <span>AUTO-GROUP SEATING ≤ 20 SEATS</span> // LASER PROJECTION // DOLBY ATMOS // 1.43:1 IMAX RATIO // <span>AUTO-GROUP SEATING ≤ 20 SEATS</span> // LASER PROJECTION //</motion.div></div>

      <section id="booking" className="booking-section">
        <div className="section-label"><span>QUICK ACCESS</span><span>{progress}/4 HOÀN TẤT</span></div>
        <div className="booking-heading"><div><p className="kicker">KHÔNG XẾP HÀNG. KHÔNG CHỜ ĐỢI.</p><h2>ĐẶT VÉ NHANH <i>4 BƯỚC</i></h2></div><p>Chọn trải nghiệm của bạn. NOVA lo phần còn lại.</p></div>
        <div className="booking-hud">
          <div className="hud-top"><span><span className="live-dot" /> BOOKING SYSTEM / ONLINE</span><span>SESSION 09—17—26</span></div>
          <div className="booking-grid">
            <StepSelect number={1} label="CHỌN RẠP" value={cinema} options={cinemas} icon={MapPin} onChange={selectCinema} />
            <StepSelect number={2} label="CHỌN PHIM" value={movie} options={availableMovies} icon={Film} onChange={selectMovie} disabled={!cinema} />
            <StepSelect number={3} label="CHỌN NGÀY" value={date} options={dates} icon={CalendarDays} onChange={(v) => { setDate(v); setShowtime(''); }} disabled={!movie} />
            <StepSelect number={4} label="CHỌN SUẤT" value={showtime} options={showtimes} icon={Clock3} onChange={setShowtime} disabled={!date} />
            <motion.button className="confirm-booking" disabled={!showtime} whileTap={{ scale: 0.97 }}><span>XÁC NHẬN</span><ArrowRight /></motion.button>
          </div>
          <div className="progress-track"><motion.span animate={{ width: `${progress * 25}%` }} /></div>
        </div>
      </section>

      <section id="movies" className="movies-section">
        <div className="movies-heading"><div><p className="kicker">NOVA CHART / TUẦN 38</p><h2>TOP PHIM BOM TẤN<br /><i>THỊNH HÀNH</i></h2></div><button>XEM TẤT CẢ PHIM <ArrowRight size={18} /></button></div>
        <div className="movie-row">{movies.map((item, index) => <MovieCard key={item.title} movie={item} index={index} />)}</div>
      </section>

      <section id="party" className="party-section">
        <motion.div className="combo-visual" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="popcorn-glow" /><Popcorn className="popcorn-icon" strokeWidth={1.1} />
          <span className="sticker">BEST<br />DEAL</span><div className="combo-code">COMBO / 069</div>
        </motion.div>
        <div className="combo-copy"><p className="kicker"><Sparkles size={15} /> GỢI Ý CHO SUẤT CHIẾU CỦA BẠN</p><h2>PHIM HAY HƠN<br />KHI CÓ <i>BẮP.</i></h2><p className="combo-description">01 bắp rang vị tùy chọn + 02 nước. Đặt trước, nhận tại quầy Express không cần chờ.</p><div className="price-row"><strong>69K</strong><span>TIẾT KIỆM<br /><b>31%</b></span></div><button className="primary-cta"><Popcorn size={19} /> Thêm combo</button></div>
        <div className="group-deal"><span className="vertical-label">GROUP MODE</span><div><UsersRound size={31} /><p>ĐI ĐÔNG<br /><strong>VUI HƠN.</strong></p><small>Combo nhóm từ 4 người<br />Tự động xếp ghế liền nhau.</small><a href="#booking">KHÁM PHÁ COMBO NHÓM <ArrowRight size={15} /></a></div></div>
      </section>
    </>
  );
}
