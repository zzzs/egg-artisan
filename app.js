'use strict';

const is = require('is-type-of');
const path = require('path');

module.exports = app => {
  app.runArtisan = async (artisanPath, argvs) => {
    let rawArgv = artisanPath.split(' ');
    rawArgv = rawArgv.filter(item => item !== '');

    rawArgv[0] = path.basename(rawArgv[0]);

    artisanPath = rawArgv[0];
    if (!path.isAbsolute(artisanPath)) {
      artisanPath = path.join(app.config.baseDir, 'app/artisan', artisanPath);
    }
    let artisanClass = require.resolve(artisanPath);
    artisanClass = require(artisanClass);
    if (argvs) {
      if (is.array(argvs)) {
        array.forEach(item => {
          rawArgv.push(item);
        });
      } else if (is.object(argvs)) {
        for (let item in argvs) {
          rawArgv.push(item);
          rawArgv.push(argvs[item]);
        }
      } else {
        throw new Error('argvs error');
      }
    }
    const artisanObj = new artisanClass(rawArgv);
    artisanObj.ctx = app.createAnonymousContext();
    await artisanObj.run(artisanObj.context);
  };
};
