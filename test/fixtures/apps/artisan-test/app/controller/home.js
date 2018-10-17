'use strict';

const Controller = require('egg').Controller;
const path = require('path');

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, ' + this.app.plugins.artisan.name;
  }

  async run1() {
    await this.app.runArtisan('test');
    const con = await this.ctx.service.file.read();
    this.ctx.body = `${con}`;
  }

  async run2() {
    const query = this.ctx.query;

    const absolutePath = path.join(this.ctx.app.config.baseDir, 'app/artisan/test');
    await this.app.runArtisan(absolutePath, { '-a': query.a, '-b': query.b });
    const con = await this.ctx.service.file.read();
    this.ctx.body = `${con}`;
  }

  async run3() {
    const params = this.ctx.params;
    await this.app.runArtisan('test', [ params.a, params.b ]);
    const con = await this.ctx.service.file.read();
    this.ctx.body = `${con}`;
  }

  async run4() {
    const params = this.ctx.params;
    const obj = {};
    obj[params.a] = true;
    obj[params.b] = false;
    await this.app.runArtisan('test', obj);
    const con = await this.ctx.service.file.read();
    this.ctx.body = `${con}`;
  }

  async run5() {
    try {
      await this.app.runArtisan('throww');
      this.ctx.body = 'ok';
    } catch (err) {
      this.ctx.body = err.message;
    }
  }
}

module.exports = HomeController;
