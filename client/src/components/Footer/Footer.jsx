import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p><strong>Oxievångs Tobak</strong> — Oxievångstorget 5, Oxie</p>
      <p>Telefon: <a href="tel:+46701234567">070-123 45 67</a> | &copy; {new Date().getFullYear()}</p>
    </div>
  </footer>
);

export default Footer;
