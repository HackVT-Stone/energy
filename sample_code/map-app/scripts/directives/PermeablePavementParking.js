"use strict";
define([
	'vtswcalcApp/directives/PermeablePavementParking'
	], function(FormIntro) {
		
	var module = angular.module('PermeablePavementParking',[]);
	module.directive('permeablePavementParking', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/permeablePavementParking.html',
				link: function(scope, elem, attrs) {
					scope['sliderMax'] = "100";
					scope['sliderOptions'] = {from:0,to:100};
				}
			};
		}]);

	return module;
});