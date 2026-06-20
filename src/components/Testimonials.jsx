import { useState, useEffect, useRef } from "react";
import "./Testimonials.css";


const reviews = [
  { name: "Ayesha Malik", role: "Bride", stars: 5, text: "Sheraz captured our wedding photography so beautifully — every single photo is a precious memory. Sandeela Studio is absolutely amazing!" },
  { name: "Tariq Hussain", role: "Business Owner", stars: 5, text: "Our product photos turned out stunning. Sales increased 40% after using Sandeela Studio's commercial photography. Highly recommended!" },
  { name: "Sana Rehman", role: "Model", stars: 5, text: "Professional, creative, and patient. Sheraz knows exactly how to bring out the best in every shot. My portfolio looks incredible!" },
  { name: "Ahmad Raza", role: "Event Organizer", stars: 5, text: "We've worked with many photographers but Sandeela Studio is on another level. The team's attention to detail is unmatched in Islamabad." },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % reviews.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="testimonials" id="testimonials" ref={ref} style={{ position: "relative", overflow: "hidden" }}>
      <div className={`tst-inner ${visible ? "tst-visible" : ""}`}>
        <div className="tst-header">
          <p className="section-label">Client Stories</p>
          <h2 className="section-title">What They <em className="gold-italic">Say</em></h2>
          <div className="gold-line"></div>
        </div>

        <div className="tst-layout">
          <div className="tst-main" key={current}>
            <div className="tst-quote-icon">"</div>
            <p className="tst-text">{reviews[current].text}</p>
            <div className="tst-stars">
              {"★".repeat(reviews[current].stars)}
            </div>
            <div className="tst-author">
              <div className="tst-avatar">
                {reviews[current].name[0]}
              </div>
              <div>
                <p className="tst-name">{reviews[current].name}</p>
                <p className="tst-role">{reviews[current].role}</p>
              </div>
            </div>
          </div>

          <div className="tst-sidebar">
            {reviews.map((r, i) => (
              <button key={i} className={`tst-thumb ${i === current ? "tst-thumb-active" : ""}`} onClick={() => setCurrent(i)}>
                <div className="tst-thumb-avatar">{r.name[0]}</div>
                <div>
                  <p className="tst-thumb-name">{r.name}</p>
                  <p className="tst-thumb-role">{r.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="tst-logos">
          {["Google", "Facebook", "Instagram", "Clutch"].map(l => (
            <div key={l} className="tst-logo">
              <span>★★★★★</span>
              <p>{l} Reviews</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
