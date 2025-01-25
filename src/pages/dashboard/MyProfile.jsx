import HelmetAsync from '../../components/shared/HelmetAsync';
import useAuth from '../../hooks/useAuth';
import Modal from '../../components/shared/Modal';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { notifyError, notifySuccess } from './../../utils/notification';
import avatar from '../../assets/avatar.png';

const MyProfile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const subscriptionAmount = 49.99;

  const fetchCurrentUser = async () => {
    const res = await axiosPublic.get(`/user/${user.email}`);
    return res.data;
  };
  const { data: userData = {}, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: fetchCurrentUser,
  });

  const handleSubscribe = () => {
    document.getElementById('my_modal_3').showModal();
  };

  const handlePaymentSuccess = async () => {
    try {
      const res = await axiosPublic.patch(`/user/verify/${user.email}`);

      if (res.data.modifiedCount) {
        notifySuccess('Payment successful');
        document.getElementById('my_modal_3').close();
        refetch();
      }
    } catch (error) {
      notifyError('Payment failed');
      console.log(error);
    }
  };

  // console.log(userData);

  return (
    <>
      <HelmetAsync title="My Profile" />
      <div>
        <div className="mt-20 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md ">
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
            {userData?.status !== 'verified' ? (
              <button
                onClick={handleSubscribe}
                className="subscribe-btn w-full py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg text-lg"
              >
                Subscribe for ${subscriptionAmount}
              </button>
            ) : (
              <div className="subscription-status text-center">
                <p className="text-lg font-semibold text-green-600 mt-4">
                  Status: Verified
                </p>
              </div>
            )}
          </div>

          {/* Subscription Modal */}
          <Modal handlePaymentSuccess={handlePaymentSuccess} />
        </div>
      </div>
    </>
  );
};

export default MyProfile;
