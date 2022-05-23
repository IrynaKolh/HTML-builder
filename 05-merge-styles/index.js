const fs = require('fs');
const path = require('path');

const fileWay = path.join(__dirname, 'project-dist', 'bundle.css');
const sourceWay = path.join(__dirname, 'styles');

const bundle = fs.createWriteStream(fileWay);

fs.readdir(sourceWay, {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log(err);
  }

  files.forEach(file => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      fs.readFile(path.join(__dirname, 'styles', file.name), (err, data) => {
        if (err) {
          console.log(err);
        } else {
          bundle.write(data);
          bundle.write('\n');
        }       
      });
    }
  });
});