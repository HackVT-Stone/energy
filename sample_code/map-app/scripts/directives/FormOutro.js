"use strict";
define([
	'vtswcalcApp/directives/FormOutro'
	], function(FormOutro) {
		
	var module = angular.module('FormOutro',[]);
	module.directive('formOutro', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/formOutro.html',
				link: function(scope, elem, attrs) {
				}
			};
		}]);

	return module;
});