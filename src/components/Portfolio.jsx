import { useState, useEffect, useRef } from "react";
import "./Portfolio.css";

const categories = ["All", "Portrait", "Wedding", "Commercial", "Fashion", "Nature"];

const items = [
  { id: 1, cat: "Portrait", title: "Golden Hour Portrait", desc: "Studio lighting mastery" },
  { id: 2, cat: "Wedding", title: "Eternal Vows", desc: "A love story captured" },
  { id: 3, cat: "Commercial", title: "Brand Identity", desc: "Visual storytelling" },
  { id: 4, cat: "Fashion", title: "Editorial Glamour", desc: "High fashion series" },
  { id: 5, cat: "Nature", title: "Islamabad Landscape", desc: "Natural beauty of Pakistan" },
  { id: 6, cat: "Portrait", title: "Professional Headshot", desc: "Corporate portraits" },
  { id: 7, cat: "Wedding", title: "Reception Moments", desc: "Joy & celebration" },
  { id: 8, cat: "Commercial", title: "Product Showcase", desc: "Luxury product shoot" },
  { id: 9, cat: "Fashion", title: "Street Fashion", desc: "Urban style series" },
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
                <div className="port-img-inner">
                  <svg viewBox="0 0 50 45" fill="none" width="50" opacity="0.3">
                    <rect x="2" y="12" width="46" height="30" rx="4" stroke="#C9A84C" strokeWidth="1.5" />
                    <circle cx="25" cy="27" r="9" stroke="#C9A84C" strokeWidth="1.5" />
                    <circle cx="25" cy="27" r="4" fill="rgba(201,168,76,0.3)" />
                    <rect x="16" y="5" width="12" height="9" rx="1.5" stroke="#C9A84C" strokeWidth="1.5" />
                  </svg>
                  <span className="port-img-label">Add Photo #{item.id}</span>
                </div>
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
