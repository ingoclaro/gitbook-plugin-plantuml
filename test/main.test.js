var processPage = require('../src/main').processPage;
var fs = require('fs');
var path = require('path');

var config = {
  codeBlockKey: 'plantuml',
  imagesDir: 'images',
  useCache: false,
  output: 'tmp/_book',
  root: 'tmp/docs'
};

// test 1
var content1 = fs.readFileSync('test/input1.md', 'utf8');
var content2 = fs.readFileSync('test/input2.md', 'utf8');
var content3 = fs.readFileSync('test/input3.md', 'utf8');

processPage(content1, 'input1.md', config).then(function(output){
  console.log(output);
});

// var expected = "This is input file 1\n\n![](images/input1.md.d102c214ab9e983f1282880f3b8767fe1a2edd0a.svg)\n\nEnd of input file 1\n";
//
// if(output !== expected) {
//   console.error("FAIL!");
// }

// // test 2
// output = processPage(content2, 'input2.md', config)
// console.log(output);
//
// // test 3
// output = processPage(content3, 'input3.md', config)
// console.log(output);
