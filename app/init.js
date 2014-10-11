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