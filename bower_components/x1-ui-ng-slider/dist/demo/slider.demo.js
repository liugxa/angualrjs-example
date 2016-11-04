/**
 *
 * Licensed Materials - Property of IBM
 *
 * demo.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.demo", [
		"ui.router",
		"x1.ui.slider.demo"
	])
	.config(["$urlRouterProvider", "$translateProvider",
		function($urlRouterProvider, $translateProvider) {
			"use strict";

			// Register a loader for the static files
			// So, the module will search missing translation tables under the specified urls.
			// Those urls are [prefix][langKey][suffix].
			$translateProvider.useStaticFilesLoader({
				prefix: "l10n/",
				suffix: ".json"
			});

			// Tell the module what language to use by default
			$translateProvider.preferredLanguage("en_US");
			$translateProvider.useSanitizeValueStrategy("escaped");

			$urlRouterProvider.otherwise("/slider");
		}
	]);
/**
 *
 * Licensed Materials - Property of IBM
 *
 * slider.demo.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.slider.demo", [
		"prism",
		"ui.bootstrap.tabs",
		"ui.bootstrap.tpls",
		"x1.ui.demo-generator",
		"x1.ui.slider"
	])
	.config(["$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider.state("slider", {
				url: "/slider",
				templateUrl: "slider/slider.demo.html"
			});
		}
	])
	.controller("SingleSliderDemoCtrl", ["$scope",
		function($scope) {
			"use strict";

			// init value
			$scope.demoValue = 2.5;

			// format options
			$scope.formatTo = function(value) {
				return "$" + parseFloat(value).toFixed(2);
			};
			$scope.formatFrom = function(value) {
				return value.replace("$", "");
			};

			// set custom options
			$scope.options = {
				tooltips: true,
				format: {
					to: $scope.formatTo,
					from: $scope.formatFrom
				},
				range: {
					min: 0,
					max: 5
				},
				pips: {
					mode: "count",
					values: 6,
					density: 5,
					format: {
						to: $scope.formatTo,
						from: $scope.formatFrom
					}
				}
			};

			// input buttons
			$scope.minus = function() {
				if ($scope.demoValue - 0.5 <= $scope.options.range.min) {
					$scope.demoValue = $scope.options.range.min;
				} else {
					$scope.demoValue -= 0.5;
				}
			};
			$scope.plus = function(){
				if ($scope.demoValue + 0.5 >= $scope.options.range.max) {
					$scope.demoValue = $scope.options.range.max;
				} else {
					$scope.demoValue += 0.5;
				}
			};
		}
	])
	.controller("ToggleSliderDemoCtrl", ["$scope",
		function($scope) {
			"use strict";

			// init value
			$scope.toggleValue = 0;

			// set custom options
			$scope.toggleOptions = {
				range: {
					min: [0, 1],
					max: 1
				}
			};
		}
	])
	.controller("HorizontalSliderDemoCtrl", ["$scope",
		function($scope) {
			"use strict";

			// init value
			$scope.demoValues = [1, 4];

			// format options
			$scope.formatTo = function(value) {
				return "$" + parseFloat(value).toFixed(2);
			};
			$scope.formatFrom = function(value) {
				return value.replace("$", "");
			};

			// set custom options
			$scope.options = {
				tooltips: true,
				connect: true,
				format: {
					to: $scope.formatTo,
					from: $scope.formatFrom
				},
				range: {
					min: 0,
					max: 5
				},
				pips: {
					mode: "count",
					values: 6,
					density: 5,
					format: {
						to: $scope.formatTo,
						from: $scope.formatFrom
					}
				},
				disabled: [false, true]
			};
		}
	])
	.controller("VerticalSliderDemoCtrl", ["$scope",
		function($scope) {
			"use strict";

			// init value
			$scope.demoValues = [1, 4];

			// format options
			$scope.formatTo = function(value) {
				return "$" + parseFloat(value).toFixed(2);
			};
			$scope.formatFrom = function(value) {
				return value.replace("$", "");
			};

			// set custom options
			$scope.options = {
				tooltips: true,
				connect: true,
				format: {
					to: $scope.formatTo,
					from: $scope.formatFrom
				},
				range: {
					min: 0,
					max: 5
				},
				pips: {
					mode: "count",
					values: 6,
					density: 5,
					format: {
						to: $scope.formatTo,
						from: $scope.formatFrom
					}
				},
				orientation: "vertical"
			};
		}
	]);
/**
 *
 * Licensed Materials - Property of IBM
 *
 * prism.js
 *
 * (C) Copyright IBM Corporation 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("prism", [])
	.directive("prism",
		function() {
			"use strict";

			return {
				restrict: "A",
				link: function($scope, element) {
					element.ready(function() {
						Prism.highlightElement(element[0]);
					});
				}
			};
		}
	);
(function(module) {
try {
  module = angular.module('x1.ui.slider');
} catch (e) {
  module = angular.module('x1.ui.slider', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('slider/index.rtl.html',
    '<!DOCTYPE html><html ng-app="x1.ui.demo" lang="en"><head><meta charset="utf-8"><title>IBM Commerce Product UI Slider Demo</title><link rel="stylesheet" href="vendor/vendor.css"><link rel="stylesheet" href="../x1-ui-ng-slider.css"><link rel="stylesheet" href="slider.demo.css"></head><body dir="rtl"><section ui-view="" role="main" class="container"></section><script type="text/javascript" src="vendor/vendor.js"></script><script type="text/javascript" src="../x1-ui-ng-slider.js"></script><script type="text/javascript" src="slider.demo.js"></script></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.slider');
} catch (e) {
  module = angular.module('x1.ui.slider', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('slider/slider.demo.html',
    '<x1-demo-generator doc-src="\'slider/slider.doc.html\'" repo-name="x1-ui-ng-slider" class="x1-slider-demo"><ng-include src="\'slider/examples/single.demo.html\'"></ng-include><ng-include src="\'slider/examples/toggle.demo.html\'"></ng-include><ng-include src="\'slider/examples/horizontal.demo.html\'"></ng-include><ng-include src="\'slider/examples/vertical.demo.html\'"></ng-include></x1-demo-generator>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.slider');
} catch (e) {
  module = angular.module('x1.ui.slider', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('slider/slider.doc.html',
    '<h3 class="page-header">Bower dependencies</h3><ul><li>angular</li><li>angular-translate</li><li>nouislider</li><li>x1-ui-bootstrap</li></ul><h3 class="page-header">Attribute options for <code>&lt;slider&gt;</code></h3><p>This component is an angular wrapper for the popular JS <a target="_blank" href="http://refreshless.com/nouislider/">noUiSlider</a>. You can refer to their <a target="_blank" href="http://refreshless.com/nouislider/slider-options/">documentation</a> for some of the config options that are not documented here.</p><table class="table table-striped table-condensed"><thead><tr><th>Property</th><th>Description</th><th>Type</th><th>Default value</th><th>Required</th></tr></thead><tbody><tr><td>range</td><td>Sets the minimum and maximum range of the slider. Can be just the min and max like <a target="_blank" href="http://refreshless.com/nouislider/">here</a> or a more complex object like <a target="_blank" href="http://refreshless.com/nouislider/slider-values/#section-non-linear">here</a>.</td><td>object</td><td>undefined</td><td>true</td></tr><tr><td>step</td><td>Sets the step interval for the slider handle.</td><td>number</td><td>0.01</td><td>false</td></tr><tr><td>ng-model</td><td>This is used to get the value from the slider with one handle. Do not use ng-from and ng-to when using this.</td><td>$scope variable or object</td><td>undefined</td><td>false</td></tr><tr><td>ng-from</td><td>This is used to get the first handle value from the range slider. Do not use ng-model when using this.</td><td>$scope variable or object</td><td>undefined</td><td>false</td></tr><tr><td>ng-to</td><td>This is used to get the second handle value from the range slider. Do not use ng-model when using this.</td><td>$scope variable or object</td><td>undefined</td><td>false</td></tr><tr><td>pips</td><td>Sets the scale below the slider. More documentation <a target="_blank" href="http://refreshless.com/nouislider/pips/">here</a>.</td><td>object</td><td>undefined</td><td>false</td></tr><tr><td>direction</td><td>Sets the direction. "ltr" for left-to-right and "rtl" for right-to-left.</td><td>string</td><td>ltr</td><td>false</td></tr><tr><td>orientation</td><td>Sets the slider orientaton. "horizontal" or "vertical".</td><td>string</td><td>horizontal</td><td>false</td></tr><tr><td>tooltips</td><td>Display tooltips when set to true. Hides tooltips when set to false.</td><td>boolean</td><td>false</td><td>false</td></tr><tr><td>connect</td><td>When set to "lower" displays a connecting bar on the lower side of a single handle slider. When set to "upper" displays a connecting bar on the upper side of a single handle slider. When set to true, displays a connecting bar between the slider handles in range slider. When set to false, hides the connecting bar between the slider handles in range slider. More documentation <a target="_blank" href="http://refreshless.com/nouislider/slider-options/#section-Connect">here</a></td><td>boolean or string</td><td>false</td><td>false</td></tr><tr><td>snap</td><td>When set to true snaps between the values specified in the range option. More documentation <a target="_blank" href="http://refreshless.com/nouislider/slider-values/#section-snap">here</a></td><td>boolean</td><td>false</td><td>false</td></tr><tr><td>behaviour</td><td>Provides different options to handle user interaction with the slider. More documentation <a target="_blank" href="http://refreshless.com/nouislider/behaviour-option/">here</a></td><td>string</td><td>tap</td><td>false</td></tr><tr><td>format</td><td>Set the to and from functions to encode and decode the values. More documentation <a target="_blank" href="http://refreshless.com/nouislider/slider-read-write/#section-formatting">here</a></td><td>object</td><td>{ \'to\': function( value ){ return value.toFixed(2); }, \'from\': Number }</td><td>false</td></tr><tr><td>margin</td><td>When using two handles, the minimum distance between the handles can be set using the margin option. More documentation <a target="_blank" href="http://refreshless.com/nouislider/slider-options/#section-margin">here</a></td><td>number</td><td>undefined</td><td>false</td></tr><tr><td>limit</td><td>The limit option is the oposite of the margin option, limiting the maximum distance between two handles. More documentation <a target="_blank" href="http://refreshless.com/nouislider/slider-options/#section-limit">here</a></td><td>number</td><td>undefined</td><td>false</td></tr><tr><td>changeFn</td><td>Change event function: Triggers every time a handle is dragged. More documentation <a target="_blank" href="http://refreshless.com/nouislider/events-callbacks/">here</a></td><td>function</td><td>undefined</td><td>false</td></tr></tbody></table>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.slider');
} catch (e) {
  module = angular.module('x1.ui.slider', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('slider/examples/horizontal.demo.html',
    '<h3>Horizontal range</h3><p>This is an example of a slider with two handles to display a range between values.</p><div ng-controller="HorizontalSliderDemoCtrl" class="bs-example"><form class="row"><div class="form-group form-slider"><x1-slider ng-from="demoValues[0]" ng-to="demoValues[1]" range="options.range" format="options.format" connect="options.connect" pips="options.pips" tooltips="options.tooltips" disabled-handles="options.disabled"></x1-slider></div><div class="form-group col-xs-4"><label for="horizontalExample1">Minimum</label> <input id="horizontalExample1" type="number" class="form-control" ng-model="demoValues[0]" min="{{options.range.min}}" max="{{options.range.max}}"></div><div class="form-group col-xs-4"><label for="horizontalExample2">Maximum</label> <input id="horizontalExample2" type="number" class="form-control" ng-model="demoValues[1]" min="{{options.range.min}}" max="{{options.range.max}}"></div></form></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;form class=&quot;row&quot;&gt;\n' +
    '	&lt;div class=&quot;form-group form-slider&quot;&gt;\n' +
    '		&lt;x1-slider ng-from=&quot;demoValues[0]&quot; ng-to=&quot;demoValues[1]&quot; range=&quot;options.range&quot;\n' +
    '				format=&quot;options.format&quot; connect=&quot;options.connect&quot; pips=&quot;options.pips&quot;\n' +
    '				tooltips=&quot;options.tooltips&quot;&gt;&lt;/x1-slider&gt;\n' +
    '	&lt;/div&gt;\n' +
    '	&lt;div class=&quot;form-group col-xs-4&quot;&gt;\n' +
    '		&lt;label for=&quot;horizontalExample1&quot;&gt;Minimum&lt;/label&gt;\n' +
    '		&lt;input id=&quot;horizontalExample1&quot; type=&quot;number&quot; class=&quot;form-control&quot; ng-model=&quot;demoValues[0]&quot;\n' +
    '				min=&quot;{{<span>options.range.min</span>}}&quot; max=&quot;{{<span>options.range.max</span>}}&quot;&gt;\n' +
    '	&lt;/div&gt;\n' +
    '	&lt;div class=&quot;form-group col-xs-4&quot;&gt;\n' +
    '		&lt;label for=&quot;horizontalExample2&quot;&gt;Maximum&lt;/label&gt;\n' +
    '		&lt;input id=&quot;horizontalExample2&quot; type=&quot;number&quot; class=&quot;form-control&quot; ng-model=&quot;demoValues[1]&quot;\n' +
    '				min=&quot;{{<span>options.range.min</span>}}&quot; max=&quot;{{<span>options.range.max</span>}}&quot;&gt;\n' +
    '	&lt;/div&gt;\n' +
    '&lt;/form&gt;</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre>\n' +
    '				<code class="language-js" prism="">angular\n' +
    '	.module(&quot;x1.ui.slider.demo&quot;, [\n' +
    '		&quot;prism&quot;,\n' +
    '		&quot;ui.bootstrap.tabs&quot;,\n' +
    '		&quot;ui.bootstrap.tpls&quot;,\n' +
    '		&quot;x1.ui.demo-generator&quot;,\n' +
    '		&quot;x1.ui.slider&quot;\n' +
    '	])\n' +
    '	.controller(&quot;HorizontalSliderDemoCtrl&quot;, [&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			// init value\n' +
    '			$scope.demoValues = [1, 4];\n' +
    '\n' +
    '			// format options\n' +
    '			$scope.formatTo = function(value) {\n' +
    '				return &quot;$&quot; + parseFloat(value).toFixed(2);\n' +
    '			};\n' +
    '			$scope.formatFrom = function(value) {\n' +
    '				return value.replace(&quot;$&quot;, &quot;&quot;);\n' +
    '			};\n' +
    '\n' +
    '			// set custom options\n' +
    '			$scope.options = {\n' +
    '				tooltips: true,\n' +
    '				connect: true,\n' +
    '				format: {\n' +
    '					to: $scope.formatTo,\n' +
    '					from: $scope.formatFrom\n' +
    '				},\n' +
    '				range: {\n' +
    '					min: 0,\n' +
    '					max: 5\n' +
    '				},\n' +
    '				pips: {\n' +
    '					mode: &quot;count&quot;,\n' +
    '					values: 6,\n' +
    '					density: 5,\n' +
    '					format: {\n' +
    '						to: $scope.formatTo,\n' +
    '						from: $scope.formatFrom\n' +
    '					}\n' +
    '				}\n' +
    '			};\n' +
    '		}\n' +
    '	]);</code>\n' +
    '			</pre></div></tab><tab heading="Sass"><div class="highlight"><pre>\n' +
    '				<code class="language-css" prism="">@import &quot;../../bower_components/x1-ui-bootstrap/app/src/x1-ui-sass-tools&quot;;\n' +
    '\n' +
    '.x1-slider-demo {\n' +
    '	.form-slider {\n' +
    '		margin-bottom: 50px;\n' +
    '	}\n' +
    '}</code>\n' +
    '			</pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.slider');
} catch (e) {
  module = angular.module('x1.ui.slider', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('slider/examples/single.demo.html',
    '<h3 class="page-header">Single (day mode)</h3><p>This is an example of a slider with one handle in day mode for use on a light background.</p><div ng-controller="SingleSliderDemoCtrl" class="bs-example"><div class="form-group form-slider"><x1-slider ng-model="demoValue" range="options.range" format="options.format" pips="options.pips" tooltips="options.tooltips"></x1-slider></div><div class="form-group"><label for="singleExample">Price</label><div class="input-group col-xs-4"><input id="singleExample" type="number" class="form-control" ng-model="demoValue" min="{{options.range.min}}" max="{{options.range.max}}"> <span class="input-group-btn"><button type="button" class="btn btn-default glyphicon glyphicon-calc-minus" ng-click="minus()" title="Decrease price"><span class="sr-only">Decrease price</span></button> <button type="button" class="btn btn-default glyphicon glyphicon-calc-plus" ng-click="plus()" title="Increase price"><span class="sr-only">Increase price</span></button></span></div></div></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;div class=&quot;form-group form-slider&quot;&gt;\n' +
    '	&lt;x1-slider ng-model=&quot;demoValue&quot; range=&quot;options.range&quot; format=&quot;options.format&quot;\n' +
    '			pips=&quot;options.pips&quot;	tooltips=&quot;options.tooltips&quot;&gt;&lt;/x1-slider&gt;\n' +
    '&lt;/div&gt;\n' +
    '&lt;div class=&quot;form-group&quot;&gt;\n' +
    '	&lt;label for=&quot;singleExample&quot;&gt;Price&lt;/label&gt;\n' +
    '	&lt;div class=&quot;input-group col-xs-4&quot;&gt;\n' +
    '		&lt;input id=&quot;singleExample&quot; type=&quot;number&quot; class=&quot;form-control&quot; ng-model=&quot;demoValue&quot;\n' +
    '				min=&quot;{{<span>options.range.min</span>}}&quot; max=&quot;{{<span>options.range.max</span>}}&quot;&gt;\n' +
    '		&lt;span class=&quot;input-group-btn&quot;&gt;\n' +
    '			&lt;button type=&quot;button&quot; class=&quot;btn btn-default glyphicon glyphicon-calc-minus&quot;\n' +
    '					ng-click=&quot;minus()&quot; title=&quot;Decrease price&quot;&gt;\n' +
    '				&lt;span class=&quot;sr-only&quot;&gt;Decrease price&lt;/span&gt;\n' +
    '			&lt;/button&gt;\n' +
    '			&lt;button type=&quot;button&quot; class=&quot;btn btn-default glyphicon glyphicon-calc-plus&quot;\n' +
    '					ng-click=&quot;plus()&quot; title=&quot;Increase price&quot;&gt;\n' +
    '				&lt;span class=&quot;sr-only&quot;&gt;Increase price&lt;/span&gt;\n' +
    '			&lt;/button&gt;\n' +
    '		&lt;/span&gt;\n' +
    '	&lt;/div&gt;\n' +
    '&lt;/div&gt;</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre>\n' +
    '				<code class="language-js" prism="">angular\n' +
    '	.module(&quot;x1.ui.slider.demo&quot;, [\n' +
    '		&quot;prism&quot;,\n' +
    '		&quot;ui.bootstrap.tabs&quot;,\n' +
    '		&quot;ui.bootstrap.tpls&quot;,\n' +
    '		&quot;x1.ui.demo-generator&quot;,\n' +
    '		&quot;x1.ui.slider&quot;\n' +
    '	])\n' +
    '	.controller(&quot;SingleSliderDemoCtrl&quot;, [&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			// init value\n' +
    '			$scope.demoValue = 2.5;\n' +
    '\n' +
    '			// format options\n' +
    '			$scope.formatTo = function(value) {\n' +
    '				return &quot;$&quot; + parseFloat(value).toFixed(2);\n' +
    '			};\n' +
    '			$scope.formatFrom = function(value) {\n' +
    '				return value.replace(&quot;$&quot;, &quot;&quot;);\n' +
    '			};\n' +
    '\n' +
    '			// set custom options\n' +
    '			$scope.options = {\n' +
    '				tooltips: true,\n' +
    '				format: {\n' +
    '					to: $scope.formatTo,\n' +
    '					from: $scope.formatFrom\n' +
    '				},\n' +
    '				range: {\n' +
    '					min: 0,\n' +
    '					max: 5\n' +
    '				},\n' +
    '				pips: {\n' +
    '					mode: &quot;count&quot;,\n' +
    '					values: 6,\n' +
    '					density: 5,\n' +
    '					format: {\n' +
    '						to: $scope.formatTo,\n' +
    '						from: $scope.formatFrom\n' +
    '					}\n' +
    '				}\n' +
    '			};\n' +
    '\n' +
    '			// input buttons\n' +
    '			$scope.minus = function() {\n' +
    '				if ($scope.demoValue - 0.5 &lt;= $scope.options.range.min) {\n' +
    '					$scope.demoValue = $scope.options.range.min;\n' +
    '				} else {\n' +
    '					$scope.demoValue -= 0.5;\n' +
    '				}\n' +
    '			};\n' +
    '			$scope.plus = function(){\n' +
    '				if ($scope.demoValue + 0.5 &gt;= $scope.options.range.max) {\n' +
    '					$scope.demoValue = $scope.options.range.max;\n' +
    '				} else {\n' +
    '					$scope.demoValue += 0.5;\n' +
    '				}\n' +
    '			};\n' +
    '		}\n' +
    '	]);</code>\n' +
    '			</pre></div></tab><tab heading="Sass"><div class="highlight"><pre>\n' +
    '				<code class="language-css" prism="">@import &quot;../../bower_components/x1-ui-bootstrap/app/src/x1-ui-sass-tools&quot;;\n' +
    '\n' +
    '.x1-slider-demo {\n' +
    '	.form-slider {\n' +
    '		margin-bottom: 50px;\n' +
    '	}\n' +
    '}</code>\n' +
    '			</pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.slider');
} catch (e) {
  module = angular.module('x1.ui.slider', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('slider/examples/toggle.demo.html',
    '<h3>Toggle</h3><p>This is an example of a slider which can be used as a toggle by setting <code>class="x1-slider-as-toggle"</code>.</p><div ng-controller="ToggleSliderDemoCtrl" class="bs-example"><div class="form-group form-slider"><x1-slider ng-model="toggleValue" range="toggleOptions.range" connect="toggleOptions.connect" class="x1-slider-as-toggle"></x1-slider><x1-slider range="toggleOptions.range" class="x1-slider-as-toggle" disabled=""></x1-slider></div><div class="form-group"><label for="toggleExample">Toggle value</label><div class="input-group col-xs-4"><input id="toggleExample" type="number" class="form-control" ng-model="toggleValue" min="{{toggleOptions.range.min[0]}}" max="{{toggleOptions.range.max}}"></div></div></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;div class=&quot;form-group form-slider&quot;&gt;\n' +
    '	&lt;x1-slider ng-model=&quot;toggleValue&quot; range=&quot;toggleOptions.range&quot; connect=&quot;toggleOptions.connect&quot;\n' +
    '			class=&quot;x1-slider-as-toggle&quot;&gt;&lt;/x1-slider&gt;\n' +
    '	&lt;x1-slider range=&quot;toggleOptions.range&quot; class=&quot;x1-slider-as-toggle&quot; disabled&gt;&lt;/x1-slider&gt;\n' +
    '&lt;/div&gt;\n' +
    '&lt;div class=&quot;form-group&quot;&gt;\n' +
    '	&lt;label for=&quot;toggleExample&quot;&gt;Toggle value&lt;/label&gt;\n' +
    '	&lt;div class=&quot;input-group col-xs-4&quot;&gt;\n' +
    '		&lt;input id=&quot;toggleExample&quot; type=&quot;number&quot; class=&quot;form-control&quot; ng-model=&quot;toggleValue&quot;\n' +
    '				min=&quot;{{<span>toggleOptions.range.min[0]</span>}}&quot; max=&quot;{{<span>toggleOptions.range.max</span>}}&quot;&gt;\n' +
    '	&lt;/div&gt;\n' +
    '&lt;/div&gt;</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre>\n' +
    '				<code class="language-js" prism="">angular\n' +
    '	.module(&quot;x1.ui.slider.demo&quot;, [\n' +
    '		&quot;prism&quot;,\n' +
    '		&quot;ui.bootstrap.tabs&quot;,\n' +
    '		&quot;ui.bootstrap.tpls&quot;,\n' +
    '		&quot;x1.ui.demo-generator&quot;,\n' +
    '		&quot;x1.ui.slider&quot;\n' +
    '	])\n' +
    '	.controller(&quot;ToggleSliderDemoCtrl&quot;, [&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			// init value\n' +
    '			$scope.toggleValue = 0;\n' +
    '\n' +
    '			// set custom options\n' +
    '			$scope.toggleOptions = {\n' +
    '				range: {\n' +
    '					min: [0, 1],\n' +
    '					max: 1\n' +
    '				}\n' +
    '			};\n' +
    '		}\n' +
    '	]);</code>\n' +
    '			</pre></div></tab><tab heading="Sass"><div class="highlight"><pre>\n' +
    '				<code class="language-css" prism="">@import &quot;../../bower_components/x1-ui-bootstrap/app/src/x1-ui-sass-tools&quot;;\n' +
    '\n' +
    '.x1-slider-demo {\n' +
    '	.form-slider {\n' +
    '		margin-bottom: 50px;\n' +
    '	}\n' +
    '}</code>\n' +
    '			</pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.slider');
} catch (e) {
  module = angular.module('x1.ui.slider', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('slider/examples/vertical.demo.html',
    '<h3>Vertical range (night mode)</h3><p>For a vertical slider set <code>orientation="vertical"</code> and <code>class="x1-slider-night-mode"</code> to display on a dark background.</p><div ng-controller="VerticalSliderDemoCtrl" class="bs-example bs-example-night-mode"><form class="row"><div class="form-group form-slider col-xs-6"><x1-slider ng-from="demoValues[0]" ng-to="demoValues[1]" range="options.range" format="options.format" orientation="options.orientation" pips="options.pips" tooltips="options.tooltips" connect="options.connect" class="x1-slider-night-mode"></x1-slider></div><div class="form-group col-xs-4"><label for="horizontalExample1">Minimum</label> <input id="horizontalExample1" type="number" class="form-control" ng-model="demoValues[0]" min="{{options.range.min}}" max="{{options.range.max}}"></div><div class="form-group col-xs-4"><label for="horizontalExample2">Maximum</label> <input id="horizontalExample2" type="number" class="form-control" ng-model="demoValues[1]" min="{{options.range.min}}" max="{{options.range.max}}"></div></form></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;form class=&quot;row&quot;&gt;\n' +
    '	&lt;div class=&quot;form-group form-slider col-xs-6&quot;&gt;\n' +
    '		&lt;x1-slider ng-from=&quot;demoValues[0]&quot; ng-to=&quot;demoValues[1]&quot; range=&quot;options.range&quot; format=&quot;options.format&quot;\n' +
    '				orientation=&quot;options.orientation&quot; pips=&quot;options.pips&quot; tooltips=&quot;options.tooltips&quot;\n' +
    '				connect=&quot;options.connect&quot; class=&quot;x1-slider-night-mode&quot;&gt;&lt;/x1-slider&gt;\n' +
    '	&lt;/div&gt;\n' +
    '	&lt;div class=&quot;form-group col-xs-4&quot;&gt;\n' +
    '		&lt;label for=&quot;horizontalExample1&quot;&gt;Minimum&lt;/label&gt;\n' +
    '		&lt;input id=&quot;horizontalExample1&quot; type=&quot;number&quot; class=&quot;form-control&quot; ng-model=&quot;demoValues[0]&quot;\n' +
    '				min=&quot;{{<span>options.range.min</span>}}&quot; max=&quot;{{<span>options.range.max</span>}}&quot;&gt;\n' +
    '	&lt;/div&gt;\n' +
    '	&lt;div class=&quot;form-group col-xs-4&quot;&gt;\n' +
    '		&lt;label for=&quot;horizontalExample2&quot;&gt;Maximum&lt;/label&gt;\n' +
    '		&lt;input id=&quot;horizontalExample2&quot; type=&quot;number&quot; class=&quot;form-control&quot; ng-model=&quot;demoValues[1]&quot;\n' +
    '				min=&quot;{{<span>options.range.min</span>}}&quot; max=&quot;{{<span>options.range.max</span>}}&quot;&gt;\n' +
    '	&lt;/div&gt;\n' +
    '&lt;/form&gt;</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre>\n' +
    '				<code class="language-js" prism="">angular\n' +
    '	.module("x1.ui.slider.demo", [\n' +
    '		"prism",\n' +
    '		"ui.bootstrap.tabs",\n' +
    '		"ui.bootstrap.tpls",\n' +
    '		"x1.ui.demo-generator",\n' +
    '		"x1.ui.slider"\n' +
    '	])\n' +
    '	.controller("VerticalSliderDemoCtrl", ["$scope",\n' +
    '		function($scope) {\n' +
    '			"use strict";\n' +
    '\n' +
    '			// init value\n' +
    '			$scope.demoValues = [1, 4];\n' +
    '\n' +
    '			// format options\n' +
    '			$scope.formatTo = function(value) {\n' +
    '				return "$" + parseFloat(value).toFixed(2);\n' +
    '			};\n' +
    '			$scope.formatFrom = function(value) {\n' +
    '				return value.replace("$", "");\n' +
    '			};\n' +
    '\n' +
    '			// set custom options\n' +
    '			$scope.options = {\n' +
    '				tooltips: true,\n' +
    '				connect: true,\n' +
    '				format: {\n' +
    '					to: $scope.formatTo,\n' +
    '					from: $scope.formatFrom\n' +
    '				},\n' +
    '				range: {\n' +
    '					min: 0,\n' +
    '					max: 5\n' +
    '				},\n' +
    '				pips: {\n' +
    '					mode: "count",\n' +
    '					values: 6,\n' +
    '					density: 5,\n' +
    '					format: {\n' +
    '						to: $scope.formatTo,\n' +
    '						from: $scope.formatFrom\n' +
    '					}\n' +
    '				},\n' +
    '				orientation: "vertical"\n' +
    '			};\n' +
    '		}\n' +
    '	]);</code>\n' +
    '			</pre></div></tab><tab heading="Sass"><div class="highlight"><pre>\n' +
    '				<code class="language-css" prism="">@import &quot;../../bower_components/x1-ui-bootstrap/app/src/x1-ui-sass-tools&quot;;\n' +
    '\n' +
    '.x1-slider-demo {\n' +
    '	.form-slider {\n' +
    '		margin-bottom: 50px;\n' +
    '	}\n' +
    '	.bs-example-night-mode {\n' +
    '		background-color: $gray50;\n' +
    '		color: $white;\n' +
    '\n' +
    '		&amp;:after {\n' +
    '			color: $white;\n' +
    '		}\n' +
    '	}\n' +
    '}</code>\n' +
    '			</pre></div></tab></tabset>');
}]);
})();
