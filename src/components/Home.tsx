import { FC } from 'react';

import { motion } from 'framer-motion';

import { homeVariants } from '../variants/variants';
import Hero from './Hero';
import LandingConclusion from './LandingConclusion';
import TextContent from './TextContent';

const Home: FC = () => {
  return (
    <motion.div
      className="home"
      variants={homeVariants}
      initial="hidden"
      animate="visible"
    >
      <Hero />
      <div className="about">
        <TextContent />
      </div>
      <LandingConclusion />
    </motion.div>
  );
};

export default Home;
