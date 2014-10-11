/* global angular:true */
"use strict";
define([
  'energy/controllers/MainController'
	], function (MainController) {

	var module = angular.module('MainController',[]);
	module.controller('MainController', ['$scope','ConfigurationService',
		function($scope,energyAppConfiguration) {
    	
				// Load the configuration from the config service. Then
				// watch the service for changes to the configuration. If
				// there are changes, update the config in scope.
        $scope['config'] = energyAppConfiguration.getConfig();
        $scope['townList'] = [];
        $scope['town'] = '';
				$scope['selectedTown'] = energyAppConfiguration.getTowns()[energyAppConfiguration.getSelectedTown()];
				$scope['graphic'] = energyAppConfiguration.getSelectedGraphic();
				
				$scope['deleteGraphic'] = function() {
					energyAppConfiguration.deleteSelectedGraphic();
				}

        $scope.$watch(
            function() {
                var curConfig = energyAppConfiguration.getConfig();
                console.log("config updated at config service...");
                return curConfig;
            },
            function(newValue) {
                $scope['config'] = newValue;
            },
            true
        );
        
				$scope.$watch(
            function() {
                var curConfig = energyAppConfiguration.getTowns();
                console.log("is towns updated at config service...?");
                return curConfig;
            },
            function(newValue, oldValue) {
            	if (newValue == oldValue) {
            		return;
            	}
            	else {	
                $scope['townList'] = newValue;
                $scope['town'] = townList[0];
                console.log("towns _is_ updated at config service...");
              }
            },
            true
        );
        
        $scope.$watch(
            function() {
                var t = energyAppConfiguration.getSelectedTown();
                console.log("is selected t updated at config service...?");
                return t;
            },
            function(newValue, oldValue) {
            	if (newValue == oldValue) {
            		return;
            	}
            	else {	
                $scope['town'] = newValue;
                $scope['selectedTown'] = energyAppConfiguration.getTowns()[$scope['town']];
                console.log("towns _is_ updated at config service...");
              }
            },
            true
        );
        
        $scope.$watch(
            function() {
                var t = energyAppConfiguration.getSelectedGraphic();
                console.log("is selected g updated at config service...?");
                return t;
            },
            function(newValue, oldValue) {
            	if (newValue == oldValue) {
                return;
              }
                $scope['selectedGraphic'] = newValue;
                console.log("towns _is_ updated at config service...");
            }
        );
        
        
        $scope['change'] = function(foo) {
        	energyAppConfiguration.selectTown(foo.name);
        };
        
//        $scope.$watch(
//            function() {
//                return $scope['selectedTown'];
//            },
//            function(newValue, oldValue) {
//            	if (newValue == oldValue) {
//            		return;
//            	}
//            	else {	
//                energyAppConfiguration.setSelectedTown(newValue);
//                console.log("towns _is_ updated at config service...");
//              }
//            },
//            true
//        );
         
         
         
         
         
         $scope['loadChart'] = function() {
					google.load("visualization", "1", {packages:["corechart"]});
//					google.setOnLoadCallback(function() {drawChart(5100000,5000000);});
					
					function drawChart(prog, targ) {
//					if (prog >= targ) {progColor = 'color: green';}
//					else {progColor = 'color: red';}
//					var data = google.visualization.arrayToDataTable([
//					['Category', 'Energy (kWh)',{role: 'style'}],
//					['Supply',  prog, progColor],
//					['Demand',  targ, 'color: blue'],
//					]);
//					labelFont = 'Arial';
//					var options = {
//					title: 'Annual Energy Budget (kWh)',
//					titleTextStyle: {color: 'black', fontName: labelFont, fontSize: 28, bold: true},
//					legend: {position: 'none'},
//					vAxis: {textStyle: {color: 'black', fontName: 'Arial', fontSize: 24}, minValue: 0, maxValue: 1000000},
//					hAxis: {textStyle: {color: 'black', fontName: 'Arial', fontSize: 24}}
					};
					
					//var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
					
					//chart.draw(data, options);

					}	
        }
        
        $scope.loadChart();
         
    }
  ]);
 return module;
});