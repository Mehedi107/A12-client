import { Link, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import CardSkeleton from '../components/shared/cardSkeleton';
import BtnUpvote from '../components/shared/buttons/BtnUpvote';
import BtnDetails from '../components/shared/buttons/BtnDetails';

const TrendingProducts = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

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
    <section className="py-24 px-4 max-w-7xl mx-auto">
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
              <BtnUpvote product={product} refetch={refetch} />
              <BtnDetails id={product._id} />
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
