import * as React from 'react';
import { Link, PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import Layout from '../components/Layout';
import Seo from '../components/seo';

const IndexPage: React.FC<PageProps> = ({ location, path }) => (
  <Layout location={location}>
    <Seo title="主页" />
    <p>Path:{path}</p>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={['auto', 'webp', 'avif']}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
    <p>
      <Link to="/docs/xjtu-network/quick-start.html">快速开始</Link> <br />
      <Link to="/about.html">关于</Link>
      <Link to="/page-2/">Go to page 2</Link> <br />
    </p>
  </Layout>
);

export default IndexPage;
