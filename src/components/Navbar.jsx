import { useState, useEffect } from "react";
import "./Navbar.css";

const links = ["Home","About","Portfolio","Services","Testimonials","Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-logo" onClick={() => scrollTo("Home")}>
        <span className="logo-s">S</span>
        <div className="logo-text">
          <span className="logo-main">SANDEELA</span>
          <span className="logo-sub">STUDIO</span>
        </div>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <li key={l}>
            <button
              className={`nav-link ${active === l ? "nav-active" : ""}`}
              onClick={() => scrollTo(l)}
            >
              {l}
              <span className="nav-underline"></span>
            </button>
          </li>
        ))}
      </ul>

      <a href="tel:+923170707926" className="nav-cta">
        <span>Book Now</span>
      </a>

      <button className={`hamburger ${menuOpen ? "ham-open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}
