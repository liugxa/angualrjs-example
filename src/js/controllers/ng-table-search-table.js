//ng search table
ngTableControllers.controller("ngTableSearchTable", ["$scope", "$timeout", 
	function($scope, $timeout) {
		"use strict";
		var gridPreferences = getObjectFromLocalStorage("reportGrid2.gridPreferences") || {};
		
		$scope.idMap = {
			id1:"reportGrid1",
			id2:"reportGrid2",
			id5:"reportGrid5"
		};

		$scope.demoEvents = {
			demoClickEvent: "Click any cell to see its select event",
			demoSortEvent: "Click a column header to see its sort event",
			demoEditEvent: "Click and edit a row above to see its after edit event"
		};
		$scope.gridEvents = ["x1.ui.jqgrid.event.resize"];

		$scope.resizeGrid = function(id) {
			if (jQuery(id + ".shrunken")[0]) {
				jQuery(id).css("width", "100%");
				jQuery(id).removeClass("shrunken");
			} else {
				jQuery(id).css("width", "50%");
				jQuery(id).addClass("shrunken");
			}
			$scope.$broadcast("x1.ui.jqgrid.event.resize");
			console.log("resize event");
		};

		$scope.changeGridSize = function(size) {
			$scope.$broadcast(JQGridEvents.GRID_CHANGE_SIZE, size);
			console.log("change size event");
		};		
		//get column sort of grid
		$scope.$on("x1.ui.gridColumnSort", function(event, colData){
			if (colData.gridId === "reportGrid1") {
				$scope.demoEvents.demoSortEvent = JSON.stringify(colData);
				$scope.$apply();
			}
		});
		
		//get selected cell of grid
		$scope.$on("x1.ui.selectGridCell", function(event, cellData){
			if (cellData.gridId === "reportGrid1") {
				$scope.demoEvents.demoClickEvent = JSON.stringify(cellData);
				$scope.$apply();
			}
		});

		$scope.$on("x1.ui.gridRowEdited", function(event, rowData){
			if (rowData.gridId === "reportGrid2") {
				$scope.demoEvents.demoEditEvent = JSON.stringify(rowData);
				$scope.$apply();
			}
		});
		
		function saveObjectInLocalStorage(storageItemName, object) {
			if (typeof window.localStorage !== "undefined") {
				window.localStorage.setItem(storageItemName, JSON.stringify(object));
			}
		}

		function getObjectFromLocalStorage(storageItemName) {
			if (typeof window.localStorage !== "undefined") {
				return JSON.parse(window.localStorage.getItem(storageItemName));
			}
		}
		//page configuration
		var gridData = [];
		var inputData = [];
		var currRow;
		var dataSize = 10;
		for (var i = 0; i < dataSize; i++) {
			currRow = {
				id: i,
				date: "2015-04-" + Math.ceil((i + 1) * 30 / dataSize),
				name: "Client" + i,
				amount: i,
				tax: i * 0.18,
				interest: Math.random(),
				total: i + i * 0.18,
				note: "note here" + i,
				note2: "note here" + i,
				note3: "note here" + i,
				note4: "note here" + i
			};
			gridData.push(currRow);
			inputData.push(currRow);
		}

		$scope.gridData = gridData;
		$scope.gridOptions = {
			cellSize: "sm",
			colNames: ["Inv No", "Date", "Client", "Amount", "Tax", "Interest", "Total",
				"Notes", "Notes2", "Notes3",	"Notes4"],
			colModel: [
				{name: "id", index: "id", align: "right", sorttype: "int"},
				{name:"date",index:"date", sorttype:"date", formatter:"date",
					formatoptions:{newformat: "ISO8601Short"}},
				{name: "name", index: "name", sorttype: "text"},
				{name: "amount", index: "amount", align: "right", sorttype: "float",
					formatter:"currency", formatoptions:{decimalPlaces: 2, prefix: "$"}},
				{name: "tax", index: "tax", align: "right", sorttype: "float",
					formatter:"number", formatoptions:{decimalPlaces: 2}},
				{name: "interest", index: "interest", align: "right", sorttype: "float",
					formatter: percentFormatter, unformat: percentUnFormatter,
					formatoptions:{decimalPlaces: 2}},
				{name: "total", index: "total", align: "right", sorttype: "float",
					formatter:"currency", formatoptions:{decimalPlaces: 0, prefix: "$"}},
				{name: "note", index: "note", sortable: true, sorttype:"text"},
				{name: "note2", index: "note2", sorttype: "text"},
				{name: "note3", index: "note3", sorttype: "text"},
				{name: "note4", index: "note4", sorttype: "text"}
			],
			totalRow:  {id: "", date: "", name: "", note: "", amount: 13280, tax: 255, total: 14175.00},
			multiselect: true,
			//sortFirstCol: true,
			useInfiniteScrolling: true,
			rowTotals: true,
			colTotals: true,
			frozenStaticCols: true
		};

		function percentFormatter(cellValue, options) {
			if (isNaN(cellValue)) {
				return "--";
			}
			return ( (cellValue * 100).toFixed(options.colModel.formatoptions.decimalPlaces) + "%" );
		}
	
		function percentUnFormatter(cellValue) {
			return (parseInt(cellValue.replace("%",""),10) / 100);
		}
		
		$scope.inputData = inputData;
		$scope.options2 = {
			id: "example2Id",
			sortField: "name",
			placeholder: "Search name"
		};

		$scope.outputData= [];
		
		// watch search bar model value
		$scope.$watch("outputData", function() {
			jQuery('#reportGrid1').jqGrid('clearGridData');
			jQuery('#reportGrid1').jqGrid('setGridParam', {data: $scope.outputData});
			jQuery('#reportGrid1').trigger('reloadGrid');
		});
	}	
]);
