import React from 'react';
import './Pagination.css';

const Pagination = ({ current, total, onPageChange }) => (
  <div className="pagination">
    {[...Array(total)].map((_, idx) => (
      <button
        key={idx}
        className={current === idx + 1 ? 'active' : ''}
        onClick={() => onPageChange(idx + 1)}
      >
        {idx + 1}
      </button>
    ))}
  </div>
);

export default Pagination;
