const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'destination.txt');
const writableStream  = fs.createWriteStream(file);


process.stdout.write('What is your name? ');
process.on('SIGINT', () => {  
  process.stdout.write('See you later, Aligator!');
  process.exit();
});

process.stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    process.stdout.write('See you later, Aligator!');
    process.exit();
  }
  writableStream.write(data);
});