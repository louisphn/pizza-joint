import { motion } from 'framer-motion';

const loader = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 0,
  },
  visible: {
    opacity: 1,
    y: [60, 0],
    height: ['64px', '12px'],
    borderRadius: [16, 50],
    transition: {
      yoyo: Infinity,
      duration: 0.8,
      ease: [0.09, 0.99, 0.86, 0.42],
    },
  },
};

const Loader = () => {
  return (
    <motion.div
      className="loader"
      variants={loader}
      initial="hidden"
      animate="visible"
    >
      <div className="loader_container">
        <motion.span variants={childVariants}></motion.span>
        <motion.span variants={childVariants}></motion.span>
        <motion.span variants={childVariants}></motion.span>
        <motion.span variants={childVariants}></motion.span>
      </div>
      <p>Loading...</p>
    </motion.div>
  );
};

export default Loader;
