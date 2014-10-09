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
      name: 'vtswcalcApp',
      location: root + 'scripts',
    },
    {
    	name: 'agsjs',
    	location: root + 'scripts/agsjs'	
    }
    ]
  });

}(angular));
