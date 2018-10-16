'use strict';

const Service = require('egg').Service;
const path = require('path');
const fs = require('mz/fs');

class FileService extends Service {
  async write(con) {
    const file = path.resolve(this.app.config.static.dir, 'test.txt');
    return await fs.writeFile(file, con);
  }

  async read() {
    const file = path.resolve(this.app.config.static.dir, 'test.txt');
    return await fs.readFile(file);
  }
}

module.exports = FileService;
