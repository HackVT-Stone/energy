"use strict";
define([
	'vtswcalcApp/directives/InfiltrationRooftop'
	], function(FormIntro) {
		
	var module = angular.module('InfiltrationRooftop',[]);
	module.directive('infiltrationRooftop', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/infiltrationRooftop.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);

	return module;
});