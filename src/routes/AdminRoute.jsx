import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { Navigate, useLocation } from 'react-router';
import PropTypes from 'prop-types';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [role, setRole] = useState(null); // `null` to indicate loading state
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (user?.email) {
          const res = await axiosPublic.get(`/user/${user.email}`);
          setRole(res.data.role);
        }
      } catch (error) {
        console.error('Error fetching user role:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [axiosPublic, user?.email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (role !== 'admin') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
