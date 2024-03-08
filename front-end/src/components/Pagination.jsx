import React from "react";
import "./Pagination.css"
const Pagination = ({itemsPerPage, totalItems, paginate, currentPage, currentItems}) => {
    const pageNumber = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumber.push(i);
    }

    return (

        <div>
            <p className="text-center">Showing items {itemsPerPage * (currentPage-1) + 1}-{itemsPerPage * (currentPage-1) + currentItems.length} of {totalItems} items</p>
            <nav className="pagination-container">
                <ul className='pagination'>
                    <li>
                        <button onClick={() => paginate(1)} disabled = {currentPage === 1}>
                            {"<<"}
                        </button>
                    </li>
                    <li>
                        <button onClick={() => paginate(currentPage - 1)} disabled = {currentPage === 1}>
                            Previous
                        </button>
                    </li>
                        {pageNumber.map(number => (
                        <li key={number} className='page-item'>
                        <button onClick={() => paginate(number)} className={`page-link ${currentPage === number ? 'active' : ''}`}>
                            {number}
                        </button>
                        </li>
                        ))}
                    <li>
                        <button onClick={() => paginate(currentPage + 1)} disabled = {currentPage === totalPages}>
                            Next
                        </button>
                    </li>
                    <li>
                        <button onClick={() => paginate(totalPages)} disabled = {currentPage === totalPages}>
                            {">>"}
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
      );
};

export default Pagination;