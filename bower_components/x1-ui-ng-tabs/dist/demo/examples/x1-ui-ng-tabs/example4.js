angular
    .module("demo4", ["x1.ui.tabs"])
    .controller("demo4Ctrl", ["$scope", "TabsConstants", function ($scope, TabsConstants) {
        "use strict";
        $scope.numTabs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        $scope.$on(TabsConstants.ADD_NEW_TAB, function () {
            $scope.numTabs.push($scope.numTabs.length + 1);
        });
    }]);