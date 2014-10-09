"use strict";
define([
	'vtswcalcApp/directives/GreenRooftop'
	], function(FormIntro) {
		
	var module = angular.module('GreenRooftop',[]);
	module.directive('greenRooftop', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: false,
				transclude: false,
				scope: false,
				templateUrl: '/views/directives/greenRooftop.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);

	return module;
});