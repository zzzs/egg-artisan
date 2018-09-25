'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');

class FileService extends Service {
  async write(key) {
    let file = path.resolve(this.app.config.static.dir, 'test');
    return await fs.writeFile(file, 'hello');
  }

  async read() {
    let file = path.resolve(this.app.config.static.dir);
    return file;
  }
}

module.exports = FileService;


