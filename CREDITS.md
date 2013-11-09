Credits
=======
####Core
Grunt Team - https://github.com/gruntjs/grunt/graphs/contributors

####Functions

* **`array_unique(inputArr)`**
 * original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
 * +      input by: duncan
 * +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
 * +   bugfixed by: Nate
 * +      input by: Brett Zamir (http://brett-zamir.me)
 * +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
 * +   improved by: Michael Grier
 * +   bugfixed by: Brett Zamir (http://brett-zamir.me)
 * %          note 1: The second argument, sort_flags is not implemented;
 * %          note 1: also should be sorted (asort?) first according to docs
 * *     example 1: array_unique(['Kevin','Kevin','van','Zonneveld','Kevin']);
 * *     returns 1: {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
 * *     example 2: array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'});
 * *     returns 2: {a: 'green', 0: 'red', 1: 'blue'}
