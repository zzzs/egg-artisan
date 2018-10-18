# egg-artisan

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-artisan.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-artisan
[travis-image]: https://img.shields.io/travis/zzzs/egg-artisan.svg?style=flat-square
[travis-url]: https://travis-ci.org/zzzs/egg-artisan
[codecov-image]: https://img.shields.io/codecov/c/github/zzzs/egg-artisan.svg?style=flat-square
[codecov-url]: https://codecov.io/github/zzzs/egg-artisan?branch=master
[david-image]: https://img.shields.io/david/zzzs/egg-artisan.svg?style=flat-square
[david-url]: https://david-dm.org/zzzs/egg-artisan
[snyk-image]: https://snyk.io/test/npm/egg-artisan/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-artisan
[download-image]: https://img.shields.io/npm/dm/egg-artisan.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-artisan


A cli plugin for egg, named artisan, based on [common-bin](https://github.com/node-modules/common-bin).


## Install

```bash
$ npm i egg-artisan --save
```

## Mount

```js
// {app_root}/config/plugin.js
exports.artisan = {
  enable: true,
  package: 'egg-artisan',
};
```

## Features

> `egg-artisan` provides a cli running mode for egg. In the root directory, you can do something by executing commands like `npm run artisan xxx`, such as manipulating database scripts, updating cache scripts, etc.

`egg-artisan` based on [common-bin](https://github.com/node-modules/common-bin)(based on [yargs](https://github.com/yargs/yargs)), to provide more convenient usage, as detailed below.

## Usage

`egg-artisan` requires cli file to be stored in `app/artisan`, as shown below, `clone.js`, `test.js`.

```
    egg-project
    ├── app
    │   ├── artisan
    │   |   ├── clone.js
    │   |   └── test.js
    │   ├── controller
    |   ├── router.js
    |   | ...
    ├── package.json
    ├── config
    ├── test
    ├── app.js (可选)

```

```js
// {app_root}/config/config.default.js
exports.artisan = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/zzzs/egg/issues).

## License

[MIT](LICENSE)
