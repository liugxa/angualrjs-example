/**
 *
 * Licensed Materials - Property of IBM
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
		"x1.ui.tabs.demo"
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

			$urlRouterProvider.otherwise("/tabs");
		}
	]);
/**
 *
 * Licensed Materials - Property of IBM
 *
 * tabs.demo.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.tabs.demo", [
		"prism",
		"x1.ui.demo-generator",
		"x1.ui.tabs"
	])
	.config(["$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider.state("tabs", {
				url: "/tabs",
				templateUrl: "tabs/tabs.demo.html"
			});
		}
	])
	.controller("demoInfoCtrl", ["$scope",
		function($scope) {
			"use strict";

			$scope.tab2Info = {
				name: "X1 Tab Information",
				description: "Tabs are a very useful component. They enable a compact layout and" +
				" efficient context switching."
			};
		}
	])
	.controller("demoCallbackCtrl", ["$scope", "x1.ui.tabs.constant", "$timeout",
		function($scope, TabsConstant, $timeout) {
			"use strict";

			$scope.selectTabCallback = function() {
				$scope.initMessage = "Initiated tab switch!";
				$timeout(function(){
					$scope.initMessage = null;
				}, 2000);
			};

			$scope.selectTabCallbackAfter = function() {
				$scope.completeMessage = "Completed tab switch!";
				$scope.$apply();
				$timeout(function() {
					$scope.completeMessage = null;
				}, 2000);
			};
		}
	])
	.controller("demoEditCtrl", ["$scope", "x1.ui.tabs.constant", "$timeout",
		function($scope, TabsConstant, $timeout) {
			"use strict";

			$scope.$on(TabsConstant.EVENTS.addInit, function() {
				$scope.addMessage = "Add tab button clicked!";
				$timeout(function() {
					$scope.addMessage = null;
				}, 2000);
			});
		}
	])
	.controller("demoResponsiveCtrl", ["$scope", "x1.ui.tabs.constant",
		function($scope, TabsConstant) {
			"use strict";

			$scope.numTabs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

			$scope.$on(TabsConstant.EVENTS.addInit, function() {
				$scope.numTabs.push($scope.numTabs.length + 1);
			});
		}
	]);
angular
	.module("prism", [])
	.directive("prism", [function() {
		return {
			restrict: "A",
			link: function($scope, element) {
				element.ready(function() {
					Prism.highlightElement(element[0]);
				});
			}
		};
	}]);
(function(module) {
try {
  module = angular.module('x1.ui.tabs');
} catch (e) {
  module = angular.module('x1.ui.tabs', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/index.rtl.html',
    '<!DOCTYPE html><html ng-app="x1.ui.demo"><head><meta charset="utf-8"><title>IBM Commerce Product UI Tabs Demo</title><link rel="stylesheet" href="vendor/vendor.css"><link rel="stylesheet" href="../x1-ui-ng-tabs.css"><link rel="stylesheet" href="../x1-ui-ng-tabs.rtl.css"><link rel="stylesheet" href="tabs.demo.css"><link rel="stylesheet" href="tabs.demo.rtl.css"></head><body dir="rtl"><section ui-view="" role="main" class="container"></section><script type="text/javascript" src="vendor/vendor.js"></script><script type="text/javascript" src="../x1-ui-ng-tabs.js"></script><script type="text/javascript" src="tabs.demo.js"></script></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.tabs');
} catch (e) {
  module = angular.module('x1.ui.tabs', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/tabs.demo.html',
    '<x1-demo-generator doc-src="\'tabs/tabs.doc.html\'" repo-name="x1-ui-ng-tabs" class="x1-ui-tabs-demo"><ng-include src="\'tabs/examples/position.demo.html\'"></ng-include><ng-include src="\'tabs/examples/info.demo.html\'"></ng-include><ng-include src="\'tabs/examples/callback.demo.html\'"></ng-include><ng-include src="\'tabs/examples/edit.demo.html\'"></ng-include><ng-include src="\'tabs/examples/responsive.demo.html\'"></ng-include></x1-demo-generator>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.tabs');
} catch (e) {
  module = angular.module('x1.ui.tabs', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/tabs.doc.html',
    '<h3>Bower dependencies</h3><ul><li>angular</li><li>angular-sanitize</li><li>angular-bootstrap</li><li>angular-translate</li><li>angular-translate-loader-static-files</li><li>x1-ui-bootstrap</li><li>x1-ui-ng-popover</li></ul><h3>Attribute options for &lt;x1-tabset&gt;</h3><table class="table table-condensed table-striped"><thead><tr><th>Attribute</th><th>Description</th><th>Required</th><th>Default value</th><th>Accepted values/type</th></tr></thead><tbody><tr><td>tabs-position</td><td>Sets position of tab content</td><td>true</td><td>"top"</td><td>"top" or "bottom"</td></tr><tr><td>editable</td><td>Ability to edit tab title</td><td>false</td><td>false</td><td>boolean</td></tr><tr><td>closable</td><td>Ability to close tabs</td><td>false</td><td>false</td><td>boolean</td></tr><tr><td>creatable</td><td>Ability to create a new tab</td><td>false</td><td>false</td><td>boolean</td></tr><tr><td>responsive</td><td>Allows for overflowing tabs to collapse into a dropdown tab</td><td>false</td><td>false</td><td>boolean</td></tr><tr><td>title-max-length</td><td>Maximum character length of tab title</td><td>false</td><td>none</td><td>integer</td></tr><tr><td>resize-events</td><td>Events to capture on window resize</td><td>false</td><td>none</td><td>array</td></tr></tbody></table><h3>Attribute options for &lt;x1-tab&gt;</h3><table class="table table-condensed table-striped"><thead><tr><th>Attribute</th><th>Description</th><th>Required</th><th>Default Value</th><th>Accepted Values/Type</th></tr></thead><tbody><tr><td>tab-id</td><td>Set unique ID for tab</td><td>true</td><td>none</td><td>string</td></tr><tr><td>heading</td><td>Sets title for tab</td><td>true</td><td>none</td><td>string</td></tr><tr><td>has-info</td><td>Information object which populates the popover</td><td>false</td><td>none</td><td>object with "name" and "description" keys</td></tr><tr><td>selected</td><td>Set tab content visibility</td><td>false</td><td>true (for the first tab in a set)</td><td>boolean</td></tr><tr><td>is-title-read-only</td><td>Disables editable ability for tab if editable="true" for &lt;x1-tabset&gt;</td><td>false</td><td>none</td><td>boolean</td></tr><tr><td>lazy-load*</td><td>Loads only selected tab content to the DOM</td><td>false</td><td>false</td><td>boolean</td></tr><tr><td>render-init</td><td>Callback function when initiating a tab switch</td><td>false</td><td>none</td><td>function</td></tr><tr><td>render-complete</td><td>Callback function after tab switch is complete</td><td>false</td><td>none</td><td>function</td></tr></tbody></table><h3>HTML Structure</h3><div class="highlight"><pre><code class="language-markup" prism="">&lt;x1-tabset [attributes]>\n' +
    '	&lt;x1-tab [attributes]>\n' +
    '	[content]\n' +
    '	&lt;/x1-tab>\n' +
    '	[more x1-tabs]\n' +
    '	&lt;/x1-tabset></code></pre></div><h3>Events</h3><p>Include <code>x1.ui.tabs.constant</code> in your controller to access the events listed below.</p><table class="table table-condensed table-striped"><thead><tr><th>Constant</th><th>Name</th><th>Description</th><th>Arguments (passed into event listeners)</th></tr></thead><tbody><tr><td>[yourTabConstantRef].EVENTS.selectInit</td><td>"x1.ui.tabs.select.init"</td><td>Event that will <code>$scope.$emit</code> after a click action occurs on a non-selected tab.</td><td>Tab object</td></tr><tr></tr><tr><td>[yourTabConstantRef].EVENTS.selectComplete</td><td>"x1.ui.tabs.select.complete"</td><td>Event that will <code>$scope.$emit</code> after the tab is visibly selected in the DOM.</td><td>Tab object</td></tr><tr></tr><tr><td>[yourTabConstantRef].EVENTS.closeInit</td><td>"x1.ui.tabs.close.init"</td><td>Event that will <code>$scope.$emit</code> after a click action occurs on the close button of a tab.</td><td>Tab object</td></tr><tr></tr><tr><td>[yourTabConstantRef].EVENTS.closeComplete</td><td>"x1.ui.tabs.close.complete"</td><td>Event that will <code>$scope.$emit</code> after the tab is visibly removed from the DOM.</td><td>Tab object</td></tr><tr></tr><tr><td>[yourTabConstantRef].EVENTS.addInit</td><td>"x1.ui.tabs.add.init"</td><td>Event that will <code>$scope.$emit</code> after a click action occurs on the add tab button.</td><td>Tab object</td></tr><tr></tr><tr><td>[yourTabConstantRef].EVENTS.addComplete</td><td>"x1.ui.tabs.add.complete"</td><td>Event that can sent after a new tab is visibly added to the DOM.</td><td>Tab object</td></tr><tr></tr><tr><td>[yourTabConstantRef].EVENTS.editInit</td><td>"x1.ui.tabs.edit.init"</td><td>Event that will <code>$scope.$emit</code> after a double click action occurs on a tab heading.</td><td>Tab heading</td></tr><tr></tr><tr><td>[yourTabConstantRef].EVENTS.editComplete</td><td>"x1.ui.tabs.edit.complete"</td><td>Event that will <code>$scope.$emit</code> after a heading is visibly saved in the DOM.</td><td>Tab heading</td></tr><tr></tr></tbody></table><h3>Internationalization Variables</h3><div class="highlight"><pre><code prism="" class="language-javascript">{\n' +
    '	&quot;x1UiNgTabs&quot;: {\n' +
    '	&quot;INFO_BTN&quot;: &quot;Tab information&quot;,\n' +
    '	&quot;CLOSE_BTN&quot;: &quot;Close tab&quot;,\n' +
    '	&quot;EDIT&quot;: &quot;Edit tab&quot;,\n' +
    '	&quot;EDIT_TITLE&quot;: &quot;Enter a tab title&quot;,\n' +
    '	&quot;EDIT_BTN&quot;: &quot;Save title&quot;,\n' +
    '	&quot;TOGGLE_DD&quot;: &quot;Toggle tab drop down&quot;,\n' +
    '	&quot;EXPAND_DD&quot;: &quot;Expand tab drop down&quot;,\n' +
    '	&quot;COLLAPSE_DD&quot;: &quot;Collapse tab drop down&quot;,\n' +
    '	&quot;ADD_TAB&quot;: &quot;Add new tab&quot;,\n' +
    '	&quot;aria&quot;: {\n' +
    '	&quot;TAB_LIST&quot;: &quot;Tab list&quot;,\n' +
    '	&quot;TAB_CONTENT&quot;: &quot;Tab content&quot;\n' +
    '	},\n' +
    '	&quot;info&quot;: {\n' +
    '	&quot;INFORMATION_SUMMARY&quot;: &quot;Information summary&quot;,\n' +
    '	&quot;NAME&quot;: &quot;Name:&quot;,\n' +
    '	&quot;DESCRIPTION&quot;: &quot;Description:&quot;\n' +
    '	}\n' +
    '	}\n' +
    '	}</code></pre></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.tabs');
} catch (e) {
  module = angular.module('x1.ui.tabs', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/examples/callback.demo.html',
    '<h3>Callback functions</h3><div ng-controller="demoCallbackCtrl" class="bs-example"><p ng-show="initMessage" class="bg-info">{{initMessage}}</p><p ng-show="completeMessage" class="bg-info">{{completeMessage}}</p><x1-tabset tabs-position="bottom"><x1-tab tab-id="tab1" heading="\'Tab 1\'" render-init="selectTabCallback()" render-complete="selectTabCallbackAfter()"><p>See tab 1 content</p></x1-tab><x1-tab tab-id="tab2" heading="\'Tab 2\'" render-init="selectTabCallback()" render-complete="selectTabCallbackAfter()"><p>See tab 2 content</p></x1-tab><x1-tab tab-id="tab3" heading="\'Tab 3\'" render-init="selectTabCallback()" render-complete="selectTabCallbackAfter()"><p>See tab 3 content</p></x1-tab></x1-tabset></div><tabset><tab heading="HTML"><div class="highlight"><pre><code class="language-markup" prism="">&lt;p ng-show=&quot;initMessage&quot; class=&quot;bg-info&quot;&gt;{{initMessage}}&lt;/p&gt;\n' +
    '&lt;p ng-show=&quot;completeMessage&quot; class=&quot;bg-info&quot;&gt;{{completeMessage}}&lt;/p&gt;\n' +
    '\n' +
    '&lt;x1-tabset tabs-position=&quot;bottom&quot;&gt;\n' +
    '	&lt;x1-tab tab-id=&quot;tab1&quot; heading=&quot;\'Tab 1\'&quot; render-init=&quot;selectTabCallback()&quot; render-complete=&quot;selectTabCallbackAfter()&quot;&gt;\n' +
    '		&lt;p&gt;See tab 1 content&lt;/p&gt; &lt;/x1-tab&gt;\n' +
    '	&lt;x1-tab tab-id=&quot;tab2&quot; heading=&quot;\'Tab 2\'&quot; render-init=&quot;selectTabCallback()&quot; render-complete=&quot;selectTabCallbackAfter()&quot;&gt;\n' +
    '		&lt;p&gt;See tab 2 content&lt;/p&gt;\n' +
    '	&lt;/x1-tab&gt;\n' +
    '	&lt;x1-tab tab-id=&quot;tab3&quot; heading=&quot;\'Tab 3\'&quot; render-init=&quot;selectTabCallback()&quot; render-complete=&quot;selectTabCallbackAfter()&quot;&gt;\n' +
    '		&lt;p&gt;See tab 3 content&lt;/p&gt;\n' +
    '	&lt;/x1-tab&gt;\n' +
    '&lt;/x1-tabset&gt;</code></pre></div></tab><tab heading="JS"><div class="highlight"><pre><code class="language-js" prism="">angular\n' +
    '	.module(&quot;x1.ui.tabs.demo&quot;, [&quot;prism&quot;, &quot;x1.ui.tabs&quot;])\n' +
    '	.config([&quot;$stateProvider&quot;, function($stateProvider) {\n' +
    '		&quot;use strict&quot;;\n' +
    '\n' +
    '		$stateProvider.state(&quot;tabs&quot;, {\n' +
    '			url: &quot;/tabs&quot;,\n' +
    '			templateUrl: &quot;tabs/tabs.demo.html&quot;\n' +
    '		});\n' +
    '	}])\n' +
    '	.controller(&quot;demoCallbackCtrl&quot;, [&quot;$scope&quot;, &quot;x1.ui.tabs.constant&quot;, &quot;$timeout&quot;,\n' +
    '		function($scope, TabsConstant, $timeout) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.selectTabCallback = function() {\n' +
    '				$scope.initMessage = &quot;Initiated tab switch!&quot;;\n' +
    '				$timeout(function(){ $scope.initMessage = null; }, 2000);\n' +
    '			};\n' +
    '			$scope.selectTabCallbackAfter = function() {\n' +
    '				$scope.completeMessage = &quot;Completed tab switch!&quot;;\n' +
    '				$scope.$apply();\n' +
    '				$timeout(function() { $scope.completeMessage = null; }, 2000);\n' +
    '			};\n' +
    '		}\n' +
    '	]);</code></pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.tabs');
} catch (e) {
  module = angular.module('x1.ui.tabs', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/examples/edit.demo.html',
    '<h3>Adding, closing, and editing tabs</h3><div ng-controller="demoEditCtrl" class="bs-example"><p ng-show="addMessage" class="bg-info">{{addMessage}}</p><x1-tabset tabs-position="bottom" creatable="true" closable="true" editable="true" title-max-length="50"><x1-tab tab-id="tab1" heading="\'Tab 1\'"><p>See tab 1 content</p></x1-tab><x1-tab tab-id="tab2" heading="\'Tab 2\'"><p>See tab 2 content</p></x1-tab><x1-tab tab-id="tab3" heading="\'Tab 3\'"><p>See tab 3 content</p></x1-tab></x1-tabset></div><tabset><tab heading="HTML"><div class="highlight"><pre><code class="language-markup" prism="">&lt;p ng-show=&quot;addMessage&quot; class=&quot;bg-info&quot;&gt;{{addMessage}}&lt;/p&gt;\n' +
    '&lt;x1-tabset tabs-position=&quot;bottom&quot; creatable=&quot;true&quot; closable=&quot;true&quot; editable=&quot;true&quot; title-max-length=&quot;50&quot;&gt;\n' +
    '	&lt;x1-tab tab-id=&quot;tab1&quot; heading=&quot;\'Tab 1\'&quot;&gt;\n' +
    '		&lt;p&gt;See tab 1 content&lt;/p&gt;\n' +
    '	&lt;/x1-tab&gt;\n' +
    '	&lt;x1-tab tab-id=&quot;tab2&quot; heading=&quot;\'Tab 2\'&quot;&gt;\n' +
    '		&lt;p&gt;See tab 2 content&lt;/p&gt;\n' +
    '	&lt;/x1-tab&gt;\n' +
    '	&lt;x1-tab tab-id=&quot;tab3&quot; heading=&quot;\'Tab 3\'&quot;&gt;\n' +
    '		&lt;p&gt;See tab 3 content&lt;/p&gt;\n' +
    '	&lt;/x1-tab&gt;\n' +
    '&lt;/x1-tabset&gt;</code></pre></div></tab><tab heading="JS"><div class="highlight"><pre><code class="language-js" prism="">angular\n' +
    '	.module(&quot;x1.ui.tabs.demo&quot;, [&quot;prism&quot;, &quot;x1.ui.tabs&quot;])\n' +
    '	.config([&quot;$stateProvider&quot;, function($stateProvider) {\n' +
    '		&quot;use strict&quot;;\n' +
    '\n' +
    '		$stateProvider.state(&quot;tabs&quot;, {\n' +
    '			url: &quot;/tabs&quot;,\n' +
    '			templateUrl: &quot;tabs/tabs.demo.html&quot;\n' +
    '		});\n' +
    '	}])\n' +
    '	.controller(&quot;demoEditCtrl&quot;, [&quot;$scope&quot;, &quot;x1.ui.tabs.constant&quot;, &quot;$timeout&quot;,\n' +
    '		function($scope, TabsConstant, $timeout) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.$on(TabsConstant.EVENTS.addInit, function() {\n' +
    '				$scope.addMessage = &quot;Add tab button clicked!&quot;;\n' +
    '				$timeout(function() { $scope.addMessage = null; }, 2000);\n' +
    '			});\n' +
    '		}\n' +
    '	]);</code></pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.tabs');
} catch (e) {
  module = angular.module('x1.ui.tabs', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/examples/info.demo.html',
    '<h3>Info popover</h3><div class="bs-example" ng-controller="demoInfoCtrl"><x1-tabset><x1-tab tab-id="tab1" heading="\'Tab 1\'"><p>See tab 1 content</p></x1-tab><x1-tab tab-id="tab2" heading="\'Tab 2\'" has-info="tab2Info"><p>See tab 2 content</p></x1-tab><x1-tab tab-id="tab3" heading="\'Tab 3\'"><p>See tab 3 content</p></x1-tab></x1-tabset></div><tabset><tab heading="HTML"><div class="highlight"><pre><code class="language-markup" prism="">&lt;x1-tabset&gt;\n' +
    '	&lt;x1-tab tab-id=&quot;tab1&quot; heading=&quot;\'Tab 1\'&quot;&gt;\n' +
    '		&lt;p&gt;See tab 1 content&lt;/p&gt;\n' +
    '	&lt;/x1-tab&gt;\n' +
    '	&lt;x1-tab tab-id=&quot;tab2&quot; heading=&quot;\'Tab 2\'&quot; has-info=&quot;tab2Info&quot;&gt;\n' +
    '		&lt;p&gt;See tab 2 content&lt;/p&gt;\n' +
    '	&lt;/x1-tab&gt;\n' +
    '	&lt;x1-tab tab-id=&quot;tab3&quot; heading=&quot;\'Tab 3\'&quot;&gt;\n' +
    '		&lt;p&gt;See tab 3 content&lt;/p&gt;\n' +
    '	&lt;/x1-tab&gt;\n' +
    '&lt;/x1-tabset&gt;</code></pre></div></tab><tab heading="JS"><div class="highlight"><pre><code class="language-js" prism="">angular\n' +
    '	.module(&quot;x1.ui.tabs.demo&quot;, [&quot;prism&quot;, &quot;x1.ui.tabs&quot;])\n' +
    '	.config([&quot;$stateProvider&quot;, function($stateProvider) {\n' +
    '		&quot;use strict&quot;;\n' +
    '\n' +
    '		$stateProvider.state(&quot;tabs&quot;, {\n' +
    '			url: &quot;/tabs&quot;,\n' +
    '			templateUrl: &quot;tabs/tabs.demo.html&quot;\n' +
    '		});\n' +
    '	}])\n' +
    '	.controller(&quot;demoInfoCtrl&quot;, [&quot;$scope&quot;, function($scope) {\n' +
    '		&quot;use strict&quot;;\n' +
    '\n' +
    '		$scope.tab2Info = {\n' +
    '			name: &quot;X1 Tab Information&quot;,\n' +
    '			description: &quot;Tabs are a very useful component. They enable a compact layout and efficient context switching.&quot;\n' +
    '		};\n' +
    '	}]);</code></pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.tabs');
} catch (e) {
  module = angular.module('x1.ui.tabs', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/examples/position.demo.html',
    '<h3>Bottom position</h3><div class="bs-example"><x1-tabset tabs-position="bottom"><x1-tab tab-id="tab1" heading="\'Tab 1\'"><p>See tab 1 content</p></x1-tab><x1-tab tab-id="tab2" heading="\'Tab 2\'"><p>See tab 2 content</p></x1-tab><x1-tab tab-id="tab3" heading="\'Tab 3\'"><p>See tab 3 content</p></x1-tab></x1-tabset></div><div class="highlight"><pre><code class="language-markup" prism="">&lt;x1-tabset tabs-position=&quot;bottom&quot;&gt;\n' +
    '	&lt;x1-tab tab-id=&quot;tab1&quot; heading=&quot;\'Tab 1\'&quot;&gt;\n' +
    '		&lt;p&gt;See tab 1 content&lt;/p&gt;\n' +
    '	&lt;/x1-tab&gt;\n' +
    '	&lt;x1-tab tab-id=&quot;tab2&quot; heading=&quot;\'Tab 2\'&quot;&gt;\n' +
    '		&lt;p&gt;See tab 2 content&lt;/p&gt;\n' +
    '	&lt;/x1-tab&gt;\n' +
    '	&lt;x1-tab tab-id=&quot;tab3&quot; heading=&quot;\'Tab 3\'&quot;&gt;\n' +
    '		&lt;p&gt;See tab 3 content&lt;/p&gt;\n' +
    '	&lt;/x1-tab&gt;\n' +
    '&lt;/x1-tabset&gt;</code></pre></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.tabs');
} catch (e) {
  module = angular.module('x1.ui.tabs', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/examples/responsive.demo.html',
    '<h3>Responsive tabs</h3><p>Try resizing the browser, adding tabs, and removing tabs to try out this feature.</p><div ng-controller="demoResponsiveCtrl" class="bs-example"><x1-tabset responsive="true" creatable="true" closable="true"><x1-tab ng-repeat="tab in numTabs" tab-id="tab{{tab}}" heading="\'Tab \' + tab"><p>See tab {{tab}} content</p></x1-tab></x1-tabset></div><tabset><tab heading="HTML"><div class="highlight"><pre><code class="language-markup" prism="">&lt;x1-tabset responsive=&quot;true&quot; creatable=&quot;true&quot; closable=&quot;true&quot;&gt;\n' +
    '	&lt;x1-tab ng-repeat=&quot;tab in numTabs&quot; tab-id=&quot;tab-{{<span>tab</span>}}&quot; heading=&quot;\'Tab \' + tab&quot;&gt;\n' +
    '		&lt;p&gt;See tab {{<span>tab</span>}} content&lt;/p&gt;\n' +
    '	&lt;/x1-tab&gt;\n' +
    '&lt;/x1-tabset&gt;</code></pre></div></tab><tab heading="JS"><div class="highlight"><pre><code class="language-js" prism="">angular\n' +
    '	.module(&quot;x1.ui.tabs.demo&quot;, [&quot;prism&quot;, &quot;x1.ui.tabs&quot;])\n' +
    '	.config([&quot;$stateProvider&quot;, function($stateProvider) {\n' +
    '		&quot;use strict&quot;;\n' +
    '\n' +
    '		$stateProvider.state(&quot;tabs&quot;, {\n' +
    '			url: &quot;/tabs&quot;,\n' +
    '			templateUrl: &quot;tabs/tabs.demo.html&quot;\n' +
    '		});\n' +
    '	}])\n' +
    '	.controller(&quot;demoResponsiveCtrl&quot;, [&quot;$scope&quot;, &quot;x1.ui.tabs.constant&quot;, function($scope, TabsConstant) {\n' +
    '		&quot;use strict&quot;;\n' +
    '\n' +
    '		$scope.numTabs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];\n' +
    '		$scope.$on(TabsConstant.EVENTS.addInit, function() {\n' +
    '			$scope.numTabs.push($scope.numTabs.length + 1);\n' +
    '		});\n' +
    '	}]);</code></pre></div></tab></tabset>');
}]);
})();
