"use strict";
define([
	'vtswcalcApp/directives/StreetWidth'
	], function(FormIntro) {
		
	var module = angular.module('StreetWidth',[]);
	module.directive('streetWidth', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/streetWidth.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);

	return module;
});