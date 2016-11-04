angular
	.module("x1.ui.bootstrap")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("toggle-button-group", {
					url: "/bootstrap/toggle-button-group",
					templateUrl: "toggle-button-group/toggle-button-group.demo.html"
				});
		}
	]);