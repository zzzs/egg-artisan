'use strict';

const Command = require('egg-artisan');

class CloneCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.yargs.usage('test <repository> [directory]');

    this.yargs.options({
      depth: {
        type: 'number',
        description: 'Create a shallow clone with a history truncated to the specified number of commits',
      },
    });
  }

  run({ argv }) {
    console.log('aaaaaaa', argv, this.ctx.app);
  }

  get description() {
    return 'test a repository into a new directory';
  }
}

module.exports = CloneCommand;
