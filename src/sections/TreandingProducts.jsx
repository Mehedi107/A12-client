import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { BsTriangle } from 'react-icons/bs';
import useAuth from '../hooks/useAuth';
import { handleUpvote } from '../utils/handleUpVote';
import CardSkeleton from '../components/shared/cardSkeleton';

const TrendingProducts = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch trending products from the database
  const fetchTrendingProducts = async () => {
    try {
      const res = await axiosPublic.get('/trending');
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
    queryKey: ['trendingProducts'],
    queryFn: fetchTrendingProducts,
  });

  // const handleUpvote = async productId => {
  //   if (!user) {
  //     notifyError('Please login to upvote a product');
  //     navigate('/login');
  //     return;
  //   }

  //   try {
  //     const res = await axiosPublic.patch(`/product/upvote/${productId}`, {
  //       user: user?.email,
  //     });
  //     if (res.data === 'already liked') {
  //       notifyError('You have already upvoted this product');
  //       return;
  //     }

  //     if (res.data.modifiedCount === 1) {
  //       notifySuccess('You have successfully upvoted this product');
  //       refetch();
  //     }
  //   } catch (error) {
  //     console.error('Error upvoting product:', error);
  //   }
  // };

  // if (isLoading) {
  //   return <p className="text-center my-5">Loading Trending Products...</p>;
  // }

  // if (isError) {
  //   return (
  //     <p className="text-center text-red-500 my-5">
  //       Failed to load trending products. Please try again later.
  //     </p>
  //   );
  // }

  return (
    <section className="trending-products py-10">
      <h2 className=" text-center mb-6">Trending Products</h2>

      {/* If no product are found */}
      {isError && <p className="text-center text-lg">No products found...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* While there is no product or Loading product */}
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
              className="w-20 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-2">
              {product.tags.join(', ')}
            </p>
            <div className="flex items-center justify-between mt-4">
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
                className="upvote-btn flex items-center gap-2 btn px-6 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
              >
                <BsTriangle />
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
