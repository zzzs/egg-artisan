'use strict';
// const Router = require('./lib/index');
const path = require('path');
const Command = require('common-bin');

module.exports = app => {

    class MainCommand extends Command {
      constructor(rawArgv) {
        super(rawArgv);
        this.usage = 'Usage: egg-artisan <command> [options]';

        // load sub command
        this.load(path.join(__dirname + __dirname, 'artisan'));
      }
    }

    return MainCommand;

};
