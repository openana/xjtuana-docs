import * as React from 'react';

import Header from '../LayoutHeader';

import './index.scss';

type DataProps = {
  children: any;
  location: Location;
};

const Layout: React.FC<DataProps> = ({ children, location }) => {
  return (
    <>
      <Header location={location} />
      {children}
    </>
  );
};

export default Layout;
