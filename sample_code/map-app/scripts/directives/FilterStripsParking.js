"use strict";
define([
	'vtswcalcApp/directives/FilterStripsParking'
	], function(FormIntro) {
		
	var module = angular.module('FilterStripsParking',[]);
	module.directive('filterStripsParking', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/filterStripsParking.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);

	return module;
});