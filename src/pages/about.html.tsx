// If you don't want to use TypeScript you can delete this file!
import * as React from 'react';
import { PageProps, Link, graphql } from 'gatsby';
import { Container } from 'react-bootstrap';

import Layout from '../components/Layout';
import Seo from '../components/seo';

type DataProps = {
  site: {
    buildTime: string;
  };
};

const AboutPage: React.FC<PageProps<DataProps>> = ({
  data,
  location,
  path,
}) => (
  <Layout location={location}>
    <Seo title="关于" />
    <Container>
      <div className="markdown-body">
        <h1>Gatsby supports TypeScript by default!</h1>
        <p>
          This means that you can create and write <em>.ts/.tsx</em> files for
          your pages, components etc. Please note that the <em>gatsby-*.js</em>{' '}
          files (like gatsby-node.js) currently don't support TypeScript yet.
        </p>
        <p>
          For type checking you'll want to install <em>typescript</em> via npm
          and run <em>tsc --init</em> to create a <em>tsconfig</em> file.
        </p>
        <p>
          You're currently on the page "{path}" which was built on{' '}
          {data.site.buildTime}.
        </p>
        <p>
          To learn more, head over to our{' '}
          <a href="https://www.gatsbyjs.com/docs/typescript/">
            documentation about TypeScript
          </a>
          .
        </p>
      </div>
      <Link to="/">Go back to the homepage</Link>
    </Container>
  </Layout>
);

export default AboutPage;

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`;
