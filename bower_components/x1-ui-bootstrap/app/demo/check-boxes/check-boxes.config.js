angular
	.module("x1.ui.bootstrap")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("check-boxes", {
					url: "/bootstrap/check-boxes",
					templateUrl: "check-boxes/check-boxes.demo.html"
				});
		}
	]);