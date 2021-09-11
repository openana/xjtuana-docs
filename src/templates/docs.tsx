import * as React from 'react';
import { Link, PageProps, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Container, Col, Row } from 'react-bootstrap';

import Layout from '../components/Layout';
import Seo from '../components/seo';

type DataProps = {
  mdx: {
    body: any;
    frontmatter: {
      title: string;
      date: string;
      description: string;
      embeddedImagesLocal: any;
    };
    tableOfContents: {
      items: {
        title: string;
        url: string;
        items: {
          title: string;
          url: string;
          items: {
            title: string;
            url: string;
          }[];
        }[];
      }[];
    };
  };
};

const Docs: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const post = data.mdx;

  console.log(post.tableOfContents);

  return (
    <Layout location={location}>
      <Seo title={post.frontmatter.title + ' - 文档'} />
      <Container fluid="xxl">
        <Row>
          <Col xl={2} md={3} className="sticky-top d-none d-xl-block bg-light">
            开始使用
            <div className="collapse show">
              <ul className="list-unstyled fw-normal pb-1 small">
                <li>
                  <Link
                    to="/docs/getting-started/introduction.html"
                    className="d-inline-flex align-items-center rounded active">
                    快速入门
                  </Link>
                </li>
                <li>
                  <Link
                    to="/docs/getting-started/accessibility.html"
                    className="d-inline-flex align-items-center rounded active">
                    便捷使用
                  </Link>
                </li>
              </ul>
            </div>
            西交校园网络
            <div className="collapse show">
              <ul className="list-unstyled fw-normal pb-1 small">
                <li>
                  <Link
                    to="/docs/xjtu-network/quick-start.html"
                    className="d-inline-flex align-items-center rounded active">
                    快速开始
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xl={8} md={9} className="px-3 px-md-5">
            <div className="pt-5 pb-4 mb-4 border-bottom">
              <h1 className="display-4">{post.frontmatter.title}</h1>
              <p className="text-muted">发布于 {post.frontmatter.date}</p>
              <p className="lead text-muted">{post.frontmatter.description}</p>
            </div>
            <div className="markdown-body">
              <MDXRenderer localImages={post.frontmatter.embeddedImagesLocal}>
                {post.body}
              </MDXRenderer>
            </div>
          </Col>
          <Col xl={2} className="position-sticky d-none d-xl-block">
            <div className="py-4 text-muted">
              <strong className="d-block h6 my-2 pb-2 border-bottom">
                目录
              </strong>
              <nav className="toc-body small">
                <ul>
                  {post.tableOfContents.items?.map((item, key) => (
                    <li key={key}>
                      <a href={item.url}>{item.title}</a>
                      <ul>
                        {item.items?.map((item, key) => (
                          <li key={key}>
                            <a href={item.url}>{item.title}</a>
                            <ul>
                              {item.items?.map((item, key) => (
                                <li key={key}>
                                  <a href={item.url}>{item.title}</a>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Docs;

export const pageQuery = graphql`
  query TemplateDocsMarkdown($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        embeddedImagesLocal {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
      fields {
        path
        slug
      }
      tableOfContents(maxDepth: 4)
    }
  }
`;
