import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { BsTriangle } from 'react-icons/bs';
import useAuth from '../hooks/useAuth';
import { notifyError, notifySuccess } from '../utils/notification';

const TrendingProducts = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch trending products from the database
  const fetchTrendingProducts = async () => {
    try {
      const res = await axiosPublic.get('/trending');
      // Sort products by vote count in descending order and return the top 6
      //   return res.data.sort((a, b) => b.vote - a.vote).slice(0, 6);
      return res.data;
    } catch (error) {
      console.error('Error fetching trending products:', error);
      throw new Error('Failed to fetch trending products.');
    }
  };

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['trendingProducts'],
    queryFn: fetchTrendingProducts,
  });

  const handleUpvote = async productId => {
    if (!user) {
      notifyError('Please login to upvote a product');
      navigate('/login');
      return;
    }

    try {
      const res = await axiosPublic.patch(`/product/upvote/${productId}`, {
        user: user?.email,
      });
      if (res.data === 'already liked') {
        notifyError('You have already upvoted this product');
        return;
      }

      if (res.data.modifiedCount === 1) {
        notifySuccess('You have successfully upvoted this product');
        refetch();
      }
    } catch (error) {
      console.error('Error upvoting product:', error);
    }
  };

  if (isLoading) {
    return <p className="text-center my-5">Loading Trending Products...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 my-5">
        Failed to load trending products. Please try again later.
      </p>
    );
  }

  console.log(products);

  return (
    <section className="trending-products py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Trending Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map(product => (
          <div
            key={product._id}
            className="product-card bg-white rounded-lg shadow-lg p-4"
          >
            <img
              src={'https://placehold.co/400'}
              alt={product.name}
              className="h-40 w-full object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-2">
              {product.tags.join(', ')}
            </p>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => handleUpvote(product._id)}
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
        ))}
      </div>
      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/products')}
          className="btn btn-primary px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Show All Products
        </button>
      </div>
    </section>
  );
};

export default TrendingProducts;
