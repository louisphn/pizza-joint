import { FC } from 'react';

import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';

import { pizzaAtom } from '../contexts/pizzaContext';
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

  const addBase = (base: { item: string; price: number }) => {
    setSelectedPizza({ ...selectedPizza, base });
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
