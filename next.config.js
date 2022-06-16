// eslint-disable-next-line @typescript-eslint/no-var-requires
// const withTM = require('next-transpile-modules')(['react-children-utilities'])
/* eslint-disable @typescript-eslint/no-var-requires, no-undef */

const withTM = require("next-transpile-modules")([
  "d3-geo",
  "d3-array",
  "internmap",
]);

module.exports = withTM();
