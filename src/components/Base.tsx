import { FC, useCallback, useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';

import { pizzaAtom, pizzaImage } from '../contexts/pizzaContext';
import { bases } from '../lib/data';
import {
  containerVariants,
  backVariants,
  arrowVariants,
  nextVariants,
  buttonVariants,
  nextButton,
  nextColor,
  listItemVariants,
} from '../variants/variants';

const Base: FC = () => {
  const router = useRouter();
  const [selectedPizza, setSelectedPizza] = useAtom(pizzaAtom);
  const [baseImage, setBaseImage] = useAtom(pizzaImage);

  const getCurrentImage = (selctedBase: string): string => {
    const image = {
      classic: '/pizza-1.svg',
      'thin & crispy': '/pizza-2.svg',
      'thick crust': '/pizza-3.svg',
    };
    return image[selctedBase.toLowerCase()] ?? '';
  };

  useEffect(() => {
    const currentImage = getCurrentImage(selectedPizza.base.item);
    setBaseImage(currentImage);
  }, [selectedPizza]);

  const addBase = useCallback(
    (base: { item: string; price: number }) => {
      setSelectedPizza({ ...selectedPizza, base });
    },
    [selectedPizza, setSelectedPizza]
  );

  return (
    <motion.div
      className="base"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        onClick={() => router.push('/')}
        variants={backVariants}
        whileHover="hover"
        className="back"
      >
        <motion.div variants={arrowVariants}>
          <FaArrowLeft />
        </motion.div>
        <motion.p variants={backVariants}>Back to top</motion.p>
      </motion.div>
      <h3>Step 1: Choose Your Base</h3>
      <AnimatePresence exitBeforeEnter>
        {baseImage && (
          <motion.div
            className={'base-image'}
            key={baseImage}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: -100,
              opacity: 0,
              transition: {
                type: 'linear',
              },
            }}
          >
            <Image src={baseImage} width={240} height={240} alt={'baseImage'} />
          </motion.div>
        )}
      </AnimatePresence>
      <ul>
        {bases.map((base) => {
          const spanClass =
            selectedPizza.base.item === base.item ? 'active' : '';
          return (
            <motion.li
              key={base.item}
              onClick={() => addBase(base)}
              variants={listItemVariants}
              whileHover="hover"
            >
              <motion.span
                className={spanClass}
                variants={listItemVariants}
                whileHover="hover"
                initial="hidden"
                animate={
                  selectedPizza.base.item === base.item ? 'selected' : 'hidden'
                }
                transition={{ duration: 0.6 }}
              >
                {base.item}
                {selectedPizza.base.item === base.item && (
                  <span> ¥{base.price}</span>
                )}
              </motion.span>
            </motion.li>
          );
        })}
      </ul>

      <motion.div
        className="next"
        variants={nextVariants}
        initial="hidden"
        animate={selectedPizza.base.item !== '' && 'visible'}
        whileHover="hover"
        onClick={() => router.push('/toppings')}
      >
        <motion.span variants={nextColor}></motion.span>
        <motion.span variants={nextButton}>&#8594;</motion.span>
        <motion.button variants={buttonVariants}>Next</motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Base;
