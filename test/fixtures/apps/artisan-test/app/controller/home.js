'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, ' + this.app.plugins.artisan.name;
  }

  async run() {
    await this.app.runArtisan('test');
    this.ctx.body = 'hi, ' + this.app.plugins.artisan.name;
  }
}

module.exports = HomeController;
