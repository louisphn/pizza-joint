import { FC } from 'react';

import Loader from './Loader';

type Props = {
  isLoading: boolean;
};

const Loading: FC<Props> = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="loading">
          {' '}
          <Loader />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Loading;
