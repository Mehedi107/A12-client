import PropTypes from 'prop-types';
import { handleReport } from '../../../utils/handleReport';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const BtnReport = ({ product, refetch }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  return (
    <button
      className="btn btn-error"
      onClick={() => handleReport(product._id, user, axiosPublic, refetch)}
    >
      {product.reportedBy.includes(user.email) ? 'Reported' : 'Report'}
    </button>
  );
};

BtnReport.propTypes = {
  product: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default BtnReport;
