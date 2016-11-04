angular
	.module("x1.ui.bootstrap")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("switches", {
					url: "/bootstrap/switches",
					templateUrl: "switches/switches.demo.html"
				});
		}
	]);