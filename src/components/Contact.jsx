import { useState, useEffect, useRef } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", date: "", message: "" });
  const [sent, setSent] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="contact" id="contact" ref={ref} style={{ position: "relative", overflow: "hidden" }}>
      <div className={`cnt-inner ${visible ? "cnt-visible" : ""}`}>
        <div className="cnt-left">
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Book Your<br /><em className="gold-italic">Session</em></h2>
          <div className="gold-line"></div>
          <p className="cnt-sub">Ready to create something beautiful? Fill the form or reach us directly — we'll get back to you within 24 hours.</p>

          <div className="cnt-info">
            <div className="cnt-info-item">
              <div className="cnt-info-icon">📍</div>
              <div>
                <p className="cnt-info-label">Location</p>
                <p className="cnt-info-val">Islamabad, Pakistan</p>
              </div>
            </div>
            <div className="cnt-info-item">
              <div className="cnt-info-icon">📱</div>
              <div>
                <p className="cnt-info-label">WhatsApp / Call</p>
                <a className="cnt-info-val cnt-link" href="tel:+923170707926">+92 317 0707926</a>
              </div>
            </div>
            <div className="cnt-info-item">
              <div className="cnt-info-icon">🕐</div>
              <div>
                <p className="cnt-info-label">Studio Hours</p>
                <p className="cnt-info-val">Mon – Sat, 10am – 7pm</p>
              </div>
            </div>
          </div>

          <div className="cnt-social">
            <a href="#" className="cnt-soc">Facebook</a>
            <a href="#" className="cnt-soc">Instagram</a>
            <a href="#" className="cnt-soc">TikTok</a>
          </div>

          <a href="https://wa.me/923170707926" className="wa-btn" target="_blank" rel="noreferrer">
            <span className="wa-icon">💬</span>
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="cnt-right">
          {!sent ? (
            <form className="cnt-form" onSubmit={submit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" name="name" placeholder="Aap ka naam" value={form.name} onChange={handle} required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" placeholder="+92 300 0000000" value={form.phone} onChange={handle} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Service</label>
                  <select name="service" value={form.service} onChange={handle} required>
                    <option value="">Select a service</option>
                    <option>Portrait Session</option>
                    <option>Wedding Photography</option>
                    <option>Commercial Shoot</option>
                    <option>Fashion & Editorial</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input type="date" name="date" value={form.date} onChange={handle} />
                </div>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" rows={4} placeholder="Tell us about your vision..." value={form.message} onChange={handle} />
              </div>
              <button type="submit" className="gold-btn form-submit">
                <span>Send Enquiry</span>
              </button>
            </form>
          ) : (
            <div className="form-success">
              <div className="success-icon">✦</div>
              <h3>Shukriya!</h3>
              <p>Hamein aap ka message mil gaya. Hum aap se jald hi rabta karenge.</p>
              <a href="https://wa.me/923170707926" className="wa-btn" target="_blank" rel="noreferrer">
                <span>💬</span><span>WhatsApp par message karein</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
