import React, { FC } from 'react';

import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';

import { pizzaAtom } from '../contexts/pizzaContext';
import { toppings } from '../lib/data';
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

const Toppings: FC = () => {
  const router = useRouter();

  const [selectedPizza, setSelectedPizza] = useAtom(pizzaAtom);

  const addTopping = (topping: { item: string; price: number }) => {
    let newToppings;
    if (
      selectedPizza.toppings.filter((data) => data.item === topping.item)
        .length === 0
    ) {
      if (selectedPizza.toppings[0]?.item === '') {
        newToppings = [topping];
      } else {
        newToppings = [...selectedPizza.toppings, topping];
      }
    } else {
      newToppings = selectedPizza.toppings.filter(
        (data) => data.item !== topping.item
      );
    }
    setSelectedPizza({ ...selectedPizza, toppings: newToppings });
  };

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
          const spanClass =
            selectedPizza.toppings.filter((data) => data.item === topping.item)
              .length > 0
              ? 'active'
              : '';
          return (
            <motion.li
              key={topping.item}
              onClick={() => addTopping(topping)}
              variants={listItemVariants}
              whileHover="hover"
            >
              <motion.span
                className={spanClass}
                variants={listItemVariants}
                whileHover="hover"
                animate={
                  selectedPizza.toppings.filter(
                    (data) => data.item === topping.item
                  ).length > 0
                    ? 'selected'
                    : 'hidden'
                }
              >
                {topping.item}
                {selectedPizza.toppings.filter(
                  (data) => data.item === topping.item
                ).length > 0 && <span> ¥{topping.price}</span>}
              </motion.span>
            </motion.li>
          );
        })}
      </ul>
      <motion.div
        className="next"
        variants={nextVariants}
        initial="hidden"
        animate={selectedPizza.toppings[0]?.item !== '' && 'visible'}
        whileHover="hover"
        onClick={() => router.push('/order')}
      >
        <motion.span variants={nextColor}></motion.span>
        <motion.span variants={nextButton}>&#8594;</motion.span>
        <motion.button variants={buttonVariants}>Next</motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Toppings;
