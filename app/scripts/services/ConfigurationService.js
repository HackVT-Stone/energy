/* global angular:true */
"use strict";
define([
	'energy/services/ConfigurationService',
	
	], function(ConfigurationService) {

	var module = angular.module('ConfigurationService',[]);
	module.factory('ConfigurationService',
		function($rootScope, $http) {
			// Empty config to get this party started.
			var currentState = {};
			var contentConfig = {};
			var currentGraphics = [];
			currentState['mainMap'] = {};
			var townDict = {};
			var selectedTown = '';
			var selectedGraphic = {};
			
			function townInit() {
				Tabletop.init( { key: '14QIE2sG7tzOvktoYGBVT2P_BSCGwWc9Au8LaxKuzH9w',
				callback: townPostProcess,
				simpleSheet: true } );
			}

			function townPostProcess(data) {
				for (var i = 0; i < data.length; i++){
				
				var townname = data[i].townname;
				delete data[i].townname;
				
				var townExtent = eval("(" + data[i].extent + ")");
				delete data[i].extent;
				
				townDict[townname] = data[i];
				townDict[townname].townExtent = townExtent;
				townDict[townname].name = townname;
				
				}
				console.log(townDict);
				maybeApply();
			}
			
			
			// Store config as JSON in external location.
			// Load it here with $http service.
			$http.get("/scripts/services/config.json")
			.then(function(response) {
				contentConfig = response.data;
				maybeApply();
			});
			
			// Although directives and controller can watch
			// this service for udpates to configuration values
			// an update to data in contentConfig does not trigger
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
			
			townInit();
			return {
				// Simple getter for config data.
				getConfig: function() {
					return contentConfig;
				},
				// The map monitors itself for size change events (resize)
				// and if it detects that it has resized, it calls the config
				// service to let the config service know what its' new size
				// is. This immediatley updates the heigh value for the main
				// side-menu buttons... there are x buttons that need to fill
				// the space beside the map, so they should always be a height
				// of (mapHeight / numberOfButtons).
				setMapDimensions: function(mExtent, mHeight, mWidth) {
					contentConfig.mainContentConfig.mapExtent = mExtent;
					contentConfig.mainContentConfig.mapWidth = mWidth;
					contentConfig.mainContentConfig.mapHeight = mHeight;
					contentConfig.mainContentConfig.stepButtonHeight = mHeight / 8 + "px";
					console.log("Map Size Changed: {'mapHeight':'" + mHeight + "', \n'mapWidth':'" + mWidth + "',\n'mapExtent':'" + mExtent + "'}");
					maybeApply();
				},
					
				getMap: function() {
					return currentState.mainMap;
				},
				setMap: function(tmap) {
					currentState['mainMap'] = tmap;
					console.log('map saved to current state');
				},
	
				getTowns : function() {
						return townDict;
				},
	
				selectGraphic: function(g) {
					selectedGraphic = g;
					maybeApply();
				},
				
				getSelectedGraphic: function(g) {
					return selectedGraphic;	
				},
	
				selectTown: function(town) {
					selectedTown = town;
				},
	
				deleteSelectedGraphic: function() {
						currentState.mainMap.removeGraphic(selectedGraphic);
						
						maybeApply();
				},
	
			getSelectedTown: function() {
					return selectedTown;	
			
			},
			
			clearSetGraphic: function() {
				selectedGraphic = null;	
			},
			
				getGraphics: function() {
					maybeApply();
					return currentGraphics;
				},
				
				setGraphics: function(glayer) {
					currentGraphics = glayer;
				},
				
				getLastGraphic: function() {
					return currentGraphics.graphics.pop();
				},
				
				addGraphic: function(inputGraphic) {
					currentGraphics.push(inputGraphic);
					maybeApply();
				},
	
				setMode_getAddress: function() {
					console.log("setMode_getAddress() called");
					currentState.mainMap.setClick('revgeo');
					this.setFormsVisible(false);
				},
				
				setMode_centerMap: function() {
					console.log("setMode_centerMap() called");
					currentState.mainMap.setClick('center');
				}
				
			}
		});
	return module;
});
