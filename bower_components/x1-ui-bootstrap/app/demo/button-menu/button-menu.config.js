angular
	.module("x1.ui.bootstrap")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("button-menu", {
					url: "/bootstrap/button-menu",
					templateUrl: "button-menu/button-menu.demo.html"
				});
		}
	]);