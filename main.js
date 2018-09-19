'use strict';

const path = require('path');
const Command = require('common-bin');
const fs = require('fs');
const mm = require('egg-mock');
const assert = require('assert');

const cmd = process.cwd();

async function getMainCommand() {

  class MainCommand extends Command {
    constructor(rawArgv) {
      super(rawArgv);

      this.usage = 'Usage: egg-artisan <command> [options]';
      // load sub command
      this.load(path.join(cmd, 'app/artisan'));
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

          let artisanRun = target.prototype.run;

          target.prototype.run = function* () {
            // before: ready
            let app = mm.app({
              baseDir: cmd
            });
            yield app.ready();

            // run
            this.ctx = app.mockContext();
            let result;
            try {
              yield this.helper.callFn(artisanRun, arguments, this);
            } catch (err) {
              yield app.close();
              throw err
            }

            // after: close
            yield app.close();
            return result;
          };

          this.add(name, target);
        }
      }
    }
  }

  return MainCommand;
}

module.exports = getMainCommand;
