import React, { FC } from 'react';

import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';

import {
  containerVariants,
  backVariants,
  arrowVariants,
  nextVariants,
  nextColor,
  nextButton,
  buttonVariants,
  listItemVariants,
} from '../variants/variants';

type Props = {
  addTopping: (topping: string) => void;
  pizza: {
    base: string;
    toppings: string[];
  };
};

const Toppings: FC<Props> = ({ addTopping, pizza }) => {
  const router = useRouter();

  const toppings = [
    'mushrooms',
    'peppers',
    'onions',
    'olives',
    'extra cheese',
    'tomatoes',
  ];

  return (
    <motion.div
      className="base"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        onClick={() => router.push('/base')}
        variants={backVariants}
        whileHover="hover"
        className="back"
      >
        <motion.div variants={arrowVariants}>
          <FaArrowLeft />
        </motion.div>
        <motion.p variants={backVariants}>
          Back to selecting pizza base
        </motion.p>
      </motion.div>
      <h3>Step 2: Choose Toppings</h3>
      <ul>
        {toppings.map((topping) => {
          const spanClass = pizza.toppings.includes(topping) ? 'active' : '';
          return (
            <motion.li
              key={topping}
              onClick={() => addTopping(topping)}
              variants={listItemVariants}
              whileHover="hover"
            >
              <motion.span
                className={spanClass}
                variants={listItemVariants}
                whileHover="hover"
                animate={
                  pizza.toppings.includes(topping) ? 'selected' : 'hidden'
                }
              >
                {topping}
              </motion.span>
            </motion.li>
          );
        })}
      </ul>
      {pizza.toppings.length > 0 && (
        <motion.div
          className="next"
          variants={nextVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          onClick={() => router.push('/order')}
        >
          <motion.span variants={nextColor}></motion.span>
          <motion.span variants={nextButton}>&#8594;</motion.span>
          <motion.button variants={buttonVariants}>Next</motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Toppings;
