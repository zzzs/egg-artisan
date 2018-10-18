'use strict';

const is = require('is-type-of');
const path = require('path');
const assert = require('assert');

module.exports = app => {
  app.runArtisan = async (artisanPath, argvs) => {
    assert(is.string(artisanPath), `runArtisan: artisanCommand must be string, but got ${artisanPath}`);

    let rawArgv = artisanPath.split(' ');
    rawArgv = rawArgv.filter(item => item !== '');

    // parse path
    artisanPath = rawArgv.shift();
    if (!path.isAbsolute(artisanPath)) {
      artisanPath = path.basename(artisanPath);
      artisanPath = path.join(app.config.baseDir, 'app/artisan', artisanPath);
    }
    let artisanClass = require.resolve(artisanPath);
    artisanClass = require(artisanClass);

    // parse rawArgv
    if (argvs) {
      if (is.array(argvs)) {
        argvs.forEach(item => {
          rawArgv.push(item);
        });
      } else if (is.object(argvs)) {
        let item;
        for (item in argvs) {
          if (is.boolean(argvs[item])) {
            if (argvs[item]) {
              rawArgv.push(item);
            }
          } else {
            if (item.indexOf('-') === 0 || item.indexOf('--') === 0) {
              rawArgv.push(item);
              rawArgv.push(argvs[item]);
            } else {
              throw new Error(`must prefix with '-' or '--', but got ${item}`);
            }
          }
        }
      } else {
        throw new TypeError('runArtisan argvs[1] must be array or object');
      }
    }
    const artisanObj = new artisanClass(rawArgv);
    artisanObj.ctx = app.createAnonymousContext();
    await artisanObj.run(artisanObj.context);
  };
};
