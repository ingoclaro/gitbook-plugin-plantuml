var processPage = require('./src/main').processPage

var fs = require('fs');
var path = require('path');

module.exports = {
  hooks: {
    init: function() {
      var imagesPath = path.join(this.output.root(), 'images');
      fs.mkdirSync(imagesPath);
    },
    "page:before": function(page) {
      var config = {
        codeBlockKey: this.config.get('codeBlockKey', 'plantuml'),
        output: path.resolve(this.output.root()),
        root: path.resolve(this.config.get('root'))
      }

      page.content = processPage(page.content, page.rawPath, config);
      return page;
    }
  }
};
