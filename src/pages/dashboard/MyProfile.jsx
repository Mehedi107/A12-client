import HelmetAsync from '../../components/shared/HelmetAsync';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import avatar from '../../assets/avatar.png';
import { Link } from 'react-router';

const MyProfile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // Fetch current user data
  const { data: userData = {} } = useQuery({
    queryKey: ['user'],
    queryFn: async () => (await axiosPublic.get(`/user/${user.email}`)).data,
  });

  return (
    <>
      <HelmetAsync title="My Profile" />

      <div>
        <div className="md:mt-20 p-6 max-w-4xl mx-auto bg-base-300 rounded-lg shadow ">
          {/* User Info Section */}
          <div className="user-info text-center">
            <img
              src={user?.photoURL || userData?.photo || avatar}
              alt={`${userData?.name}'s profile`}
              className="w-32 h-32 mx-auto rounded-full object-cover border-4"
            />
            <h2 className="text-2xl font-semibold mt-4">
              {user?.displayName ||
                userData?.name ||
                userData?.email ||
                'Guest User'}
            </h2>
            <p className="text-gray-600 mt-2">
              {userData?.email || 'Email not available'}
            </p>
          </div>

          {/* Subscription Section */}
          <div className="subscription-section mt-8">
            {userData.status === 'verified' ? (
              <p className="text-center bg-green-300 dark:bg-base-100 rounded shadow text-green-800 dark:text-base-content font-semibold py-3">
                Verified
              </p>
            ) : (
              <Link
                to="/dashboard/payment"
                className="btn btn-neutral btn-block font-medium"
              >
                Membership Subscription
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
