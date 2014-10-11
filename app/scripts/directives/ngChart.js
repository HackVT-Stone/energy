"use strict";
define([

	], function () {
	
	var module = angular.module('ngFeatureLayer',[]);
	module.directive('chart', function() {
    
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=data'
        },
        template: '<div class="chart"></div>',
        link: function(scope, element, attrs) {
            
            var chart = new google.visualization.LineChart(element[0]);
            var options = {};
            
            scope.$watch('data', function(v) {
                
                var data = google.visualization.arrayToDataTable(v);
                chart.draw(data, options);
                
            });
            
        }
    };
    
});
  
  return module;
});