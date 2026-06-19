import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import './Stats.css';

const stats = [
  { num: 500, suffix: '+', label: 'Happy Clients' },
  { num: 10, suffix: '+', label: 'Years Experience' },
  { num: 1200, suffix: '+', label: 'Projects Done' },
  { num: 50, suffix: '+', label: 'Awards Won' },
];

export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat-item"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="stat-num">
              {inView && <CountUp end={s.num} duration={2.5} />}
              <span className="stat-suffix">{s.suffix}</span>
            </div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
