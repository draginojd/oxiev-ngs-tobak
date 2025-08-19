import React from 'react';
import './Breadcrumb.css';

const Breadcrumb = ({ items }) => (
  <nav className="breadcrumb">
    {items.map((item, idx) => (
      <span key={idx} className="breadcrumb-item">
        {item}
        {idx < items.length - 1 && ' / '}
      </span>
    ))}
  </nav>
);

export default Breadcrumb;
