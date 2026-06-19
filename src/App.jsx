import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import PageBackground from "./components/PageBackground";
import "./App.css";

/* Dust motes — generated once */
const MOTES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 14}s`,
  duration: `${10 + Math.random() * 10}s`,
  size: `${1 + Math.random() * 2}px`,
}));

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Preloader />}
      <PageBackground />

      {/* Global ambient background elements */}
      <div className="corner-ring" />
      <div className="corner-ring" />
      <div className="corner-ring" />
      <div className="corner-ring" />
      <div className="shimmer-wave" />
      <div className="shimmer-wave" />
      {MOTES.map((m) => (
        <div
          key={m.id}
          className="dust-mote"
          style={{
            left: m.left,
            animationDelay: m.delay,
            animationDuration: m.duration,
            width: m.size,
            height: m.size,
          }}
        />
      ))}

      <div className="site-bg-canvas" aria-hidden="true" />

      <div className={`app ${loading ? "app-hidden" : "app-visible"}`}>
        <Navbar />
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
