const fs = require('fs');
const path = require('path');

const copyFiles = path.join(__dirname, 'files-copy');
const sourseFiles = path.join(__dirname, 'files');

fs.rm(copyFiles, {recursive: true}, () => {
  fs.mkdir(copyFiles, {recursive: true}, () => {
    fs.readdir(sourseFiles, (err, files) => {
      if (err) {
        console.log(err);
      } else {
        files.forEach(file => {
          if(file.isFile()) {
            fs.copyFile((sourseFiles, file.name), (copyFiles, file.name), () => {});
          }
        });
      }
      
    });
  });
});
