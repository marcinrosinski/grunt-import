/*
 * grunt-import
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Marcin Rosinski, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },
    // Configuration to be run (and then tested).
    banner_property: 'GREAT',
    import:{
      default_options: {
        files: {
          'tmp/default_options': 'test/fixtures/file2'
        }
      },
      custom_options: {
        options: {
          banner: '/* THIS TEST IS <%= banner_property %> */\n',
          footer: 'YO'
        },
        files: {
          'tmp/custom_options': 'test/fixtures/file2'
        }
      },
      custom_indent_options: {
        options: {
          indent: true
        },
        files: {
          'tmp/custom_indent_options': 'test/fixtures/file3'
        }
      }
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'import', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);

};
