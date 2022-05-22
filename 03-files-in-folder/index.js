const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'secret-folder');

fs.readdir(file, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => resultConstructor(file)); 
});

function resultConstructor(fileDirent) {
  fs.stat(path.join(file, `/${fileDirent.name}`), (err, stats) => {
    if (err) throw err;
    if (fileDirent.isFile()) {
      const type = path.extname(fileDirent.name);
      const name = path.basename(fileDirent.name, type);
      const weight = stats.size;

      console.log(`${name} - ${type.replace('.','')} - ${weight} bytes`);
    }
  });
}