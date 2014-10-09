"use strict";
define([
	'vtswcalcApp/directives/SwalesParking'
	], function(FormIntro) {
		
	var module = angular.module('SwalesParking',[]);
	module.directive('swalesParking', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: false,
				transclude: false,
				scope: false,
				templateUrl: '/views/directives/swalesParking.html',
				link: function(scope, elem, attrs) {
					scope['sliderMax'] = "100";
					scope['sliderOptions'] = {from:0,to:100};
				}
			};
		}]);

	return module;
});