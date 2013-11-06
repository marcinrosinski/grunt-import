# Usage Examples

**To include a file into another file add `@import "path/to/another/file";` at any point inside your importing/source file.**

## Including external libs

In this example, running `grunt import:dist` (or `grunt import` because `grunt-import` is a [multi task][multitask]) will parse `src/intro.js` file writing the output to `dist/intro.js`

```js
// Project configuration.
grunt.initConfig({
  import: {
    options: {},
    dist: {
      src: 'src/intro.js',
      dest: 'dist/intro.js',
    }
  }
});
```

## Running Importer with Uglify after import

In this example, running `grunt watch:js` will parse `src/intro.js` file writing the output to `stage/intro.js` and followup with the Uglify task writing output into `dist/intro.js`

```js
// Project configuration.
grunt.initConfig({
  import: {
    options: {},
    dist: {
      src: 'src/intro.js',
      dest: 'stage/intro.js',
    },
    tasks: ['uglify:dist']
  },
  uglify: {
    dist: {
      src: 'stage/intro.js',
      dest: 'dist/intro.js',
    }
  }
});
```

## Running Importer with Watch and Uglify after file changed

In this example, running `grunt watch:js` will listen to any changes to the `src/intro.js` after which it will run `import:dist` task followed by `uglify:dist`.

```js
// Project configuration.
grunt.initConfig({
  watch: {
    js: {
      files: ['src/intro.js'],
      tasks: ['import:dist']
    }
  }
  import: {
    options: {},
    dist: {
      src: 'src/intro.js',
      dest: 'stage/intro.js',
    }
    tasks: ['uglify:dist']
  },
  uglify: {
    dist: {
      src: 'stage/intro.js',
      dest: 'dist/intro.js',
    }
  }
});
```

## Intercepting events

You can listen to import events emitted by `grunt.import` using:

```js
grunt.event.on('import', function(action, filepath, target) {
  //your code
});
```
