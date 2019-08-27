import fs from 'fs';
import path from 'path';
import less from 'less';
import stylelint from 'stylelint';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import lessSyntax from 'postcss-less';

/**
 * @param {string} source - The less source code.
 * @param {RenderOptions} options - The render options.
 * @returns {Promise<string>} - The bound function.
 */
const performLessFixes = function performLessFixes(source, options) {
  if (options.noFix) {
    /* eslint-disable-next-line compat/compat */
    return Promise.resolve(source);
  }

  return postcss([stylelint({fix: true}), autoprefixer({overrideBrowserslist: []})])
    .process(source, {
      from: options.source,
      syntax: lessSyntax,
    })
    .then(function writeFixes(result) {
      if (options.dryRun === false) {
        fs.writeFileSync(options.source, result.content);
      }

      return result.content;
    });
};

/**
 * @param {RenderOptions} options - The render options.
 * @returns {function(string): !object} - The bound function.
 */
const renderLessToCss = function renderLessToCss(options) {
  return function boundRenderLessToCss(lessInput) {
    return less.render(lessInput, options.sourceMap ? {sourceMap: {}} : null);
  };
};

/**
 * @param {RenderOptions} options - The render options.
 * @returns {function(!object): postcss.LazyResult} - The bound function.
 */
const performPostcss = function performPostcss(options) {
  return function boundPerformPostcss(result) {
    const plugins = options.minify ? [autoprefixer, cssnano] : [autoprefixer];

    return postcss(plugins).process(result.css, {
      from: options.source,
      to: options.destination,
      map: options.sourceMap && {inline: false},
      prev: result.map,
    });
  };
};

/**
 * @param {RenderOptions} options - The render options.
 * @returns {function(!object): postcss.LazyResult} - The bound function.
 */
const writeCssAndMap = function writeCssAndMap(options) {
  return function boundWriteCssAndMap(result) {
    /* eslint-disable-next-line compat/compat */
    return new Promise(function writeFiles(resolve) {
      if (options.dryRun === false) {
        fs.writeFileSync(options.destination, result.css, 'utf8');

        if (options.sourceMap && result.map) {
          const mapFile = typeof options.sourceMap === 'string' ? options.sourceMap : `${options.destination}.map`;
          fs.writeFileSync(mapFile, result.map, 'utf8');
        }
      }

      return resolve(result);
    });
  };
};

/**
 * @typedef {!object} RenderOptions
 * @property {string} source
 * @property {string} destination
 * @property {(string|boolean)} sourceMap
 * @property {(string|boolean)} minify
 * @property {boolean} dryRun
 * @property {boolean} noFix
 */

const normalizeOptions = function normalizeOptions(options) {
  const name = path.basename(options.source, '.less');
  const dirname = path.dirname(options.source);

  return {
    source: options.source,
    destination: options.destination || path.join(dirname, `${name}.css`),
    sourceMap: options.sourceMap || false,
    minify: options.minify || false,
    dryRun: Boolean(options.dryRun),
    noFix: Boolean(options.noFix),
  };
};

/**
 * @param {RenderOptions} options - The render options.
 * @returns {Promise<postcss.LazyResult>} - The render process Promise.
 */
const render = function render(options) {
  const opts = normalizeOptions(options);
  const source = fs.readFileSync(opts.source, 'utf8');

  return performLessFixes(source, opts)
    .then(renderLessToCss(opts))
    .then(performPostcss(opts))
    .then(writeCssAndMap(opts));
};

export default render;
