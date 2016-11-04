angular.module('ngRouteExample', ["ngRoute", "x1.ui.jqgrid", "ngSanitize", "x1.ui.jqgrid","ui.bootstrap.tpls", "x1.ui.gridpreference", "x1.ui.searchbar", "x1.ui.modal", "ngTableControllers", "ngTableServices"])
.config(function($routeProvider, $locationProvider, $translateProvider) {
	$routeProvider.when('/ngTableNormal', {
	  templateUrl: 'routes/ng-table-normal.html',
	  controller: 'ngTableNormal'
	})
	.when('/ngTableFilter', {
	  templateUrl: 'routes/ng-table-filter.html',
	  controller: 'ngTableFilter'
	})
	.when('/ngTablePreference', {
	  templateUrl: 'routes/ng-table-preference.html',
	  controller: 'ngTablePreference'
	})
	.when('/ngTableSearch', {
	  templateUrl: 'routes/ng-table-search.html',
	  controller: 'ngTableSearch'
	})
	.when('/ngTableSearchTable', {
	  templateUrl: 'routes/ng-table-search-table.html',
	  controller: 'ngTableSearchTable'
	})
	.when('/ngTableModelDialog', {
	  templateUrl: 'routes/ng-table-model.html',
	  controller: 'ngTableModelDialog'
	});		  
	  
	// Register a loader for the static files
	// So, the module will search missing translation tables under the specified urls.
	// Those urls are [prefix][langKey][suffix].
	$translateProvider.useStaticFilesLoader({
		prefix: "i18n/",
		suffix: ".json"
	});

	// Tell the module what language to use by default
	$translateProvider.preferredLanguage("locale-en");

	//check for inserted HTML before attempting to resolve translation variables
	//to protect us from potential insertion attacks.
	$translateProvider.useSanitizeValueStrategy("escaped");		  
});
var ngTableControllers = angular.module("ngTableControllers", []);	