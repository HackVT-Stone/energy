"use strict";
define(
    [
        'vtswcalcApp'
    ],
    function(vtswcalcApp) {

        vtswcalcApp.directive('compile', 
            function($compile) {
                return {
                	restrict: 'A',
                	replace: true,
                	link: function(scope, elem, attrs) {

                    scope.$watch(
//                        function(scope) {
//                            // watch the 'compile' expression for changes
//                            return scope.$eval(attrs.compile);
//                        }
												attrs.compile, //being watched
                        function(newhtml) {
                            // when the 'compile' expression changes
                            // assign it into the current DOM
                            elem.html(newhtml);

                            // compile the new DOM and link it to the current
                            // scope.
                            // NOTE: we only compile .childNodes so that
                            // we don't get into infinite loop compiling ourselves
                            $compile(elem.contents())(scope);
//                            var nodelist = elem.contents();
//                            console.log(nodelist);
//                            for (var tnode in nodelist) {
//                            	try {
//                            	$compile(nodelist[tnode].contents())(scope);
//                            }
//                            catch(e) {
//                            	console.log('error [' + e + '] compiling');
//                            	}
//                            }
                        }
                    );
                }
              };
            }
        );
    }
);