import { FC } from 'react';

import { motion } from 'framer-motion';
import Head from 'next/head';

type Props = {
  pageTitle: string;
};

const variants = {
  hidden: { opacity: 0, x: 0 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 1.5,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
  },
};

const Layout: FC<Props> = (props) => {
  const { pageTitle, children } = props;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <motion.main
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ type: 'linear' }}
      >
        {children}
      </motion.main>
    </>
  );
};

export default Layout;
