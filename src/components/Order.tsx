import React, { VFC, useState } from 'react';

import { useAtom } from 'jotai';

import { modalContext } from '../contexts/modalContext';
import { pizzaAtom } from '../contexts/pizzaContext';
import { fetchPostJSON } from '../lib/helper';
import getStripe from '../utils/get-stripejs';
import Loading from './Loading';

const Order: VFC = () => {
  const [selectedPizza] = useAtom(pizzaAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [, setShowModal] = useAtom(modalContext);

  const baseTotal = selectedPizza.base.price;
  const toppingsPrice = selectedPizza.toppings.map((topping) => topping.price);
  const toppingsTotal = toppingsPrice.reduce(
    (prevValue, currValue) => prevValue + currValue,
    0
  );
  const total = baseTotal + toppingsTotal;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/checkout', {
      amount: total,
    });

    if (response.statusCode === 500) {
      console.error(response.message);
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
  };

  return (
    <>
      <Loading {...{ isLoading }} />
      <form className="order" onSubmit={(e) => handleSubmit(e)} method="POST">
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
        <button type="button" onClick={() => setShowModal(true)}>
          Order one more pizza
        </button>
      </form>
    </>
  );
};

export default Order;
