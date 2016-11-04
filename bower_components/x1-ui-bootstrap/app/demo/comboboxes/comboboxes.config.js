angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("comboboxes", {
					url: "/css/comboboxes",
					templateUrl: "comboboxes/comboboxes.demo.html"
				});
		}]);