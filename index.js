var processPage = require('./src/main').processPage

var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var Promise = require("bluebird");

Promise.promisifyAll(fs);

module.exports = {
  hooks: {
    init: function() {
      var myconfig = this.config.get("pluginsConfig.plantuml");
      var outputDir = this.output.root();
      var log = this.log;
      var config = this.config;
      outputDir = '_book'; //test
      var outputImagesDir = path.join(outputDir, myconfig.imagesDir);
      mkdirp.sync(outputImagesDir);

      config.set("pluginsConfig.plantuml.output", outputDir);
      config.set("pluginsConfig.plantuml.root", config.get("root"));

      // check if imagesDir exists
      log.info("checking for "+ path.join(config.get("root"), myconfig.imagesDir) +" existance...");
      return fs.statAsync(path.join(config.get("root"), myconfig.imagesDir))
        .then(function(){
          log.info(" ok.\n");
        })
        .catch(function(){
          log.info(" does not exist, not using image cache.\n");
          config.set("pluginsConfig.plantuml.cacheImages", false);
        });
    },

    "page:before": function(page) {
      var config = this.config.get("pluginsConfig.plantuml");

      return processPage(page.content, page.path, config)
        .then(function(content){
          page.content = content;
          return page;
        })
        .catch(function(error){
          console.error(error);
        });
    }
  }
};
