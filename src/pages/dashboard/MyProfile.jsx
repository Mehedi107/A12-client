import HelmetAsync from '../../components/shared/HelmetAsync';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Modal from '../../components/shared/Modal';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const MyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [isSubscribed, setIsSubscribed] = useState(false);
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const subscriptionAmount = 49.99;

  const fetchUser = async () => {
    const res = await axiosPublic.get(`/user/${user.email}`);
    return res.data;
  };
  const { data: userData = {} } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  const handleSubscribe = () => {
    document.getElementById('my_modal_3').showModal();
    // setIsModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsSubscribed(true);
    // setIsModalOpen(false);
  };

  return (
    <>
      <HelmetAsync title="My Profile" />
      <div>
        <div className="mt-20 p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md ">
          {/* User Info Section */}
          <div className="user-info text-center">
            <img
              src={user?.photoURL || 'https://via.placeholder.com/150'}
              alt={`${user?.displayName}'s profile`}
              className="w-32 h-32 mx-auto rounded-full object-cover"
            />
            <h2 className="text-2xl font-semibold mt-4">
              {user?.displayName || 'Guest User'}
            </h2>
            <p className="text-gray-600 mt-2">
              {user?.email || 'Email not available'}
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
          {/* {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <div className="payment-form text-center p-6">
                <h3 className="text-2xl font-semibold mb-4">
                  Payment Checkout
                </h3>
                <p className="mb-6">
                  You are subscribing for ${subscriptionAmount}.
                </p>
                <button
                  onClick={handlePaymentSuccess}
                  className="pay-btn px-6 py-3 text-white bg-green-500 hover:bg-green-600 rounded-lg text-lg"
                >
                  Pay Now
                </button>
              </div>
            </Modal>
          )} */}
          <Modal />
        </div>
      </div>
    </>
  );
};

export default MyProfile;
