/**
    *
    * Licensed Materials - Property of IBM
    *
    * demo.module.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular
	.module("x1.ui.grid-preference.demo", [
	"agGrid",
	"ngSanitize",
	"x1.ui.prism",
	"x1.ui.jqgrid",
	"ui.bootstrap.tpls",
	"x1.ui.demo-generator",
	"x1.ui.gridpreference"
]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * common.utils.service.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular
	.module("x1.ui.grid-preference.demo")
.factory("aggridService", ["groupColumnUtilsFactory", "commonUtilsFactory",
function(GroupColumnUtils, CommonUtils) {
    var factory = {};
    // summary:
    //      Application teams must extend this method and implement the logic to
    //      set up grid complete events such as onReady, onComplete, onSort etc,
    //      as expected by your grid
    // parameters
    //      $scope: Object
    //          scope object from grid preference controller
    factory.setUpGridComplete = function($scope) {
        $scope.gridOptions.onReady = function() {
            factory.setSorts($scope);
            factory.setFilters($scope);
        };

        $scope.gridOptions.onAfterSortChanged = function() {
            if(!$scope.firstTimeLoading) {
                $scope.preferenceChanged = true;
            }
            $scope.firstTimeLoading = false;
        };

        $scope.gridOptions.onColumnResized = function(colStates) {
            $scope.preferenceChanged = true;
			var column = {
				width: colStates.column.actualWidth,
				hide: !colStates.column.visible
			}, colItem, i, l = $scope.configData.columns.length;

			for (i = 0; i < l; i++) {
				colItem = $scope.configData.columns[i];
				$scope.configData.columns[i] = $.extend(true, {}, colItem, column);
			}
        };

        $scope.gridOptions.onAfterFilterChanged = function() {
            if(!$scope.firstTimeLoading) {
                $scope.preferenceChanged = true;
            }
            $scope.firstTimeLoading = false;
            factory.getGridFilterData($scope);
        };

        if($scope.gridOptions.api) {
            $scope.gridOptions.api.setColumnDefs($scope.gridOptions.columnDefs);
            factory.setSorts($scope);
            factory.setFilters($scope);
            factory.refreshView($scope);
        }
    };

    // summary:
    //      Application teams must extend this method and implement the logic to
    //      return the column definition array, which will have updated information about
    //      the columns such as updated width from your grid API.
    // parameters
    //      $scope: Object
    //          scope object from grid preference controller
    factory.getColumnDefinition = function($scope) {
        var gridColumns = $scope.gridOptions.columnApi.getAllColumns();
        angular.forEach(gridColumns, function(column){
            column.width = column.actualWidth;
        });
        return gridColumns;
    };

    // summary:
    //      Application teams must extend this method and implement the logic to
    //      refresh the grid as expected from your grid API.
    // parameters
    //      $scope: Object
    //          scope object from grid preference controller
    factory.refreshView = function($scope) {
        $scope.gridOptions.api.refreshView();
    };

    // summary:
    //      Application teams must extend this method and implement the logic to
    //      set the columns array as expected by your grid
    // parameters
    //      $scope: Object
    //          scope object from grid preference controller
    factory.setColumns = function(/*Object*/$scope) {
        $scope.flatColumns = factory.getFlatColumns($scope.prefConfig.columns);
        // We want to retain api's, so check if gridOptions exists, then all we need is to
        // just update the columns
        var columns = $scope.prefConfig.columns;

        if($scope.gridOptions) {
            $scope.prefConfig = $scope.gridOptions;
        }
        $scope.prefConfig.columnDefs = columns;
    };

    // summary:
    //      Application teams must extend this method and implement the logic to
    //      set the data for the grid. This method should finally call
    //      $scope.setData method, so that grid preference can continue do its task
    // parameters
    //      $scope: Object
    //          flat list of columns
    factory.getGridData = function(/*Object*/$scope) {
        factory.setData($scope);
    };

    // summary:
    //      Application teams must extend this method and implement the logic to
    //      set the sorts array/object as expected by your grid
    // parameters
    //      $scope: Object
    //          scope object from grid preference controller
    factory.setSortsParam = function(/*Object*/) {
        return;
    };

    // summary:
    //      Application teams must extend this method and implement the logic to
    //      set the filters array/object as expected by your grid
    // parameters
    //      $scope: Object
    //          scope object from grid preference controller
    factory.setFiltersParam = function(/*Object*/) {
        return;
    };

    // summary:
    //      Application teams must extend this method and implement the logic to
    //      return the sorts array. In general if the sorts are applied through
    //      clicking on the grid header, the grid API will update the sorts. This
    //      method will be responsible to get the latest sorts from the grid API
    //      and construct the object which is compatible to grid preferences.
    // parameters
    //      $scope: Object
    //          scope object from grid preference controller
    factory.getGridSortData = function(/*Object*/$scope) {
        var sorts = $scope.gridOptions.api.getSortModel();
        var sortData = [];
        angular.forEach(sorts, function(sortColumn, i){
            sortData.push({
                colId: sortColumn.colId,
                sortDirection: sortColumn.sort,
                sortOrder: i + 1
            });
        });
        return sortData;
    };

    // summary:
    //      Application teams must extend this method and implement the logic to
    //      return the filter array. In general if the filters are applied through
    //      the grid header, the grid API will update the filters. This
    //      method will be responsible to get the latest filters from the grid API
    //      and construct the object which is compatible to grid preferences.
    // parameters
    //      $scope: Object
    //          scope object from grid preference controller
    factory.getGridFilterData = function(/*Object*/$scope) {
        return factory.updateFilterData($scope);
    };

    factory.updateFilterData = function(/*Object*/$scope) {
        var filterData = [], filterObj ={};
        var filterModel = $scope.gridOptions.api.getFilterModel();
        var savedFilters = Object.keys(filterModel);
        var filterApi, type, colDef;
        angular.forEach(savedFilters, function(field, i){
            filterApi = $scope.gridOptions.api.getFilterApi(field);
            colDef = $scope.gridOptions.api.getColumnDef(field);
			filterObj = getFilterObjbyType(colDef, filterApi);
            filterData.push(factory.updateColumns($scope.gridOptions.columns, colDef, filterObj.data, filterObj.op, i));
        });

		function getFilterObjbyType(colDef, filterApi){
			var data, op;
			var number = [{1:"EQUAL"},{2: "LESSTHAN"}, {3: "GREATERTHAN"}];
			var string = [{1:"CONTAIN"},{2: "EQUAL"}];
			if(colDef.filter === "number" || colDef.filter === "text") {
				type = filterApi.getType();
				data = filterApi.getFilter();
				if(colDef.filter === "number") {
					op = number[type] || "EQUAL";
				} else {
					op = string[type] || "CONTAIN";
				}
			} else {
				data = filterApi.getModel();
				op = "IN";
			}
			return {
				data: data,
				op: op
			};
		}
        return filterData;
    };

    // summary:
    //      Update the filterCriteria property of $scope.columns
    //      if the filters was applied through the in-built grid functionality.
    factory.updateColumns = function(gridColumns, column, data, op, order) {
        var i = 0,
            iLen = gridColumns.length,
            result;

        for (; i < iLen; i++) {
            if (gridColumns[i].hasOwnProperty("children")) {
                factory.updateColumns(gridColumns[i].children, column, data, op, order);
            }

            if (gridColumns[i].colId === column.colId) {
                gridColumns[i].filterCriteria = {};
                gridColumns[i].filterCriteria.filter = {
                    value: data
                };
                gridColumns[i].filterCriteria.filterOperator = op;
                gridColumns[i].filterCriteria.filterOrder = order + 1;
                result = gridColumns[i];
                break;
            }
        }
        return result;
    };

    // summary:
    //      Application teams must set the $scope.flatColumns property
    // parameters
    //      columns: Array
    //          flat list of columns
    factory.getFlatColumns = function(/*Array*/columns){
        var i, len, _columns = [], flatColumns = [];
        if(columns instanceof Array){
            _columns = columns.sort(CommonUtils.sortBy("displayOrder"));
            for(i = 0, len = _columns.length; i < len; i++){
                // check if the column has children
                if(_columns[i].children){
                    flatColumns = flatColumns.concat(factory.getFlatColumns(_columns[i].children));
                }
                // To make propsFilter work in filter setting and sort setting
                _columns[i].headerName = _columns[i].title;
                flatColumns.push(_columns[i]);
            }
        }
        return flatColumns;
    };

    factory.setData = function($scope) {
        $scope.appService.getData($scope.filters, $scope.sorts, $scope.gridId, function(result){
            $scope.prefConfig.rowData = result;
            $scope.setData();
        });
    };

    factory.setSorts = function(/*Object*/$scope) {
        var sort = [];
        angular.forEach($scope.sorts, function(sortData){
            sort.push({
                colId: sortData.colId,
                sort: sortData.sortCriteria.sortDirection
            });
        });
        $scope.gridOptions.api.setSortModel(sort);
    };

    factory.setFilters = function($scope) {
        var filterApi;
        factory.clearFilters($scope);
        for(var i = 0, len = $scope.filters.length; i < len; i++) {
            var filter = $scope.filters[i];
            var filterData = filter.filterCriteria.filter.value,
                op = filter.filterCriteria.filterOperator;

            filterApi = $scope.gridOptions.api.getFilterApi(filter.field);
            if(op !== "CONTAIN" && op !== "EQUAL" && op !== "GREATERTHAN" && op !== "LESSTHAN") {
                filterApi.setModel(filterData);
            } else {
                if(op === "CONTAIN") {
                    filterApi.setType(filterApi.CONTAINS);
                }
                if(op === "EQUAL") {
                    filterApi.setType(filterApi.EQUALS);
                }
                if(op === "GREATERTHAN") {
                    filterApi.setType(filterApi.GREATER_THAN);
                }
                if(op === "LESSTHAN") {
                    filterApi.setType(filterApi.LESS_THAN);
                }
                if(filterApi.setFilter) {
                    filterApi.setFilter(filterData);
                }
            }
        }
        $scope.gridOptions.api.onFilterChanged();
    };

    factory.clearFilters = function($scope) {
        $scope.gridOptions.api.setFilterModel(null);
        $scope.gridOptions.api.onFilterChanged();
    };

    return factory;
}]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * demo.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular
	.module("x1.ui.demo", [
	"ui.router",
	"x1.ui.grid-preference.demo"
]).config(["$urlRouterProvider", "$translateProvider", "$logProvider",
function($urlRouterProvider, $translateProvider, $logProvider) {
    $urlRouterProvider.otherwise("/grid-preference");

    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
        prefix: "l10n/",
        suffix: ".json"
    });

    // Tell the module what language to use by default
    $translateProvider.preferredLanguage("en_US");

    //check for inserted HTML before attempting to resolve translation variables
    //to protect us from potential insertion attacks.
    $translateProvider.useSanitizeValueStrategy("escaped");
    $logProvider.debugEnabled(true);
}]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * grid-preference.aggrid.demo.service.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular
    .module("x1.ui.grid-preference.demo")
    .factory("agGridDemoService", ["$http", "$q", "$log", "$translate",
    function($http, $q, $log, $translate) {
        var factory = {};
        // this is a demo service hosted in bluemix to mimic the server
        factory.getCongigUrl = "https://x1-ng-grid-preference.mybluemix.net/preference/getconfig";
        factory.saveCongigUrl = "https://x1-ng-grid-preference.mybluemix.net/preference/saveconfig";

        // If you prefer the local demo server uncomment the below 2 lines and comment the above 2 lines
        //factory.getCongigUrl = "http://localhost:22532/preference/getconfig";
        //factory.saveCongigUrl = "http://localhost:22532/preference/saveconfig";

        // ViewList.json will have a complete list of views for grid 1
        factory.viewList = "AgGridViewList";

        // summary:
        //      Application teams must extend this method and implement the logic to
        //      make a request to the server to get configuration json.
        // parameters
        //      viewId: String/Number
        //          unique view id to get configuration
        //      gridId: String/Number
        //          unique grid id
        //      callback: function
        //          call this callback function with the results
        factory.getConfig = function(viewId, gridId, callback){
            if(gridId === "demo3") {
                // make a request to get the list of views available for grid "demo1"
                $http({url: factory.getCongigUrl,
                    method: "GET",
                    params: {viewName: factory.viewList}
                }).then(function(viewList) {
                    // make a request to get the view configuration for a given view id
                    $http({url: factory.getCongigUrl,
                        method: "GET",
                        params: {viewName: "ag-grid" + viewId}
                    }).then(function(response) {
                        // add view list to the data
                        response.data.views = viewList.data;
                        // Get the localized column names here
                        angular.forEach(response.data.columns, function(column){
                            if(column.hasOwnProperty("resourceName")) {
								column.title = $translate.instant("x1UiNgGridPreferenceDemo." +
									column.resourceName);
                                if(column.hasOwnProperty("children")) {
                                    angular.forEach(column.children, function(childColumn){
										childColumn.title = $translate.instant("x1UiNgGridPreferenceDemo." +
											childColumn.resourceName);
										if(childColumn.hasOwnProperty("filterOptions")){
											angular.forEach(childColumn.filterOptions, function(option, i){
												option.id = i;
												option.key = option.label;
												option.name = option.label =
													$translate.instant("x1UiNgGridPreferenceDemo." +option.key);
											});
										}
                                    });
                                }
                            }
							if(column.hasOwnProperty("filterOptions")){
								angular.forEach(column.filterOptions, function(option, i){
									option.id = i;
									option.key = option.label;
									option.name = option.label = $translate.instant("x1UiNgGridPreferenceDemo." +
										option.key);
								});
							}
                        });
                        // finally just call the callback with the data
                        callback(response.data);
                    }, function(response) {
                        if (!angular.isObject(response.data) || !response.data.message) {
                            return ($q.reject("An unknown error occurred."));
                        }
                    });
                },function() {
                    $log.debug("Error");
                });
            }
        };

        // summary:
        //      Application teams must extend this method and implement the logic to
        //      make server request to get data or can generate data on the client side
        //      based on the filters and sorts criteria.
        // parameters
        //      filters: Object
        //          filter objects
        //      sorts: Object
        //          sort objects
        //      gridId: String/Number
        //          unique grid id
        //      callback: function
        //          call this callback function with the results
        factory.getData = function(filters, sorts, gridId, callback) {
            $http.get("./config/griddata.json").then(function(response) {
                var data = response.data.data;
                callback(data);
            }, function(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject("An unknown error occurred."));
                }
            });
        };

        // summary:
        //      Application teams must extend this method and implement the logic to
        //      make a request to the server to save config data based on the new/updated filters and sort settings.
        // parameters
        //      view: Object
        //          view object with id and name {id: xx, name: yyyy, companyView: false, selected: true}
        //      viewList: Array
        //          An array of views
        //      preference: Object
        //          view object with all the user preferences
        //      gridId: String/Number
        //          unique grid id
        //      saveAsNew: Boolean
        //          boolean value to indicate if it save as new view or save the existing view
        //      callback: function
        //          call this callback function with the results
        factory.saveConfigData = function(view, viewList, preference, gridId, saveAsNew, callback) {
            var jsonData, objectToSerialize;
			for(var i=0;i<preference.columns.length;i++){
				if(preference.columns[i]["filterOptions"]){
					preference.columns[i].filterOptions.forEach(function(option){
						option.label = option.key;
						delete option.id;
						delete option.key;
						delete option.name;
					});
				}
			}
            if(saveAsNew){
                // Update the view list here
                jsonData = angular.toJson(viewList);
                var fileName = factory.viewList;
                objectToSerialize = {"config": jsonData, "viewId": fileName};
                $http({url: factory.saveCongigUrl,
                    method: "POST", params: objectToSerialize})
                .success(function () {
                    savePreference();
                })
                .error(function () {
                    $log.debug("Error");
                });
            } else {
                savePreference();
            }

            function savePreference() {
                jsonData = angular.toJson(preference);
                objectToSerialize = {"config": jsonData, "viewId": "ag-grid" + view.id};

                $http({url: factory.saveCongigUrl, method: "POST", params: objectToSerialize})
                .success(function () {
                    if(callback) {
                        factory.getConfig(view.id, gridId, callback);
                    }
                })
                .error(function () {
                    $log.debug("Error");
                });
            }
        };

        // summary:
        //      Application teams must extend this method and implement the logic to
        //      delete the view from the view list and also make a request to delete the
        //      view from the database.
        //      Additionally call getConfig method if the reload flag is true with the company view id to default it
        //      to company view once the current view is deleted.
        // parameters
        //      viewList: Array
        //          updated view list array. The deleted view object will be deleted from this list
        //      companyViewId: String/Number
        //          default company view id so that call getConfig with this view name to show default view
        //          once the current view is deleted
        //      gridId: String/Number
        //          unique grid id
        //      reload: Boolean
        //          flag to indicate if default company view to be loaded or not. If this flag is set to true
        //          make a server request (call getConfig) to get the default view configuration
        //      callback: function
        //          pass this callback function as parameter to getConfig if reload flag is true
        factory.deleteView = function(viewList, parentViewId, gridId, reload, callback){
            var jsonData, objectToSerialize;
            var fileName = factory.viewList;
            jsonData = angular.toJson(viewList);
            objectToSerialize = {"config": jsonData, "viewId": fileName};

            $http({url: factory.saveCongigUrl, method: "POST", params: objectToSerialize})
            .success(function () {
                if(reload) {
                    factory.getConfig(parentViewId, gridId, callback);
                }
            })
            .error(function () {
                $log.debug("Error");
            });
        };

        return factory;
}]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * grid-preference.demo.config.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular
	.module("x1.ui.grid-preference.demo")
	.config([
		"$stateProvider", "$urlRouterProvider", "$translateProvider",
		function($stateProvider, $urlRouterProvider) {

			$stateProvider.state("grid-preference", {
				url: "/grid-preference",
				templateUrl: "gridpreference/grid-preference.demo.html"
			});

			$urlRouterProvider.otherwise("/grid-preference");
		}]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * grid-preference.demo.controller.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular
	.module("x1.ui.grid-preference.demo")
	.controller("GridPreferenceDemoCtrl", ["$scope", "$timeout", "$injector", "x1.ui.gridpreference.constant",
    function($scope, $timeout, $injector, x1UiGridpreferenceDefaults) {
        $scope.gridId = "demo";
        $scope.demoService = "demoService";
        $scope.gridService = "jqgridService";
        $scope.viewId = 6;
        $scope.dataUrl = null;
        $scope.placement = "bottom";

		$timeout(function () {
			$scope.demoAppService = $injector.get($scope.demoService);

			$scope.$on("x1.ui.gridColumnSort", function(event, colData){
				if(colData.gridId === $scope.gridId) {
					var gridPreferences = $scope.demoAppService.getObjectFromLocalStorage
						($scope.gridId+"."+$scope.demoAppService.getViewId()+".gridPreferences") || {};
					gridPreferences.sortname = colData.id;
					gridPreferences.sortorder = colData.sort;
					$scope.demoAppService.saveObjectInLocalStorage($scope.gridId+"."+
						$scope.demoAppService.getViewId()+".gridPreferences", gridPreferences);
				}
			});

			$scope.$on("x1.ui.gridColumnStatesChanged", function(event, colStates, gridId){
				if(gridId === $scope.gridId) {
					var gridPreferences = $scope.demoAppService.getObjectFromLocalStorage
						($scope.gridId+"."+$scope.demoAppService.getViewId()+".gridPreferences") || {};
					gridPreferences.colStates = colStates;
					$scope.demoAppService.saveObjectInLocalStorage($scope.gridId+"."+
						$scope.demoAppService.getViewId()+".gridPreferences", gridPreferences);
				}
			});

			$scope.$on("x1.ui.gridColumnReorder", function(event, reorderObj){
				if(reorderObj.gridId === $scope.gridId) {
					var gridPreferences = $scope.demoAppService.getObjectFromLocalStorage
						($scope.gridId+"."+$scope.demoAppService.getViewId()+".gridPreferences") || {};
					gridPreferences.permutation = reorderObj.permutation;
					/*$scope.demoAppService.saveObjectInLocalStorage($scope.gridId+"."+
						$scope.demoAppService.getViewId()+".gridPreferences", gridPreferences);*/
				}
			});

			$scope.$on("x1.ui.gridFilterChanged", function(event, filters, gridId){
				if(gridId === $scope.gridId) {
					var gridPreferences = $scope.demoAppService.getObjectFromLocalStorage
						($scope.gridId+"."+$scope.demoAppService.getViewId()+".gridPreferences") || {};
					gridPreferences.filters = filters;
					/*$scope.demoAppService.saveObjectInLocalStorage($scope.gridId+"."+
						$scope.demoAppService.getViewId()+".gridPreferences", gridPreferences);*/
				}
			});
		}, 100);

        $scope.triggerAutoSave = function() {
            $scope.$broadcast(x1UiGridpreferenceDefaults.Events.AUTO_SAVE);
        };

        $scope.$on("x1.ui.gridpreference.viewchange", function(event, viewData){
            if (viewData) {
                $scope.viewName = viewData.name;
            }
        });
    }])
    .controller("AgGridDemoCtrl", ["$scope", "x1.ui.gridpreference.constant",
    function($scope, x1UiGridpreferenceDefaults) {
        $scope.placement = "bottom";
        $scope.preferenceService = "agGridDemoService";
        $scope.gridService = "aggridService";
        $scope.clientGridId = "demo3";
        $scope.clientViewId = 1;
        $scope.template = "gridpreference/ag-grid.html";

        $scope.triggerAutoSave = function() {
            $scope.$broadcast(x1UiGridpreferenceDefaults.Events.AUTO_SAVE);
        };

        $scope.$on("x1.ui.gridpreference.viewchange", function(event, viewData){
            if (viewData) {
                $scope.viewName = viewData.name;
            }
        });
    }]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * grid-preference.jqgrid.demo.service.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular
    .module("x1.ui.grid-preference.demo")
    .factory("demoService", ["$http", "$q", "$log", "$translate",
    function($http, $q, $log, $translate) {
        var factory = {};
        // this is a demo service hosted in bluemix to mimic the server
        factory.getConfigUrl = "https://x1-ng-grid-preference.mybluemix.net/preference/getconfig";
        factory.saveConfigUrl = "https://x1-ng-grid-preference.mybluemix.net/preference/saveconfig";

        // If you prefer the local demo server uncomment the below 2 lines and comment the above 2 lines
        //factory.getConfigUrl = "http://localhost:22532/preference/getconfig";
        //factory.saveConfigUrl = "http://localhost:22532/preference/saveconfig";

        // ViewList.json will have a complete list of views
        factory.viewList = "ViewList";
        factory.viewId = 0;

		factory.saveObjectInLocalStorage = function (storageItemName, object) {
			if (typeof window.localStorage !== "undefined") {
				window.localStorage.setItem(storageItemName, JSON.stringify(object));
			}
		};

		factory.getObjectFromLocalStorage = function (storageItemName) {
			if (typeof window.localStorage !== "undefined") {
				return JSON.parse(window.localStorage.getItem(storageItemName));
			}
		};

		factory.getViewId = function () {
	    	return factory.viewId;
		};


        // summary:
        //      Application teams must extend this method and implement the logic to
        //      make a request to the server to get configuration json.
        // parameters
        //      viewId: String/Number
        //          unique view id to get configuration
        //      gridId: String/Number
        //          unique grid id
        //      callback: function
        //          call this callback function with the results
        factory.getConfig = function(viewId, gridId, callback){
        	if(gridId) {
        		if(gridId === "demo"){
					factory.getViewsConfigUrl = "./config/" + factory.viewList + ".json";
					factory.getConfigUrl = "./config/" + viewId + ".json";
				}else{
					factory.getViewsConfigUrl = factory.getConfigUrl;
				}
				factory.viewId = viewId;
				$http({
					url: factory.getViewsConfigUrl,
					method: "GET",
					params: {viewName: factory.viewList}
				}).then(function (viewList) {
					// make a request to get the view configuration for a given view id
					$http({
						url: factory.getConfigUrl,
						method: "GET",
						params: {viewName: viewId}
					}).then(function (response) {
						// add view list to the data
						response.data.views = viewList.data;
						// Get the localized column names here
						angular.forEach(response.data.columns, function (column) {
							if(column.hasOwnProperty("resourceName")) {
								column.title = $translate.instant("x1UiNgGridPreferenceDemo." +
									column.resourceName);
								if(column.hasOwnProperty("children")) {
									angular.forEach(column.children, function (childColumn) {
										childColumn.title = $translate.instant("x1UiNgGridPreferenceDemo." +
											childColumn.resourceName);
										if(childColumn.hasOwnProperty("filterOptions")) {
											angular.forEach(childColumn.filterOptions, function (option, i) {
												option.id = i;
												option.key = option.label;
												option.name = option.label =
													$translate.instant("x1UiNgGridPreferenceDemo." + option.key);
											});
										}
									});
								}
							}
							if(column.hasOwnProperty("filterOptions")){
								angular.forEach(column.filterOptions, function (option, i) {
									option.id = i;
									option.key = option.label;
									option.name = option.label = $translate.instant("x1UiNgGridPreferenceDemo." +
										option.key);
								});
							}
						});
						// enable to get gridPreferences from browser local storage
						//response.data.gridPreferences =
						// factory.getObjectFromLocalStorage(gridId+"."+viewId+".gridPreferences");
						// finally just call the callback with the data
						callback(response.data);
					}, function (response) {
						if (!angular.isObject(response.data) || !response.data.message) {
							return ($q.reject("An unknown error occurred."));
						}
					});
				}, function () {
					$log.debug("Error");
				});
			}
		};

        // summary:
        //      Application teams must extend this method and implement the logic to
        //      make server request to get data or can generate data on the client side
        //      based on the filters and sorts criteria.
        // parameters
        //      filters: Object
        //          filter objects
        //      sorts: Object
        //          sort objects
        //      gridId: String/Number
        //          unique grid id
        //      callback: function
        //          call this callback function with the results
        factory.getData = function(filters, sorts, gridId, callback) {
            $http.get("./config/griddata.json").then(function(response) {
                var data = response.data.data;
                callback(data);
            }, function(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject("An unknown error occurred."));
                }
            });
        };

        // summary:
        //      Application teams must extend this method and implement the logic to
        //      make a request to the server to save config data based on the new/updated filters and sort settings.
        // parameters
        //      view: Object
        //          view object with id and name {id: xx, name: yyyy, companyView: false, selected: true}
        //      viewList: Array
        //          An array of views
        //      preference: Object
        //          view object with all the user preferences
        //      gridId: String/Number
        //          unique grid id
        //      saveAsNew: Boolean
        //          boolean value to indicate if it save as new view or save the existing view
        //      callback: function
        //          call this callback function with the results
        factory.saveConfigData = function(view, viewList, preference, gridId, saveAsNew, callback) {
            var jsonData, parentViewId, objectToSerialize;
			for(var i=0;i<preference.columns.length;i++){
				if(preference.columns[i]["filterOptions"]){
					preference.columns[i].filterOptions.forEach(function(option){
						option.label = option.key;
						delete option.id;
						delete option.key;
						delete option.name;
					});
				}
			}
            if(saveAsNew){
                // Update the view list here
                jsonData = angular.toJson(viewList);
                parentViewId = view.parentViewId;
                objectToSerialize = {"config": jsonData, "viewId": factory.viewList};
                $http({url: factory.saveConfigUrl,
                    method: "POST", params: objectToSerialize})
                .success(function () {
                    savePreference();
                })
                .error(function () {
                    $log.debug("Error");
                });
            } else {
                savePreference();
            }

            function savePreference() {
                jsonData = angular.toJson(preference);
                objectToSerialize = {"config": jsonData, "viewId": view.id};

                $http({url: factory.saveConfigUrl, method: "POST", params: objectToSerialize})
                .success(function () {
                    if(callback) {
                        factory.getConfig(view.id, gridId, callback);
                    }
                })
                .error(function () {
                    $log.debug("Error");
                });
            }
        };

        // summary:
        //      Application teams must extend this method and implement the logic to
        //      delete the view from the view list and also make a request to delete the
        //      view from the database.
        //      Additionally call getConfig method if the reload flag is true with the company view id to default it
        //      to company view once the current view is deleted.
        // parameters
        //      viewList: Array
        //          updated view list array. The deleted view object will be deleted from this list
        //      parentViewId: String/Number
        //          default company/parent view id so that call getConfig with this view name to show default root view
        //          once the current view is deleted
        //      gridId: String/Number
        //          unique grid id
        //      reload: Boolean
        //          flag to indicate if default company view to be loaded or not. If this flag is set to true
        //          make a server request (call getConfig) to get the default view configuration
        //      callback: function
        //          pass this callback function as parameter to getConfig if reload flag is true
        factory.deleteView = function(viewList, parentViewId, deletedViewId, gridId, reload, callback){
            var jsonData, objectToSerialize;
            jsonData = angular.toJson(viewList);
            objectToSerialize = {"config": jsonData, "viewId": factory.viewList, "deletedViewId": deletedViewId};

            $http({url: factory.saveConfigUrl, method: "POST", params: objectToSerialize})
            .success(function () {
                if(reload) {
                    factory.getConfig(parentViewId, gridId, callback);
                }
            })
            .error(function () {
                $log.debug("Error");
            });
        };

        return factory;
}]);

