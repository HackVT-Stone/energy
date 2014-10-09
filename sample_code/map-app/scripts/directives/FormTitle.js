"use strict";
define([
	'vtswcalcApp/directives/FormTitle'
	], function(FormTitle) {
		
	var module = angular.module('FormTitle',[]);
	module.directive('formTitle', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/formTitle.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);

	return module;
});