import { useQuery } from '@tanstack/react-query';
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

  return (
    <div className="py-10">
      <h2 className="font-semibold text-3xl mb-5 text-center">All Products</h2>
      {/* Products grid */}
      <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map(product => (
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
                // disabled={user?.email === product.ownerEmail}
                className={`upvote-btn flex items-center gap-2 px-4 py-2 rounded `}
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
        ))}
      </div>
    </div>
  );
};

export default ProductAll;
