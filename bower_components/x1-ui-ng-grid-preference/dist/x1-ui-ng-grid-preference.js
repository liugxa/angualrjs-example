/**
    *
    * Licensed Materials - Property of IBM
    *
    * gridpreference.module.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.gridpreference", [
	"ngAria",
    "pascalprecht.translate",
    "ui.bootstrap",
    "x1.ui.popover",
    "x1.ui.tooltip",
    "x1.ui.calendar-core",
    "x1.ui.preferencedialog",
    "x1.ui.sortsetting",
    "x1.ui.filtersetting",
    "x1.ui.columnsetting",
    "x1.ui.viewdropdown",
    "x1.ui.saveas",
    "x1.ui.modal",
    "x1.ui.tabs",
    "x1.ui.select",
    "x1.ui.utils",
    "treeControl"
]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * columnsetting.module.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.columnsetting", []);
/**
    *
    * Licensed Materials - Property of IBM
    *
    * filtersetting.module.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.filtersetting", [
    "x1.ui.filterrow"
]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * preferencedialog.module.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

/**
    *
    * Licensed Materials - Property of IBM
    *
    * preferencedialog.module.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

/**
    *
    * Licensed Materials - Property of IBM
    *
    * preferencedialog.module.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.preferencedialog", []);
/**
    *
    * Licensed Materials - Property of IBM
    *
    * saveas.module.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.saveas", [

]);
/**
    *
    * Licensed Materials - Property of IBM
    *
    * sortsetting.module.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.sortsetting", [
    "x1.ui.sortrow"
]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * viewdropdown.module.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.viewdropdown", [
    "x1.ui.popover"
]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * filterrow.module.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.filterrow", []);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * sortrow.module.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.sortrow", []);

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

angular.module("x1.ui.gridpreference")
.factory("commonUtilsFactory", function() {
    var factory = {};

    // summary:
    //      Sort function that sorts array of objects by their property
    // description:
    //      Sort function that sorts array of objects by their property
    factory.sortBy = function (property) {
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result;
        };
    };

    // summary:
    //      Sort function that sorts array of objects case sensitive/ insensitive by their property
    // description:
    //      Sort function that sorts array of objects case sensitive/ insensitive
	// 		property accepts additional boolean property specify the case sensitive
    factory.caseSortBy = function (property /* string*/, inSensitive /* boolean*/) {
        return function (a, b) {
            var result;
            if(inSensitive){
                result = (a[property].toString().toLowerCase() < b[property].toString().toLowerCase()) ? -1 :
                    (a[property].toString().toLowerCase() > b[property].toString().toLowerCase()) ? 1 : 0;
            }else{
                result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            }
            return result;
        };
    };

    // summary:
    //      Method to return an item in an array by its property and match
    // description:
    //      Method to return an item in an array by its property and match.
    //      This method accepts an array, property and match as params,
    //      and returns the the item based on the item's property match. By default property is "id"
    //      match can be a "String", "Number", "Boolean" or "Date" data types
    factory.itemByProperty = function(array, property, match) {
        var item;
        if(!property){
            property = "id";
        }
        if(match && array && array.length > 0) {
            for(var i = 0, len = array.length; i < len; i++){
                if(array[i][property] && array[i][property] === match){
                    item = array[i];
                    break;
                }
            }
        }
        return item;
    };
	// summary:
	//      Method to return an item in a nested array by its property and match
	// description:
	//      Method to return an item in a nested array by its property and match.
	//      This method accepts an array, property and match as params,
	//      and returns the the item based on the item's property match. By default property is "id"
	//      match can be a "String", "Number", "Boolean" or "Date" data types

	factory.nestedItemByProperty = function(array, property, nestedproperty, match) {
        var item;
        if(!property){
            property = "id";
        }
        if(match && array) {
            for(var i = 0; i < array.length; i++){
                if(array[i][nestedproperty]){
					item = factory.nestedItemByProperty(array[i][nestedproperty], property, nestedproperty, match);
					if(item !== undefined){
						return item;
					}
                }else if(array[i][property] === match){
					item = array[i];
					break;
				}
            }
        }
        return item;
    };

    // summary:
    //      Method to return index of the item in an array by its property
    // description:
    //      Method to return index of the item in an array by its property.
    //      This method accepts an array, property and item as params,
    //      and returns the index of the item in an array based on the item's
    //      property match. By default property is "id"
    factory.indexOfByProperty = function(array, property, item) {
        var index = -1;
        if(!property){
            property = "id";
        }
        if(item && array && array.length > 0) {
            for(var i = 0, len = array.length; i < len; i++){
                if(item[property] && array[i][property] && item[property] === array[i][property]){
                    index = i;
                    break;
                }
            }
        }
        return index;
    };

    // summary:
    //      Method to return unique array by its property
    // description:
    //      Method to return unique array by its property.
    //      This method accepts an array, property and property as params,
    //      and returns the unique array based on the item's property match.
    factory.uniqueArrayByProperty = function(array, property) {
        for(var i = 0; i < array.length; i++) {
            for(var j = i+1; j < array.length; j++) {
                if(!property || property === undefined){
                    if(array[i] === array[j]){
                        array.splice(j--, 1);
                    }
                } else {
                    if(array[i][property] === array[j][property]){
                        array.splice(j--, 1);
                    }
                }
            }
        }
        return array;
    };

    // summary:
    //      Method to return extended two objects
    factory.extendOptions = function(options, defaults) {
        //extend default options
        for (var prop in defaults) {
            if (!options.hasOwnProperty(prop) && defaults.hasOwnProperty(prop) ){
                options[prop] = defaults[prop];
            }
        }
        return options;
    };

    // summary:
    //      maps resource keys back to the properties.

    factory.resourceMap = function(array, resourceKey, name) {
		array.forEach(function(item){
            if(item.hasOwnProperty(resourceKey) && item.hasOwnProperty(name)) {
                item[name] = item[resourceKey];
            }
        });
    };

    return factory;
});

