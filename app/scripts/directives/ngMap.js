/* global angular:true */
"use strict";
define([
		'energy/directives/ngMap', // These defines MUST match 
		'dojo/_base/connect',						// the order of the function params below!!!
		'dojo/dom',
		'dojo/parser',
		'dojo/on',
		'dojo/_base/Color',
		'dijit/layout/BorderContainer',
		'dijit/layout/ContentPane',
		'dojo/fx',
		'esri/geometry/Point',
		'esri/dijit/Scalebar',
		'esri/dijit/OverviewMap',
		'esri/dijit/Geocoder',
		'esri/dijit/BasemapGallery',
		'esri/tasks/locator',
		'esri/graphic',
		'esri/geometry/webMercatorUtils',
		'esri/symbols/SimpleMarkerSymbol',
		'esri/symbols/SimpleLineSymbol',
		'esri/InfoTemplate',
		'esri/Color',
    'esri/layers/ImageParameters',
		'esri/map',
		'esri/geometry/Extent',
		'esri/layers/FeatureLayer',
		'esri/layers/ArcGISTiledMapServiceLayer',
		'esri/layers/ArcGISDynamicMapServiceLayer',
		'esri/symbols/SimpleFillSymbol',
		'esri/renderers/ClassBreaksRenderer',
		'esri/arcgis/utils', 
		'esri/toolbars/draw',
		'esri/symbols/PictureFillSymbol',
		'esri/symbols/CartographicLineSymbol', 
		'esri/geometry/Polyline', 
		'esri/geometry/Polygon',
		'esri/tasks/GeometryService',
		'esri/SpatialReference',
		'dijit/TitlePane',
		'esri/tasks/AreasAndLengthsParameters',
		'esri/layers/GraphicsLayer'
	], function(
		ngMap,
		connect,
		dom,
		parser,
		on,
		Color,
		BorderContainer,
		ContentPane,
		fx,
		Point,
		Scalebar,
		OverviewMap,
		Geocoder,
		BasemapGallery,
		Locator,
		Graphic,
		webMercatorUtils,
		SimpleMarkerSymbol,
		SimpleLineSymbol,
		InfoTemplate,
		esriColor,
		ImageParameters,
		Map,
		Extent,
		FeatureLayer,
		ArcGISTiledMapServiceLayer,
		ArcGISDynamicMapServiceLayer,
		SimpleFillSymbol,
		ClassBreaksRenderer,
		arcgisUtils,
		Draw,
		PictureFillSymbol, 
		CartographicLineSymbol, 
		Polyline, 
		Polygon,
		GeometryService, 
		SpatialReference,
		TitlePane,
		AreasAndLengthsParameters,
		GraphicsLayer
		) {
			
	var module = angular.module('ngMap',[]);
	
	module.directive('ngMap', ['ConfigurationService','$popover','$compile',
		function(energyAppConfiguration,$popover,$compile) {
		// this object will tell angular how our directive behaves
		return {
			
			// only allow ngMap to be used as an element (<ng-map>)
			restrict: 'E',

			// this directive shares $scope with its parent (this is the default)
			scope: false,

			// define how our template is compiled this gets the $element our directive is on as well as its attributes ($attrs)
			compile: function($element, $attrs) {
				// remove the id attribute from the main element
				$element.removeAttr("id");
				$element.removeAttr("style");
				return function(scope, element, attrs, controller) {
					scope.order = attrs.order;

					scope.id = attrs.id;

					element.append("<div id='" + scope.id + scope.order + "' class='absoluteFill'></div>");

					controller.setOrder(scope.id, scope.order);

						scope.$watch("center", function(newCenter, oldCenter) {
							if (newCenter !== oldCenter) {
								console.log("newCenter => (" + newCenter + ")");
								controller.centerAt(newCenter);
							}
						});
						
						//scope.$watch(
						//	function() {
						//		var gArray = energyAppConfiguration.getGraphics();
						//		console.log("Graphics Array: " + gArray);
						//		return gArray;
						//	},
						//	function(newValue, oldValue) {
						//		if (newValue == oldValue) {
						//			console.log("no value change!");
						//			return;
						//		}
						//		else {
						//			console.log("value change!");
						//			var map = energyAppConfiguration.getMap();
						//			map.updateGraphics(newValue);
						//			}
						//	},
						//	true
						//);

				};
			},
			//////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////
			controller: function($scope, $element, $attrs, $popover, $compile) {

				var initCenter = ($attrs.center) ? new Point({
					x: $attrs.center.split(",")[0],
					y: $attrs.center.split(",")[1],
					spatialReference: {
						wkid: 102100
					}
				}) : $scope.center;

				var mapOptions = {
					center: ($attrs.center) ? initCenter : $scope.center,
					zoom: ($attrs.zoom) ? $attrs.zoom : $scope.zoom,
					basemap: ($attrs.basemap) ? $attrs.basemap : $scope.basemap,
					showInfoWindowOnClick: true,
				};
				var order;
				var id;
				var map;
				var scalebar;
				var overviewMapDijit;
				var geocoder;
				var bmtoggle;
				var bmtogglePopOver;
				var locator;
				var infoTemplate;
				var locateSymbol;
				var clickType;
				var selectedLocation;
				var mapClickReset;
				var mapStopCenter;
				var mapStopRevGeo;
				var drawToolBar;
				var geometryService = new GeometryService("http://ags.stone-env.net/arcgis/rest/services/Utilities/Geometry/GeometryServer");
      


				var imageParameters = new ImageParameters();
        //imageParameters.format = "PNG8"; //set the image type to PNG24, note default is PNG8.

				var mapService_parcels = new ArcGISDynamicMapServiceLayer("http://maps.vcgi.org/arcgis/rest/services/EGC_services/MAP_VCGI_VTPARCELS_WM_NOCACHE_v1/MapServer");
				mapService_parcels.setVisibleLayers([1]);

				var mapService_energy = new ArcGISDynamicMapServiceLayer("http://ags.stone-env.net/arcgis/rest/services/Storymaps/HackVT/MapServer");

				var gl = new GraphicsLayer();

				var fillSymbol = new PictureFillSymbol(
	          "images/solar_tile.png",
	          new SimpleLineSymbol(
	            SimpleLineSymbol.STYLE_SOLID,
	            new Color([255,0,0]), 
	            4
	          ), 
	          42, 
	          42
	        );

				var markerSymbol = new SimpleMarkerSymbol();
       	markerSymbol.setColor(new Color("#FF0000"));

				locator = new Locator("http://mobiledata.stone-env.com/arcgis/rest/services/Emergency_ESITE_point_WebMerc/GeocodeServer");
        infoTemplate = new InfoTemplate("Location",
	        "Street: ${Street}<br/>City: ${City}<br/>State: ${State}<br/>Zip: ${ZIP}"
	        );
        locateSymbol = new SimpleMarkerSymbol(
					SimpleMarkerSymbol.STYLE_CIRCLE,
					15,
					new SimpleLineSymbol
					(
					  SimpleLineSymbol.STYLE_SOLID,
					  new Color([0, 0, 255, 0.5]),
					  8
					),
					new Color([0, 0, 255])
					);

				energyAppConfiguration.setMap(this);

				this.setOrder = function(tId, tOrder) {
					$scope['id'] = tId ? tId : "map";
					$scope['order'] = tOrder ? tOrder : "";
					$scope['uid'] = $scope.id + $scope.order;
					//////////////////////////////////////////////////////////////////////
					// Create the Map
					//////////////////////////////////////////////////////////////////////
					map = new Map($scope.uid, mapOptions);

					

					//////////////////////////////////////////////////////////////////////
					// Define Dijits
					//////////////////////////////////////////////////////////////////////
					scalebar = new Scalebar({
							map: map,
							scalebarUnit: "dual"
						});

					overviewMapDijit = new OverviewMap({
							map: map,
							visible: true
						});

					geocoder = new Geocoder({
							map: map
						},
						"geocoder"
					);


					locator.on("location-to-address-complete", function(evt) {
						if (evt.address.address)
						{
							var address = evt.address.address;
							//var tlocation = webMercatorUtils.geographicToWebMercator(evt.address.location);
							var tlocation = evt.address.location;
							if (tlocation) {
								vtswcalcAppUserState.setStateItem('location',tlocation);
							}
							if (address) {
								vtswcalcAppUserState.setStateItem('address',address);
							}
							console.log("Reverse GeoCode Found Address: " + JSON.stringify(address));
							console.log("\--> Reverse GeoCode Location: " + JSON.stringify(tlocation));
							//this service returns geocoding results in geographic - convert to web mercator to display on map
							//var location = webMercatorUtils.geographicToWebMercator(evt.location);
							var graphic = new Graphic(tlocation, locateSymbol, address, infoTemplate);
							map.graphics.add(graphic);

							map.infoWindow.setTitle(graphic.getTitle());
							map.infoWindow.setContent(graphic.getContent());

							//display the info window with the address information
							var screenPnt = map.toScreen(tlocation);
							map.infoWindow.resize(200,100);
							map.infoWindow.show(screenPnt, map.getInfoWindowAnchor(screenPnt));
						}
					});

					
					function addToMap(){
					}
					
					function graphicAdded(evt){
						addGraphic(evt.geometry);
					}
					
					function addGraphic(geometry) {
						drawToolBar.deactivate(); 
						map.enableMapNavigation();
						
						// figure out which symbol to use
						var symbol;
						
						if ( geometry.type === "point" || geometry.type === "multipoint") {
							symbol = markerSymbol;
						} else if ( geometry.type === "line" || geometry.type === "polyline") {
							symbol = lineSymbol;
						}
						else {
							symbol = fillSymbol;
						}
						var g = new Graphic(geometry, symbol);
						var areasAndLengthsParams = new AreasAndLengthsParameters();
						areasAndLengthsParams.lengthUnit = GeometryService.UNIT_METER;
						areasAndLengthsParams.areaUnit = GeometryService.UNIT_SQUARE_METERS;
						areasAndLengthsParams.calculationType = "geodesic";
						areasAndLengthsParams.polygons = [geometry];
						geometryService.areasAndLengths(areasAndLengthsParams);

						gl.add(g);
						//energyAppConfiguration.setGraphics(map.graphics);
					}
					
					function storeAreaAndLength(evtObj) {
			      var result = evtObj.result;
			      console.log(JSON.stringify(result));
			      var g = gl.graphics[gl.graphics.length - 1];
						g.setAttributes({'area': result.areas[0], 'energy' : 0});
						var pve = getPvEnergy(result.areas[0],energyAppConfiguration.getTowns()[energyAppConfiguration.getSelectedTown()].annkwhm2);
						g.setAttributes({'area': result.areas[0], 'energy' : pve});
						energyAppConfiguration.setGraphics(gl);
						console.log("graphic updated with new attribute");
			    }
					
					
            function getPvEnergy(area,solarrad) {
                var roofThresh = 100; //m2, based on 50% of typical roof area
                var ac_dc = 0.8;
                var Ppk_A = .16 //kW/m2, based on six differnt panel specs
                var panel_density;
                if (area >= roofThresh){
                    //assume it's a ground installation
                    panel_density = 0.2;
                }
                else {
                    //assume it's a rooftop installation
                    panel_density = 1.0;
                }
                var pvE = solarrad*ac_dc*Ppk_A*area*panel_density;
                return pvE;
            }
					
//					function clearMap() {
//						map.graphics.clear();
//						//energyAppConfiguration.setGraphics(map.graphics);
//					}
					
					function initDrawBar() {
						drawToolBar = new Draw(map);
						drawToolBar.on("draw-end", graphicAdded);
						
						on(dom.byId("drawToolbar"),"click",function(evt) {
							
							if ( evt.target.id === "drawToolbar" ) {
	           		return;
	            }
	            if ( evt.target.id === "clearMap" ) {
	           		return;
	            }
	            var tool = evt.target.id.toLowerCase();
							map.disableMapNavigation();
	            drawToolBar.activate(tool);
						});
						
						on(dom.byId("clearMap"), "click", function(evt) {
							console.log("caught clearMap click!!!!");
							gl.clear();
							energyAppConfiguration.setGraphics(gl);
						});
							
					}
					
					function selectGraphic(evt) {
						
						energyAppConfiguration.selectGraphic(evt.graphic);
						
					};
					
					//////////////////////////////////////////////////////////////////////
					// Startup Dijits
					//////////////////////////////////////////////////////////////////////
					geocoder.startup();
					overviewMapDijit.startup();
					initDrawBar();
					
					
					
					gl.on('click',selectGraphic);

					
					var layersToStartMapWith =
					[
						gl,
						mapService_energy
					];

					

					geometryService.on("areas-and-lengths-complete", storeAreaAndLength);

					map.addLayers(layersToStartMapWith);

					//////////////////////////////////////////////////////////////////////
					// Define "API" methods for this directive instance
					//////////////////////////////////////////////////////////////////////

					$scope.$watch(
						function() {
							var town = energyAppConfiguration.getSelectedTown();
							console.log("Town: " + town);
							return town;
						},
						function(newValue, oldValue) {
							if (newValue == oldValue) {
								console.log("no value change!");
								return;
							}
							else {
								console.log("value change!");
								var towns = energyAppConfiguration.getTowns();
								var extent = towns[newValue].townExtent;
								energyAppConfiguration.getMap().changeExtent(extent);
								}
						},
						true
					);

					this.setClick = function(cType) {

					};

					this.getMap = function() {
						return map;
					};

					this.setClick("center");

					map.on("resize", function(size) {
						energyAppConfiguration.setMapDimensions(size.extent, size.height, size.width);
					});

					map.on("extent-change",function(foo) {
						energyAppConfiguration.setMapDimensions(map.extent, map.height, map.width);
					});

					this.addLayer = function(layer) {

						return map.addLayer(layer);
					};

					this.centerAt = function(center) {

						var point = new Point({
							x: center[0],
							y: center[1],
							spatialReference: {
								wkid: 102100
							}
						});
						map.centerAt(point);
					};

					this.updateGraphics = function(gArray) {
						map.graphics.graphics = gArray;
					};

					this.changeExtent = function(extent) {
						var xtnt = new esri.geometry.Extent();
						xtnt.xmin = extent.xmin;
						xtnt.ymin = extent.ymin;
						xtnt.xmax = extent.xmax;
						xtnt.ymax = extent.ymax;
						xtnt.spatialReference = new esri.SpatialReference( {wkid:4326} );
						map.setExtent(xtnt);	
					};

					this.clearMap = function() {
						map.graphics.clear();
						energyAppConfiguration.setClearChart(true);
					};

				this.removeGraphic = function(g) {
					gl.remove(g);
					energyAppConfiguration.clearSetGraphic();
					energyAppConfiguration.setGraphics({});
					energyAppConfiguration.setGraphics(gl);
					energyAppConfiguration.setClearChart(true);
				};

				};
			}
		};
	}]);

	return module;
});
