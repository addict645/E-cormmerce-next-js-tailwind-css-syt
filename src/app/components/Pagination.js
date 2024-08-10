'use client';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div className="flex flex-wrap justify-center mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-lg mx-1 mb-2 bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          className={`px-4 py-2 border rounded-lg mx-1 mb-2 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-lg mx-1 mb-2 bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
