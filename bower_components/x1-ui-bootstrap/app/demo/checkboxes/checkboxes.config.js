angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("checkboxes", {
					url: "/css/checkboxes",
					templateUrl: "checkboxes/checkboxes.demo.html"
				});
		}]);