import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { Navigate, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const ModeratorRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [role, setRole] = useState(null); // Initial state is `null` to indicate loading
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (user?.email) {
          const res = await axiosPublic.get(`/user/${user.email}`);
          const userRole = res?.data?.role;

          // Check if the role is either 'admin' or 'moderator'
          if (userRole === 'admin' || userRole === 'moderator') {
            setRole(userRole);
          } else {
            setRole('unauthorized'); // Explicitly set for clarity
          }
        }
      } catch (error) {
        console.error('Error fetching user role:', error.message);
      } finally {
        setLoading(false); // Loading ends whether the request is successful or not
      }
    };

    fetchCurrentUser();
  }, [axiosPublic, user?.email]);

  // Show a loading spinner or fallback while role is being determined
  if (loading) {
    return <LoadingSpinner />;
  }

  // Redirect if the user is neither a moderator nor an admin
  if (role !== 'moderator' && role !== 'admin') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Render children if the user is authorized
  return children;
};

ModeratorRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModeratorRoute;
