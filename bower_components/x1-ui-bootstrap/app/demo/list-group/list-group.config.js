angular
	.module("x1.ui.bootstrap")
	.config(["$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("list-group", {
					url: "/bootstrap/list-group",
					templateUrl: "list-group/list-group.demo.html"
				});
		}
	]);