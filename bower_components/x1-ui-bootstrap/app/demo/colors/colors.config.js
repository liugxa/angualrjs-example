angular
	.module("x1.ui.bootstrap")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("colors", {
					url: "/bootstrap/colors",
					templateUrl: "colors/colors.demo.html"
				});
		}
	]);