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
    const aa = argv.a || '';
    const bb = argv.b || '';
    const cc = argv._.join(',');
    await this.ctx.service.file.write(`777777${aa}${bb}${cc}`);
  }

  get description() {
    return 'test a repository into a new directory';
  }
}

module.exports = CloneCommand;
