'use strict';

const path = require('path');
const Command = require('common-bin');
const fs = require('fs');
const detectPort = require('detect-port');
const egg = require('egg');

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

          const target = require(path.join(fullPath, file));

          const artisanRun = target.prototype.run;

          target.prototype.run = function* () {
            const options = {};
            options.clusterPort = yield detectPort();

            // before: ready
            const Agent = egg.Agent;
            const agent = new Agent(options);
            yield agent.ready();

            const app = new egg.Application(options);
            // const Application = bindMessenger(egg.Application, agent);
            // const app = new Application(options);

            yield app.ready();

            // const msg = {
            //   action: 'egg-ready',
            //   data: options,
            // };
            // app.messenger._onMessage(msg);
            // agent.messenger._onMessage(msg);
            // console.log(1111111)

            // run
            this.ctx = app.createAnonymousContext();

            try {
              yield this.helper.callFn(artisanRun, arguments, this);
            } catch (err) {
              yield agent.close();
              yield app.close();
              throw err;
            }

            // after: close
            yield agent.close();
            yield app.close();
            process.exit(0);
          };

          this.add(name, target);
        }
      }
    }
  }

  return MainCommand;
}

module.exports = getMainCommand;
