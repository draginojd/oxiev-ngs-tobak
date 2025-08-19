import React from 'react';
import './Checkbox.css';

const Checkbox = ({ checked, onChange, label }) => (
  <label className="checkbox">
    <input type="checkbox" checked={checked} onChange={onChange} />
    {label}
  </label>
);

export default Checkbox;
