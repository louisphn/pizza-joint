import { FC } from 'react';

import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';

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

type Props = {
  addBase: (base: string) => void;
  pizza: {
    base: string;
    toppings: string[];
  };
};

const Base: FC<Props> = ({ addBase, pizza }) => {
  const router = useRouter();

  const bases = ['Classic', 'Thin & Crispy', 'Thick Crust'];

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
          const spanClass = pizza.base === base ? 'active' : '';
          return (
            <motion.li
              key={base}
              onClick={() => addBase(base)}
              variants={listItemVariants}
              whileHover="hover"
            >
              <motion.span
                className={spanClass}
                variants={listItemVariants}
                whileHover="hover"
                initial="hidden"
                animate={pizza.base === base ? 'selected' : 'hidden'}
                transition={{ duration: 0.6 }}
              >
                {base}
              </motion.span>
            </motion.li>
          );
        })}
      </ul>

      {pizza.base && (
        <motion.div
          className="next"
          variants={nextVariants}
          initial="hidden"
          whileHover="hover"
          onClick={() => router.push('/toppings')}
        >
          <motion.span variants={nextColor}></motion.span>
          <motion.span variants={nextButton}>&#8594;</motion.span>
          <motion.button variants={buttonVariants}>Next</motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Base;
