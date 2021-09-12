import * as React from 'react';
import { Link, PageProps, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Button, Container, Col, Row } from 'react-bootstrap';

import Layout from '../components/Layout';
import Seo from '../components/seo';

import docsNav from '../../content/docs.yaml';

type DataProps = {
  mdx: {
    body: any;
    fields: {
      path: string;
      slug: string;
    };
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
      <Container fluid="xxl" className="app-layout my-md-4">
        <div className="app-sidebar">
          <nav className="app-links collapse" aria-label="Docs navigation">
            <ul className="list-unstyled mb-0 py-3 pt-md-1">
              {docsNav.items?.map((item, key) => (
                <li className="mb-1" key={key}>
                  <Button
                    className="d-inline-flex align-items-center rounded"
                    data-bs-toggle="collapse"
                    data-bs-target={`#sidebar-collapse-${key}`}
                    aria-expanded="true"
                    aria-current="true">
                    {item.title}
                  </Button>
                  <div className="collapse show" id={`sidebar-collapse-${key}`}>
                    <ul className="list-unstyled fw-normal pb-1 small">
                      {item.items?.map((item, key) => (
                        <li key={key}>
                          <Link
                            to={item.url}
                            className="d-inline-flex align-items-center rounded">
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="app-main order-1">
          <div className="app-intro ps-lg-4">
            <div className="d-md-flex flex-md-row-reverse align-items-center justify-content-between">
              <a
                className="btn btn-sm btn-app-light mb-2 mb-md-0"
                href={
                  'https://github.com/openana/xjtuana-docs/blob/main/' +
                  post.fields.path
                }
                title="View and edit this file on GitHub"
                target="_blank"
                rel="noopener">
                在 GitHub 中查看
              </a>
              <h1 className="title" id="content">
                {post.frontmatter.title}
              </h1>
            </div>
            <p className="text-muted">发布于 {post.frontmatter.date}</p>
            <p className="lead text-muted">{post.frontmatter.description}</p>
          </div>
          <div className="app-toc mt-4 mb-5 my-md-0 ps-xl-3 mb-lg-5 text-muted">
            <strong className="d-block h6 my-2 pb-2 border-bottom">目录</strong>
            <nav>
              <ul>
                {post.tableOfContents.items?.map((item, key) => {
                  const match = /^(.*?)\s*\{#([\w-]+)\}$/.exec(item.title);
                  const title = match ? match[1] : item.title;
                  const url = match ? '#' + match[2] : item.url;
                  return (
                    <li key={key}>
                      <a href={url}>{title}</a>
                      <ul>
                        {item.items?.map((item, key) => {
                          const match = /^(.*?)\s*\{#([\w-]+)\}$/.exec(
                            item.title,
                          );
                          const title = match ? match[1] : item.title;
                          const url = match ? '#' + match[2] : item.url;
                          return (
                            <li key={key}>
                              <a href={url}>{title}</a>
                              <ul>
                                {item.items?.map((item, key) => {
                                  const match = /^(.*?)\s*\{#([\w-]+)\}$/.exec(
                                    item.title,
                                  );
                                  const title = match ? match[1] : item.title;
                                  const url = match ? '#' + match[2] : item.url;
                                  return (
                                    <li key={key}>
                                      <a href={url}>{title}</a>
                                    </li>
                                  );
                                })}
                              </ul>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <div className="app-content ps-lg-4 markdown-body">
            <MDXRenderer localImages={post.frontmatter.embeddedImagesLocal}>
              {post.body}
            </MDXRenderer>
          </div>
        </div>
        <Row className="d-none">
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
      body
      excerpt(pruneLength: 160)
      fields {
        path
        slug
      }
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
      tableOfContents(maxDepth: 4)
    }
  }
`;
