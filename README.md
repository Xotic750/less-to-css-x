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
  href="https://www.jsdelivr.com/package/npm/less-to-css-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/less-to-css-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
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
 * @typedef {!object} RenderOptions
 * @property {string} source
 * @property {string} destination
 * @property {(string|boolean)} sourceMap
 * @property {(string|boolean)} minify
 * @property {boolean} dryRun
 * @property {boolean} noFix
 */

// result is a postcss.LazyResult

lessToCss({source: '__tests__/basic.less'}).then((result) => {
  console.log(result);
});
```

**Example**

CLI

```bash
$ ./bin/less-to-css-x.js example.less
```

**Example**

Webstorm

![Alt text](images/image1.png?raw=true "Title")
![Alt text](images/image2.png?raw=true "Title")
