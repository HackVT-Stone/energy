/* global angular:true */
"use strict";
define([
  'vtswcalcApp/controllers/MapController'
	], function (MapController) {
		
	var module = angular.module('MapController',[]);
	module.controller('MapController', function($scope){

    // expose a method for handling clicks
    $scope.click = function(e){
      console.log('click handler', e);
      $scope.center = [e.mapPoint.x,e.mapPoint.y];
    };

    // listen for click broadcasts
    $scope.$on('map.click', function(event, e){
      console.log('broadcast', event, e);
    });
  });

	return module;
});