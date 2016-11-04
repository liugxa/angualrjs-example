angular
	.module("x1.ui.bootstrap")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("buttons", {
					url: "/bootstrap/buttons",
					templateUrl: "buttons/buttons.demo.html"
				});
		}
	]);