/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
// export { default as createPages } from './gatsby/createPages';
// export { default as onCreateNode } from './gatsby/onCreateNode';
// export { default as onCreatePage } from './gatsby/onCreatePage';
exports.createPages = require('./gatsby/createPages');
exports.onCreateNode = require('./gatsby/onCreateNode');
exports.onCreatePage = require('./gatsby/onCreatePage');
