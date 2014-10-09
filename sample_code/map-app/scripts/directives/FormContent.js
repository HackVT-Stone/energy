"use strict";
define([
	'vtswcalcApp/directives/FormContent'
	], function(FormContent) {
	
	var module = angular.module('FormContent',[]);
	module.directive('formContent', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/formContent.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);
	
	return module;
});