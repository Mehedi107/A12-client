import { Link, useNavigate } from 'react-router';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import CardSkeleton from '../components/shared/cardSkeleton';
import BtnUpvote from '../components/shared/buttons/BtnUpvote';

const FeaturedProducts = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Fetch featured product
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => (await axiosPublic.get('/products/featured')).data,
  });

  return (
    <section className="featured-products py-24">
      <h2 className="text-center mb-10">Featured Products</h2>
      {/* If no product are found */}
      {isError && <p className="text-center text-lg">No products found...</p>}
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
              <BtnUpvote product={product} refetch={refetch} />
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
