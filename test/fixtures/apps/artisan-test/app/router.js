'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/run1', controller.home.run1);
  router.get('/run2', controller.home.run2);
  router.get('/run3/:a/:b', controller.home.run3);
  router.get('/run4/:a/:b', controller.home.run4);
  router.get('/run5', controller.home.run5);
};
