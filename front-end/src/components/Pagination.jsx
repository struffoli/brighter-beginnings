import React from "react";
const Pagination = ({itemsPerPage, totalItems, paginate, currentPage}) => {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <nav>
          <ul className='pagination'>
            {pageNumber.map(number => (
              <li key={number} className='page-item'>
                <a onClick={() => paginate(number)} href='!#' className={`page-link ${currentPage === number ? 'active' : ''}`}>
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      );
};

export default Pagination;