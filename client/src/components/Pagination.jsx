import React from 'react';
import '../style/pagination.css';

const Pagination = ({ paginationNumbers, currentPage, onPageChange }) => {
  return (
    <div className="pagination">
      {paginationNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={pageNumber === currentPage ? 'active' : ''}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
