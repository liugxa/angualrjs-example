angular
	.module("x1.ui.bootstrap")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("typography", {
					url: "/bootstrap/typography",
					templateUrl: "typography/typography.demo.html"
				});
		}
	]);