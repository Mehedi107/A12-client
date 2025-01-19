import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import LoadingSpinner from '../utils/LoadingSpinner';
import useAxiosPublic from '../hooks/useAxiosPublic';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const getItemDetails = async () => {
      try {
        const { data } = await axiosPublic.get(`product/details/${id}`);
        setProduct(data);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error(err);
        setError('Failed to fetch item details. Please try again.');
      } finally {
        setLoading(false); // Ensure loading state is turned off
      }
    };

    if (id) getItemDetails();
  }, [id, axiosPublic]); // Correct dependency array

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-center text-red-500 my-5">{error}</p>;
  }

  console.log(product?.image);

  return (
    <div className="min-h-screen items-center">
      <h2 className="text-center text-3xl my-5">Item Details</h2>

      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://placehold.co/400"
            alt={product?.name || 'Item Image'}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {product?.name || 'No Title Available'}
          </h2>
          <p>{product?.tags || 'No Description Available'}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Take Action</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
