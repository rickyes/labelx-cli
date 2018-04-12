#!/usr/bin/env node

const program = require('commander');
const LabelX = 'https://github.com/zhoumingque/LabelX.git';
const log = require('../lib/log')({ debug: false });
const spawn = require('hexo-util/lib/spawn');
const pkg = require('../package.json');
const utils = require('../lib/utils');
const Promise = require('bluebird');

program
  .version(pkg.version, '-v, --version')
  .usage('<command>');

program
    .command('init')
    .description('init LabelX Dev')
    .action(function(args){
      let path = process.cwd() + '\\';
      let name;
      name = utils.isType(utils.TYPE.String,args) ? args : 'LabelX';
      path += name;
      log.info(`Cloning LabelX-starter to`,log.color.yellow(path));
      spawn('git', ['clone', '--recursive', LabelX, path], {
        stdio: 'inherit'
      }).catch(function() {
        log.warn('git clone failed. Copying data instead');
        return;
      }).then(function() {

        log.info('Install dependencies');

        return spawn('yarn', ['install'], {
          cwd: path,
          stdio: 'inherit'
        });
      }).then(function() {
        log.info('Start dev with LabelX!');
      }).catch(function() {
        log.warn('Failed to install dependencies. Please run \'npm install\' manually!');
      });
    });

program.parse(process.argv);
