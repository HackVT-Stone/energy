/* global angular:true */
"use strict";

(function(angular) {

  var root = location.pathname.replace(new RegExp(/\/[^\/]+$/), '');

  define('angular', function() {
    return angular;
  });

  require({
    async: true,
    tlmSiblingOfDojo: false,
    packages: [
    {
      name: 'energy',
      location: root + 'scripts',
    }/*,
    {
    	name: 'agsjs',
    	location: root + 'scripts/agsjs'	
    }*/
    ]
  });

}(angular));

/* global angular:true */
"use strict";
define.amd.jQuery = true;

require([
	'angular',
	'energy'
	],
	function(angular) {
		
  		angular.bootstrap(document.body, ['energy']);

});