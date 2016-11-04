var serviceModule = angular.module("ngTableServices", []);
serviceModule.factory("ngTableService", ["$http", "$q", "$log", "$translate", "$window",
	function($http, $q, $log, $translate, $window) {
        //the factory object
		var factory = {};
		
		var http = $window.location.protocol;
		
		var host = $window.location.hostname;
		
		var port = $window.location.port;
		
		var contextPath = $window.location.origin + "/platform";
		
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
			var url = contextPath + "/pac/ngtable/loadPreference.action?tableId=" + gridId;
			$http.get(url).then(function(response){
				callback(response.data);	
			}, function(response){
				if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject("An unknown error occurred."));
                }
			});
        };
        
		function _setColumns(columns){
			angular.forEach(columns, function(column){
				if(column.hasOwnProperty("resourceName")) {
					if (!column.hasOwnProperty("children")) {
						column.title = _i18n(column);
					}
					// handle group columns, may be there is a better way
					else {
						column.title = $translate.instant(column.resourceName);
						angular.forEach(column.children, function (childColumn) {
							childColumn.title = _i18n(column);
						});
					}
				}
			});
		}
		function _i18n(column){
			var message = "ngTableService.table.columns." + column.resourceName + ".header";
			return $translate.instant(message);
			/*
		    $translate(message).then(function (translation) {
			  column.title = translation;
			});
			*/
		}
		
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
			var url = contextPath + "/webservice/workload/workloadlist";
            $http.get(url).then(function(response) {
                var data = response.data.records;
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
			//invoke the callback method
			_setColumns(preference.columns);
			
			var url = contextPath + "/pac/ngtable/savePreference.action?tableId=" + gridId;
			$http.post(url, preference).then(function(response){
				if(callback) callback(preference);
			}, function(response){
			
			});
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
        factory.deleteView = function(viewList, companyViewId, deletedViewId, gridId, reload, callback){
            //TODO
        };
		
        return factory;
	}
]);