import { atomWithStorage } from 'jotai/utils';

type Pizza = {
  base: {
    item: string;
    price: number;
  };
  toppings: {
    item: string;
    price: number;
  }[];
};

export const initialState: Pizza = {
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

export const pizzaAtom = atomWithStorage<Pizza>('selectedPizza', initialState);
export const pizzaImage = atomWithStorage<string>('selectedPizzaImage', '');
export const toppingImages = atomWithStorage<string[]>(
  'selectedToppingImages',
  []
);
