"use strict";
define([
	'vtswcalcApp/directives/FormBanner'
	], function(FormBanner) {
			
	var module = angular.module('FormBanner',[]);
	module.directive('formBanner', ['ConfigurationService', 'GUIStateService', 'UserStateService',
	function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
		return {
			restrict: 'E',
			replace: 'true',
			transclude: false,
			scope: {
				imgURL: '=info'
			},
			templateUrl: '/views/directives/formBanner.html',
			link: function(scope, elem, attrs) {
				console.log('"link" function inside directive vk called, "elem" param is: ', elem)
			}
		};
	}]);

	return module;
});