/**
 *
 * Licensed Materials – Property of IBM
 *
 * demo.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.demo", [
		"ui.router",
		"x1.ui.searchbar.demo"
	])
	.config(["$stateProvider", "$urlRouterProvider", "$translateProvider",
		function($stateProvider, $urlRouterProvider, $translateProvider) {
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

			$urlRouterProvider.otherwise("/searchbar");
		}
	]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * searchbar.demo.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.searchbar.demo", [
		"prism",
		"ui.bootstrap.tabs",
		"ui.bootstrap.tpls",
		"x1.ui.demo-generator",
		"x1.ui.searchbar"
	])
	.config(["$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider.state("searchbar", {
				url: "/searchbar",
				templateUrl: "searchbar/searchbar.demo.html",
				controller: "searchbarDemoCtrl"
			});
		}
	])
   .controller("searchbarDemoCtrl", [
	   "$scope",
		function($scope) {
			"use strict";

			$scope.mockData= [
				{name:"Hank E.", phone:"800-555-PANKY"},
				{name:"Mary Had", phone:"800-LITTLE-LAMB"},
				{name:"Willem Dafriend", phone:"800-555-4321"},
				{name:"Reese Withoutaspoon", phone:"800-555-5678"},
				{name:"Kanye East", phone:"800-555-8765"},
				{name:"Neil Old", phone:"800-555-5678"}
			];

			$scope.options1 = {
				id: "example1Id"
			};

			$scope.outputData1= [];

			$scope.options2 = {
				id: "example2Id",
				sortField: "name",
				placeholder: "Search name"
			};

			$scope.outputData2= [];

			$scope.options3 = {
				id: "example3Id",
				exactMatch: true
			};

			$scope.outputData3= [];
		}
   ]);
angular
	.module("prism", [])
	.directive("prism", function() {
		"use strict";

		return {
			restrict: "A",
			link: function($scope, element) {
				element.ready(function() {
					Prism.highlightElement(element[0]);
				});
			}
		};
	});
(function(module) {
try {
  module = angular.module('x1.ui.searchbar');
} catch (e) {
  module = angular.module('x1.ui.searchbar', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('searchbar/searchbar.demo.html',
    '<x1-demo-generator doc-src="\'searchbar/searchbar.doc.html\'" repo-name="x1-ui-ng-searchbar" class="x1-ui-searchbar-demo"><ng-include src="\'searchbar/examples/basic.demo.html\'"></ng-include><ng-include src="\'searchbar/examples/sort-field.demo.html\'"></ng-include><ng-include src="\'searchbar/examples/exact-match.demo.html\'"></ng-include></x1-demo-generator>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.searchbar');
} catch (e) {
  module = angular.module('x1.ui.searchbar', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('searchbar/searchbar.doc.html',
    '<h3 class="page-header">Bower dependencies</h3><ul><li>angular</li><li>angular-translate</li><li>angular-translate-loader-static-files</li><li>x1-ui-bootstrap</li><li>x1-ui-ng-utils</li></ul><h3 class="page-header">Attribute options <code>&lt;x1-searchbar&gt;</code></h3><table class="table table-condensed table-striped"><thead><tr><th>Property</th><th>Description</th><th>Required</th><th>Default value</th><th>Accepted values/type</th></tr></thead><tbody><tr><td>input</td><td>Data passed in to apply search filter.</td><td>true</td><td>none</td><td>array</td></tr><tr><td>output</td><td>Data returned as a result of search filter.</td><td>true</td><td>none</td><td>array</td></tr><tr><td>options</td><td>Customizable search filter options.</td><td>true</td><td>* refer to constant code below</td><td>object</td></tr></tbody></table><h3 class="page-header">Defaults</h3><tabset><tab heading="Template"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;form class=&quot;form-group&quot;&gt;\n' +
    '	&lt;label for=&quot;{{<span>options.id</span>}}&quot; class=&quot;sr-only&quot;&gt;{{<span>options.placeholder</span>}}&lt;/label&gt;\n' +
    '	&lt;input type=&quot;search&quot; id=&quot;{{<span>options.id</span>}}&quot; class=&quot;form-control&quot; placeholder=&quot;{{<span>options.placeholder</span>}}&quot;\n' +
    '			auto-focus ng-model=&quot;searchBarValue&quot;&gt;\n' +
    '	&lt;span class=&quot;glyphicon glyphicon-search&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '	&lt;a ng-click=&quot;clearSearchBar()&quot; aria-label=&quot;Clear search&quot; tabindex=&quot;0&quot;&gt;\n' +
    '		&lt;span class=&quot;glyphicon glyphicon-remove&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '	&lt;/a&gt;\n' +
    '&lt;/form&gt;</code>\n' +
    '			</pre></div></tab><tab heading="Constant"><div class="highlight"><pre>\n' +
    '				<code class="language-js" prism="">angular\n' +
    '	.module(&quot;x1.ui.searchbar&quot;)\n' +
    '	.constant(&quot;x1.ui.searchbar.constant&quot;, {\n' +
    '		&quot;OPTIONS&quot;: {\n' +
    '			id: &quot;&quot;, // required\n' +
    '			placeholder: &quot;Search&quot;,\n' +
    '			sortField: &quot;$&quot;,\n' +
    '			exactMatch: false\n' +
    '		}\n' +
    '	});</code>\n' +
    '			</pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.searchbar');
} catch (e) {
  module = angular.module('x1.ui.searchbar', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('searchbar/examples/basic.demo.html',
    '<h3 class="page-header">Basic example</h3><div class="bs-example"><x1-searchbar input="mockData" output="outputData1" options="options1"></x1-searchbar><table class="table table-condensed"><thead><tr><th>Name</th><th>Phone</th></tr></thead><tbody><tr ng-repeat="item in outputData1"><td>{{item.name}}</td><td>{{item.phone}}</td></tr></tbody></table></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;x1-searchbar input=&quot;mockData&quot; output=&quot;outputData1&quot; options=&quot;options1&quot;&gt;&lt;/x1-searchbar&gt;\n' +
    '&lt;table class=&quot;table table-condensed&quot;&gt;\n' +
    '	&lt;thead&gt;\n' +
    '	&lt;tr&gt;&lt;th&gt;Name&lt;/th&gt;&lt;th&gt;Phone&lt;/th&gt;&lt;/tr&gt;\n' +
    '	&lt;/thead&gt;\n' +
    '	&lt;tbody&gt;\n' +
    '	&lt;tr ng-repeat=&quot;item in outputData1&quot;&gt;\n' +
    '		&lt;td&gt;{{<span>item.name</span>}}&lt;/td&gt;\n' +
    '		&lt;td&gt;{{<span>item.phone</span>}}&lt;/td&gt;\n' +
    '	&lt;/tr&gt;\n' +
    '	&lt;/tbody&gt;\n' +
    '&lt;/table&gt;</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre>\n' +
    '				<code class="language-js" prism="">angular\n' +
    '	.module(&quot;x1.ui.searchbar.demo&quot;, [\n' +
    '		&quot;x1.ui.searchbar&quot;\n' +
    '	])\n' +
    '	.controller(&quot;searchbarDemoCtrl&quot;, [\n' +
    '		&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.mockData= [\n' +
    '				{name:&quot;Hank E.&quot;, phone:&quot;800-555-PANKY&quot;},\n' +
    '				{name:&quot;Mary Had&quot;, phone:&quot;800-LITTLE-LAMB&quot;},\n' +
    '				{name:&quot;Willem Dafriend&quot;, phone:&quot;800-555-4321&quot;},\n' +
    '				{name:&quot;Reese Withoutaspoon&quot;, phone:&quot;800-555-5678&quot;},\n' +
    '				{name:&quot;Kanye East&quot;, phone:&quot;800-555-8765&quot;},\n' +
    '				{name:&quot;Neil Old&quot;, phone:&quot;800-555-5678&quot;}\n' +
    '			];\n' +
    '\n' +
    '			$scope.options1 = {\n' +
    '				id: &quot;example1Id&quot;\n' +
    '			};\n' +
    '\n' +
    '			$scope.outputData1= [];\n' +
    '		}\n' +
    '	]);</code>\n' +
    '			</pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.searchbar');
} catch (e) {
  module = angular.module('x1.ui.searchbar', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('searchbar/examples/exact-match.demo.html',
    '<h3 class="page-header">Exact match</h3><p>Searches for a substring match in case sensitive way.</p><div class="bs-example"><x1-searchbar input="mockData" output="outputData3" options="options3"></x1-searchbar><table class="table table-condensed"><thead><tr><th>Name</th><th>Phone</th></tr></thead><tbody><tr ng-repeat="item in outputData3"><td>{{item.name}}</td><td>{{item.phone}}</td></tr></tbody></table></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;x1-searchbar input=&quot;mockData&quot; output=&quot;outputData3&quot; options=&quot;options3&quot;&gt;&lt;/x1-searchbar&gt;\n' +
    '&lt;table class=&quot;table table-condensed&quot;&gt;\n' +
    '	&lt;thead&gt;\n' +
    '	&lt;tr&gt;&lt;th&gt;Name&lt;/th&gt;&lt;th&gt;Phone&lt;/th&gt;&lt;/tr&gt;\n' +
    '	&lt;/thead&gt;\n' +
    '	&lt;tbody&gt;\n' +
    '	&lt;tr ng-repeat=&quot;item in outputData3&quot;&gt;\n' +
    '		&lt;td&gt;{{<span>item.name</span>}}&lt;/td&gt;\n' +
    '		&lt;td&gt;{{<span>item.phone</span>}}&lt;/td&gt;\n' +
    '	&lt;/tr&gt;\n' +
    '	&lt;/tbody&gt;\n' +
    '&lt;/table&gt;</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre>\n' +
    '				<code class="language-js" prism="">angular\n' +
    '	.module(&quot;x1.ui.searchbar.demo&quot;, [\n' +
    '		&quot;x1.ui.searchbar&quot;\n' +
    '	])\n' +
    '	.controller(&quot;searchbarDemoCtrl&quot;, [\n' +
    '		&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.mockData= [\n' +
    '				{name:&quot;Hank E.&quot;, phone:&quot;800-555-PANKY&quot;},\n' +
    '				{name:&quot;Mary Had&quot;, phone:&quot;800-LITTLE-LAMB&quot;},\n' +
    '				{name:&quot;Willem Dafriend&quot;, phone:&quot;800-555-4321&quot;},\n' +
    '				{name:&quot;Reese Withoutaspoon&quot;, phone:&quot;800-555-5678&quot;},\n' +
    '				{name:&quot;Kanye East&quot;, phone:&quot;800-555-8765&quot;},\n' +
    '				{name:&quot;Neil Old&quot;, phone:&quot;800-555-5678&quot;}\n' +
    '			];\n' +
    '\n' +
    '			$scope.options3 = {\n' +
    '				id: &quot;example3Id&quot;,\n' +
    '				exactMatch: true\n' +
    '			};\n' +
    '\n' +
    '			$scope.outputData3= [];\n' +
    '		}\n' +
    '	]);</code>\n' +
    '			</pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.searchbar');
} catch (e) {
  module = angular.module('x1.ui.searchbar', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('searchbar/examples/sort-field.demo.html',
    '<h3 class="page-header">Sort field & custom placeholder</h3><p>Only searches name field of the input array.</p><div class="bs-example"><x1-searchbar input="mockData" output="outputData2" options="options2"></x1-searchbar><table class="table table-condensed"><thead><tr><th>Name</th><th>Phone</th></tr></thead><tbody><tr ng-repeat="item in outputData2"><td>{{item.name}}</td><td>{{item.phone}}</td></tr></tbody></table></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">&lt;x1-searchbar input=&quot;mockData&quot; output=&quot;outputData2&quot; options=&quot;options2&quot;&gt;&lt;/x1-searchbar&gt;\n' +
    '&lt;table class=&quot;table table-condensed&quot;&gt;\n' +
    '	&lt;thead&gt;\n' +
    '	&lt;tr&gt;&lt;th&gt;Name&lt;/th&gt;&lt;th&gt;Phone&lt;/th&gt;&lt;/tr&gt;\n' +
    '	&lt;/thead&gt;\n' +
    '	&lt;tbody&gt;\n' +
    '	&lt;tr ng-repeat=&quot;item in outputData2&quot;&gt;\n' +
    '		&lt;td&gt;{{<span>item.name</span>}}&lt;/td&gt;\n' +
    '		&lt;td&gt;{{<span>item.phone</span>}}&lt;/td&gt;\n' +
    '	&lt;/tr&gt;\n' +
    '	&lt;/tbody&gt;\n' +
    '&lt;/table&gt;</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre>\n' +
    '				<code class="language-js" prism="">angular\n' +
    '	.module(&quot;x1.ui.searchbar.demo&quot;, [\n' +
    '		&quot;x1.ui.searchbar&quot;\n' +
    '	])\n' +
    '	.controller(&quot;searchbarDemoCtrl&quot;, [\n' +
    '		&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.mockData= [\n' +
    '				{name:&quot;Hank E.&quot;, phone:&quot;800-555-PANKY&quot;},\n' +
    '				{name:&quot;Mary Had&quot;, phone:&quot;800-LITTLE-LAMB&quot;},\n' +
    '				{name:&quot;Willem Dafriend&quot;, phone:&quot;800-555-4321&quot;},\n' +
    '				{name:&quot;Reese Withoutaspoon&quot;, phone:&quot;800-555-5678&quot;},\n' +
    '				{name:&quot;Kanye East&quot;, phone:&quot;800-555-8765&quot;},\n' +
    '				{name:&quot;Neil Old&quot;, phone:&quot;800-555-5678&quot;}\n' +
    '			];\n' +
    '\n' +
    '			$scope.options2 = {\n' +
    '				id: &quot;example2Id&quot;,\n' +
    '				sortField: &quot;name&quot;,\n' +
    '				placeholder: &quot;Search name&quot;\n' +
    '			};\n' +
    '\n' +
    '			$scope.outputData2= [];\n' +
    '		}\n' +
    '	]);</code>\n' +
    '			</pre></div></tab></tabset>');
}]);
})();
