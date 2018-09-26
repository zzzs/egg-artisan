'use strict';

const assert = require('assert');
const mock = require('egg-mock');

describe('test/artisan.test.js', () => {
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
      it(`must prefix with '-' or '--'`, async () => {
        try {
          await app.runArtisan('test', {'a': 111});
          throw new Error('another exception');
        } catch (err) {
          assert(err.message.includes(`must prefix with '-' or '--', but got`));
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
    });

    it('basic usage', () => {
      return app.httpRequest()
        .get('/run1')
        .expect('777777')
        .expect(200);
    });

    it('param: object', () => {
      return app.httpRequest()
        .get('/run2?a=aaa&b=bbb')
        .expect('777777aaabbb')
        .expect(200);
    });

    it('param: array', () => {
      return app.httpRequest()
        .get('/run3/aaaa/bbbb')
        .expect('777777aaaa,bbbb')
        .expect(200);
    });

    it('param: object with value of boolean', () => {
      return app.httpRequest()
        .get('/run4/aaaa/bbbb')
        .expect('777777aaaa')
        .expect(200);
    });

  });
});
