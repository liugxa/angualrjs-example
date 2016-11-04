angular
	.module("x1.ui.bootstrap")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("pagination", {
					url: "/bootstrap/pagination",
					templateUrl: "pagination/pagination.demo.html"
				});
		}
	]);