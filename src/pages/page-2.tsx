import * as React from 'react';
import { PageProps, Link } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/seo';

const SecondPage: React.FC<PageProps> = ({ location }) => (
  <Layout location={location}>
    <Seo title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default SecondPage;
