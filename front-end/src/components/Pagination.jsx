import React from "react";
import "./Pagination.css"
const Pagination = ({itemsPerPage, totalItems, paginate, currentPage}) => {
    const pageNumber = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <div className = "pagination-container">
            <nav>
                <ul className='pagination'>
                    <li>
                        <button onClick={() => paginate(1)} disabled = {currentPage === 1}>
                            First
                        </button>
                    </li>
                    <li>
                        <button onClick={() => paginate(currentPage - 1)} disabled = {currentPage === 1}>
                            Previous
                        </button>
                    </li>
                    <li>
                        {pageNumber.map(number => (
                        <li key={number} className='page-item'>
                        <button onClick={() => paginate(number)} className={`page-link ${currentPage === number ? 'active' : ''}`}>
                            {number}
                        </button>
                        </li>
                        ))}
                    </li>
                    <li>
                        <button onClick={() => paginate(currentPage + 1)} disabled = {currentPage === totalPages}>
                            Next
                        </button>
                    </li>
                    <li>
                        <button onClick={() => paginate(totalPages)} disabled = {currentPage === totalPages}>
                            Last
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
      );
};

export default Pagination;