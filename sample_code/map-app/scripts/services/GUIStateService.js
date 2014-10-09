/* global angular:true */
"use strict";
define([
	'vtswcalcApp/services/GUIStateService'
	], function(GUIStateService) {

	var module = angular.module('GUIStateService',[]);
	module.factory('GUIStateService', ['$rootScope','$sce',
	function($rootScope,$sce) {
		// Empty config to get this party started.
		var currentState = {};
		currentState['activeStep'] = -1;
		currentState['formsVisible'] = true;
		currentState['mainMap'] = {};
		
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
			// This will be called when a main step button is clicked
			// to switch which step the user is viewing.
			setActiveStep: function(activeStep) {
				var oldActiveStep = currentState['activeStep'];
				if (oldActiveStep == activeStep) {
					// hide forms
					currentState['formsVisible'] = !currentState['formsVisible'];
					currentState['activeStep'] = activeStep;
					console.log("activeStep Changed: " + oldActiveStep + " ==> " + activeStep);
					maybeApply();
					return;
				}
				currentState['activeStep'] = activeStep;
				console.log("activeStep Changed: " + oldActiveStep + " ==> " + activeStep);
				maybeApply();
			},
			getActiveStep: function() {
				console.log("activeStep queried: " + currentState['activeStep']);
				return currentState['activeStep'];
			},
			
			getMap: function() {
				return currentState.mainMap;
			},
			setMap: function(tmap) {
				currentState['mainMap'] = tmap;
				console.log('map saved to current state');
			},
			
			buildBmGallery: function() {
     		var tmap = this.getMap();
     		tmap.startBmToggle();
     	},
		
			setFormsVisible: function(isVisible) {
				var oldFormsVisible = currentState['formsVisible'];
				currentState['formsVisible'] = isVisible;
				console.log("formsVisible Changed: " + oldFormsVisible + " ==> " + isVisible);
				maybeApply();
			},
			getFormsVisible: function() {
				console.log("formsVisible queried: " + currentState['formsVisible']);
				return currentState['formsVisible'];
			},
			
			setMode_getAddress: function() {
				console.log("setMode_getAddress() called");
				currentState.mainMap.setClick('revgeo');
				this.setFormsVisible(false);
			},
			
			setMode_centerMap: function() {
				console.log("setMode_centerMap() called");
				currentState.mainMap.setClick('center');
			},
			  //////////////////////////
			 // -- Form Rendering -- //
			//////////////////////////
			renderTextBox: function(formField) {
				console.log('renderTextBox(' + JSON.stringify(formField, null, 2) + ')');
				var outHTML = "";
				
				outHTML += '<div class="textbox_wrapper">';
					outHTML += '<div class="textbox_name">' + formField.name + '</div>';
					outHTML += '<div class="textbox_field">';
						if (formField.readonly) {
							outHTML += '<span class="textbox_value_ro">' + formField.databaseSource + '</span>';
						}
						else {
							outHTML += '<input type="text" value="'+ formField.default +'"></input>';
						}
					outHTML += '</div>';
				outHTML += '</div>';

				return outHTML;
			},
			
			renderCalcGroupValue: function(formField) {
				console.log('renderTextBox(' + JSON.stringify(formField, null, 2) + ')');
				var outHTML = "";
				
				outHTML += '<div class="textbox_wrapper">';
					outHTML += '<div class="textbox_name">' + formField.name + '</div>';
					outHTML += '<div class="textbox_field">';
						if (formField.readonly) {
							outHTML += '<span class="textbox_value_ro">' + formField.databaseSource + '</span>';
						}
						else {
							outHTML += '<input type="text" value="'+ formField.default +'"></input>';
						}
					outHTML += '</div>';
				outHTML += '</div>';

				return outHTML;
			},
			
			renderGetAddress: function(formField) {
				console.log('renderGetAddress(' + JSON.stringify(formField, null, 2) + ')');
				var outHTML = "";
				
				outHTML += '<div class="getAddress_wrapper">';
					outHTML += '<div class="getAddress_name">' + formField.name + '</div>';
					outHTML += '<div class="getAddress_field">';
						if (formField.readonly) {
							outHTML += '<span class="getAddress_value_ro">' + formField.databaseSource + '</span>';
						}
						else {
							outHTML += '<input type="text" value="'+ formField.default +'"></input>';
						}
						outHTML += '<get-address-button></get-address-button>';
					outHTML += '</div>';
				outHTML += '</div>';

				return outHTML;
			},
			
			renderDropDown: function(formField) {
				console.log('renderTextBox(' + JSON.stringify(formField, null, 2) + ')');
				var outHTML = "";
				
				outHTML += '<div class="dropdown_wrapper">';
					outHTML += '<div class="dropdown_name">' + formField.name + '</div>';
					outHTML += '<div class="dropdown_field">';
						if (formField.readonly) {
							outHTML += '<span class="dropdown_value_ro">' + formField.databaseSource + '</span>';
						}
						else {
							outHTML += '<select>';
							for (var optidx in formField.dropdownValues) {
									var opt = formField.dropdownValues[optidx];
									if (opt.key == formField.default) {
										outHTML += '<option selected value="' + opt.key + '">' + opt.value + '</option>';
									}
									else {
										outHTML += '<option value="' + opt.key + '">' + opt.value + '</option>';
									}
							}
							
							outHTML += '</select>';
						}
					outHTML += '</div>';
				outHTML += '</div>';

				return outHTML;
			},
			
			renderDirective: function(formField) {
				console.log('renderTextBox(' + JSON.stringify(formField, null, 2) + ')');
				var outHTML = '';
				outHTML += '<' + formField.value + '></' + formField.value + '>';
				return outHTML;
			},
			
			renderFormFieldsToHTML: function(formFields) {
				console.log('renderFormFieldsToHTML(' + JSON.stringify(formFields, null, 2) + ')');
				var outHTML = "";
				var doDirectives = false;
				for (var fieldidx in formFields) {
					var formField = formFields[fieldidx];
					switch (formField.type) {
						case "textbox":
							outHTML += this.renderTextBox(formField);
							break;
						case "calcgroupvalue":
							outHTML += this.renderCalcGroupValue(formField);
							break;
						case "dropdown":
							outHTML += this.renderDropDown(formField);
							break;
						case "getaddress":
							outHTML += this.renderGetAddress(formField);
							break;
						case "directive":
							doDirectives = true;
							
							break;
						default:
							break;
					}
				}
				if (doDirectives) {
					outHTML += "<div class='panel-group' bs-collapse>";
					for (var fieldidx in formFields) {
						var formField = formFields[fieldidx];
						if (formField.type == 'directive') {
							outHTML += "<div class='panel'><div class='heading' bs-collapse-toggle>" + formField.name + "</div>";
							outHTML += "<div class='collapsible' bs-collapse-target>" + this.renderDirective(formField) + "</div></div>";
						}
					}
					outHTML += "</div>";
				}
				return outHTML;
			},
			
			renderFormToHTML: function(formConfig) {
				console.log('\trenderFormToHTML(' + JSON.stringify(formConfig, null, 2) + ')');
				var outHTML = '';

				if ((formConfig.title !== '') && (formConfig.title !== null)) {
					//outHTML += '<div class="formTitle">' + formConfig.title + '</div>';
				}
				if ((formConfig.intro !== '') && (formConfig.intro !== null)) {
					outHTML += '<div class="formIntro">' + formConfig.intro + '</div>';
				}
				if ((formConfig.bannerImage !== '') && (formConfig.bannerImage !== null)) {
					outHTML += '<img class="formBanner" src="' + formConfig.bannerImage + '"></img>';
				}
				if ((formConfig.content !== '') && (formConfig.content !== null)) {
					outHTML += '<div class="formContent">' + formConfig.content + '</div>';
				}
				if ((formConfig.outro !== '') && (formConfig.outro !== null)) {
					outHTML += '<div class="formOutro">' + formConfig.outro + '</div>';
				}
				if ((formConfig.fields !== '') && 
						(formConfig.fields !== null)) {
					if (formConfig.fields.length > 0) {
						outHTML += '<div class="formFields">';
						outHTML += this.renderFormFieldsToHTML(formConfig.fields);
						outHTML += '</div>';
					}
				}
				return outHTML;
			},
			
			renderFormsToHTML: function(formConfigs) {
				console.log('renderFormsToHTML(' + JSON.stringify(formConfigs, null, 2) + ')');
				var outHTML = '<div bs-tabs>';
				for (var tForm in formConfigs) {
					outHTML += '<div class="' + formConfigs[tForm].formClass + '" title="' + formConfigs[tForm].title + '" bs-pane>';
					outHTML += this.renderFormToHTML(formConfigs[tForm]);
					outHTML += '</div>';
				}
				outHTML += '</div>';
				return outHTML;
			}		
		}
	}]);
	return module;
});
