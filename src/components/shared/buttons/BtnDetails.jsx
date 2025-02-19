import { useNavigate } from 'react-router';

const BtnDetails = ({ id }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/product/${id}`)}
      className="btn-neutral btn-outline btn px-4 py-2 rounded"
    >
      View Details
    </button>
  );
};

export default BtnDetails;
