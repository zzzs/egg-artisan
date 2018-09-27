'use strict';

const assert = require('assert');
const mock = require('egg-mock');
const coffee = require('coffee');
const path = require('path');

describe('test/cli-artisan.test.js', () => {
  const myBin = require.resolve('../bin/egg-artisan.js');
  const cwd = path.join(__dirname, 'fixtures/apps/artisan-test');
  // const repository = 'git@github.com:node-modules/common-bin';

  describe('global options', () => {
    it('egg-artisan --help', done => {
      coffee.fork(myBin, [ '--help' ], { cwd })
        // .debug()
        .expect('stdout', /Usage: egg-artisan <command> \[options]/)
        .expect('stdout', /clone.*Clone a repository into a new directory/)
        .expect('stdout', /test.*test a repository into a new directory/)
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

    // it('egg-artisan -h remote', done => {
    //   coffee.fork(myBin, [ '-h', 'remote' ], { cwd })
    //     // .debug()
    //     .expect('stdout', /Usage: my-git remote/)
    //     .expect('stdout', /add\s*Adds a remote/)
    //     .expect('stdout', /remove\s*Remove the remote/)
    //     .expect('code', 0)
    //     .end(done);
    // });

    // it('my-git', done => {
    //   coffee.fork(myBin, [], { cwd })
    //     // .debug()
    //     .expect('stdout', /Usage: my-git <command> \[options]/)
    //     .expect('stdout', /Options:/)
    //     .expect('code', 0)
    //     .end(done);
    // });

    // it('my-git --version', done => {
    //   coffee.fork(myBin, [ '--version' ], { cwd })
    //     // .debug()
    //     .expect('stdout', '2.0.0\n')
    //     .expect('code', 0)
    //     .end(done);
    // });
  });

});
