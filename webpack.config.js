const path = require('path');
const fs = require('fs');
const isProduction = process.env.NODE_ENV == 'production';

const config = {
  entry: './built-tsc/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'viz.js',
  },
};

let body = '<script src="viz.js"></script>';
const iframeHTML = `
<!doctype html>
<html><body>
${body}
</body></html>
`;

const root = `
<!DOCTYPE html>
<html>
  <head>
    <title>Community Viz</title>
  </head>

  <body>
    <iframe src="vizframe.html" componentid="abc" width="75%" height="800px">
    </iframe>
  </body>
</html>

`;

fs.writeFileSync(path.resolve(__dirname, 'dist', 'vizframe.html'), iframeHTML);
fs.writeFileSync(path.resolve(__dirname, 'dist', 'index.html'), root);

module.exports = () => {
  config.mode = isProduction ? 'production' : 'development';
  return config;
};
