'use strict';

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

    });

    it('should GET /run', () => {
      return app.httpRequest()
        .get('/run1')
        .expect('777777')
        .expect(200);
    });

    it('should GET /run', () => {
      return app.httpRequest()
        .get('/run2?a=aaa&b=bbb')
        .expect('777777aaabbb')
        .expect(200);
    });

    it('should GET /run', () => {
      return app.httpRequest()
        .get('/run3/aaaa/bbbb')
        .expect('777777aaaa,bbbb')
        .expect(200);
    });

  });
});
