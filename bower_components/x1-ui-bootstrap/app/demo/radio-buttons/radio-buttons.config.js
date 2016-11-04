angular
	.module("x1.ui.bootstrap")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("radio-buttons", {
					url: "/bootstrap/radio-buttons",
					templateUrl: "radio-buttons/radio-buttons.demo.html"
				});
		}
	]);