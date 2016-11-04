angular
	.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("text-ui", {
					url: "/css/text-ui",
					templateUrl: "text-ui/text-ui.demo.html"
				});
		}]);