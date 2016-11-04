angular
	.module("x1.ui.bootstrap")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("text-fields", {
					url: "/bootstrap/text-fields",
					templateUrl: "text-fields/text-fields.demo.html"
				});
		}
	]);