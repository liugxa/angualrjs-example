angular
	.module("x1.ui.demo", [
		"ui.router",
		"x1.ui.jqgrid.demo"
	])
	.config(["$urlRouterProvider", "$translateProvider",
		function($urlRouterProvider, $translateProvider) {
			"use strict";

			// Register a loader for the static files
			// So, the module will search missing translation tables under the specified urls.
			// Those urls are [prefix][langKey][suffix].
			$translateProvider.useStaticFilesLoader({
				prefix: "l10n/",
				suffix: ".json"
			});

			// Tell the module what language to use by default
			$translateProvider.preferredLanguage("en_US");
			$translateProvider.useSanitizeValueStrategy("escaped");

			$urlRouterProvider.otherwise("/grid");
		}
	]);

angular
	.module("x1.ui.jqgrid.demo", [
		"ui.bootstrap.tabs",
		"ui.bootstrap.tpls",
		"x1.ui.prism",
		"x1.ui.demo-generator",
		"x1.ui.jqgrid"
	])
	.config(["$stateProvider",
		function($stateProvider) {
			"use strict";

			$stateProvider.state("grid", {
				url: "/grid",
				templateUrl: "jqgrid/grid.demo.html"
			});
		}
	])
	.controller("jqgridDemoCtrl", [
		"$scope", "$timeout", "x1.ui.jqgrid.events",
		function($scope, $timeout, JQGridEvents) {
			"use strict";

            var gridPreferences = getObjectFromLocalStorage("reportGrid2.gridPreferences") || {};

			//all demos
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

			$scope.changeGridSize = function(size) {
				$scope.$broadcast(JQGridEvents.GRID_CHANGE_SIZE, size);
			};

			$scope.clearAllFilters = function() {
				$scope.$broadcast(JQGridEvents.GRID_RESET_FILTER);
			};
			$scope.clearAllSorts = function() {
				$scope.$broadcast(JQGridEvents.GRID_RESET_SORT);
			};

			$scope.$on("x1.ui.gridColumnSort", function(event, colData){
				if (colData.gridId === "reportGrid1") {
					$scope.demoEvents.demoSortEvent = JSON.stringify(colData);
					$scope.$apply();
				}

                if(colData.gridId === "reportGrid2") {
                    gridPreferences.sortname = colData.id;
                    gridPreferences.sortorder = colData.sort;
                    saveObjectInLocalStorage("reportGrid2.gridPreferences", gridPreferences);
                }
			});

            $scope.$on("x1.ui.gridColumnStatesChanged", function(event, colStates, gridId){
                if(gridId === "reportGrid2") {
                    gridPreferences.colStates = colStates;
                    saveObjectInLocalStorage("reportGrid2.gridPreferences", gridPreferences);
                }
			});

            $scope.$on("x1.ui.gridColumnReorder", function(event, reorderObj){
                if(reorderObj.gridId === "reportGrid2") {
                    gridPreferences.permutation = reorderObj.permutation;
                    saveObjectInLocalStorage("reportGrid2.gridPreferences", gridPreferences);
                }
			});

            $scope.$on("x1.ui.gridFilterChanged", function(event, filters, gridId){
                if(gridId === "reportGrid2") {
                    gridPreferences.filters = filters;
                    saveObjectInLocalStorage("reportGrid2.gridPreferences", gridPreferences);
                }
			});

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

			//demos 1 and 2
			var data = [];
			var currRow;
			for (var i = 0; i < 5000; i++) {
				currRow = {
					id: i,
					code: "Inv"+parseInt((i+100)/10),
					date: "2015-04-" + Math.ceil((i + 1) * 30 / 5000),
					name: "Client" + i,
					amount: i,
					tax: i * 0.18,
					interest: Math.random(),
					total: i + i * 0.18,
					note: "note here note here note here note here" + i,
					note2: "note here" + i,
					note3: "note here" + i,
					note4: "note here" + i,
                    category : "Category " + Math.ceil(i/1000),
					active : isPrime(i)
				};
				data.push(currRow);
			}
			function isPrime(num){
                if(num<2){
                    return false;
                }
                if(num===2){
                    return true;
                }
                else if(num%2 ===0 ){
                    return false;
                }
                var nSqRt=Math.sqrt(num);
                for(var x=0;x<=nSqRt;x+=2){
                    if(num % x ===0 ){
                        return false;
                    }
                }
                return true;
			}
			$scope.gridData1 = data;
			$scope.gridData2 = data;

			$scope.gridData6 = [];
			for(var k = 0; k < 6; k++){
					$scope.gridData6.push({
		 			"ROW_KEY":"1","COUNTRY":"America","DataType":"1"
		 		});
			}

			$scope.groupsTree =
			[{"id": "1","name": "Text"}, {"id": "2","name": "Numeric"}];

			$timeout(function() {
				$scope.gridOptions1 = {
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

				$scope.gridOptions2 = {
					cellSize: "sm",
					colNames: ["Inv No", "Inv Code", "Date","Category", "Active","Client", "Amount", "Tax", "Interest",
								"Total", "Notes", "Notes2", "Notes3", "Notes4"],
					colModel: [
						{name: "id", index: "id", sorttype: "int", align: "right", frozen: true, search: false,
							filterMin: 0, filterMax: 5000},
						{name: "code", index: "code", sorttype: "enumcsv", align: "left", search: false,
							sortfunc:"naturalSort"},
						{name: "date", index: "date", sorttype: "date", formatter: "date",
							formatoptions:{newformat: "ISO8601Short"}},
						{name: "category", index: "category", sorttype: "enum",	editable: true, edittype: "text",
							filterOptions: [{"value": "Category 0","label": "Category #0"},
								{"value": "Category 1","label": "Category #1"},
								{"value": "Category 2","label": "Category #2"},
								{"value": "Category 3","label": "Category #3"},
								{"value": "Category 4","label": "Category #4"}]},
						{name: "active", index: "active",
							formatter: "checkbox", formatoptions: {disabled : false} ,
							edittype: "checkbox", editoptions:{ value: "true:false", defaultValue: "true" },
							sorttype: "boolean", filterOptions: [
							{"value": "false","label": "False"},{"value": "true","label": "True"}]},
						{name: "name", index: "name", sorttype: "text",	editable: true, edittype: "text",
							sortfunc:"naturalSort"},
						{name: "amount", index: "amount", align: "right",
							sorttype: "float", sortable: true, formatter:"number", formatoptions:{decimalPlaces: 2},
							filterMin: 0, filterMax: 4999, hideSlider: true},
						{name: "tax", index: "tax", align: "right",
							sorttype: "float", sortable: true, formatter:"number", formatoptions:{decimalPlaces: 2},
							filterMin: 0, filterMax: 1000, hideSlider: false},
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
					groupHeaders:[{startColumnName: "name", numberOfColumns: 5, titleText: "Price"}],
                    gridPreferences: getObjectFromLocalStorage("reportGrid2.gridPreferences")
				};

				$scope.gridOptions5 = {
					cellSize: "sm",
					treeGrid: true,
					treeGridModel: "adjacency",
					ExpandColumn: "COUNTRY",
					ExpandColClick: true,
					treedatatype: "local",
					datatype: "jsonstring",
					datastr: myData,
					jsonReader: {
						repeatitems: false
					},
					colNames: treeData.columns,
					colModel: [
						{name: "ROW_KEY", hidden: true},
						{name: "LEVEL", hidden: true},
						{name: "COUNTRY", index: "cme-dimension--COUNTRY"},
						{name: "STATE", index: "cme-dimension--STATE"},
						{name: "CITY", index: "cme-dimension--CITY"},
						{name: "ABANDONED SALES", index: "cme-metric--ABANDONED_SALES", align: "right",
							sorttype: "float", formatter:"currency", formatoptions:{decimalPlaces: 2, prefix: "$"}}
					],
					sortname: "cme-dimension--COUNTRY",
					x1HorizontalScroll: true,
					cmTemplate: {
						autoResizable: true
					},
					autoResizing: {
						maxColWidth: 1000
					},
					autoresizeOnLoad: true,
					totalRow: {"ABANDONED SALES":"62.165487289"}
				};

				var customAngularDirective = "<x1-slider ng-model='toggleValue' range='toggleOptions.range'" +
				"connect='toggleOptions.connect' class='x1-slider-as-toggle'></x1-slider>";
				$scope.toggleValue = 0;

				$scope.toggleOptions = {
					connect: "lower",
					range: {
						min: [0, 1],
						max: 1
					}
				};

				$scope.gridOptions6 = {
					cellSize: "sm",
					colNames: ["ROW_KEY","COUNTRY","DataType"],
					colModel: [
						{name: "ROW_KEY", hidden: true},
						{name: "COUNTRY", index: "cme-dimension--COUNTRY"},
						{name: "DataType", index: "DataType",
			     	   formatter: function(){
    					    return customAngularDirective;
    				    }}
					],
					sortname: "cme-dimension--COUNTRY",
					useHorizontalScrollbar: true,
					postCompileClassName: "custom-grid", //this class must exist on the x1-grid element for this to work
			    	postCompileScope: $scope //a valid scope must be passed in for the custom directive to be compiled
				};

			}, 20);

			//demo 5
			var treeData = {
				"columns": ["ROW_KEY", "LEVEL", "COUNTRY", "STATE", "CITY", "ABANDONED SALES"],
				"visible": [false, false, true, true, true, true],
				"data": [
					[1, 1, "UNITED STATES", "_CM|PRNT__", "_CM|PRNT__", "3609434.598833084"],
					[2, 2, "", "UNKNOWN", "_CM|PRNT__", "3563165.7686805725"],
					[3, 3, "", "", "UNKNOWN", "3563165.7686805725"],
					[4, 2, "", "MASSACHUSETTS", "_CM|PRNT__", "41577.8801651001"],
					[5, 3, "", "", "OXFORD", "41577.8801651001"],
					[6, 2, "", "CALIFORNIA", "_CM|PRNT__", "4180.969997406006"],
					[7, 3, "", "", "SANTA CLARA", "4000.0"],
					[8, 3, "", "", "SACRAMENTO", "180.96999740600586"],
					[9, 2, "", "ILLINOIS", "_CM|PRNT__", "509.97999000549316"],
					[10, 3, "", "", "CHICAGO", "509.97999000549316"],
					[11, 1, "GERMANY", "_CM|PRNT__", "_CM|PRNT__", "1898567.2022762299"],
					[12, 2, "", "NORDRHEIN-WESTFALEN", "_CM|PRNT__", "1898567.2022762299"],
					[13, 3, "", "", "KOELN", "1898567.2022762299"],
					[14, 1, "CHINA", "_CM|PRNT__", "_CM|PRNT__", "759479.4243831635"],
					[15, 2, "", "SHANGHAI SHI", "_CM|PRNT__", "757879.4343929291"],
					[16, 3, "", "", "SHANGHAI", "757879.4343929291"],
					[17, 2, "", "BEIJING SHI", "_CM|PRNT__", "1599.989990234375"],
					[18, 3, "", "", "BEIJING", "1599.989990234375"],
					[19, 1, "TAIWAN", "_CM|PRNT__", "_CM|PRNT__", "361.9399948120117"],
					[20, 2, "", "T'AI-PEI", "_CM|PRNT__", "361.9399948120117"],
					[21, 3, "", "", "TAIPEI", "361.9399948120117"]
				],
				"total": [null, 1, "Total", "_CM|PRNT__", "_CM|PRNT__", "6267843.165487289"]
			};

			function parseTreeData(myData) {
				var currentRow,
					dataRow,
					dataItem;
				for (i = 0; i < treeData.data.length; i++) {
					currentRow = {};
					for (var j = 0; j < treeData.data[i].length; j++) {
						dataRow = treeData.data[i];
						dataItem = dataRow[j];
						if (dataItem === "_CM|PRNT__") {
							dataItem = "";
						}
						currentRow[treeData.columns[j]] = dataItem;
					}
					currentRow.loaded = true;
					currentRow.expanded = false;
					currentRow.id = currentRow.ROW_KEY;
					currentRow.level = currentRow.LEVEL;
					currentRow.parent = "NULL";
					currentRow.isLeaf = false;

					myData.rows.push(currentRow);
				}
				//return myData;
			}

			var myData = {"rows": []};

			function buildTreeData() {
				parseTreeData(myData);

				var L1parent, L2parent, L3parent, L4parent, currentNode, currentParent, previousNode, previousParent;
				for (i = 0; i < myData.rows.length; i++) {
					currentNode = myData.rows[i];
					switch (currentNode.level) {
						case 1:
							L1parent = currentNode.id;
							L2parent = "NULL";
							L3parent = "NULL";
							L4parent = "NULL";
							currentParent = "NULL";
							previousParent = "NULL";
							break;
						case 2:
							L2parent = currentNode.id;
							L3parent = "NULL";
							L4parent = "NULL";
							currentParent = L1parent;
							previousParent = L1parent;
							break;
						case 3:
							L3parent = currentNode.id;
							L4parent = "NULL";
							currentParent = L2parent;
							previousParent = L1parent;
							break;
						case 4:
							L4parent = currentNode.id;
							currentParent = L3parent;
							previousParent = L2parent;
							break;
						case 5:
							currentParent = L4parent;
							previousParent = L3parent;
							currentNode.isLeaf = true;
							break;
					}
					if (previousNode) {
						if (previousNode.level > currentNode.level) {
							previousNode.isLeaf = true;
							currentNode.parent = previousParent;
							checkForLeafNodes(previousNode);
						}
						else if (previousNode.level <= currentNode.level) {
							currentNode.parent = currentParent;
						}
					}

					previousNode = currentNode;
				}
				//last item in array will always be a leaf node
				myData.rows[myData.rows.length - 1].isLeaf = true;

				function checkForLeafNodes(node) {
					var id = node.id - 1;
					var level = node.level;

					while (myData.rows[id--] && myData.rows[id].level === level) {
						myData.rows[id].isLeaf = true;
					}
				}
			}

			buildTreeData();

			$scope.gridData5 = myData.rows;
		}
	]);

(function(module) {
try {
  module = angular.module('x1.ui.jqgrid');
} catch (e) {
  module = angular.module('x1.ui.jqgrid', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('jqgrid/grid.demo.html',
    '<x1-demo-generator repo-name="x1-ui-ng-jqgrid" doc-src="\'jqgrid/grid.doc.html\'">\n' +
    '	<h3 class="page-header">Grid with force-fit columns and infinite (lazy-loading) vertical scrolling</h3>\n' +
    '	<div ng-controller="jqgridDemoCtrl" id="grid-example-1" class="bs-example">\n' +
    '		<p><em>Cell click events:</em> {{demoEvents.demoClickEvent}}</p>\n' +
    '		<p><em>Column sort events:</em> {{demoEvents.demoSortEvent}}</p>\n' +
    '		<button id="grid-resize-btn" ng-click="resizeGrid(\'#grid-example-1\')">Resize Grid Parent</button>\n' +
    '		<x1-grid id="{{idMap.id1}}" data="gridData1" options="gridOptions1" resize-events="gridEvents"></x1-grid>\n' +
    '	</div>\n' +
    '	<tabset>\n' +
    '		<tab heading="HTML">\n' +
    '			<x1-prism element="#grid-example-1"></x1-prism>\n' +
    '		</tab>\n' +
    '		<tab heading="JS">\n' +
    '			<x1-prism lang="javascript">\n' +
    '				angular\n' +
    '					.module(&quot;x1.ui.jqgrid.demo&quot;, [\n' +
    '						&quot;x1.ui.jqgrid&quot;\n' +
    '					])\n' +
    '					.controller(&quot;x1.ui.jqgrid.demo&quot;, [&quot;$scope&quot;, &quot;$timeout&quot;,\n' +
    '						function($scope, $timeout) {\n' +
    '							&quot;use strict&quot;;\n' +
    '\n' +
    '							$scope.idMap = {\n' +
    '							id1: &quot;reportGrid1&quot;,\n' +
    '							id2: &quot;reportGrid2&quot;,\n' +
    '							id5: &quot;reportGrid5&quot;\n' +
    '							};\n' +
    '							$scope.demoEvents = {\n' +
    '							demoClickEvent: &quot;Click any cell to see its select event&quot;,\n' +
    '							demoSortEvent: &quot;Click a column header to see its sort event&quot;,\n' +
    '							demoEditEvent: &quot;Click and edit a row above to see its after edit event&quot;\n' +
    '							};\n' +
    '							$scope.gridEvents = [&quot;x1.ui.jqgrid.event.resize&quot;];\n' +
    '\n' +
    '							$scope.resizeGrid = function(id) {\n' +
    '							if (jQuery(id + &quot;.shrunken&quot;)[0]) {\n' +
    '							jQuery(id).css(&quot;width&quot;, &quot;100%&quot;);\n' +
    '							jQuery(id).removeClass(&quot;shrunken&quot;);\n' +
    '							} else {\n' +
    '							jQuery(id).css(&quot;width&quot;, &quot;50%&quot;);\n' +
    '							jQuery(id).addClass(&quot;shrunken&quot;);\n' +
    '							}\n' +
    '							$scope.$broadcast(&quot;x1.ui.jqgrid.event.resize&quot;);\n' +
    '							};\n' +
    '\n' +
    '							$scope.$on(&quot;x1.ui.gridColumnSort&quot;, function(event, colData){\n' +
    '							if (colData.gridId === &quot;reportGrid1&quot;) {\n' +
    '							$scope.demoEvents.demoSortEvent = JSON.stringify(colData);\n' +
    '							$scope.$apply();\n' +
    '							}\n' +
    '							});\n' +
    '							$scope.$on(&quot;x1.ui.selectGridCell&quot;, function(event, cellData){\n' +
    '							if (cellData.gridId === &quot;reportGrid1&quot;) {\n' +
    '							$scope.demoEvents.demoClickEvent = JSON.stringify(cellData);\n' +
    '							$scope.$apply();\n' +
    '							}\n' +
    '							});\n' +
    '							$scope.$on(&quot;x1.ui.gridRowEdited&quot;, function(event, rowData){\n' +
    '							if (rowData.gridId === &quot;reportGrid2&quot;) {\n' +
    '							$scope.demoEvents.demoEditEvent = JSON.stringify(rowData);\n' +
    '							$scope.$apply();\n' +
    '							}\n' +
    '							});\n' +
    '\n' +
    '							var data = [];\n' +
    '							var currRow;\n' +
    '							for (var i = 0; i &lt; 5000; i++) {\n' +
    '							currRow = {\n' +
    '							id: i,\n' +
    '							date: &quot;2015-04-&quot; + Math.ceil((i + 1) * 30 / 5000),\n' +
    '							name: &quot;Client&quot; + i,\n' +
    '							amount: i,\n' +
    '							tax: i * 0.18,\n' +
    '							interest: Math.random(),\n' +
    '							total: i + i * 0.18,\n' +
    '							note: &quot;note here&quot; + i,\n' +
    '							note2: &quot;note here&quot; + i,\n' +
    '							note3: &quot;note here&quot; + i,\n' +
    '							note4: &quot;note here&quot; + i\n' +
    '							};\n' +
    '							data.push(currRow);\n' +
    '							}\n' +
    '\n' +
    '							$scope.gridData1 = data;\n' +
    '\n' +
    '							$timeout(function() {\n' +
    '							$scope.gridOptions1 = {\n' +
    '							cellSize: &quot;sm&quot;,\n' +
    '							colNames: [&quot;Inv No&quot;, &quot;Date&quot;, &quot;Client&quot;, &quot;Amount&quot;, &quot;Tax&quot;, &quot;Interest&quot;, &quot;Total&quot;,\n' +
    '							&quot;Notes&quot;, &quot;Notes2&quot;, &quot;Notes3&quot;,	&quot;Notes4&quot;],\n' +
    '							colModel: [\n' +
    '							{name: &quot;id&quot;, index: &quot;id&quot;, align: &quot;right&quot;, sorttype: &quot;int&quot;},\n' +
    '							{name:&quot;date&quot;,index:&quot;date&quot;, sorttype:&quot;date&quot;, formatter:&quot;date&quot;,\n' +
    '							formatoptions:{newformat: &quot;ISO8601Short&quot;}},\n' +
    '							{name: &quot;name&quot;, index: &quot;name&quot;, sorttype: &quot;text&quot;},\n' +
    '							{name: &quot;amount&quot;, index: &quot;amount&quot;, align: &quot;right&quot;, sorttype: &quot;float&quot;,\n' +
    '							formatter:&quot;currency&quot;, formatoptions:{decimalPlaces: 2, prefix: &quot;$&quot;}},\n' +
    '							{name: &quot;tax&quot;, index: &quot;tax&quot;, align: &quot;right&quot;, sorttype: &quot;float&quot;,\n' +
    '							formatter:&quot;number&quot;, formatoptions:{decimalPlaces: 2}},\n' +
    '							{name: &quot;interest&quot;, index: &quot;interest&quot;, align: &quot;right&quot;, sorttype: &quot;float&quot;,\n' +
    '							formatter: percentFormatter, unformat: percentUnFormatter,\n' +
    '							formatoptions:{decimalPlaces: 2}},\n' +
    '							{name: &quot;total&quot;, index: &quot;total&quot;, align: &quot;right&quot;, sorttype: &quot;float&quot;,\n' +
    '							formatter:&quot;currency&quot;, formatoptions:{decimalPlaces: 0, prefix: &quot;$&quot;}},\n' +
    '							{name: &quot;note&quot;, index: &quot;note&quot;, sortable: true, sorttype:&quot;text&quot;},\n' +
    '							{name: &quot;note2&quot;, index: &quot;note2&quot;, sorttype: &quot;text&quot;},\n' +
    '							{name: &quot;note3&quot;, index: &quot;note3&quot;, sorttype: &quot;text&quot;},\n' +
    '							{name: &quot;note4&quot;, index: &quot;note4&quot;, sorttype: &quot;text&quot;}\n' +
    '							],\n' +
    '							totalRow:  {id: &quot;&quot;, date: &quot;&quot;, name: &quot;&quot;, note: &quot;&quot;, amount: 13280, tax: 255, total: 14175.00},\n' +
    '							multiselect: true,\n' +
    '							//sortFirstCol: true,\n' +
    '							useInfiniteScrolling: true,\n' +
    '							rowTotals: true,\n' +
    '							colTotals: true,\n' +
    '							frozenStaticCols: true\n' +
    '							};\n' +
    '\n' +
    '							function percentFormatter(cellValue, options) {\n' +
    '							if (isNaN(cellValue)) {\n' +
    '							return &quot;--&quot;;\n' +
    '							}\n' +
    '							return ( (cellValue * 100).toFixed(options.colModel.formatoptions.decimalPlaces) + &quot;%&quot; );\n' +
    '							}\n' +
    '							function percentUnFormatter(cellValue) {\n' +
    '							return (parseInt(cellValue.replace(&quot;%&quot;,&quot;&quot;),10) / 100);\n' +
    '							}\n' +
    '							}, 20);\n' +
    '						}\n' +
    '					]);\n' +
    '			</x1-prism>\n' +
    '		</tab>\n' +
    '	</tabset>\n' +
    '\n' +
    '	<h3 class="page-header">Grid with minimum-width columns, horizontal scrolling, editable\n' +
    '		fields, and paging</h3>\n' +
    '	<div ng-controller="jqgridDemoCtrl" id="grid-example-2" class="bs-example">\n' +
    '		<p><em>Row edit events:</em> {{demoEvents.demoEditEvent}}</p>\n' +
    '		<button ng-click="resizeGrid(\'#grid-example-2\')">Resize Grid Parent</button>\n' +
    '		<button ng-click="changeGridSize(\'sm\')">sm</button>\n' +
    '		<button ng-click="changeGridSize(\'md\')">md</button>\n' +
    '		<button ng-click="changeGridSize(\'lg\')">lg</button>\n' +
    '		<button ng-click="clearAllFilters()">Clear all Filters</button>\n' +
    '		<button ng-click="clearAllSorts()">Clear all Sorts</button>\n' +
    '		<x1-grid id="{{idMap.id2}}" data="gridData2" options="gridOptions2"\n' +
    '				 resize-events="gridEvents"></x1-grid>\n' +
    '	</div>\n' +
    '	<tabset>\n' +
    '		<tab heading="HTML">\n' +
    '			<x1-prism element="#grid-example-2"></x1-prism>\n' +
    '		</tab>\n' +
    '		<tab heading="JS">\n' +
    '			<x1-prism lang="javascript">\n' +
    'angular\n' +
    '	.module(&quot;x1.ui.jqgrid.demo&quot;, [\n' +
    '		&quot;x1.ui.jqgrid&quot;\n' +
    '	])\n' +
    '	.controller(&quot;jqgridDemoCtrl&quot;, [&quot;$scope&quot;, &quot;$timeout&quot;, &quot;x1.ui.jqgrid.events&quot;,\n' +
    '		function($scope, $timeout, JQGridEvents) {\n' +
    '		&quot;use strict&quot;;\n' +
    '\n' +
    '		var gridPreferences = {};\n' +
    '\n' +
    '		//all demos\n' +
    '		$scope.idMap = {\n' +
    '			id1: &quot;reportGrid1&quot;,\n' +
    '			id2: &quot;reportGrid2&quot;,\n' +
    '			id5: &quot;reportGrid5&quot;\n' +
    '		};\n' +
    '		$scope.demoEvents = {\n' +
    '			demoClickEvent: &quot;Click any cell to see its select event&quot;,\n' +
    '			demoSortEvent: &quot;Click a column header to see its sort event&quot;,\n' +
    '			demoEditEvent: &quot;Click and edit a row above to see its after edit event&quot;\n' +
    '		};\n' +
    '		$scope.gridEvents = [&quot;x1.ui.jqgrid.event.resize&quot;];\n' +
    '\n' +
    '		$scope.resizeGrid = function(id) {\n' +
    '			if (jQuery(id + &quot;.shrunken&quot;)[0]) {\n' +
    '				jQuery(id).css(&quot;width&quot;, &quot;100%&quot;);\n' +
    '				jQuery(id).removeClass(&quot;shrunken&quot;);\n' +
    '			} else {\n' +
    '				jQuery(id).css(&quot;width&quot;, &quot;50%&quot;);\n' +
    '				jQuery(id).addClass(&quot;shrunken&quot;);\n' +
    '			}\n' +
    '			$scope.$broadcast(&quot;x1.ui.jqgrid.event.resize&quot;);\n' +
    '		};\n' +
    '\n' +
    '		$scope.changeGridSize = function(size) {\n' +
    '			$scope.$broadcast(JQGridEvents.GRID_CHANGE_SIZE, size);\n' +
    '		};\n' +
    '\n' +
    '		$scope.$on(&quot;x1.ui.gridColumnSort&quot;, function(event, colData){\n' +
    '			if (colData.gridId === &quot;reportGrid1&quot;) {\n' +
    '				$scope.demoEvents.demoSortEvent = JSON.stringify(colData);\n' +
    '				$scope.$apply();\n' +
    '			}\n' +
    '\n' +
    '			if(colData.gridId === &quot;reportGrid2&quot;) {\n' +
    '				gridPreferences.sortname = colData.id;\n' +
    '				gridPreferences.sortorder = colData.sort;\n' +
    '				saveObjectInLocalStorage(&quot;reportGrid2.gridPreferences&quot;, gridPreferences);\n' +
    '			}\n' +
    '		});\n' +
    '\n' +
    '		$scope.$on(&quot;x1.ui.gridColumnStatesChanged&quot;, function(event, colStates, gridId){\n' +
    '			if(gridId === &quot;reportGrid2&quot;) {\n' +
    '				gridPreferences.colStates = colStates;\n' +
    '				saveObjectInLocalStorage(&quot;reportGrid2.gridPreferences&quot;, gridPreferences);\n' +
    '			}\n' +
    '		});\n' +
    '\n' +
    '		$scope.$on(&quot;x1.ui.gridColumnReorder&quot;, function(event, reorderObj){\n' +
    '			if(reorderObj.gridId === &quot;reportGrid2&quot;) {\n' +
    '				gridPreferences.permutation = reorderObj.permutation;\n' +
    '				saveObjectInLocalStorage(&quot;reportGrid2.gridPreferences&quot;, gridPreferences);\n' +
    '			}\n' +
    '		});\n' +
    '\n' +
    '		$scope.$on(&quot;x1.ui.gridFilterChanged&quot;, function(event, filters, gridId){\n' +
    '			if(gridId === &quot;reportGrid2&quot;) {\n' +
    '				gridPreferences.filters = filters;\n' +
    '				saveObjectInLocalStorage(&quot;reportGrid2.gridPreferences&quot;, gridPreferences);\n' +
    '			}\n' +
    '		});\n' +
    '\n' +
    '		$scope.$on(&quot;x1.ui.gridRowEdited&quot;, function(event, rowData){\n' +
    '			if (rowData.gridId === &quot;reportGrid2&quot;) {\n' +
    '				$scope.demoEvents.demoEditEvent = JSON.stringify(rowData);\n' +
    '				$scope.$apply();\n' +
    '			}\n' +
    '		});\n' +
    '\n' +
    '		function saveObjectInLocalStorage(storageItemName, object) {\n' +
    '			if (typeof window.localStorage !== &#39;undefined&#39;) {\n' +
    '				window.localStorage.setItem(storageItemName, JSON.stringify(object));\n' +
    '			}\n' +
    '		}\n' +
    '\n' +
    '		function getObjectFromLocalStorage(storageItemName) {\n' +
    '			if (typeof window.localStorage !== &#39;undefined&#39;) {\n' +
    '				return JSON.parse(window.localStorage.getItem(storageItemName));\n' +
    '			}\n' +
    '		}\n' +
    '\n' +
    '		var data = [];\n' +
    '		var currRow;\n' +
    '		for (var i = 0; i &lt; 5000; i++) {\n' +
    '			currRow = {\n' +
    '				id: i,\n' +
    '				date: &quot;2015-04-&quot; + Math.ceil((i + 1) * 30 / 5000),\n' +
    '				name: &quot;Client&quot; + i,\n' +
    '				amount: i,\n' +
    '				tax: i * 0.18,\n' +
    '				interest: Math.random(),\n' +
    '				total: i + i * 0.18,\n' +
    '				note: &quot;note here note here note here note here&quot; + i,\n' +
    '				note2: &quot;note here&quot; + i,\n' +
    '				note3: &quot;note here&quot; + i,\n' +
    '				note4: &quot;note here&quot; + i\n' +
    '			};\n' +
    '			data.push(currRow);\n' +
    '		}\n' +
    '\n' +
    '		$scope.gridData2 = data;\n' +
    '\n' +
    '		$timeout(function() {\n' +
    '			function percentFormatter(cellValue, options) {\n' +
    '				if (isNaN(cellValue)) {\n' +
    '					return &quot;--&quot;;\n' +
    '				}\n' +
    '				return ( (cellValue * 100).toFixed(options.colModel.formatoptions.decimalPlaces) + &quot;%&quot; );\n' +
    '			}\n' +
    '\n' +
    '			function percentUnFormatter(cellValue) {\n' +
    '				return (parseInt(cellValue.replace(&quot;%&quot;,&quot;&quot;),10) / 100);\n' +
    '			}\n' +
    '\n' +
    '			$scope.gridOptions2 = {\n' +
    '				cellSize: &quot;md&quot;,\n' +
    '				colNames: [&quot;Inv No&quot;, &quot;Date&quot;, &quot;Client&quot;, &quot;Amount&quot;, &quot;Tax&quot;, &quot;Interest&quot;, &quot;Total&quot;, &quot;Notes&quot;,\n' +
    '					&quot;Notes2&quot;, &quot;Notes3&quot;, &quot;Notes4&quot;],\n' +
    '				colModel: [\n' +
    '					{name: &quot;id&quot;, index: &quot;id&quot;, sorttype: &quot;int&quot;, align: &quot;right&quot;, frozen: true, search: false,\n' +
    '						filterMin: 0, filterMax: 5000},\n' +
    '					{name: &quot;date&quot;, index: &quot;date&quot;, sorttype: &quot;date&quot;, formatter: &quot;date&quot;,\n' +
    '						formatoptions:{newformat: &quot;ISO8601Short&quot;}},\n' +
    '					{name: &quot;name&quot;, index: &quot;name&quot;, sorttype: &quot;text&quot;,	editable: true, edittype: &quot;text&quot;},\n' +
    '					{name: &quot;amount&quot;, index: &quot;amount&quot;, align: &quot;right&quot;,\n' +
    '						sorttype: &quot;float&quot;, sortable: true, formatter:&quot;number&quot;, formatoptions:{decimalPlaces: 2},\n' +
    '						filterMin: 0, filterMax: 4999},\n' +
    '					{name: &quot;tax&quot;, index: &quot;tax&quot;, align: &quot;right&quot;,\n' +
    '						sorttype: &quot;float&quot;, sortable: true, formatter:&quot;number&quot;, formatoptions:{decimalPlaces: 2},\n' +
    '						filterMin: 0, filterMax: 1000},\n' +
    '					{name: &quot;interest&quot;, index: &quot;interest&quot;, align: &quot;right&quot;, sorttype: &quot;float&quot;,\n' +
    '						formatter: percentFormatter, unformat: percentUnFormatter,\n' +
    '						formatoptions:{decimalPlaces: 2}, filterType: &quot;percentage&quot;,\n' +
    '						filterMin: 0, filterMax: 1},\n' +
    '					{name: &quot;total&quot;, index: &quot;total&quot;, align: &quot;right&quot;,\n' +
    '						sorttype: &quot;float&quot;, formatter:&quot;currency&quot;, formatoptions:{decimalPlaces: 2, prefix: &quot;$&quot;},\n' +
    '						filterMin: 0, filterMax: 5899},\n' +
    '					{name: &quot;note&quot;, index: &quot;note&quot;, sorttype: &quot;text&quot;, editable: true,\n' +
    '						edittype: &quot;text&quot;},\n' +
    '					{name: &quot;note2&quot;, index: &quot;note2&quot;, sorttype: &quot;text&quot;, editable: true, edittype: &quot;text&quot;},\n' +
    '					{name: &quot;note3&quot;, index: &quot;note3&quot;, sorttype: &quot;text&quot;, editable: true, edittype: &quot;text&quot;},\n' +
    '					{name: &quot;note4&quot;, index: &quot;note4&quot;, sorttype: &quot;text&quot;, editable: true, edittype: &quot;text&quot;}\n' +
    '				],\n' +
    '				cmTemplate: {\n' +
    '					autoResizable: true\n' +
    '				},\n' +
    '				autoresizeOnLoad: true,\n' +
    '				totalRow:  {id: &quot;&quot;, date: &quot;&quot;, name: &quot;&quot;, amount: 9990, tax: 667, total: 10657.00, note: &quot;&quot; },\n' +
    '				sortFirstCol: false,\n' +
    '				sortorder: &quot;asc&quot;,\n' +
    '				sortname: &quot;name&quot;,\n' +
    '				x1Filters: true,\n' +
    '				x1HorizontalScroll: true,\n' +
    '				usePager: true,\n' +
    '				allowInlineEditing: true,\n' +
    '				useGroupedHeaders: true,\n' +
    '				viewsortcols: [false, &quot;horizontal&quot;, true],\n' +
    '				groupHeaders:[{startColumnName: &quot;name&quot;, numberOfColumns: 5, titleText: &quot;Price&quot;}],\n' +
    '				gridPreferences: getObjectFromLocalStorage(&quot;reportGrid2.gridPreferences&quot;)\n' +
    '			};\n' +
    '		}, 20);\n' +
    '	}]);\n' +
    '			</x1-prism>\n' +
    '		</tab>\n' +
    '	</tabset>\n' +
    '\n' +
    '	<h3 class="page-header">Tree grid</h3>\n' +
    '	<div ng-controller="jqgridDemoCtrl" id="grid-example-5" class="bs-example">\n' +
    '		<button id="grid-resize-btn5" ng-click="resizeGrid(\'#grid-example-5\')">Resize Grid Parent</button>\n' +
    '		<button ng-click="changeGridSize(\'sm\')">sm</button>\n' +
    '		<button ng-click="changeGridSize(\'md\')">md</button>\n' +
    '		<button ng-click="changeGridSize(\'lg\')">lg</button>\n' +
    '		<x1-grid id="{{idMap.id5}}" data="gridData5" options="gridOptions5"\n' +
    '				 resize-events="gridEvents"></x1-grid>\n' +
    '	</div>\n' +
    '	<tabset>\n' +
    '		<tab heading="HTML">\n' +
    '			<x1-prism element="#grid-example-5"></x1-prism>\n' +
    '		</tab>\n' +
    '		<tab heading="JS">\n' +
    '			<x1-prism lang="javascript">\n' +
    '				angular\n' +
    '					.module(&quot;x1.ui.jqgrid.demo&quot;, [\n' +
    '						&quot;x1.ui.jqgrid&quot;\n' +
    '					])\n' +
    '					.controller(&quot;x1.ui.jqgrid.demo&quot;, [&quot;$scope&quot;, &quot;$timeout&quot;,\n' +
    '						function($scope, $timeout) {\n' +
    '							&quot;use strict&quot;;\n' +
    '\n' +
    '							$scope.idMap = {\n' +
    '							id1: &quot;reportGrid1&quot;,\n' +
    '							id2: &quot;reportGrid2&quot;,\n' +
    '							id5: &quot;reportGrid5&quot;\n' +
    '							};\n' +
    '							$scope.gridEvents = [&quot;x1.ui.jqgrid.event.resize&quot;];\n' +
    '\n' +
    '							$scope.resizeGrid = function(id) {\n' +
    '							if (jQuery(id + &quot;.shrunken&quot;)[0]) {\n' +
    '							jQuery(id).css(&quot;width&quot;, &quot;100%&quot;);\n' +
    '							jQuery(id).removeClass(&quot;shrunken&quot;);\n' +
    '							} else {\n' +
    '							jQuery(id).css(&quot;width&quot;, &quot;50%&quot;);\n' +
    '							jQuery(id).addClass(&quot;shrunken&quot;);\n' +
    '							}\n' +
    '							$scope.$broadcast(&quot;x1.ui.jqgrid.event.resize&quot;);\n' +
    '							};\n' +
    '\n' +
    '							$timeout(function() {\n' +
    '							$scope.gridOptions5 = {\n' +
    '							treeGrid: true,\n' +
    '							treeGridModel: &quot;adjacency&quot;,\n' +
    '							ExpandColumn: &quot;COUNTRY&quot;,\n' +
    '							treedatatype: &quot;local&quot;,\n' +
    '							datatype: &quot;jsonstring&quot;,\n' +
    '							datastr: myData,\n' +
    '							jsonReader: {\n' +
    '							repeatitems: false\n' +
    '							},\n' +
    '							colNames: treeData.columns,\n' +
    '							colModel: [\n' +
    '							{name: &quot;ROW_KEY&quot;, hidden: true},\n' +
    '							{name: &quot;LEVEL&quot;, hidden: true},\n' +
    '							{name: &quot;COUNTRY&quot;, index: &quot;cme-dimension--COUNTRY&quot;},\n' +
    '							{name: &quot;STATE&quot;, index: &quot;cme-dimension--STATE&quot;},\n' +
    '							{name: &quot;CITY&quot;, index: &quot;cme-dimension--CITY&quot;},\n' +
    '							{name: &quot;ABANDONED SALES&quot;, index: &quot;cme-metric--ABANDONED_SALES&quot;, align: &quot;right&quot;,\n' +
    '							sorttype: &quot;float&quot;, formatter:&quot;currency&quot;, formatoptions:{decimalPlaces: 2, prefix: &quot;$&quot;}}\n' +
    '							],\n' +
    '							sortname: &quot;cme-dimension--COUNTRY&quot;,\n' +
    '							useHorizontalScrollbar: true,\n' +
    '							totalRow: {&quot;ABANDONED SALES&quot;:&quot;62.165487289&quot;}\n' +
    '							};\n' +
    '							}, 20);\n' +
    '\n' +
    '							var treeData = {\n' +
    '							&quot;columns&quot;: [&quot;ROW_KEY&quot;, &quot;LEVEL&quot;, &quot;COUNTRY&quot;, &quot;STATE&quot;, &quot;CITY&quot;, &quot;ABANDONED SALES&quot;],\n' +
    '							&quot;visible&quot;: [false, false, true, true, true, true],\n' +
    '							&quot;data&quot;: [\n' +
    '							[1, 1, &quot;UNITED STATES&quot;, &quot;_CM|PRNT__&quot;, &quot;_CM|PRNT__&quot;, &quot;3609434.598833084&quot;],\n' +
    '							[2, 2, &quot;&quot;, &quot;UNKNOWN&quot;, &quot;_CM|PRNT__&quot;, &quot;3563165.7686805725&quot;],\n' +
    '							[3, 3, &quot;&quot;, &quot;&quot;, &quot;UNKNOWN&quot;, &quot;3563165.7686805725&quot;],\n' +
    '							[4, 2, &quot;&quot;, &quot;MASSACHUSETTS&quot;, &quot;_CM|PRNT__&quot;, &quot;41577.8801651001&quot;],\n' +
    '							[5, 3, &quot;&quot;, &quot;&quot;, &quot;OXFORD&quot;, &quot;41577.8801651001&quot;],\n' +
    '							[6, 2, &quot;&quot;, &quot;CALIFORNIA&quot;, &quot;_CM|PRNT__&quot;, &quot;4180.969997406006&quot;],\n' +
    '							[7, 3, &quot;&quot;, &quot;&quot;, &quot;SANTA CLARA&quot;, &quot;4000.0&quot;],\n' +
    '							[8, 3, &quot;&quot;, &quot;&quot;, &quot;SACRAMENTO&quot;, &quot;180.96999740600586&quot;],\n' +
    '							[9, 2, &quot;&quot;, &quot;ILLINOIS&quot;, &quot;_CM|PRNT__&quot;, &quot;509.97999000549316&quot;],\n' +
    '							[10, 3, &quot;&quot;, &quot;&quot;, &quot;CHICAGO&quot;, &quot;509.97999000549316&quot;],\n' +
    '							[11, 1, &quot;GERMANY&quot;, &quot;_CM|PRNT__&quot;, &quot;_CM|PRNT__&quot;, &quot;1898567.2022762299&quot;],\n' +
    '							[12, 2, &quot;&quot;, &quot;NORDRHEIN-WESTFALEN&quot;, &quot;_CM|PRNT__&quot;, &quot;1898567.2022762299&quot;],\n' +
    '							[13, 3, &quot;&quot;, &quot;&quot;, &quot;KOELN&quot;, &quot;1898567.2022762299&quot;],\n' +
    '							[14, 1, &quot;CHINA&quot;, &quot;_CM|PRNT__&quot;, &quot;_CM|PRNT__&quot;, &quot;759479.4243831635&quot;],\n' +
    '							[15, 2, &quot;&quot;, &quot;SHANGHAI SHI&quot;, &quot;_CM|PRNT__&quot;, &quot;757879.4343929291&quot;],\n' +
    '							[16, 3, &quot;&quot;, &quot;&quot;, &quot;SHANGHAI&quot;, &quot;757879.4343929291&quot;],\n' +
    '							[17, 2, &quot;&quot;, &quot;BEIJING SHI&quot;, &quot;_CM|PRNT__&quot;, &quot;1599.989990234375&quot;],\n' +
    '							[18, 3, &quot;&quot;, &quot;&quot;, &quot;BEIJING&quot;, &quot;1599.989990234375&quot;],\n' +
    '							[19, 1, &quot;TAIWAN&quot;, &quot;_CM|PRNT__&quot;, &quot;_CM|PRNT__&quot;, &quot;361.9399948120117&quot;],\n' +
    '							[20, 2, &quot;&quot;, &quot;T&#39;AI-PEI&quot;, &quot;_CM|PRNT__&quot;, &quot;361.9399948120117&quot;],\n' +
    '							[21, 3, &quot;&quot;, &quot;&quot;, &quot;TAIPEI&quot;, &quot;361.9399948120117&quot;]\n' +
    '							],\n' +
    '							&quot;total&quot;: [null, 1, &quot;Total&quot;, &quot;_CM|PRNT__&quot;, &quot;_CM|PRNT__&quot;, &quot;6267843.165487289&quot;]\n' +
    '							};\n' +
    '\n' +
    '							function parseTreeData(myData) {\n' +
    '							var currentRow,\n' +
    '							dataRow,\n' +
    '							dataItem;\n' +
    '							for (i = 0; i &lt; treeData.data.length; i++) {\n' +
    '							currentRow = {};\n' +
    '							for (var j = 0; j &lt; treeData.data[i].length; j++) {\n' +
    '							dataRow = treeData.data[i];\n' +
    '							dataItem = dataRow[j];\n' +
    '							if (dataItem === &quot;_CM|PRNT__&quot;) {\n' +
    '							dataItem = &quot;&quot;;\n' +
    '							}\n' +
    '							currentRow[treeData.columns[j]] = dataItem;\n' +
    '							}\n' +
    '							currentRow.loaded = true;\n' +
    '							currentRow.expanded = false;\n' +
    '							currentRow.id = currentRow.ROW_KEY;\n' +
    '							currentRow.level = currentRow.LEVEL;\n' +
    '							currentRow.parent = &quot;NULL&quot;;\n' +
    '							currentRow.isLeaf = false;\n' +
    '\n' +
    '							myData.rows.push(currentRow);\n' +
    '							}\n' +
    '							//return myData;\n' +
    '							}\n' +
    '\n' +
    '							var myData = {&quot;rows&quot;: []};\n' +
    '\n' +
    '							function buildTreeData() {\n' +
    '							parseTreeData(myData);\n' +
    '\n' +
    '							var L1parent, L2parent, L3parent, L4parent, currentNode, currentParent, previousNode, previousParent;\n' +
    '							for (i = 0; i &lt; myData.rows.length; i++) {\n' +
    '							currentNode = myData.rows[i];\n' +
    '							switch (currentNode.level) {\n' +
    '							case 1:\n' +
    '							L1parent = currentNode.id;\n' +
    '							L2parent = &quot;NULL&quot;;\n' +
    '							L3parent = &quot;NULL&quot;;\n' +
    '							L4parent = &quot;NULL&quot;;\n' +
    '							currentParent = &quot;NULL&quot;;\n' +
    '							previousParent = &quot;NULL&quot;;\n' +
    '							break;\n' +
    '							case 2:\n' +
    '							L2parent = currentNode.id;\n' +
    '							L3parent = &quot;NULL&quot;;\n' +
    '							L4parent = &quot;NULL&quot;;\n' +
    '							currentParent = L1parent;\n' +
    '							previousParent = L1parent;\n' +
    '							break;\n' +
    '							case 3:\n' +
    '							L3parent = currentNode.id;\n' +
    '							L4parent = &quot;NULL&quot;;\n' +
    '							currentParent = L2parent;\n' +
    '							previousParent = L1parent;\n' +
    '							break;\n' +
    '							case 4:\n' +
    '							L4parent = currentNode.id;\n' +
    '							currentParent = L3parent;\n' +
    '							previousParent = L2parent;\n' +
    '							break;\n' +
    '							case 5:\n' +
    '							currentParent = L4parent;\n' +
    '							previousParent = L3parent;\n' +
    '							currentNode.isLeaf = true;\n' +
    '							break;\n' +
    '							}\n' +
    '							if (previousNode) {\n' +
    '							if (previousNode.level &gt; currentNode.level) {\n' +
    '							previousNode.isLeaf = true;\n' +
    '							currentNode.parent = previousParent;\n' +
    '							checkForLeafNodes(previousNode);\n' +
    '							} else if (previousNode.level &lt;= currentNode.level) {\n' +
    '							currentNode.parent = currentParent;\n' +
    '							}\n' +
    '							}\n' +
    '\n' +
    '							previousNode = currentNode;\n' +
    '							}\n' +
    '							//last item in array will always be a leaf node\n' +
    '							myData.rows[myData.rows.length - 1].isLeaf = true;\n' +
    '\n' +
    '							function checkForLeafNodes(node) {\n' +
    '							var id = node.id - 1;\n' +
    '							var level = node.level;\n' +
    '\n' +
    '							while (myData.rows[id--] &amp;&amp; myData.rows[id].level === level) {\n' +
    '							myData.rows[id].isLeaf = true;\n' +
    '							}\n' +
    '							}\n' +
    '							}\n' +
    '\n' +
    '							buildTreeData();\n' +
    '\n' +
    '							$scope.gridData5 = myData.rows;\n' +
    '						}\n' +
    '					]);\n' +
    '			</x1-prism>\n' +
    '		</tab>\n' +
    '	</tabset>\n' +
    '\n' +
    '	<h3 class="page-header">Custom angular directive grid</h3>\n' +
    '	<div ng-controller="jqgridDemoCtrl" id="grid-example-6" class="bs-example">\n' +
    '		<x1-grid class="custom-grid" id="{{idMap.id6}}" data="gridData6" options="gridOptions6"\n' +
    '				  resize-events="gridEvents"></x1-grid>\n' +
    '	</div>\n' +
    '	<tabset>\n' +
    '		<tab heading="HTML">\n' +
    '			<x1-prism element="#grid-example-6"></x1-prism>\n' +
    '		</tab>\n' +
    '		<tab heading="JS">\n' +
    '			<x1-prism lang="javascript">\n' +
    '				angular\n' +
    '					.module(&quot;x1.ui.jqgrid.demo&quot;, [\n' +
    '						&quot;x1.ui.jqgrid&quot;\n' +
    '					])\n' +
    '					.controller(&quot;x1.ui.jqgrid.demo&quot;, [&quot;$scope&quot;, &quot;$timeout&quot;,\n' +
    '						function($scope, $timeout) {\n' +
    '							&quot;use strict&quot;;\n' +
    '\n' +
    '							$scope.idMap = {\n' +
    '							id1: &quot;reportGrid1&quot;,\n' +
    '							id2: &quot;reportGrid2&quot;,\n' +
    '							id5: &quot;reportGrid5&quot;\n' +
    '							};\n' +
    '							$scope.gridEvents = [&quot;x1.ui.jqgrid.event.resize&quot;];\n' +
    '\n' +
    '							$scope.resizeGrid = function(id) {\n' +
    '							if (jQuery(id + &quot;.shrunken&quot;)[0]) {\n' +
    '							jQuery(id).css(&quot;width&quot;, &quot;100%&quot;);\n' +
    '							jQuery(id).removeClass(&quot;shrunken&quot;);\n' +
    '							} else {\n' +
    '							jQuery(id).css(&quot;width&quot;, &quot;50%&quot;);\n' +
    '							jQuery(id).addClass(&quot;shrunken&quot;);\n' +
    '							}\n' +
    '							$scope.$broadcast(&quot;x1.ui.jqgrid.event.resize&quot;);\n' +
    '							};\n' +
    '\n' +
    '							$timeout(function() {\n' +
    '\n' +
    '							var customAngularDirective = &quot;&lt;x1-slider ng-model=\'toggleValue\'\n' +
    '							range=\'toggleOptions.range\'&quot; +\n' +
    '							"connect=\'toggleOptions.connect\' class=\'x1-slider-as-toggle\'&gt;&lt;/x1-slider&gt;&quot;;\n' +
    '							$scope.toggleValue = 0;\n' +
    '\n' +
    '							$scope.toggleOptions = {\n' +
    '							connect: "lower",\n' +
    '							range: {\n' +
    '							min: [0, 1],\n' +
    '							max: 1\n' +
    '							}\n' +
    '							};\n' +
    '							$scope.gridOptions6 = {\n' +
    '							colNames: ["ROW_KEY","COUNTRY","DataType"],\n' +
    '							colModel: [\n' +
    '							{name: "ROW_KEY", hidden: true},\n' +
    '							{name: "COUNTRY", index: "cme-dimension--COUNTRY"},\n' +
    '							{name: "DataType", index: "DataType",\n' +
    '							formatter: function(){\n' +
    '								return customAngularDirective;\n' +
    '							}}\n' +
    '							],\n' +
    '							sortname: "cme-dimension--COUNTRY",\n' +
    '							useHorizontalScrollbar: true,\n' +
    '							postCompileClassName: "custom-grid", //this class must be on the x1-grid element for this to work\n' +
    '							postCompileScope: $scope  //essential for the passed in directive to work\n' +
    '							};\n' +
    '\n' +
    '							}, 20);\n' +
    '\n' +
    '							var treeData = {\n' +
    '							&quot;columns&quot;: [&quot;ROW_KEY&quot;, &quot;LEVEL&quot;, &quot;COUNTRY&quot;, &quot;STATE&quot;, &quot;CITY&quot;, &quot;ABANDONED SALES&quot;],\n' +
    '							&quot;visible&quot;: [false, false, true, true, true, true],\n' +
    '							&quot;data&quot;: [\n' +
    '							[1, 1, &quot;UNITED STATES&quot;, &quot;_CM|PRNT__&quot;, &quot;_CM|PRNT__&quot;, &quot;3609434.598833084&quot;],\n' +
    '							[2, 2, &quot;&quot;, &quot;UNKNOWN&quot;, &quot;_CM|PRNT__&quot;, &quot;3563165.7686805725&quot;],\n' +
    '							[3, 3, &quot;&quot;, &quot;&quot;, &quot;UNKNOWN&quot;, &quot;3563165.7686805725&quot;],\n' +
    '							[4, 2, &quot;&quot;, &quot;MASSACHUSETTS&quot;, &quot;_CM|PRNT__&quot;, &quot;41577.8801651001&quot;],\n' +
    '							[5, 3, &quot;&quot;, &quot;&quot;, &quot;OXFORD&quot;, &quot;41577.8801651001&quot;],\n' +
    '							[6, 2, &quot;&quot;, &quot;CALIFORNIA&quot;, &quot;_CM|PRNT__&quot;, &quot;4180.969997406006&quot;],\n' +
    '							[7, 3, &quot;&quot;, &quot;&quot;, &quot;SANTA CLARA&quot;, &quot;4000.0&quot;],\n' +
    '							[8, 3, &quot;&quot;, &quot;&quot;, &quot;SACRAMENTO&quot;, &quot;180.96999740600586&quot;],\n' +
    '							[9, 2, &quot;&quot;, &quot;ILLINOIS&quot;, &quot;_CM|PRNT__&quot;, &quot;509.97999000549316&quot;],\n' +
    '							[10, 3, &quot;&quot;, &quot;&quot;, &quot;CHICAGO&quot;, &quot;509.97999000549316&quot;],\n' +
    '							[11, 1, &quot;GERMANY&quot;, &quot;_CM|PRNT__&quot;, &quot;_CM|PRNT__&quot;, &quot;1898567.2022762299&quot;],\n' +
    '							[12, 2, &quot;&quot;, &quot;NORDRHEIN-WESTFALEN&quot;, &quot;_CM|PRNT__&quot;, &quot;1898567.2022762299&quot;],\n' +
    '							[13, 3, &quot;&quot;, &quot;&quot;, &quot;KOELN&quot;, &quot;1898567.2022762299&quot;],\n' +
    '							[14, 1, &quot;CHINA&quot;, &quot;_CM|PRNT__&quot;, &quot;_CM|PRNT__&quot;, &quot;759479.4243831635&quot;],\n' +
    '							[15, 2, &quot;&quot;, &quot;SHANGHAI SHI&quot;, &quot;_CM|PRNT__&quot;, &quot;757879.4343929291&quot;],\n' +
    '							[16, 3, &quot;&quot;, &quot;&quot;, &quot;SHANGHAI&quot;, &quot;757879.4343929291&quot;],\n' +
    '							[17, 2, &quot;&quot;, &quot;BEIJING SHI&quot;, &quot;_CM|PRNT__&quot;, &quot;1599.989990234375&quot;],\n' +
    '							[18, 3, &quot;&quot;, &quot;&quot;, &quot;BEIJING&quot;, &quot;1599.989990234375&quot;],\n' +
    '							[19, 1, &quot;TAIWAN&quot;, &quot;_CM|PRNT__&quot;, &quot;_CM|PRNT__&quot;, &quot;361.9399948120117&quot;],\n' +
    '							[20, 2, &quot;&quot;, &quot;T&#39;AI-PEI&quot;, &quot;_CM|PRNT__&quot;, &quot;361.9399948120117&quot;],\n' +
    '							[21, 3, &quot;&quot;, &quot;&quot;, &quot;TAIPEI&quot;, &quot;361.9399948120117&quot;]\n' +
    '							],\n' +
    '							&quot;total&quot;: [null, 1, &quot;Total&quot;, &quot;_CM|PRNT__&quot;, &quot;_CM|PRNT__&quot;, &quot;6267843.165487289&quot;]\n' +
    '							};\n' +
    '\n' +
    '							function parseTreeData(myData) {\n' +
    '							var currentRow,\n' +
    '							dataRow,\n' +
    '							dataItem;\n' +
    '							for (i = 0; i &lt; treeData.data.length; i++) {\n' +
    '							currentRow = {};\n' +
    '							for (var j = 0; j &lt; treeData.data[i].length; j++) {\n' +
    '							dataRow = treeData.data[i];\n' +
    '							dataItem = dataRow[j];\n' +
    '							if (dataItem === &quot;_CM|PRNT__&quot;) {\n' +
    '							dataItem = &quot;&quot;;\n' +
    '							}\n' +
    '							currentRow[treeData.columns[j]] = dataItem;\n' +
    '							}\n' +
    '							currentRow.loaded = true;\n' +
    '							currentRow.expanded = false;\n' +
    '							currentRow.id = currentRow.ROW_KEY;\n' +
    '							currentRow.level = currentRow.LEVEL;\n' +
    '							currentRow.parent = &quot;NULL&quot;;\n' +
    '							currentRow.isLeaf = false;\n' +
    '\n' +
    '							myData.rows.push(currentRow);\n' +
    '							}\n' +
    '							//return myData;\n' +
    '							}\n' +
    '\n' +
    '							var myData = {&quot;rows&quot;: []};\n' +
    '\n' +
    '							function buildTreeData() {\n' +
    '							parseTreeData(myData);\n' +
    '\n' +
    '							var L1parent, L2parent, L3parent, L4parent, currentNode, currentParent, previousNode, previousParent;\n' +
    '							for (i = 0; i &lt; myData.rows.length; i++) {\n' +
    '							currentNode = myData.rows[i];\n' +
    '							switch (currentNode.level) {\n' +
    '							case 1:\n' +
    '							L1parent = currentNode.id;\n' +
    '							L2parent = &quot;NULL&quot;;\n' +
    '							L3parent = &quot;NULL&quot;;\n' +
    '							L4parent = &quot;NULL&quot;;\n' +
    '							currentParent = &quot;NULL&quot;;\n' +
    '							previousParent = &quot;NULL&quot;;\n' +
    '							break;\n' +
    '							case 2:\n' +
    '							L2parent = currentNode.id;\n' +
    '							L3parent = &quot;NULL&quot;;\n' +
    '							L4parent = &quot;NULL&quot;;\n' +
    '							currentParent = L1parent;\n' +
    '							previousParent = L1parent;\n' +
    '							break;\n' +
    '							case 3:\n' +
    '							L3parent = currentNode.id;\n' +
    '							L4parent = &quot;NULL&quot;;\n' +
    '							currentParent = L2parent;\n' +
    '							previousParent = L1parent;\n' +
    '							break;\n' +
    '							case 4:\n' +
    '							L4parent = currentNode.id;\n' +
    '							currentParent = L3parent;\n' +
    '							previousParent = L2parent;\n' +
    '							break;\n' +
    '							case 5:\n' +
    '							currentParent = L4parent;\n' +
    '							previousParent = L3parent;\n' +
    '							currentNode.isLeaf = true;\n' +
    '							break;\n' +
    '							}\n' +
    '							if (previousNode) {\n' +
    '							if (previousNode.level &gt; currentNode.level) {\n' +
    '							previousNode.isLeaf = true;\n' +
    '							currentNode.parent = previousParent;\n' +
    '							checkForLeafNodes(previousNode);\n' +
    '							} else if (previousNode.level &lt;= currentNode.level) {\n' +
    '							currentNode.parent = currentParent;\n' +
    '							}\n' +
    '							}\n' +
    '\n' +
    '							previousNode = currentNode;\n' +
    '							}\n' +
    '							//last item in array will always be a leaf node\n' +
    '							myData.rows[myData.rows.length - 1].isLeaf = true;\n' +
    '\n' +
    '							function checkForLeafNodes(node) {\n' +
    '							var id = node.id - 1;\n' +
    '							var level = node.level;\n' +
    '\n' +
    '							while (myData.rows[id--] &amp;&amp; myData.rows[id].level === level) {\n' +
    '							myData.rows[id].isLeaf = true;\n' +
    '							}\n' +
    '							}\n' +
    '							}\n' +
    '\n' +
    '							buildTreeData();\n' +
    '\n' +
    '							$scope.gridData5 = myData.rows;\n' +
    '						}\n' +
    '					]);\n' +
    '			</x1-prism>\n' +
    '		</tab>\n' +
    '	</tabset>\n' +
    '</x1-demo-generator>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.jqgrid');
} catch (e) {
  module = angular.module('x1.ui.jqgrid', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('jqgrid/grid.doc.html',
    '<h3>Bower dependencies</h3>\n' +
    '<ul>\n' +
    '	<li>angular</li>\n' +
    '	<li>angular-translate</li>\n' +
    '	<li>angular-translate-loader-static-files</li>\n' +
    '	<li>jquery</li>\n' +
    '	<li>jquery-ui</li>\n' +
    '	<li>free-jqgrid</li>\n' +
    '	<li>x1-ui-bootstrap</li>\n' +
    '	<li>x1-ui-ng-popover</li>\n' +
    '	<li>x1-ui-ng-select</li>\n' +
    '	<li>x1-ui-ng-slider</li>\n' +
    '</ul>\n' +
    '\n' +
    '<h3>Attribute options for &lt;x1-grid&gt;</h3>\n' +
    '<table class="table table-condensed table-striped">\n' +
    '	<thead>\n' +
    '	<tr>\n' +
    '		<th>Property</th>\n' +
    '		<th>Description</th>\n' +
    '		<th>Required</th>\n' +
    '		<th>Default Value</th>\n' +
    '		<th>Accepted Values/Type</th>\n' +
    '	</tr>\n' +
    '	</thead>\n' +
    '	<tbody>\n' +
    '	<tr>\n' +
    '		<td>id</td>\n' +
    '		<td>The unique id appended to the table</td>\n' +
    '		<td>true</td>\n' +
    '		<td>gridGuid1000</td>\n' +
    '		<td>string</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>data</td>\n' +
    '		<td>The JSON object to populate table body</td>\n' +
    '		<td>true</td>\n' +
    '		<td>none</td>\n' +
    '		<td>object</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>options</td>\n' +
    '		<td>The JSON object to initialize table and populate table head. *Must include a <em>colModel</em> object*</td>\n' +
    '		<td>true</td>\n' +
    '		<td>x1UiGridDefaults</td>\n' +
    '		<td>object</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>display-mode</td>\n' +
    '		<td>A means to limit the number of displayed columns</td>\n' +
    '		<td>false</td>\n' +
    '		<td>&quot;report&quot;</td>\n' +
    '		<td>string: &quot;small&quot; or &quot;full&quot;</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>resize-events</td>\n' +
    '		<td>An array of broadcasted events that trigger grid resize</td>\n' +
    '		<td>false</td>\n' +
    '		<td>none</td>\n' +
    '		<td>array</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>hierarchy</td>\n' +
    '		<td>Change grid view type to hierarchy</td>\n' +
    '		<td>false</td>\n' +
    '		<td>none</td>\n' +
    '		<td>number of levels</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>isReorderValid</td>\n' +
    '		<td>Optional validation function to prevent reorder columns on specific positions</td>\n' +
    '		<td>false</td>\n' +
    '		<td>none</td>\n' +
    '		<td>custom boolean function with newColModel param</td>\n' +
    '	</tr>\n' +
    '	</tbody>\n' +
    '</table>\n' +
    '\n' +
    '<h3>Default options</h3>\n' +
    '<div class="highlight"><pre><code class="language-javascript" prism>angular\n' +
    '	.module(&quot;x1.ui.jqgrid&quot;)\n' +
    '	.constant(&quot;x1UiGridDefaults&quot;, {\n' +
    '	autowidth: true,\n' +
    '	cellSize: &quot;lg&quot;,\n' +
    '	forceFit: true,\n' +
    '	headertitles: true,\n' +
    '	datatype: &quot;local&quot;,\n' +
    '	sortorder: &quot;desc&quot;,\n' +
    '	sortable: true,\n' +
    '	deepempty: true,\n' +
    '	sortFirstCol: false,\n' +
    '	loadui: &quot;disable&quot;,\n' +
    '	rowNum: 100,\n' +
    '	scroll: 1,\n' +
    '	maxWidgetColumns: 4,\n' +
    '	useSmarterColumnWidths: false,\n' +
    '	allowFilterGrouping: true,\n' +
    '	showPager: false,\n' +
    '	searchAsYouType: false\n' +
    '	skipOnFlyReload: false\n' +
    '	//set it to true if you don\'t need on fly reload in order to improve perfomance\n' +
    '	});</code></pre></div>\n' +
    '\n' +
    '<h3>Attribute options for &lt;colModel&gt;</h3>\n' +
    '<table class="table table-condensed table-striped">\n' +
    '	<thead>\n' +
    '	<tr>\n' +
    '		<th>Property</th>\n' +
    '		<th>Description</th>\n' +
    '		<th>Required</th>\n' +
    '		<th>Default Value</th>\n' +
    '		<th>Accepted Values/Type</th>\n' +
    '	</tr>\n' +
    '	</thead>\n' +
    '	<tbody>\n' +
    '	<tr>\n' +
    '		<td>sorttype</td>\n' +
    '		<td>Defines the type of the column for appropriate sorting</td>\n' +
    '		<td>false</td>\n' +
    '		<td>text</td>\n' +
    '		<td>integer:int/integer | number:float/number/currency | date:date | string:text | enum:enum/enumcsv | boolean:boolean</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>sortfunc</td>\n' +
    '		<td>A means to pass custom sort function to the grid</td>\n' +
    '		<td>false</td>\n' +
    '		<td>none</td>\n' +
    '		<td>string:"naturalSort" | function: custom function reference</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>preventMultiFilter</td>\n' +
    '		<td>When set, this prevents more than one filter from being set on each column</td>\n' +
    '		<td>No</td>\n' +
    '		<td>false</td>\n' +
    '		<td>boolean</td>\n' +
    '	</tr>\n' +
    '	</tbody>\n' +
    '</table>\n' +
    '\n' +
    '<h3>Events</h3>\n' +
    '<p>Include <code>x1.ui.jqgrid.events</code> in your controller to access the events\n' +
    '	listed below.</p>\n' +
    '<table class="table table-condensed table-striped">\n' +
    '	<thead>\n' +
    '	<tr>\n' +
    '		<th>Event</th>\n' +
    '		<th>Name</th>\n' +
    '		<th>Description</th>\n' +
    '		<th>Arguments (passed into event listeners)</th>\n' +
    '	</tr>\n' +
    '	</thead>\n' +
    '	<tbody>\n' +
    '	<tr>\n' +
    '		<td>[yourJqgridEventsRef].GRID_CELL_SELECT</td>\n' +
    '		<td>"x1.ui.selectGridCell"</td>\n' +
    '		<td>Event that will <code>$scope.$emit</code> and <code>$scope.$broadcast</code>\n' +
    '			after selecting a grid cell.</td>\n' +
    '		<td>Data object from selected cell</td>\n' +
    '	<tr>\n' +
    '	<tr>\n' +
    '		<td>[yourJqgridEventsRef].GRID_CELL_HIGHLIGHT</td>\n' +
    '		<td>"x1.ui.highlightGridCell"</td>\n' +
    '		<td>...</td>\n' +
    '		<td>N/A</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>[yourJqgridEventsRef].GRID_COMPLETE</td>\n' +
    '		<td>"x1.ui.gridComplete"</td>\n' +
    '		<td>Event that will <code>$scope.$emit</code> after the grid component is\n' +
    '			loaded in the DOM.</td>\n' +
    '		<td>Grid ID</td>\n' +
    '	</tr>\n' +
    '	<tr>\n' +
    '		<td>[yourJqgridEventsRef].GRID_COLUMN_SORT</td>\n' +
    '		<td>"x1.ui.gridColumnSort"</td>\n' +
    '		<td>Event that will <code>$scope.$emit</code> after a column sort occurs.</td>\n' +
    '		<td>Column object being sorted</td>\n' +
    '	<tr>\n' +
    '	<tr>\n' +
    '		<td>[yourJqgridEventsRef].GRID_COLUMN_REORDER</td>\n' +
    '		<td>"x1.ui.gridColumnReorder"</td>\n' +
    '		<td>Event that will <code>$scope.$emit</code> after a column reorder occurs.</td>\n' +
    '		<td>Array with reordered indexes</td>\n' +
    '	<tr>\n' +
    '	<tr>\n' +
    '		<td>[yourJqgridEventsRef].GRID_ROW_EDITED</td>\n' +
    '		<td>"x1.ui.gridRowEdited"</td>\n' +
    '		<td>Event that will <code>$scope.$emit</code> after row edits are complete.</td>\n' +
    '		<td>Grid ID and property delta of original and changed object.</td>\n' +
    '	<tr>\n' +
    '	<tr>\n' +
    '		<td>[yourJqgridEventsRef].GRID_TOTAL_ROWS</td>\n' +
    '		<td>"x1.ui.gridTotalRows"</td>\n' +
    '		<td>Event that will <code>$scope.$emit</code> after filter is applied.</td>\n' +
    '		<td>Total number of rows after filtering.</td>\n' +
    '	<tr>\n' +
    '	<tr>\n' +
    '		<td>[yourJqgridEventsRef].GRID_CHANGE_SIZE</td>\n' +
    '		<td>"x1.ui.gridChangeSize"</td>\n' +
    '		<td>Event that should be <code>$scope.$broadcast</code> to the grid in order to change it\'s size to small, medium or large.</td>\n' +
    '		<td>String ("sm", "md" or "lg")</td>\n' +
    '	<tr>\n' +
    '	<tr>\n' +
    '		<td>[yourJqgridEventsRef].GRID_RESET_FILTER</td>\n' +
    '		<td>"x1.ui.gridFilterClearAll"</td>\n' +
    '		<td>Event that should be <code>$scope.$broadcast</code> to the grid in order to clear any filters applied on the grid at once.</td>\n' +
    '		<td>N/A</td>\n' +
    '	<tr>\n' +
    '	<tr>\n' +
    '		<td>[yourJqgridEventsRef].GRID_RESET_SORT</td>\n' +
    '		<td>"x1.ui.gridSortClearAll"</td>\n' +
    '		<td>Event that should be <code>$scope.$broadcast</code> to the grid in order to clear any sorts applied on the grid at once.</td>\n' +
    '		<td>N/A</td>\n' +
    '	<tr>\n' +
    '	<tr>\n' +
    '		<td>[yourJqgridEventsRef].GRID_SEARCH</td>\n' +
    '		<td>"x1.ui.searchGrid"</td>\n' +
    '		<td>Event that should be <code>$scope.$broadcast</code> to the grid in order to search the grid.</td>\n' +
    '		<td>String</td>\n' +
    '	<tr>\n' +
    '	<tr>\n' +
    '		<td>[yourJqgridEventsRef].GRID_CLEAR_SEARCH</td>\n' +
    '		<td>"x1.ui.clearSearchGrid"</td>\n' +
    '		<td>Event that will be <code>$scope.$emit</code> from the grid at which point the search box can be cleared.</td>\n' +
    '		<td>N/A</td>\n' +
    '	<tr>\n' +
    '	</tbody>\n' +
    '</table>\n' +
    '\n' +
    '<h3>Internationalization variables</h3>\n' +
    '<div class="highlight"><pre><code class="language-javascript" prism>{\n' +
    '	&quot;x1UiNgJqgrid&quot;: {\n' +
    '	&quot;AND&quot;: &quot;And&quot;,\n' +
    '	&quot;TOTAL&quot;: &quot;Total&quot;,\n' +
    '	&quot;NO_DATA_TO_DISPLAY&quot;: &quot;No data to display&quot;,\n' +
    '	&quot;VIEW_RECORDS_LABEL&quot;: &quot;Viewing {0} - {1} of {2}&quot;,\n' +
    '	&quot;PAGES_LABEL&quot;: &quot;Page {0} of {1}&quot;,\n' +
    '	&quot;popover&quot;: {\n' +
    '	&quot;ARIA_GBOX&quot;: &quot;Data grid&quot;,\n' +
    '	&quot;ARIA_S_ICO&quot;: &quot;Sort column&quot;,\n' +
    '	&quot;TITLE&quot;: &quot;Column filter&quot;,\n' +
    '	&quot;CLOSE&quot;: &quot;Close popover&quot;,\n' +
    '	&quot;SELECT&quot;: &quot;Select an operation&quot;,\n' +
    '	&quot;INPUT&quot;: &quot;Type a filter&quot;,\n' +
    '	&quot;ADD&quot;: &quot;+ Add another filter&quot;,\n' +
    '	&quot;REMOVE&quot;: &quot;Remove filter&quot;,\n' +
    '	&quot;BTN_APPLY&quot;: &quot;Apply&quot;,\n' +
    '	&quot;BTN_REMOVE&quot;: &quot;Remove&quot;\n' +
    '	}\n' +
    '	}\n' +
    '	}</code></pre></div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.jqgrid');
} catch (e) {
  module = angular.module('x1.ui.jqgrid', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('jqgrid/index.rtl.html',
    '<!DOCTYPE html>\n' +
    '<html ng-app="x1.ui.demo" lang="en">\n' +
    '<head>\n' +
    '	<meta charset="utf-8">\n' +
    '	<title>IBM Commerce | jqGrid Demo</title>\n' +
    '	<link rel="stylesheet" href="vendor/vendor.css">\n' +
    '	<link rel="stylesheet" href="../x1-ui-ng-jqgrid.css">\n' +
    '	<link rel="stylesheet" href="../x1-ui-ng-jqgrid.rtl.css">\n' +
    '	<!--<link rel="stylesheet" href="jqgrid.demo.css">-->\n' +
    '	<!--<link rel="stylesheet" href="jqgrid.demo.rtl.css">-->\n' +
    '</head>\n' +
    '<body dir="rtl">\n' +
    '<section ui-view role="main" class="container"></section>\n' +
    '<script type="text/javascript" src="vendor/vendor.js"></script>\n' +
    '<script type="text/javascript" src="../x1-ui-ng-jqgrid.js"></script>\n' +
    '<script type="text/javascript" src="jqgrid.demo.js"></script>\n' +
    '</body>\n' +
    '</html>\n' +
    '');
}]);
})();