/**
    *
    * Licensed Materials - Property of IBM
    *
    * focus.directive.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.gridpreference")
.directive("focus", function() {
    return {
        restrict : "A",
        link : function postLink(scope, element, attrs) {
            if (attrs.focus === "") {
                attrs.focus = "focusElement";
            }
            scope.$watch(attrs.focus, function() {
                element[0].focus();
                element[0].select();
            });
            element.on("blur", function() {
                scope[attrs.focus] = "";
                scope.$apply();
            });
        }
    };
});
/**
    *
    * Licensed Materials - Property of IBM
    *
    * gridpreference.constant.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.gridpreference")
.constant("x1.ui.gridpreference.constant", {
    // build up the filter
    // ['equal','not equal', 'less', 'less or equal','greater','greater or equal',
    // 'begins with','does not begin with','is in','is not in','ends with','does not end with',
    // 'contains','does not contain']
    // ['eq','ne','lt','le','gt','ge','bw','bn','in','ni','ew','en','cn','nc']
   FilterOperators: {
	   EQUAL: "eq",
	   DOESNOTEQUAL: "ne",
	   LESSTHAN: "lt",
	   LESSTHANEQUAL: "le",
	   GREATERTHAN: "gt",
	   GREATERTHANEQUAL: "ge",
	   STARTSWITH: "bw",
	   DOESNOTSTARTSWITH: "bn",
	   IN: "in",
	   NOTIN: "ni",
	   ENDSWITH: "ew",
	   DOESNOTENDSWITH: "en",
	   CONTAIN: "cn",
	   DOESNOTCONTAIN: "nc",
	   Date: {
		   ON: "eq",
		   AFTER: "gt",
		   ONAFTER: "ge",
		   BEFORE: "lt",
		   ONBEFORE: "le",
		   NOTON: "ne"
	   }
   },
    Events: {
        AUTO_SAVE: "x1.ui.gridpreference.autosave",
        VIEW_CHANGE: "x1.ui.gridpreference.viewchange",
        CLEAR_FILTERS: "x1.ui.gridpreference.clearfilters",
        CLEAR_SORTS: "x1.ui.gridpreference.clearsorts"
    }
});

/**
    *
    * Licensed Materials - Property of IBM
    *
    * gridpreference.controller.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.gridpreference")
.controller("x1GridPreferenceCtrl", ["$scope", "x1Modal", "shareScopes", "$injector",
"x1GridPreferenceFactory", "commonUtilsFactory", "groupColumnUtilsFactory", "x1.ui.gridpreference.constant",
function($scope, modal, shareScopes, $injector,
    preferenceFactory, CommonUtils, GroupColumnUtils, prefDefaults) {
    shareScopes.store("x1GridPreferenceCtrl", $scope, $scope.gridId);
    $scope.gridId = $scope.gridId || Math.floor(Math.random() * 100) + 1000;
    $scope.idSelector = "#" + $scope.gridId;
    $scope.appService = $injector.get($scope.service);

    // Applications can pass their own service if they want
    $scope.gridServiceName = $scope.gridService || "jqgridService";
    $scope.gridService = $injector.get($scope.gridService || "jqgridService");

    $scope.preferenceChanged = false;

    $scope.mediumModal = {
        settings: {
            templateUrl: "gridpreference/templates/preferencewindow.html",
            size: "md"
        },
        data: {gridId: $scope.gridId}
    };

    $scope.refreshConfig = function(result) {
		result.views.forEach(function(view) {
            if(view.id === result.viewId){
                $scope.viewData = view;
            }
        });
        if($scope.viewData){
            $scope.$emit(prefDefaults.Events.VIEW_CHANGE, $scope.viewData);
        }
        $scope.firstTimeLoading = true;
        $scope.preferenceChanged = false;
        $scope.idProperty = result.idProperty || "index";
        $scope.hiddenProperty = result.hiddenProperty || "hidden";
        $scope.prefConfig = result;
        $scope.configData = angular.copy($scope.prefConfig);
		preferenceFactory.setPreference($scope.gridId, $scope.prefConfig);
        $scope.setViewDropDown();
        $scope.setColumns();
        $scope.setFilters();
        $scope.setSorts();
        $scope.setSortsParam();
        $scope.setFiltersParam();
        $scope.getGridData();
    };

    $scope.renderGrid = function() {
        $scope.gridOptions = $scope.prefConfig;
        $scope.gridService.setUpGridComplete($scope);
    };

    $scope.setData = function() {
        $scope.renderGrid();
    };

    $scope.setViewDropDown = function() {
        var viewList = $scope.prefConfig.views;
        if (!viewList) {
            return;
        }

        var companyViewList = [],
			userViewList = [],
			separator =[{separator:true}];

		viewList.forEach(function(view) {
            view.selected = (view.id === $scope.prefConfig.viewId);
            if(view.companyView){
				companyViewList.push(view);
            } else {
				userViewList.push(view);
            }
            if(view.selected) {
                $scope.selectedView = view;
            }
        });

		companyViewList.sort(CommonUtils.caseSortBy("name", true));
		userViewList.sort(CommonUtils.caseSortBy("name", true));
        viewList = companyViewList.concat(separator).concat(userViewList);
        $scope.companyView = companyViewList[0];
        $scope.viewDropDownCtrl = shareScopes.get("viewDropDownCtrl", $scope.gridId);
        $scope.viewDropDownCtrl.updateItems(viewList);
    };

    $scope.setColumns = function() {
        $scope.gridService.setColumns($scope);
    };

    $scope.getGridData = function() {
        $scope.gridService.getGridData($scope);
    };

    $scope.setFiltersParam = function() {
        $scope.gridService.setFiltersParam($scope);
    };

    $scope.setSortsParam = function() {
        $scope.gridService.setSortsParam($scope);
    };

    $scope.setSorts = function() {
        $scope.sorts = [];
		$scope.flatColumns.forEach(function(column){
            if (column.sortCriteria) {
                $scope.sorts.push(column);
            }
        });
        $scope.sorts.sort(function(a, b) {
            return a.sortCriteria.sortOrder - b.sortCriteria.sortOrder;
        });
    };

    $scope.setFilters = function() {
        $scope.filters = [];
		$scope.flatColumns.forEach(function(column){
            if (column.filterCriteria) {
                $scope.filters.push(column);
            }
        });
        $scope.filters.sort(function(a, b) {
            return a.filterCriteria.filterOrder - b.filterCriteria.filterOrder;
        });
    };

    $scope.getGridSortData = function() {
        return $scope.gridService.getGridSortData($scope);
    };

    $scope.getGridFilterData = function() {
        return $scope.gridService.getGridFilterData($scope);
    };

    $scope.onSave = function(isSaveAsNew) {
        var preferenceModal = shareScopes.get("PreferenceModalCtrl", $scope.gridId);
        var results = preferenceModal.getPreferenceSettings(isSaveAsNew);
        if (results) {
            $scope.updateResults($scope.configData.columns, results, false);
            // If save as new view then add a new entry to the current view list
            var newView;
            if(isSaveAsNew) {
                newView = $scope.createNewView(results);
            }
            $scope.saveConfigData(false, isSaveAsNew, newView);
            preferenceModal.onCancel();
        }
    };

    //Summary:
    //  AutoSave sort order and column width when
    //  PreferenceChanged attribute is set to true when
    //  1. sort order is updated using grid or
    //  2. column filter is updated using grid or
    //  3. Column width is updated using grid
    //  Auto Save will trigger every time preference changed is set to true and user changes a view.
    $scope.autoSave = function() {
        var results = {
            sorts :[],
			filters :[]
        };
		$scope.sorts.forEach(function(sortData){
            results.sorts.push({
				index: sortData.index,
                sortDirection: sortData.sortCriteria.sortDirection,
                sortOrder: sortData.sortCriteria.sortOrder
            });
        });

		$scope.filters.forEach(function(filterData){
            results.filters.push({
				index: filterData.index,
				value: filterData.filterCriteria.filter.value,
				filterOperator: filterData.filterCriteria.filterOperator,
				filterOrder: filterData.filterCriteria.filterOrder
            });
        });
        $scope.updateResults($scope.configData.columns, results, true);
        $scope.saveConfigData(true);
    };

    $scope.updateResults = function(columns, results, autoSave) {
       columns.forEach(function(column) {
		   if (column.hasOwnProperty("children")) {
			   $scope.updateResults(column.children, results, autoSave);
		   }
		   if(results.filters !== undefined){
			   column.filterCriteria = null;
			   $scope.updateFilterResults(results, column);
		   }
		   if(results.sorts !== undefined){
			   column.sortCriteria = null;
			   $scope.updateSortResults(results, column);
		   }
		   if(!autoSave){
			   $scope.updateColumnResults(results, column);
		   }
		   delete column.title;
        });
		$scope.setFiltersParam();
		$scope.setSortsParam();
    };

    $scope.updateFilterResults = function(results, column) {
		results.filters.forEach(function(filter){
			if (column[$scope.idProperty] === filter.index) {
				column.filterCriteria = {
					filter : {
						value : filter.value
					},
					filterOperator : filter.filterOperator,
					filterOrder : filter.filterOrder
				};
			}
		});
    };

    $scope.updateSortResults = function(results, column) {
		results.sorts.forEach(function(sort){
			if (column[$scope.idProperty] === sort.index) {
				column.sortCriteria = {
					sortOrder : sort.sortOrder,
					sortDirection : sort.sortDirection
				};
			}
		});
    };

    $scope.updateColumnResults = function(results, column) {
        for (var i = 0, len = results.columns.length; i < len; i++) {
            if (column[$scope.idProperty] === results.columns[i][$scope.idProperty]) {
                column.displayOrder = results.columns[i].displayOrder;
                column[$scope.hiddenProperty] = results.columns[i][$scope.hiddenProperty];
                break;
            }
        }
    };

    $scope.updateRowCount = function(rowCount) {
        $scope.configData.rowNum = rowCount;
    };

    $scope.createNewView = function(results) {
        var views = $scope.viewDropDownCtrl.getItems();
        views.sort(CommonUtils.sortBy("id"));

		views.forEach(function(view){
            view.selected = false;
        });

        var newView = {
            id: views[views.length - 1].id + 1,
            parentViewId: $scope.selectedView.parentViewId,
            name: results.viewName,
            companyView: false,
            selected: true
        };
        views.push(newView);
        return newView;
    };

    $scope.switchView = function(item) {
        if(!$scope.selectedView.companyView && $scope.preferenceChanged) {
            $scope.autoSave();
        }
        $scope.appService.getConfig(item.id, $scope.gridId, $scope.refreshConfig);
    };

    $scope.editView = function() {
        modal.show($scope.mediumModal);
    };

    $scope.refreshView = function() {
        $scope.gridService.refreshView($scope);
    };

    $scope.deleteView = function(item) {
        var viewList = $scope.viewDropDownCtrl.getItems(), reload = false,
			view, parentViewId = viewList[0].id;
        for(view in viewList){
			if(viewList[view].id === item.id){
				parentViewId = viewList[view].parentViewId;
				viewList.splice(view, 1);
				break;
			}
		}

        if($scope.selectedView.id === item.id) {
			for(view in viewList){
				if(viewList[view].id === parentViewId){
					viewList[view].selected = true;
					reload = true;
					break;
				}
			}
        }

        $scope.appService.deleteView(viewList, parentViewId, item.id, $scope.gridId, reload, $scope.refreshConfig);
    };

    $scope.saveConfigData = function(autoSave, saveAsNew, newView) {
        var view, viewList = $scope.viewDropDownCtrl.getItems();
        if(saveAsNew) {
            view = newView;
            $scope.configData.viewId = view.id;
        } else {
            view = $scope.selectedView;
        }

        CommonUtils.resourceMap($scope.configData.columns, "index", "name");
        if(autoSave) {
            $scope.appService.saveConfigData(view, viewList, $scope.configData, $scope.gridId, saveAsNew);
        } else {
            $scope.appService.saveConfigData(
                view, viewList, $scope.configData, $scope.gridId, saveAsNew, $scope.refreshConfig);
        }
    };

    $scope.$on(prefDefaults.Events.AUTO_SAVE, function() {
        if(!$scope.selectedView.companyView) {
            $scope.autoSave();
        }
    });
    // For now do this
    $scope.appService.getConfig($scope.viewId, $scope.gridId, $scope.refreshConfig);
}]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * gridpreference.directive.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.gridpreference")
.directive("x1GridPreference", function() {
    "use strict";
    return {
        restrict : "E",
        replace : true,
        scope : {
            service : "=",
            gridService: "=",
            gridId: "=",
            dataurl: "=",
            viewId: "=",
            gridTemplate: "="
        },
        templateUrl : "gridpreference/gridpreference.html",
        controller : "x1GridPreferenceCtrl"
    };
});

/**
    *
    * Licensed Materials - Property of IBM
    *
    * gridpreference.service.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.gridpreference")
.factory("x1GridPreferenceFactory", function() {
    var factory = {};
    factory.preference = {};

    factory.setPreference = function(gridId, preference) {
        factory.preference[gridId] = preference;
    };

    factory.getPreference = function(gridId) {
        return factory.preference[gridId];
    };
    return factory;
})

.factory("shareScopes", function() {
    var mem = {},
        factory = {};

    factory.store = function(key, value, gridId) {
        if(gridId) {
            if(!mem[gridId]) {
                mem[gridId] = {};
            }
            mem[gridId][key] = value;
        } else {
            mem[key] = value;
        }
    };

    factory.get = function(key, gridId) {
        if(gridId) {
            return mem[gridId][key];
        } else {
            return mem[key];
        }
    };
    return factory;
})

.filter("propsFilter", function() {
    return function(items, props) {
        var out = [];
        if (angular.isArray(items)) {
            items.forEach(function(item) {
                var itemMatches = false;
                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }
                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }
        return out;
    };
});

/**
    *
    * Licensed Materials - Property of IBM
    *
    * groupcolumn.utils.service.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.gridpreference")
.factory("groupColumnUtilsFactory", function() {
    var factory = {};

    // summary:
    //      Method to return items which has hidden property set to false
    // description:
    //      Method will recursively call itself if the item has children property and returns an array of items
    //      if the item property hidden is false
    factory.getDisplayedColumnsForTree = function(gridColumns, childrenProperty, hiddenProperty){
        var columns = angular.copy(gridColumns, columns);
        var result = [], j, jlen, hasChildren;
		columns.forEach(function(column) {
            if(column[hiddenProperty]){
                return;
            }
            hasChildren = column.hasOwnProperty(childrenProperty);
            // Either has type as parent or type is undefined or column has children
            // In all these three cases it is a parent item
            if(hasChildren || column.type === "parent" || column.type === undefined){
                // Parent column with or without children
                if(hasChildren) {
                    var children = [];
                    for(j = 0, jlen = column[childrenProperty].length; j < jlen; j++) {
                        if(!column[childrenProperty][j][hiddenProperty]) {
                            children.push(column[childrenProperty][j]);
                        }
                    }
                    column[childrenProperty] = children;
                    result = result.concat(column);
                } else {
                    // Column without children
                    result.push(column);
                }
            }
            else{
                result.push(column);
            }
        });
        return result;
    };

    // summary:
    //      Method to return items which has hidden property set to true
    // description:
    //      Method will recursively call itself if the item has children property and returns an array of items
    //      if the item property hidden is true
    factory.getAvailableColumnsForTree = function(gridColumns, childrenProperty, hiddenProperty) {
        var columns = angular.copy(gridColumns, columns);
        var result = [], j, jlen, hasChildren, anyHiddenChild;
		columns.forEach(function(column) {
            hasChildren = column.hasOwnProperty(childrenProperty);
            // Check for children property as well because on of the children might be a hidden column
            if(!column[hiddenProperty] && !hasChildren) {
                return;
            }

            // Check if any of the children is a hidden column
            if(hasChildren){
                anyHiddenChild = false;
                var children = [];
                for(j = 0, jlen = column[childrenProperty].length; j < jlen; j++){
                    if(column[childrenProperty][j][hiddenProperty]){
                        anyHiddenChild = true;
                        children.push(column[childrenProperty][j]);
                    }
                }
                if(anyHiddenChild){
                    column[childrenProperty] = children;
                    result = result.concat(column);
                }
            } else {
                if(column[hiddenProperty]){
                    result.push(column);
                }
            }
        });
        return result;
    };

    return factory;
});

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

angular.module("x1.ui.gridpreference")
.factory("jqgridService", ["commonUtilsFactory", "x1.ui.gridpreference.constant",
function(CommonUtils, prefDefaults) {
    var factory = {};

    factory.setColumns = function($scope) {
        var prefConfig = $scope.prefConfig;
        if ($scope.prefConfig.useGroupedHeaders) {
            var structuredData = factory.getStructuredColumnData($scope.prefConfig.columns);
            $scope.prefConfig.colModel = structuredData.columns;
            $scope.prefConfig.groupHeaders = structuredData.groupHeaders;
        } else {
            $scope.prefConfig.columns.sort(CommonUtils.sortBy("displayOrder"));
            // It is safe to directly assign columns
            $scope.prefConfig.colModel = prefConfig.columns;
        }
		// Handle colNames
		$scope.prefConfig.colNames = [];
		$scope.prefConfig.colModel.forEach(function(column){
			$scope.prefConfig.colNames.push(column.title);
		});
        $scope.flatColumns = $scope.prefConfig.colModel;
    };

    factory.setFiltersParam = function($scope) {
        if($scope.prefConfig.datatype === "local") {
            $scope.prefConfig.postData = {filters: factory.getClientFilterQuery($scope)};
        } else {
            $scope.prefConfig.postData = factory.getFilterQuery($scope);
        }
        $scope.prefConfig.search = true;
    };

    factory.getClientFilterQuery = function($scope) {
        var filters = { groupOp: "AND", groups: [], rules: []},
			filterOperators = prefDefaults.FilterOperators;
		if(!$scope.prefConfig.gridPreferences){
			$scope.prefConfig.gridPreferences= {};
		}
		$scope.filters.forEach(function(filterData){
			var filterCriteria = filterData.filterCriteria, rules =[],
				filterOperator = filterCriteria.filterOperator;
            if(filterOperator === "IN") {
                filterCriteria.filter.value.forEach(function (val){
					rules.push({
						field: filterData.index,
						op: "eq",
						data: val
					});
				});
				filters.groups.push({
					groupField: filterData.index,
					groupOp: "OR",
					rules: rules
				});
            } else {
                filters.rules.push({
                    field: filterData.index,
                    op: filterData.sorttype === "date"?
						filterOperators.Date[filterOperator]:filterOperators[filterOperator],
                    data: filterCriteria.filter.value
                });
            }
        });
		$scope.prefConfig.gridPreferences.filters = filters;
        return filters;
    };

    factory.getFilterQuery = function($scope) {                 // ????
        return {
            "filters" : {
                "groupOp": "AND",
				"groups": JSON.stringify($scope.filters.groups),
                "rules": JSON.stringify($scope.filters.rules)
            }
        };
    };

    factory.setSortsParam = function($scope) {
        var sortName = "", sortOrder = "";
		if(!$scope.prefConfig.gridPreferences){
			$scope.prefConfig.gridPreferences= {};
		}
		$scope.sorts.forEach(function(sortData, i){
            if(i !== $scope.sorts.length - 1) {
                sortName += sortData.index + " ";
                sortName += sortData.sortCriteria ? sortData.sortCriteria.sortDirection : sortData.sortDirection;
                sortName += ",";
            } else {
                sortName += sortData.index;
                sortOrder = sortData.sortCriteria ? sortData.sortCriteria.sortDirection : sortData.sortDirection;
            }
        });

		$scope.prefConfig.gridPreferences.sortname = $scope.prefConfig.sortname = sortName;
		$scope.prefConfig.gridPreferences.sortorder = $scope.prefConfig.sortorder = sortOrder;
    };

    factory.getGridData = function($scope) {
        if($scope.dataurl || $scope.prefConfig.url) {
            $scope.prefConfig.url = $scope.prefConfig.url || $scope.dataurl;
            $scope.gridData = [];
            $scope.renderGrid();
        } else {
           factory.setData($scope);
        }
    };

    factory.setData = function($scope) {
        $scope.appService.getData($scope.filters, $scope.sorts, $scope.gridId, function(result){
            $scope.gridData = result;
            $scope.setData();
        });
    };

    factory.setUpGridComplete = function($scope) {
        $scope.gridOptions.gridComplete = function() {
            if($scope.firstTimeLoading) {
                $scope.firstTimeLoading = false;
            }
        };

        $scope.gridOptions.loadComplete = function() {
            if($scope.prefConfig.datatype === "local") {
				jQuery($scope.idSelector).jqGrid("getGridParam", "postData");
				$scope.refreshView();
            }
        };

        $scope.gridOptions.onPaging = function(records, params) {
            $scope.updateRowCount(params.newRowNum);
            $scope.preferenceChanged = true;
        };

		$scope.$on("x1.ui.gridColumnSort", function(event, colData){
			$scope.preferenceChanged = true;
			$scope.sorts = [];

			var colModel = jQuery($scope.idSelector).jqGrid("getGridParam", "colModel"),
				column = colModel[colData.index];

			column.sortCriteria = {
				sortOrder:1,
				sortDirection:colData.sort
			};
			$scope.sorts.push(column);

			jQuery($scope.idSelector).jqGrid("setGridParam", {
				sortname: column.index,
				sortorder: column.sortCriteria.sortDirection
			});

			colModel.forEach(function(col){
				if(column.index !== col.index){
					col.lso = "";
				}
			});

			jQuery("#gview_" + $scope.gridId + " .ui-jqgrid-htable th .s-ico").hide();
			jQuery("#gview_" + $scope.gridId + " .ui-jqgrid-htable th .ui-icon-desc")
				.addClass("ui-state-disabled ui-jqgrid-disablePointerEvents");
			jQuery("#gview_" + $scope.gridId + " .ui-jqgrid-htable th .ui-icon-asc")
				.addClass("ui-state-disabled ui-jqgrid-disablePointerEvents");
			jQuery("#gview_" + $scope.gridId + " th").attr("aria-selected", false);

			var _th = jQuery($scope.idSelector + "_" + column.index);
			_th.find(".s-ico").show();
			_th.attr("aria-selected", true);

			if(column.lso === "asc") {
				_th.find(".ui-icon-asc").removeClass("ui-state-disabled ui-jqgrid-disablePointerEvents");
			} else if(column.lso === "asc-desc" || column.lso === "desc-asc") {
				_th.find(".ui-icon-desc").removeClass("ui-state-disabled ui-jqgrid-disablePointerEvents");
			}
			else {
				// removed the sort, so make $scope.sorts as empty array
				$scope.sorts = [];
				jQuery($scope.idSelector).jqGrid("setGridParam", {
					sortname: "",
					sortorder: ""
				});
			}

			if(column.lso !== "") {
				$scope.refreshView();
			}
		});

		$scope.$on("x1.ui.gridColumnStatesChanged", function(event, colStates){
			$scope.preferenceChanged = true;
			var colItem, i, l = $scope.configData.columns.length;
			for (i = 0; i < l; i++) {
				colItem = $scope.configData.columns[i];
				$scope.configData.columns[i] = jQuery.extend(true, {}, colItem, colStates[colItem.name]);
			}
			$scope.prefConfig.gridPreferences.colStates = colStates;
		});

		$scope.$on("x1.ui.gridColumnReorder", function(event, reorderObj){
			$scope.preferenceChanged = true;
			$scope.prefConfig.gridPreferences.permutation = reorderObj.permutation;
			// need to work on //
		});

		$scope.$on("x1.ui.gridFilterChanged", function(event, filters){
			$scope.preferenceChanged = true;
			$scope.filters = [];

			var value, colModel = $scope.prefConfig.colModel;
			if(filters.groups.length>0){
				filters.groups.forEach(function (group, i) {
					value = [];
					group.rules.forEach(function (rule) {
						value.push(rule.data);
					});
					for(var col in colModel){
						if(colModel[col].name === group.groupField){
							colModel[col].filterCriteria = {
								filter : {
									value : value
								},
								filterOperator : "IN",
								filterOrder : i + 1
							};
							$scope.filters.push(colModel[col]);
							break;
						}
					}
				});
			}
			if(filters.rules.length>0){
				filters.rules.forEach(function (rule, i) {
					for(var col in colModel){
						if(colModel[col].name === rule.field){
							colModel[col].filterCriteria = {
								filter : {
									value : rule.data
								},
								filterOperator : rule.op,
								filterOrder : i + 1
							};
							$scope.filters.push(colModel[col]);
							break;
						}
					}
				});
			}
		});
		$scope.prefConfig.postCompileScope = $scope;
    };

    factory.getGridSortData = function($scope) {
        var sortData = [];
		$scope.sorts.forEach(function(sortColumn){
            sortData.push({
                index: sortColumn.index,
                sortDirection: sortColumn.sortCriteria.sortDirection,
                sortOrder: sortColumn.sortCriteria.sortOrder
            });
        });
        return sortData;
    };

    factory.getGridFilterData = function($scope) {
        var filterData = [];
		$scope.filters.forEach(function(filterColumn){
            filterData.push({
                index: filterColumn.index,
                op: filterColumn.filterCriteria.filterOperator,
                data: filterColumn.filterCriteria.filter.value,
                filterOrder: filterColumn.filterCriteria.filterOrder
            });
        });
        return filterData;
    };

    // summary:
    //      jqGrid expects groupHeaders array to display group columns. Also it expects a flat list of colModel array
    //      to render the grid. But for the grid preferences we can't work with
    //      flat list without any child-parent relationship.
    //      Hence this method converts the hierarchical data structure to a flat list of columns.
    //      Additionally this method dynamically creates groupHeaders array that needs to be passed to jqGrid
    factory.getStructuredColumnData = function(/*Array*/columns){
        var structuredColumnData = factory.createColumns(columns);
        var finalColumns = structuredColumnData.visibleColumns.concat(structuredColumnData.hiddenColumns);
        return {
            columns: finalColumns,
            groupHeaders: structuredColumnData.groupHeaders
        };
    };

    factory.createColumns = function(/*Array*/columns){
		var _columns = [];
		if(columns instanceof Array){
			_columns = columns.sort(CommonUtils.sortBy("displayOrder"));
		} else {
			if(columns.children){
				_columns = columns.children.sort(CommonUtils.sortBy("displayOrder"));
			} else {
				_columns.push(columns);
			}
		}

		function getGridColumns(_columns){
			var i, counter = 0, len, hiddenColumnArray = [],
				visibleColumnArray = [], groupHeaders = [], numberOfColumns = 0;
			// For each column
			for(i = 0, len = _columns.length; i < len; i++){
				// check if the column doesn't have children and not hidden,
				// then push to visible columns and increment the counter
				if(!_columns[i].children && !_columns[i].hidden){
					counter++;
					visibleColumnArray.push(_columns[i]);
				} else {
					// might be a hidden column or column that has children
					// If the column is not hidden and has children
					if(_columns[i].children && !_columns[i].hidden){
						var intermediateGroup = factory.createColumns(_columns[i].children);
						groupHeaders.push({
							startColumnName: intermediateGroup.visibleColumns[0].name,
							numberOfColumns: intermediateGroup.numberOfColumns,
							titleText: _columns[i].title
						});
						visibleColumnArray = visibleColumnArray.concat(intermediateGroup.visibleColumns);
						hiddenColumnArray = hiddenColumnArray.concat(intermediateGroup.hiddenColumns);
					} else if(_columns[i].children && _columns[i].hidden){
						// if the column has children and is hidden, then just loop through the children and
						// and make all the children hidden, because if the parent is hidden, by default all the
						// children are hidden. Push all the children to hidden columns array
						for(var h = 0, hlen = _columns[i].children.length; h < hlen; h++){
							_columns[i].children[h].hidden = true;
							hiddenColumnArray.push(_columns[i].children[h]);
						}
					} else {
						// If column doesn't have children and is hidden
						hiddenColumnArray.push(_columns[i]);
					}
				}
			}
			if(counter > 0){
				numberOfColumns = counter;
				counter = 0;
			}
			return {
				numberOfColumns: numberOfColumns,
				groupHeaders: groupHeaders,
				visibleColumns: visibleColumnArray,
				hiddenColumns: hiddenColumnArray
			};
		}
		return getGridColumns(_columns);
    };

    factory.getColumnDefinition = function($scope) {
        return jQuery($scope.idSelector).jqGrid("getGridParam", "colModel");
    };

    factory.refreshView = function($scope) {
		jQuery($scope.idSelector).trigger("reloadGrid");
    };

    return factory;
}]);

