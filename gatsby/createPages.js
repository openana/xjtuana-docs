const { resolve } = require('path');

module.exports = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  // Used to detect and prevent duplicate redirects
  const redirectToSlugMap = {};

  const blogTemplate = resolve(__dirname, '../src/templates/blog.tsx');
  const docsTemplate = resolve(__dirname, '../src/templates/docs.tsx');

  const allMarkdown = await graphql(
    `
      {
        allMdx(limit: 1000) {
          edges {
            node {
              fields {
                redirect
                slug
              }
            }
          }
        }
      }
    `,
  );

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors);

    throw Error(allMarkdown.errors);
  }

  allMarkdown.data.allMdx.edges.forEach((edge) => {
    const slug = edge.node.fields.slug;

    if (slug === 'docs/error-decoder.html') {
      // No-op so far as markdown templates go.
      // Error codes are managed by a page in src/pages
      // (which gets created by Gatsby during a separate phase).
    } else if (slug.includes('blog/') || slug.includes('docs/')) {
      let template;
      if (slug.includes('blog/')) {
        template = blogTemplate;
      } else if (slug.includes('docs/')) {
        template = docsTemplate;
      }

      const createArticlePage = (path) =>
        createPage({
          path: path,
          component: template,
          context: {
            slug,
          },
        });

      // Register primary URL.
      createArticlePage(slug);

      // Register redirects as well if the markdown specifies them.
      if (edge.node.fields.redirect) {
        let redirect = JSON.parse(edge.node.fields.redirect);
        if (!Array.isArray(redirect)) {
          redirect = [redirect];
        }

        redirect.forEach((fromPath) => {
          if (redirectToSlugMap[fromPath] != null) {
            console.error(
              `Duplicate redirect detected from "${fromPath}" to:\n` +
                `* ${redirectToSlugMap[fromPath]}\n` +
                `* ${slug}\n`,
            );
            process.exit(1);
          }

          // A leading "/" is required for redirects to work,
          // But multiple leading "/" will break redirects.
          // For more context see github.com/reactjs/reactjs.org/pull/194
          const toPath = slug.startsWith('/') ? slug : `/${slug}`;

          redirectToSlugMap[fromPath] = slug;
          createRedirect({
            fromPath: `/${fromPath}`,
            redirectInBrowser: true,
            toPath,
          });
        });
      }
    }
  });

  return

  const newestBlogEntry = await graphql(
    `
      {
        allMdx(
          limit: 1
          filter: { fileAbsolutePath: { regex: "/blog/" } }
          sort: { fields: [fields___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `,
  );

  const newestBlogNode = newestBlogEntry.data.allMdx.edges[0].node;

  // Blog landing page should always show the most recent blog entry.
  ['/blog/', '/blog'].map((slug) => {
    createRedirect({
      fromPath: slug,
      redirectInBrowser: true,
      toPath: newestBlogNode.fields.slug,
    });
  });
};
