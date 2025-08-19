import React from 'react';
import './Contact.css';

const Contact = () => (
  <section className="contact-section" id="contacts">
    <h2 className="contact-title">Get In Touch</h2>
    <div className="contact-content">
      <div className="contact-left">
        <h3 className="contact-subtitle">Let's Work Together</h3>
        <p className="contact-desc">
          I'm always interested in new opportunities and exciting projects. Whether you need DevOps expertise, frontend development, or full-stack solutions, let's discuss how we can bring your ideas to life.
        </p>
        <div className="contact-info">
          <div className="contact-info-item">
            <span className="contact-info-icon">📧</span>
            <span><b>arminfazlikhan@gmail.com</b></span>
          </div>
          <div className="contact-info-item">
            <span className="contact-info-icon">📞</span>
            <span><a href="tel:+46702038040" className="contact-phone"><b>+46 (70) 203 80 40</b></a></span>
          </div>
          <div className="contact-info-item">
            <span className="contact-info-icon">📍</span>
            <span><b>Stockholm, Sweden</b></span>
          </div>
        </div>
        <div className="contact-socials">
          <a href="#" className="contact-social-btn" aria-label="GitHub">🐙</a>
          <a href="#" className="contact-social-btn" aria-label="LinkedIn">💼</a>
        </div>
      </div>
      <form className="contact-form" autoComplete="off">
        <h3 className="contact-form-title">Send a Message</h3>
        <div className="contact-form-row">
          <input type="text" placeholder="Your name" name="name" required />
          <input type="email" placeholder="your.email@example.com" name="email" required />
        </div>
        <input type="text" placeholder="Project inquiry" name="subject" className="contact-form-subject" required />
        <textarea placeholder="Tell me about your project..." name="message" rows={5} required />
        <button type="submit" className="contact-form-btn">Send Message</button>
      </form>
    </div>
  </section>
);

export default Contact;
