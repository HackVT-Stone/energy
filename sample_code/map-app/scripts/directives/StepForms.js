"use strict";
define([
	'vtswcalcApp/directives/StepForms'
	],function(StepForms) {
		
	var module = angular.module('StepForms',[]);
	module.directive('stepForms', ['ConfigurationService','GUIStateService',
	function(vtswcalcAppConfiguration,vtswcalcAppGUIState) {	
		return {
			restrict: 'E',
			replace: 'true',
			transclude: false,
			scope: false,
			templateUrl: '/views/directives/stepForms.html',
			link: function(scope, elem, attrs) {
				
				scope['config'] = vtswcalcAppConfiguration.getConfig();
				
				function toggleFormsVisible(isVisible) {
        	if (isVisible) {
        		elem.addClass("formsVisible");
        		elem.removeClass("formsNotVisible");
        	}
        	else {
        		elem.addClass("formsNotVisible");
        		elem.removeClass("formsVisible");
        	}
        }
        
        scope.$watch(
					function($scope) {
						var formsVis = vtswcalcAppGUIState.getFormsVisible();
						console.log("forms visible: " + formsVis);
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