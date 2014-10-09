"use strict";
define([
	'vtswcalcApp/directives/Trees'
	], function(FormIntro) {
		
	var module = angular.module('Trees',[]);
	module.directive('trees', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/trees.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);

	return module;
});