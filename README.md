# grunt-import v0.1.0

> Inline file importer with @import command.

**Usage - add `@import "path/to/file";` into any of your files to get it imported/injected into that placeholder.**


## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-import --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-import');
```




## Importer task
_Run this task with the `grunt import` command._

Task targets, files and options may be specified according to the Grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### banner
Type: `String`
Default: empty string

This string will be prepended to the beginning of the output. It is processed using [grunt.template.process][], using the default options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

#### footer
Type: `String`
Default: empty string

This string will be appended to the end of the output. It is processed using [grunt.template.process][], using the default options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

### Usage Examples

**To include a file into another file add `@import "path/to/another/file";` at any point inside your importing/source file.**

#### Including external libs

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

#### Running Importer with Uglify after import

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

#### Running Importer with Watch and Uglify after file changed

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

#### Intercepting events

You can listen to import events emitted by `grunt.import` using:

```js
grunt.event.on('import', function(action, filepath, target) {
  //your code
});
```


## Release History

 * 2012-11-06   v0.1.0   Initial Release

---

Task submitted by [-Marcin Rosinski](http://twitter.com/marcinrosinski)

*This file was generated on Wed Nov 06 2013 17:23:08.*
