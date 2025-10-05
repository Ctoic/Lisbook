const fs = require('fs');
const path = require('path');

const filePath = './index.html'; // index.html ka path

// Map old filenames to new paths
const fileMap = {
  // JS files
  'app.js': 'src/scripts/app.js',
  'explore.js': 'src/scripts/explore.js',
  'header-footer.js': 'src/scripts/header-footer.js',
  'marked.min.js': 'src/scripts/marked.min.js',
  'scan.js': 'src/scripts/scan.js',
  'script.js': 'src/scripts/script.js',
  'scripts.js': 'src/scripts/scripts.js',
  'share.js': 'src/scripts/share.js',
  'translation.js': 'src/scripts/translation.js',

  // CSS files
  'explore_style.css': 'src/styles/explore_style.css',
  'scan.css': 'src/styles/scan.css',
  'style.css': 'src/styles/style.css'
};

let content = fs.readFileSync(filePath, 'utf-8');

// Replace paths
for (const [oldFile, newPath] of Object.entries(fileMap)) {
  const regex = new RegExp(oldFile, 'g');
  content = content.replace(regex, newPath);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`Updated paths in index.html successfully!`);
