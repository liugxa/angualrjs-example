angular
	.module("x1.ui.bootstrap")
	.config(["$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("breadcrumbs", {
					url: "/bootstrap/breadcrumbs",
					templateUrl: "breadcrumbs/breadcrumbs.demo.html"
				});
		}
	]);