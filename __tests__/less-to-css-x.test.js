import fs from 'fs';
import rimraf from 'rimraf';
import lessToCss from '../src/less-to-css-x';

const noop = function noop() {};

describe('lessToCss', function() {
  const removeCreatedFiles = function removeCreatedFiles() {
    rimraf.sync('__tests__/basic.css', {}, noop);
    rimraf.sync('__tests__/basic.css.map', {}, noop);
    rimraf.sync('__tests__/basic1.css', {}, noop);
    rimraf.sync('__tests__/basic1.css.map', {}, noop);
    rimraf.sync('__tests__/basic1x.css.map', {}, noop);
  };

  beforeEach(() => {
    const lessSource = fs.readFileSync('__tests__/basic.original.less', 'utf8');
    fs.writeFileSync('__tests__/basic.less', lessSource);
    removeCreatedFiles();
  });

  afterAll(() => {
    rimraf.sync('__tests__/basic.less', {}, noop);
    removeCreatedFiles();
  });

  it('is a function', function() {
    expect.assertions(1);
    expect(typeof lessToCss).toBe('function');
  });

  it('it returns a Promise', function() {
    expect.assertions(1);
    expect(lessToCss({source: '__tests__/basic.less', dryRun: true})).toBeInstanceOf(Promise);
  });

  it('it work with basic less', function() {
    expect.assertions(2);

    /* eslint-disable-next-line promise/param-names */
    return new Promise((done) => {
      return lessToCss({source: '__tests__/basic.less', dryRun: true}).then((actual) => {
        expect(actual.css).toMatchSnapshot();
        expect(actual.map).toMatchSnapshot();
        done();
      });
    });
  });

  it('it should create a source map', function() {
    expect.assertions(2);

    /* eslint-disable-next-line promise/param-names */
    return new Promise((done) => {
      return lessToCss({source: '__tests__/basic.less', sourceMap: true, dryRun: true}).then((actual) => {
        expect(actual.css).toMatchSnapshot();
        expect(actual.map).toMatchSnapshot();
        done();
      });
    });
  });

  it('it should minify', function() {
    expect.assertions(2);

    /* eslint-disable-next-line promise/param-names */
    return new Promise((done) => {
      return lessToCss({source: '__tests__/basic.less', sourceMap: true, minify: true, dryRun: true}).then((actual) => {
        expect(actual.css).toMatchSnapshot();
        expect(actual.map).toMatchSnapshot();
        done();
      });
    });
  });

  it('it should write css file', function() {
    expect.assertions(2);

    /* eslint-disable-next-line promise/param-names */
    return new Promise((done) => {
      return lessToCss({source: '__tests__/basic.less', noFix: true}).then((actual) => {
        const css = fs.readFileSync('__tests__/basic.css', 'utf8');
        expect(css).toMatchSnapshot();
        expect(css).toBe(actual.css);

        done();
      });
    });
  });

  it('it should write css and map file', function() {
    expect.assertions(4);

    /* eslint-disable-next-line promise/param-names */
    return new Promise((done) => {
      return lessToCss({source: '__tests__/basic.less', sourceMap: true, noFix: true}).then((actual) => {
        const css = fs.readFileSync('__tests__/basic.css', 'utf8');
        expect(css).toMatchSnapshot();
        expect(css).toBe(actual.css);
        const map = fs.readFileSync('__tests__/basic.css.map', 'utf8');
        expect(map).toMatchSnapshot();
        expect(map).toBe(String(actual.map));

        done();
      });
    });
  });

  it('it should write a custom css and map file', function() {
    expect.assertions(4);

    /* eslint-disable-next-line promise/param-names */
    return new Promise((done) => {
      return lessToCss({source: '__tests__/basic.less', destination: '__tests__/basic1.css', sourceMap: true, noFix: true}).then(
        (actual) => {
          const css = fs.readFileSync('__tests__/basic1.css', 'utf8');
          expect(css).toMatchSnapshot();
          expect(css).toBe(actual.css);
          const map = fs.readFileSync('__tests__/basic1.css.map', 'utf8');
          expect(map).toMatchSnapshot();
          expect(map).toBe(String(actual.map));

          done();
        },
      );
    });
  });

  it('it should write a custom css and custom map file', function() {
    expect.assertions(4);

    /* eslint-disable-next-line promise/param-names */
    return new Promise((done) => {
      return lessToCss({
        source: '__tests__/basic.less',
        destination: '__tests__/basic1.css',
        sourceMap: '__tests__/basic1x.css.map',
        noFix: true,
      }).then((actual) => {
        const css = fs.readFileSync('__tests__/basic1.css', 'utf8');
        expect(css).toMatchSnapshot();
        expect(css).toBe(actual.css);
        const map = fs.readFileSync('__tests__/basic1x.css.map', 'utf8');
        expect(map).toMatchSnapshot();
        expect(map).toBe(String(actual.map));

        done();
      });
    });
  });

  it('it should not autofix', function() {
    expect.assertions(2);

    /* eslint-disable-next-line promise/param-names */
    return new Promise((done) => {
      return lessToCss({source: '__tests__/basic.less', noFix: true}).then(() => {
        const original = fs.readFileSync('__tests__/basic.original.less', 'utf8');
        const basic = fs.readFileSync('__tests__/basic.less', 'utf8');
        expect(original).toMatchSnapshot();
        expect(basic).toBe(original);

        done();
      });
    });
  });

  it('it should autofix', function() {
    expect.assertions(2);

    /* eslint-disable-next-line promise/param-names */
    return new Promise((done) => {
      return lessToCss({source: '__tests__/basic.less'}).then(() => {
        const fixed = fs.readFileSync('__tests__/basic.fixed.less', 'utf8');
        const basic = fs.readFileSync('__tests__/basic.less', 'utf8');
        expect(fixed).toMatchSnapshot();
        expect(basic).toBe(fixed);

        done();
      });
    });
  });
});
