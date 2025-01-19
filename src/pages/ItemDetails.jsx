import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import LoadingSpinner from '../utils/LoadingSpinner';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItemDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/item/details/${id}`
        );
        setItem(data);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error(err);
        setError('Failed to fetch item details. Please try again.');
      } finally {
        setLoading(false); // Ensure loading state is turned off
      }
    };

    if (id) getItemDetails();
  }, [id]); // Correct dependency array

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-center text-red-500 my-5">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-center text-3xl my-5">Item Details</h2>

      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src={item?.image} alt={item?.title || 'Item Image'} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{item?.title || 'No Title Available'}</h2>
          <p>{item?.description || 'No Description Available'}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Take Action</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
