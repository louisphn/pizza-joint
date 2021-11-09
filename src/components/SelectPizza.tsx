import React, { FC } from 'react';

import { useRouter } from 'next/router';

import { getAsString } from '../lib/helper';
import Base from './Base';
import Order from './Order';
import Toppings from './Toppings';

const SelectPizza: FC = () => {
  const router = useRouter();
  const { pizza } = router.query;
  const currentPage = getAsString(pizza!);

  return (
    <>
      {currentPage === 'base' && <Base />}
      {currentPage === 'toppings' && <Toppings />}
      {currentPage === 'order' && <Order />}
    </>
  );
};

export default SelectPizza;
