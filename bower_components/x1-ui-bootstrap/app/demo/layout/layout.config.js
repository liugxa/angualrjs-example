angular.module("x1.ui.css")
    .config([
        "$stateProvider",
        function($stateProvider) {

            $stateProvider
                .state("layout", {
                    url: "/css/layout",
                    templateUrl: "layout/layout.demo.html"
                });
        }]);
