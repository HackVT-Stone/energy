"use strict";
define([
	'vtswcalcApp/directives/PermeablePavementDriveway'
	], function(FormIntro) {
		
	var module = angular.module('PermeablePavementDriveway',[]);
	module.directive('permeablePavementDriveway', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/permeablePavementDriveway.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);

	return module;
});