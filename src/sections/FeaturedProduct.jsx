import { useNavigate } from 'react-router';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { BsTriangle } from 'react-icons/bs';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { handleUpvote } from '../utils/handleUpVote';

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
              src={product.image || 'https://placehold.co/400'}
              alt={product.name}
              className="w-20 object-cover rounded-md"
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
                className="details-btn px-4 py-2 rounded btn btn-neutral"
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
