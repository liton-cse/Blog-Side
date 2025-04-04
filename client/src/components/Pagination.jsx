import React, { useState, useEffect } from "react";
import "../styles/Pagination.css";

const Pagination = ({ pagination, onPageChange }) => {
  const { total, page, pages, limit } = pagination;
  const [currentPage, setCurrentPage] = useState(page);

  // Sync local state with prop changes
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  // Generate page numbers with windowing (shows only nearby pages)
  const getPageNumbers = () => {
    const visiblePages = 3; // Number of pages to show around current page
    let startPage = Math.max(1, currentPage - visiblePages);
    let endPage = Math.min(pages, currentPage + visiblePages);

    // Adjust if we're at the start or end
    if (currentPage <= visiblePages) {
      endPage = Math.min(2 * visiblePages + 1, pages);
    }
    if (currentPage >= pages - visiblePages) {
      startPage = Math.max(pages - 2 * visiblePages, 1);
    }

    const pagesArray = [];
    for (let i = startPage; i <= endPage; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pages || newPage === currentPage) return;
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  if (pages <= 1) return null;

  return (
    <div className="pagination-container">
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          &laquo; Prev
        </button>

        {/* Show first page if not in initial window */}
        {currentPage > 3 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="pagination-button"
            >
              1
            </button>
            {currentPage > 4 && (
              <span className="pagination-ellipsis">...</span>
            )}
          </>
        )}

        {getPageNumbers().map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`pagination-button ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}

        {/* Show last page if not in end window */}
        {currentPage < pages - 2 && (
          <>
            {currentPage < pages - 3 && (
              <span className="pagination-ellipsis">...</span>
            )}
            <button
              onClick={() => handlePageChange(pages)}
              className="pagination-button"
            >
              {pages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pages}
          className="pagination-button"
        >
          Next &raquo;
        </button>
      </div>

      <div className="pagination-info">
        Showing {(currentPage - 1) * limit + 1} -{" "}
        {Math.min(currentPage * limit, total)} of {total} items
      </div>
    </div>
  );
};

export default Pagination;
