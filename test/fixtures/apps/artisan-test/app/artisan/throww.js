'use strict';

const Command = require('../../../../../../');

class ThrowwCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.yargs.usage('throw command [type]');
  }

  async run() {
    throw new Error('it is a error');
  }
}

module.exports = ThrowwCommand;
