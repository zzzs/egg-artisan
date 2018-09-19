'use strict';

const path = require('path');
const Command = require('common-bin');
const fs = require('fs');
const mm = require('egg-mock');
const assert = require('assert');

async function getMainCommand() {
  let app = mm.app({
    baseDir: process.cwd()
  });
  // await app.ready();

  class MainCommand extends Command {
    constructor(rawArgv) {
      super(rawArgv);

      this.usage = 'Usage: egg-artisan <command> [options]';
      // load sub command
      this.load(path.join(process.cwd(), 'app/artisan'));
      // this.load(path.join(app.baseDir, 'app/artisan'));
    }

    load(fullPath) {
      assert(fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory(),
      `${fullPath} should exist and be a directory`);

      // load entire directory
      const files = fs.readdirSync(fullPath);
      const names = [];
      for (const file of files) {
        if (path.extname(file) === '.js') {
          const name = path.basename(file).replace(/\.js$/, '');
          names.push(name);

          let target = require(path.join(fullPath, file));

          let aaa = target.prototype.run;
          // target.prototype.run = aaa.before(async function () {
          //   console.log('readyreadyready')
          //   await app.ready();
          //   return app.mockContext();
          // });
          
          target.prototype.run = async function () {
            let _self = this;
            console.log('readyreadyready')
            await app.ready();
            // let ctx = app.mockContext();
            this.ctx = app.mockContext();
            let result = await aaa.apply(this, arguments);
            console.log('closecloseclose')
            await app.close();
            return result;
          };


          // target.prototype.ctx = app.mockContext();
          // target.prototype.run = async function () {
          //   console.log('before')
          //   await aaa(target.prototype.context);
          //   console.log('after')
          // }
          // console.log('run', typeof target, target.prototype.run);
          
          this.add(name, target);
        }
      }
    }

  }

  return MainCommand;
}

module.exports = getMainCommand;
