'use strict';

const path = require('path');
const Command = require('common-bin');

class MainCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: egg-artisan <command> [options]';

    // load sub command
    this.load(path.join(__dirname + __dirname, 'artisan'));
  }
}

module.exports = MainCommand;