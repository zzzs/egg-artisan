'use strict';

const assert = require('assert');
const coffee = require('coffee');
const path = require('path');
const egg = require('egg');
const fs = require('mz/fs');
const del = require('del');

describe('test/cli-artisan.test.js', () => {
  const myBin = require.resolve('../bin/egg-artisan.js');
  const cwd = path.join(__dirname, 'fixtures/apps/artisan-test');

  describe('global options', () => {
    it('egg-artisan --help', done => {
      coffee.fork(myBin, [ '--help' ], { cwd })
        // .debug()
        .expect('stdout', /Usage: egg-artisan <command> \[options]/)
        .expect('stdout', /clone.*Clone a repository into a new directory/)
        .expect('stdout', /test.*test description/)
        .expect('stdout', /Options:/)
        .expect('stdout', /-h, --help.*/)
        .expect('stdout', /--version.*/)
        .expect('code', 0)
        .end(done);
    });

    it('egg-artisan -h', done => {
      coffee.fork(myBin, [ '-h' ], { cwd })
        // .debug()
        .expect('stdout', /Usage: egg-artisan <command> \[options]/)
        .expect('stdout', /Options:/)
        .expect('code', 0)
        .end(done);
    });

    it('egg-artisan', done => {
      coffee.fork(myBin, [], { cwd })
        // .debug()
        .expect('stdout', /Usage: egg-artisan <command> \[options]/)
        .expect('stdout', /Options:/)
        .expect('code', 0)
        .end(done);
    });

    it('egg-artisan test -h', done => {
      coffee.fork(myBin, [ 'test', '-h' ], { cwd })
        // .debug()
        .expect('stdout', /test command/)
        .expect('stdout', /Options:/)
        .expect('stdout', /-a.*test argv: a description/)
        .expect('code', 0)
        .end(done);
    });
  });

  describe('command test', () => {
    // 手动拷贝 node_modules
    before(async () => {
      if (!await fs.exists(path.join(cwd, 'node_modules'))) {
        await fs.mkdir(path.join(cwd, 'node_modules'));
      }
      const plugins = new egg.Application().loader.allPlugins;

      let key;
      for (key in plugins) {
        const src = path.join(process.cwd(), 'node_modules/egg-' + key);
        const dst = path.join(cwd, 'node_modules/egg-' + key);
        await copydir(src, dst);
      }
    });

    after(function* () {
      yield del([ path.join(cwd, 'node_modules') ]);
    });

    describe('egg-artisan test', () => {
      it('egg-artisan test -a hello', done => {
        coffee.fork(myBin, [ 'test', '-a', 'hello' ], { cwd })
          // .debug()
          .expect('stdout', /argv: hello/)
          .expect('code', 0)
          .end(done);
      });

      it('egg-artisan test -a=hello', done => {
        coffee.fork(myBin, [ 'test', '-a=hello' ], { cwd })
          // .debug()
          .expect('stdout', /argv: hello/)
          .expect('code', 0)
          .end(done);
      });

      it('egg-artisan test --a hello', done => {
        coffee.fork(myBin, [ 'test', '--a', 'hello' ], { cwd })
          // .debug()
          .expect('stdout', /argv: hello/)
          .expect('code', 0)
          .end(done);
      });

      it('egg-artisan test --a=hello', done => {
        coffee.fork(myBin, [ 'test', '--a=hello' ], { cwd })
          // .debug()
          .expect('stdout', /argv: hello/)
          .expect('code', 0)
          .end(done);
      });

      it('egg-artisan test -a=hello -b=world', done => {
        coffee.fork(myBin, [ 'test', '-a=hello', '-b=world' ], { cwd })
          // .debug()
          .expect('stdout', /argv: helloworld/)
          .expect('code', 0)
          .end(done);
      });

      it('egg-artisan test --a=hello --b=world', done => {
        coffee.fork(myBin, [ 'test', '-a=hello', '-b=world' ], { cwd })
          // .debug()
          .expect('stdout', /argv: helloworld/)
          .expect('code', 0)
          .end(done);
      });

      it('egg-artisan test hello world', done => {
        coffee.fork(myBin, [ 'test', 'hello', 'world' ], { cwd })
          // .debug()
          .expect('stdout', /argv: hello,world/)
          .expect('code', 0)
          .end(done);
      });
    });

    describe('egg-artisan clone', () => {
      const repository = 'git@github.com:zzzs/egg-artisan.git';

      it('egg-artisan clone --help', done => {
        coffee.fork(myBin, [ 'clone', '--help' ], { cwd })
          // .debug()
          .expect('stdout', /Options:/)
          .expect('stdout', /--depth\s*Create a shallow.*\[.*?]/)
          .expect('code', 0)
          .end(done);
      });

      it('egg-artisan clone <repository> [directory] [depth]', done => {
        coffee.fork(myBin, [ 'clone', '--repository', repository, '--directory=/home', '--depth', '1' ], { cwd })
          // .debug()
          .expect('stdout', /git clone git@github\.com\:zzzs\/egg-artisan\.git to \/home with depth 1/)
          .expect('code', 0)
          .end(done);
      });
    });

  });
});

// 异步递归拷贝目录
async function copydir(src, dst) {
  const fsStat = await fs.stat(src);
  if (fsStat.isDirectory()) {
    if (!await fs.exists(path.join(dst))) {
      await fs.mkdir(path.join(dst));
    }
    const files = await fs.readdirSync(src, 'utf-8');
    for (let i = 0; i < files.length; i++) {
      await copydir(path.join(src, files[i]), path.join(dst, files[i]));
    }
  } else {
    await copy(src, dst);
  }

  return true;
}

async function copy(src, dst) {
  await fs.writeFile(dst, await fs.readFile(src));
}
