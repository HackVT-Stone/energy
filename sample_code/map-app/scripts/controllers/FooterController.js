"use strict";
define([
  'vtswcalcApp/controllers/FooterController'
	], function (FooterController) {
	
	var module = angular.module('FooterController',[]);
	module.controller('FooterController', function ($scope) {
		$scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'SitePoint'
			];
    });
    
	return module;
});