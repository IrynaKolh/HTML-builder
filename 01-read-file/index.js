const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(file);
const haddler = message => console.log(message.toString());
readableStream.on('data',haddler);
