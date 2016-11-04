angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("button-align-place", {
					url: "/css/button-align-place",
					templateUrl: "button-align-place/button-align-place.demo.html"
				});
		}]);