/* global angular:true */
"use strict";
define([
  'vtswcalcApp/main',
  'vtswcalcApp/controllers/MainController',
  'vtswcalcApp/controllers/HeaderController',
  'vtswcalcApp/controllers/FooterController',
  'vtswcalcApp/controllers/MapController',
  'vtswcalcApp/services/ConfigurationService',
  'vtswcalcApp/services/GUIStateService',
  'vtswcalcApp/services/UserStateService',
  'vtswcalcApp/directives/FormTitle',
  'vtswcalcApp/directives/FormBanner',
  'vtswcalcApp/directives/FormIntro',
  'vtswcalcApp/directives/FormContent',
  'vtswcalcApp/directives/FormOutro',
  'vtswcalcApp/directives/StepFormsWrapper',
  'vtswcalcApp/directives/StepForms',
  'vtswcalcApp/directives/StepForm',
  'vtswcalcApp/directives/ContentStep',
  'vtswcalcApp/directives/ngMap',
  'vtswcalcApp/directives/ngFeatureLayer',
  'vtswcalcApp/directives/GetAddressButton',
  'vtswcalcApp/directives/GreenRooftop', // Below here are Step 7 Green Infrastructure Items
  'vtswcalcApp/directives/PlanterBoxesRooftop',
  'vtswcalcApp/directives/BioretentionRooftop',
  'vtswcalcApp/directives/InfiltrationRooftop',
  'vtswcalcApp/directives/CisternRooftop',
  'vtswcalcApp/directives/Vegetation',
  'vtswcalcApp/directives/AmendedSoil',
	'vtswcalcApp/directives/Trees',
	'vtswcalcApp/directives/SwalesParking',
	'vtswcalcApp/directives/FilterStripsParking',
	'vtswcalcApp/directives/InfiltrationParking',
	'vtswcalcApp/directives/PermeablePavementParking',
	'vtswcalcApp/directives/PermeablePavementDriveway',
	'vtswcalcApp/directives/FilterStripsDriveway',
	'vtswcalcApp/directives/PermeablePavementSidewalk',
	'vtswcalcApp/directives/StreetWidth',
	'vtswcalcApp/directives/SwalesRoadside',
	'vtswcalcApp/directives/ResultsVolume',
	'vtswcalcApp/directives/ResultsRunoff',
	'vtswcalcApp/directives/ResultsLandUse',
	'vtswcalcApp/directives/ResultsCosts'
	], function (main) {

    var vtswcalcApp = angular.module('vtswcalcApp',[
    	'mgcrea.ngStrap','ngGrid','ngSlider',
    	'MainController','HeaderController','FooterController','MapController',
    	'ConfigurationService','GUIStateService','UserStateService',
    	'FormTitle','FormBanner','FormIntro','FormContent','FormOutro',
    	'StepFormsWrapper','StepForms','StepForm','ContentStep',
    	'ngMap','ngFeatureLayer',
    	'GetAddressButton',
    	'GreenRooftop','PlanterBoxesRooftop','BioretentionRooftop','InfiltrationRooftop','CisternRooftop', 
    	'Vegetation','AmendedSoil','Trees', 
    	'SwalesParking','FilterStripsParking','InfiltrationParking','PermeablePavementParking','PermeablePavementDriveway',
    	'FilterStripsDriveway','PermeablePavementSidewalk','StreetWidth','SwalesRoadside',
    	'ResultsVolume','ResultsRunoff','ResultsLandUse','ResultsCosts'
    	]);

    return vtswcalcApp;
});


//    vtswcalcApp.config(function($provide){
//    $provide.decorator("$interpolate", function($delegate){
//
//        var interpolateWrap = function(){
//            var interpolationFn = $delegate.apply(this, arguments);
//            if(interpolationFn) {
//                return interpolationFnWrap(interpolationFn, arguments);
//            }
//        };
//
//        var interpolationFnWrap = function(interpolationFn, interpolationArgs){
//            return function(){
//                var result = interpolationFn.apply(this, arguments);
//                var log = result ? console.log : console.warn;
//                log.call(console, "interpolation of  " + interpolationArgs[0].trim(),
//                                  ":", result.trim());
//                return result;
//            };
//        };
//
//        angular.extend(interpolateWrap, $delegate);
//        return interpolateWrap;
//
//    });
//    });