angular
	.module("x1.ui.bootstrap.demo", [])
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("bootstrap", {
					url: "/bootstrap",
					templateUrl: "bootstrap/bootstrap.demo.html",
					controller: "BootstrapDemoCtrl"
				});
		}
	])
	.controller("BootstrapDemoCtrl", [
		"$scope", "x1.ui.bootstrap.components",
		function($scope, BootstrapComponents) {
			"use strict";

			$scope.bootstrapItems = BootstrapComponents;
		}
	]);