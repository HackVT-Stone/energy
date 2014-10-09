/* global angular:true */
"use strict";
define([
  'vtswcalcApp/controllers/MainController'
	], function (MainController) {

	var module = angular.module('MainController',[]);
	module.controller('MainController', ['$scope','ConfigurationService','GUIStateService',
		function($scope,vtswcalcAppConfiguration,vtswcalcAppGUIState) {
    	
				// Load the configuration from the config service. Then
				// watch the service for changes to the configuration. If
				// there are changes, update the config in scope.
        $scope['config'] = vtswcalcAppConfiguration.getConfig();
        $scope.$watch(
            function($scope) {
                var curConfig = vtswcalcAppConfiguration.getConfig();
                console.log("config updated at config service...");
                return curConfig;
            },
            function(newValue) {
                $scope['config'] = newValue;
            }
        );
        
        // Load the configuration from the config service. Then
				// watch the service for changes to the configuration. If
				// there are changes, update the config in scope.
        $scope['state'] = vtswcalcAppGUIState.getState();
        $scope.$watch(
            function($scope) {
                var curState = vtswcalcAppGUIState.getState();
                console.log("GUI state updated at GUI state service...");
                return curState;
            },
            function(newValue) {
                $scope['state'] = newValue;
            }
        );
        
       	
        
        $scope['stepId'] = 0;
        
        $scope['nextStepId'] = function() { $scope.stepId = $scope.stepId + 1; return $scope.stepId };
    }
  ]);
 return module;
});