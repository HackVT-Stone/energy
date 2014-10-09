/* global angular:true */
"use strict";
define([
		'vtswcalcApp/directives/ngMap', // These defines MUST match 
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
		'agsjs/dijit/TOC'
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
		TOC) {
			
	var module = angular.module('ngMap',[]);
	
	module.directive('ngMap', ['ConfigurationService', 'GUIStateService','UserStateService','$popover','$compile',
		function(vtswcalcAppConfiguration, vtswcalcAppGUIState, vtswcalcAppUserState, $popover,$compile) {
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
				var toc;

				var imageParameters = new ImageParameters();
        //imageParameters.format = "PNG8"; //set the image type to PNG24, note default is PNG8.

				var mapService_roads = new ArcGISDynamicMapServiceLayer("http://maps.vcgi.org/arcgis/rest/services/VCGI_services/VCGI_BASEMAP_WM_v2/MapServer");
        mapService_roads.setVisibleLayers([16]);

				var mapService_waterbodies = new ArcGISDynamicMapServiceLayer("http://anrmaps.vermont.gov/arcgis/rest/services/map_services/MAP_ANR_ANRATLAS_WM_NOCACHE/MapServer");
				mapService_waterbodies.setVisibleLayers([173]);

        var mapService_streams = new ArcGISDynamicMapServiceLayer("http://anrmaps.vermont.gov/arcgis/rest/services/map_services/MAP_ANR_ANRATLAS_WM_NOCACHE/MapServer");
        mapService_streams.setVisibleLayers([174]);

				var mapService_hydrologic = new ArcGISDynamicMapServiceLayer("http://anrmaps.vermont.gov/arcgis/rest/services/map_services/MAP_ANR_ANRATLAS_WM_NOCACHE/MapServer");
				mapService_hydrologic.setVisibleLayers([136]);

				var mapService_parcels = new ArcGISDynamicMapServiceLayer("http://maps.vcgi.org/arcgis/rest/services/EGC_services/MAP_VCGI_VTPARCELS_WM_NOCACHE_v1/MapServer");
				mapService_parcels.setVisibleLayers([1]);

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

				vtswcalcAppGUIState.setMap(this);

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

					bmtoggle = new BasemapGallery({
							showArcGISBasemaps: true,
							map: map
						},
						"bmtoggle"
					);

					this.setupBmToggle = function() {
						var btn_bmtoggle = angular.element( document.querySelector( '#btn_bmtoggle' ) );
						bmtogglePopOver = $popover(btn_bmtoggle,
						{
							title:'Basemap Gallery',
							content:'None',
							template:'/views/gui/bmtoggle.html',
							trigger:'hover'
						});
						//bmtoggle.startup();
					};

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
						toc.startup();
					});

					map.on('layers-add-result', function(evt){
						console.log('map.on("layers-add-result") reached!');
            toc = new TOC(
            {
              map: map,
              layerInfos:
              [
	              {
	                layer: mapService_roads,
	                title: "Roads (VTrans)",
	                slider: true,
	                collapsed: true
	              },
								{
								  layer: mapService_waterbodies,
								  title: "Waterbodies",
								  slider: true,
								  collapsed: true
								},
								{
								  layer: mapService_streams,
								  title: "Streams",
								  slider: true,
								  collapsed: true
								},
								{
								  layer: mapService_hydrologic,
								  title: "Hydrologic Soil Groups",
								  slider: true,
								  collapsed: true
								},
	              {
	                layer: mapService_parcels,
	                title: "Parcels",
	                slider: true,
	                collapsed: true
	              }
              ]
            }, 'tocDiv');
            toc.startup();
          });
					//////////////////////////////////////////////////////////////////////
					// Startup Dijits
					//////////////////////////////////////////////////////////////////////
					geocoder.startup();
					overviewMapDijit.startup();
					this.setupBmToggle();

					var layersToStartMapWith =
					[
						mapService_hydrologic,
						mapService_waterbodies,
						mapService_parcels,
						mapService_streams,
						mapService_roads
					];

					map.addLayers(layersToStartMapWith);

					//////////////////////////////////////////////////////////////////////
					// Define "API" methods for this directive instance
					//////////////////////////////////////////////////////////////////////


					this.setClick = function(cType) {
						switch(cType) {
							case "revgeo":
								try {
									mapStopCenter.remove();
									}
								catch(e){}
								mapStopRevGeo = map.on("click", function(e) {
									map.graphics.clear();
									var locationToRevGeoCode = webMercatorUtils.webMercatorToGeographic(e.mapPoint);
		          		locator.locationToAddress(locationToRevGeoCode, 100); // second param is search distance in meters
									});
								break;
							case "center":
								try {
									mapStopRevGeo.remove();
									}
								catch(e){}
								mapStopCenter = map.on("click", function(e) {
									$scope.$emit("map.click", e);
									$scope.$apply(function() {
										$scope.click.call($scope, e);
									})
									});
								break;
							default:
								break;
						}
						//mapClickReset = map.on("click", clickType);
					};

					this.getMap = function() {
						return map;
					};

					this.setClick("center");

					map.on("resize", function(size) {
						vtswcalcAppConfiguration.setMapDimensions(size.extent, size.height, size.width);
					});

					map.on("extent-change",function(foo) {
						vtswcalcAppConfiguration.setMapDimensions(map.extent, map.height, map.width);
					});

					this.startBmToggle = function() {
						try {
							this.setupBmToggle();
							console.log("-- called bmtoggle.startup() --");
						}
						catch(e)
						{
							console.log("-- error with bmtoggle.startup() -- " + e);
							}
					};

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

				};
			}
		};
	}]);

	return module;
});
