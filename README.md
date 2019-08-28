<a
  href="https://travis-ci.org/Xotic750/less-to-css-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/less-to-css-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a
  href="https://david-dm.org/Xotic750/less-to-css-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/less-to-css-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/less-to-css-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/less-to-css-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a
  href="https://badge.fury.io/js/less-to-css-x"
  title="npm version">
<img src="https://badge.fury.io/js/less-to-css-x.svg"
  alt="npm version" height="18">
</a>
<a
  href="https://bettercodehub.com/results/Xotic750/less-to-css-x"
  title="bettercodehub score">
<img src="https://bettercodehub.com/edge/badge/Xotic750/less-to-css-x?branch=master"
  alt="bettercodehub score" height="18">
</a>
<a
  href="https://coveralls.io/github/Xotic750/less-to-css-x?branch=master"
  title="Coverage Status">
<img src="https://coveralls.io/repos/github/Xotic750/less-to-css-x/badge.svg?branch=master"
  alt="Coverage Status" height="18">
</a>

<a name="module_less-to-css-x"></a>

## less-to-css-x

Lint and fix Less then compile to CSS.

**Example**

Javascript API

```js
import lessToCss from 'less-to-css-x';

/**
 * lessToCss options.
 *
 * @typedef {!object} RenderOptions
 * @property {string} source
 * @property {string} [destination]
 * @property {(string|boolean)} [sourceMap=false]
 * @property {boolean} [minify=false]
 * @property {boolean} [dryRun=false]
 * @property {boolean} [noFix=false]
 */

// 'result' is a postcss.LazyResult
// https://api.postcss.org/LazyResult.html

lessToCss({source: '__tests__/basic.less'}).then((result) => {
  console.log(result);
});
```

**Example**

CLI

```bash
$ less-to-css-x.js --help
Usage: less-to-css-x.js [options] <source> [destination]

Options:
-h, --help        Show help                                          [boolean]
-s, --source-map  Produce a sourcemap, optionally you can set a filename
-m, --minify      Minify the output                                  [boolean]
-d, --dry-run     Execute but do not write any files                 [boolean]
-n, --no-fix      Do not perform automated fixes                     [boolean]
-v, --version     Show version number                                [boolean]

Examples:
less-to-css-x.js example.less
less-to-css-x.js example.less eg.css
less-to-css-x.js --souce-map example.less
less-to-css-x.js --souce-map=eg.css.map example.less

copyright 2019
```

**Example**

Webstorm

![Alt text](images/image1.png?raw=true 'Title')
![Alt text](images/image2.png?raw=true 'Title')

Once up and running you will probably want to change 'Show console' to 'On error'.
