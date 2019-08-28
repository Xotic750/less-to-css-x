/**
 * @file Manages the root configuration settings for project wide stylelint.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @module stylelint/root/configuration
 * @version 1.0.0
 * @since 2.81.1
 * @see {@link https://stylelint.io/} for further information.
 */

/* eslint-env node, es6 */

module.exports = {
  /**
   * Extend an existing configuration.
   *
   * @type {string|Array.<string>}
   * @see {@link https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#extends}
   */
  extends: [
    /**
     * The standard shareable config for stylelint.
     *
     * @type {string}
     * @see {@link https://github.com/stylelint/stylelint-config-standard}
     */
    'stylelint-config-standard',
    /**
     * Turns off all rules that are unnecessary or might conflict with prettier.
     *
     * @type {string}
     * @see {@link https://github.com/shannonmoeller/stylelint-config-prettier}
     */
    'stylelint-config-prettier',
  ],

  /**
   * @type {Array}
   */
  plugins: [
    'stylelint-prettier',
    'stylelint-no-unsupported-browser-features',
  ],

  /**
   * @type {Array}
   */
  // processors: [], // do not include empty

  /**
   * @type {object}
   */
  rules: {
    'prettier/prettier': true,
    'no-empty-source': null,
    'block-no-empty': null,
    'no-descending-specificity': null,
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
  },
};
