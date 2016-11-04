angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("popup-help", {
					url: "/css/popup-help",
					templateUrl: "popup-help/popup-help.demo.html"
				});
		}]);