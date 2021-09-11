import * as React from 'react';

type DataProps = {
  element: any;
};

const WrapPageElement: React.FC<DataProps> = ({ element }) => {
  return element;
};

export default WrapPageElement;
