import { AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import Header from '../components/Header';
import Modal from '../components/Modal';
import { modalContext } from '../contexts/modalContext';
import '../styles/main.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [, setShowModal] = useAtom(modalContext);

  return (
    <>
      <Header />
      <Modal />
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => setShowModal(false)}
      >
        <Component {...pageProps} key={router.pathname} />
      </AnimatePresence>
    </>
  );
};

export default MyApp;
