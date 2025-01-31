import { Link, useNavigate } from 'react-router';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { BsTriangle, BsTriangleFill } from 'react-icons/bs';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { handleUpvote } from '../utils/handleUpVote';
import CardSkeleton from '../components/shared/cardSkeleton';

const FeaturedProducts = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch featured product
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => (await axiosPublic.get('/products/featured')).data,
  });

  return (
    <section className="featured-products py-24">
      <h2 className="text-center mb-10">Featured Products</h2>
      <div className="grid content-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {/* when fetching product */}
        {isLoading && <CardSkeleton num={4} />}

        {/* When product loaded successfully */}
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
            <Link
              to="/products"
              className="text-xl font-semibold mt-4 inline-block"
            >
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
    </section>
  );
};

export default FeaturedProducts;
