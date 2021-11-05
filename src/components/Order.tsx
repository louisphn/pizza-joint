import { VFC } from 'react';

import { useAtom } from 'jotai';

import { modalContext } from '../contexts/modalContext';
import { pizzaAtom } from '../contexts/pizzaContext';
import { fetchPostJSON } from '../lib/helper';
import getStripe from '../utils/get-stripejs';

const Order: VFC = () => {
  const [selectedPizza] = useAtom(pizzaAtom);
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
    <form
      className="order"
      style={{ marginTop: '88px' }}
      onSubmit={(e) => handleSubmit(e)}
      method="POST"
    >
      <div>
        <p>You have ordered a {selectedPizza.base.item} pizza with toppings:</p>
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
  );
};

export default Order;
