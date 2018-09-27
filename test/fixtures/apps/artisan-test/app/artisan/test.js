'use strict';

const Command = require('../../../../../../');

class TestCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.yargs.usage('test command');

    this.yargs.options({
      a: {
        type: 'string',
        description: 'test argv: a description',
      },
    });
  }

  async run({ argv }) {
    const aa = argv.a || '';
    const bb = argv.b || '';
    const cc = argv._.join(',');
    await this.ctx.service.file.write(`argv: ${aa}${bb}${cc}`);
  }

  get description() {
    return 'test description';
  }
}

module.exports = TestCommand;
