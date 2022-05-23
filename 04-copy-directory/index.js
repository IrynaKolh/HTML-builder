const fs = require('fs');
const path = require('path');

const destinationWay = path.join(__dirname, 'files-copy');
const sourceWay = path.join(__dirname, 'files');

fs.rm(destinationWay, {recursive: true, forse: true}, () => {
  fs.mkdir(destinationWay, {recursive: true}, () => {
    fs.readdir(sourceWay, (err) => {
      if (err) {
        console.log(err);
      } else {        
        copyFiles();              
      }      
    });
  });
}); 

function copyFiles() {
  fs.readdir(sourceWay, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(err);
    } else {
      files.forEach((file) => {
        let sourceFile = path.join(sourceWay, file.name);
        let copyFile = path.join(destinationWay, file.name);  
        fs.copyFile(sourceFile, copyFile, () => {});        
      });
    }
  });
}