/**
 *
 * Licensed Materials - Property of IBM
 *
 * number-filter.directive.js
 *
 * (C) Copyright IBM Corporation 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular.module("x1.ui.gridpreference")
	.directive("numberFilter", function () {
		return {
			require: "ngModel",
			restrict: "A",
			scope: {
				numberFilter: "@?",
				decimalDelimiter: "@?",
                filterPrecision:"@?"
			},
			link: function (scope, element, attr, ngModelCtrl) {
				function fromUser(text) {
					var position;
					var foundItems;
					var deprecatedSymbols;
					var transformedInput;
					var decimalDelimiter;

					if (text) {
						deprecatedSymbols = new RegExp(scope.numberFilter, "g");
						transformedInput = text.replace(deprecatedSymbols, "");

						if (scope.decimalDelimiter) {
							decimalDelimiter = new RegExp(scope.decimalDelimiter, "g");
							foundItems = text.match(decimalDelimiter);

							if (foundItems && foundItems.length > 1) {
								position = text.search(scope.decimalDelimiter);
								transformedInput = text.substr(0, position + 1) +
									text.substr(position, text.length).replace(decimalDelimiter, "");
							}
						}
						if(scope.filterPrecision==="0"){
                            if(!isNaN(parseInt(transformedInput))){
                                 transformedInput =parseInt(transformedInput).toFixed(0);
                            }
						}
						if (transformedInput !== text) {
							ngModelCtrl.$setViewValue(transformedInput);
							ngModelCtrl.$render();
						}
						return transformedInput;
					}
					return 0;
				}
				ngModelCtrl.$parsers.push(fromUser);
			}
		};
	});

/**
    *
    * Licensed Materials - Property of IBM
    *
    * filtersetting.constant.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.columnsetting")
.constant("x1UiColumnSettingDefaults", {
    // hiddenProperty: String
    //      property in data object to indicate the hidden property. Default is "hidden"
    hiddenProperty: "hidden",

    // childrenProperty: String
    //      property in data object to represent children array. Default is "children"
    childrenProperty: "children",

    // labelAttr: String
    //      data property that defines the label attribute
    labelAttr: "name"
});
/**
    *
    * Licensed Materials - Property of IBM
    *
    * columnsetting.controller.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.columnsetting")
.controller("ColumnSettingCtrl", ["$scope", "shareScopes", "groupColumnUtilsFactory",
"commonUtilsFactory", "x1UiColumnSettingDefaults",
function($scope, shareScopes, GroupColumnUtil, CommonUtils, x1UiColumnSettingDefaults) {
    $scope.gridId = $scope.$parent.gridId;
    shareScopes.store("ColumnSettingCtrl", $scope, $scope.gridId);
    $scope.options = CommonUtils.extendOptions($scope.options, x1UiColumnSettingDefaults);
    $scope.idProperty = $scope.options.idProperty || "index";

    $scope.treeOptions = {
        multiSelection: true,
        injectClasses: {
            "ul": "tree-control-ul",
            "li": "tree-control-li",
            "liSelected": "tree-highlight"
        }
    };

    $scope.columns = [];
    $scope.displayedTreeSearchQuery = "";
    $scope.availableTreeSearchQuery = "";
    $scope.displayedTreeComparator = false;
    $scope.availableTreeComparator = false;
    $scope.displayedTreeSelectedNodes = [];
    $scope.availableTreeSelectedNodes = [];
    $scope.availableTreeExpandedNodes = [];
    $scope.displayedTreeExpandedNodes = [];
    $scope.disableLeftArrow = true;
    $scope.disableRightArrow = true;
    $scope.disableLeftAllArrow = true;
    $scope.disableRightAllArrow = true;
    $scope.disableUpArrow = true;
    $scope.disableDownArrow = true;
    $scope.disableTopArrow = true;
    $scope.disableBottomArrow = true;

    $scope.displayedColumns = GroupColumnUtil.getDisplayedColumnsForTree(
        $scope.options.columns,
        $scope.options.childrenProperty,
        $scope.options.hiddenProperty
    );
    $scope.availableColumns = GroupColumnUtil.getAvailableColumnsForTree(
        $scope.options.columns,
        $scope.options.childrenProperty,
        $scope.options.hiddenProperty
    );
    $scope.displayedColumns = $scope.displayedColumns.sort(CommonUtils.sortBy("displayOrder"));
    $scope.availableColumns = $scope.availableColumns.sort(CommonUtils.sortBy("title"));

    $scope.getColumns = function() {
        $scope.updateDisplayOrder();
        return $scope.columns;
    };

    $scope.updateCounts = function(){
        $scope.availableCount = 0;
        $scope.displayedCount = 0;
        var i = 0, len;
        for(len = $scope.availableColumns.length; i < len; i++){
            if($scope.availableColumns[i].hasOwnProperty("children")){
                $scope.availableCount += $scope.availableColumns[i].children.length;
            } else {
                $scope.availableCount++;
            }
        }

        for(i = 0, len = $scope.displayedColumns.length; i < len; i++){
            if($scope.displayedColumns[i].hasOwnProperty("children")){
                $scope.displayedCount += $scope.displayedColumns[i].children.length;
            } else {
                $scope.displayedCount++;
            }
        }
    };

    $scope.displayedTreeSelection = function() {
        $scope.availableTreeSelectedNodes = [];
        $scope.toggleArrowButtons();
        $scope.toggleUpDownButtons();
    };

    $scope.availableTreeSelection = function() {
        $scope.displayedTreeSelectedNodes = [];
        $scope.toggleArrowButtons();
        $scope.toggleUpDownButtons();
    };

    $scope.toggleArrowButtons = function() {
        $scope.disableLeftArrow = $scope.displayedTreeSelectedNodes.length <= 0;
        $scope.disableRightArrow = $scope.availableTreeSelectedNodes.length <= 0;
        $scope.disableLeftAllArrow = $scope.displayedColumns.length <= 0;
        $scope.disableRightAllArrow = $scope.availableColumns.length <= 0;
    };

    $scope.toggleUpDownButtons = function() {
        /*jshint maxcomplexity:false */
        if($scope.displayedColumns && $scope.displayedTreeSelectedNodes.length > 0){
            var i = 0,
                len = $scope.displayedTreeSelectedNodes.length,
                node,
                parent,
                index = 0,
                moveUp = false,
                moveDown = false;
            // First check if the node can move up the tree
            for(; i < len; i++) {
                node = $scope.displayedTreeSelectedNodes[i];
                index = CommonUtils.indexOfByProperty($scope.displayedColumns, $scope.idProperty, node);
                if(index < 0) {
                    // child node
                    parent = CommonUtils.itemByProperty($scope.displayedColumns, $scope.idProperty, node.parent);
                    index = CommonUtils.indexOfByProperty(parent.children, $scope.idProperty, node);
                }
                moveUp = (index !== 0);
                if(moveUp) {
					break;
				}
            }
            // Check if the node can move down the tree
            for(i = 0; i < len; i++) {
                node = $scope.displayedTreeSelectedNodes[i];
                index = CommonUtils.indexOfByProperty($scope.displayedColumns, $scope.idProperty, node);
                if(index < 0) {
                    // child node
                    parent = CommonUtils.itemByProperty($scope.displayedColumns, $scope.idProperty, node.parent);
                    index = CommonUtils.indexOfByProperty(parent.children, $scope.idProperty, node);
                    index = (index === parent.children.length - 1) ? $scope.displayedColumns.length : index;
                }
                moveDown = (index < $scope.displayedColumns.length - 1);
                if(moveDown) {
					break;
				}
            }
            $scope.disableUpArrow = $scope.disableTopArrow = !moveUp;
            $scope.disableDownArrow = $scope.disableBottomArrow = !moveDown;
        } else {
            $scope.disableUpArrow = true;
            $scope.disableTopArrow = true;
            $scope.disableDownArrow = true;
            $scope.disableBottomArrow = true;
        }
    };

    $scope.onMoveToAvailable = function(e) {
        if($scope.displayedTreeSelectedNodes.length <= 0){
            e.preventDefault();
            return false;
        } else {
            var results = $scope.moveItems(
                $scope.displayedTreeSelectedNodes, $scope.displayedColumns, $scope.availableColumns);
            $scope.displayedTreeSelectedNodes = [];
            $scope.availableTreeSelectedNodes = results.nodesToSelect;
            $scope.availableTreeExpandedNodes = $scope.availableTreeExpandedNodes.concat(results.nodesToExpand);
            $scope.toggleArrowButtons();
            $scope.toggleUpDownButtons();
        }
    };

    $scope.onMoveToDisplayed = function(e) {
        if($scope.availableTreeSelectedNodes.length <= 0){
            e.preventDefault();
            return false;
        } else {
            var results = $scope.moveItems(
                $scope.availableTreeSelectedNodes, $scope.availableColumns, $scope.displayedColumns);
            $scope.availableTreeSelectedNodes = [];
            $scope.displayedTreeSelectedNodes = results.nodesToSelect;
            $scope.displayedTreeExpandedNodes = $scope.displayedTreeExpandedNodes.concat(results.nodesToExpand);
            $scope.toggleArrowButtons();
            $scope.toggleUpDownButtons();
        }
    };

    $scope.onMoveAllToDisplayed = function() {
        var results = $scope.moveItems($scope.availableColumns, $scope.availableColumns, $scope.displayedColumns);
        $scope.availableTreeSelectedNodes = [];
        $scope.displayedTreeSelectedNodes = [];
        $scope.displayedTreeExpandedNodes = $scope.displayedTreeExpandedNodes.concat(results.nodesToExpand);
    };

    $scope.onMoveAllToAvailable = function() {
        var results = $scope.moveItems($scope.displayedColumns, $scope.displayedColumns, $scope.availableColumns);
        $scope.displayedTreeSelectedNodes = [];
        $scope.availableTreeSelectedNodes = [];
        $scope.availableTreeExpandedNodes = $scope.availableTreeExpandedNodes.concat(results.nodesToExpand);
    };

    $scope.onMoveUp = function(e) {
        $scope.moveItemsUpOrDown(true, e);
    };

    $scope.onMoveDown = function(e) {
        $scope.moveItemsUpOrDown(false, e);
    };

    $scope.onMoveToTop = function(e) {
        $scope.moveItemTopOrBottom(true, e);
    };

    $scope.onMoveToBottom = function(e) {
        $scope.moveItemTopOrBottom(false, e);
    };

    $scope.moveItems = function(selectedNodes, source, destination) {
        var deletedNodes = [], nodesToExpand = [], nodesToSelect = [];
        angular.forEach(selectedNodes, function(selectedNode){
            var node = angular.copy(selectedNode, node);
            var destinationIndex = CommonUtils.indexOfByProperty(destination, $scope.idProperty, node);
            var sourceIndex = CommonUtils.indexOfByProperty(source, $scope.idProperty, node);
            // If parent node
            if(node.hasOwnProperty("children")) {
                // To be safer get the node from the tree, because selectedNodes might be outdated
                node = CommonUtils.itemByProperty(source, $scope.idProperty, node[$scope.idProperty]);
                // Check if parent already exist in the destination
                if(destinationIndex > -1) {
                    // node already exist in the destination tree, just append the children
                    destination[destinationIndex].children =
                        destination[destinationIndex].children.concat(node.children);
                    nodesToSelect = nodesToSelect.concat(node.children);
                } else {
                    destination.push(node);
                }
                // By default mark all the children as deleted nodes
                deletedNodes = deletedNodes.concat(node);
                nodesToExpand = nodesToExpand.concat(node);
            } else {
                // check if the node was already deleted as part of parent removal
                if(CommonUtils.indexOfByProperty(deletedNodes, $scope.idProperty, node) > -1){
                    //already deleted so just continue
                    return;
                } else {
                    if(sourceIndex < 0) {
                        // just the child node
                        // Get the child index from the parent
                        var parent = CommonUtils.itemByProperty(source, $scope.idProperty, node.parent);
                        var childIndex = CommonUtils.indexOfByProperty(parent.children, $scope.idProperty, node);
                        // check if the parent already exists in the destination tree
                        var parentIndex = CommonUtils.indexOfByProperty(destination, $scope.idProperty, parent);
                        if(parentIndex > -1) {
                            // parent already exist, just append the child
                            destination[parentIndex].children = destination[parentIndex].children.concat(node);
                        } else {
                            // parent doesn't exist, hence create the parent and then append the child
                            var newParent = angular.copy(parent, newParent);
                            newParent.children = [];
                            newParent.children.push(node);
                            destination.push(newParent);
                        }
                        parentIndex = CommonUtils.indexOfByProperty(source, $scope.idProperty, parent);
                        nodesToExpand = nodesToExpand.concat(parent);
                        source[parentIndex].children.splice(childIndex, 1);
                        // check if all the children are deleted
                        if(source[parentIndex].children.length === 0) {
                            // delete the parent as well
                            deletedNodes = deletedNodes.concat(parent);
                        }
                    } else {
                        // node without a parent or children
                        deletedNodes = deletedNodes.concat(node);
                        destination.push(node);
                    }
                }
            }
            nodesToSelect = nodesToSelect.concat(node);
        });
        // Delete all the selected nodes from the source tree
        $scope.deleteNodes(deletedNodes, source);
        // Update the counts after moving nodes
        $scope.updateCounts();
        return {
            nodesToExpand: nodesToExpand,
            nodesToSelect: nodesToSelect
        };
    };

    $scope.moveItemsUpOrDown = function(/*Boolean*/isUp, /*Event*/e) {
        if($scope.displayedTreeSelectedNodes.length <= 0){
            e.preventDefault();
            return false;
        }
        var deletedNodes = [], moveNodes = [], selectedNodes = [];
        angular.forEach($scope.displayedTreeSelectedNodes, function(node){
            var originalIndex, lastIndex, parentNode, isParent = true;
            if(!node.hasOwnProperty("parent")) {
                originalIndex = CommonUtils.indexOfByProperty($scope.displayedColumns, $scope.idProperty, node);
                lastIndex = $scope.displayedColumns.length;
            } else {
                parentNode = CommonUtils.itemByProperty($scope.displayedColumns, $scope.idProperty, node.parent);
                originalIndex = CommonUtils.indexOfByProperty(parentNode.children, $scope.idProperty, node);
                lastIndex = parentNode.children.length;
                isParent = false;
            }
            // We don't want to move the first item up or the last item down
            if((isUp && originalIndex === 0) || (!isUp && originalIndex + 1 === lastIndex)){
                return;
            } else {
                var insertIndex = isUp ? originalIndex - 1 : originalIndex + 1;
                if(!isParent){
                    var childrenNodes = parentNode.children;
                    childrenNodes.splice(originalIndex, 1);
                    childrenNodes.splice(insertIndex, 0, node);
                } else {
                    deletedNodes = deletedNodes.concat(node);
                    moveNodes.push({
                        node: node,
                        originalIndex: originalIndex,
                        insertIndex: insertIndex
                    });
                }
            }
            selectedNodes.push(node);
        });
        // First delete the selected nodes
        $scope.deleteNodes(deletedNodes, $scope.displayedColumns);
        // Sort by original index
        moveNodes = moveNodes.sort(CommonUtils.sortBy("originalIndex"));
        angular.forEach(moveNodes, function(item){
            $scope.displayedColumns.splice(item.insertIndex, 0, item.node);
        });
        $scope.displayedTreeSelectedNodes = selectedNodes;
        $scope.toggleUpDownButtons();
    };

    $scope.moveItemTopOrBottom = function(toTop) {
        if($scope.displayedTreeSelectedNodes.length <= 0){
            return false;
        }
        var deletedNodes = [], moveNodes = [];
        angular.forEach($scope.displayedTreeSelectedNodes, function(node){
            var originalIndex;
            if(!node.hasOwnProperty("parent")) {
                originalIndex = CommonUtils.indexOfByProperty($scope.displayedColumns, $scope.idProperty, node);
                deletedNodes.push(node);
                moveNodes.push({
                    originalIndex: originalIndex,
                    node: node
                });
            } else {
                var parentNode, childrenNodes = [];
                parentNode = CommonUtils.itemByProperty($scope.displayedColumns, $scope.idProperty, node.parent);
                originalIndex = CommonUtils.indexOfByProperty(parentNode.children, $scope.idProperty, node);
                childrenNodes = parentNode.children;
                childrenNodes.splice(originalIndex, 1);
                if(toTop) {
                    childrenNodes.splice(0, 0, node);
                } else {
                    childrenNodes.push(node);
                }
            }
        });
        $scope.deleteNodes(deletedNodes, $scope.displayedColumns);
        moveNodes = moveNodes.sort(CommonUtils.sortBy("originalIndex"));
        if(toTop) {
            moveNodes.reverse();
        }
        angular.forEach(moveNodes, function(item) {
            if(toTop) {
                $scope.displayedColumns.unshift(item.node);
            } else {
                $scope.displayedColumns.push(item.node);
            }
        });

        $scope.toggleUpDownButtons();
    };

    $scope.deleteNodes = function(nodes, source) {
        nodes = CommonUtils.uniqueArrayByProperty(nodes, $scope.idProperty);
        angular.forEach(nodes, function(node){
            // get the index of the node in the source tree
            var index = CommonUtils.indexOfByProperty(source, $scope.idProperty, node);
            if(index < 0) {
                // may be a child node or the node has already deleted
                // get the parent
                if(!node.parent) {
                    return;
                }
                var parent = CommonUtils.itemByProperty(source, $scope.idProperty, node.parent);
                if(parent) {
                    var parentIndex = CommonUtils.indexOfByProperty(source, $scope.idProperty, parent);
                    var childIndex = CommonUtils.indexOfByProperty(parent.children, $scope.idProperty, node);
                    source[parentIndex].children.splice(childIndex, 1);
                }
            } else {
                source.splice(index, 1);
            }
        });
    };

    $scope.updateDisplayOrder = function() {
        var displayedArray = $scope.displayedColumns,
            len = displayedArray.length;
        $scope.columns = [];

        // update display order and hidden property for displayedTree
        angular.forEach($scope.displayedColumns, function(item, i) {
            item[$scope.options.hiddenProperty] = false;
            item.displayOrder = i + 1;
            if(item.hasOwnProperty("children")) {
                angular.forEach(item.children, function(child, j) {
                    child[$scope.options.hiddenProperty] = false;
                    child.displayOrder = j + 1;
                    $scope.columns.push(child);
                });
            }
        }, this);

        $scope.columns = $scope.columns.concat($scope.displayedColumns);

        angular.forEach($scope.availableColumns, function(item, i) {
            if(item.hasOwnProperty("children")) {
                // check if the parent also exist in display tree
                var index = CommonUtils.indexOfByProperty($scope.columns, $scope.idProperty, item);
                if(index > -1) {
                    // item already exist, just add the children to column array
                    len--;
                    angular.forEach(item.children, function(child, j) {
                        child[$scope.options.hiddenProperty] = true;
                        child.displayOrder = $scope.columns[index].children.length + j + 1;
                        $scope.columns.push(child);
                    });
                } else {
                    item[$scope.options.hiddenProperty] = true;
                    item.displayOrder = i + len + 1;
                    angular.forEach(item.children, function(child, j) {
                        child[$scope.options.hiddenProperty] = true;
                        child.displayOrder = j + 1;
                        $scope.columns.push(child);
                    });
                    $scope.columns.push(item);
                }
            } else {
                item[$scope.options.hiddenProperty] = true;
                item.displayOrder = i + len + 1;
                $scope.columns.push(item);
            }
        }, this);
    };

    $scope.validate = function() {
        $scope.errorMessage = [];
        var isValid = true;
        if($scope.displayedColumns.length <= 0) {
            isValid = false;
            $scope.errorMessage.push("x1UiNgGridPreference.common.displayListEmptyMsg");
        }
        return isValid;
    };

    $scope.updateCounts();
    $scope.toggleArrowButtons();
    $scope.toggleUpDownButtons();

    /*
    angular.forEach($scope.displayedColumns, function(column){
        if(column.hasOwnProperty("children")) {
            column.widgets = column.children;
            delete column.children;
        }
    });

    angular.forEach($scope.availableColumns, function(column){
        if(column.hasOwnProperty("children")) {
            column.widgets = column.children;
            delete column.children;
        }
    });
    */
}]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * columnsetting.directive.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.columnsetting")
    .directive("x1ColumnSetting", [function() {
        return {
            restrict: "E",
            scope: {
                options: "="
            },
            replace: true,
            templateUrl: "gridpreference/columnsetting/columnsetting.html",
            controller: "ColumnSettingCtrl"
        };
    }]);
