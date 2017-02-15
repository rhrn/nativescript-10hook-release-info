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

    fs.writeFile(config, JSON.stringify(options, null, 2), err => {

      if (err) {
        return reject(err);
      }

      console.log('Successfully created:', config);

      resolve(config);
    });

  });

};
