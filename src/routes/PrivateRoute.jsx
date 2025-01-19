import { Navigate, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import useAuth from './../hooks/useAuth';
import LoadingSpinner from '../utils/LoadingSpinner';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (user) return children;

  return <Navigate to={'/login'} state={{ from: location }} replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
