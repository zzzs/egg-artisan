'use strict';

const path = require('path');
const Command = require('common-bin');
const fs = require('fs');
// const mock = require('egg-mock');
const detectPort = require('detect-port');
const egg = require('egg');

const assert = require('assert');

const cmd = process.cwd();

const MESSENGER = Symbol('messenger');

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
            let options = {};
            options.clusterPort = yield detectPort();

            // before: ready
            // let app = mock.app();
            const Agent = egg.Agent;
            const agent = new Agent(options);
            yield agent.ready();

            const app = new egg.Application(options);
            // const Application = bindMessenger(egg.Application, agent);
            // const app = new Application(options);
            // console.log(33333333333)

            // yield app.ready();
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
            // this.ctx = app.mockContext();
            let result;
            try {
              yield this.helper.callFn(artisanRun, arguments, this);
            } catch (err) {
              yield agent.close();
              yield app.close();
              throw err
            }


            // after: close
            yield agent.close();
            yield app.close();
            process.exit(0);
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

function bindMessenger(Application, agent) {
  const agentMessenger = agent.messenger;
  return class MessengerApplication extends Application {
    constructor(options) {
      super(options);

      agentMessenger.send = new Proxy(agentMessenger.send, {
        apply: this._sendMessage.bind(this),
      });
    }
    _sendMessage(target, thisArg, [ action, data, to ]) {
      const appMessenger = this.messenger;
      setImmediate(() => {

        if (to === 'app') {
          appMessenger._onMessage({ action, data });
        } else {
          agentMessenger._onMessage({ action, data });
        }
      });
    }
    get messenger() {
      return this[MESSENGER];
    }
    set messenger(m) {
      m.send = new Proxy(m.send, {
        apply: this._sendMessage.bind(this),
      });
      this[MESSENGER] = m;
    }

    // get [Symbol.for('egg#eggPath')]() { return path.join(__dirname, 'tmp'); }
    get [Symbol.for('egg#eggPath')]() { return path.dirname(__dirname); }
  };
}
