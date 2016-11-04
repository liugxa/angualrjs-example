/**
 *
 * Licensed Materials – Property of IBM
 *
 * searchbar.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.searchbar", [
		"pascalprecht.translate",
		"ngSanitize",
		"x1.ui.utils"
	]);
angular
	.module("x1.ui.searchbar")
	.constant("x1.ui.searchbar.constant", {
		"OPTIONS": {
			id: "",
			placeholder: "Search",
			sortField: "$",
			exactMatch: false
		}
	});
/**
 *
 * Licensed Materials – Property of IBM
 *
 * searchbar.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */
angular
	.module("x1.ui.searchbar")
	.directive("x1Searchbar", [
		"x1.ui.searchbar.constant", "$filter",
		function(searchbarConstant, $filter) {
			"use strict";

			return {
				restrict: "EA",
				templateUrl: "searchbar/searchbar.html",
				scope: {
					options: "=",
					input: "=",
					output: "="
				},
				link: function($scope) {
					// set defaults
					$scope.searchBarValue = "";
					$scope.options = angular.extend({}, searchbarConstant.OPTIONS, $scope.options);

					// clear search bar model value
					$scope.clearSearchBar = function() {
						$scope.searchBarValue = "";
					};

					// watch search bar model value
					$scope.$watch("searchBarValue", function() {
						$scope.searchBarFilter();
					});

					// deep watch since $watch is watching a reference in this case
					// @todo use events instead, this is not efficient
					$scope.$watch("input", function() {
						$scope.searchBarFilter();
					}, true);

					// filter search bar output result
					$scope.searchBarFilter = function() {
						// if a user does not provide an output array, the search will not continue
						if (!$scope.output) {
							return;
						}

						var sort = {};
						var sortField = $scope.options.sortField;
						var exactMatch = $scope.options.exactMatch;

						sort[sortField] = $scope.searchBarValue;

						$scope.output = $filter("filter")($scope.input, sort, exactMatch);
					};
				}
			};
		}
	]);
(function(module) {
try {
  module = angular.module('x1.ui.searchbar');
} catch (e) {
  module = angular.module('x1.ui.searchbar', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('searchbar/searchbar.html',
    '<form class="form-group"><label for="{{options.id}}" class="sr-only">{{options.placeholder}}</label> <input type="search" id="{{options.id}}" class="form-control" placeholder="{{options.placeholder}}" auto-focus="" ng-model="searchBarValue"> <span class="glyphicon glyphicon-search" aria-hidden="true"></span> <a ng-click="clearSearchBar()" aria-label="Clear search" tabindex="0"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></form>');
}]);
})();
