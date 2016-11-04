ngTableControllers.controller("ngTablePreference", ["$scope", "x1.ui.gridpreference.constant", 
"x1.ui.jqgrid.events", "shareScopes", "$window", "$translate", 
	function($scope, x1UiGridpreferenceDefaults, jqGridEvents, shareScopes, $window, $translate) {
		$scope.gridId = "ngTableGrid";
        $scope.service = "ngTableService";
        $scope.gridService = "jqgridService";
        $scope.viewId = "ng-table";
		$scope.placement = "bottom";
		$scope.isShowFilters = true;
		$scope.isApplyFilters = true;
		shareScopes.store("ngTablePreference", $scope, $scope.gridId);
		//$scope.preference = {"id": $scope.gridId, "filters": {}, "columns": {}};
		
		$scope.getFilters = function(){
			var r = "";
			var preferenceCtrl = shareScopes.get("x1GridPreferenceCtrl", $scope.gridId);
			if(preferenceCtrl){
				if(preferenceCtrl.gridOptions){
					var gridPreferences = preferenceCtrl.gridOptions.gridPreferences;
					r = gridPreferences.filters;
				}
			}
			return r;
		};
		
		$scope.showGridFilters = function(){
			console.log($scope.getFilters());
		}
		/*
        $scope.triggerAutoSave = function() {
            $scope.$broadcast(x1UiGridpreferenceDefaults.Events.AUTO_SAVE);
        };
		*/

        $scope.filterClearAll = function() {
            $scope.$broadcast("x1.ui.gridFilterClearAll");
        };
		
		$scope.clearPreference = function(){
			$window.localStorage.removeItem($scope.gridId + ".preference");
			console.log("$scope.localStorage....." , $window.localStorage.getItem($scope.gridId + ".preference"));
		};
		
		$scope.savePreference = function(){
			var preferenceCtrl = shareScopes.get("x1GridPreferenceCtrl", $scope.gridId);
			var results = {
				sorts :[],
				filters :[]
			};
			preferenceCtrl.sorts.forEach(function(sortData){
				results.sorts.push({
					index: sortData.index,
					sortDirection: sortData.sortCriteria.sortDirection,
					sortOrder: sortData.sortCriteria.sortOrder
				});
			});

			preferenceCtrl.filters.forEach(function(filterData){
				results.filters.push({
					index: filterData.index,
					value: filterData.filterCriteria.filter.value,
					filterOperator: filterData.filterCriteria.filterOperator,
					filterOrder: filterData.filterCriteria.filterOrder
				});
			});
			preferenceCtrl.updateResults(preferenceCtrl.configData.columns, results, true);	
			preferenceCtrl.saveConfigData(false);
		}
		
		$scope.showFilters = function(){
			$scope.isShowFilters = !$scope.isShowFilters;
		};
		
		$scope.resetFilters = function(){
			$scope.isApplyFilters = true;
			var preferenceCtrl = shareScopes.get("x1GridPreferenceCtrl", $scope.gridId);
			preferenceCtrl.switchView({id: "ng-table"});
		};
		
		$scope.applyFilters = function(){
			$scope.isApplyFilters = !$scope.isApplyFilters;
			var preferenceCtrl = shareScopes.get("x1GridPreferenceCtrl", $scope.gridId);
			
			if($scope.isApplyFilters != true){
				var prefColumns = preferenceCtrl.prefConfig.columns;
				
				//store the filters into the storge at first!
				shareScopes.store("ng.table.ngTablePreference.prefColumns", angular.copy(prefColumns), $scope.gridId);
				 
				//remove the filters
				var configColumns = preferenceCtrl.configData.columns;
				configColumns.forEach(function(configColumn) {
				   configColumn.filterCriteria = null;
				});
				
				preferenceCtrl.refreshConfig(preferenceCtrl.configData);				
			}else{
				//apply the filters
				preferenceCtrl.configData.columns = shareScopes.get("ng.table.ngTablePreference.prefColumns", $scope.gridId);
				
				preferenceCtrl.refreshConfig(preferenceCtrl.configData);					
			}
		};
		
		$scope.showColumns = function(){
			var preferenceCtrl = shareScopes.get("x1GridPreferenceCtrl", $scope.gridId);
			preferenceCtrl.editView();
		};
		
		//event triggers - filter summary
        $scope.$on("x1.ui.gridpreference.viewchange", function(event, viewData){
			if (viewData) $scope.viewName = viewData.name;
        });
		
		//get column sort of grid
		$scope.$on("x1.ui.gridTotalRows", function(event, totalRows){
			$scope.totalRows = totalRows;
		});
		
		//get selected cell of grid
		$scope.$on("x1.ui.gridChangeSize", function(event, size){
			$scope.changeSize = size;
		});
		
		//event triggers - show/apply/reset
		$scope.$on("x1.ui.viewdropdown.showFilters", function(event){
			$scope.showFilters();
		});	

		$scope.$on("x1.ui.viewdropdown.applyFilters", function(event){
			$scope.applyFilters();
		});	

		$scope.$on("x1.ui.viewdropdown.resetFilters", function(event){
			$scope.resetFilters();
		});
		
		//event triggers - perference
		$scope.$on(jqGridEvents.GRID_FILTER_CHANGED, function(event, filters){
			//$scope.preference.filters = filters;
			$scope.savePreference();
		});
		$scope.$on(jqGridEvents.GRID_COLUMN_SORT, function(event, colSorts){
			//$scope.preference.columns.sorts = colSorts;
			$scope.savePreference();
		});
		$scope.$on(jqGridEvents.GRID_COLUMN_REORDER, function(event, colReorders){
			//$scope.preference.columns.reorders = colReorders;
			$scope.savePreference();
		});	
		$scope.$on(jqGridEvents.GRID_COLUMN_STATES_CHANGED, function(event, colStates){
			//$scope.preference.columns.states = colStates;
			$scope.savePreference();
		});
	}
]);
