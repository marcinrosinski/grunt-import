/*
 * grunt-import
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Marcin Rosinski, contributors
 * Licensed under the MIT license.
 */

'use strict';

String.prototype.__fullTrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};

module.exports = function(grunt) {

  grunt.registerMultiTask('import', '@import - inline file import.', function() {

        var path = require('path');

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
          separator: grunt.util.linefeed,
          banner: '',
          footer: '',
          indent: false
        });

        // Process banner and footer.
        var banner  = grunt.template.process(options.banner);
        var footer  = grunt.template.process(options.footer);
        var target  = this.target;

        var array_unique = function(inputArr) 
        {
          var key = '',
            tmp_arr2 = {},
            val = '';

          var __array_search = function (needle, haystack) {
            var fkey = '';
            for (fkey in haystack) {
              if (haystack.hasOwnProperty(fkey)) {
                if ((haystack[fkey] + '') === (needle + '')) {
                  return fkey;
                }
              }
            }
            return false;
          };

          for (key in inputArr) {
            if (inputArr.hasOwnProperty(key)) {
              val = inputArr[key];
              if (false === __array_search(val, tmp_arr2)) {
                tmp_arr2[key] = val;
              }
            }
          }

          return tmp_arr2;
        }

        var importRecursive = function(filepath, prefix)
        {
            var src = grunt.file.read(filepath);
            var regexp = /((?![/*]])[^/* ]|^[ \t]*)@import ['"](.*?)['"](?![^*]*?\*\/)/gm;
            var matches = [];
            
            while (matches = regexp.exec(src)) {
              var fullmatch = matches[0];
              var importpath = matches[2];
              var p = matches[1];
              
              if(importpath.indexOf('/')!==0)
              {
                  importpath = path.resolve(path.dirname(filepath)+'/'+importpath);
              }

              if(grunt.file.exists(importpath))
              {
                  var isrc = importRecursive(importpath, p);
                  src = src.split(fullmatch+';').join(p + isrc);
                  src = src.split(fullmatch).join(p + isrc);
              }
              else
              {
                  grunt.log.warn('@import file "' + importpath + '" not found.');
                  src = src.split(fullmatch+';').join('');
                  src = src.split(fullmatch).join('');
              }
            } 
            if (options.indent && prefix != '') {
              src = src.split(options.separator).join(options.separator + prefix);
            }
            return src;
        };

        // Iterate over all src-dest file pairs.
        this.files.forEach(function(f) {

          // Prepend banner + @import + specified files + footer.
          var src = banner + f.src.filter(function(filepath) {

            // Warn on and remove invalid source files (if nonull was set).
            if (!grunt.file.exists(filepath)) {
              grunt.log.warn('Source file "' + filepath + '" not found.');
              return false;
            } else {
              return true;
            }

          }).map(function(filepath) {

            return importRecursive(filepath, '');

          }).join(options.separator) + footer;

          // Write the destination file.
          grunt.file.write(f.dest, src);
          grunt.event.emit('import', 'imported', f.dest, target);
          
          // Print a success message.
          grunt.log.writeln('File "' + f.dest + '" created.');
        });

        //Run tasks
        if(this.data.tasks){
          grunt.task.run(this.data.tasks);
        }
    });

};
