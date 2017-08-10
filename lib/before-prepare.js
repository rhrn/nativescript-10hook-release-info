'use strict'

const path = require('path');
const fs = require('fs');

module.exports = function($projectData) {

  const appPath = $projectData.appDirectoryPath;
  const $options = $projectData.$options;

  const options = {
    NODE_ENV: process.env.NODE_ENV,
    release: $options.argv.release
  };

  const config = path.join(appPath, 'release-info.json');

  return new Promise((resolve, reject) => {
    var contents = JSON.stringify(options, null, 2);
    
    // Don't overwrite file with the same options not to trigger the cyclic reload
    if (fs.existsSync(config) &&
        fs.readFileSync(config, "utf8") === contents) {

      resolve(config);
      return;
    }
    
    fs.writeFile(config, contents, err => {

      if (err) {
        return reject(err);
      }

      console.log('Successfully created:', config);

      resolve(config);
    });

  });

};
