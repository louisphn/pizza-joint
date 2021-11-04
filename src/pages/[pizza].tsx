import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import SelectPizza from '../components/SelectPizza';
import { getAsString } from '../lib/helper';

const Pizza: NextPage = () => {
  const router = useRouter();
  const { pizza } = router.query;

  return (
    <Layout pageTitle={(getAsString(pizza) as string).toUpperCase()}>
      <SelectPizza />
    </Layout>
  );
};

export default Pizza;
