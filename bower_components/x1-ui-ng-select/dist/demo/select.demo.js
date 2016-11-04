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
		"x1.ui.select.demo"
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

			$urlRouterProvider.otherwise("/select");
		}
	]);

/**
 *
 * Licensed Materials - Property of IBM
 *
 * select.demo.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.select.demo", [
		"prism",
		"ui.bootstrap.tabs",
		"ui.bootstrap.tpls",
		"x1.ui.demo-generator",
		"x1.ui.select"
	])
	.config(["$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider.state("select", {
				url: "/select",
				templateUrl: "select/select.demo.html"
			});
		}
	])
	.controller("DefaultDemoCtrl", ["$scope",
		function($scope) {
			"use strict";

			$scope.optionsSelected = [
				{"id": "2"},
				{"id": "3"}
			];
			$scope.onSelectionChange = function(value) {
				$scope.selectedValue = value;
			};
			$scope.groups = [
				{
					"id": "1",
					"name": "Everyone/Public",
					"icon": "world",
					"single": true
				},
				{
					"id": "2",
					"name": "Core analyst",
					"icon": "people-group",
					"divider":"divider-up"
				},
				{
					"id": "3",
					"name": "Development",
					"icon": "people-group",
					"divider":"divider-down"
				},
				{
					"id": "4",
					"name": "Marketing group",
					"iconUrl": "images/demo-marketing-icon.svg"
				}
			];
		}
	])
	.controller("SingleDemoCtrl", ["$scope",
		function($scope) {
			"use strict";

			$scope.selectConfig = { overflow: "auto" };
			$scope.singleGroups = [
				{
					"id": "1",
					"name": "Everyone/Public"
				},
				{
					"id": "2",
					"name": "Core analyst"
				},
				{
					"id": "3",
					"name": "Development"
				},
				{
					"id": "4",
					"name": "Marketing group",
					"iconUrl": "images/demo-marketing-icon.svg"
				},
				{
					"id": "5",
					"name": "Marketing test"
				},
				{
					"id": "6",
					"name": "Core test"
				},
				{
					"id": "7",
					"name": "Development test"
				}
			];
		}
	])
	.controller("TreeDemoCtrl", ["$scope",
		function($scope) {
			"use strict";

			$scope.treeSelected = "";
			$scope.groupsTree = [
				{
					"id": "1",
					"name": "CHINA"
				},
				{
					"id": "2",
					"name": "TAIWAN"
				},
				{
					"id": "3",
					"name": "BRAZIL",
					"groups" : [
						{
							"id": "31",
							"name": "RIO DE JANEIRO"
						},
						{
							"id": "32",
							"name": "Sao Paulo"
						},
						{
							"id": "33",
							"name": "Salvador"
						},
						{
							"id": "34",
							"name": "Goiania"
						}
					]
				},
				{
					"id": "4",
					"name": "UKRAINE",
					"groups" : [
						{
							"id": "41",
							"name": "Kyiv"
						},
						{
							"id": "42",
							"name": "Ivano-Frankivsk"
						},
						{
							"id": "43",
							"name": "Lviv"
						},
						{
							"id": "44",
							"name": "Ternopil",
							"groups" : [
								{
									"id": "441",
									"name": "Bohyt",
									"icon": "world"
								},
								{
									"id": "442",
									"name": "Zarvanytsia"
								},
								{
									"id": "443",
									"name": "Pochaiv"
								},
								{
									"id": "444",
									"name": "Shumsk"
								}
							]
						}
					]
				}
			];
			$scope.treeConfig1 = { actionType: "hover" };
		}
	])
	.controller("MultiDemoCtrl", ["$scope",
		function($scope) {
			"use strict";

			$scope.pickedOptions = [
				{"id": "2"}
			];
			$scope.multiSelectConfig = {
				checkArrowsAdded: true,
				maximumSelected: 2,
				minimumSelected: 1,
				instructionTextAdded: "x1UiNgSelectDemo.PLACEHOLDER7",
				displayMultiSelectListOnTop: true,
				orderBy: "name"
			};
			$scope.onSelectionChange = function(value) {
				$scope.selectedValue = value;
			};
			$scope.groups = [
				{
					"id": "1",
					"name": "Everyone/Public",
					"icon": "world"
				},
				{
					"id": "2",
					"name": "Core analyst",
					"icon": "people-group",
					"divider":"divider-up"
				},
				{
					"id": "3",
					"name": "Development",
					"icon": "people-group",
					"divider":"divider-down"
				},
				{
					"id": "4",
					"name": "Marketing group",
					"iconUrl": "images/demo-marketing-icon.svg"
				}
			];
		}
	]);

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
  module = angular.module('x1.ui.select');
} catch (e) {
  module = angular.module('x1.ui.select', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('select/index.rtl.html',
    '<!DOCTYPE html><html ng-app="x1.ui.demo" lang="en"><head><meta charset="UTF-8"><title>IBM Commerce Product UI Select Demo</title><link rel="stylesheet" href="vendor/vendor.css"><link rel="stylesheet" href="../x1-ui-ng-select.css"><link rel="stylesheet" href="../x1-ui-ng-select.rtl.css"><link rel="stylesheet" href="select.demo.css"></head><body dir="rtl"><section ui-view="" role="main" class="container"></section><script type="text/javascript" src="vendor/vendor.js"></script><script type="text/javascript" src="../x1-ui-ng-select.js"></script><script type="text/javascript" src="select.demo.js"></script></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.select');
} catch (e) {
  module = angular.module('x1.ui.select', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('select/select.demo.html',
    '<x1-demo-generator doc-src="\'select/select.docs.html\'" class="x1-select-demo" repo-name="x1-ui-ng-select"><ng-include src="\'select/examples/default.demo.html\'"></ng-include><ng-include src="\'select/examples/single.demo.html\'"></ng-include><ng-include src="\'select/examples/tree.demo.html\'"></ng-include><ng-include src="\'select/examples/multi.demo.html\'"></ng-include></x1-demo-generator>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.select');
} catch (e) {
  module = angular.module('x1.ui.select', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('select/select.docs.html',
    '<h3 class="page-header">Bower dependencies</h3><ul><li>angular</li><li>angular-animate</li><li>angular-bootstrap</li><li>angular-translate</li><li>x1-ui-bootstrap</li><li>x1-ui-ng-utils</li></ul><h3 class="page-header">Attribute options for <code>&lt;select&gt;</code></h3><table class="table table-striped table-condensed"><thead><tr><th>Property</th><th>Description</th><th>Required</th><th>Type</th><th>Default value</th></tr></thead><tbody><tr><td>options [{</td><td>Array of options to display in the dropdown</td><td>true</td><td>array of objects</td><td>null</td></tr><tr><td style="padding-left: 20px">id</td><td>Unique id of the option</td><td>true</td><td>string</td><td>undefined</td></tr><tr><td style="padding-left: 20px">name</td><td>Display name of the option</td><td>true</td><td>string</td><td>undefined</td></tr><tr><td style="padding-left: 20px">icon</td><td>Glyphicon to display in front of the option (without the glyphicon- prefix)</td><td>false</td><td>string</td><td>undefined</td></tr><tr><td style="padding-left: 20px">iconUrl</td><td>Custom icon path (i.e. images/icon.svg). The <code>icon</code> property will override this one if both are present. CSS styling restricts the icon height and width to <code>24px</code>.</td><td>false</td><td>string</td><td>undefined</td></tr><tr><td style="padding-left: 20px">single</td><td>If set to true will make the option a single select, else multi select</td><td>false</td><td>boolean</td><td>undefined</td></tr><tr><td colspan="5">}]</td></tr><tr><td>config {</td><td>Configuration for select</td><td>false</td><td>objects</td><td>null</td></tr><tr><td style="padding-left: 20px">overflow</td><td>Overflow for select options list (flat type only)</td><td>false</td><td>string ("auto")</td><td>undefined</td></tr><tr><td style="padding-left: 20px">handleKeyDown</td><td>Shows menu and expand nested sub-menu that starts with key pressed("tree" and "single" types only, doesn\'t support actionType:hover)</td><td>false</td><td>boolean</td><td>undefined</td></tr><tr><td style="padding-left: 20px">lazyRender</td><td>Lazy render for select options list (tree type only, doesn\'t support actionType:hover)</td><td>false</td><td>boolean</td><td>undefined</td></tr><tr><td style="padding-left: 20px">actionType</td><td>Action type for opening sub-menu (type tree only)</td><td>false</td><td>string ("hover" or event name)</td><td>undefined</td></tr><tr><td style="padding-left: 20px">overlap</td><td>If set to true, select options list will overlap other elements. It doesn\'t work for tree type</td><td>false</td><td>boolean</td><td>undefined</td></tr><tr><td style="padding-left: 20px">checkArrowsAdded</td><td>If set to true, select options list will have check arrows added.</td><td>false</td><td>boolean</td><td>undefined</td></tr><tr><td style="padding-left: 20px">maximumSelected</td><td>If set to a number value, a user can only select options up to that maximumSelected value.</td><td>false</td><td>number</td><td>undefined</td></tr><tr><td style="padding-left: 20px">minimumSelected</td><td>If set to a number value, a user can select options at least to that minimumSelected value.</td><td>false</td><td>number</td><td>undefined</td></tr><tr><td style="padding-left: 20px">instructionTextAdded</td><td>If set to a string value, the instruction text is added to dropdown list.</td><td>false</td><td>string</td><td>undefined</td></tr><tr><td style="padding-left: 20px">orderBy</td><td>If the value is not set, the dropdown list will be sorted by index(the default case). If the value is set to a value, the dropdown list will be sort by that string value. For example, if it is set to \'name\' field, the dropdown list will be sorted by name.</td><td>false</td><td>string</td><td>undefined</td></tr><tr><td style="padding-left: 20px">displayMultiSelectListOnTop</td><td>If set to be true, it will display multi selection lists on the top of the selection box. It will only work for multi selection.</td><td>false</td><td>boolean</td><td>undefined</td></tr><tr><td colspan="5">}</td></tr><tr><td>placeholder</td><td>Placeholder to display in the dropdown when no option is selected</td><td>false</td><td>string</td><td>undefined</td></tr><tr><td>ng-model</td><td>The array of selected options (if multiple options are selected) or a single option will be bound to the variable passed to this property</td><td>false</td><td>scope variable</td><td>undefined</td></tr><tr><td>type</td><td>Defines type of select component ("tree", "single" or default). When this option isn\'t defined, select works in multi select mode.</td><td>false</td><td>string</td><td>default type</td></tr><tr><td>size</td><td>Sets the height of the component.</td><td>false</td><td>string: "small" | "large"</td><td>"medium"</td></tr><tr><td>theme</td><td>Sets the color theme of the component.</td><td>false</td><td>string: "default" | "primary"</td><td>"default"</td></tr><tr><td>change-fn</td><td>Function that is bound to this parameter will be called whenever an option is selected from the select component. The first parameter "value" (selected value) will either be an object in the case single selection or will be an array of objects in the case of multi selection.</td><td>false</td><td>function</td><td>undefined</td></tr></tbody></table>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.select');
} catch (e) {
  module = angular.module('x1.ui.select', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('select/examples/default.demo.html',
    '<h3 class="page-header">Default</h3><div ng-controller="DefaultDemoCtrl" class="bs-example"><label for="selectDemo1">Share with:</label><x1-select id="selectDemo1" ng-model="optionsSelected" select-options="groups" placeholder="{{\'x1UiNgSelectDemo.PLACEHOLDER1\' | translate}}" change-fn="onSelectionChange(value)"></x1-select><hr><p class="text-muted">Preview selected value on change (changeFn): {{selectedValue}}</p></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;label for=&quot;selectDemo1&quot;&gt;Share with:&lt;/label&gt;\n' +
    '&lt;x1-select id=&quot;selectDemo1&quot; ng-model=&quot;optionsSelected&quot; select-options=&quot;groups&quot;\n' +
    '	placeholder=&quot;{{<span>\'x1UiNgSelectDemo.PLACEHOLDER1\'</span> | translate}}&quot;\n' +
    '	change-fn=&quot;onSelectionChange(value)&quot;&gt;&lt;/x1-select&gt;\n' +
    '&lt;hr&gt;\n' +
    '&lt;p class=&quot;text-muted&quot;&gt;Preview selected value on change (changeFn): {{<span>selectedValue</span>}}&lt;/p&gt;</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre><code class="language-javascript" prism="">angular\n' +
    '	.module(&quot;x1.ui.select.demo&quot;, [\n' +
    '		&quot;x1.ui.select&quot;\n' +
    '	])\n' +
    '	.controller(&quot;DefaultDemoCtrl&quot;, [&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.optionsSelected = [\n' +
    '				{&quot;id&quot;: &quot;2&quot;},\n' +
    '				{&quot;id&quot;: &quot;3&quot;}\n' +
    '			];\n' +
    '			$scope.onSelectionChange = function(value) {\n' +
    '				$scope.selectedValue = value;\n' +
    '			};\n' +
    '			$scope.groups = [\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;1&quot;,\n' +
    '					&quot;name&quot;: &quot;Everyone/Public&quot;,\n' +
    '					&quot;icon&quot;: &quot;world&quot;,\n' +
    '					&quot;single&quot;: true\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;2&quot;,\n' +
    '					&quot;name&quot;: &quot;Core analyst&quot;,\n' +
    '					&quot;icon&quot;: &quot;people-group&quot;,\n' +
    '					&quot;divider&quot;:&quot;divider-up&quot;\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;3&quot;,\n' +
    '					&quot;name&quot;: &quot;Development&quot;,\n' +
    '					&quot;icon&quot;: &quot;people-group&quot;,\n' +
    '					&quot;divider&quot;:&quot;divider-down&quot;\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;4&quot;,\n' +
    '					&quot;name&quot;: &quot;Marketing group&quot;,\n' +
    '					&quot;iconUrl&quot;: &quot;images/demo-marketing-icon.svg&quot;\n' +
    '				}\n' +
    '			];\n' +
    '		}\n' +
    '	]);</code></pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.select');
} catch (e) {
  module = angular.module('x1.ui.select', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('select/examples/multi.demo.html',
    '<h3 class="page-header">Large multi select with checkboxes</h3><div ng-controller="MultiDemoCtrl" class="bs-example"><label for="selectDemo4">Share with:</label><x1-select id="selectDemo4" ng-model="pickedOptions" select-options="groups" size="large" config="multiSelectConfig" change-fn="onSelectionChange(value)"></x1-select><hr><p class="text-muted">Preview selected value on change (changeFn): {{selectedValue}}</p></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;label for=&quot;selectDemo4&quot;&gt;Share with:&lt;/label&gt;\n' +
    '&lt;x1-select id=&quot;selectDemo4&quot; ng-model=&quot;pickedOptions&quot; select-options=&quot;groups&quot; size=&quot;large&quot;\n' +
    '	config=&quot;multiSelectConfig&quot; change-fn=&quot;onSelectionChange(value)&quot;&gt;&lt;/x1-select&gt;\n' +
    '&lt;hr&gt;\n' +
    '&lt;p class=&quot;text-muted&quot;&gt;Preview selected value on change (changeFn): {{<span>selectedValue</span>}}&lt;/p&gt;</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre><code class="language-javascript" prism="">angular\n' +
    '	.module(&quot;x1.ui.select.demo&quot;, [\n' +
    '		&quot;x1.ui.select&quot;\n' +
    '	])\n' +
    '	.controller(&quot;DefaultDemoCtrl&quot;, [&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.pickedOptions = [\n' +
    '				{&quot;id&quot;: &quot;2&quot;}\n' +
    '			];\n' +
    '			$scope.multiSelectConfig = {\n' +
    '				checkArrowsAdded: true,\n' +
    '				maximumSelected: 2,\n' +
    '				minimumSelected: 1,\n' +
    '				instructionTextAdded: &quot;x1UiNgSelectDemo.PLACEHOLDER7&quot;,\n' +
    '				displayMultiSelectListOnTop: true\n' +
    '			};\n' +
    '			$scope.onSelectionChange = function(value) {\n' +
    '				$scope.selectedValue = value;\n' +
    '			};\n' +
    '			$scope.groups = [\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;1&quot;,\n' +
    '					&quot;name&quot;: &quot;Everyone/Public&quot;,\n' +
    '					&quot;icon&quot;: &quot;world&quot;,\n' +
    '					&quot;single&quot;: true\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;2&quot;,\n' +
    '					&quot;name&quot;: &quot;Core analyst&quot;,\n' +
    '					&quot;icon&quot;: &quot;people-group&quot;,\n' +
    '					&quot;divider&quot;:&quot;divider-up&quot;\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;3&quot;,\n' +
    '					&quot;name&quot;: &quot;Development&quot;,\n' +
    '					&quot;icon&quot;: &quot;people-group&quot;,\n' +
    '					&quot;divider&quot;:&quot;divider-down&quot;\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;4&quot;,\n' +
    '					&quot;name&quot;: &quot;Marketing group&quot;,\n' +
    '					&quot;iconUrl&quot;: &quot;images/demo-marketing-icon.svg&quot;\n' +
    '				}\n' +
    '			];\n' +
    '		}\n' +
    '	]);</code></pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.select');
} catch (e) {
  module = angular.module('x1.ui.select', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('select/examples/single.demo.html',
    '<h3 class="page-header">Small primary single select</h3><div ng-controller="SingleDemoCtrl" class="bs-example"><label for="selectDemo2">Share with:</label><x1-select id="selectDemo2" type="single" config="selectConfig" size="small" theme="primary" ng-model="optionsSingleSelected" select-options="singleGroups" placeholder="{{\'x1UiNgSelectDemo.PLACEHOLDER1\' | translate}}"></x1-select></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;label for=&quot;selectDemo2&quot;&gt;Share with:&lt;/label&gt;\n' +
    '&lt;x1-select id=&quot;selectDemo2&quot; type=&quot;single&quot; config=&quot;selectConfig&quot; size=&quot;small&quot; theme=&quot;primary&quot;\n' +
    '	ng-model=&quot;optionsSingleSelected&quot; select-options=&quot;singleGroups&quot;\n' +
    '	placeholder=&quot;{{<span>\'x1UiNgSelectDemo.PLACEHOLDER1\'</span> | translate}}&quot;&gt;&lt;/x1-select&gt;</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre><code class="language-javascript" prism="">angular\n' +
    '	.module(&quot;x1.ui.select.demo&quot;, [\n' +
    '		&quot;x1.ui.select&quot;\n' +
    '	])\n' +
    '	.controller(&quot;SingleDemoCtrl&quot;, [&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.selectConfig = { overflow: &quot;auto&quot; };\n' +
    '			$scope.singleGroups = [\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;1&quot;,\n' +
    '					&quot;name&quot;: &quot;Everyone/Public&quot;\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;2&quot;,\n' +
    '					&quot;name&quot;: &quot;Core analyst&quot;\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;3&quot;,\n' +
    '					&quot;name&quot;: &quot;Development&quot;\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;4&quot;,\n' +
    '					&quot;name&quot;: &quot;Marketing group&quot;,\n' +
    '					&quot;iconUrl&quot;: &quot;images/demo-marketing-icon.svg&quot;\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;5&quot;,\n' +
    '					&quot;name&quot;: &quot;Marketing test&quot;\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;6&quot;,\n' +
    '					&quot;name&quot;: &quot;Core test&quot;\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;7&quot;,\n' +
    '					&quot;name&quot;: &quot;Development test&quot;\n' +
    '				}\n' +
    '			];\n' +
    '		}\n' +
    '	]);</code></pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.select');
} catch (e) {
  module = angular.module('x1.ui.select', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('select/examples/tree.demo.html',
    '<h3 class="page-header">Large tree view</h3><div ng-controller="TreeDemoCtrl" class="bs-example"><label for="selectDemo3">Country:</label><x1-select id="selectDemo3" select-options="groupsTree" config="treeConfig1" ng-model="treeSelected" type="tree" size="large" placeholder="{{\'x1UiNgSelectDemo.PLACEHOLDER2\' | translate}}"></x1-select><hr><p class="text-muted">Preview selected value: {{treeSelected.name}}</p></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;label for=&quot;selectDemo3&quot;&gt;Country:&lt;/label&gt;\n' +
    '&lt;x1-select id=&quot;selectDemo3&quot; select-options=&quot;groupsTree&quot; config=&quot;treeConfig1&quot;\n' +
    '	ng-model=&quot;treeSelected&quot; type=&quot;tree&quot; size=&quot;large&quot;\n' +
    '	placeholder=&quot;{{<span>\'x1UiNgSelectDemo.PLACEHOLDER2\'</span> | translate}}&quot;&gt;&lt;/x1-select&gt;\n' +
    '&lt;hr&gt;\n' +
    '&lt;p class=&quot;text-muted&quot;&gt;Preview selected value: {{<span>treeSelected.name</span>}}&lt;/p&gt;</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre><code class="language-javascript" prism="">angular\n' +
    '	.module(&quot;x1.ui.select.demo&quot;, [\n' +
    '		&quot;x1.ui.select&quot;\n' +
    '	])\n' +
    '	.controller(&quot;TreeDemoCtrl&quot;, [&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.treeSelected = &quot;&quot;;\n' +
    '			$scope.groupsTree = [\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;1&quot;,\n' +
    '					&quot;name&quot;: &quot;CHINA&quot;\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;2&quot;,\n' +
    '					&quot;name&quot;: &quot;TAIWAN&quot;\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;3&quot;,\n' +
    '					&quot;name&quot;: &quot;BRAZIL&quot;,\n' +
    '					&quot;groups&quot; : [\n' +
    '						{\n' +
    '							&quot;id&quot;: &quot;31&quot;,\n' +
    '							&quot;name&quot;: &quot;RIO DE JANEIRO&quot;\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;id&quot;: &quot;32&quot;,\n' +
    '							&quot;name&quot;: &quot;Sao Paulo&quot;\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;id&quot;: &quot;33&quot;,\n' +
    '							&quot;name&quot;: &quot;Salvador&quot;\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;id&quot;: &quot;34&quot;,\n' +
    '							&quot;name&quot;: &quot;Goiania&quot;\n' +
    '						}\n' +
    '					]\n' +
    '				},\n' +
    '				{\n' +
    '					&quot;id&quot;: &quot;4&quot;,\n' +
    '					&quot;name&quot;: &quot;UKRAINE&quot;,\n' +
    '					&quot;groups&quot; : [\n' +
    '						{\n' +
    '							&quot;id&quot;: &quot;41&quot;,\n' +
    '							&quot;name&quot;: &quot;Kyiv&quot;\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;id&quot;: &quot;42&quot;,\n' +
    '							&quot;name&quot;: &quot;Ivano-Frankivsk&quot;\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;id&quot;: &quot;43&quot;,\n' +
    '							&quot;name&quot;: &quot;Lviv&quot;\n' +
    '						},\n' +
    '						{\n' +
    '							&quot;id&quot;: &quot;44&quot;,\n' +
    '							&quot;name&quot;: &quot;Ternopil&quot;,\n' +
    '							&quot;groups&quot; : [\n' +
    '								{\n' +
    '									&quot;id&quot;: &quot;441&quot;,\n' +
    '									&quot;name&quot;: &quot;Bohyt&quot;,\n' +
    '									&quot;icon&quot;: &quot;world&quot;\n' +
    '								},\n' +
    '								{\n' +
    '									&quot;id&quot;: &quot;442&quot;,\n' +
    '									&quot;name&quot;: &quot;Zarvanytsia&quot;\n' +
    '								},\n' +
    '								{\n' +
    '									&quot;id&quot;: &quot;443&quot;,\n' +
    '									&quot;name&quot;: &quot;Pochaiv&quot;\n' +
    '								},\n' +
    '								{\n' +
    '									&quot;id&quot;: &quot;444&quot;,\n' +
    '									&quot;name&quot;: &quot;Shumsk&quot;\n' +
    '								}\n' +
    '							]\n' +
    '						}\n' +
    '					]\n' +
    '				}\n' +
    '			];\n' +
    '			$scope.treeConfig1 = { actionType: &quot;hover&quot; };\n' +
    '		}\n' +
    '	]);</code></pre></div></tab></tabset>');
}]);
})();
