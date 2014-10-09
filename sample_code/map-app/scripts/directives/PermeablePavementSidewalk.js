"use strict";
define([
	'vtswcalcApp/directives/PermeablePavementSidewalk'
	], function(FormIntro) {
		
	var module = angular.module('PermeablePavementSidewalk',[]);
	module.directive('permeablePavementSidewalk', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/permeablePavementSidewalk.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);

	return module;
});