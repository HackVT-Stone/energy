/* global angular:true */
"use strict";
define([
  'energy/main',
  'energy/controllers/MainController',
  'energy/controllers/HeaderController',
  'energy/controllers/FooterController',
  'energy/controllers/MapController',
  'energy/services/ConfigurationService',
  'energy/directives/ngMap',
  'energy/directives/ngFeatureLayer'
	], function (main) {

    var energy = angular.module('energy',[
    	'mgcrea.ngStrap',
    	'MainController','HeaderController','FooterController','MapController',
    	'ConfigurationService',
    	'ngMap','ngFeatureLayer',
    	'googlechart'
    	]);

    return energy;
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