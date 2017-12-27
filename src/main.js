var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var plantuml = require('pw-node-plantuml');
var Promise = require("bluebird");
var ps = require('promise-streams');

Promise.promisifyAll(fs);

function createUmlDrawing(content, file, cacheFile) {
  return fs.statAsync(file).catch(function(e) {
    // file doesn't exist, we need to generate it
    var gen = plantuml.generate(content, {format: 'svg', charset: 'UTF-8'});
    var uml = gen.out.pipe(fs.createWriteStream(file));

    if(cacheFile) {
      gen.out.pipe(fs.createWriteStream(cacheFile));
    }

    return ps.wait(uml);
  });
}

function processPage(content, contentFilePath, config) {
  var regex = new RegExp("```"+ config.codeBlockKey +"([^`]*)```", "g");
  var promises = [];

  var replaced = content.replace(regex, function(match, p1) {

    // generate the image filename with the sha1 of the block content
    var md5sum = crypto.createHash('sha1').update(p1).digest('hex');
    var imageName = contentFilePath.replace('/','_') + '.' + md5sum + '.svg';

    // path to the image in the output directory (usualy _book/images/xxx)
    var outputImagePath = path.join(config.output, config.imagesDir, imageName);
    var contentImagePath = path.join(config.root, config.imagesDir, imageName);

    var cacheFile;
    if(config.cacheImages) {
      cacheFile = contentImagePath;
    } else {
      cacheFile = null;
    }

    var umlPromise = createUmlDrawing(p1, outputImagePath, cacheFile);
    promises.push(umlPromise);

    // compute relative path to replace in content
    var imageRelativePath = path.relative(path.dirname(path.join(config.root, contentFilePath)), contentImagePath);

    return '<object type="image/svg+xml" class="plantuml" data="'+ imageRelativePath + '"></object>';
  });

  return Promise.all(promises).return(replaced);
}

module.exports = {
  processPage: processPage
}
