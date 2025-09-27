import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  const maxVisiblePages = 5;

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div
      className={`flex flex-wrap justify-center items-center mt-6 sm:mt-8 space-x-1 sm:space-x-2 ${className}`}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-1 sm:p-2 rounded-lg border border-gray-700 ${
          currentPage === 1
            ? "text-gray-500 cursor-not-allowed"
            : "text-white hover:bg-purple-600 hover:border-purple-600"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeftIcon fontSize="small" />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg border text-sm sm:text-base ${
            currentPage === page
              ? "bg-purple-600 border-purple-600 text-white"
              : "border-gray-700 text-white hover:bg-gray-700"
          }`}
          aria-label={`Page ${page}`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-1 sm:p-2 rounded-lg border border-gray-700 ${
          currentPage === totalPages
            ? "text-gray-500 cursor-not-allowed"
            : "text-white hover:bg-purple-600 hover:border-purple-600"
        }`}
        aria-label="Next page"
      >
        <ChevronRightIcon fontSize="small" />
      </button>

      {/* Page Info */}
      <span className="text-gray-400 text-xs sm:text-sm ml-2 sm:ml-4 mt-2 sm:mt-0 w-full sm:w-auto text-center sm:text-left">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
