import React, { useState, useEffect } from 'react';
import './Navigation.css';



const scrollToSection = (e, href, setActive) => {
  e.preventDefault();
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setActive(href);
  }
};


const Navigation = ({ links }) => {
  const [active, setActive] = useState(links[0]?.href || '#home');

  useEffect(() => {
    const handleScroll = () => {
      let found = false;
      for (let i = links.length - 1; i >= 0; i--) {
        const section = document.getElementById(links[i].href.replace('#', ''));
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 80) {
            setActive(links[i].href);
            found = true;
            break;
          }
        }
      }
      if (!found) setActive(links[0]?.href || '#home');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  return (
    <nav className="navigation">
      <div className="nav-content">
        <div className="nav-logo">
          <a href="#home" onClick={e => scrollToSection(e, '#home', setActive)}>
           Armin Fazli Khan
          </a>
        </div>
        <ul className="nav-links">
          {links.map((link, idx) => (
            <li key={idx}>
              <a
                href={link.href}
                className={active === link.href ? 'active' : ''}
                onClick={e => scrollToSection(e, link.href, setActive)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
