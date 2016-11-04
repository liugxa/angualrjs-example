ngTableControllers.controller("ngTableFilter", ["$scope", "$timeout", 
	function($scope, $timeout) {
		"use strict";
		
		$scope.idMap = {
			id1: "reportGrid1",
			id2: "reportGrid2",
			id5: "reportGrid5"
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
				
				//get all of the columns
				//var colModel = $("#reportGrid1").jqGrid('getGridParam','colModel');
				//console.log(colModel);
			}
		});

		$scope.$on("x1.ui.gridRowEdited", function(event, rowData){
			if (rowData.gridId === "reportGrid1") {
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
		var data = [];
		var currRow;
		var dataSize = 100;
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
			data.push(currRow);
		}

		$scope.gridData = data;
		$scope.gridOptions = {
			cellSize: "sm",
			colNames: ["Inv No", "Inv Code", "Date","Category", "Active","Client", "Amount", "Tax", "Interest",
						"Total", "Notes", "Notes2", "Notes3", "Notes4"],
			colModel: [
				{name: "id", index: "id", sorttype: "int", align: "right", frozen: true, search: false,
					filterMin: 0, filterMax: 5000},
				{name: "code", index: "code", sorttype: "enumcsv", align: "left", search: false},
				{name: "date", index: "date", sorttype: "date", formatter: "date",
					formatoptions:{newformat: "ISO8601Short"}},
				{name: "category", index: "category", sorttype: "enum",	editable: true, edittype: "text"},
				{name: "active", index: "active", sorttype: "boolean"},
				{name: "name", index: "name", sorttype: "text",	editable: true, edittype: "text"},
				{name: "amount", index: "amount", align: "right",
					sorttype: "float", sortable: true, formatter:"number", formatoptions:{decimalPlaces: 2},
					filterMin: 0, filterMax: 4999},
				{name: "tax", index: "tax", align: "right",
					sorttype: "float", sortable: true, formatter:"number", formatoptions:{decimalPlaces: 2},
					filterMin: 0, filterMax: 1000},
				{name: "interest", index: "interest", align: "right", sorttype: "float",
					formatter: percentFormatter, unformat: percentUnFormatter,
					formatoptions:{decimalPlaces: 2}, filterType: "percentage",
					filterMin: 0, filterMax: 1},
				{name: "total", index: "total", align: "right",
					sorttype: "float", formatter:"currency", formatoptions:{decimalPlaces: 2, prefix: "$"},
					filterMin: 0, filterMax: 5899},
				{name: "note", index: "note", sorttype: "text", editable: true,
					edittype: "text", filterType: "NONE"},
				{name: "note2", index: "note2", sorttype: "text", editable: true, edittype: "text"},
				{name: "note3", index: "note3", sorttype: "text", editable: true, edittype: "text"},
				{name: "note4", index: "note4", sorttype: "text", editable: true, edittype: "text"}
			],
			cmTemplate: {
				autoResizable: true
			},
			autoResizing: {
				maxColWidth: 1000
			},
			autoresizeOnLoad: true,
			totalRow:  {id: "", date: "", name: "", amount: 9990, tax: 667, total: 10657.00, note: "" },
			sortFirstCol: false,
			sortorder: "asc",
			sortname: "name",
			x1Filters: true,
			x1HorizontalScroll: true,
			usePager: true,
			allowInlineEditing: true,
			useGroupedHeaders: true,
			viewsortcols: [false, "horizontal", true],
			//groupHeaders:[{startColumnName: "name", numberOfColumns: 5, titleText: "Price"}],
			//gridPreferences: getObjectFromLocalStorage("reportGrid1.gridPreferences")
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
	}
]);
