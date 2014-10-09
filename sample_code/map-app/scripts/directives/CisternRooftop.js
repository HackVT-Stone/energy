"use strict";
define([
	'vtswcalcApp/directives/CisternRooftop'
	], function(FormIntro) {
		
	var module = angular.module('CisternRooftop',[]);
	module.directive('cisternRooftop', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: false,
				transclude: false,
				scope: false,
				templateUrl: '/views/directives/cisternRooftop.html',
				link: function(scope, elem, attrs) {
					scope['sliderMax'] = "100";
					scope['sliderOptions'] = {from:0,to:100};
				}
			};
		}]);

	return module;
});