angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("css", {
					url: "/css",
					templateUrl: "css/css.demo.html",
					controller: "CssDemoCtrl"
				});
		}]);
