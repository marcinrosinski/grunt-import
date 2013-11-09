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

        var explode  = function(delimiter, string, limit) {

          delimiter += '';
          string += '';

          var s = string.split( delimiter );
          if ( typeof limit === 'undefined' ) return s;

          // Support for limit
          if ( limit === 0 ) limit = 1;

          // Positive limit
          if ( limit > 0 ){
            if ( limit >= s.length ) return s;
            return s.slice( 0, limit - 1 ).concat( [ s.slice( limit - 1 ).join( delimiter ) ] );
          }

          // Negative limit
          if ( -limit >= s.length ) return [];

          s.splice( s.length + limit );
          return s;
        }

        var importRecursive = function(filepath)
        {
            var src = grunt.file.read(filepath);
            var importReg = src.match(/@import ['"](.*)['"]/g);
            
            if(importReg && importReg.length)
            {
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
                        src = explode(importReg[i]+';',src,2).join(isrc);
                        src = explode(importReg[i],src,2).join(isrc);
                    }
                    else
                    {
                        grunt.log.warn('@import file "' + importpath + '" not found.');
                        src = explode(importReg[i]+';',src,2).join('');
                        src = explode(importReg[i],src,2).join('');
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
