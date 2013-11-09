/*
 * grunt-import
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Marcin Rosinski, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('import', '@import - inline file import.', function() {

        var path = require('path');

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
          separator: grunt.util.linefeed,
          banner: '',
          footer: ''
        });

        // Process banner and footer.
        var banner  = grunt.template.process(options.banner);
        var footer  = grunt.template.process(options.footer);
        var target  = this.target;

        var array_unique = function(inputArr) 
        {
          // http://kevin.vanzonneveld.net
          // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
          // +      input by: duncan
          // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
          // +   bugfixed by: Nate
          // +      input by: Brett Zamir (http://brett-zamir.me)
          // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
          // +   improved by: Michael Grier
          // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
          // %          note 1: The second argument, sort_flags is not implemented;
          // %          note 1: also should be sorted (asort?) first according to docs
          // *     example 1: array_unique(['Kevin','Kevin','van','Zonneveld','Kevin']);
          // *     returns 1: {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
          // *     example 2: array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'});
          // *     returns 2: {a: 'green', 0: 'red', 1: 'blue'}
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

        var importRecursive = function(filepath)
        {
            var src = grunt.file.read(filepath);
            var importReg = src.match(/@import ['"](.*)['"]/g);

            if(importReg && importReg.length)
            {
                importReg = array_unique(importReg);

                for(var i in importReg)
                {
                    var importpath = importReg[i].replace('@import ','').replace(/"/g,'').replace(/'/g,'');

                    if(importpath.indexOf('/')!==0)
                    {
                        importpath = path.resolve(path.dirname(filepath)+'/'+importpath);
                    }

                    if(grunt.file.exists(importpath))
                    {
                        var isrc = importRecursive(importpath);
                        src = src.split(importReg[i]+';').join(isrc);
                        src = src.split(importReg[i]).join(isrc);
                    }
                    else
                    {
                        grunt.log.warn('@import file "' + importpath + '" not found.');
                        src = src.split(importReg[i]+';').join('');
                        src = src.split(importReg[i]).join('');
                    }
                }
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

            return importRecursive(filepath);

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
