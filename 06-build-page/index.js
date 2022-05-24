const fs = require('fs');
const path = require('path');


const fileWay = path.join(__dirname, 'project-dist');
const sourceWay = path.join(__dirname, 'styles');
const componentWay = path.join(__dirname, 'components');
const templateWay = path.join(__dirname,'template.html');

fs.rm(fileWay, {force: true, recursive: true}, (err) => {
  if (err) console.log(err);

  fs.mkdir(fileWay, {recursive: true}, (err) => {
    if (err) {
      console.log(err);
    } else {
      copyDir('assets');
      createStyle();
      createHtml();
    }
  });
});


function createStyle() {
  const writeStyle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

  fs.readdir(sourceWay, {withFileTypes: true}, (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach(file => {

      if (file.isFile() && path.extname(file.name) === '.css') {
        fs.readFile(path.join(__dirname, 'styles', file.name), (err, data) => {
          if (err) console.log(err);
          writeStyle.write(data);
          writeStyle.write('\n');
        });
      }
    });
  });
}

function copyDir(dirName, ...dirPath) {
  fs.rm(path.join(__dirname, 'project-dist', ...dirPath, dirName), {force: true}, () => {
    fs.mkdir(path.join(__dirname, 'project-dist', ...dirPath, dirName), {recursive: true}, () => {
      fs.readdir(path.join(__dirname, ...dirPath, dirName), {withFileTypes: true}, (err, files) => {
        if (err) {
          console.log(err);
        }        
        files.forEach(file => {
          if (file.isFile()) {
            fs.copyFile(path.join(__dirname, ...dirPath, dirName, file.name), path.join(__dirname, 'project-dist', ...dirPath, dirName, file.name), () => {});
          }
          if (file.isDirectory()) {
            copyDir(file.name, ...dirPath, dirName);
          }
        });
      });
    });
  });
}


function createHtml() {
  let htmlText = '';
  const readableStream = fs.createReadStream(templateWay);
  readableStream.on('data', files => {
    htmlText = files.toString();

    fs.readdir(componentWay, {withFileTypes: true}, (err, files) => {
      if (err) {
        console.log(err);
      }
      files.forEach(file => {
        if (file.isFile() && path.extname(file.name) === '.html') {
          fs.readFile(path.join(__dirname, 'components', file.name), (err, data) => {
            if (err) console.log(err);                        
            htmlText = htmlText.replace(`{{${file.name.slice(0, -5)}}}`, data.toString());
            const newHtml = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
            newHtml.write(htmlText);
          });
        }
      });
    });
  });
}