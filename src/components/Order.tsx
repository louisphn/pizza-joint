import React, { VFC, useState } from 'react';

import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

import { pizzaAtom } from '../contexts/pizzaContext';
import { fetchPostJSON } from '../lib/helper';
import getStripe from '../utils/get-stripejs';
import { backVariants, arrowVariants } from '../variants/variants';
import Loading from './Loading';

const Order: VFC = () => {
  const router = useRouter();
  const [selectedPizza] = useAtom(pizzaAtom);
  const [isLoading, setIsLoading] = useState(false);

  const baseTotal = selectedPizza.base.price;
  const toppingsPrice = selectedPizza.toppings.map((topping) => topping.price);
  const toppingsTotal = toppingsPrice.reduce(
    (prevValue, currValue) => prevValue + currValue,
    0
  );
  const total = baseTotal + toppingsTotal;

  const notify = () =>
    toast.error('Oops! Something went wrong. Please try again in a moment.');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/checkout', {
      amount: total,
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      notify();
      setIsLoading(false);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    setIsLoading(false);
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
    notify();
  };

  return (
    <>
      <Loading {...{ isLoading }} />
      <Toaster />
      <form className="order" onSubmit={(e) => handleSubmit(e)} method="POST">
        <motion.div
          onClick={() => router.push('/toppings')}
          variants={backVariants}
          whileHover="hover"
          className="back"
        >
          <motion.div variants={arrowVariants}>
            <FaArrowLeft />
          </motion.div>
          <motion.p variants={backVariants}>
            Back to selecting pizza toppings
          </motion.p>
        </motion.div>
        <div>
          <p>
            You have ordered a {selectedPizza.base.item} pizza with toppings:
          </p>
          <ul>
            {selectedPizza.toppings &&
              selectedPizza.toppings.map((topping) => (
                <li key={topping.item}>{topping.item}</li>
              ))}
          </ul>
          <p>Total: ¥{total}</p>
        </div>
        <button type="submit">Check out</button>
      </form>
    </>
  );
};

export default Order;
