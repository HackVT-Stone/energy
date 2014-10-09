"use strict";
define([
	'vtswcalcApp/directives/FilterStripsDriveway'
	], function(FormIntro) {
		
	var module = angular.module('FilterStripsDriveway',[]);
	module.directive('filterStripsDriveway', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/filterStripsDriveway.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);

	return module;
});