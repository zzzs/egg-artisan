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
});
