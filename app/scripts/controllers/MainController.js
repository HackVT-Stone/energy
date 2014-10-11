/* global angular:true */
"use strict";
define([
  'energy/controllers/MainController'
	], function (MainController) {

	var module = angular.module('MainController',[]);
	module.controller('MainController', ['$scope','ConfigurationService',
		function($scope,energyAppConfiguration) {
    	
				// Load the configuration from the config service. Then
				// watch the service for changes to the configuration. If
				// there are changes, update the config in scope.
        $scope['config'] = energyAppConfiguration.getConfig();
        $scope.$watch(
            function($scope) {
                var curConfig = energyAppConfiguration.getConfig();
                console.log("config updated at config service...");
                return curConfig;
            },
            function(newValue) {
                $scope['config'] = newValue;
            }
        );
    }
  ]);
 return module;
});