'use strict';

var grunt = require('grunt');
var comment = require('../tasks/lib/comment').init(grunt);

function getNormalizedFile(filepath) {
  return grunt.util.normalizelf(grunt.file.read(filepath));
}

exports.import = {
  default_options: function(test) {
    test.expect(1);

    var actual = getNormalizedFile('tmp/default_options');
    var expected = getNormalizedFile('test/expected/default_options');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    var actual = getNormalizedFile('tmp/custom_options');
    var expected = getNormalizedFile('test/expected/custom_options');
    test.equal(actual, expected, 'should utilize custom banner, footer and separator.');

    test.done();
  },
  custom_indent_options: function(test) {
    test.expect(1);
  
    var actual = getNormalizedFile('tmp/custom_indent_options');
    var expected = getNormalizedFile('test/expected/custom_indent_options');
    test.equal(actual, expected, 'should indent imported content.');

    test.done();
  }
};