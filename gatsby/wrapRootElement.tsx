import * as React from 'react';

type DataProps = {
  element: any;
};

const WrapRootElement: React.FC<DataProps> = ({ element }) => {
  return element;
};

export default WrapRootElement;
