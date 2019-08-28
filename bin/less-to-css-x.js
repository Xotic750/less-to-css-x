#!/usr/bin/env node

const yargs = require('yargs');
// noinspection JSUnresolvedVariable
const lessToCss = require('../dist/less-to-css-x').default;

/**
 * @param {Error} error - An Error object.
 */
const thrower = function thrower(error) {
  throw error;
};

// noinspection JSUnresolvedFunction
const {argv} = yargs
  .demandCommand(1)
  .usage('Usage: $0 [options] <source> [destination]')
  .example('$0 example.less')
  .example('$0 example.less eg.css')
  .example('$0 --souce-map example.less')
  .example('$0 --souce-map=eg.css.map example.less')
  .alias('s', 'source-map')
  .describe('source-map', 'Produce a sourcemap, optionally you can set a filename')
  .alias('m', 'minify')
  .boolean('minify')
  .describe('minify', 'Minify the output')
  .alias('d', 'dry-run')
  .boolean('dry-run')
  .describe('dry-run', 'Execute but do not write any files')
  .alias('n', 'no-fix')
  .boolean('no-fix')
  .describe('no-fix', 'Do not perform automated fixes')
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')
  .epilog('copyright 2019');

const options = {
  source: argv._[0],
  destination: argv._[1],
  sourceMap: argv.sourceMap,
  minify: argv.minify,
  dryRun: argv.dryRun,
  noFix: argv.noFix,
};

lessToCss(options).catch(thrower);
