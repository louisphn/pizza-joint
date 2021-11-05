import { atomWithStorage } from 'jotai/utils';

const initialState = {
  base: {
    item: '',
    price: 0,
  },
  toppings: [
    {
      item: '',
      price: 0,
    },
  ],
};

export const pizzaAtom = atomWithStorage('selectedPizza', initialState);
