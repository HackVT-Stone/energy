"use strict";
define([
	'vtswcalcApp/directives/FormIntro'
	], function(FormIntro) {
		
	var module = angular.module('FormIntro',[]);
	module.directive('formIntro', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/formIntro.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);

	return module;
});