import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51JryuPFpzUOxECRMcVqrkJOhk3sZfnGXjBJr6CVmOlxZ7PJwSNW1Nxd0WpU6DFweJlGKLmMEyiOlPT0KgLswbWYR00fxHQPs3i',
  {
    apiVersion: '2020-08-27',
  }
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { amount } = req.body;
    try {
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        line_items: [
          {
            name: 'Pay for your selected pizza',
            amount,
            currency: 'jpy',
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/order`,
      };
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
