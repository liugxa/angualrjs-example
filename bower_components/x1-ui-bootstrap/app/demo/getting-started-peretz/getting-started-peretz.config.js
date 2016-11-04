angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("getting-started-peretz", {
					url: "/css/getting-started-peretz",
					templateUrl: "getting-started-peretz/getting-started-peretz.demo.html"
				});
		}]);