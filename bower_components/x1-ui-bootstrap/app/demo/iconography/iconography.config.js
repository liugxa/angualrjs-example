angular
	.module("x1.ui.bootstrap")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("iconography", {
					url: "/bootstrap/iconography",
					templateUrl: "iconography/iconography.demo.html",
					controller: "iconographyDemoCtrl"
				});
		}
	]);