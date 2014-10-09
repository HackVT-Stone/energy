"use strict";
define([
	'vtswcalcApp/directives/Vegetation'
	], function(FormIntro) {
		
	var module = angular.module('Vegetation',[]);
	module.directive('vegetation', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/vegetation.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);

	return module;
});