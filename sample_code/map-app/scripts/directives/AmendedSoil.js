"use strict";
define([
	'vtswcalcApp/directives/AmendedSoil'
	], function(FormIntro) {
		
	var module = angular.module('AmendedSoil',[]);
	module.directive('amendedSoil', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/amendedSoil.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);

	return module;
});