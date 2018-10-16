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
      const dst = path.join(cwd, 'node_modules');
      yield del([ dst ]);
      // await fs.unlink(dst);
    });

    it('egg-artisan test -a=1', done => {
      coffee.fork(myBin, [ 'test', '-a', '11111' ], { cwd })
        .debug()
        .expect('stdout', /argv: 11111/)
        .expect('code', 0)
        .end(done);
    });

  });

});

async function copy(src, dst) {
  await fs.writeFile(dst, await fs.readFile(src));
}

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
