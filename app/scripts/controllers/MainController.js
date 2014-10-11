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
				$scope['chartObject'] = {};
				$scope.chartObject.type = 'ColumnChart';
				updateChart(0,0);
				
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
            		energyAppConfiguration.doReset();
            		$scope['selectedGraphic'] = {};
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
                updateChart(getProgress(),$scope['selectedTown'].energytotal);
                console.log("towns _is_ updated at config service...");
            }
        );
        
        $scope.$watch(
            function() {
                var t = energyAppConfiguration.getGraphics().length;
                console.log("are g updated at config service...?");
                return t;
            },
            function(newValue, oldValue) {
            	if (newValue == oldValue) {
                return;
              }
              updateChart(0,0);
                updateChart(getProgress(),$scope['selectedTown'].energytotal);
            }
        );
        
        
        function getEnergyProgress(polyArray) {
        			if (polyArray.length == 0) return 0;
                var progress = 0;
                for (var i = 0; i < polyArray.length; i++) {
                    progress += polyArray[i].attributes.energy;
                }
                return progress;
            }
        
        function getProgress() {
        	var ga = energyAppConfiguration.getGraphics().graphics;
        	return getEnergyProgress(ga);
        };
        
        $scope['change'] = function(foo) {
        	energyAppConfiguration.selectTown(foo.name);
        };


       
         
         
         function updateChart(prog,targ) {
         
         
         var gdata ={"cols": [
		        {id: "t", label: "Category", type: "string"},
		        {id: "s", label: "Energy (kWh)", type: "number"}
				    ], "rows": [
				        {c: [
				            {v: "Supply"},
				            {v: prog},
				        ]},
				        {c: [
				            {v: "Demand"},
				            {v: targ}
				        ]},
				    ]};

         $scope.chartObject.options = {
        		'title': 'Annual Energy Budget (kWh)',
        		'titleTextStyle': {'color': 'black',  'fontSize': 14, 'bold': true},
        		'legend': {'position': 'none'},
        		'vAxis': {
        			'textStyle': {'color': 'black', 'fontName': 'Arial', 'fontSize': 12},
        			'minValue': 0, 
        			'maxValue': 1000000},
        		'hAxis': {'textStyle': {'color': 'black', 'fontName': 'Arial', 'fontSize': 12}}
    			};
    			$scope.chartObject.data = gdata;
    			
    		}

         
    }
  ]);
 return module;
});