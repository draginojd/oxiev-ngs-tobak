import React from 'react';
import './PortfolioItem.css';

const PortfolioItem = ({ title, description, image, link }) => (
  <div className="portfolio-item">
    <img src={image} alt={title} className="portfolio-item-image" />
    <h3>{title}</h3>
    <p>{description}</p>
    {link && <a href={link} target="_blank" rel="noopener noreferrer">View Project</a>}
  </div>
);

export default PortfolioItem;
