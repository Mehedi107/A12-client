import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import useAxiosPublic from '../hooks/useAxiosPublic';
import HelmetAsync from './../components/shared/HelmetAsync';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import BtnUpvote from '../components/shared/buttons/BtnUpvote';
import BtnDetails from '../components/shared/buttons/BtnDetails';

const ProductAll = () => {
  const axiosPublic = useAxiosPublic();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 6;

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => (await axiosPublic.get('/all-products')).data,
  });

  console.log(products);

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
  const pageCount = Math.ceil(products.length / ITEMS_PER_PAGE);
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
    <div className="py-10 px-4 mt-[68px]">
      <div className="max-w-7xl mx-auto">
        <HelmetAsync title={'All Products'} />
        <div className="flex flex-col sm:flex-row justify-between gap-5 mb-10 items-center">
          <h2>All Products</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by tags..."
              className="input input-bordered max-w-xs md:w-full"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {isLoading && <LoadingSpinner />}

        {/* Products grid */}
        <div className="grid content-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <div
                key={product._id}
                className="product-card bg-base-200 rounded-lg shadow p-4"
              >
                <img
                  src={product.image || 'https://placehold.co/400'}
                  alt={product.name}
                  className="w-20 rounded-md"
                />
                <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {product.tags.join(', ')}
                </p>
                <div className="flex items-center justify-between mt-6">
                  <BtnUpvote product={product} refetch={refetch} />
                  <BtnDetails product={product} />
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
    </div>
  );
};

export default ProductAll;
