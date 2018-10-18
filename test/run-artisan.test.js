'use strict';

const assert = require('assert');
const mock = require('egg-mock');

describe('test/run-artisan.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/artisan-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, artisan')
      .expect(200);
  });

  describe('test/runArtisan', () => {
    describe('exception', () => {
      it('runArtisan: artisanCommand must be string, but got', async () => {
        try {
          await app.runArtisan();
          throw new Error('another exception');
        } catch (err) {
          assert(err.message.includes('runArtisan: artisanCommand must be string, but got'));
        }
      });

      it("must prefix with '-' or '--'", async () => {
        try {
          await app.runArtisan('test', { a: 111 });
          throw new Error('another exception');
        } catch (err) {
          assert(err.message.includes("must prefix with '-' or '--', but got"));
        }
      });

      it('runArtisan argvs[1] must be array or object', async () => {
        try {
          await app.runArtisan('test', 1);
          throw new Error('another exception');
        } catch (err) {
          assert(err.message.includes('runArtisan argvs[1] must be array or object'));
        }
      });

      it('runArtisan throw a exception', async () => {
        return app.httpRequest()
          .get('/run5')
          .expect('it is a error')
          .expect(200);
      });
    });

    it('basic usage', () => {
      return app.httpRequest()
        .get('/run1')
        .expect('argv: ')
        .expect(200);
    });

    it('param: object', () => {
      return app.httpRequest()
        .get('/run2?a=aaa&b=bbb')
        .expect('argv: aaabbb')
        .expect(200);
    });

    it('param: array', () => {
      return app.httpRequest()
        .get('/run3/aaaa/bbbb')
        .expect('argv: aaaa,bbbb')
        .expect(200);
    });

    it('param: object with value of boolean', () => {
      return app.httpRequest()
        .get('/run4/aaaa/bbbb')
        .expect('argv: aaaa')
        .expect(200);
    });
  });
});
