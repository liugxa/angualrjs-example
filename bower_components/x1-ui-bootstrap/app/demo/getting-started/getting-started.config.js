angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("getting-started", {
					url: "/css/getting-started",
					templateUrl: "getting-started/getting-started.demo.html"
				});
		}]);