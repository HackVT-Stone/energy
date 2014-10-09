"use strict";
define([
	'vtswcalcApp/directives/InfiltrationParking'
	], function(FormIntro) {
		
	var module = angular.module('InfiltrationParking',[]);
	module.directive('infiltrationParking', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/infiltrationParking.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);

	return module;
});