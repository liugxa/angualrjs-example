angular.module("x1.ui.demo.css", [])
	.controller("CssDemoCtrl", ["$scope", "X1UiCssNavItems",
		function($scope, X1UiCssNavItems) {
			"use strict";

			$scope.cssItems = X1UiCssNavItems[0].items;
		}]);