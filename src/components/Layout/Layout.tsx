import * as React from 'react';

import Header from '../LayoutHeader';

import './Layout.scss';

type DataProps = {
  children: any;
  location: Location;
};

const Layout: React.FC<DataProps> = ({ children, location }) => {
  return (
    <div>
      <Header location={location} />
      {children}
    </div>
  );
};

export default Layout;
