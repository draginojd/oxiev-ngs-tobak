import React, { useEffect, useRef, useState } from 'react';
import './Cursor.css';

const Cursor = () => {
  const cursorRef = useRef(null);
  const [enabled, setEnabled] = useState(true);

  // Track viewport to disable cursor on small screens
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(max-width: 600px)');
    const handle = () => setEnabled(!mq.matches);
    handle();
    if (mq.addEventListener) mq.addEventListener('change', handle);
    else mq.addListener(handle);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handle);
      else mq.removeListener(handle);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const cursor = cursorRef.current;
    if (!cursor) return undefined;

    let mouseX = 0;
    let mouseY = 0;
    let px = 0;
    let py = 0;
    let rafId = null;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '1';
    };

    const animate = () => {
      px += (mouseX - px) * 0.2;
      py += (mouseY - py) * 0.2;
      cursor.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    const onPointerLeave = () => {
      cursor.style.opacity = '0';
    };

    const onHover = () => cursor.classList.add('cursor--hover');
    const onUnhover = () => cursor.classList.remove('cursor--hover');

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onPointerLeave);
    document.querySelectorAll('a, button, .project-card, .hero-btn').forEach(el => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onUnhover);
    });

    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      document.querySelectorAll('a, button, .project-card, .hero-btn').forEach(el => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onUnhover);
      });
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />;
};

export default Cursor;
