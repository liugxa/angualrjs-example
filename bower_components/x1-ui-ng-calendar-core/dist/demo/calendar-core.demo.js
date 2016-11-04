/**
 *
 * Licensed Materials – Property of IBM
 *
 * calendar.demo.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core.demo", [
		"prism",
		"ui.bootstrap.tabs",
		"ui.bootstrap.tpls",
		"x1.ui.demo-generator",
		"x1.ui.calendar-core"
    ])
	.config(["$stateProvider",
		function($stateProvider) {
            "use strict";

			$stateProvider.state("calendar-core", {
				url: "/calendar-core",
				templateUrl: "calendar-core/calendar-core.demo.html"
			});
		}
	])
	.controller("demoAnyCalCtrl", ["$scope", "fiscalDataFactory",
		function($scope, fiscalDataFactory) {
			"use strict";

			$scope.fiscalAttrs = fiscalDataFactory;
			$scope.calendarDef = {
				startDate: "20150301",
				endDate: "20150304",
				view: "ANY"
			};
			$scope.$on("x1.ui.calendarDataChanged", function (evt, val) {
				$scope.example = {
					startDate : val.startDate,
					endDate : val.endDate
				};
			});
		}
	])
	.controller("demoDayCalCtrl", ["$scope",
		function($scope) {
			"use strict";

			$scope.calendarDef = {
				startDate: "201503012",
				minStartDate: "20150215",
				view: "DAY",
				singleView: true
			};
			$scope.$on("x1.ui.calendarDataChanged", function (evt, val) {
				$scope.example = {
					startDate : val.startDate,
					endDate : val.endDate
				};
			});
		}
	])
	.controller("demoWeekCalCtrl", ["$scope",
		function($scope) {
			"use strict";

			$scope.calendarDef = {
				startDate: "20150301",
				endDate: "20150304",
				minStartDate: "20140415",
				maxEndDate: "20150723",
				noEndDate: true,
				view: "WEEK"
			};
			$scope.$on("x1.ui.calendarDataChanged", function (evt, val) {
				$scope.example = {
					startDate : val.startDate,
					endDate : val.endDate
				};
			});
		}
	])
    .controller("demoMonthCalCtrl", ["$scope",
		function($scope) {
			"use strict";

			$scope.calendarDef = {
				startDate: "20150301",
				endDate: "20150707",
				maxEndDate: "20150701",
				minStartDate: "20130223",
				multiSelection: true,
				view: "MONTH"
			};
			$scope.$on("x1.ui.calendarDataChanged", function (evt, val) {
				$scope.example = {
					startDate : val.startDate,
					endDate : val.endDate
				};
			});
		}
	])
	.controller("demoQuarterCalCtrl", ["$scope",
		function($scope) {
			"use strict";

			$scope.calendarDef = {
				startDate: "20150301",
				endDate: "20150304",
				minStartDate: "20130223",
				maxEndDate: "20150723",
				view: "QUARTER"
			};
			$scope.$on("x1.ui.calendarDataChanged", function (evt, val) {
				$scope.example = {
					startDate : val.startDate,
					endDate : val.endDate
				};
			});
		}
	])
	.controller("demoYearCalCtrl", ["$scope",
		function($scope) {
			"use strict";

			$scope.calendarDef = {
				startDate: "20150301",
				endDate: "20150304",
				maxEndDate: "20150723",
				minStartDate: "20120323",
				view: "YEAR"
			};
			$scope.$on("x1.ui.calendarDataChanged", function (evt, val) {
				$scope.example = {
					startDate : val.startDate,
					endDate : val.endDate
				};
			});
		}
	])
    .factory("fiscalDataFactory", function () {
        return {
            "months": {
                "data": [
					20110601, 20110603, 20110605, 20110607, 20110609, 20110611,
                    20110613, 20110615, 20110617, 20110619, 20110621, 20110623,
                    20110625, 20110627, 20110629, 20110701, 20110801, 20110901,
                    20110927, 20110929, 20111001, 20111030, 20111101, 20111201,
                    20120101, 20120130, 20120201, 20120301, 20120330, 20120401,
                    20120429, 20120501, 20120601, 20120603, 20120605, 20120607,
                    20120609, 20120611, 20120613, 20120615, 20120617, 20120619,
                    20120621, 20120623, 20120625, 20120627, 20120629, 20120701,
                    20120801, 20120901, 20120927, 20120929, 20121001, 20121030,
                    20121101, 20121201, 20130101, 20130130, 20130201, 20130301,
                    20130330, 20130401, 20130429, 20130501, 20130601, 20130603,
                    20130605, 20130607, 20130609, 20130611, 20130613, 20130615,
                    20130617, 20130619, 20130621, 20130623, 20130625, 20130627,
					20130629, 20130701, 20130801, 20130901, 20130927, 20130929,
                    20131001, 20131030, 20131101, 20131201, 20140101, 20140130,
                    20140201, 20140301, 20140330, 20140401, 20140429, 20140501,
                    20140601, 20140603, 20140605, 20140607, 20140609, 20140611,
					20140613, 20140615, 20140617, 20140619, 20140621, 20140623,
                    20140625, 20140627, 20140629, 20140701, 20140801, 20140901,
                    20140927, 20140929, 20141001, 20141030, 20141101, 20141201,
                    20150101, 20150130, 20150201, 20150301, 20150330, 20150401,
                    20150429, 20150501, 20150601, 20150603, 20150605, 20150607,
                    20150609, 20150611, 20150613, 20150615, 20150617, 20150619,
                    20150621, 20150623, 20150625, 20150627, 20150629, 20150701,
                    20150801, 20150901, 20150927, 20150929, 20151001, 20151030
                ],
                "startID": 201101
            },
            "quarters": {
                "data": [
					20110601, 20110901, 20111201, 20120301, 20120601, 20120901,
					20121201, 20130301, 20130601, 20130901, 20131201, 20140301,
					20140601, 20140901, 20141201, 20150301, 20150601, 20150901,
					20151201
                ],
                "startID": 20111
            },
            "years": {
                "yearCountMonths": [32, 32, 32, 32, 21],
                "firstDayOfWeeks": [6, 6, 6, 6, 6],
                "nonStandard": [true, true, true, true, true],
                "data": [20110601, 20120601, 20130601, 20140601, 20150601, 20160601],
                "yearStartMonths": [6, 6, 6, 6, 6],
                "startID": 2011
            },
            "weeks": {
                "data": [
					20110601, 20110603, 20110610, 20110617, 20110624, 20110701,
					20110708, 20110715, 20110722, 20110729, 20110805, 20110812,
					20110819, 20110826, 20110902, 20110909, 20110916, 20110923,
					20110930, 20111007, 20111014, 20111021, 20111028, 20111104,
					20111111, 20111118, 20111125, 20111202, 20111209, 20111216,
					20111223, 20111230, 20120106, 20120113, 20120120, 20120127,
					20120203, 20120210, 20120217, 20120224, 20120302, 20120309,
					20120316, 20120323, 20120330, 20120406, 20120413, 20120420,
					20120427, 20120504, 20120511, 20120518, 20120525, 20120601,
					20120608, 20120615, 20120622, 20120629, 20120706, 20120713,
					20120720, 20120727, 20120803, 20120810, 20120817, 20120824,
					20120831, 20120907, 20120914, 20120921, 20120928, 20121005,
					20121012, 20121019, 20121026, 20121102, 20121109, 20121116,
					20121123, 20121130, 20121207, 20121214, 20121221, 20121228,
					20130104, 20130111, 20130118, 20130125, 20130201, 20130208,
					20130215, 20130222, 20130301, 20130308, 20130315, 20130322,
					20130329, 20130405, 20130412, 20130419, 20130426, 20130503,
					20130510, 20130517, 20130524, 20130531, 20130601, 20130607,
					20130614, 20130621, 20130628, 20130705, 20130712, 20130719,
					20130726, 20130802, 20130809, 20130816, 20130823, 20130830,
					20130906, 20130913, 20130920, 20130927, 20131004, 20131011,
					20131018, 20131025, 20131101, 20131108, 20131115, 20131122,
					20131129, 20131206, 20131213, 20131220, 20131227, 20140103,
					20140110, 20140117, 20140124, 20140131, 20140207, 20140214,
					20140221, 20140228, 20140307, 20140314, 20140321, 20140328,
					20140404, 20140411, 20140418, 20140425, 20140502, 20140509,
					20140516, 20140523, 20140530, 20140601, 20140606, 20140613,
					20140620, 20140627, 20140704, 20140711, 20140718, 20140725,
					20140801, 20140808, 20140815, 20140822, 20140829, 20140905,
					20140912, 20140919, 20140926, 20141003, 20141010, 20141017,
					20141024, 20141031, 20141107, 20141114, 20141121, 20141128,
					20141205, 20141212, 20141219, 20141226, 20150102, 20150109,
					20150116, 20150123, 20150130, 20150206, 20150213, 20150220,
					20150227, 20150306, 20150313, 20150320, 20150327, 20150403,
					20150410, 20150417, 20150424, 20150501, 20150508, 20150515,
					20150522, 20150529, 20150601, 20150605, 20150612, 20150619,
					20150626, 20150703, 20150710, 20150717, 20150724, 20150731,
					20150807, 20150814, 20150821, 20150828, 20150904, 20150911,
					20150918, 20150925, 20151002, 20151009, 20151016, 20151023
                ]
            }
        };
    });
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
	.module("x1.ui.core-demo", [
		"ui.router",
		"x1.ui.calendar-core.demo"
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

			$urlRouterProvider.otherwise("/calendar-core");
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
	}]
);
(function(module) {
try {
  module = angular.module('x1.ui.calendar-core');
} catch (e) {
  module = angular.module('x1.ui.calendar-core', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('calendar-core/calendar-core.demo.html',
    '<x1-demo-generator repo-name="x1-ui-ng-calendar-core" doc-src="\'calendar-core/calendar-core.doc.html\'" class="x1-calendar-core-demo">\n' +
    '	<div ng-include="\'calendar-core/examples/any.demo.html\'" class="row"></div>\n' +
    '	<div ng-include="\'calendar-core/examples/day.demo.html\'" class="row"></div>\n' +
    '	<div ng-include="\'calendar-core/examples/week.demo.html\'" class="row"></div>\n' +
    '	<div ng-include="\'calendar-core/examples/month.demo.html\'" class="row"></div>\n' +
    '	<div ng-include="\'calendar-core/examples/quarter.demo.html\'" class="row"></div>\n' +
    '	<div ng-include="\'calendar-core/examples/year.demo.html\'" class="row"></div>\n' +
    '</x1-demo-generator>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.calendar-core');
} catch (e) {
  module = angular.module('x1.ui.calendar-core', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('calendar-core/calendar-core.doc.html',
    '<h3 class="page-header">Bower dependencies</h3>\n' +
    '<ul>\n' +
    '	<li>angular</li>\n' +
    '	<li>angular-moment</li>\n' +
    '	<li>angular-translate</li>\n' +
    '	<li>angular-translate-loader-static-files</li>\n' +
    '	<li>x1-ui-bootstrap</li>\n' +
    '</ul>\n' +
    '\n' +
    '<h3 class="page-header">Attribute options for &lt;x1-calendar-core&gt;</h3>\n' +
    '<table class="table table-condensed table-striped">\n' +
    '	<thead>\n' +
    '	<tr>\n' +
    '		<th>Property</th>\n' +
    '		<th>Description</th>\n' +
    '		<th>Required</th>\n' +
    '		<th>Default Value(s)</th>\n' +
    '		<th>Accepted Value(s)/Type(s)</th>\n' +
    '	</tr>\n' +
    '	</thead>\n' +
    '	<tbody>\n' +
    '	<tr>\n' +
    '		<td>no-end-date</td>\n' +
    '		<td>Set date range without end date</td>\n' +
    '		<td>False</td>\n' +
    '		<td>false</td>\n' +
    '		<td>boolean</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>date-format</td>\n' +
    '		<td>Date format</td>\n' +
    '		<td>false</td>\n' +
    '		<td>"YYYYMMDD"</td>\n' +
    '		<td>string: date formats</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>start-date</td>\n' +
    '		<td>Date selected as start</td>\n' +
    '		<td>true</td>\n' +
    '		<td>none</td>\n' +
    '		<td>Date ID in format "YYYYMMDD" or dateFormat</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>end-date</td>\n' +
    '		<td>Date selected as end</td>\n' +
    '		<td>true</td>\n' +
    '		<td>none</td>\n' +
    '		<td>Date ID in format "YYYYMMDD" or dateFormat</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>min-start-date</td>\n' +
    '		<td>For disabling previous dates</td>\n' +
    '		<td>false</td>\n' +
    '		<td>none</td>\n' +
    '		<td>Date ID in format "YYYYMMDD"or dateFormat</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>max-end-date</td>\n' +
    '		<td>For disabling next dates</td>\n' +
    '		<td>false</td>\n' +
    '		<td>none</td>\n' +
    '		<td>Date ID in format "YYYYMMDD" or dateFormat</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>view</td>\n' +
    '		<td>For selecting view</td>\n' +
    '		<td>true</td>\n' +
    '		<td>"DAY"</td>\n' +
    '		<td>string: "ANY", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR"\n' +
    '	</td></tr>\n' +
    '	<tr>\n' +
    '		<td>calendar-size</td>\n' +
    '		<td>Adds a CSS class used for selecting the calendar size</td>\n' +
    '		<td>true</td>\n' +
    '		<td>"md"</td>\n' +
    '		<td>string: "sm", "md", any\n' +
    '	</td></tr>\n' +
    '	</tbody>\n' +
    '</table>\n' +
    '\n' +
    '<h3 class="page-header">Events</h3>\n' +
    '<p>Include <code>calendarCoreConstants</code> in your controller to access the events listed below.</p>\n' +
    '<table class="table table-condensed table-striped">\n' +
    '	<thead>\n' +
    '	<tr>\n' +
    '		<th>Event</th>\n' +
    '		<th>Name</th>\n' +
    '		<th>Description</th>\n' +
    '		<th>Arguments</th>\n' +
    '	</tr>\n' +
    '	</thead>\n' +
    '	<tbody>\n' +
    '	<tr>\n' +
    '		<td>[yourCalCoreEventsRef].EVENTS.INPUT_CHANGED</td>\n' +
    '		<td>"inputChanged"</td>\n' +
    '		<td>Broadcast event to the calendar-core component when we need to change\n' +
    '			data on air</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>[yourCalCoreEventsRef].EVENTS.CALENDAR_CLICK</td>\n' +
    '		<td>"calendarClick"</td>\n' +
    '		<td>-</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>[yourCalCoreEventsRef].EVENTS.CALENDAR_DATE_CLICKED</td>\n' +
    '		<td>"x1.ui.calendarDateClicked"</td>\n' +
    '		<td>Emit event from calendar-core component when a calendar date is clicked\n' +
    '			in the day view</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>[yourCalCoreEventsRef].EVENTS.CALENDAR_DATA_CHANGED</td>\n' +
    '		<td>"x1.ui.calendarDataChanged"</td>\n' +
    '		<td>Emit event from calendar-core component when dates are changed</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>[yourCalCoreEventsRef].EVENTS.CALENDAR_DATA_UPDATE</td>\n' +
    '		<td>"x1.ui.calendarDataUpdate"</td>\n' +
    '		<td>-</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>[yourCalCoreEventsRef].EVENTS.CALENDAR_MIN_MAX_UPDATE</td>\n' +
    '		<td>"x1.ui.calendarMinMaxUpdate"</td>\n' +
    '		<td>-</td>\n' +
    '	</tr>\n' +
    '	</tbody>\n' +
    '</table>\n' +
    '\n' +
    '<h3 class="page-header">Fiscal data passed to calendar popup</h3>\n' +
    '<tabset>\n' +
    '	<tab heading="Fiscal Data JSON: Structure">\n' +
    '		<div class="highlight">\n' +
    '			<pre>\n' +
    '				<code class="language-javascript" prism>{\n' +
    '	&quot;months&quot;: {\n' +
    '		&quot;data&quot;: [], // month start dates array\n' +
    '		&quot;startID&quot;: &quot;&quot; // i.e. 201101\n' +
    '	},\n' +
    '	&quot;quarters&quot;: {\n' +
    '		&quot;data&quot;: [], // quarter start dates array\n' +
    '		&quot;startID&quot;: &quot;20111&quot; // i.e. 20111\n' +
    '	},\n' +
    '	&quot;years&quot;: {\n' +
    '		&quot;yearCountMonths&quot;: [], // month count per year\n' +
    '		&quot;firstDayOfWeeks&quot;: [], // first day of week per year\n' +
    '		&quot;nonStandard&quot;: [], // true - non-standard, false - standard year\n' +
    '		&quot;data&quot;: [], // year start dates array\n' +
    '		&quot;yearStartMonths&quot;: [], // month first number per year\n' +
    '		&quot;startID&quot;: &quot;&quot; // i.e. 2011\n' +
    '	},\n' +
    '	&quot;weeks&quot;: {\n' +
    '		&quot;data&quot;: [] // quarter start dates array\n' +
    '	}\n' +
    '}</code>\n' +
    '			</pre>\n' +
    '		</div>\n' +
    '	</tab>\n' +
    '	<tab heading="Fiscal Data JSON: Example">\n' +
    '		<div class="highlight">\n' +
    '			<pre>\n' +
    '				<code class="language-javascript" prism>angular\n' +
    '	.module(&quot;x1.ui.calendar-core.demo&quot;, [\n' +
    '		&quot;x1.ui.calendar-core&quot;\n' +
    '	])\n' +
    '	.factory(&quot;fiscalDataFactory&quot;, function () {\n' +
    '		return {\n' +
    '			&quot;months&quot;: {\n' +
    '				&quot;data&quot;: [\n' +
    '					20110601, 20110603, 20110605, 20110607, 20110609, 20110611,\n' +
    '					20110613, 20110615, 20110617, 20110619, 20110621, 20110623,\n' +
    '					20110625, 20110627, 20110629, 20110701, 20110801, 20110901,\n' +
    '					20110927, 20110929, 20111001, 20111030, 20111101, 20111201,\n' +
    '					20120101, 20120130, 20120201, 20120301, 20120330, 20120401,\n' +
    '					20120429, 20120501, 20120601, 20120603, 20120605, 20120607,\n' +
    '					20120609, 20120611, 20120613, 20120615, 20120617, 20120619,\n' +
    '					20120621, 20120623, 20120625, 20120627, 20120629, 20120701,\n' +
    '					20120801, 20120901, 20120927, 20120929, 20121001, 20121030,\n' +
    '					20121101, 20121201, 20130101, 20130130, 20130201, 20130301,\n' +
    '					20130330, 20130401, 20130429, 20130501, 20130601, 20130603,\n' +
    '					20130605, 20130607, 20130609, 20130611, 20130613, 20130615,\n' +
    '					20130617, 20130619, 20130621, 20130623, 20130625, 20130627,\n' +
    '					20130629, 20130701, 20130801, 20130901, 20130927, 20130929,\n' +
    '					20131001, 20131030, 20131101, 20131201, 20140101, 20140130,\n' +
    '					20140201, 20140301, 20140330, 20140401, 20140429, 20140501,\n' +
    '					20140601, 20140603, 20140605, 20140607, 20140609, 20140611,\n' +
    '					20140613, 20140615, 20140617, 20140619, 20140621, 20140623,\n' +
    '					20140625, 20140627, 20140629, 20140701, 20140801, 20140901,\n' +
    '					20140927, 20140929, 20141001, 20141030, 20141101, 20141201,\n' +
    '					20150101, 20150130, 20150201, 20150301, 20150330, 20150401,\n' +
    '					20150429, 20150501, 20150601, 20150603, 20150605, 20150607,\n' +
    '					20150609, 20150611, 20150613, 20150615, 20150617, 20150619,\n' +
    '					20150621, 20150623, 20150625, 20150627, 20150629, 20150701,\n' +
    '					20150801, 20150901, 20150927, 20150929, 20151001, 20151030\n' +
    '				],\n' +
    '				&quot;startID&quot;: 201101\n' +
    '			},\n' +
    '			&quot;quarters&quot;: {\n' +
    '				&quot;data&quot;: [\n' +
    '					20110601, 20110901, 20111201, 20120301, 20120601, 20120901,\n' +
    '					20121201, 20130301, 20130601, 20130901, 20131201, 20140301,\n' +
    '					20140601, 20140901, 20141201, 20150301, 20150601, 20150901,\n' +
    '					20151201\n' +
    '				],\n' +
    '				&quot;startID&quot;: 20111\n' +
    '			},\n' +
    '			&quot;years&quot;: {\n' +
    '				&quot;yearCountMonths&quot;: [32, 32, 32, 32, 21],\n' +
    '				&quot;firstDayOfWeeks&quot;: [6, 6, 6, 6, 6],\n' +
    '				&quot;nonStandard&quot;: [true, true, true, true, true],\n' +
    '				&quot;data&quot;: [20110601, 20120601, 20130601, 20140601, 20150601, 20160601],\n' +
    '				&quot;yearStartMonths&quot;: [6, 6, 6, 6, 6],\n' +
    '				&quot;startID&quot;: 2011\n' +
    '			},\n' +
    '			&quot;weeks&quot;: {\n' +
    '				&quot;data&quot;: [\n' +
    '					20110601, 20110603, 20110610, 20110617, 20110624, 20110701,\n' +
    '					20110708, 20110715, 20110722, 20110729, 20110805, 20110812,\n' +
    '					20110819, 20110826, 20110902, 20110909, 20110916, 20110923,\n' +
    '					20110930, 20111007, 20111014, 20111021, 20111028, 20111104,\n' +
    '					20111111, 20111118, 20111125, 20111202, 20111209, 20111216,\n' +
    '					20111223, 20111230, 20120106, 20120113, 20120120, 20120127,\n' +
    '					20120203, 20120210, 20120217, 20120224, 20120302, 20120309,\n' +
    '					20120316, 20120323, 20120330, 20120406, 20120413, 20120420,\n' +
    '					20120427, 20120504, 20120511, 20120518, 20120525, 20120601,\n' +
    '					20120608, 20120615, 20120622, 20120629, 20120706, 20120713,\n' +
    '					20120720, 20120727, 20120803, 20120810, 20120817, 20120824,\n' +
    '					20120831, 20120907, 20120914, 20120921, 20120928, 20121005,\n' +
    '					20121012, 20121019, 20121026, 20121102, 20121109, 20121116,\n' +
    '					20121123, 20121130, 20121207, 20121214, 20121221, 20121228,\n' +
    '					20130104, 20130111, 20130118, 20130125, 20130201, 20130208,\n' +
    '					20130215, 20130222, 20130301, 20130308, 20130315, 20130322,\n' +
    '					20130329, 20130405, 20130412, 20130419, 20130426, 20130503,\n' +
    '					20130510, 20130517, 20130524, 20130531, 20130601, 20130607,\n' +
    '					20130614, 20130621, 20130628, 20130705, 20130712, 20130719,\n' +
    '					20130726, 20130802, 20130809, 20130816, 20130823, 20130830,\n' +
    '					20130906, 20130913, 20130920, 20130927, 20131004, 20131011,\n' +
    '					20131018, 20131025, 20131101, 20131108, 20131115, 20131122,\n' +
    '					20131129, 20131206, 20131213, 20131220, 20131227, 20140103,\n' +
    '					20140110, 20140117, 20140124, 20140131, 20140207, 20140214,\n' +
    '					20140221, 20140228, 20140307, 20140314, 20140321, 20140328,\n' +
    '					20140404, 20140411, 20140418, 20140425, 20140502, 20140509,\n' +
    '					20140516, 20140523, 20140530, 20140601, 20140606, 20140613,\n' +
    '					20140620, 20140627, 20140704, 20140711, 20140718, 20140725,\n' +
    '					20140801, 20140808, 20140815, 20140822, 20140829, 20140905,\n' +
    '					20140912, 20140919, 20140926, 20141003, 20141010, 20141017,\n' +
    '					20141024, 20141031, 20141107, 20141114, 20141121, 20141128,\n' +
    '					20141205, 20141212, 20141219, 20141226, 20150102, 20150109,\n' +
    '					20150116, 20150123, 20150130, 20150206, 20150213, 20150220,\n' +
    '					20150227, 20150306, 20150313, 20150320, 20150327, 20150403,\n' +
    '					20150410, 20150417, 20150424, 20150501, 20150508, 20150515,\n' +
    '					20150522, 20150529, 20150601, 20150605, 20150612, 20150619,\n' +
    '					20150626, 20150703, 20150710, 20150717, 20150724, 20150731,\n' +
    '					20150807, 20150814, 20150821, 20150828, 20150904, 20150911,\n' +
    '					20150918, 20150925, 20151002, 20151009, 20151016, 20151023\n' +
    '				]\n' +
    '			}\n' +
    '		};\n' +
    '	});</code>\n' +
    '			</pre>\n' +
    '		</div>\n' +
    '	</tab>\n' +
    '</tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.calendar-core');
} catch (e) {
  module = angular.module('x1.ui.calendar-core', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('calendar-core/examples/any.demo.html',
    '<h3 class="page-header">Any calendar - fiscal</h3>\n' +
    '<div ng-controller="demoAnyCalCtrl" class="bs-example col-md-6">\n' +
    '	<span class="sr-only">Selected Date(s):</span>\n' +
    '	<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>\n' +
    '	<span>{{example.startDate}} - {{example.endDate}}</span>\n' +
    '	<x1-calendar-core definition="calendarDef" fiscal-data="fiscalAttrs"></x1-calendar-core>\n' +
    '</div>\n' +
    '<tabset class="col-md-6">\n' +
    '	<tab heading="HTML">\n' +
    '		<div class="highlight"><pre><code class="language-markup" prism>&lt;span class=&quot;sr-only&quot;&gt;Selected Date(s):&lt;/span&gt;\n' +
    '&lt;span class=&quot;glyphicon glyphicon-calendar&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '&lt;span&gt;{{<span>example.startDate}} - {{</span>example.endDate}}&lt;/span&gt;\n' +
    '&lt;x1-calendar-core definition=&quot;calendarDef&quot; fiscal-data=&quot;fiscalAttrs&quot;&gt;&lt;/x1-calendar-core&gt;</code></pre></div>\n' +
    '	</tab>\n' +
    '	<tab heading="JS">\n' +
    '		<div class="highlight"><pre><code class="language-javascript" prism>angular\n' +
    '	.module(&quot;x1.ui.calendar-core.demo&quot;, [\n' +
    '		&quot;x1.ui.calendar-core&quot;\n' +
    '	])\n' +
    '	.controller(&quot;demoAnyCalCtrl&quot;, [&quot;$scope&quot;, &quot;fiscalDataFactory&quot;,\n' +
    '		function($scope, fiscalDataFactory) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.fiscalAttrs = fiscalDataFactory;\n' +
    '			$scope.calendarDef = {\n' +
    '				startDate: &quot;20150301&quot;,\n' +
    '				endDate: &quot;20150304&quot;,\n' +
    '				view: &quot;ANY&quot;\n' +
    '			};\n' +
    '			$scope.$on(&quot;x1.ui.calendarDataChanged&quot;, function (evt, val) {\n' +
    '				$scope.example = {\n' +
    '					startDate : val.startDate,\n' +
    '					endDate : val.endDate\n' +
    '				};\n' +
    '			});\n' +
    '		}\n' +
    '	]);</code></pre></div>\n' +
    '	</tab>\n' +
    '</tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.calendar-core');
} catch (e) {
  module = angular.module('x1.ui.calendar-core', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('calendar-core/examples/day.demo.html',
    '<h3 class="page-header">Day calendar - single view</h3>\n' +
    '<div ng-controller="demoDayCalCtrl" class="bs-example col-md-6">\n' +
    '	<span class="sr-only">Selected Date(s):</span>\n' +
    '	<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>\n' +
    '	<span>{{example.startDate}} - {{example.endDate}}</span>\n' +
    '	<x1-calendar-core definition="calendarDef"></x1-calendar-core>\n' +
    '</div>\n' +
    '<tabset class="col-md-6">\n' +
    '	<tab heading="HTML">\n' +
    '		<div class="highlight"><pre><code class="language-markup" prism>&lt;span class=&quot;sr-only&quot;&gt;Selected Date(s):&lt;/span&gt;\n' +
    '&lt;span class=&quot;glyphicon glyphicon-calendar&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '&lt;span&gt;{{<span>example.startDate}} - {{</span>example.endDate}}&lt;/span&gt;\n' +
    '&lt;x1-calendar-core definition=&quot;calendarDef&quot;&gt;&lt;/x1-calendar-core&gt;</code></pre></div>\n' +
    '	</tab>\n' +
    '	<tab heading="JS">\n' +
    '		<div class="highlight"><pre><code class="language-javascript" prism>angular\n' +
    '	.module(&quot;x1.ui.calendar-core.demo&quot;, [\n' +
    '		&quot;x1.ui.calendar-core&quot;\n' +
    '	])\n' +
    '	.controller(&quot;demoDayCalCtrl&quot;, [&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.calendarDef = {\n' +
    '				startDate: &quot;201503012&quot;,\n' +
    '				minStartDate: &quot;20150215&quot;,\n' +
    '				view: &quot;DAY&quot;,\n' +
    '				singleView: true\n' +
    '			};\n' +
    '			$scope.$on(&quot;x1.ui.calendarDataChanged&quot;, function (evt, val) {\n' +
    '				$scope.example = {\n' +
    '					startDate : val.startDate,\n' +
    '					endDate : val.endDate\n' +
    '				};\n' +
    '			});\n' +
    '		}\n' +
    '	]);</code></pre></div>\n' +
    '	</tab>\n' +
    '</tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.calendar-core');
} catch (e) {
  module = angular.module('x1.ui.calendar-core', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('calendar-core/examples/month.demo.html',
    '<h3 class="page-header">Month calendar - with multi-selection</h3>\n' +
    '<div ng-controller="demoMonthCalCtrl" class="bs-example col-md-6">\n' +
    '	<span class="sr-only">Selected Date(s):</span>\n' +
    '	<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>\n' +
    '	<span>{{example.startDate}} - {{example.endDate}}</span>\n' +
    '	<x1-calendar-core definition="calendarDef"></x1-calendar-core>\n' +
    '</div>\n' +
    '<tabset class="col-md-6">\n' +
    '	<tab heading="HTML">\n' +
    '		<div class="highlight"><pre><code class="language-markup" prism>&lt;span class=&quot;sr-only&quot;&gt;Selected Date(s):&lt;/span&gt;\n' +
    '&lt;span class=&quot;glyphicon glyphicon-calendar&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '&lt;span&gt;{{<span>example.startDate}} - {{</span>example.endDate}}&lt;/span&gt;\n' +
    '&lt;x1-calendar-core definition=&quot;calendarDef&quot;&gt;&lt;/x1-calendar-core&gt;</code></pre></div>\n' +
    '	</tab>\n' +
    '	<tab heading="JS">\n' +
    '		<div class="highlight"><pre><code class="language-javascript" prism>angular\n' +
    '	.module(&quot;x1.ui.calendar-core.demo&quot;, [\n' +
    '		&quot;x1.ui.calendar-core&quot;\n' +
    '	])\n' +
    '	.controller(&quot;demoMonthCalCtrl&quot;, [&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.calendarDef = {\n' +
    '				startDate: &quot;20150301&quot;,\n' +
    '				endDate: &quot;20150707&quot;,\n' +
    '				maxEndDate: &quot;20150701&quot;,\n' +
    '				minStartDate: &quot;20130223&quot;,\n' +
    '				multiSelection: true,\n' +
    '				view: &quot;MONTH&quot;\n' +
    '			};\n' +
    '			$scope.$on(&quot;x1.ui.calendarDataChanged&quot;, function (evt, val) {\n' +
    '				$scope.example = {\n' +
    '					startDate : val.startDate,\n' +
    '					endDate : val.endDate\n' +
    '				};\n' +
    '			});\n' +
    '		}\n' +
    '	]);</code></pre></div>\n' +
    '	</tab>\n' +
    '</tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.calendar-core');
} catch (e) {
  module = angular.module('x1.ui.calendar-core', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('calendar-core/examples/quarter.demo.html',
    '<h3 class="page-header">Quarter calendar</h3>\n' +
    '<div ng-controller="demoQuarterCalCtrl" class="bs-example col-md-6">\n' +
    '	<span class="sr-only">Selected Date(s):</span>\n' +
    '	<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>\n' +
    '	<span>{{example.startDate}} - {{example.endDate}}</span>\n' +
    '	<x1-calendar-core definition="calendarDef"></x1-calendar-core>\n' +
    '</div>\n' +
    '<tabset class="col-md-6">\n' +
    '	<tab heading="HTML">\n' +
    '		<div class="highlight"><pre><code class="language-markup" prism>&lt;span class=&quot;sr-only&quot;&gt;Selected Date(s):&lt;/span&gt;\n' +
    '&lt;span class=&quot;glyphicon glyphicon-calendar&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '&lt;span&gt;{{<span>example.startDate}} - {{</span>example.endDate}}&lt;/span&gt;\n' +
    '&lt;x1-calendar-core definition=&quot;calendarDef&quot;&gt;&lt;/x1-calendar-core&gt;</code></pre></div>\n' +
    '	</tab>\n' +
    '	<tab heading="JS">\n' +
    '		<div class="highlight"><pre><code class="language-javascript" prism>angular\n' +
    '	.module(&quot;x1.ui.calendar-core.demo&quot;, [\n' +
    '		&quot;x1.ui.calendar-core&quot;\n' +
    '	])\n' +
    '	.controller(&quot;demoQuarterCalCtrl&quot;, [&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.calendarDef = {\n' +
    '				startDate: &quot;20150301&quot;,\n' +
    '				endDate: &quot;20150304&quot;,\n' +
    '				minStartDate: &quot;20130223&quot;,\n' +
    '				maxEndDate: &quot;20150723&quot;,\n' +
    '				view: &quot;QUARTER&quot;\n' +
    '			};\n' +
    '			$scope.$on(&quot;x1.ui.calendarDataChanged&quot;, function (evt, val) {\n' +
    '				$scope.example = {\n' +
    '					startDate : val.startDate,\n' +
    '					endDate : val.endDate\n' +
    '				};\n' +
    '			});\n' +
    '		}\n' +
    '	]);</code></pre></div>\n' +
    '	</tab>\n' +
    '</tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.calendar-core');
} catch (e) {
  module = angular.module('x1.ui.calendar-core', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('calendar-core/examples/week.demo.html',
    '<h3 class="page-header">Week calendar - without end date</h3>\n' +
    '<div ng-controller="demoWeekCalCtrl" class="bs-example col-md-6">\n' +
    '	<span class="sr-only">Selected Date(s):</span>\n' +
    '	<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>\n' +
    '	<span>{{example.startDate}} - {{example.endDate}}</span>\n' +
    '	<x1-calendar-core definition="calendarDef"></x1-calendar-core>\n' +
    '</div>\n' +
    '<tabset class="col-md-6">\n' +
    '	<tab heading="HTML">\n' +
    '		<div class="highlight"><pre><code class="language-markup" prism>&lt;span class=&quot;sr-only&quot;&gt;Selected Date(s):&lt;/span&gt;\n' +
    '&lt;span class=&quot;glyphicon glyphicon-calendar&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '&lt;span&gt;{{<span>example.startDate}} - {{</span>example.endDate}}&lt;/span&gt;\n' +
    '&lt;x1-calendar-core definition=&quot;calendarDef&quot;&gt;&lt;/x1-calendar-core&gt;</code></pre></div>\n' +
    '	</tab>\n' +
    '	<tab heading="JS">\n' +
    '		<div class="highlight"><pre><code class="language-javascript" prism>angular\n' +
    '	.module(&quot;x1.ui.calendar-core.demo&quot;, [\n' +
    '		&quot;x1.ui.calendar-core&quot;\n' +
    '	])\n' +
    '	.controller(&quot;demoWeekCalCtrl&quot;, [&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.calendarDef = {\n' +
    '				startDate: &quot;20150301&quot;,\n' +
    '				endDate: &quot;20150304&quot;,\n' +
    '				minStartDate: &quot;20140415&quot;,\n' +
    '				maxEndDate: &quot;20150723&quot;,\n' +
    '				noEndDate: true,\n' +
    '				view: &quot;WEEK&quot;\n' +
    '			};\n' +
    '			$scope.$on(&quot;x1.ui.calendarDataChanged&quot;, function (evt, val) {\n' +
    '				$scope.example = {\n' +
    '					startDate : val.startDate,\n' +
    '					endDate : val.endDate\n' +
    '				};\n' +
    '			});\n' +
    '		}\n' +
    '	]);</code></pre></div>\n' +
    '	</tab>\n' +
    '</tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.calendar-core');
} catch (e) {
  module = angular.module('x1.ui.calendar-core', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('calendar-core/examples/year.demo.html',
    '<h3 class="page-header">Year calendar</h3>\n' +
    '<div ng-controller="demoYearCalCtrl" class="bs-example col-md-6">\n' +
    '	<span class="sr-only">Selected Date(s):</span>\n' +
    '	<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>\n' +
    '	<span>{{example.startDate}} - {{example.endDate}}</span>\n' +
    '	<x1-calendar-core definition="calendarDef"></x1-calendar-core>\n' +
    '</div>\n' +
    '<tabset class="col-md-6">\n' +
    '	<tab heading="HTML">\n' +
    '		<div class="highlight"><pre><code class="language-markup" prism>&lt;span class=&quot;sr-only&quot;&gt;Selected Date(s):&lt;/span&gt;\n' +
    '&lt;span class=&quot;glyphicon glyphicon-calendar&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;\n' +
    '&lt;span&gt;{{<span>example.startDate}} - {{</span>example.endDate}}&lt;/span&gt;\n' +
    '&lt;x1-calendar-core definition=&quot;calendarDef&quot;&gt;&lt;/x1-calendar-core&gt;</code></pre></div>\n' +
    '	</tab>\n' +
    '	<tab heading="JS">\n' +
    '		<div class="highlight"><pre><code class="language-javascript" prism>angular\n' +
    '	.module(&quot;x1.ui.calendar-core.demo&quot;, [\n' +
    '		&quot;x1.ui.calendar-core&quot;\n' +
    '	])\n' +
    '	.controller(&quot;demoYearCalCtrl&quot;, [&quot;$scope&quot;,\n' +
    '		function($scope) {\n' +
    '			&quot;use strict&quot;;\n' +
    '\n' +
    '			$scope.calendarDef = {\n' +
    '				startDate: &quot;20150301&quot;,\n' +
    '				endDate: &quot;20150304&quot;,\n' +
    '				maxEndDate: &quot;20150723&quot;,\n' +
    '				minStartDate: &quot;20120323&quot;,\n' +
    '				view: &quot;YEAR&quot;\n' +
    '			};\n' +
    '			$scope.$on(&quot;x1.ui.calendarDataChanged&quot;, function (evt, val) {\n' +
    '				$scope.example = {\n' +
    '					startDate : val.startDate,\n' +
    '					endDate : val.endDate\n' +
    '				};\n' +
    '			});\n' +
    '		}\n' +
    '	]);</code></pre></div>\n' +
    '	</tab>\n' +
    '</tabset>');
}]);
})();
