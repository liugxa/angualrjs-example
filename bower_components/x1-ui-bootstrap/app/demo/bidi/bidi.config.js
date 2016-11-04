angular.module("x1.ui.css")
	.config([
		"$stateProvider",
		function($stateProvider) {
			$stateProvider
				.state("bidi", {
					url: "/css/bidi",
					templateUrl: "bidi/bidi.html"
				});
		}]);
