import { BsTriangle, BsTriangleFill } from 'react-icons/bs';
import useAuth from '../../../hooks/useAuth';
import { handleUpvote } from '../../../utils/handleUpVote';
import PropTypes from 'prop-types';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router';

const BtnUpvote = ({ product, refetch }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  return (
    <button
      disabled={product?.addedBy === user?.email}
      onClick={() =>
        handleUpvote(product._id, user, navigate, axiosPublic, refetch)
      }
      className={`btn btn-warning flex items-center gap-2`}
    >
      {product.likedUsers.includes(user?.email) ? (
        <BsTriangleFill />
      ) : (
        <BsTriangle />
      )}

      {product.vote}
    </button>
  );
};

BtnUpvote.propTypes = {
  product: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default BtnUpvote;
