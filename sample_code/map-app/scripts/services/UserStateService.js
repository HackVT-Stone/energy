"use strict";
define([
	'vtswcalcApp/services/UserStateService'
	], function(UserStateService) {
	
	var module = angular.module('UserStateService',[]);
	module.factory('UserStateService', [
	function($rootScope) {
		// Empty config to get this party started.
		var currentState = {};
		
		
		// Although directives and controller can watch
		// this service for udpates to state values
		// an update to data in currentState does not trigger
		// a re-rendering of the page with a new $digest loop.
		// So after some of the changes to the data are applied
		// we will call maybeApply() to trigger a new $digest-ion
		// and update the app's display based on the new data.
		// If the app is already in the process of a $digest or $apply,
		// though, this won't trigger yet another.
		function maybeApply() {
			if($rootScope.$root.$$phase != '$apply' && $rootScope.$root.$$phase != '$digest'){
					$rootScope.$apply();
			}
		}
		
		return {
			// Simple getter for config data.
			getState: function() {
				return currentState;
			},
			
			setStateItem: function(key, value) {
				currentState[key] = value;
			},
			
			getStateItem: function(key) {
				if (key in currentState) {
					return currentState[key];
				}
				else {
					return {};
				}
			}
			
		}
	}]);
	
	return module;
});
