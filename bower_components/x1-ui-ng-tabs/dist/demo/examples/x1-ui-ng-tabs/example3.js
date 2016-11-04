angular
    .module("demo3", ["x1.ui.tabs"])
    .controller("demo3Ctrl", ["$scope", "TabsConstants", function ($scope, TabsConstants) {
        "use strict";
        $scope.numTabs = [1, 2, 3];
        $scope.$on(TabsConstants.ADD_NEW_TAB, function () {
            $scope.numTabs.push($scope.numTabs.length + 1);
        });
    }]);