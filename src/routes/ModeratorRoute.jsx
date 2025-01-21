import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { Navigate, useLocation } from 'react-router';
import PropTypes from 'prop-types';

const ModeratorRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [role, setRole] = useState('');

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await axiosPublic.get(`/user/${user.email}`);
      console.log(res.data.role);
      setRole(res.data.role);
    };
    fetchCurrentUser();
  }, [axiosPublic, user.email]);

  if (role === 'moderator') {
    return children;
  }

  return <Navigate to={'/login'} state={{ from: location }} replace />;
};

ModeratorRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModeratorRoute;
