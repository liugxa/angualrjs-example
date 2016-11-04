angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("toggle-buttons", {
					url: "/css/toggle-buttons",
					templateUrl: "toggle-buttons/toggle-buttons.demo.html"
				});
		}]);