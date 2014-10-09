"use strict";
define([
	'vtswcalcApp/directives/PlanterBoxesRooftop'
	], function(FormIntro) {
		
	var module = angular.module('PlanterBoxesRooftop',[]);
	module.directive('planterBoxesRooftop', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/planterBoxesRooftop.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);

	return module;
});