/* global angular:true */
"use strict";
define.amd.jQuery = true;

require([
	'angular',
	'vtswcalcApp'
	],
	function(angular) {
		
  	angular.bootstrap(document.body, ['vtswcalcApp']);
});