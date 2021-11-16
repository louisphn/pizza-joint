import { FC, useCallback } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast, Toaster } from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

import { pizzaAtom, pizzaImage, toppingImages } from '../contexts/pizzaContext';
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
  const [selectedBase] = useAtom(pizzaImage);
  const [selectedToppingImages, setSelectedToppingImages] =
    useAtom(toppingImages);

  const convertImage = {
    mushrooms: '/mushroom.png',
    peppers: '/paprika.png',
    onions: '/onion.png',
    olives: '/olive.png',
    salami: '/salami.png',
    tomatoes: '/tomato.png',
  };

  const checkTopping = useCallback(
    (topping: string) => {
      return (
        selectedPizza.toppings.filter((data) => data.item === topping).length >
        0
      );
    },
    [selectedPizza]
  );

  const addTopping = useCallback(
    (topping: { item: string; price: number }) => {
      let newToppings;
      // if topping has not been added yet
      if (!checkTopping(topping.item)) {
        // and current selected toppings are less than 3
        if (selectedPizza.toppings.length < 3) {
          // if this is the first topping => replace the blank topping in initial state
          if (selectedPizza.toppings[0]?.item === '') {
            newToppings = [topping];
            // if it is not then add more to toppings
          } else {
            newToppings = [...selectedPizza.toppings, topping];
          }
          // if current selected toppings are full (= 3) => alert
        } else {
          toast.error('You can only select up to 3 toppings', {
            duration: 4000,
            icon: '❌',
            style: {
              border: '2px solid #cc3300',
              padding: '16px',
              color: '#cc3300',
            },
          });
          newToppings = [...selectedPizza.toppings];
        }
        // if this topping is in the list => remove
      } else {
        newToppings = selectedPizza.toppings.filter(
          (data) => data.item !== topping.item
        );
      }
      const images = newToppings.map(
        (addedTopping) => convertImage[addedTopping.item.toLowerCase()]
      );
      setSelectedPizza({ ...selectedPizza, toppings: newToppings });
      setSelectedToppingImages(images);
    },
    [selectedPizza, setSelectedPizza, checkTopping]
  );

  return (
    <motion.div
      className="toppings_container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="base">
        <Toaster />
        <motion.div
          onClick={() => router.push('/base')}
          variants={backVariants}
          whileHover="hover"
          className="back"
        >
          <motion.div variants={arrowVariants}>
            <FaArrowLeft />
          </motion.div>
          <motion.p variants={backVariants}>Back to selecting base</motion.p>
        </motion.div>
        <h3>Step 2: Choose Toppings</h3>
        <div className="pizza-image_container">
          <AnimatePresence exitBeforeEnter>
            {selectedToppingImages.length > 0 &&
              selectedToppingImages.map((image) => (
                <motion.img
                  key={image}
                  className={'topping_image'}
                  src={image}
                  width={40}
                  height={40}
                  initial={{
                    y: -100,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      type: 'spring',
                      damping: 8,
                    },
                  }}
                  exit={{
                    y: 0,
                    opacity: 0,
                    transition: {
                      type: 'linear',
                    },
                  }}
                />
              ))}
          </AnimatePresence>
          {selectedBase && (
            <Image
              className={'pizza-base-image'}
              src={selectedBase}
              width={240}
              height={240}
              alt={'baseImage'}
            />
          )}
          <p className="text-center text-white text-xl transform translate-y-[-42px]">
            {selectedPizza.base.item} Base
          </p>
        </div>

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
      </div>
      <ul>
        {toppings.map((topping) => {
          const spanClass = checkTopping(topping.item) ? 'active' : '';
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
                animate={checkTopping(topping.item) ? 'selected' : 'hidden'}
              >
                {topping.item}
                {checkTopping(topping.item) && <span> ¥{topping.price}</span>}
              </motion.span>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default Toppings;
