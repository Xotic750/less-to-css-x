#!/usr/bin/env node

const yargs = require('yargs');
const lessToCss = require('../dist/less-to-css-x').default;

/**
 * @param {Error} error - An Error object.
 */
const thrower = function thrower(error) {
  throw error;
};

const {argv} = yargs.demandCommand(1);

const options = {
  source: argv._[0],
  destination: argv._[1],
  sourceMap: argv.sourceMap,
  minify: argv.minify,
  dryRun: argv.dryRun,
  noFix: argv.noFix,
};

lessToCss(options).catch(thrower);
