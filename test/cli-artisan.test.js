'use strict';

const assert = require('assert');
const coffee = require('coffee');
const path = require('path');

describe('test/cli-artisan.test.js', () => {
  const myBin = require.resolve('../bin/egg-artisan.js');
  const cwd = path.join(__dirname, 'fixtures/apps/artisan-test');

  // describe('global options', () => {
  //   it('egg-artisan --help', done => {
  //     coffee.fork(myBin, [ '--help' ], { cwd })
  //       // .debug()
  //       .expect('stdout', /Usage: egg-artisan <command> \[options]/)
  //       .expect('stdout', /clone.*Clone a repository into a new directory/)
  //       .expect('stdout', /test.*test description/)
  //       .expect('stdout', /Options:/)
  //       .expect('stdout', /-h, --help.*/)
  //       .expect('stdout', /--version.*/)
  //       .expect('code', 0)
  //       .end(done);
  //   });

  //   it('egg-artisan -h', done => {
  //     coffee.fork(myBin, [ '-h' ], { cwd })
  //       // .debug()
  //       .expect('stdout', /Usage: egg-artisan <command> \[options]/)
  //       .expect('stdout', /Options:/)
  //       .expect('code', 0)
  //       .end(done);
  //   });

  //   it('egg-artisan', done => {
  //     coffee.fork(myBin, [], { cwd })
  //       // .debug()
  //       .expect('stdout', /Usage: egg-artisan <command> \[options]/)
  //       .expect('stdout', /Options:/)
  //       .expect('code', 0)
  //       .end(done);
  //   });

  //   it('egg-artisan test -h', done => {
  //     coffee.fork(myBin, [ 'test', '-h' ], { cwd })
  //       // .debug()
  //       .expect('stdout', /test command/)
  //       .expect('stdout', /Options:/)
  //       .expect('stdout', /-a.*test argv: a description/)
  //       .expect('code', 0)
  //       .end(done);
  //   });
  // });

  describe('command test', () => {

    it('egg-artisan test -a=1', done => {
      coffee.fork(myBin, [ 'test', '-a', '11111' ], { cwd })
        .debug()
        .expect('stdout', /argv: 11111/)
        .expect('code', 0)
        .end(done);
    });

  });

});
