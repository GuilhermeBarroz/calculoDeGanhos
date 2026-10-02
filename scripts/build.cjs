const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
// Explicit allowlist: never publish the entire repository or legacy credentials.
const publicFiles = [
  'index.html',
  '404.html',
  'css/style.css',
  'js/calculations.js',
  'js/config.js',
  'js/analytics.js',
  'js/script.js',
  'js/theme.js',
  'images/favicon.svg',
  'images/logo.svg',
  'images/logo-dark.svg',
  'robots.txt',
  'sitemap.xml',
  '_headers',
  '_redirects',
];

// Refuse unexpected files instead of silently carrying them into a deployment.
function verifyOutput(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Unexpected symlink: ${absolute}`);
    if (entry.isDirectory()) verifyOutput(absolute);
    else if (!publicFiles.includes(path.relative(output, absolute).split(path.sep).join('/'))) {
      throw new Error(`Unexpected output file. Review before rebuilding: ${absolute}`);
    }
  }
}

verifyOutput(output);
for (const file of publicFiles) {
  const destination = path.join(output, file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(path.join(root, file), destination);
}
console.log(`Prepared ${publicFiles.length} public files in dist/.`);
