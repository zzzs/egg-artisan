'use strict';

const Command = require('../../../../../../');

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

  async run({ argv }) {
    await this.ctx.set('aaaaa', 'bbbbbbb')
console.log(1111111111, this.ctx.header)
    // console.log('aaaaaaa', argv, this.ctx.app);
  }

  get description() {
    return 'test a repository into a new directory';
  }
}

module.exports = CloneCommand;
