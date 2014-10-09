/* global angular:true */
"use strict";
define([
	'vtswcalcApp/directives/ContentStep'
	], function(ContentStep) {
	
	var module = angular.module('ContentStep',[]);
	module.directive('contentStep', ['ConfigurationService','GUIStateService',
		function(vtswcalcAppConfiguration,vtswcalcAppGUIState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: false,
				scope: {
					config: '=info'
				},
				templateUrl: '/views/directives/contentStep.html',
				link: function(scope, elem, attrs) {
					scope.$watch(
					function(scope) {
						var curH = vtswcalcAppConfiguration.getConfig().mainContentConfig.stepButtonHeight;
						console.log("contentStep current height: " + curH);
						return curH;
					},
					function(newValue) {
						elem[0].style["height"] = newValue;
					}
					);
	
					elem.bind('mouseover', function() {
						elem.css('cursor', 'pointer');
					});
	
					elem.bind('click', function() {
						vtswcalcAppGUIState.setActiveStep(scope.config.order);
	
						console.log("step " + (scope.config.order) + " clicked!");
					});
				}
			};
		}]);

	return module;
});