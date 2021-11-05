import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    // stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    stripePromise = loadStripe(
      'pk_test_51JryuPFpzUOxECRMoyMKE8PjxdVHDEUnlaLPzN6BwXVRulA27eejbhSH0LhLcjhYX8IYhBPyLMEfKXhyObNnikih00xuM5MwWn'
    );
  }
  return stripePromise;
};

export default getStripe;
