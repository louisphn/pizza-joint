import { NextPage } from 'next';

import Home from '../components/Home';
import Layout from '../components/Layout';

const Index: NextPage = () => {
  return (
    <Layout pageTitle={'Pizza Joint'}>
      <Home />
    </Layout>
  );
};

export default Index;
