const fs = require('fs');
const path = require('path');

const fileWay = path.join(__dirname, 'secret-folder');

fs.readdir(fileWay, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => createResult(file)); 
});

function createResult(file) {
  fs.stat(path.join(fileWay, `/${file.name}`), (err, stats) => {
    if (err) throw err;
    if (file.isFile()) {
      const type = path.extname(file.name);
      const name = path.basename(file.name, type);      
      console.log(`${name} - ${type.replace('.','')} - ${stats.size} bytes`);
    }
  });
}