angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("dropdowns", {
					url: "/css/dropdowns",
					templateUrl: "dropdowns/dropdowns.demo.html"
				});
		}]);