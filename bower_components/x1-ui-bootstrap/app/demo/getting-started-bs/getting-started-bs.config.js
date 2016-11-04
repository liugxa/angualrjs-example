angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {

			$stateProvider
				.state("getting-started-bs", {
					url: "/css/getting-started-bs",
					templateUrl: "getting-started-bs/getting-started-bs.demo.html"
				});
		}]);