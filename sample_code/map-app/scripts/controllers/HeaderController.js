"use strict";
define([
  'vtswcalcApp/controllers/HeaderController'
	], function (HeaderController) {
	
	var module = angular.module('HeaderController',[]);
	module.controller('HeaderController', function ($scope) {
    $scope.headerConfig = {
			'appTitle' : 'Vermont Stormwater Calculator',
			'appSubTitle' : 'Helping Estimate The Many Values of Green Infrastructure!'
			}
  });
  
  return module;
});