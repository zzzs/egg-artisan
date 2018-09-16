'use strict';

// const path = require('path');
const Command = require('common-bin');
// const mm = require('egg-mock');

// async function getConfig() {
//   let app = mm.app({
//     baseDir: process.cwd()
//   });
//   await app.ready();

//   return class MainCommand extends Command {
//     constructor(rawArgv) {
//       super(rawArgv);
//       this.usage = 'Usage: egg-artisan <command> [options]';
//       // load sub command
//       this.load(path.join(app.baseDir, 'app/artisan'));
//     }
//   }
// }
// module.exports = getConfig;
class MainCommand extends Command {

};
module.exports = MainCommand