angular
	.module("prism", [])
	.directive("prism", [function() {
		return {
			restrict: "A",
			link: function($scope, element) {
				element.ready(function() {
					Prism.highlightElement(element[0]);
				});
			}
		};
	}]);
(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/ag-grid.html',
    '<div ag-grid="gridOptions" class="ag-fresh" style="width: 100%; height: 450px;"></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/grid-preference.demo.html',
    '<h1 class="page-header">Angular Grid Preferences</h1><p align="justify" class="lead">Grid Preferences is a library package which provides features such as applying filters, sorts, changing the column order and so on. It allows the users to customize and save their own versions of settings and save them as new views for a grid. The grid preferences is compatible with most grids as shown in the below examples (Integrated with x1-ui-ng-jqgrid and ag-grid).</p><x1-demo-generator doc-src="\'gridpreference/grid-preference.doc.html\'" repo-name="x1-ui-ng-grid-preference" class="x1-grid-preference-demo"><ng-include src="\'gridpreference/examples/jq-grid-with-remote-gridpreference.demo.html\'"></ng-include><ng-include src="\'gridpreference/examples/ag-grid-with-remote-gridpreference.demo.html\'"></ng-include></x1-demo-generator>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/grid-preference.doc.html',
    '<h3 class="page-header">Bower dependencies</h3><ul><li>angular</li><li>angular-bootstrap</li><li>angular-moment</li><li>angular-translate</li><li>angular-translate-loader-static-files</li><li>angular-tree-control</li><li>free-jqgrid</li><li>jquery</li><li>jquery-ui</li><li>moment</li><li>x1-ui-bootstrap</li><li>x1-ui-ng-calendar-core</li><li>x1-ui-ng-date-picker</li><li>x1-ui-ng-jqgrid</li><li>x1-ui-ng-modal</li><li>x1-ui-ng-popover</li><li>x1-ui-ng-tabs</li><li>x1-ui-ng-select</li><li>x1-ui-ng-tooltip</li></ul><h3 class="page-header">Attribute options for <code>&lt;x1-view-dropdown&gt;</code></h3><table class="table table-condensed table-striped"><thead><tr><th>Attribute</th><th>Description</th><th>Required</th><th>Default Value</th><th>Accepted Type</th></tr></thead><tbody><tr><td>grid-id</td><td>The unique id of the grid</td><td>true</td><td>1000</td><td>string</td></tr><tr><td>placement</td><td>Popover placement</td><td>true</td><td>bottom</td><td>string(bottom, top, right, left, bottom-right, bottom-left, top-right, top-left)</td></tr></tbody></table><h3 class="page-header">Attribute options for <code>&lt;x1-grid-preference&gt;</code></h3><table class="table table-condensed table-striped"><thead><tr><th>Attribute</th><th>Description</th><th>Required</th><th>Default Value</th><th>Accepted Type</th></tr></thead><tbody><tr><td>grid-id</td><td>The unique id appended to the table</td><td>true</td><td>1000</td><td>string</td></tr><tr><td>view-id</td><td>The unique id for the view to be initially loaded</td><td>true</td><td></td><td>string/number</td></tr><tr><td>service</td><td>Service that is responsible for handling AJAX requests to get data for the grid or get/save configuration for views</td><td>true</td><td></td><td>string</td></tr><tr><td>dataurl</td><td>REST service url if the grid is directly hooked to REST service</td><td>false</td><td></td><td>string</td></tr></tbody></table><h3 class="page-header">Events</h3><p>Include <code>x1.ui.gridpreference.constant</code> in your controller to access the events</p><table class="table table-condensed table-striped"><thead><tr><th>Event</th><th>Name</th><th>Description</th><th>Arguments (passed into event listeners)</th></tr></thead><tbody><tr><td>[yourRef].Events.AUTO_SAVE</td><td>"x1.ui.gridpreference.autosave"</td><td>Auto save will be triggered on view switch by default. But in special cases like page navigation, Auto save needs to be manually triggered by application.<br><span style="color: red">Auto Save will not trigger for company/system views, any changes to the sorts, filters, column ordering or column width changes will not be saved. Auto save will only trigger for user created or custom views.</span></td><td>N/A</td></tr><tr><td>[yourRef].Events.VIEW_CHANGE</td><td>"x1.ui.gridpreference.viewchange"</td><td>Event that will $scope.$emit after the view changes.<br><span style="color: red">Listen to "x1.ui.gridpreference.viewchange" for any view change</span></td><td>Object with view properties</td></tr></tbody></table><h3 class="page-header">Application Preference Service Implementation</h3><p>Preference service will have to be implemented by applications in order to make communications with server for either getting or saving the configurations for a grid/view or even get or post data for a grid. This is the same service which will be passed as one of the attributes while creating grid-preference. Preference service is the only class that will interact with the grid-preferences and an application. There are four methods that applications will have to implement and each of the methods are explained in detail below. Please refer to app/demo/grid-preference.jqgrid.demo.service.js to better understand the implementation of application preference service.</p><table class="table table-condensed table-striped"><thead><tr><th>Method</th><th>Paramters</th><th>Description</th></tr></thead><tbody><tr><td>getConfig</td><td>viewId, gridId, callback</td><td>This method will be called from grid-preference component. Applications should implement this method to handle any server requests to get the configuration for a given gridId-viewId combination. In this method applications can also handle custom logic or very specific application logic like localization of the columns or adding custom functions to the columns</td></tr><tr><td>saveConfigData</td><td>view, viewList, preference, gridId, saveAsNew, callback</td><td>This method will be called from grid-preference component. Application teams must extend this method and implement the logic to make a request to the server to save config data based on the new/updated filters, sorts, column visibility, column order and column width settings.</td></tr><tr><td>deleteView</td><td>viewList, companyViewId, gridId, reload, callback</td><td>This method will be called from grid-preference component. Application teams must extend this method and implement the logic to delete the view from the view list and also make a request to delete the view from the database. Additionally call getConfig method if the reload flag is true with the company view id to default it to company view once the current view is deleted.</td></tr><tr><td>getData</td><td>filters, sorts, gridId, callback</td><td>This method will be called from grid-preference component. Application teams must extend this method and implement the logic to make a server request to get data or can generate data on the client side based on the filters and sorts criteria.<br><span style="color: red">Do not use this method when the grid is directly hooked to a REST service. Use this method only when grid is hooked to a client side data.</span></td></tr></tbody></table><div class="highlight"><pre><code class="language-javascript" prism="">\n' +
    '	angular\n' +
    '	.module("x1.ui.grid-preference.demo")\n' +
    '	.factory("demoService", ["$http", "$q", "$translate",\n' +
    '	function($http, $q, $translate) {\n' +
    '	// summary:\n' +
    '	//      Application teams must extend this method and implement the logic to\n' +
    '	//      make a request to the server to get configuration json.\n' +
    '	// parameters\n' +
    '	//      viewId: String/Number\n' +
    '	//          unique view id to get configuration\n' +
    '	//      gridId: String/Number\n' +
    '	//          unique grid id\n' +
    '	//      callback: function\n' +
    '	//          call this callback function with the results\n' +
    '	factory.getConfig = function(viewId, gridId, callback){\n' +
    '	// make a request to get the list of views available for grid\n' +
    '	// make a request to get the view configuration for a given view id\n' +
    '	// localize column names here\n' +
    '	// finally just call the callback with the data\n' +
    '		callback(data);\n' +
    '	};\n' +
    '\n' +
    '	// summary:\n' +
    '	//      Application teams must extend this method and implement the logic to\n' +
    '	//      make server request to get data or can generate data on the client side\n' +
    '	//      based on the filters and sorts criteria.\n' +
    '	// parameters\n' +
    '	//      filters: Object\n' +
    '	//          filter objects\n' +
    '	//      sorts: Object\n' +
    '	//          sort objects\n' +
    '	//      gridId: String/Number\n' +
    '	//          unique grid id\n' +
    '	//      callback: function\n' +
    '	//          call this callback function with the results\n' +
    '	factory.getData = function(filters, sorts, gridId, callback) {\n' +
    '	// generate or make a request data from server\n' +
    '	// finally just call the callback with the data\n' +
    '		callback(data);\n' +
    '	};\n' +
    '\n' +
    '	// summary:\n' +
    '	//      Application teams must extend this method and implement the logic to\n' +
    '	//      make a request to the server to save config data based on the new/updated filters and sort settings.\n' +
    '	// parameters\n' +
    '	//      view: Object\n' +
    '	//          view object with id and name {id: xx, name: yyyy, companyView: false, selected: true}\n' +
    '	//      viewList: Array\n' +
    '	//          An array of views\n' +
    '	//      preference: Object\n' +
    '	//          view object with all the user preferences\n' +
    '	//      gridId: String/Number\n' +
    '	//          unique grid id\n' +
    '	//      saveAsNew: Boolean\n' +
    '	//          boolean value to indicate if it save as new view or save the existing view\n' +
    '	//      callback: function\n' +
    '	//          call this callback function with the results\n' +
    '	factory.saveConfigData = function(view, viewList, preference, gridId, saveAsNew, callback) {\n' +
    '	// make a server request to save the view config\n' +
    '	// handle updating the view list here if saveAsNew flag is true\n' +
    '	// finally just call the callback\n' +
    '		callback();\n' +
    '	};\n' +
    '\n' +
    '	// summary:\n' +
    '	//      Application teams must extend this method and implement the logic to\n' +
    '	//      delete the view from the view list and also make a request to delete the\n' +
    '	//      view from the database.\n' +
    '	//      Additionally call getConfig method if the reload flag is true with the company view id to default it\n' +
    '	//      to company view once the current view is deleted.\n' +
    '	// parameters\n' +
    '	//      viewList: Array\n' +
    '	//          updated view list array. The deleted view object will be deleted from this list\n' +
    '	//      companyViewId: String/Number\n' +
    '	//          default company view id so that call getConfig with this view name to show default view\n' +
    '	//          once the current view is deleted\n' +
    '	//      gridId: String/Number\n' +
    '	//          unique grid id\n' +
    '	//      reload: Boolean\n' +
    '	//          flag to indicate if default company view to be loaded or not. If this flag is set to true\n' +
    '	//          make a server request (call getConfig) to get the default view configuration\n' +
    '	//      callback: function\n' +
    '	//          pass this callback function as parameter to getConfig if reload flag is true\n' +
    '	factory.deleteView = function(viewList, companyViewId, gridId, reload, callback){\n' +
    '	// make a server request to delete the view\n' +
    '	// update the view list\n' +
    '	// if reload flag is true, make a call to getConfig with the companyViewId, gridId and callback\n' +
    '	};\n' +
    '\n' +
    '	return factory;\n' +
    '	}]);\n' +
    '</code></pre></div><h3 class="page-header">Internationalization variables</h3><div class="highlight"><pre><code class="language-javascript" prism="">\n' +
    '	{\n' +
    '	&quot;x1UiNgGridPreference&quot;: {\n' +
    '		&quot;common&quot;: {\n' +
    '			&quot;Ok&quot;: &quot;OK&quot;,\n' +
    '			&quot;Add&quot;: &quot;Add&quot;,\n' +
    '			&quot;ClearAll&quot;: &quot;Clear All&quot;,\n' +
    '			&quot;Close&quot;: &quot;Close&quot;,\n' +
    '			&quot;Select&quot;: &quot;Select&quot;,\n' +
    '			&quot;visibleColumnLabel&quot;: &quot;Visible Columns&quot;,\n' +
    '			&quot;hiddenColumnLabel&quot;: &quot;Hidden Columns&quot;,\n' +
    '			&quot;AvailableColumns&quot;: &quot;Available Columns&quot;,\n' +
    '			&quot;DisplayedColumns&quot;: &quot;Displayed Columns&quot;,\n' +
    '			&quot;GridPreference&quot;: &quot;Edit Grid View&quot;,\n' +
    '			&quot;Actions&quot;: &quot;Views&quot;,\n' +
    '			&quot;Refresh&quot;: &quot;Refresh&quot;,\n' +
    '			&quot;View&quot;: &quot;View&quot;,\n' +
    '			&quot;SaveAs&quot;: &quot;Save As&quot;,\n' +
    '			&quot;Name&quot;: &quot;Name&quot;,\n' +
    '			&quot;Copy&quot;: &quot;Copy&quot;,\n' +
    '			&quot;Save&quot;: &quot;Save&quot;,\n' +
    '			&quot;Cancel&quot;: &quot;Cancel&quot;,\n' +
    '			&quot;Selected&quot;: &quot;Selected&quot;,\n' +
    '			&quot;Available&quot;: &quot;Available&quot;,\n' +
    '			&quot;SortSettingLabel&quot;: &quot;Sort Setting&quot;,\n' +
    '			&quot;FilterSettingLabel&quot;: &quot;Filter Setting&quot;,\n' +
    '			&quot;ColumnSettingLabel&quot;: &quot;Column Setting&quot;,\n' +
    '			&quot;BlankViewErrorMsg&quot;: &quot;View name cannot be blank, please enter a view name.&quot;,\n' +
    '			&quot;ViewExistsErrorMsg&quot;: &quot;View name already exists, please enter a different name.&quot;,\n' +
    '			&quot;duplicateSortColumnMsg&quot;: &quot;Duplicate column selected in the sort tab.&quot;,\n' +
    '			&quot;duplicateFilterColumnMsg&quot;: &quot;Duplicate column selected in the filter tab.&quot;,\n' +
    '			&quot;blankSortColumn&quot;: &quot;Sort by column cannot be blank. &quot;,\n' +
    '			&quot;blankSortOrder&quot;: &quot;Sort order cannot be blank.&quot;,\n' +
    '			&quot;blankFilterColumn&quot;: &quot;Filter by column cannot be blank. &quot;,\n' +
    '			&quot;blankFilterOperator&quot;: &quot;Filter by operator cannot be blank.&quot;,\n' +
    '			&quot;Ascending&quot;: &quot;Ascending&quot;,\n' +
    '			&quot;Descending&quot;: &quot;Descending&quot;,\n' +
    '			&quot;SortByLabel&quot;: &quot;Sort By&quot;,\n' +
    '			&quot;ThenByLabel&quot;: &quot;Then By&quot;,\n' +
    '			&quot;MoveLeft&quot;: &quot;Move to hide columns&quot;,\n' +
    '			&quot;MoveRight&quot;: &quot;Move to display columns&quot;,\n' +
    '			&quot;MoveAllLeft&quot;: &quot;Move all to hide columns&quot;,\n' +
    '			&quot;MoveAllRight&quot;: &quot;Move all to display columns&quot;,\n' +
    '			&quot;MoveUp&quot;: &quot;Move column order up&quot;,\n' +
    '			&quot;MoveDown&quot;: &quot;Move column order down&quot;,\n' +
    '			&quot;MoveTop&quot;: &quot;Move to Top&quot;,\n' +
    '			&quot;MoveBottom&quot;: &quot;Move to Bottom&quot;,\n' +
    '			&quot;displayListEmptyMsg&quot;: &quot;Grid should have atleast one display column.&quot;,\n' +
    '			&quot;confirm&quot;: &quot;Confirm Delete&quot;,\n' +
    '			&quot;deleteViewConfirmMsg&quot;: &quot;Are you sure that you want to delete the selected custom view?&quot;\n' +
    '			},\n' +
    '			&quot;operatorGroup&quot;: {\n' +
    '			&quot;Contains&quot;: &quot;Contains&quot;,\n' +
    '			&quot;DoesNotContain&quot;: &quot;Does not Contain&quot;,\n' +
    '			&quot;Equal&quot;: &quot;Equals&quot;,\n' +
    '			&quot;DoesNotEqual&quot;: &quot;Does not Equal&quot;,\n' +
    '			&quot;StartWith&quot;: &quot;Starts With&quot;,\n' +
    '			&quot;GreaterThan&quot;: &quot;Greater Than&quot;,\n' +
    '			&quot;LessThan&quot;: &quot;Less Than&quot;,\n' +
    '			&quot;After&quot;: &quot;After&quot;,\n' +
    '			&quot;Before&quot;: &quot;Before&quot;,\n' +
    '			&quot;In&quot;: &quot;In&quot;,\n' +
    '			&quot;IsEmpty&quot;: &quot;Is Empty&quot;\n' +
    '			}\n' +
    '		}\n' +
    '	}\n' +
    '</code></pre></div><h3 class="page-header">View list json configuration</h3><div class="highlight"><pre><code class="language-javascript" prism="">\n' +
    '	// This json can be persisted in the back-end\n' +
    '	[\n' +
    '		{\n' +
    '		"id": 1, // A unique id for a view\n' +
    '		"name": "Company View 1", // Name of the view\n' +
    '		"parentViewId": 1,  // Parent view id, same value if its a company view.\n' +
    '		"companyView": true, // A flag to indicate if this view is system/company defined view or user created views\n' +
    '		"selected": false // A flag to indicate if this view is the selected view\n' +
    '		},\n' +
    '		....\n' +
    '		....\n' +
    '		, {\n' +
    '		"id": 6, // A unique id for a view\n' +
    '		"name": "Music Grid", // Name of the view\n' +
    '		"parentViewId": 1,  // Parent view id, For custom views the view id will derive from parent.\n' +
    '		"companyView": false, // A flag to indicate if this view is system/company defined view or user created views\n' +
    '		"selected": true // A flag to indicate if this view is the selected view\n' +
    '		}\n' +
    '	]\n' +
    '</code></pre></div><h3 class="page-header">Default view configuration</h3><div class="highlight"><pre><code class="language-javascript" prism="">\n' +
    '	// This json can be persisted in the back-end\n' +
    '	// Please refer to jqgrid documentation also\n' +
    '	{\n' +
    '	&quot;viewId&quot;: 6, //A unique id of a view for a grid\n' +
    '	&quot;sortable&quot;: true,\n' +
    '	&quot;forceFit&quot;: true,\n' +
    '	&quot;headertitles&quot;: true,\n' +
    '	&quot;viewsortcols&quot;: [false, &quot;horizontal&quot;, true],\n' +
    '	&quot;maxSort&quot;: 3, //Maximum number sorts a user can set in sort settings tab\n' +
    '	&quot;sortOnHiddenColumns&quot;: true, //A flag to indicate whether to sort on hidden columns\n' +
    '	&quot;maxFilter&quot;: &quot;Infinity&quot;, //Maximum number of filters a user can set in filter setting tab\n' +
    '	&quot;filterOnHiddenColumns&quot;: true, //A flag to indicate whether to filter on hidden columns\n' +
    '	&quot;useGroupedHeaders&quot;: true, //A flag to indicate if the view has group columns/ group headers\n' +
    '	&quot;multiSort&quot;: true,\n' +
    '	&quot;rowNum&quot;: 50,\n' +
    '	&quot;jsonReader&quot;: {\n' +
    '		&quot;repeatitems&quot;: false\n' +
    '	},\n' +
    '	&quot;datatype&quot;: &quot;json&quot;,\n' +
    '	&quot;cellSize&quot;: &quot;md&quot;,\n' +
    '	&quot;x1HorizontalScroll&quot;: false,\n' +
    '	&quot;usePager&quot;: true,  // toggles infinite scroll\n' +
    '	&quot;columns&quot;: [\n' +
    '		{\n' +
    '			&quot;index&quot;: &quot;Genre&quot;,\n' +
    '			&quot;name&quot;: &quot;Genre&quot;,\n' +
    '			&quot;resourceName&quot;: &quot;Key_Genre&quot;, // Use this key to get the localized value for column name\n' +
    '			&quot;width&quot;: 200, // number, to specify the column width\n' +
    '			&quot;displayOrder&quot;: 3, // The order of the column appeared in the grid\n' +
    '			&quot;sorttype&quot;: &quot;enum&quot;, // data type of the column similar to(text, number, date, boolen, enum, enumcsv)\n' +
    '			&quot;sortCriteria&quot;: { // defines the default sort if any or null\n' +
    '				&quot;sortOrder&quot;: 1, // ordinal of sort. eg: primary sort, secondary sort etc\n' +
    '				&quot;sortDirection&quot;: &quot;asc&quot; //sort direction to be applied. eg: "ASC" or "DESC"\n' +
    '			},\n' +
    '			&quot;filterCriteria&quot;: {, // defines the default filter if any or null\n' +
    '				&quot;filter&quot;: { // contains the filter settings for a column and contains following attributes\n' +
    '				&quot;value&quot;: [&quot;2&quot;, &quot;5&quot;] // contains the default filter value for the filter.\n' +
    '				},\n' +
    '				&quot;filterOperator&quot;: &quot;IN&quot;,  //filter operator applied on the filter eg: STARTSWITH, CONTAINS, BETWEEN, GREATERTHAN etc.\n' +
    '				&quot;filterOrder&quot;: 1 //ordinal of filter. eg: primary sort, secondary sort etc.\n' +
    '			},\n' +
    '			&quot;filterOptions&quot;: [ // defines values for the filter if the filtertype is either enum or longlist\n' +
    '				{\n' +
    '				&quot;value&quot;: &quot;1&quot;, // corresponds to db value in the filter.\n' +
    '				&quot;label&quot;: &quot;Key_Rock&quot; // contains the display value to show on the filter.\n' +
    '				},\n' +
    '				....\n' +
    '				....\n' +
    '				,{\n' +
    '				&quot;value&quot;: &quot;5&quot;,\n' +
    '				&quot;label&quot;: &quot;Key_Blue&quot;\n' +
    '				}\n' +
    '			],\n' +
    '			&quot;hidden&quot;: false\n' +
    '		}, {\n' +
    '			&quot;index&quot;: &quot;Name&quot;,\n' +
    '			&quot;name&quot;: &quot;Name&quot;,\n' +
    '			&quot;resourceName&quot;: &quot;Key_Name&quot;,\n' +
    '			&quot;width&quot;: 275,\n' +
    '			&quot;displayOrder&quot;: 2,\n' +
    '			&quot;sorttype&quot;: &quot;text&quot;,\n' +
    '			&quot;sortCriteria&quot;: null,\n' +
    '			&quot;filterCriteria&quot;: null,\n' +
    '			&quot;hidden&quot;: false\n' +
    '			},\n' +
    '			....\n' +
    '			....\n' +
    '			// Group column definition\n' +
    '			, {\n' +
    '				&quot;index&quot;: &quot;group1&quot;,\n' +
    '				&quot;name&quot;: &quot;Group Name&quot;,\n' +
    '				&quot;resourceName&quot;: &quot;Key_Group&quot;,\n' +
    '				&quot;displayOrder&quot;: 7,\n' +
    '				&quot;hidden&quot;: false,\n' +
    '				&quot;type&quot;: &quot;parent&quot;, // set the parent column\n' +
    '				&quot;children&quot;: [ // This contains an array of children and the metadata or the structure is same as any other column\n' +
    '					{\n' +
    '					&quot;parent&quot;: &quot;group1&quot;, // reference to parent\n' +
    '					&quot;index&quot;: &quot;Length&quot;,\n' +
    '					&quot;name&quot;: &quot;Key_Length&quot;,\n' +
    '					&quot;resourceName&quot;: &quot;Key_Length&quot;,\n' +
    '					&quot;width&quot;: 133,\n' +
    '					&quot;displayOrder&quot;: 1, // The order of the column appeared in the group\n' +
    '					&quot;sorttype&quot;: &quot;text&quot;,\n' +
    '					&quot;sortCriteria&quot;: null,\n' +
    '					&quot;filterCriteria&quot;: null,\n' +
    '					&quot;hidden&quot;: false\n' +
    '					},\n' +
    '					.....\n' +
    '					.....\n' +
    '					{\n' +
    '					&quot;parent&quot;: &quot;group1&quot;, // reference to parent\n' +
    '					&quot;index&quot;: &quot;Composer&quot;,\n' +
    '					&quot;name&quot;: &quot;Key_Composer&quot;,\n' +
    '					&quot;resourceName&quot;: &quot;Key_Composer&quot;,\n' +
    '					&quot;width&quot;: 160,\n' +
    '					&quot;displayOrder&quot;: 3,\n' +
    '					&quot;sorttype&quot;: &quot;text&quot;,\n' +
    '					&quot;sortCriteria&quot;: null,\n' +
    '					&quot;filterCriteria&quot;: null,\n' +
    '					&quot;hidden&quot;: true\n' +
    '					}\n' +
    '				]\n' +
    '			}\n' +
    '		]\n' +
    '	}\n' +
    '</code></pre></div><h3 class="page-header">Implementing Custom Preference Service</h3><p>By default grid preferences assumes you are using "x1-ui-ng-jqgrid" as grid component. But if you decide to use some other grid component other than "x1-ui-ng-jqgrid", then adding grid preferences module to it is not that hard. There are few steps that needs to be followed and you can hook the grid preferences module to any grid that you choose.<ul><li>Pass a Template</li><li>Implement a service to support methods for grid preference</li></ul></p><h4 class="page-header">1. Passing a template</h4><pre><code class="language-markup" prism="">\n' +
    '	// ag-grid.html\n' +
    '	&lt;div\n' +
    '		ag-grid=&quot;gridOptions&quot;\n' +
    '		class=&quot;ag-blue&quot;\n' +
    '		style=&quot;width: 100%; height: 400px;&quot;&gt;\n' +
    '	&lt;/div&gt;\n' +
    '\n' +
    '	// pass this html template and custom grid service as the attributes to grid preference\n' +
    '	&lt;x1-grid-preference\n' +
    '		grid-id=&quot;clientGridId&quot;\n' +
    '		service=&quot;preferenceService&quot;\n' +
    '		grid-service=&quot;gridService&quot;\n' +
    '		view-id=&quot;clientViewId&quot;\n' +
    '		grid-template=&quot;template&quot;&gt;\n' +
    '	&lt;/x1-grid-preference&gt;\n' +
    '\n' +
    '	// In the controller\n' +
    '	$scope.template = "gridpreference/ag-grid.html"; // path to the custom template\n' +
    '	$scope.gridService = "aggridService";\n' +
    '</code></pre><h4 class="page-header">2. Implementing a custom service</h4><p>A detailed description of the methods that needs to be implemented is given below. It is mandatory to implement all the methods listed below. Please refer to this example app/demo/aggrid.service.js as a reference.</p><table class="table table-condensed table-striped"><thead><tr><th>Method</th><th>Paramters</th><th>Description</th></tr></thead><tbody><tr><td>setUpGridComplete</td><td>$scope</td><td>This method will be called from grid-preference component. Application teams must extend this method and implement the logic to set up grid complete events such as onReady, onComplete, onSort etc, as expected by your grid.</td></tr><tr><td>getColumnDefinition</td><td>$scope</td><td>This method will be called from grid-preference component. Application teams must extend this method and implement the logic to return the column definition array, which will have updated information about the columns such as updated width from your grid API.</td></tr><tr><td>refreshView</td><td>$scope</td><td>This method will be called from grid-preference component. Application teams must extend this method and implement the logic to refresh the grid as expected from your grid API.</td></tr><tr><td>setColumns</td><td>$scope</td><td>This method will be called from grid-preference component. Application teams must extend this method and implement the logic to set the columns array as expected by your grid.<br><span style="color: red">Note: Application teams must set the $scope.flatColumns property. If your column array is a hierarchical data structure, then it is your responsibility to convert the hierarchical data structure to a flat list.</span></td></tr><tr><td>getGridData</td><td>$scope</td><td>This method will be called from grid-preference component. Application teams must extend this method and implement the logic to set the data for the grid. This method should finally call $scope.setData method, so that grid preference can continue do its task.</td></tr><tr><td>setSortsParam</td><td>$scope</td><td>This method will be called from grid-preference component. Application teams must extend this method and implement the logic to set the sorts array/object as expected by your grid.</td></tr><tr><td>setFiltersParam</td><td>$scope</td><td>This method will be called from grid-preference component. Application teams must extend this method and implement the logic to set the filters array/object as expected by your grid.</td></tr><tr><td>getGridSortData</td><td>$scope</td><td>This method will be called from grid-preference component. Application teams must extend this method and implement the logic to return the sorts array. In general if the sorts are applied through clicking on the grid header, the grid API will update the sorts. This method will be responsible to get the latest sorts from the grid API and construct the object which is compatible to grid preferences.</td></tr><tr><td>getGridFilterData</td><td>$scope</td><td>This method will be called from grid-preference component. Application teams must extend this method and implement the logic to return the filter array. In general if the filters are applied through the grid header, the grid API will update the filters. This method will be responsible to get the latest filters from the grid API and construct the object which is compatible to grid preferences.</td></tr></tbody></table><div style="margin-bottom: 20px"></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/index.rtl.html',
    '<!DOCTYPE html><html ng-app="x1.ui.demo" lang="en"><head><meta charset="utf-8"><title>IBM Commerce Product UI Grid Preference Demo</title><link rel="stylesheet" href="vendor/vendor.css"><link rel="stylesheet" href="../x1-ui-ng-grid-preference.css"><link rel="stylesheet" href="gridpreference.demo.css"></head><body dir="rtl"><section ui-view="" role="main" class="container"></section><script type="text/javascript" src="vendor/vendor.js"></script><script type="text/javascript" src="../x1-ui-ng-grid-preference.js"></script><script type="text/javascript" src="gridpreference.demo.js"></script><script>\n' +
    '	(function() {\n' +
    '		agGrid.initialiseAgGridWithAngular1(angular);\n' +
    '	})();\n' +
    '</script></body></html>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/examples/ag-grid-with-remote-gridpreference.demo.html',
    '<h3 class="page-header">Ag-Grid with Json Rest Configuration</h3><p>This example demonstrates how grid preference component cant be extended to use with another grid eg. aggrid</p><div class="bs-example" style="height: 100%"><div class="page-container" ng-controller="AgGridDemoCtrl"><p>Selected View : {{viewName}}</p><div class="nav nav-pills margin-top-20"><a role="button" type="button" class="btn btn-md" ng-click="triggerAutoSave()"><span class="glyphicon glyphicon-save"></span> Auto Save</a> <a role="button" type="button" class="btn btn-md pull-right"><x1-view-dropdown grid-id="clientGridId" placement="placement"></x1-view-dropdown></a></div><div style="clear: both"></div><x1-grid-preference grid-id="clientGridId" service="preferenceService" grid-service="gridService" view-id="clientViewId" grid-template="template"></x1-grid-preference></div></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">\n' +
    '					&lt;x1-view-dropdown\n' +
    '						grid-id=&quot;clientGridId&quot;\n' +
    '						placement=&quot;placement&quot;&gt;\n' +
    '					&lt;/x1-view-dropdown&gt;\n' +
    '				</code>\n' +
    '				<code class="language-markup" prism="">\n' +
    '					&lt;x1-grid-preference\n' +
    '						grid-id=&quot;clientGridId&quot;\n' +
    '						service=&quot;preferenceService&quot;\n' +
    '						grid-service=&quot;gridService&quot;\n' +
    '						view-id=&quot;clientViewId&quot;\n' +
    '						grid-template=&quot;template&quot;&gt;\n' +
    '					&lt;/x1-grid-preference&gt;\n' +
    '				</code>\n' +
    '				<code class="language-markup" prism="">\n' +
    '					&lt;div\n' +
    '						ag-grid=&quot;gridOptions&quot;\n' +
    '						class=&quot;ag-blue&quot;\n' +
    '						style=&quot;width: 100%; height: 450px;&quot;&gt;\n' +
    '					&lt;/div&gt;\n' +
    '				</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre>\n' +
    '				<code class="language-javascript" prism="">\n' +
    '					angular\n' +
    '						.module("x1.ui.grid-preference.demo")\n' +
    '						.controller("AgGridDemoCtrl", ["$scope", "x1.ui.gridpreference.constant",\n' +
    '							function($scope, x1UiGridpreferenceDefaults) {\n' +
    '							$scope.placement = "bottom"; // placement of the tooltip\n' +
    '							$scope.preferenceService = "agGridDemoService"; // service that handles get and save configurations\n' +
    '							$scope.gridService = "aggridService"; // service very specific to ag-grid to set columns, sorts, filters, etc\n' +
    '							$scope.clientGridId = "demo3"; // unique grid id\n' +
    '							$scope.clientViewId = 1; // first view to load\n' +
    '							$scope.template = "gridpreference/ag-grid.html"; // path to the custom template\n' +
    '					}]);\n' +
    '				</code>\n' +
    '			</pre></div></tab><tab heading="SCSS"><div class="highlight"><pre>\n' +
    '				<code class="language-javascript" prism=""></code>\n' +
    '			</pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/examples/jq-grid-with-local-gridpreference.demo.html',
    '<h3 class="page-header">JQGrid with client side configuration</h3><p>This example uses preference config json stored in client side</p><div class="bs-example" style="height: 100%"><div class="page-container" ng-controller="GridPreferenceDemoCtrl1"><p>Selected View : {{viewName}}</p><div class="nav nav-pills margin-top-20"><a role="button" type="button" class="btn btn-md" ng-click="triggerAutoSave()"><span class="glyphicon glyphicon-save"></span> Auto Save</a> <a role="button" type="button" class="btn btn-md pull-right"><x1-view-dropdown grid-id="gridId" placement="placement"></x1-view-dropdown></a></div><div style="clear: both"></div><x1-grid-preference dataurl="dataUrl" grid-id="gridId" service="demoService" grid-service="gridService" view-id="viewId"></x1-grid-preference></div></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">\n' +
    '					&lt;x1-view-dropdown\n' +
    '						grid-id=&quot;clientGridId&quot;\n' +
    '						placement=&quot;placement&quot;&gt;\n' +
    '					&lt;/x1-view-dropdown&gt;\n' +
    '				</code>\n' +
    '\n' +
    '				<code class="language-markup" prism="">\n' +
    '					&lt;x1-grid-preference\n' +
    '						dataurl=&quot;dataUrl&quot;\n' +
    '						grid-id=&quot;gridId&quot;\n' +
    '						service=&quot;demoService&quot;\n' +
    '						grid-service=&quot;jqgridService&quot;\n' +
    '						view-id=&quot;clientViewId&quot;&gt;\n' +
    '					&lt;/x1-grid-preference&gt;\n' +
    '				</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre>\n' +
    '				<code class="language-javascript" prism="">\n' +
    '					angular\n' +
    '						.module("x1.ui.grid-preference.demo")\n' +
    '						.controller("GridPreferenceDemoCtrl1", ["$scope", "x1.ui.gridpreference.constant",\n' +
    '							function($scope, x1UiGridpreferenceDefaults) {\n' +
    '							$scope.placement = "bottom"; // placement of the tooltip\n' +
    '							$scope.demoService = "demoService"; // service that handles get and save configurations\n' +
    '							$scope.gridId = "demo2"; // unique grid id\n' +
    '							$scope.dataUrl = null; // passing null for local data\n' +
    '							$scope.viewId = 6; // first view to load\n' +
    '					}]);\n' +
    '				</code>\n' +
    '			</pre></div></tab><tab heading="SCSS"><div class="highlight"><pre>\n' +
    '				<code class="language-javascript" prism=""></code>\n' +
    '			</pre></div></tab></tabset>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/examples/jq-grid-with-remote-gridpreference.demo.html',
    '<h3 class="page-header">JQGrid with Json Rest configuration</h3><p>This example uses preference config json stored in a remote server and retrived using Rest API calls</p><div class="bs-example" style="height: 100%"><div class="page-container" ng-controller="GridPreferenceDemoCtrl"><p>Selected View : {{viewName}}</p><div class="nav nav-pills margin-top-20"><a role="button" type="button" class="btn btn-md" ng-click="triggerAutoSave()"><span class="glyphicon glyphicon-save"></span> Auto Save</a> <a role="button" type="button" class="btn btn-md pull-right"><x1-view-dropdown grid-id="gridId" placement="placement"></x1-view-dropdown></a></div><div style="clear: both"></div><x1-grid-preference grid-id="gridId" service="demoService" grid-service="gridService" view-id="viewId"></x1-grid-preference></div></div><tabset><tab heading="HTML"><div class="highlight"><pre>\n' +
    '				<code class="language-markup" prism="">\n' +
    '					&lt;x1-view-dropdown\n' +
    '						grid-id=&quot;gridId&quot;\n' +
    '						placement=&quot;placement&quot;&gt;\n' +
    '					&lt;/x1-view-dropdown&gt;\n' +
    '				</code>\n' +
    '\n' +
    '				<code class="language-markup" prism="">\n' +
    '					&lt;x1-grid-preference\n' +
    '						grid-id=&quot;gridId&quot;\n' +
    '						service=&quot;demoService&quot;\n' +
    '						view-id=&quot;viewId&quot;&gt;\n' +
    '					&lt;/x1-grid-preference&gt;\n' +
    '				</code>\n' +
    '			</pre></div></tab><tab heading="JS"><div class="highlight"><pre>\n' +
    '				<code class="language-javascript" prism="">\n' +
    '					angular\n' +
    '						.module("x1.ui.grid-preference.demo")\n' +
    '						.controller("GridPreferenceDemoCtrl", ["$scope", "x1.ui.gridpreference.constant",\n' +
    '							function($scope, x1UiGridpreferenceDefaults) {\n' +
    '							$scope.gridId = "demo1"; // unique grid id\n' +
    '							$scope.demoService = "demoService"; // service that handles get and save configurations\n' +
    '							$scope.viewId = 1; // first view to load\n' +
    '							//$scope.dataUrl = "http://localhost:22532/grid/getJQGridData"; // REST service hooked to the grid\n' +
    '							$scope.placement = "bottom"; // placement of the tooltip\n' +
    '					}]);\n' +
    '				</code>\n' +
    '			</pre></div></tab><tab heading="SCSS"><div class="highlight"><pre>\n' +
    '				<code class="language-javascript" prism="">\n' +
    '\n' +
    '				</code>\n' +
    '			</pre></div></tab></tabset>');
}]);
})();