/**
    *
    * Licensed Materials - Property of IBM
    *
    * filtersetting.constant.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.filtersetting")
.constant("x1UiFilterSettingDefaults", {
    // maxFilter: Number
    //      reference to hold maximum sorts that are allowed. Default is Infinity
    maxFilter: "Infinity",

    // sortOnHiddenColumns: Boolean
    //      flag to indicate whether to show hidden columns in the drop down. Default is true
    filterOnHiddenColumns: true,

    // hiddenProperty: String
    //      property in data object to indicate the hidden property. Default is "hidden"
    hiddenProperty: "hidden",

    // sortByProperty: String
    //      property in data object to sort. Default is "name"
    sortByProperty: "name",

    // childrenProperty: String
    //      property in data object to represent children array. Default is "children"
    childrenProperty: "children",

    // groupProperty: String
    //      property in data object to represent group array. Default is "groups"
    groupProperty: "groups",

    // labelAttr: String
    //      data property that defines the label attribute
    labelAttr: "name",

    // filterOrderProperty: String
    //      property in data object that describes sort order. Default is "sortOrder"
    filterOrderProperty: "filterOrder"
});

/**
    *
    * Licensed Materials - Property of IBM
    *
    * filtersetting.controller.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.filtersetting")
.controller("FiltersettingCtrl", ["$scope", "x1UiFilterSettingDefaults", "commonUtilsFactory",
    "groupColumnUtilsFactory", "$translate", "shareScopes",
function($scope, x1UiFilterSettingDefaults, factory, gFactory, $translate, shareScopes) {
    $scope.gridId = $scope.$parent.gridId;
    shareScopes.store("FiltersettingCtrl", $scope, $scope.gridId);
    // errorMessage: String
    //      reference for error messages if any during the validation
    $scope.errorMessage = "";

    $scope.operatorGroup = {
        stringType : [
            {id : "CONTAIN", name: $translate.instant("x1UiNgGridPreference.operatorGroup.Contains")},
            {id : "DOESNOTCONTAIN", name: $translate.instant("x1UiNgGridPreference.operatorGroup.DoesNotContain")},
            {id : "EQUAL", name: $translate.instant("x1UiNgGridPreference.operatorGroup.Equal")},
            {id : "DOESNOTEQUAL", name: $translate.instant("x1UiNgGridPreference.operatorGroup.DoesNotEqual")},
            {id : "STARTSWITH", name: $translate.instant("x1UiNgGridPreference.operatorGroup.StartWith")},
            {id : "ENDSWITH", name: $translate.instant("x1UiNgGridPreference.operatorGroup.EndWith")},
            {id : "DOESNOTSTARTSWITH", name: $translate.instant("x1UiNgGridPreference.operatorGroup.DoesNotStartWith")},
            {id : "DOESNOTENDSWITH", name: $translate.instant("x1UiNgGridPreference.operatorGroup.DoesNotEndWith")}
        ],

        numberType : [
            {id : "EQUAL", name: $translate.instant("x1UiNgGridPreference.operatorGroup.Equal")},
            {id : "DOESNOTEQUAL", name: $translate.instant("x1UiNgGridPreference.operatorGroup.DoesNotEqual")},
            {id : "GREATERTHAN", name: $translate.instant("x1UiNgGridPreference.operatorGroup.GreaterThan")},
            {id : "GREATERTHANEQUAL", name: $translate.instant("x1UiNgGridPreference.operatorGroup.GreaterThanEqual")},
            {id : "LESSTHAN", name: $translate.instant("x1UiNgGridPreference.operatorGroup.LessThan")},
            {id : "LESSTHANEQUAL", name: $translate.instant("x1UiNgGridPreference.operatorGroup.LessThanEqual")}
        ],

        dateType : [
            {id : "ON", name: $translate.instant("x1UiNgGridPreference.operatorGroup.IsOn")},
            {id : "NOTON", name: $translate.instant("x1UiNgGridPreference.operatorGroup.IsNotOn")},
            {id : "AFTER", name: $translate.instant("x1UiNgGridPreference.operatorGroup.After")},
            {id : "ONAFTER", name: $translate.instant("x1UiNgGridPreference.operatorGroup.IsOnAfter")},
            {id : "BEFORE", name: $translate.instant("x1UiNgGridPreference.operatorGroup.Before")},
            {id : "ONBEFORE", name: $translate.instant("x1UiNgGridPreference.operatorGroup.IsOnBefore")}
        ],

        enumType : [
            {id : "IN", name: $translate.instant("x1UiNgGridPreference.operatorGroup.In")}
            //{id : "NOTIN", name: $translate.instant("x1UiNgGridPreference.operatorGroup.NotIn")}
        ],

        booleanType : [
            {id : "EQUAL", name: $translate.instant("x1UiNgGridPreference.operatorGroup.Equal")}
        ]
    };

    x1UiFilterSettingDefaults.duplicateColumn = "x1UiNgGridPreference.common.duplicateFilterColumnMsg";
    x1UiFilterSettingDefaults.missingColumn = "x1UiNgGridPreference.common.blankFilterColumn";
    x1UiFilterSettingDefaults.missingFilterOperator = "x1UiNgGridPreference.common.blankFilterOperator";

    $scope.options = factory.extendOptions($scope.options, x1UiFilterSettingDefaults);
    $scope.idProperty = $scope.options.idProperty || "index";
    $scope.columns = angular.copy($scope.options.columns);
    // sort the columns by sortByProperty
    $scope.columns.sort(factory.caseSortBy($scope.options.sortByProperty, true));
    $scope.visibleColumns = [];
    $scope.hiddenColumns = [];

	// Construct an id, grouping relationship & localized labels for x1Select
	angular.forEach($scope.columns, function(column, i){
		column.id = i;
		column.name = column.title;
		if(column.hasOwnProperty($scope.options.childrenProperty)){
			column.groups = angular.copy(column.children);
			angular.forEach(column.groups, function(child, k){
				child.id = child.parent + k;
				child.name = child.title;
			});
		}
	});

	if(!$scope.options.filterOnHiddenColumns) {
        // separate hidden columns and visible columns
        angular.forEach($scope.columns, function(column){
            if(column[$scope.options.hiddenProperty]) {
                $scope.hiddenColumns.push(column);
            } else {
                $scope.visibleColumns.push(column);
            }
        });
    } else {
        $scope.visibleColumns = $scope.columns;
    }

    // filter out the filterable columns based on "filterable" property
    $scope.visibleColumns = getFilterableColumns($scope.visibleColumns);

    // Construct data object for filter row
    $scope.filterRows = [];
    angular.forEach($scope.filterData, function(filterData){
        $scope.filterRows.push({
            columnArray: $scope.columns,
            visibleColumns: $scope.visibleColumns,
            hiddenColumns: $scope.hiddenColumns,
            filterOnHiddenColumns: $scope.options.filterOnHiddenColumns,
            operatorGroup: $scope.operatorGroup,
            filterData: factory.nestedItemByProperty(
				$scope.columns, $scope.idProperty, $scope.options.groupProperty, filterData[$scope.idProperty])
        });
    });

    $scope.addNewRow = function() {
        $scope.filterRows.push({
            columnArray: $scope.columns,
            visibleColumns: $scope.visibleColumns,
            hiddenColumns: $scope.hiddenColumns,
            filterOnHiddenColumns: $scope.options.filterOnHiddenColumns,
            operatorGroup: $scope.operatorGroup,
            filterData: {}
        });
        $scope.disableAdd();
    };

    $scope.removeFilterRow = function(filterRow) {
        var elementPos = $scope.filterRows.map(function(item) {
            return item.filterData[$scope.idProperty];
        }).indexOf(filterRow.filterRowData.filterData[$scope.idProperty]);
        $scope.filterRows.splice(elementPos, 1);
    };

    $scope.clearAllRows = function() {
        $scope.filterRows = [];
    };

    $scope.disableAdd = function() {
		$scope.addDisabled = !($scope.options.maxFilter === "Infinity" ||
		$scope.options.maxFilter > $scope.filterRows.length);
		return $scope.addDisabled;
	};

	$scope.getBooleanValue = function(filterRow){
		return filterRow.filterData.filterOptions[filterRow.value].value;
	};

    $scope.validate = function() {
        $scope.errorMessage = [];
        var isValid = true;
        $scope.filters = [];

        angular.forEach($scope.filterRows, function(filterRow, i) {
            if(isValid && filterRow.filterData[$scope.idProperty] && filterRow.selectedOperator.id) {
                var filterObject = {
                    index: filterRow.filterData[$scope.idProperty],
                    filterOperator: filterRow.selectedOperator.id,
                    filterOrder: i + 1
                };

                var value;
                if(filterRow.filterData.sorttype === "enum") {
                    value = [];
					filterRow.value.forEach(function(row){
						value.push(row.value);
					});
                } else if(filterRow.filterData.sorttype === "enumcsv") {
					value = filterRow.value.split(",");
				}else if(filterRow.filterData.sorttype === "boolean") {
					value = $scope.getBooleanValue(filterRow);
				}else {
                    value = filterRow.value;
                }
                filterObject.value = value;

                var ifItemExists = factory.indexOfByProperty($scope.filters, "index", filterObject);
                if(ifItemExists < 0) {
                    $scope.filters.push(filterObject);
                } else {
                    $scope.errorMessage.push($scope.options.duplicateColumn);
                    isValid = false;
                }
            } else {
                isValid = false;
                if (!filterRow.filterData[$scope.idProperty]) {
                    $scope.errorMessage.push($scope.options.missingColumn);
                }
                if (!filterRow.selectedOperator.id) {
                    $scope.errorMessage.push($scope.options.missingFilterOperator);
                }
            }
        });
        return isValid;
    };

    $scope.getFilters = function() {
        return $scope.filters;
    };

    function getFilterableColumns(columns) {

        if(columns.hasOwnProperty("groups")){
            getFilterableColumns(columns.groups);
        }
        angular.forEach(columns, function(item, i) {
            if(item.hasOwnProperty("filterable") && !item.filterable) {
                columns.splice( i, 1 );
            }
        });
        return columns;
    }
}]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * filtersetting.directive.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.filtersetting")
.directive("x1Filtersetting", [function() {
    return {
        restrict: "E",
        scope: {
            options: "=",
            filterData: "="
        },
        replace: true,
        templateUrl: "gridpreference/filtersetting/filtersetting.html",

        controller: "FiltersettingCtrl"
    };
}]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * preferencedialog.constant.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.preferencedialog")
.constant("x1UiPreferenceDialogDefaults", {
    //viewNameMaxLength: Positive Integer
    viewNameMaxLength: 75,

    //showFilterSettings: Boolean value to indicate if Filter setting tab should be shown or not
    showFilterSettings: true,

    //showSortSettings: Boolean value to indicate if Sort setting tab should be shown or not
    showSortSettings: true,

    //showColumnSettings: Boolean value to indicate if Column setting tab should be shown or not
    showColumnSettings: true,

	//enableSaveAs: Boolean value to indicate if Save As button should be shown or not
	enableSaveAs: true,

	//prefDialogHeader: Boolean value to indicate if preference Dialog header should be shown or not
	prefDialogHeader: true
});

/**
    *
    * Licensed Materials - Property of IBM
    *
    * preferencedialog.controller.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.preferencedialog")
.controller("PreferenceModalCtrl", ["$scope", "$translate", "x1GridPreferenceFactory", "shareScopes",
"x1UiPreferenceDialogDefaults", "commonUtilsFactory",
function($scope, $translate, preferenceFactory, shareScopes, x1UiPreferenceDialogDefaults, CommonUtils) {
    $scope.gridId = $scope.$parent.data.gridId;
    shareScopes.store("PreferenceModalCtrl", $scope, $scope.gridId);
    $scope.preferenceCtrl = shareScopes.get("x1GridPreferenceCtrl", $scope.gridId);
    $scope.data = preferenceFactory.getPreference($scope.gridId);
    $scope.viewName = $scope.preferenceCtrl.selectedView.name;
    $scope.sortData = $scope.preferenceCtrl.getGridSortData();
    $scope.filterData = $scope.preferenceCtrl.getGridFilterData();
    $scope.data = CommonUtils.extendOptions($scope.data, x1UiPreferenceDialogDefaults);

    $scope.saveAs = {
        saveAsViewName: $scope.viewName + " " + $translate.instant("x1UiNgGridPreference.common.Copy"),
        showErrorMessage: false,
        errorMessage: "",
        "placement": "top"
    };

    $scope.onSave = function(event, isSaveAsNew) {
        if($scope.validateSettings()){
            $scope.preferenceCtrl.onSave(isSaveAsNew);
        } else {
            $scope.showErrorMessage = true;
        }
     };

     $scope.getPreferenceSettings = function(isSaveAsNew) {
        var filterSettingData, sortSettingData, columnSettingData;

        if ($scope.data.showFilterSettings) {
            filterSettingData = shareScopes.get("FiltersettingCtrl", $scope.gridId).getFilters();
        }

        if ($scope.data.showSortSettings) {
            sortSettingData = shareScopes.get("SortsettingCtrl", $scope.gridId).getSorts();
        }

        if ($scope.data.showColumnSettings) {
            columnSettingData = shareScopes.get("ColumnSettingCtrl", $scope.gridId).getColumns();
        }

        return {
            filters : filterSettingData,
            sorts : sortSettingData,
            columns : columnSettingData,
            viewName : isSaveAsNew ? $scope.saveAs.saveAsViewName : null,
            saveAsNewView: isSaveAsNew
        };
    };
    // hack to override tabs error
    $scope.renderInitFn = function() {};
    $scope.renderCompleteFn = function() {};

    $scope.onSaveAs = function() {
        if(!$scope.validateSettings()){
            $scope.showErrorMessage = true;
            $scope.showPopOver = false;
        } else {
            $scope.showPopOver = true;
        }
    };

    $scope.onCancel = function() {
        $scope.$parent.close();
    };

    $scope.validateViewName = function() {
        var views = $scope.data.views,
            viewName = $scope.saveAs.saveAsViewName,
            flag = true;
        $scope.saveAs.showErrorMessage = false;
        if(viewName.length < 1){ //blank
            $scope.saveAs.errorMessage = "x1UiNgGridPreference.common.BlankViewErrorMsg";
            flag = false;
        } else { //duplicate
            for(var i = 0, len = views.length; i < len; i++){
                if(views[i].name === viewName){
                    flag = false;
                    $scope.saveAs.errorMessage = "x1UiNgGridPreference.common.ViewExistsErrorMsg";
                    break;
                }
            }
        }
        return flag;
    };

    $scope.validateSettings = function() {
        $scope.errorMessage = [];
        $scope.showErrorMessage = false;
        var flag = true,
            sortSetting = shareScopes.get("SortsettingCtrl", $scope.gridId) || null,
            filterSetting = shareScopes.get("FiltersettingCtrl", $scope.gridId) || null,
            columnSetting = shareScopes.get("ColumnSettingCtrl", $scope.gridId) || null;

        if (sortSetting && !sortSetting.validate()) {
            $scope.errorMessage.push(sortSetting.errorMessage);
            flag = false;
        }
        if (filterSetting && !filterSetting.validate()) {
            $scope.errorMessage.push(filterSetting.errorMessage);
            flag = false;
        }

        if (columnSetting && !columnSetting.validate()) {
            $scope.errorMessage.push(columnSetting.errorMessage);
            flag = false;
        }
        return flag;
    };

    $scope.close = function() {
        $scope.$parent.close();
    };
}]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * preferencedialog.directive.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.preferencedialog")
.directive("x1PreferenceDialog", [function() {
    return {
        restrict: "E",
        scope: {
            gridId: "="
        },
        replace: true,
        templateUrl: "gridpreference/preferencedialog/preferencedialog.html",
        controller: "PreferenceModalCtrl"
    };
}]);
/**
    *
    * Licensed Materials - Property of IBM
    *
    * saveas.directive.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.saveas")
.directive("x1SaveAs", [function() {
    return {
        restrict: "E",
        scope: {
            gridId: "="
        },
        replace: true,
        templateUrl: "gridpreference/saveasdialog/saveas.html",
        controller: "saveAsPopOverCtrl"
    };
}]);
/**
    *
    * Licensed Materials - Property of IBM
    *
    * saveasdialog.controller.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.gridpreference")
.controller("saveAsPopOverCtrl", ["$scope", "shareScopes",
function($scope, shareScopes) {
    shareScopes.store("saveAsPopOverCtrl", $scope, $scope.gridId);
    var preferenceDialog = shareScopes.get("PreferenceModalCtrl", $scope.gridId);
    $scope.saveAs = preferenceDialog.saveAs;
    preferenceDialog.onSaveAs();
    if(!preferenceDialog.showPopOver) {
        $scope.$parent.$hide();
    }

    $scope.show = function() {
        $scope.$parent.$show();
    };

    $scope.close = function() {
        $scope.$parent.$hide();
    };

    $scope.onSaveAsCancel = function() {
        $scope.$parent.$hide();
    };

    $scope.onOk = function(evt) {
        // trigger save as validation
        if(preferenceDialog.validateViewName()){
            preferenceDialog.onSave(evt, true);
            $scope.$parent.$hide();
        } else {
            preferenceDialog.saveAs.showErrorMessage = true;
        }
    };

    $scope.keyPress = function(evt) {
        // On Enter key press trigger save
        if (evt.keyCode === 13) {
            $scope.onOk();
        }
    };
}]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * sortsetting.constant.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.sortsetting")
.constant("x1UiSortSettingDefaults", {
    // maxSort: Number
    //      reference to hold maximum sorts that are allowed. Default is Infinity
    maxSort: "Infinity",

    // sortOnHiddenColumns: Boolean
    //      flag to indicate whether to show hidden columns in the drop down. Default is true
    sortOnHiddenColumns: true,

    // hiddenProperty: String
    //      property in data object to indicate the hidden property. Default is "hidden"
    hiddenProperty: "hidden",

    // sortByProperty: String
    //      property in data object to sort. Default is "name"
    sortByProperty: "name",

    // childrenProperty: String
    //      property in data object to represent children array. Default is "children"
    childrenProperty: "children",

    // groupProperty: String
    //      property in data object to represent group array. Default is "groups"
    groupProperty: "groups",

    // labelAttr: String
    //      data property that defines the label attribute
    labelAttr: "name",

    // sortOrderProperty: String
    //      property in data object that describes sort order. Default is "sortOrder"
    sortOrderProperty: "sortOrder"
});

/**
    *
    * Licensed Materials - Property of IBM
    *
    * sortsetting.controller.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.sortsetting")
.controller("SortsettingCtrl", ["$scope", "x1UiSortSettingDefaults", "commonUtilsFactory",
    "groupColumnUtilsFactory", "$translate", "shareScopes",
function($scope, x1UiSortSettingDefaults, factory, gFactory, $translate, shareScopes) {
    $scope.gridId = $scope.$parent.gridId;
    shareScopes.store("SortsettingCtrl", $scope, $scope.gridId);
    // errorMessage: String
    //      reference for error messages if any during the validation
    $scope.errorMessage = "";
    x1UiSortSettingDefaults.sortOrderArray = [
        {id: "asc", name: $translate.instant("x1UiNgGridPreference.common.Ascending")},
        {id: "desc", name: $translate.instant("x1UiNgGridPreference.common.Descending")}
    ];
    x1UiSortSettingDefaults.sortByLabel = "x1UiNgGridPreference.common.SortByLabel";
    x1UiSortSettingDefaults.thenByLabel = "x1UiNgGridPreference.common.ThenByLabel";
    x1UiSortSettingDefaults.duplicateSortColumnMsg = "x1UiNgGridPreference.common.duplicateSortColumnMsg";
    x1UiSortSettingDefaults.blankSortColumn = "x1UiNgGridPreference.common.blankSortColumn";
    x1UiSortSettingDefaults.blankSortOrder = "x1UiNgGridPreference.common.blankSortOrder";

    $scope.options = factory.extendOptions($scope.options, x1UiSortSettingDefaults);
    $scope.idProperty = $scope.options.idProperty || "index";
	$scope.columns = angular.copy($scope.options.columns);
	// sort the columns by sortByProperty
    $scope.columns.sort(factory.caseSortBy($scope.options.sortByProperty, true));
    $scope.visibleColumns = [];
    $scope.hiddenColumns = [];

	// Construct an id, grouping relationship & localized labels for x1Select
	angular.forEach($scope.columns, function(column, i){
		column.id = i;
		column.name = column.title;
		if(column.hasOwnProperty($scope.options.childrenProperty)) {
			column.groups = angular.copy(column.children);
			angular.forEach(column.groups, function(child, k){
				child.id = child.parent + k;
				child.name = child.title;
			});
		}
	});

	if(!$scope.options.sortOnHiddenColumns) {
        // separate hidden columns and visible columns
        angular.forEach($scope.columns, function(column){
            if(column[$scope.options.hiddenProperty]) {
                $scope.hiddenColumns.push(column);
            } else {
                $scope.visibleColumns.push(column);
            }
        });
    } else {
        $scope.visibleColumns = $scope.columns;
    }

    // filter out the sortable columns based on "sortable" property
    $scope.visibleColumns = getSortableColumns($scope.visibleColumns);

    // Construct data object for sort row
    $scope.sortRows = [];
    angular.forEach($scope.sortData, function(sortData, i){
        $scope.sortRows.push({
            columnArray: $scope.columns,
            visibleColumns: $scope.visibleColumns,
            hiddenColumns: $scope.hiddenColumns,
            sortOnHiddenColumns: $scope.options.sortOnHiddenColumns,
            sortOrderArray: $scope.options.sortOrderArray,
            sortByLabel: (i === 0) ? $scope.options.sortByLabel : $scope.options.thenByLabel,
            sortData: factory.nestedItemByProperty($scope.columns,
				$scope.idProperty, $scope.options.groupProperty, sortData[$scope.idProperty]),
            selectedOrder: factory.itemByProperty($scope.options.sortOrderArray, "id", sortData.sortDirection)
        });
    });

    $scope.refreshLabels = function() {
        angular.forEach($scope.sortRows, function(sortRow, i){
            sortRow.sortByLabel = (i === 0) ? $scope.options.sortByLabel : $scope.options.thenByLabel;
        });
    };

    $scope.addNewRow = function() {
        $scope.sortRows.push({
            columnArray: $scope.columns,
            visibleColumns: $scope.visibleColumns,
            hiddenColumns: $scope.hiddenColumns,
            sortOnHiddenColumns: $scope.options.sortOnHiddenColumns,
            sortOrderArray: $scope.options.sortOrderArray,
            sortByLabel: ($scope.sortRows.length === 0) ? $scope.options.sortByLabel : $scope.options.thenByLabel,
            sortData: {},
            selectedOrder: {}
        });
        $scope.disableAdd();
    };

    $scope.removeSortRow = function(sortrow) {
        var elementPos = $scope.sortRows.map(function(item) {
            return item.sortData[$scope.idProperty];
        }).indexOf(sortrow.sortRowData.sortData[$scope.idProperty]);
        $scope.sortRows.splice(elementPos, 1);
        $scope.refreshLabels();
    };

    $scope.clearAllRows = function() {
        $scope.sortRows = [];
    };

    $scope.validate = function() {
        $scope.errorMessage = [];
        var isValid = true;
        $scope.sorts = [];

        angular.forEach($scope.sortRows, function(sortRow, i) {
            if(isValid && sortRow.sortData[$scope.idProperty] && sortRow.selectedOrder.id) {
                var sortObject = {
                    index: sortRow.sortData[$scope.idProperty],
                    sortDirection: sortRow.selectedOrder.id,
                    sortOrder: i + 1
                };

                var ifItemExists = factory.indexOfByProperty($scope.sorts, "index", sortObject);
                if(ifItemExists < 0) {
                    $scope.sorts.push(sortObject);
                } else {
                    $scope.errorMessage.push($scope.options.duplicateSortColumnMsg);
                    isValid = false;
                }
            } else {
                isValid = false;
                if (!sortRow.sortData[$scope.idProperty]) {
                    $scope.errorMessage.push($scope.options.blankSortColumn);
                }
                if (!sortRow.selectedOrder.id) {
                    $scope.errorMessage.push($scope.options.blankSortOrder);
                }
            }
        });
        return isValid;
    };

    $scope.getSorts = function() {
        return $scope.sorts;
    };

	$scope.disableAdd = function() {
		$scope.addDisabled = !($scope.options.maxSort === "Infinity" ||
		$scope.options.maxSort > $scope.sortRows.length);
		return $scope.addDisabled;
	};

    function getSortableColumns(columns) {
        if(columns.hasOwnProperty("groups")){
            getSortableColumns(columns.groups);
        }
        angular.forEach(columns, function(item, i) {
            if(item.hasOwnProperty("sortable") && !item.sortable) {
                columns.splice( i, 1 );
            }
        });
        return columns;
    }
}]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * sortsetting.directive.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.sortsetting")
.directive("x1Sortsetting", [function() {
    return {
        restrict: "E",
        scope: {
            options: "=",
            sortData: "="
        },
        replace: true,
        templateUrl: "gridpreference/sortsetting/sortsetting.html",

        controller: "SortsettingCtrl"
    };
}]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * viewdropdown.controller.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.viewdropdown")
.controller("viewDropDownCtrl", ["$scope", "shareScopes", "commonUtilsFactory",
function($scope, shareScopes, CommonUtils) {
    shareScopes.store("viewDropDownCtrl", $scope, $scope.gridId);
    $scope.placement = $scope.placement || "bottom";
    $scope.getSelectedItem = function() {
		if($scope.items !== undefined){
			$scope.selectedItem = CommonUtils.itemByProperty($scope.items, "selected", true);
		}
    };

    $scope.updateItems = function(items) {
        $scope.items = items;
        $scope.getSelectedItem();
    };

    $scope.getItems = function() {
        return $scope.items;
    };
    $scope.getSelectedItem();
}])

.controller("viewDropDownPopOverCtrl", ["$scope", "shareScopes", "x1Modal",
function($scope, shareScopes, x1Modal) {
    $scope.preferenceCtrl = shareScopes.get("x1GridPreferenceCtrl", $scope.gridId);

    $scope.smallPopover = {
        settings: {
            templateUrl: "gridpreference/templates/confirmdelete.html",
            size: "sm",
            type: "warning",
            data: {}
        }
    };

    $scope.itemNameClick = function(item) {
        $scope.preferenceCtrl.switchView(item);
        $scope.close();
    };

    $scope.itemEditClick = function() {
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
}])

.controller("modalCtrl", ["$scope", "shareScopes",
function($scope, shareScopes) {
    $scope.gridId = $scope.$parent.data.gridId;
    $scope.selectedItem = $scope.$parent.data;
    $scope.preferenceCtrl = shareScopes.get("x1GridPreferenceCtrl", $scope.gridId);
    $scope.onDelete = function() {
        $scope.preferenceCtrl.deleteView($scope.selectedItem);
        $scope.$parent.ok();
    };

    $scope.onDeleteCancel = function() {
        $scope.$parent.close();
    };
}]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * viewdropdown.directive.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.viewdropdown")
.directive("x1ViewDropdown", [function() {
    return {
        restrict: "E",
        scope: {
            gridId: "=",
            placement: "="
        },
        replace: true,
        templateUrl: "gridpreference/viewdropdown/viewdropdown.html",

        controller: "viewDropDownCtrl"
    };
}]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * filterrow.constant.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.filterrow")
.constant("x1UiFilterRowDefaults", {
    float: {pattern: "[^(0-9)?$\\.-]", step: "0.1"},
    float2: {pattern: "[^(0-9{1,2})?$\\.-]", step: "0.01"},
    float3: {pattern: "[^(0-9{1,3})?$\\.-]", step: "0.001"},
    int: {pattern: "[^(0-9)?$\\.-]", step: "1"},
    decimalDelimiter: "\\.",
	defaultDate: "MM/DD/YYYY",
	datePatterns :{
		ISO8601Long:"YYYY-MM-DDThh:mm:ss",
		ISO8601Short:"YYYY-MM-DD",
		ShortDate:"MM/DD/YYYY",
		LongDate:"MMM DD YYYY"
	}
});

/**
    *
    * Licensed Materials - Property of IBM
    *
    * filterrow.controller.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.filterrow")
.controller("FilterrowCtrl", ["$scope", "commonUtilsFactory", "x1UiFilterRowDefaults", "x1.ui.gridpreference.constant",
function($scope, factory, x1UiFilterRowDefaults, prefDefaults) {

    $scope.operatorOptions = [];
    $scope.filterRowData.selectedOperator = {};
    $scope.showOperatorDD = true;
	$scope.decimalDelimiter = x1UiFilterRowDefaults.decimalDelimiter;
    $scope.columnSelectorConfig = { actionType: "hover"};
    $scope.operatorSelectConfig = { };
    $scope.enumSelectConfig = {checkArrowsAdded: false, displayMultiSelectListOnTop: true};
	$scope.filterBoolRange = {
		min: [0, 1],
		max: 1
	};

    $scope.setOperatorOptions = function(sortType) {
		var filterType ="";
		if (["int", "integer", "float", "number", "currency"].indexOf(sortType) >= 0) {
			$scope.operatorOptions = $scope.filterRowData.operatorGroup.numberType;
			filterType = "number";
		} else{
			switch(sortType) {
				case "text":
					$scope.operatorOptions = $scope.filterRowData.operatorGroup.stringType;
					filterType = "string";
					break;
				case "date":
					$scope.operatorOptions = $scope.filterRowData.operatorGroup.dateType;
					filterType = "date";
					break;
				case "enum":
					$scope.operatorOptions = $scope.filterRowData.operatorGroup.enumType;
					filterType = "enum";
					break;
				case "enumcsv":
					$scope.operatorOptions = $scope.filterRowData.operatorGroup.enumType;
					filterType = "enumcsv";
					break;
				case "boolean":
					$scope.operatorOptions = $scope.filterRowData.operatorGroup.booleanType;
					filterType = "boolean";
					break;
				default:
					$scope.operatorOptions = $scope.filterRowData.operatorGroup.stringType;
					filterType = "string";
			}
		}
        $scope.filterRowData.selectedOperator = $scope.operatorOptions[0];
        $scope.filterDataType = filterType;
    };

    $scope.setValueField = function(sortType) {
		if (["int", "integer", "float", "number", "currency"].indexOf(sortType) >= 0) {
			$scope.filterRowData.value = null;
		} else{
			switch(sortType) {
				case "text":
					$scope.filterRowData.value = "";
					break;
				case "enum":
					$scope.filterRowData.value = [];
					break;
				case "enumcsv":
					$scope.filterRowData.value = "";
					break;
				case "boolean":
					$scope.filterRowData.value = 0;
					break;
				case "date":
					$scope.filterRowData.value = moment().format($scope.dateFormat);
					break;
				default:
					$scope.filterRowData.value = "";
			}
		}
    };
	$scope.setNumberConstraints = function(filterData){
		var decimalPlaces =0;
		if (["float", "number", "currency"].indexOf(filterData.sorttype) >= 0) {
			decimalPlaces =1;
		}
		$scope.formatOptions = filterData.formatoptions?filterData.formatoptions:{"decimalPlaces": decimalPlaces};
		switch ($scope.formatOptions.decimalPlaces) {
			case 1:
				$scope.numbersFilter = x1UiFilterRowDefaults.float;
				break;
			case 2:
				$scope.numbersFilter = x1UiFilterRowDefaults.float2;
				break;
			case 3:
				$scope.numbersFilter = x1UiFilterRowDefaults.float3;
				break;
			default:
				$scope.numbersFilter = x1UiFilterRowDefaults.int;
		}
	};

    $scope.setUpConstraints = function() {
        if($scope.filterRowData) {
			var filterData =$scope.filterRowData.filterData;
            if($scope.filterDataType === "number") {
				$scope.setNumberConstraints(filterData);

            } else if ($scope.filterDataType === "date") {
				$scope.dateFormat = x1UiFilterRowDefaults.datePatterns[filterData.formatoptions.newformat]||
					x1UiFilterRowDefaults.defaultDate;
				$scope.isCalendarOpen = false;
				$scope.toggleBtnState = function() {
					$scope.isCalendarOpen = !$scope.isCalendarOpen;
				};

				$scope.datePickerPopover = {
					"className": "date-picker-popover",
					"title": $scope.filterRowData.filterData.name,
					"placement": "bottom-left"
				};

				$scope.calendarDef = {
					startDate: moment().format($scope.dateFormat),
					dateFormat: $scope.dateFormat,
					view: "DAY",
					singleView: true,
					calendarSize: "sm"
				};

				$scope.$on("x1.ui.popover.closed", function() {
					$scope.isCalendarOpen = false;
				});

				$scope.$on("x1.ui.calendarDataChanged", function(event, date) {
					$scope.filterRowData.value = moment(date.startDate).format($scope.dateFormat);
				});

				$scope.$on("x1.ui.calendarDateClicked", function() {
					$scope.isCalendarOpen = false;
					$scope.$broadcast("x1.ui.apply-popover");
				});
            } else if ($scope.filterDataType === "boolean"){
				$scope.booleanFilterValues = $scope.filterRowData.filterData.filterOptions;
			}
        }
    };

	$scope.getEnumFilterValue = function(filterData){
		var filterValue = [], filterCriteria = filterData.filterCriteria;
		if(filterCriteria){
			filterCriteria.filter.value.forEach(function(item){
				item = factory.itemByProperty(filterData.filterOptions, "value", item);
				filterValue.push(item);
			});
		}
		return filterValue;
	};
	$scope.getBooleanValue = function(value){
		return value.toLowerCase() === "true" || value.toLowerCase() === "yes";
	};

	$scope.getOperator = function(filterOp, filterType){
		var filterOperators = prefDefaults.FilterOperators, key;
		if(filterType === "date"){
			for(key in filterOperators.Date){
				if (filterOperators.Date[key] === filterOp) {
					return key;
				}
			}
		} else{
			for(key in filterOperators){
				if(filterOperators[key] === filterOp){
					return key;
				}
			}
		}
		 return filterOp;
	};

	if($scope.filterRowData.filterData.sorttype) {
		var sortType = $scope.filterRowData.filterData.sorttype,
			filterCriteria = $scope.filterRowData.filterData.filterCriteria,
			operator = $scope.getOperator(filterCriteria.filterOperator, sortType);
        $scope.setOperatorOptions(sortType);
        $scope.filterRowData.selectedOperator = factory.itemByProperty($scope.operatorOptions, "id", operator);
        $scope.setUpConstraints();

		if (["int", "integer", "float", "number", "currency"].indexOf(sortType) >= 0) {
			$scope.filterRowData.value = parseFloat(filterCriteria.filter.value);
		} else {
			switch (sortType) {
				case "text":
					$scope.filterRowData.value = filterCriteria.filter.value;
					break;
				case "enum":
					$scope.filterRowData.value = $scope.getEnumFilterValue($scope.filterRowData.filterData);
					break;
				case "enumcsv":
					$scope.filterRowData.value = filterCriteria.filter.value.toString();
					break;
				case "boolean":
					$scope.filterRowData.value = $scope.getBooleanValue(filterCriteria.filter.value.toString());
					break;
				case "date":
					$scope.filterRowData.value = moment(filterCriteria.filter.value).format($scope.dateFormat);
				break;
				default:
					$scope.filterRowData.value = filterCriteria.filter.value;
			}
		}
    } else {
        // Add New Row
        $scope.showOperatorDD = false;
    }

    $scope.deleteRow = function() {
        var filterSetting = $scope.$parent;
        filterSetting.removeFilterRow(this);
    };

    $scope.$watch("filterRowData.filterData", function(selectedItem, oldItem) {
        if(oldItem !== selectedItem){
            //update $scope.operatorOptions
            $scope.setOperatorOptions(selectedItem.sorttype);
            $scope.showOperatorDD = true;
            // update value field
			$scope.setUpConstraints();
            $scope.setValueField(selectedItem.sorttype);
        }
    });
}]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * filterrow.directive.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.filterrow")
.directive("x1Filterrow", function() {
    "use strict";
    return {
        restrict : "E",
        replace : true,
        scope : {
            filterRowData : "="
        },
        templateUrl : "gridpreference/filtersetting/filterrow/filterrow.html",
        controller : "FilterrowCtrl"
    };
});

/**
    *
    * Licensed Materials - Property of IBM
    *
    * sortrow.controller.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.sortrow")
.controller("SortrowCtrl", ["$scope",
function($scope) {
    $scope.columnSelectorConfig = { actionType: "hover"};
    $scope.operatorSelectConfig = { };

    $scope.deleteRow = function() {
        var sortSetting = $scope.$parent;
        sortSetting.removeSortRow(this);
    };
}]);

/**
    *
    * Licensed Materials - Property of IBM
    *
    * sortrow.directive.js
    *
    * (C) Copyright IBM Corporation 2015.
    * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
    * restricted by GSA ADP Schedule Contract with IBM Corp.
    *
    */

