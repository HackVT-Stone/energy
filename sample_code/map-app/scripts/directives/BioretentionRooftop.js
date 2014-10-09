"use strict";
define([
	'vtswcalcApp/directives/BioretentionRooftop'
	], function(FormIntro) {
		
	var module = angular.module('BioretentionRooftop',[]);
	module.directive('bioretentionRooftop', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: false,
				transclude: false,
				scope: false,
				templateUrl: '/views/directives/bioretentionRooftop.html',
				link:{pre: function(scope, elem, attrs) {
					scope['sliderMax'] = "100";
					scope['sliderOptions'] = {from:0,to:100};
					scope['addNewPanel'] = function() {
						alert("In the future this will allow adding more than one rain garden or bioretention item to the site - in case you want to plan out your site with multiple rain gardens and want to keep track of their runoff reductions individually.");
					};
			}}
			};
		}]);

	return module;
});