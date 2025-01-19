import { useNavigate } from 'react-router';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { BsTriangle } from 'react-icons/bs';
import useAuth from '../hooks/useAuth';
import { notifyError, notifySuccess } from '../utils/notification';
import { useQuery } from '@tanstack/react-query';

const FeaturedProducts = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchFeaturedProducts = async () => {
    try {
      const res = await axiosPublic.get('/products');
      return res.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const { data: products = [], refetch } = useQuery({
    queryKey: ['products'],
    queryFn: fetchFeaturedProducts,
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
      console.log(res);
      if (res.data === 'already liked') {
        notifyError('You have already upvoted this product');
        return;
      }

      if (res.data.modifiedCount === 1) {
        refetch();
        notifySuccess('You have successfully upvoted this product');
      }
    } catch (error) {
      console.error('Error upvoting product:', error);
    }
  };

  return (
    <section className="featured-products py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Products</h2>
      <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* when fetching product */}
        {products.length === 0 && (
          <>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          </>
        )}

        {/* When product loaded successfully */}
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
                onClick={() => handleUpvote(product._id)}
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
    </section>
  );
};

export default FeaturedProducts;
