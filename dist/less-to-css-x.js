"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _less = _interopRequireDefault(require("less"));

var _stylelint = _interopRequireDefault(require("stylelint"));

var _postcss = _interopRequireDefault(require("postcss"));

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

var _cssnano = _interopRequireDefault(require("cssnano"));

var _postcssLess = _interopRequireDefault(require("postcss-less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string} source - The less source code.
 * @param {RenderOptions} options - The render options.
 * @returns {Promise<string>} - The bound function.
 */
const performLessFixes = function performLessFixes(source, options) {
  if (options.noFix) {
    return Promise.resolve(source);
  }

  return (0, _postcss.default)([(0, _stylelint.default)({
    fix: true
  }), (0, _autoprefixer.default)({
    overrideBrowserslist: []
  })]).process(source, {
    from: options.source,
    syntax: _postcssLess.default
  }).then(function writeFixes(result) {
    if (options.dryRun === false) {
      _fs.default.writeFileSync(options.source, result.content);
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
    return _less.default.render(lessInput, options.sourceMap ? {
      sourceMap: {}
    } : null);
  };
};
/**
 * @param {RenderOptions} options - The render options.
 * @returns {function(!object): postcss.LazyResult} - The bound function.
 */


const performPostcss = function performPostcss(options) {
  return function boundPerformPostcss(result) {
    const plugins = options.minify ? [_autoprefixer.default, _cssnano.default] : [_autoprefixer.default];
    return (0, _postcss.default)(plugins).process(result.css, {
      from: options.source,
      to: options.destination,
      map: options.sourceMap && {
        inline: false
      },
      prev: result.map
    });
  };
};
/**
 * @param {RenderOptions} options - The render options.
 * @returns {function(!object): postcss.LazyResult} - The bound function.
 */


const writeCssAndMap = function writeCssAndMap(options) {
  return function boundWriteCssAndMap(result) {
    return new Promise(function writeFiles(resolve) {
      if (options.dryRun === false) {
        _fs.default.writeFileSync(options.destination, result.css, 'utf8');

        if (options.sourceMap && result.map) {
          const mapFile = typeof options.sourceMap === 'string' ? options.sourceMap : `${options.destination}.map`;

          _fs.default.writeFileSync(mapFile, result.map, 'utf8');
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
  const name = _path.default.basename(options.source, '.less');

  const dirname = _path.default.dirname(options.source);

  return {
    source: options.source,
    destination: options.destination || _path.default.join(dirname, `${name}.css`),
    sourceMap: options.sourceMap || false,
    minify: options.minify || false,
    dryRun: Boolean(options.dryRun),
    noFix: Boolean(options.noFix)
  };
};
/**
 * @param {RenderOptions} options - The render options.
 * @returns {Promise<postcss.LazyResult>} - The render process Promise.
 */


const render = function render(options) {
  const opts = normalizeOptions(options);

  const source = _fs.default.readFileSync(opts.source, 'utf8');

  return performLessFixes(source, opts).then(renderLessToCss(opts)).then(performPostcss(opts)).then(writeCssAndMap(opts));
};

var _default = render;
exports.default = _default;

//# sourceMappingURL=less-to-css-x.js.map