angular
    .module("x1.ui.bootstrap", [
		"ui.router",
		"ui.bootstrap",
		"x1.ui.prism",
		"x1.ui.bootstrap.demo"
	])
    .config([
		"$stateProvider", "$urlRouterProvider", "$logProvider",
        function ($stateProvider, $urlRouterProvider, $logProvider) {
            "use strict";

            $urlRouterProvider.otherwise("/bootstrap");
            $logProvider.debugEnabled(false);
        }
    ]);