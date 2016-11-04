angular
	.module("x1.ui.bootstrap")
	.config(["$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("badges", {
					url: "/bootstrap/badges",
					templateUrl: "badges/badges.demo.html"
				});
		}
	]);