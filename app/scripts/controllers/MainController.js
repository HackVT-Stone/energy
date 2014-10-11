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
        $scope['townList'] = [];
        $scope['selectedTown'] = '';


        $scope.$watch(
            function() {
                var curConfig = energyAppConfiguration.getConfig();
                console.log("config updated at config service...");
                return curConfig;
            },
            function(newValue) {
                $scope['config'] = newValue;
            },
            true
        );
        
				$scope.$watch(
            function() {
                var curConfig = energyAppConfiguration.getTowns();
                console.log("is towns updated at config service...?");
                return curConfig;
            },
            function(newValue, oldValue) {
            	if (newValue == oldValue) {
            		return;
            	}
            	else {	
                $scope['townList'] = newValue;
                $scope['selectedTown'] = townList[0];
                console.log("towns _is_ updated at config service...");
              }
            },
            true
        );
        
        $scope['change'] = function(foo) {
        	energyAppConfiguration.selectTown(foo.name);
        };
        
//        $scope.$watch(
//            function() {
//                return $scope['selectedTown'];
//            },
//            function(newValue, oldValue) {
//            	if (newValue == oldValue) {
//            		return;
//            	}
//            	else {	
//                energyAppConfiguration.setSelectedTown(newValue);
//                console.log("towns _is_ updated at config service...");
//              }
//            },
//            true
//        );
         
    }
  ]);
 return module;
});