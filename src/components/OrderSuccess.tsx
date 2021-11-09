import { FC, useEffect } from 'react';

import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { toast, Toaster } from 'react-hot-toast';

import { modalContext } from '../contexts/modalContext';
import { pizzaAtom } from '../contexts/pizzaContext';
import { orderContainerVariants, childVariants } from '../variants/variants';

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: '#fff',
    stroke: '#fff',
    strokeWidth: 1,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: '#2cb67d',
    stroke: '#2cb67d',
    transition: {
      default: { duration: 3, delay: 1.5, ease: 'easeInOut' },
    },
  },
};

const OrderSuccess: FC = () => {
  const [selectedPizza] = useAtom(pizzaAtom);
  const [, setShowModal] = useAtom(modalContext);

  useEffect(() => {
    toast('Success!', {
      duration: 4000,
      icon: '✨',
      style: {
        border: '2px solid #00AB66',
        padding: '16px',
        color: '#00AB66',
      },
    });
  }, []);

  return (
    <>
      <Toaster />
      <motion.div
        className="order"
        variants={orderContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="56px"
          viewBox="0 0 24 24"
          width="56px"
          fill="#000000"
          className="success-svg"
        >
          <path d="M0 0h24v24H0V0z" fill="none" stroke="none" />
          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"
          />
        </svg>
        <h2>
          Thank you for your order. We look forward to serving you again :)
        </h2>
        <motion.p variants={childVariants}>
          Your ordered a {selectedPizza.base.item} pizza with:
        </motion.p>
        <motion.ul variants={childVariants}>
          <>
            {selectedPizza.toppings.map((topping) => (
              <li key={topping.item}>{topping.item}</li>
            ))}
            <button onClick={() => setShowModal(true)}>
              Order one more pizza?
            </button>
          </>
        </motion.ul>
      </motion.div>
    </>
  );
};

export default OrderSuccess;
