"use strict";
define([
	'vtswcalcApp/directives/StepForm'
	], function(StepForm) {
	
	var module = angular.module('StepForm',[]);
	module.directive('stepForm', ['$compile','$sce','ConfigurationService','GUIStateService','UserStateService',
	function($compile,$sce,vtswcalcAppConfiguration,vtswcalcAppGUIState,vtswcalcAppUserState) {	
		return {
			restrict: 'AE',
			replace: 'true',
			transclude: false,
			scope: {
				config: '=info',
				order: '=order'
			},
			templateUrl: '/views/directives/stepForm.html',
			link: function(scope, elem, attrs) {
				scope['content'] = '<div></div>';
				function hideForms() {
					vtswcalcAppGUIState.setFormsVisible(false);
				}
				
				function showForms() {
					vtswcalcAppGUIState.setFormsVisible(true);
				}
				
				function setFormActive() {
					elem.parent().css("display","block");
					console.log("form for step " + scope.order + " enabled");
					scope['content'] = (populateForm(scope.config.config));
					
					$compile(scope.content)(scope, function(cloned, scope){
					   elem.html(cloned);
					});
				}
				
				function setFormInActive() {
					elem.parent().css("display","none");
					console.log("form for step " + scope.order + " disabled");
				}
				
				function toggleForm(formNum) {
					if (scope.order == formNum) {
						setFormActive();
					}
					else {
						setFormInActive();
					}
				};

				scope.$watch(
					function(scope) {
						var tStep = vtswcalcAppGUIState.getActiveStep();
						console.log("activeStep: " + tStep);
						return tStep;
					},
					function(newValue, oldValue) {
						if (newValue == oldValue) {
							hideForms();
						}
						else {
							toggleForm(newValue);
						}
					}
				);
				
				function populateForm(fconfig) {
					console.log('populateForm(' + JSON.stringify(fconfig, null, 2) + ')');
					return vtswcalcAppGUIState.renderFormsToHTML(fconfig);
				}
				
				
				
			}
		};
	}]);
	
	return module;
});