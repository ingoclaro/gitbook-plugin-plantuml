var processPage = require('../src/main').processPage;
var fs = require('fs');
var path = require('path');

// test 1
var filePath = path.join(__dirname, './input1.md');
var content = fs.readFileSync(filePath, 'utf8');

var output = processPage(content, filePath)
console.log(output);

// test 2
filePath = path.join(__dirname, './input2.md');
content = fs.readFileSync(filePath, 'utf8');

output = processPage(content, filePath)
console.log(output);

// test 3
filePath = path.join(__dirname, './input3.md');
content = fs.readFileSync(filePath, 'utf8');

output = processPage(content, filePath)
console.log(output);
