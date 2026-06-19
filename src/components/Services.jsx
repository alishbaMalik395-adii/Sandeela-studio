import { useEffect, useRef, useState } from "react";
import "./Services.css";

const services = [
  {
    icon: "👤",
    title: "Portrait Sessions",
    desc: "Individual, family, and professional headshots crafted with artistic precision and flattering light.",
    features: ["2-hour studio session", "50+ edited photos", "Digital delivery", "1 printed 12×18"],
    price: "Starting Rs. 8,000",
  },
  {
    icon: "💒",
    title: "Wedding Photography",
    featured: true,
    desc: "Complete wedding day coverage from mehndi to walima — every emotion, every moment preserved.",
    features: ["Full-day coverage", "2 photographers", "500+ edited photos", "Online gallery", "Wedding album"],
    price: "Starting Rs. 45,000",
  },
  {
    icon: "📦",
    title: "Commercial Shoots",
    desc: "Product, e-commerce, and brand photography that converts browsers into buyers.",
    features: ["Product styling", "White/dark background", "100+ edited images", "Commercial license"],
    price: "Starting Rs. 15,000",
  },
  {
    icon: "👗",
    title: "Fashion & Editorial",
    desc: "High-fashion editorial shoots for models, designers, and brands with a distinct creative vision.",
    features: ["Concept planning", "Makeup artist", "Wardrobe assist", "Retouching included"],
    price: "Starting Rs. 20,000",
  },
];

export default function Services() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="services" id="services" ref={ref} style={{ position: "relative", overflow: "hidden" }}>
      <div className={`srv-inner ${visible ? "srv-visible" : ""}`}>
        <div className="srv-header">
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">Our <em className="gold-italic">Services</em></h2>
          <div className="gold-line"></div>
        </div>

        <div className="srv-grid">
          {services.map((s, i) => (
            <div key={i} className={`srv-card ${s.featured ? "srv-featured" : ""}`} style={{ animationDelay: `${i * 0.12}s` }}>
              {s.featured && <div className="srv-badge">Most Popular</div>}
              <div className="srv-icon">{s.icon}</div>
              <h3 className="srv-title">{s.title}</h3>
              <p className="srv-desc">{s.desc}</p>
              <ul className="srv-list">
                {s.features.map((f, j) => (
                  <li key={j}><span className="srv-check">✦</span>{f}</li>
                ))}
              </ul>
              <div className="srv-footer">
                <p className="srv-price">{s.price}</p>
                <a href="#contact" className={`srv-btn ${s.featured ? "srv-btn-gold" : ""}`}>Book Now</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
