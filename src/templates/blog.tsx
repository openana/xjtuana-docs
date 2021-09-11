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
    };
    tableOfContents: string;
  };
};

const Blog: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const post = data.mdx;

  return (
    <Layout location={location}>
      <Seo title={post.frontmatter.title + ' - 文档'} />
      <Container fluid="xxl">
        <Row>
          <Col xl={2} md={3} className="sticky-top bg-light">
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
          </Col>
          <Col xl={8} md={9} className="px-3 px-md-5">
            <div className="pt-5 pb-4 mb-4 border-bottom">
              <h1 className="display-4">{post.frontmatter.title}</h1>
              <p className="text-muted">发布于 {post.frontmatter.date}</p>
              <p className="lead text-muted">{post.frontmatter.description}</p>
            </div>
            <MDXRenderer className="markdown-body">{post.body}</MDXRenderer>
          </Col>
          <Col xl={2} className="position-sticky d-none d-xl-block">
            <div className="py-4 text-muted">
              <strong className="d-block h6 my-2 pb-2 border-bottom">
                目录
              </strong>
              <nav
                className="toc-body small"
                dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query TemplateBlogMarkdown($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      fields {
        path
        slug
      }
      tableOfContents(maxDepth: 3)
    }
  }
`;
