import { useState, useEffect, useRef } from "react";
import "./Portfolio.css";

// Import portfolio videos
import portPortrait1 from "../assets/portfolio_portrait_1.mp4";
import portPortrait2 from "../assets/portfolio_portrait_2.mp4";
import portWedding1 from "../assets/portfolio_wedding_1.mp4";
import portWedding2 from "../assets/portfolio_wedding_2.mp4";
import portCommercial1 from "../assets/portfolio_commercial_1.mp4";
import portCommercial2 from "../assets/portfolio_commercial_2.mp4";
import portFashion1 from "../assets/portfolio_fashion_1.mp4";
import portFashion2 from "../assets/portfolio_fashion_2.mp4";
import portNature1 from "../assets/portfolio_nature_1.mp4";

const categories = ["All", "Portrait", "Wedding", "Commercial", "Fashion", "Nature"];

const items = [
  { id: 1, cat: "Portrait", title: "Golden Hour Portrait", desc: "Studio lighting mastery", video: portPortrait1 },
  { id: 2, cat: "Wedding", title: "Eternal Vows", desc: "A love story captured", video: portWedding1 },
  { id: 3, cat: "Commercial", title: "Brand Identity", desc: "Visual storytelling", video: portCommercial1 },
  { id: 4, cat: "Fashion", title: "Editorial Glamour", desc: "High fashion series", video: portFashion1 },
  { id: 5, cat: "Nature", title: "Islamabad Landscape", desc: "Natural beauty of Pakistan", video: portNature1 },
  { id: 6, cat: "Portrait", title: "Professional Headshot", desc: "Corporate portraits", video: portPortrait2 },
  { id: 7, cat: "Wedding", title: "Reception Moments", desc: "Joy & celebration", video: portWedding2 },
  { id: 8, cat: "Commercial", title: "Product Showcase", desc: "Luxury product shoot", video: portCommercial2 },
  { id: 9, cat: "Fashion", title: "Street Fashion", desc: "Urban style series", video: portFashion2 },
];

const colors = ["#1a1a1a", "#111", "#151515", "#1c1a15", "#12100a", "#181818", "#141414", "#1a180f", "#0f0f0f"];

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = active === "All" ? items : items.filter(i => i.cat === active);

  return (
    <section className="portfolio" id="portfolio" ref={ref} style={{ position: "relative", overflow: "hidden" }}>
      <div className={`port-inner ${visible ? "port-visible" : ""}`}>
        <div className="port-header">
          <div>
            <p className="section-label">Our Work</p>
            <h2 className="section-title">Portfolio<br /><em className="gold-italic">Gallery</em></h2>
          </div>
          <p className="port-sub">A curated selection of our finest work — each image a testament to our craft and passion.</p>
        </div>
        <div className="gold-line"></div>

        <div className="port-filters">
          {categories.map(c => (
            <button key={c} className={`filter-btn ${active === c ? "filter-active" : ""}`} onClick={() => setActive(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="port-grid">
          {filtered.map((item, i) => (
            <div key={item.id} className="port-item" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="port-img" style={{ background: colors[item.id - 1] }}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                >
                  <source src={item.video} type="video/mp4" />
                </video>
                <div className="port-overlay">
                  <div className="port-overlay-content">
                    <span className="port-cat">{item.cat}</span>
                    <h3 className="port-title">{item.title}</h3>
                    <p className="port-desc">{item.desc}</p>
                    <div className="port-view">View →</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="port-cta">
          <a href="#contact" className="gold-btn"><span>Book a Session</span></a>
        </div>
      </div>
    </section>
  );
}
