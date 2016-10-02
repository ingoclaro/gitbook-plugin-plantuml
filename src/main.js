var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var plantuml = require('node-plantuml');

function createUmlDrawing(content, file) {

  try {
    fs.statSync(file);
  } catch (e) {
    // create the file if it doesn't exist
    var gen = plantuml.generate(content, {format: 'svg'});
    gen.out.pipe(fs.createWriteStream(file));
  }

  return file;
}

function processPage(content, contentFilePath, config) {
  var regex = new RegExp("```"+ config.codeBlockKey +"([^`]*)```", "g");

  var relativeContentFilePath = path.relative(config.root, contentFilePath);

  var replaced = content.replace(regex, function(match, p1) {

    var md5sum = crypto.createHash('sha1').update(p1).digest('hex');

    // absolute path to the image in the output directory (usualy _book/images/xxx)
    var imagePath = path.join(config.output, 'images', relativeContentFilePath.replace('/','_') + '.' + md5sum + '.svg');

    createUmlDrawing(p1, imagePath);

    // relative path from the content file to the image, used to generate the image href
    var imageRelativePath = path.relative(contentFilePath, path.join(config.root, 'images')) +'/'+ path.basename(imagePath);

    return '![]('+ imageRelativePath + ')';
  });

  return replaced;
}

module.exports = {
  processPage: processPage
}
