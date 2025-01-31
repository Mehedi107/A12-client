import { Link, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { BsTriangle, BsTriangleFill } from 'react-icons/bs';
import useAuth from '../hooks/useAuth';
import { handleUpvote } from '../utils/handleUpVote';
import CardSkeleton from '../components/shared/cardSkeleton';

const TrendingProducts = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch trending products from the database
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['trendingProducts'],
    queryFn: async () => (await axiosPublic.get('/trending-product')).data,
  });

  return (
    <section className="trending-products py-10">
      <h2 className=" text-center mb-6">Trending Products</h2>

      {/* If no product are found */}
      {isError && <p className="text-center text-lg">No products found...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* While product is fetching */}
        {isLoading && <CardSkeleton num={3} />}

        {/* Display all products */}
        {products.map(product => (
          <div
            key={product._id}
            className="product-card bg-base-200 rounded-lg shadow p-4"
          >
            <img
              src={product.image || 'https://placehold.co/400'}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <Link to="/products" className="text-xl font-semibold mt-4">
              {product.name}
            </Link>
            <p className="text-sm text-gray-600 mt-2">
              {product.tags.join(', ')}
            </p>
            <div className="flex items-center justify-between mt-6">
              <button
                disabled={product?.addedBy === user?.email}
                onClick={() =>
                  handleUpvote(
                    product._id,
                    user,
                    navigate,
                    axiosPublic,
                    refetch
                  )
                }
                className="btn btn-warning flex items-center gap-2"
              >
                {product.likedUsers.includes(user?.email) ? (
                  <BsTriangleFill />
                ) : (
                  <BsTriangle />
                )}
                {product.vote}
              </button>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="details-btn px-4 py-2 rounded btn btn-neutral"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        {isError ? (
          ''
        ) : (
          <button
            onClick={() => navigate('/products')}
            className="btn text-base btn-neutral btn-wide mt-5 px-6 py-3 rounded "
          >
            Show All Products
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
