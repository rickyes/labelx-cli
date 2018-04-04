#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const utils = require('../lib/utils');

const log = {
    info: utils.buildChalk(chalk.gray),
    warning: utils.buildChalk(chalk.yellow),
    error: utils.buildChalk(chalk.red)
};

program
    .version('0.0.1')
    .option('-h --help', 'help doc');

program
    .command('info')
    .alias('i')
    .description('Info LabelX')
    .action(function() {
      log.info('lax V0.0.1');
    });

program.parse(process.argv);
