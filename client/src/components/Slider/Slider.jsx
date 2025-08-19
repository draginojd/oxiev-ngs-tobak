import React from 'react';
import './Slider.css';

const Slider = ({ min, max, value, onChange }) => (
  <input
    type="range"
    className="slider"
    min={min}
    max={max}
    value={value}
    onChange={onChange}
  />
);

export default Slider;
