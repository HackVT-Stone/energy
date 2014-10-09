/* global angular:true */
"use strict";
define([
	'vtswcalcApp/directives/StepFormsWrapper'
	],function(StepFormsWrapper) {
		
	var module = angular.module('StepFormsWrapper',[]);
	module.directive('stepFormsWrapper', ['ConfigurationService','GUIStateService',
	function(vtswcalcAppConfiguration,vtswcalcAppGUIState) {	
		return {
			restrict: 'E',
			replace: 'true',
			transclude: false,
			scope: false,
			templateUrl: '/views/directives/stepFormsWrapper.html',
			link: function(scope, elem, attrs) {
				
				scope['config'] = vtswcalcAppConfiguration.getConfig();
				
				function toggleFormsVisible(isVisible) {
        	if (isVisible) {
        		elem.addClass("noclickthrough");
        		elem.removeClass("clickthrough");
        	}
        	else {
        		elem.addClass("clickthrough");
        		elem.removeClass("noclickthrough");
        	}
        }
				
        scope.$watch(
					function($scope) {
						var formsVis = vtswcalcAppGUIState.getFormsVisible();
						return formsVis;
					},
					function(newValue) {

						toggleFormsVisible(newValue);

					}
				);
			}
		};
	}]);
	
	return module;
});