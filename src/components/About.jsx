import { useEffect, useRef, useState } from "react";
import "./About.css";
import sherazPhoto from "../assets/1.jpeg";

export default function About() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="about" id="about" ref={ref} style={{ position: "relative", overflow: "hidden" }}>
      <div className={`about-inner ${visible ? "about-visible" : ""}`}>
        <div className="about-left">
          <div className="about-img-stack">
            <div className="about-img-main">
              <img
                src={sherazPhoto}
                alt="Sheraz Sandeela"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div className="about-img-small">
              <div className="exp-badge">
                <span className="exp-num">8+</span>
                <span className="exp-text">Years of<br />Excellence</span>
              </div>
            </div>
            <div className="about-img-accent"></div>
          </div>
        </div>

        <div className="about-right">
          <p className="section-label">About the Studio</p>
          <h2 className="section-title">
            Art Behind<br /><em className="gold-italic">Every Frame</em>
          </h2>
          <div className="gold-line"></div>
          <p className="about-desc">
            Sandeela Studio was born from a passion for storytelling through light and lens. Based in the heart of Islamabad, we craft visual experiences that go beyond ordinary photography — we create timeless art.
          </p>
          <p className="about-desc">
            Led by <strong>Sheraz Sandeela</strong>, our studio blends technical mastery with artistic vision to deliver photographs that speak, breathe, and last forever.
          </p>

          <div className="about-features">
            {["Professional Equipment", "Studio & Outdoor Shoots", "Fast Delivery", "100% Satisfaction"].map((f, i) => (
              <div className="about-feat" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="feat-icon">✦</span>
                <span>{f}</span>
              </div>
            ))}
          </div>

          <div className="about-signature">
            <div className="sig-line"></div>
            <div>
              <p className="sig-name">Sheraz Sandeela</p>
              <p className="sig-role">Founder & Lead Photographer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
