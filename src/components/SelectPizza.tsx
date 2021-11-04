import React, { FC, useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

import { getAsString } from '../lib/helper';
import Base from './Base';
import Modal from './Modal';
import Order from './Order';
import Toppings from './Toppings';

type Pizza = {
  base: string;
  toppings: string[];
};

const SelectPizza: FC = () => {
  const router = useRouter();
  const { pizza } = router.query;
  const currentPage = getAsString(pizza);

  const initialState: Pizza = {
    base: '',
    toppings: [],
  };

  const [selectedPizza, setSelectedPizza] = useState(initialState);
  const [showModal, setShowModal] = useState(false);

  const addBase = (base: string) => {
    setSelectedPizza({ ...selectedPizza, base });
  };

  const addTopping = (topping: string) => {
    let newToppings;
    if (!selectedPizza.toppings.includes(topping)) {
      newToppings = [...selectedPizza.toppings, topping];
    } else {
      newToppings = selectedPizza.toppings.filter((item) => item !== topping);
    }
    setSelectedPizza({ ...selectedPizza, toppings: newToppings });
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <Modal {...{ showModal, setShowModal }} />
      {currentPage === 'base' && (
        <Base addBase={addBase} pizza={selectedPizza} />
      )}
      {currentPage === 'toppings' && (
        <Toppings addTopping={addTopping} pizza={selectedPizza} />
      )}
      {currentPage === 'order' && (
        <Order pizza={selectedPizza} setShowModal={setShowModal} />
      )}
    </AnimatePresence>
  );
};

export default SelectPizza;
