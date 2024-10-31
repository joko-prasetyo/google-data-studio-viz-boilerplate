const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';
const plugins = [];
const CSS_FILE_NAME = 'index.css';
const cssFilePath = path.join('src', CSS_FILE_NAME);

let body = '<script src="viz.js"></script>';
if (fs.existsSync(cssFilePath)) {
  body = body + '\n<link rel="stylesheet" href="index.css">';
  plugins.push(new CopyWebpackPlugin([{ from: cssFilePath, to: '.' }]));
}
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

const config = {
  entry: './built-tsc/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'viz.js',
  },
  plugins: plugins,
};
module.exports = () => {
  config.mode = isProduction ? 'production' : 'development';
  return config;
};