angular.module("x1.ui.sortrow")
.directive("x1Sortrow", function() {
    "use strict";
    return {
        restrict : "E",
        replace : true,
        scope : {
            sortRowData : "="
        },
        templateUrl : "gridpreference/sortsetting/sortrow/sortrow.html",
        controller : "SortrowCtrl"
    };
});

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/gridpreference.html',
    '<div class="gridPreference"><x1-grid ng-if="gridServiceName === \'jqgridService\'" class="custom-grid" id="{{gridId}}" data="gridData" options="gridOptions"></x1-grid><div ng-if="gridServiceName !== \'jqgridService\' && gridOptions" ng-include="gridTemplate"></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/columnsetting/columnsetting.html',
    '<div class="settingsTabs"><div><div class="columnSettings"><span translate="x1UiNgGridPreference.common.AvailableColumns"></span><div class="columnSettingsList"><div class="form-group has-feedback"><input type="text" class="form-control" ng-model="availableTreeSearchQuery" ng-focus="isFocusOnSearch1=true" ng-blur="isFocusOnSearch1=false"> <span ng-show="!isFocusOnSearch1" class="glyphicon glyphicon-search form-control-feedback" ng-class="{\'glyphicon-search-rtl\': dir === \'rtl\'}"></span> <span ng-show="availableTreeSearchQuery" class="glyphicon glyphicon-remove form-control-feedback" style="float: right;" ng-click="availableTreeSearchQuery=\'\'"></span></div><treecontrol class="tree-light" tree-model="availableColumns" node-children="children" options="treeOptions" on-selection="availableTreeSelection(node)" selected-nodes="availableTreeSelectedNodes" expanded-nodes="availableTreeExpandedNodes" filter-expression="availableTreeSearchQuery" filter-comparator="availableTreeComparator">{{node.title}}</treecontrol></div><span class="available_count" translate="x1UiNgGridPreference.common.Available" translate-value-i="{{availableCount}}"></span></div><div class="spanButton"><a role="button" type="button" class="btn btn-md app-state-display-block" ng-disabled="disableLeftArrow" title="{{\'x1UiNgGridPreference.common.MoveLeft\' | translate}}" ng-click="onMoveToAvailable($event)"><span class="glyphicon glyphicon-chevron-left app-state-icon-hover"></span></a> <a role="button" type="button" class="btn btn-md app-state-display-block" ng-disabled="disableRightArrow" title="{{\'x1UiNgGridPreference.common.MoveRight\' | translate}}" ng-click="onMoveToDisplayed($event)"><span class="glyphicon glyphicon-chevron-right app-state-icon-hover"></span></a> <a role="button" type="button" class="btn btn-md app-state-display-block" ng-disabled="disableRightAllArrow" title="{{\'x1UiNgGridPreference.common.MoveAllRight\' | translate}}" ng-click="onMoveAllToDisplayed($event)"><span class="glyphicon glyphicon-chevron-right-double app-state-icon-hover"></span></a> <a role="button" type="button" class="btn btn-md app-state-display-block" ng-disabled="disableLeftAllArrow" title="{{\'x1UiNgGridPreference.common.MoveAllLeft\' | translate}}" ng-click="onMoveAllToAvailable($event)"><span class="glyphicon glyphicon-chevron-left-double app-state-icon-hover"></span></a></div><div class="columnSettings"><span translate="x1UiNgGridPreference.common.DisplayedColumns"></span><div class="columnSettingsList"><div class="form-group has-feedback"><input type="text" class="form-control" ng-model="displayedTreeSearchQuery" ng-focus="isFocusOnSearch2=true" ng-blur="isFocusOnSearch2=false"> <span ng-show="!isFocusOnSearch2" class="glyphicon glyphicon-search form-control-feedback" ng-class="{\'glyphicon-search-rtl\': dir === \'rtl\'}"></span> <span ng-show="displayedTreeSearchQuery" class="glyphicon glyphicon-remove form-control-feedback" style="float: right;" ng-click="displayedTreeSearchQuery=\'\'"></span></div><treecontrol class="tree-light" tree-model="displayedColumns" node-children="children" options="treeOptions" on-selection="displayedTreeSelection(node)" selected-nodes="displayedTreeSelectedNodes" expanded-nodes="displayedTreeExpandedNodes" filter-expression="displayedTreeSearchQuery" filter-comparator="displayedTreeComparator">{{node.title}}</treecontrol></div><span class="displayed_count" translate="x1UiNgGridPreference.common.Selected" translate-value-i="{{displayedCount}}"></span></div><span class="spanButton"><a role="button" type="button" class="btn btn-md app-state-display-block" ng-disabled="disableTopArrow" title="{{\'x1UiNgGridPreference.common.MoveTop\' | translate}}" ng-click="onMoveToTop($event)"><span class="glyphicon glyphicon-chevron-up-double app-state-icon-hover"></span></a> <a role="button" type="button" class="btn btn-md app-state-display-block" ng-disabled="disableUpArrow" title="{{\'x1UiNgGridPreference.common.MoveUp\' | translate}}" ng-click="onMoveUp($event)"><span class="glyphicon glyphicon-chevron-up app-state-icon-hover"></span></a> <a role="button" type="button" class="btn btn-md app-state-display-block" ng-disabled="disableDownArrow" title="{{\'x1UiNgGridPreference.common.MoveDown\' | translate}}" ng-click="onMoveDown($event)"><span class="glyphicon glyphicon-chevron-down app-state-icon-hover"></span></a> <a role="button" type="button" class="btn btn-md app-state-display-block" ng-disabled="disableBottomArrow" title="{{\'x1UiNgGridPreference.common.MoveBottom\' | translate}}" ng-click="onMoveToBottom($event)"><span class="glyphicon glyphicon-chevron-down-double app-state-icon-hover"></span></a></span></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/filtersetting/filtersetting.html',
    '<div class="settingsTabs"><div class="filterContent"><x1-filterrow ng-repeat="filterrow in filterRows" filter-row-data="filterrow"></x1-filterrow></div><a class="btn btn-sm" type="button" role="button" ng-click="addDisabled||addNewRow($event)" ng-disabled="disableAdd()"><span class="glyphicon glyphicon-plus app-state-icon-hover"></span> {{\'x1UiNgGridPreference.common.Add\' | translate}}</a> <a class="btn btn-sm" type="button" role="button" ng-click="clearAllRows($event)" ng-disabled="filterRows.length <= 0"><span class="glyphicon glyphicon-trash app-state-icon-hover"></span> {{\'x1UiNgGridPreference.common.ClearAll\' | translate}}</a></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/preferencedialog/preferencedialog.html',
    '<div class="prefenceDialog"><header class="modal-header" ng-if="data.prefDialogHeader === true"><button type="button" class="close glyphicon glyphicon-close" ng-click="close()"></button> <span class="modal-title" translate="x1UiNgGridPreference.common.Edit"></span></header><section class="modal-body preference-modal"><div style="clear: both"></div><div class="error-msg app-set-space" ng-show="showErrorMessage"><span class="glyphicon glyphicon-warning-sign pull-left"></span> <span class="pull-left"><ul class="app-ul"><li ng-repeat="messages in errorMessage"><span ng-repeat="message in messages | limitTo: 2">{{message | translate}}</span></li></ul></span><div style="clear: both"></div></div><div><x1-tabset tabs-position="top"><x1-tab ng-if="data.showFilterSettings" render-init="renderInitFn()" render-complete="renderCompleteFn()" heading="\'x1UiNgGridPreference.common.FilterSettingLabel\' | translate" role="tab" aria-controls="\'x1UiNgGridPreference.common.FilterSettingLabel\' | translate"><x1-filtersetting options="data" filter-data="filterData"></x1-filtersetting></x1-tab><x1-tab ng-if="data.showSortSettings" render-init="renderInitFn()" render-complete="renderCompleteFn()" heading="\'x1UiNgGridPreference.common.SortSettingLabel\' | translate" role="tab" aria-controls="\'x1UiNgGridPreference.common.SortSettingLabel\' | translate"><x1-sortsetting options="data" sort-data="sortData"></x1-sortsetting></x1-tab><x1-tab ng-if="data.showColumnSettings" render-init="renderInitFn()" render-complete="renderCompleteFn()" heading="\'x1UiNgGridPreference.common.ColumnSettingLabel\' | translate" role="tab" aria-controls="\'x1UiNgGridPreference.common.ColumnSettingLabel\' | translate"><x1-column-setting options="data"></x1-column-setting></x1-tab></x1-tabset></div></section><footer class="modal-footer"><div class="prefDlgBottom"><button ng-click="onSave($event, false)" class="btn" ng-class="preferenceCtrl.selectedView.companyView ? \'btn-default\' : \'btn-primary\'" ng-disabled="preferenceCtrl.selectedView.companyView">{{\'x1UiNgGridPreference.common.Save\' | translate}}</button> <button type="button" class="btn" ng-if="data.enableSaveAs === true" ng-class="preferenceCtrl.selectedView.companyView ? \'btn-primary\' : \'btn-default\'" x1-popover="saveAs" title="{{\'x1UiNgGridPreference.common.SaveAs\' | translate}}" content-template="gridpreference/templates/saveasdialog.html">{{\'x1UiNgGridPreference.common.SaveAs\' | translate}}</button> <button ng-click="onCancel()" class="btn btn-default">{{\'x1UiNgGridPreference.common.Cancel\' | translate}}</button></div></footer></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/saveasdialog/saveas.html',
    '<div class="saveasDialog"><div class="container"><div class="error-msg" ng-show="saveAs.showErrorMessage">{{saveAs.errorMessage | translate}}</div><label>{{\'x1UiNgGridPreference.common.Name\' | translate}} <input type="text" ng-model="saveAs.saveAsViewName" required="true" ng-trim="true" focus="" ng-keypress="keyPress($event)"></label></div><div class="container"><button ng-click="onOk($event)" class="btn btn-primary btn-sm">{{\'x1UiNgGridPreference.common.Ok\' | translate}}</button> <button ng-click="onSaveAsCancel($event)" class="btn btn-default btn-sm">{{\'x1UiNgGridPreference.common.Cancel\'| translate}}</button></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/sortsetting/sortsetting.html',
    '<div class="settingsTabs"><div class="sortContent"><x1-sortrow ng-repeat="sortrow in sortRows" sort-row-data="sortrow"></x1-sortrow></div><a class="btn btn-sm" type="button" role="button" ng-click="addDisabled||addNewRow($event)" ng-disabled="disableAdd()"><span class="glyphicon glyphicon-plus app-state-icon-hover"></span> {{\'x1UiNgGridPreference.common.Add\' | translate}}</a> <a class="btn btn-sm" type="button" role="button" ng-click="clearAllRows($event)" ng-disabled="sortRows.length <= 0"><span class="glyphicon glyphicon-trash app-state-icon-hover"></span> {{\'x1UiNgGridPreference.common.ClearAll\' | translate}}</a></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/templates/confirmdelete.html',
    '<div ng-controller="modalCtrl"><header class="modal-header"><button type="button" class="close glyphicon glyphicon-close" ng-click="close()"></button> <span class="modal-title" translate="x1UiNgGridPreference.common.confirm"></span></header><section class="modal-body"><div translate="x1UiNgGridPreference.common.deleteViewConfirmMsg"></div>{{selectedItem.name}}</section><footer class="modal-footer"><button ng-click="onDelete($event)" class="btn btn-default btn-sm">{{"x1UiNgGridPreference.common.Ok" | translate}}</button> <button ng-click="onDeleteCancel($event)" class="btn btn-default btn-sm">{{"x1UiNgGridPreference.common.Cancel" | translate}}</button></footer></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/templates/preferencewindow.html',
    '<div><x1-preference-dialog grid-id="gridId"></x1-preference-dialog></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/templates/saveasdialog.html',
    '<div><x1-save-as grid-id="gridId"></x1-save-as></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/viewdropdown/viewdropdown.html',
    '<div class="view-dropdown"><button type="button" class="view-drop-button" placement="{{placement}}" title="{{\'x1UiNgGridPreference.common.Actions\' | translate}}" x1-popover="" content-template="gridpreference/viewdropdown/viewdropdown.template.html"><span class="glyphicon glyphicon-gear app-state-icon-hover"></span></button></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/viewdropdown/viewdropdown.template.html',
    '<div ng-controller="viewDropDownPopOverCtrl"><table role="menu"><tr ng-repeat="item in items" style="line-height: 24px;"><td ng-if="item.separator !== true"><span class="view-dropdown-icon-item" ng-class="item.selected ? \'glyphicon glyphicon-ok\' : \'glyphicon glyphicon-blank\'"></span></td><td ng-if="item.separator !== true"><span class="view-dropdown-name-item" title="{{item.name}}" ng-click="itemNameClick(item)">{{item.name}}</span></td><td ng-if="item.separator !== true"><span ng-show="item.selected" ng-click="itemEditClick(item)" class="glyphicon glyphicon-edit view-dropdown-icon-item app-state-icon-hover"></span></td><td ng-if="item.separator !== true"><span ng-show="!item.companyView" ng-click="itemDeleteClick(item)" class="glyphicon glyphicon-trash view-dropdown-icon-item app-state-icon-hover"></span></td><td colspan="4" ng-if="item.separator === true"><hr></td></tr></table><div class="app-footer"><span class="app-state-refresh-hover" ng-click="itemRefreshClick(item)"><span class="glyphicon glyphicon-refresh app-state-icon-hover"></span> {{"x1UiNgGridPreference.common.Refresh" | translate}}</span></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/filtersetting/filterrow/date-picker-content.html',
    '<x1-calendar-core definition="calendarDef"></x1-calendar-core>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/filtersetting/filterrow/filterrow.html',
    '<div class="ruleGroup"><span class="ruleCell column-list"><x1-select select-options="filterRowData.visibleColumns" config="columnSelectorConfig" ng-model="filterRowData.filterData" type="tree" size="large" placeholder="{{\'x1UiNgGridPreference.common.Select\' | translate}}"></x1-select></span> <span class="ruleCell" ng-show="showOperatorDD"><x1-select type="single" config="operatorSelectConfig" size="large" ng-model="filterRowData.selectedOperator" select-options="operatorOptions" placeholder="{{\'x1UiNgGridPreference.common.Select\' | translate}}"></x1-select></span><div class="ruleCell" ng-class="{set200Width: showOperatorDD}" ng-switch="filterDataType"><span ng-switch-when="string"><input type="text" name="textInput" role="textbox" ng-model="filterRowData.value" ng-trim="false" class="input-lg set180Width"></span> <span ng-switch-when="number"><input type="text" role="textbox" id="filterNum" name="filterNum" filter-precision="{{formatOptions.decimalPlaces}}" ng-model="filterRowData.value" number-filter="{{numbersFilter.pattern}}" decimal-delimiter="{{decimalDelimiter}}" class="input-lg set180Width"></span> <span ng-switch-when="boolean" class="set180Width"><div class="filter-bool"><span class="pull-left">{{booleanFilterValues[0].name}}</span> <span class="col-sm-6"><label for="filterBool" class="sr-only" translate="x1UiNgGridPreference.common.Select"></label><x1-slider id="filterBool" ng-model="filterRowData.value" range="filterBoolRange" connect="lower" class="x1-slider-as-toggle"></x1-slider></span> <span class="pull-left">{{booleanFilterValues[1].name}}</span></div></span> <span ng-switch-when="enum"><x1-select ng-model="filterRowData.value" select-options="filterRowData.filterData.filterOptions" size="large" placeholder="{{\'x1UiNgGridPreference.common.Select\' | translate}}" config="enumSelectConfig"></x1-select></span> <span ng-switch-when="enumcsv"><label for="filtertxtArea" class="sr-only" translate="x1UiNgJqgrid.popover.INPUT"></label> <textarea id="filtertxtArea" type="text" class="form-control input-lg set180Width" cols="20" rows="5" placeholder="{{\'x1UiNgGridPreference.common.EnumCsvMsg\' | translate}}" ng-model="filterRowData.value">\n' +
    '                        </textarea></span><div ng-switch-when="date"><div class="input-group set180Width"><input type="text" name="filterDate" role="textbox" ng-model="filterRowData.value" ng-trim="false" class="date-picker-input form-control"> <span class="input-group-btn"><button type="button" class="date-picker-btn btn btn-default" ng-click="toggleBtnState()" ng-class="{\'active\': isCalendarOpen}" x1-popover="datePickerPopover" content-template="gridpreference/filtersetting/filterrow/date-picker-content.html"><span class="date-picker-icon glyphicon glyphicon-calendar"></span></button></span></div></div></div><button class="glyphicon glyphicon-remove paddingLeft5 app-btn" ng-click="deleteRow($event)"></button></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.gridpreference');
} catch (e) {
  module = angular.module('x1.ui.gridpreference', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('gridpreference/sortsetting/sortrow/sortrow.html',
    '<div class="ruleGroup"><span class="ruleCell set80Width">{{sortRowData.sortByLabel | translate}}</span> <span class="ruleCell"><x1-select select-options="sortRowData.visibleColumns" config="columnSelectorConfig" ng-model="sortRowData.sortData" type="tree" size="large" placeholder="{{\'x1UiNgGridPreference.common.Select\' | translate}}"></x1-select></span> <span class="ruleCell"><x1-select type="single" config="operatorSelectConfig" size="large" ng-model="sortRowData.selectedOrder" select-options="sortRowData.sortOrderArray" placeholder="{{\'x1UiNgGridPreference.common.Select\' | translate}}"></x1-select></span> <button class="glyphicon glyphicon-remove paddingLeft10 app-btn" ng-click="deleteRow($event)"></button></div>');
}]);
})();
