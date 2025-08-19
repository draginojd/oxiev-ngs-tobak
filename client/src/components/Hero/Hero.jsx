import React from 'react';
import './Hero.css';
import { motion } from 'framer-motion';


const scrollToId = (e, id = 'find-us') => {
  e && e.preventDefault();
  const target = document.getElementById(id);
  if (!target) return;
  const startY = window.scrollY;
  const endY = target.getBoundingClientRect().top + window.scrollY;
  const duration = 450;
  let start;
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    // ease in-out approximation
    const t = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
    window.scrollTo(0, startY + (endY - startY) * t);
    if (progress < 1) window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
};

const box = {
    width: "auto",
    height: "auto",
 
    borderRadius: 5,
}

const Hero = () => (
  <section className="hero-section" id="home">
    <div className="hero-bg" />
    <div className="hero-content">
  <motion.h1 className="hero-title"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Oxievångs Tobak
      </motion.h1>
      <motion.p className="hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        Din lokala spelbutik i Oxie, Malmö
      </motion.p>

      <div className="hero-actions">
        <a href="#find-us" className="hero-btn" onClick={(e) => scrollToId(e, 'find-us')}>Besök oss idag</a>
      </div>
    </div>
  </section>
);

export default Hero;
