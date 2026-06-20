import { useEffect, useRef, useState } from "react";
import "./Hero.css";
import heroVideo from "../assets/WhatsApp Video 2026-06-19 at 5.31.50 PM.mp4";

const slides = [
  {
    tag: "Portrait Photography",
    heading: ["Capturing", "Your", "Story"],
    sub: "Every frame tells a tale — we tell yours with light, art, and soul.",
  },
  {
    tag: "Wedding Photography",
    heading: ["Moments", "That Last", "Forever"],
    sub: "Timeless memories crafted with precision and passion.",
  },
  {
    tag: "Commercial Shoots",
    heading: ["Visual", "Excellence", "Defined"],
    sub: "Brand imagery that speaks louder than words.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [count, setCount] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(idx); setAnimating(false); }, 500);
  };

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const target = 1200;
    const step = Math.ceil(target / 60);
    let val = 0;
    const timer = setInterval(() => {
      val += step;
      if (val >= target) { setCount(target); clearInterval(timer); }
      else setCount(val);
    }, 16);
    return () => clearInterval(timer);
  }, []);

  // Force play on mobile — handle user interaction
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const tryPlay = () => {
      vid.muted = true;
      vid.play().catch(() => setVideoError(true));
    };

    // Try immediately
    tryPlay();

    // Also try on any user interaction (mobile requirement)
    const onTouch = () => { tryPlay(); };
    document.addEventListener("touchstart", onTouch, { once: true });
    document.addEventListener("click",      onTouch, { once: true });

    return () => {
      document.removeEventListener("touchstart", onTouch);
      document.removeEventListener("click",      onTouch);
    };
  }, []);

  const slide = slides[current];

  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <div className={`hero-content ${animating ? "hero-exit" : "hero-enter"}`}>
          <span className="hero-tag">{slide.tag}</span>
          <h1 className="hero-title">
            {slide.heading.map((line, i) => (
              <span key={i} className="hero-line" style={{ animationDelay: `${i * 0.15}s` }}>
                {i === 1 ? <em>{line}</em> : line}
              </span>
            ))}
          </h1>
          <p className="hero-sub">{slide.sub}</p>
          <div className="hero-btns">
            <a href="#portfolio" className="gold-btn hero-btn-main"><span>View Portfolio</span></a>
            <a href="#contact" className="hero-btn-ghost">Book a Session</a>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-num">{count.toLocaleString()}+</span>
            <span className="stat-label">Sessions Done</span>
          </div>
          <div className="hero-stat-div" />
          <div className="hero-stat">
            <span className="stat-num">8+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="hero-stat-div" />
          <div className="hero-stat">
            <span className="stat-num">100%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-img-frame">
          <div className="frame-corner tl" />
          <div className="frame-corner tr" />
          <div className="frame-corner bl" />
          <div className="frame-corner br" />
          <div className="frame-orbit" />

          {/* Video — mobile friendly */}
          {!videoError ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onError={() => setVideoError(true)}
              webkit-playsinline="true"
              x5-playsinline="true"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          ) : (
            /* Fallback if video fails */
            <div style={{
              width:"100%", height:"100%",
              background:"linear-gradient(135deg,#111,#1a1a1a)",
              display:"flex", alignItems:"center", justifyContent:"center",
              flexDirection:"column", gap:"1rem"
            }}>
              <svg viewBox="0 0 80 70" fill="none" width="80" opacity="0.5">
                <rect x="5" y="20" width="70" height="46" rx="6" stroke="#C9A84C" strokeWidth="2"/>
                <circle cx="40" cy="43" r="14" stroke="#C9A84C" strokeWidth="2"/>
                <circle cx="40" cy="43" r="8" stroke="#C9A84C" strokeWidth="1.5"/>
                <circle cx="40" cy="43" r="3" fill="#C9A84C"/>
                <rect x="26" y="10" width="18" height="12" rx="2" stroke="#C9A84C" strokeWidth="2"/>
                <circle cx="62" cy="30" r="3" fill="#C9A84C"/>
              </svg>
              <p style={{color:"rgba(201,168,76,0.5)",fontSize:"0.75rem",letterSpacing:"0.1em"}}>
                Sandeela Studio
              </p>
            </div>
          )}

          <div className="hero-badge">
            <span className="badge-num">★ 5.0</span>
            <span className="badge-label">Rated Studio</span>
          </div>
        </div>
      </div>

      <div className="hero-dots">
        {slides.map((_, i) => (
          <button key={i} className={`dot ${i === current ? "dot-active" : ""}`} onClick={() => goTo(i)} />
        ))}
      </div>

      <div className="hero-scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}