import "./PageBackground.css";

/* Generated once per component mount — stable random values */
const PARTICLES = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 10}s`,
  duration: `${7 + Math.random() * 8}s`,
  size: `${1 + Math.random() * 3}px`,
}));

const STARS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  top: `${10 + Math.random() * 60}%`,
  delay: `${i * 4 + Math.random() * 3}s`,
  duration: `${5 + Math.random() * 4}s`,
}));

export default function PageBackground() {
  return (
    <>
      {/* Radial glow */}
      <div className="pb-glow" />

      {/* Spinning rings */}
      <div className="pb-ring pb-ring-1" />
      <div className="pb-ring pb-ring-2" />
      <div className="pb-ring pb-ring-3" />

      {/* Floating particles */}
      <div className="pb-particles">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="pb-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      {STARS.map((s) => (
        <div
          key={s.id}
          className="pb-shooting-star"
          style={{ top: s.top, animationDelay: s.delay, animationDuration: s.duration }}
        />
      ))}
    </>
  );
}
