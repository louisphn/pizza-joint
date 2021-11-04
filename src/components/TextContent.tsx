import React from 'react';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const container = {
  hidden: {
    opacity: 0,
    transition: {
      delay: 0.5,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const children = {
  hidden: {
    transform: 'rotate3d(0)',
    opacity: 0,
    y: 40,
  },
  visible: {
    transform: 'rotate3d(0)',
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
};

const data = [
  {
    title: 'Lorem ipsum',
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  },
  {
    title: 'Lorem ipsum',
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  },
  {
    title: 'Lorem ipsum',
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  },
];
const TextContent = () => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.5,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      className="introduction"
      variants={container}
      initial="hidden"
      animate={inView && 'visible'}
    >
      <h1>Why PIZZA JOINT?</h1>
      <p>We make all our pizzas fresh and from scratch.</p>
      {data.map((content, index) => (
        <motion.div key={index} className="text_content" variants={children}>
          <h2>{content.title}</h2>
          <p>{content.content}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TextContent;
