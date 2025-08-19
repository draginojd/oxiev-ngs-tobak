import React from 'react';
import './Slideshow.css';

const Slideshow = ({ images }) => (
  <div className="slideshow">
    {images.map((img, idx) => (
      <img key={idx} src={img} alt={`slide-${idx}`} className="slideshow-image" />
    ))}
  </div>
);

export default Slideshow;
