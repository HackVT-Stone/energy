"use strict";
define([
	'vtswcalcApp/directives/SwalesRoadside'
	], function(FormIntro) {
		
	var module = angular.module('SwalesRoadside',[]);
	module.directive('swalesRoadside', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/swalesRoadside.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);

	return module;
});