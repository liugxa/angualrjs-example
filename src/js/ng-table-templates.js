//the template page of x1-ui-ng-grid-preference.js
//the template page of the "column setting"
(function(module) {
	try {
	  module = angular.module('x1.ui.gridpreference');
	} catch (e) {
	  module = angular.module('x1.ui.gridpreference', []);
	}
	module.run(['$templateCache', function($templateCache) {
	  $templateCache.put('gridpreference/preferencedialog/preferencedialog.html',
		'<div class="prefenceDialog"><header class="modal-header"><button type="button" class="close glyphicon glyphicon-close" ng-click="close()"></button> <span class="modal-title">{{"x1UiNgGridPreference.common.Edit"|translate}} {{viewName}}</span></header><section class="modal-body preference-modal"><div style="clear: both"></div><div class="error-msg app-set-space" ng-show="showErrorMessage"><span class="glyphicon glyphicon-warning-sign pull-left"></span> <span class="pull-left"><ul class="app-ul"><li ng-repeat="messages in errorMessage"><span ng-repeat="message in messages | limitTo: 2">{{message | translate}}</span></li></ul></span><div style="clear: both"></div></div><div><x1-tabset tabs-position="top"><x1-tab ng-if="data.showFilterSettings" render-init="renderInitFn()" render-complete="renderCompleteFn()" heading="\'x1UiNgGridPreference.common.FilterSettingLabel\' | translate" role="tab" aria-controls="\'x1UiNgGridPreference.common.FilterSettingLabel\' | translate"><x1-filtersetting options="data" filter-data="filterData"></x1-filtersetting></x1-tab><x1-tab ng-if="data.showSortSettings" render-init="renderInitFn()" render-complete="renderCompleteFn()" heading="\'x1UiNgGridPreference.common.SortSettingLabel\' | translate" role="tab" aria-controls="\'x1UiNgGridPreference.common.SortSettingLabel\' | translate"><x1-sortsetting options="data" sort-data="sortData"></x1-sortsetting></x1-tab><x1-tab ng-if="data.showColumnSettings" render-init="renderInitFn()" render-complete="renderCompleteFn()" heading="\'x1UiNgGridPreference.common.ColumnSettingLabel\' | translate" role="tab" aria-controls="\'x1UiNgGridPreference.common.ColumnSettingLabel\' | translate"><x1-column-setting options="data"></x1-column-setting></x1-tab></x1-tabset></div></section><footer class="modal-footer"><div class="prefDlgBottom"><button ng-click="onSave($event, false)" class="btn" ng-class="preferenceCtrl.selectedView.companyView ? \'btn-default\' : \'btn-primary\'" ng-disabled="preferenceCtrl.selectedView.companyView">{{\'x1UiNgGridPreference.common.Save\' | translate}}</button><button ng-click="onCancel()" class="btn btn-default">{{\'x1UiNgGridPreference.common.Cancel\' | translate}}</button></div></footer></div>');
	}]);
})();

//the template of the "drop-down menu"
(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/viewdropdown/viewdropdown.html',
    '<div class="view-dropdown"><button type="button" class="view-drop-button" placement="{{placement}}" title="" x1-popover="" content-template="gridpreference/viewdropdown/viewdropdown.template.html"><span class="x1-icon-stack-md glyphicon glyphicon-gear"></span></button></div>');
}]);
})();

//the template page of the "drop-down menu"
(function(module) {
	try {
	  module = angular.module('x1.ui.gridpreference');
	} catch (e) {
	  module = angular.module('x1.ui.gridpreference', []);
	}

	module.run(['$templateCache', function($templateCache) {
	  $templateCache.put('gridpreference/viewdropdown/viewdropdown.template.html',
		'<div ng-controller="viewDropDownPopOverCtrl"><table role="menu" class="viewDropDownPopOver"><tr style="line-height: 24px;margin-right: 10px;margin-left: 10px"><td class="contentTd"><span class="view-dropdown-name-item" title="Apply Filters" ng-click="applyFilters()">Apply Filters</span></td><td class="rightTd"><span class="glyphicon glyphicon-star" ng-show="{{isApplyFilters == true}}"></span><span class="glyphicon glyphicon-star-empty" ng-show="{{isApplyFilters == false}}"></span></td></tr><tr style="line-height: 24px;margin-right: 10px;margin-left: 10px"><td class="contentTd"><span class="view-dropdown-name-item" title="Clear Filters" ng-click="resetFilters()">Reset Filters</span></td><td class="rightTd"><span ng-show="!item.companyView" ng-click="" class="glyphicon glyphicon-trash view-dropdown-icon-item app-state-icon-hover"></span></td></tr><tr style="line-height: 24px;margin-right: 10px;margin-left: 10px"><td class="contentTd"><span class="view-dropdown-name-item" title="Columns" ng-click="showFilterSummary();">Show Filter class="rightTd"></td></tr><tr style="line-height: 24px;margin-right: 10px;margin-left: 10px"><td class="contentTd"><span class="view-dropdown-name-item" title="Columns" ng-click="showColumns()">Columns</span></td><td class="rightTd"></td></tr></table></div>');
	}]);
})();

angular.module("x1.ui.viewdropdown")
	.controller("viewDropDownPopOverCtrl", ["$scope", "shareScopes", "x1Modal",  
	function($scope, shareScopes, x1Modal) {
		
		$scope.isApplyFilters = shareScopes.get("ngTablePreference", $scope.gridId).isApplyFilters;
		
		$scope.preferenceCtrl = shareScopes.get("x1GridPreferenceCtrl", $scope.gridId);

		$scope.smallPopover = {
			settings: {
				templateUrl: "gridpreference/templates/confirmdelete.html",
				size: "sm",
				type: "warning",
				data: {}
			}
		};
		
		$scope.showFilterSummary = function() {
			$scope.$emit("x1.ui.viewdropdown.showFilters");
			$scope.close();
		};
		
		$scope.applyFilters = function(){
			$scope.$emit("x1.ui.viewdropdown.applyFilters");
			$scope.close();
		}
		
		$scope.resetFilters = function(){
			$scope.$emit("x1.ui.viewdropdown.resetFilters");
			$scope.close();
		};
		
		$scope.showColumns = function() {
			$scope.preferenceCtrl.editView();
			$scope.close();
		};

		$scope.itemDeleteClick = function(item) {
			$scope.smallPopover.data = item;
			$scope.smallPopover.data.gridId = $scope.gridId;
			x1Modal.show($scope.smallPopover);
			$scope.close();
		};

		$scope.itemRefreshClick = function(item) {
			$scope.preferenceCtrl.refreshView(item);
			$scope.close();
		};

		$scope.show = function() {
			$scope.$parent.$show();
		};

		$scope.close = function() {
			$scope.$parent.$hide();
		};	
	}
])
