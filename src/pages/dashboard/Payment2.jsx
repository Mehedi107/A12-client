import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm2 from '../../components/CheckoutForm2';
import { loadStripe } from '@stripe/stripe-js';

const Payment2 = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    paymentMethodTypes: ['card'], // Allow only card payments
    appearance: {
      theme: 'stripe',
    },
    defaultValues: {
      link: {
        enabled: false, // Disables Link (1-Click Checkout)
      },
    },
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center mb-5">Stripe Payment</h2>
        <div className="p-5 rounded shadow bg-base-300">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm2 />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment2;
