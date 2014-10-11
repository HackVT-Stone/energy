"use strict";
define([
  'energy/controllers/HeaderController'
	], function (HeaderController) {
	
	var module = angular.module('HeaderController',[]);
	module.controller('HeaderController', function ($scope) {
    $scope.headerConfig = {
			'appTitle' : 'Energy',
			'appSubTitle' : 'Got energy'
			}
  });
  
  return module;
});