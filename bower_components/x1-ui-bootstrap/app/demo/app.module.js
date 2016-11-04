angular
    .module("x1.ui.css", [
        "prism",
        "ui.router",
		"ui.bootstrap",
		"x1.ui.demo.css",
		"rb-integration"
	])
    .config(["$stateProvider", "$urlRouterProvider", "$logProvider",
        function ($stateProvider, $urlRouterProvider, $logProvider) {
            "use strict";

            $urlRouterProvider.otherwise("/css");
            $logProvider.debugEnabled(false);
        }
    ]);