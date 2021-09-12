module.exports = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  const { path } = page;

  return new Promise((resolvePromise) => {
    if (path.endsWith('.html/')) {
      deletePage(page);
      createPage({ ...page, path: path.slice(0, -1) });
    } else if (page.path.includes('docs/error-decoder.html')) {
      page.context.slug = 'docs/error-decoder.html';

      createPage(page);
    }
    resolvePromise();
  });
};
