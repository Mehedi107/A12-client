import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import useAxiosPublic from '../hooks/useAxiosPublic';
import LoadingSpinner from '../utils/LoadingSpinner';
import { BsTriangle } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { handleUpvote } from '../utils/handleUpVote';

const ProductAll = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 6;

  const fetchAllProducts = async () => {
    try {
      const res = await axiosPublic.get('/all-products');
      return res.data;
    } catch (error) {
      console.error('Error fetching trending products:', error);
    }
  };

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error fetching products</div>;
  }

  // Filter products based on the search query matching any tag
  const filteredProducts = products.filter(product =>
    product.tags.some(tag =>
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Paginate filtered products
  const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    offset,
    offset + ITEMS_PER_PAGE
  );

  // Handle page click
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="py-10 px-4">
      <div className="flex justify-between gap-5 mb-10 items-center">
        <h2 className="font-semibold text-3xl">All Products</h2>
        <input
          type="text"
          placeholder="Search by tags..."
          className="input input-bordered max-w-xs md:w-full"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products grid */}
      <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <div
              key={product._id}
              className="product-card bg-white rounded-lg shadow-lg p-4"
            >
              <img
                src="https://placehold.co/400"
                alt={product.name}
                className="h-40 w-full object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-2">
                {product.tags.join(', ')}
              </p>
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() =>
                    handleUpvote(
                      product._id,
                      user,
                      navigate,
                      axiosPublic,
                      refetch
                    )
                  }
                  className="upvote-btn flex items-center gap-2 px-4 py-2 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  <BsTriangle />
                  {product.vote}
                </button>
                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="details-btn px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products match your search.
          </p>
        )}
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName="pagination flex justify-center items-center mt-8 space-x-2"
        pageClassName="page-item"
        pageLinkClassName="px-4 py-2 border rounded hover:bg-gray-200"
        previousLinkClassName="px-4 py-2 border rounded hover:bg-gray-200"
        nextLinkClassName="px-4 py-2 border rounded hover:bg-gray-200"
        activeLinkClassName="bg-gray-800 text-white"
        disabledLinkClassName="text-gray-400 cursor-not-allowed"
      />
    </div>
  );
};

export default ProductAll;
