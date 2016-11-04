angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("radiobuttons", {
					url: "/css/radiobuttons",
					templateUrl: "radiobuttons/radiobuttons.demo.html"
				});
		}]);