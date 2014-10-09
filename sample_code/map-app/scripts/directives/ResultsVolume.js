"use strict";
define([
	'vtswcalcApp/directives/ResultsVolume'
	], function(FormIntro) {
		
	var module = angular.module('ResultsVolume',[]);
	module.directive('resultsVolume', ['ConfigurationService', 'GUIStateService', 'UserStateService',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState) {
			return {
				restrict: 'AE',
				replace: 'true',
				transclude: true,
				scope: false,
				templateUrl: '/views/directives/resultsVolume.html',
				link: {
					pre: function(scope, elem, attrs) {
						scope['gridOptions'] = {
							data: 'myData',
							columnDefs: [
								{ field: "name", width: 120},
		            { field: "age", width: 120 },
		            { field: "birthday", width: 120 },
		            { field: "salary", width: 120 }
								]
							};
						scope['myData'] = [
							{ name: "Moroni", age: 50, birthday: "Oct 28, 1970", salary: "60,000" },
	            { name: "Tiancum", age: 43, birthday: "Feb 12, 1985", salary: "70,000" },
	            { name: "Jacob", age: 27, birthday: "Aug 23, 1983", salary: "50,000" },
	            { name: "Nephi", age: 29, birthday: "May 31, 2010", salary: "40,000" },
	            { name: "Enos", age: 34, birthday: "Aug 3, 2008", salary: "30,000" },
	            { name: "Moroni", age: 50, birthday: "Oct 28, 1970", salary: "60,000" },
	            { name: "Tiancum", age: 43, birthday: "Feb 12, 1985", salary: "70,000" },
	            { name: "Jacob", age: 27, birthday: "Aug 23, 1983", salary: "40,000" },
	            { name: "Nephi", age: 29, birthday: "May 31, 2010", salary: "50,000" },
	            { name: "Enos", age: 34, birthday: "Aug 3, 2008", salary: "30,000" },
	            { name: "Moroni", age: 50, birthday: "Oct 28, 1970", salary: "60,000" },
	            { name: "Tiancum", age: 43, birthday: "Feb 12, 1985", salary: "70,000" },
	            { name: "Jacob", age: 27, birthday: "Aug 23, 1983", salary: "40,000" },
	            { name: "Nephi", age: 29, birthday: "May 31, 2010", salary: "50,000" },
	            { name: "Enos", age: 34, birthday: "Aug 3, 2008", salary: "30,000" }
						];
					}
				}
			};
		}]);

	return module;
});