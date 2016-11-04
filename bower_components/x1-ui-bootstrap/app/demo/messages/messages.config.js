angular
	.module("x1.ui.bootstrap")
	.config([
		"$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider
				.state("messages", {
					url: "/bootstrap/messages",
					templateUrl: "messages/messages.demo.html"
				});
		}
	]);