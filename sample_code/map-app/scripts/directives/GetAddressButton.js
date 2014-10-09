"use strict";
define([
	'vtswcalcApp/directives/GetAddressButton'
	], function(GetAddressButton) {
		
	var module = angular.module('GetAddressButton',[]);
	module.directive('getAddressButton', ['ConfigurationService','GUIStateService',
	function(vtswcalcAppConfiguration,vtswcalcAppGUIState) {	
		return {
			restrict: 'E',
			replace: 'true',
			transclude: false,
			scope: false,
			templateUrl: '/views/gui/getAddressButton.html',
			link: function(scope, elem, attrs) {
				scope['setMode_getAddress'] = function() {
					vtswcalcAppGUIState.setMode_getAddress();
				}
			}
		};
	}]);

	return module;	
});