const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html']; // add other root HTML files here

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // CSS
  content = content.replace(/href="style\.css"/g, 'href="src/styles/style.css"');

  // JS
  content = content.replace(/src="script\.js"/g, 'src="src/scripts/script.js"');
  content = content.replace(/src="header-footer\.js"/g, 'src="src/scripts/header-footer.js"');
  content = content.replace(/src="translation\.js"/g, 'src="src/scripts/translation.js"');

  // Images
  content = content.replace(/src="\.\.\/Images\//g, 'src="Images/');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`${file} updated`);
});
