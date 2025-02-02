import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import { swalSuccess } from '../utils/swalSuccess';

const CheckoutForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [errMessage, setErrMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const amount = 49.99;
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    try {
      const { data } = await axiosSecure.post('/create-payment-intent', {
        price: amount,
        email: user.email,
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
          },
        },
      });

      if (result.error) return setErrMessage(result.error.message);

      if (result.paymentIntent.status === 'succeeded') {
        setSuccessMessage('Payment successful!');

        // Set user verified to database
        const { data } = await axiosSecure.patch('/verify-user', {
          email: user?.email,
        });
        console.log(data);
        if (data.modifiedCount) {
          swalSuccess('You are verified now');
          navigate('/dashboard/my-profile');
        }
      }
    } catch (error) {
      setErrMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {errMessage && <p className="text-red-500">{errMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <button
        className="btn btn-block mt-4 btn-neutral"
        type="submit"
        disabled={!stripe || loading}
      >
        Pay {amount}
      </button>
      {/* <p className="text-red-600 mt-3">{errMessage}</p> */}
    </form>
  );
};

export default CheckoutForm;
