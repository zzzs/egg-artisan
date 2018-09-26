'use strict';

const Service = require('egg').Service;
// const fs = require('fs');
const path = require('path');
const fs = require('mz/fs')

class FileService extends Service {
  async write(con) {
    let file = path.resolve(this.app.config.static.dir, 'test.txt');
    return await fs.writeFile(file, con);
  }

  async read() {
    let file = path.resolve(this.app.config.static.dir, 'test.txt');
    return await fs.readFile(file);
  }
}

module.exports = FileService;


