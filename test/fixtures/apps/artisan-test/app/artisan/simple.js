'use strict';

const Command = require('../../../../../../');

class SimpleCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.yargs.usage('simple command [type]');

    this.yargs.options({
      depth: {
        type: 'string',
        description: 'type',
      },
    });
  }

  run({ argv }) {
    console.log('simple type: %s', argv.type);
    return Promise.resolve(argv.type);
  }
}

module.exports = SimpleCommand;
