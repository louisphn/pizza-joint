import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';

import Header from '../components/Header';
import '../styles/main.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Header />
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} />
    </AnimatePresence>
  </>
);

export default MyApp;
