import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../components/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center mb-5">Stripe Payment</h2>
        <div className="p-5 rounded shadow bg-base-300">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;

// Stripe payment steps:
// --------------------
// 1. Create an account
// 2. Get Publishable Key and Secret Key from the Stripe Dashboard.
// 3. Install stripe both front-end & back-end
// 4. Setup payment route both front-end & back-end
// 5. Wrap Stripe in Your App
// 6. Test Payments with Stripe (4242 4242 4242 4242)
