/**
 *
 * Licensed Materials - Property of IBM
 *
 * x1-ui-ng-jqgrid.js
 *
 * (C) Copyright IBM Corporation 2014-2014 - 2016.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.jqgrid", [
		"ngAria",
		"pascalprecht.translate",
		"x1.ui.popover",
		"x1.ui.select",
		"x1.ui.slider"
	]);

angular
	.module("x1.ui.jqgrid")
	.constant("x1UiGridDefaults", {
		autowidth: true,
		cellSize: "lg",
		forceFit: true,
		headertitles: true,
		datatype: "local",
		sortorder: "desc",
		sortable: true,
		deepempty: true,
		sortFirstCol: false,
		loadui: "disable",
		rowNum: 100,
		scroll: 1,
		maxWidgetColumns: 4,
		useSmarterColumnWidths: false,
		allowFilterGrouping: true,
		showPager: false,
		searchAsYouType: false,
		direction: document.body.dir
		//direction: "rtl" | "ltr" can be used to override browser settings
	})
	.constant("x1.ui.jqgrid.events", {
		GRID_CELL_SELECT: "x1.ui.selectGridCell",
		GRID_CELL_HIGHLIGHT: "x1.ui.highlightGridCell",
		GRID_COMPLETE: "x1.ui.gridComplete",
		GRID_COLUMN_SORT: "x1.ui.gridColumnSort",
		GRID_COLUMN_REORDER: "x1.ui.gridColumnReorder",
        GRID_COLUMN_STATES_CHANGED: "x1.ui.gridColumnStatesChanged",
        GRID_FILTER_CHANGED: "x1.ui.gridFilterChanged",
        GRID_RESET_FILTER: "x1.ui.gridFilterClearAll",
        GRID_RESET_SORT: "x1.ui.gridSortClearAll",
		GRID_ROW_EDITED: "x1.ui.gridRowEdited",
		LOAD_COMPLETE: "x1.ui.loadComplete",
		GRID_ADV_FILTER_CLOSE: "x1.ui.gridCloseColumnFilter",
		GRID_ADV_FILTER_OPEN:"x1.ui.gridOpenColumnFilter",
		GRID_ADV_FILTER_SHOW_TIP: "x1.ui.gridShowColumnTooltip",
		GRID_TOTAL_ROWS: "x1.ui.gridTotalRows",
		GRID_CHANGE_SIZE: "x1.ui.gridChangeSize",
		GRID_SEARCH: "x1.ui.searchGrid",
		GRID_CLEAR_SEARCH: "x1.ui.clearSearchGrid",
		GRID_CLEAR_FILTER: "x1.ui.clearFilterGrid"
	});

angular
	.module("x1.ui.jqgrid")
	.controller("GridCtrl", ["$scope", "x1.ui.jqgrid.events",
		function($scope, gridEvents) {
			"use strict";

			$scope.filters = {
				groupOp: "AND", rules: [], groups: []
			};
			$scope.$on(gridEvents.GRID_RESET_FILTER, function() {
				jQuery.extend(jQuery("#" + $scope.id)[0].p.postData, { filters: "" });
				jQuery("#" + $scope.id).trigger("reloadGrid");
				$scope.$broadcast("apply-filter-reset");
				$scope.$emit(gridEvents.GRID_FILTER_CHANGED, $scope.filters, $scope.id);
			});
			$scope.$on(gridEvents.GRID_RESET_SORT, function() {
				jQuery("#" + $scope.id).jqGrid("setGridParam", {
					sortname: "",
					sortorder: ""
				}).trigger("reloadGrid");
			 	jQuery(".s-ico").hide();
			});
		}
	]);

angular
	.module("x1.ui.jqgrid")
	.directive("x1Grid", [
		"x1UiGridDefaults",
		"x1.ui.jqgrid.events",
		"$translate",
		"grid.service",
		"$compile",
		"$rootScope",
		"x1.ui.popover.events",
		function(x1UiGridDefaults, jqGridEvents, $translate, gridService, $compile, $rootScope, popoverEvents) {
			// "use strict";

			return {
				restrict: "E",
				scope: {
					id: "@",
					data: "=",
					options: "=",
					pivot: "=?",
					displayMode: "=?",
					resizeEvents: "=?",
					hierarchy: "@?",
					isReorderValid: "&?"
				},
				replace: true,
				templateUrl: "jqgrid/grid.html",
				controller: "GridCtrl",
				link: function($scope, element, attrs) {
					this.guid = this.guid || 1000;

					var $tableElem = jQuery(element);
					var idSelector = "#" + $scope.id;
					var parentElem = element.parent()[0];
					var lastSelectedRow;
					var colToSort;
					var firstLoad;
					var currentColModel;

					if ($scope.data && $scope.options) {
						if (!$scope.id || $scope.id === "" || $scope.id === "reportGuid") {
							$tableElem.attr("id", "gridGuid" + this.guid);
							$scope.id = "gridGuid" + this.guid;
							this.guid++;
							idSelector = "#" + $scope.id;
						}
						if ($scope.displayMode && $scope.displayMode === "small") {
							$scope.options.isWidget = true;
						}
						initializeGrid();
					}

					/**
					 * Watch options and data just in case we need to update it again later
					 */
					$scope.$watch("options", function(newVal, oldVal) {
						if (newVal && newVal !== oldVal) {
							if (parseInt($scope.hierarchy) > 0) {
								newVal.subGrid = true;
								gridService.setData($scope.data);
								newVal.subGridRowExpanded = gridService.subGridRowExpanded;
							}
							newVal.optionsModified = true;
							refreshGridOptions(newVal);
						}
					});


					/**
					 * @todo refactor, this is a temp fix
					 * @todo add translation strings
					 */
					function addAccessibilitySupport(tableID) {
						// checkboxes
						//====================
						var cboxHeader = tableID.find("th").has("input[type=checkbox]");
						var cboxHeaderLabel = "Select all rows";
						var cboxCells = tableID.find("td").has("input[type=checkbox]");
						//- header cells
						makeCheckboxesAccessible(cboxHeader.find("input[type=checkbox]"), cboxHeaderLabel);
						//- body cells
						cboxCells.each(function() {
							var rowId = jQuery(this).parent("tr").attr("id");
							var rowLabel = "Row " + rowId + " checkbox";
							makeCheckboxesAccessible(jQuery(this).find("input[type=checkbox]"), rowLabel);
						});

						// roles
						//====================
						var colHeaders = tableID.find("thead th");
						var separatorCells = tableID.find("td.ui-pg-button").has(".ui-separator");
						//- column headers
						colHeaders.each(function() {
							jQuery(this).attr("role", "columnheader");
						});
						//- pagers
						separatorCells.each(function() {
							jQuery(this).attr("role", "separator");
						});

						// aria-labels
						//====================
						var childlessCells = tableID.find("th, td").not(":has(*)");
						//- u kno, that [role=grid] element
						tableID.find("[role=grid]").attr("aria-label", "Data grid");
						//- empty cells
						childlessCells.each(function() {
							if (isCellEmpty(jQuery(this))) {
								jQuery(this).attr("aria-label", "Blank");
							} else {
								jQuery(this).children().each(function() {
									if (isCellEmpty(jQuery(this))) {
										jQuery(this).attr("aria-label", "Blank");
									}
								});
							}
						});
						//- pager container
						tableID.find(".ui-pager-control[role=group]").attr("aria-label", "Data grid pagination");

						// pager form
						//====================
						var pagerInput = tableID.find(".ui-pg-table input.ui-pg-input");
						var pagerInputID = $scope.id + "-pageInput";
						//- check if this is necessary
						if (pagerInput.length && !pagerInput.prev("label").size()) {
							pagerInput
								//- add an id attribute
								.attr("id", pagerInputID)
								//- find text node
								.parent().contents().eq(0)
								//- wrap text node in a label
								.wrap("<label for='" + pagerInputID + "' />");
						}
					}
					/**
					 * @see addAccessibilitySupport()
					 * - add stuff to the dom to make checkboxes accessible
					 */
					function makeCheckboxesAccessible(cboxEl, cboxLabel) {
						//- check if this is necessary
						if (!cboxEl.prev("label").size()) {
							cboxEl
								//- add a title attribute to checkbox
								.attr("title", cboxLabel)
								//- add a role attribute to checkbox
								.attr("role", "checkbox")
								//- add a form label for the checkbox
								.before("<label class='sr-only'>" + cboxLabel + "</label>");
						}
						//- add missing aria-checked attributes
						if (!cboxEl.attr("aria-checked")) {
							if (cboxEl.attr("checked")) {
								cboxEl.attr("aria-checked", "true");
							} else {
								cboxEl.attr("aria-checked", "false");
							}
						}
					}
					/**
					 * @see addAccessibilitySupport()
					 * - returns true if element has whitespace
					 * @return boolean
					 */
					function isCellEmpty(el) {
						return !jQuery.trim(el.html()) || el.html() === "&nbsp;";
					}


					function refreshGridOptions(options) {
						if ($scope.data && $scope.options.colModel && $scope.options.colNames) {
							$scope.setGridOptions(options);
						}
						setTimeout(assureGridUpdate, 0);
					}

					function assureGridUpdate() {
						if ($tableElem && !($tableElem.getGridParam("colModel"))) {
							$scope.setGridOptions($scope.options);
							setTimeout(assureGridUpdate, 0);
						}
					}

					$scope.setGridOptions = function(options) {
						if ($tableElem.getGridParam("colModel")) {
							$tableElem.jqGrid("GridUnload");
							$tableElem = jQuery(idSelector);
						}
						setGridOptions(options);
					};

					/**
					 * Resize the grid when window changes size and resize events are fired
					 */
					var windowResizeEventName = "resize.x1grid" + $scope.$id;
					jQuery(window).bind(windowResizeEventName, function() {
						if ($scope.options) {
							resizeGrid();
						}
					}).trigger(windowResizeEventName);

					if ($scope.resizeEvents) {
						$scope.resizeEvents.forEach(function(event) {
							$scope.$on(event, function() {
								if ($scope.options) {
									resizeGrid();
								}
							});
						});
					}

					/**
					 * Set grid width to parent
					 */
					function resizeGrid() {
						var gboxID = jQuery("#gbox_" + idSelector.substring(1));
						/**
						* If grid is invisible, no need to resize grid.
						*/
						if (!gboxID.is(":visible")) {
							return;
						}
						var parentWidth = jQuery(parentElem).width();
						var gridWidth = gboxID.find(".ui-jqgrid-htable").width();

						if ($scope.options.x1HorizontalScroll) {
							if (parentWidth > gridWidth) {
								if (!$scope.options.autoresizeOnLoad) {
									//Shrink to fit true
									$tableElem.setGridWidth(jQuery(parentElem).width() - 1, true);
								} else {
									//Shrink to fit false
									$tableElem.setGridWidth(jQuery(parentElem).width() - 1, false);
								}
							} else {
								if ($scope.options.autoresizeOnLoad) {
									//Add approximate width of scrollbar
									$tableElem.setGridWidth(gridWidth + 18, false);
								}
							}

							jQuery(parentElem).css("overflow-x", "auto");
						} else if (!$scope.options.x1HorizontalScroll || parentWidth > gridWidth) {
							$tableElem.setGridWidth(jQuery(parentElem).width(), true);
						} else {
							$tableElem.setGridWidth(jQuery(parentElem).width(), false);
						}

						if ($scope.options.resizeHeight) {
							var tableHeader = parentElem.getElementsByClassName("ui-jqgrid-hdiv")[0];
							var tableCaption = parentElem.getElementsByClassName("ui-jqgrid-caption")[0];
							var tableTotal = parentElem.getElementsByClassName("ui-jqgrid-sdiv");
							var tableTotalHeight = (tableTotal.length > 0) ? tableTotal[0].offsetHeight : 0;
							var height = parentElem.offsetHeight - tableCaption.offsetHeight -
								tableHeader.offsetHeight - tableTotalHeight;
							// it resizes only grid table container without header and etc.
							// so it needs to subtract header and caption heights from parent height
							$tableElem.setGridHeight(height, false);
						}
						// to resize grid filter popover according to free space
						$rootScope.$broadcast(popoverEvents.APPLY_PLACEMENT);

						addAccessibilitySupport(gboxID);
					}

					function setGridOptions(options) {

						firstLoad = true;

						extendOptions(options);

						//totalRow is a custom addition to the standard jqGrid options object
						//if appended, our grid will display a fixed total row below the header
						if (options.hasOwnProperty("totalRow") && options.totalRow && !options.footerrow) {
							options.footerrow = true;
							options.userDataOnFooter = true;
							options.userData = options.totalRow;
						}

						setSearchFilter(options);
						setLoadComplete(options);
                        setResizeStop(options);
						setCustomSort(options);
						sortDefaultColumn(options);
						configurePagerOldWay(options);
						bindEvents(options);
						configureSmarterColumnWidths(options);
						hideColumnsBeyondMaxDisplayNumber(options);
						setHorizontalScroll(options);
						configureHorizontalScrollBar(options);
						configurePaging(options);
						sanitizeOptions(options);
						setGridPreferences(options);
						setTreeGridIcons(options);

						//set top-level classes for different sized grids
						$tableElem.parent()
							.addClass("x1-ui-jqgrid")
							.addClass("ui-" + $scope.options.cellSize);

						if (parseInt($scope.hierarchy) > 0) {
							options.data = $scope.data["1"];
							$tableElem.jqGrid(options);
						} else if (options.usePivotTable && $scope.pivot) {
							$tableElem.jqGrid("jqPivot", $scope.data, $scope.pivot, options);
						} else if (options.useGroupedHeaders) {
							options.data = $scope.data;
							$tableElem.jqGrid(options);
							$tableElem.jqGrid("setGroupHeaders", {
								useColSpanStyle: true,
								groupHeaders: $scope.options.groupHeaders
							});
						} else {
							options.data = $scope.data;
							$tableElem.jqGrid(options);
						}

						if (options.hasOwnProperty("totalRow")) {
							insertTotalRowHeader();
						}
						showHorizontalScrollbar(options);
						configAdvanceFilter(options);

						//resize grid to parent
						resizeGrid();

						//set grid classes
						var gboxID = jQuery("#gbox_" + idSelector.substring(1));
						var soptclass = jQuery(".soptclass");
						gboxID
							.attr("role", "region")
							.attr("aria-label", $translate.instant("x1UiNgJqgrid.popover.ARIA_GBOX"));
						//set sort icons to use Peretz glyphs
						jQuery(".s-ico")
							.attr("aria-label", $translate.instant("x1UiNgJqgrid.popover.ARIA_S_ICO"));
						jQuery(".ui-icon-asc")
							.addClass("ui-icon glyphicon glyphicon-arrow-up")
							.removeClass("glyphicon-triangle-top")
							.attr("aria-hidden", "true");
						jQuery(".ui-icon-desc")
							.addClass("ui-icon glyphicon glyphicon-arrow-down")
							.removeClass("glyphicon-triangle-bottom")
							.attr("aria-hidden", "true");
						//set filter icons to use Peretz glyphs
						jQuery(".ui-icon-seek-next")
							.addClass("glyphicon glyphicon-chevron-right")
							.attr("aria-hidden", "true");
						jQuery(".ui-icon-seek-end")
							.addClass("glyphicon glyphicon-chevron-right-double")
							.attr("aria-hidden", "true");
						jQuery(".ui-icon-seek-prev")
							.addClass("glyphicon glyphicon-chevron-left")
							.attr("aria-hidden", "true");
						jQuery(".ui-icon-seek-first")
							.addClass("glyphicon glyphicon-chevron-left-double")
							.attr("aria-hidden", "true");
						soptclass
							.addClass("glyphicon glyphicon-filter")
							.text("");
						jQuery(".ui-icon-plus")
							.addClass("glyphicon glyphicon-chevron-right")
							.attr("aria-hidden", "true");
						jQuery(".ui-icon-minus")
							.addClass("glyphicon glyphicon-chevron-down")
							.attr("aria-hidden", "true");

						if (options.usePager) {
							jQuery(".ui-pg-table")
								.attr("role", "presentation");
						}

						//decorate compare reports
						jQuery("tr.jqg-third-row-header > th").each(function() {
							if (this.id.indexOf("#A") > 0) {
								jQuery(this).addClass("compare-A-header");
							} else if (this.id.indexOf("#B") > 0) {
								jQuery(this).addClass("compare-B-header");
							}
						});
					}

					function setTreeGridIcons(options) {
						if (options.treeGrid) {
							jQuery.jgrid = jQuery.jgrid || {};
							jQuery.jgrid["no_legacy_api"] = true;
							jQuery.jgrid.icons.customGlyph = {
								baseIconSet: "glyph",
								treeGrid: {
									minus: "glyphicon-chevron-down",
									plusLtr: "glyphicon-chevron-right",
									leaf: "dummy-class"
								}
							};

							options.iconSet = "customGlyph";
						}
					}

					function extendOptions(options) {
						//extend default options
						for (var prop in x1UiGridDefaults) {
							if (!options.hasOwnProperty(prop) && x1UiGridDefaults.hasOwnProperty(prop)) {
								options[prop] = x1UiGridDefaults[prop];
							}
						}
					}

					/**
					 * Empty the grid, then add all the columns from $scope.options
					 * and rows from $scope.data
					 */
					function initializeGrid() {
						var options = $scope.options;
						if (!options) {
							return;
						}

						// passing the initial data in on options prevents the need to
						// call setData() on the first load
						setGridOptions(options);

						//keep watching that data!
						$scope.$watch("data", function(newVal, oldVal) {
							if (newVal && newVal !== oldVal) {
								setData();
							}
						});
					}

					function setData() {
						var data = $scope.data;

						if (!data) {
							return;
						}

						$scope.options.data = data;
						if (!$scope.options.skipOnFlyReload) {
							$tableElem.jqGrid("setGridParam", { "data": data }).trigger("reloadGrid");
						}
					}

					function sanitizeOptions(options) {
						for (var i = 0; i < options.colModel.length; i++) {
							if (!options.colModel[i].sorttype) {
								options.colModel[i].sorttype = "text";
							}
						}
					}

					function setSearchFilter(options) {
						if (options.x1Filters && options.colNames && options.colModel) {
							options.viewsortcols = options.viewsortcols || [true, "horizontal", false];
							options.colNames = options.colNames.map(function(columnName, index) {
								//allow individual columns to not use filters
								var currentColFilterType = options.colModel[index].filterType;
								var hideSliderValue = options.colModel[index].hideSlider || false;
								if (currentColFilterType === "NONE") {
									return columnName;
								}

								return columnName +
									"<div ng-controller='GridFilterCtrl' class='x1-filter-div' " +
									"data-grid-id='" + idSelector.substring(1) + "' data-sort-type='" +
									options.colModel[index].sorttype + "' " +
									"data-column-display-name='" + options.colNames[index] + "' " +
									"data-hide-slider='" + hideSliderValue + "' " +
									"data-filter-min='" + options.colModel[index].filterMin + "' " +
									"data-filter-max='" + options.colModel[index].filterMax + "' " +
									"data-format-options='" +
									JSON.stringify(options.colModel[index].formatoptions) + "'>" +
									"<span id='x1-filter-" + options.colModel[index].name +
									"' ng-click='$event.stopPropagation()'" +
									"x1-popover='{placement: \"bottom\", customTitle:\"true\"}' " +
									"content-template='jqgrid/grid-filter/grid-filter.html' " +
									"data-container='body' aria-label='testing123' " +
									"outside-click='true' " +
									"class-name='grid-filter-popover' " +
									(options.scrollableContainer ?
										("scrollable-container='" + options.scrollableContainer + "'") : "") +
									"class='glyphicon glyphicon-filter x1-filter-icon' aria-hidden='true'>" +
									"<span class='badge'></span></span></div>";
							});
						}
					}

					function setLoadComplete(options) {
                        options.loadComplete = function() {
                            if (options.x1Filters) {
                                jQuery(".x1-filter-div").each(function() {
                                    $compile(angular.element(jQuery(this)))($scope);
                                });
                            }

							if (options.postCompileClassName) {
                                jQuery("." + options.postCompileClassName).each(function() {
                                    $compile(angular.element(jQuery(this)))(options.postCompileScope);
                                });
                            }

							if (firstLoad) {
								firstLoad = false;

								if (options.gridPreferences && options.gridPreferences.permutation) {
									//This loadComplete method will be called everytime when filters are changed or
									//columns are sorted, hence this column reordering from grid preferences should be
									//set only on first load, else the permutation will keep getting applied repeatedly
									//resulting in weird column ordering
									jQuery(this).jqGrid("remapColumns", options.gridPreferences.permutation, true);
								}
							}
							if (colToSort) {
								jQuery(idSelector).closest("div.ui-jqgrid-view")
									.find("div.ui-jqgrid-hdiv table.ui-jqgrid-htable tr.ui-jqgrid-labels > " +
									"[id$='" + colToSort + "']").attr("aria-selected", "true");
								colToSort = null;
							}

							if (options.cmTemplate && options.cmTemplate.hasOwnProperty("sortable")) {
								parentElem.setAttribute("sortable-column", options.cmTemplate.sortable);
							}

							if (options.totalRow) {
								resetTotalRowLabels(options);
							}

							if (options.x1LoadComplete !== undefined) {
								options.x1LoadComplete();
							}
						};
					}

					function setResizeStop(options) {
                        options.resizeStop = function(newwidth, index) {
                            var colModel = jQuery(idSelector).jqGrid("getGridParam", "colModel"), colItem, colName;

							if (options.gridPreferences) {
								if (!options.gridPreferences.colStates) {
									options.gridPreferences.colStates = {};
								}
							} else {
								options.gridPreferences = {
									colStates: {}
								};
							}

							var colStates = options.gridPreferences.colStates;

							colItem = colModel[index];
							colName = colItem.name;
							if (colName !== "rn" && colName !== "cb" && colName !== "subgrid") {
								colStates[colName] = {
									width: colItem.width,
									hidden: colItem.hidden,
									autoResizable: false
								};
							}

							colItem.autoResizable = false;

							//This emits information about column width changes and column hidden/visible states,
                            //changes related to other colModel properties could be added to this object
                            $scope.$emit(jqGridEvents.GRID_COLUMN_STATES_CHANGED, colStates, $scope.id);
                        };
                    }

					function setGridPreferences(options) {
                        var gridPreferences = options.gridPreferences;

                        if (gridPreferences) {
							if (gridPreferences.colStates) {
                                var colItem, i, l = options.colModel.length, colStates, colName;
                                colStates = gridPreferences.colStates;
                                for (i = 0; i < l; i++) {
                                    colItem = options.colModel[i];
                                    colName = colItem.name;
                                    if (colName !== "rn" && colName !== "cb" && colName !== "subgrid" && colStates
									[colName]) {
                                        options.colModel[i] = jQuery.extend(true, {}, options.colModel[i],
											colStates[colName]);
                                    }
                                }
                            }

							if (gridPreferences.sortname) {
                                options.sortname = colToSort = gridPreferences.sortname;
                            }

							if (gridPreferences.sortorder) {
                                options.sortorder = gridPreferences.sortorder;
                            }

							if (gridPreferences.filters) {
                                options.search = true;
                                options.postData = { filters: gridPreferences.filters };
                            } else {
								resetFilters(options);
							}
                        } else {
							resetFilters(options);
						}
                    }

					function resetFilters(options) {
						if (options && options.postData) {
							options.search = false;
							options.postData.filters = null;
							$scope.filters = { groupOp: "AND", rules: [], groups: []};
						}
					}

					function setCustomSort(options) {
						if (options && options.colModel) {
							for (var i = 0; i < options.colModel.length; i++) {
								if (typeof options.colModel[i].sortfunc === "string" &&
									options.colModel[i].sortfunc === "naturalSort"){
									options.colModel[i].sortfunc = naturalSort;
								}
							}
						}
					}

					function naturalSort (a, b, d){
						if (d === undefined) {
							d = 1;
						}
						return doTheNaturalSort(a, b, d);
					}

					function doTheNaturalSort(a, b, d) {
						var reA = /[^a-zA-Z]/g,
							reN = /[^0-9]/g,
							AInt = parseInt(a, 10),
							BInt = parseInt(b, 10);

						if (isNaN(AInt) && isNaN(BInt)){
							var aA = a.replace(reA, "");
							var bA = b.replace(reA, "");
							if (aA === bA) {
								var aN = parseInt(a.replace(reN, ""), 10);
								var bN = parseInt(b.replace(reN, ""), 10);
								return aN === bN ? 0 : aN > bN ? d : -d;
							} else {
								return aA > bA ? d : -d;
							}
						} else {
							return AInt > BInt ? d : -d;
						}
					}

					function sortDefaultColumn(options) {
						if (options.sortFirstCol) {
							options.sortname = findFirstVisibleColumn(options.colModel).name;
						}
						if (options.sortCol) {
							options.sortname = options.sortCol;
						}
						options.sortorder = options.sortorder || "desc";
						colToSort = options.sortname;
					}

					function configurePaging(options) {
						if (!options.rowNum) {
							options.rowNum = 100;
						}
						if (!options.rowTotal) {
							options.rowTotal = $scope.data.length;
						}

						if (options.hasOwnProperty("useInfiniteScrolling") &&
							options.useInfiniteScrolling) {
							options.scroll = 1;
							options.pager = false;
						} else if (options.hasOwnProperty("usePager") && options.usePager) {
							options.scroll = 0;
							options.pager = true;
							options.viewrecords = true;
							options.emptyRecords = $translate.instant("x1UiNgJqgrid.NO_DATA_TO_DISPLAY");
							options.recordtext = $translate.instant("x1UiNgJqgrid.VIEW_RECORDS_LABEL");
							options.pgtext = $translate.instant("x1UiNgJqgrid.PAGES_LABEL");

							if (!options.rowList) {
								options.rowList = [20, 50, options.rowNum];
							}
						}
					}

					function setHorizontalScroll(options) {
						if (options.x1HorizontalScroll) {
							options.autowidth = true;
							options.shrinkToFit = false;
						}
					}

					function configureHorizontalScrollBar(options) {
						if (options.hasOwnProperty("x1HorizontalScroll") && options.x1HorizontalScroll) {

							options.shrinkToFit = false;
							options.forceFit = true;
							options.scroll = 0;

							for (var i = 0; i < options.colModel.length; i++) {
								options.colModel[i].autoResizable = true;
								options.colModel[i].compact = true;
							}
						}
					}

					function showHorizontalScrollbar(options) {
						if (options.hasOwnProperty("x1HorizontalScroll") && options.x1HorizontalScroll) {
							jQuery("#gbox_" + idSelector.substring(1) + " .ui-jqgrid-bdiv").css("overflow-x", "auto");
						}
					}

					function configAdvanceFilter(options) {
						if (options.hasOwnProperty("advancedFilter") && options.advancedFilter && !options.x1Filters) {
							var filterDef = "<span class='s-filter'><a class='ui-icon-filter'></a></span>";
							var colHeaders = jQuery(idSelector).closest("div.ui-jqgrid-view")
								.find("div.ui-jqgrid-hdiv table.ui-jqgrid-htable tr.ui-jqgrid-labels " +
								"> th.ui-th-column > div.ui-jqgrid-sortable");
							colHeaders.each(function() {
								//jqgh_sessions_list_sessionAttributes.SSV_LOGIN_ID
								var prefixLength = 5 + (idSelector.length - 1) + 1;//jqgh_sessions_list_
								var propName = this.id.substr(prefixLength);//sessionAttributes.SSV_LOGIN_ID
								var colDef = jQuery(idSelector).getColProp(propName);

								if (!colDef || colDef.hideFilter) {
									return;
								}

								var sfilter = jQuery(filterDef);
								var filterIcon = sfilter.find(".ui-icon-filter");

								if (options.disableFilters) {
									filterIcon.addClass("disabled");
								} else {
									filterIcon.removeClass("disabled");
								}

								if (colDef.filters && colDef.filters.length > 0) {
									sfilter.addClass("has-filter");
									sfilter.append("<span class='filter-num'>" + colDef.filters.length + "</span>");
								}

								//manually compile element
								$compile(sfilter)($scope);

								var colHeader = jQuery(this);
								colHeader.append(sfilter);

								//click filter section
								sfilter.click(function(e) {
									e.preventDefault();
									e.stopPropagation();

									if (options.disableFilters) {
										return false;
									}

									if (filterIcon.hasClass("selected")) {
										//unselected
										filterIcon.removeClass("selected");
										$scope.$emit(jqGridEvents.GRID_ADV_FILTER_CLOSE, colDef, e.target);
									} else {
										//selected
										filterIcon.addClass("selected");
										$scope.$emit(jqGridEvents.GRID_ADV_FILTER_OPEN, colDef, e.target);
									}
								});

								//process hover event on column area
								colHeader.hover(function() {
									if (!sfilter.hasClass("has-filter")) {
										filterIcon.addClass("show");
									}
								}, function() {
									if (!sfilter.hasClass("has-filter") && !filterIcon.hasClass("selected")) {
										filterIcon.removeClass("show selected");
									}
								});

								//hover on filter icon
								filterIcon.hover(function(e) {
									if (sfilter.hasClass("has-filter") && !filterIcon.hasClass("selected")) {
										$scope.$emit(jqGridEvents.GRID_ADV_FILTER_SHOW_TIP, colDef, e.target);
									}
								});
							});
						}
					}

					function configureSmarterColumnWidths(options) {
						if (options.hasOwnProperty("useSmarterColumnWidths") && options.useSmarterColumnWidths) {
							for (var i = 0; i < options.colModel.length; i++) {
								var type = options.colModel[i].sorttype;
								if (type === "int" || type === "currency" || type === "float") {
									options.colModel[i].width = "1";
								}
								else {
									//bias text columns to be twice as wide as numeric columns
									options.colModel[i].width = "2";
								}
							}
						}
					}

					function hideColumnsBeyondMaxDisplayNumber(options) {
						if (options.isWidget) {
							var visibleColsCount = 0;
							for (var i = 0; i < options.colModel.length; i++) {
								options.colModel[i].origHidden = options.colModel[i].hidden;

								if (!options.colModel[i].hidden) {
									visibleColsCount++;
								}
								if (visibleColsCount > options.maxWidgetColumns) {
									options.colModel[i].hidden = true;
								}
							}
						} else {
							for (var j = 0; j < options.colModel.length; j++) {
								if (options.colModel[j].hasOwnProperty("origHidden")) {
									options.colModel[j].hidden = options.colModel[j].origHidden;
								}
							}
						}
					}

					function configurePagerOldWay(options) {
						if (options.hasOwnProperty("showPager") && options.showPager && !options.pager) {
							options.pager = idSelector + "Pager";
							var pagerDiv = jQuery.parseHTML("<div></div>");
							jQuery(pagerDiv).attr("id", options.pager);
							jQuery(pagerDiv).insertAfter($tableElem);
						}
					}

					$scope.$on(jqGridEvents.GRID_CHANGE_SIZE, function(event, size) {
						if (["sm", "md", "lg"].indexOf(size) > -1 && $scope.options.cellSize !== size) {
							jQuery("#gbox_" + idSelector.substring(1))
								.parent()
								.removeClass("ui-" + $scope.options.cellSize)
								.addClass("ui-" + size);
							$scope.options.cellSize = size;
							//When changing grid size just auto resizing the columns is enough and
							//we don't have to reload the grid
							//But if auto resizing does not exist in the version of free-jqgrid used
							//then execute reload grid
							if (!$tableElem.triggerHandler("resizeAllColumns")) {
								$tableElem.trigger("reloadGrid");
							}
						}
					});

					$scope.$on(jqGridEvents.GRID_SEARCH, function(event, searchText){
						$scope.$broadcast(jqGridEvents.GRID_CLEAR_FILTER);
						$tableElem[0].p.searchText = searchText;
						$tableElem.trigger("reloadGrid");
					});

					function bindEvents(options) {

						if (options.hasOwnProperty("totalRow")) {

							$tableElem.bind("jqGridGridComplete", function fixTotalRow() {
								var totalRows;
								if (options.treeGrid) {
									$tableElem.jqGrid("footerData", "set", options.totalRow);
									totalRows = getHierarchyTotalRows($scope.data);
								} else {
									totalRows = $tableElem.jqGrid("getGridParam", "lastSelectedData").length;
								}
								var $headerRow = jQuery(parentElem).find("div.ui-jqgrid-hdiv");
								var $footerRow = jQuery(parentElem).find("div.ui-jqgrid-sdiv");
								$footerRow.insertAfter($headerRow);
								resizeGrid();

                                $scope.$emit(jqGridEvents.GRID_TOTAL_ROWS, totalRows);
							});
						}

						if (options.hasOwnProperty("allowInlineEditing") && options.allowInlineEditing) {
							$tableElem.bind("jqGridSelectRow", function(event, rowId) {
								if (rowId && rowId !== lastSelectedRow) {
									jQuery(idSelector).jqGrid("restoreRow", lastSelectedRow);
									jQuery(idSelector).jqGrid("editRow", rowId, true);
									lastSelectedRow = rowId;
								}
							});
						}

						$tableElem.bind("jqGridInlineAfterSaveRow", function(event, rowId, enabled, edits) {
							$scope.$emit(jqGridEvents.GRID_ROW_EDITED, { gridId: $scope.id, changes: edits });
						});

						$tableElem.bind("jqGridGridComplete", function() {
							setTimeout(resizeGrid, 0);
							$scope.$emit(jqGridEvents.GRID_COMPLETE, { gridId: $scope.id });
						});

						$tableElem.bind("jqGridAutoResizeOnLoadComplete", function() {
							setTimeout(resizeGrid, 0);
						});

						$tableElem.bind("jqGridAfterCollapseRow", function(){
							resetTotalRowLabels($scope.options);
						});

						$tableElem.bind("jqGridSortCol", function(event, colIndexName, colIndexNumber, sortOrder) {
							$scope.$emit(jqGridEvents.GRID_COLUMN_SORT,
								{
									id: colIndexName,
									index: colIndexNumber,
									sort: sortOrder,
									gridId: $scope.id
								});
						});

						$tableElem.bind("jqGridRemapColumns", function(event, permutation, updateCells, keepHeaders) {
							var newColModel;
							if (!keepHeaders) {
								currentColModel = getColNamesOrder();
								return;
							}
							newColModel = getColNamesOrder();
							if (attrs.isReorderValid && !$scope.isReorderValid({ "newColModel": newColModel })) {
								if (!currentColModel) {
									currentColModel = getColNamesOrder(true);
								}
								jQuery(this).jqGrid("remapColumnsByName", currentColModel, true);
							} else {
								currentColModel = newColModel;
								if (options.hasOwnProperty("totalRow") && options.sortable) {
									resetTotalRowLabels(options);
								}
								$scope.$emit(jqGridEvents.GRID_COLUMN_REORDER,
									{
										newColModel: newColModel,
										gridId: $scope.id
									});
							}
						});

						//emit an event that can be picked up by reports
						// to link to charts, etc. Broadcast the event so that child components can react also.
						$tableElem.bind("jqGridCellSelect", function(event, rowId, iCol, cellContents) {

							$scope.$emit(jqGridEvents.GRID_CELL_SELECT,
								{
									row: rowId,
									col: iCol,
									contents: cellContents,
									column: $tableElem.getGridParam("colModel")[iCol].name,
									gridId: $scope.id
								});
							$scope.$broadcast(jqGridEvents.GRID_CELL_SELECT,
								{
									row: rowId,
									col: iCol,
									contents: cellContents,
									column: $tableElem.getGridParam("colModel")[iCol].name,
									gridId: $scope.id
								});
						});

					}

					function getColNamesOrder(isDefault) {
						var order;
						if (isDefault) {
							order = $scope.options.colModel.map(function(item) {
								return item.name;
							});
						} else {
							order = jQuery(idSelector).jqGrid("getGridParam", "colModel").map(function(item) {
								return item.name;
							});
						}
						return order;
					}

					function insertTotalRowHeader(colModel) {
						var colToChange = findRowForTotal(colModel);
						if (!colToChange || !colToChange.name) {
							return;
						}
						var colName = colToChange.name;
						var newColHeader = {};
						$translate("x1UiNgJqgrid.TOTAL").then(function(text) {
							newColHeader[colName] = text;
							$tableElem.jqGrid("footerData", "set", newColHeader);
						});
					}

					function findRowForTotal(colModel) {
						colModel = colModel || $tableElem.getGridParam("colModel");
						for (var i = 0; i < colModel.length; i++) {
							if (colModel[i].sorttype === "text" && !colModel[i].hidden) {
								return colModel[i];
							}
						}
						//or at least if we can't find
						return findFirstVisibleColumn(colModel);
					}

					function findFirstVisibleColumn(colModel) {
						colModel = colModel || $tableElem.getGridParam("colModel");
						for (var i = 0; i < colModel.length; i++) {
							if (colModel[i].hidden) {
								continue;
							}
							return colModel[i];
						}
					}

					function resetTotalRowLabels(options) {
						$tableElem.jqGrid("footerData", "set", options.totalRow);
						var colModel = $tableElem.getGridParam("colModel") || options.colModel;
						insertTotalRowHeader(colModel);
					}

					function getHierarchyTotalRows(data) {
						var count = 0;
						data = data || [];

						data.forEach(function(item) {
							if (item.level === 1) {
								count += 1;
							}
						});

						return count;

					}

					$scope.$on("$destroy", function() {
						$tableElem.jqGrid("GridDestroy");
						$tableElem = null;
						jQuery(window).unbind(windowResizeEventName);
					});
				}
			};
		}
	]);

/**
 * This service provides all methods required for converting report data into objects consumable by
 * jqGrid.
 */
angular
	.module("x1.ui.jqgrid")
	.service("grid.service", function() {
		"use strict";

		var subdata;

		this.setData = function(data){
			subdata = data;
		};

		this.subGridRowExpanded = localSubGridExpand;

		function parseGridId(id){
			var res = null;
			if(id.indexOf("_t")>-1){
				var resArray = id.split("t");
				res = resArray[resArray.length-1].substring(1);
			}
			else{
				res = id.substring(id.length-3,id.length);
			}
			return res;
		}

		function localSubGridExpand(subgridId, rowId) {
			var subgridTableId, pagerId;
				rowId = null;
				subgridTableId = subgridId+"_t";
				pagerId = "p_"+subgridTableId;
				jQuery("#"+subgridId).html("<table id='"+subgridTableId+"' class='subgrid' ;'></table>");
				jQuery("#"+subgridTableId).jqGrid({
				datatype: "local",
				subGrid:true,
				gridview:true,
				data: subdata[parseGridId(subgridId)],
				subGridRowExpanded: localSubGridExpand,
				colModel:[
				{name:"id",index:"id",width:100,hidden:true},
				{name:"Name",index:"Name",width:150},
				{name:"MenuId",index:"MenuId",width:100},
				{name:"MenuName",index:"MenuName",width:100}
				],
				rowNum:20,
				pager: pagerId,
				sortname: "num",
				sortorder: "asc"
			});
			jQuery(".ui-jqgrid-bdiv").find(".ui-jqgrid-htable").hide();
		}
});

angular
	.module("x1.ui.jqgrid")
	.constant("GridFilterConstant", {
		numbersFilter: "[^0-9\\.-]",
		decimalDelimiter: "\\.",
		defaultDate: "MM/DD/YYYY",
		datePatterns: {
			ISO8601Long:"YYYY-MM-DDThh:mm:ss",
			ISO8601Short:"YYYY-MM-DD",
			ShortDate:"MM/DD/YYYY",
			LongDate:"MMM DD YYYY"
		}
	});

angular
    .module("x1.ui.jqgrid")
    .controller("GridFilterCtrl", [
    	"$scope", "$element", "x1Utils", "GridFilterFactory", "x1.ui.popover.events",
        function($scope, $element, x1Utils, filterFactory, popoverEvents) {
			"use strict";

            $scope.filterObj = {};

            var element = jQuery($element);
            $scope.filterIcon = element.children(".x1-filter-icon");
            $scope.badge = $scope.filterIcon.children(".badge");

            $scope.filterObj.gridId = element.data("grid-id");
            $scope.filterObj.sortType = element.data("sort-type");
            $scope.filterObj.columnDisplayName = element.data("column-display-name");
            $scope.filterObj.filterMin = element.data("filter-min");
            $scope.filterObj.filterMax = element.data("filter-max");
            $scope.filterObj.formatOptions = element.data("format-options");
            $scope.filterObj.hideSlider = element.data("hide-slider");

            //Removing x1-filter- prefix using substring(10) on id to get the column name
            $scope.filterObj.columnName = $scope.filterIcon[0].id.substring(10);

            var thisGrid = jQuery("#" + $scope.filterObj.gridId);

            thisGrid[0].p.colModel.forEach(function(column) {
                if (column.name === $scope.filterObj.columnName) {
                    if (typeof column.filterFormatter === "function") {
                        $scope.filterObj.filterFormatter = column.filterFormatter;
                    } else if (column.filterType === "percentage") {
                        $scope.filterObj.filterFormatter = percentFilterFormatter;
                    }
                    if (typeof column.filterUnFormatter === "function") {
                        $scope.filterObj.filterUnFormatter = column.filterUnFormatter;
                    } else if (column.filterType === "percentage") {
                        $scope.filterObj.filterUnFormatter = percentFilterUnFormatter;
                    }
                }
            });

            if (["enum", "boolean"].indexOf($scope.filterObj.sortType) >= 0) {
                $scope.filterObj.filterEnumValues =
                    filterFactory.getEnumValues($scope.filterObj.columnName, $scope.options.colModel);
            }

            if ($scope.options.gridPreferences && $scope.options.gridPreferences.filters) {
                $scope.filters = $scope.options.gridPreferences.filters;
                var badgeCount = 0;

                for (var i = 0; i < $scope.filters.rules.length; i++) {
                    if ($scope.filters.rules[i].field === $scope.filterObj.columnName) {
                        badgeCount++;
                    }
                }
                if (["enum", "enumcsv"].indexOf($scope.filterObj.sortType) >= 0) {
                    $scope.filters.groups.forEach(function(group) {
                        if (group.groupField === $scope.filterObj.columnName) {
                            badgeCount = group.rules.length;
                        }
                    });
                }

                if (badgeCount > 0) {
                    $scope.badge.html(badgeCount);
                    $scope.filterIcon.addClass("selected");
                }
            }

            $scope.filterObj.range = {
                min: filterFactory.getMin($scope.filterObj, thisGrid),
                max: filterFactory.getMax($scope.filterObj, thisGrid)
            };

            function percentFilterFormatter(cellValue) {
                if (angular.isUndefined(cellValue)) {
                    return;
                }

                if (isNaN(cellValue)) {
                    cellValue = parseInt(cellValue.replace("%", ""), 10);
                }

                return cellValue * 100;
            }

            function percentFilterUnFormatter(cellValue) {
                if (isNaN(cellValue)) {
                    cellValue = parseInt(cellValue.replace("%", ""), 10);
                }

                return cellValue / 100;
            }

            $scope.$on("apply-filter-popover", function() {
                $scope.$broadcast(popoverEvents.APPLY_POPOVER);
            });

            $scope.$on(popoverEvents.CANCEL_POPOVER, function() {
                $scope.filterIcon.removeClass("active");
            });
        }])
    .controller("GridFilterContentCtrl", ["$scope", "$timeout", "x1.ui.popover.events", "x1.ui.jqgrid.events",
        "GridFilterConstant", "x1Utils",
        function($scope, $timeout, popoverEvents, jqGridEvents, GridFilterConstant, x1Utils) {

            initialize($scope.filterObj.sortType);

            $scope.onNumericSelectChange = function(filterOperationId, filterControl) {
                filterControl.connect = getConnectValue(filterOperationId);
            };

            $scope.inputKeyUp = function($event) {
                if ($event.which === 13) {
                    $scope.applyFilter();
                }
            };

            $scope.$on(jqGridEvents.GRID_CLEAR_FILTER, function(){
                var thisGrid = jQuery("#" + $scope.filterObj.gridId);
                jQuery.extend(thisGrid[0].p.postData, { filters: "" });
                if(rulesExist()) {
                    $scope.filters.rules = [];
                }
                if(groupsExist()) {
                    $scope.filters.groups = [];
                }
                $scope.badge.html("");
                $scope.filterIcon.removeClass("selected active");
            });

            $scope.applyFilter = function() {
                var thisGrid = jQuery("#" + $scope.filterObj.gridId);

                deleteRulesForColumn($scope.filters.rules, $scope.filters.groups, $scope.filterObj.columnName);

                var badgeCount = 0;

                $scope.filterControls.forEach(function(filterControl) {
                    var groups = {}, rule;

                    switch (filterControl.filterControlType) {
                        case "ENUM":
                            groups.groupOp = "OR";
                            groups.rules = [];
                            groups.groupField = $scope.filterObj.columnName;

							for (var filterIndex in filterControl.filterData) {
								if (filterIndex) {
									rule = {};
									rule.field = $scope.filterObj.columnName;
									rule.op = "eq";
									rule.data = filterControl.filterData[filterIndex].id;
									groups.rules.push(rule);
									++badgeCount;
								}
							}

                            $scope.filters.groups.push(groups);
                            $scope.badge.html(badgeCount);
                            $scope.filterIcon.addClass("selected");
                            break;
                        case "ENUMCSV":
                            groups.groupOp = "OR";
                            groups.rules = [];
                            groups.groupField = $scope.filterObj.columnName;
                            var filterDataArr = filterControl.filterData.split(",");

							for (var filterStr in filterDataArr) {
								if (filterStr) {
									rule = {};
									rule.field = $scope.filterObj.columnName;
									rule.op = "eq";
									rule.data = filterDataArr[filterStr].trim();
									groups.rules.push(rule);
									++badgeCount;
								}
							}

                            $scope.filters.groups.push(groups);
                            $scope.badge.html(badgeCount);
                            $scope.filterIcon.addClass("selected");
                            break;
                        default:
                            badgeCount = setDefaultFilter(filterControl, badgeCount);
                    }
                });

                if (badgeCount === 0) {
                    $scope.badge.html("");
                    $scope.filterIcon.removeClass("selected active");
                }

                thisGrid[0].p.search = true;

                if (rulesExist() || groupsExist()) {
                    jQuery.extend(thisGrid[0].p.postData, { filters: JSON.stringify($scope.filters) });
                } else {
                    jQuery.extend(thisGrid[0].p.postData, { filters: "" });
                }

                thisGrid[0].p.searchText = "";
                $scope.$emit(jqGridEvents.GRID_CLEAR_SEARCH);

                thisGrid.trigger("reloadGrid");
                $scope.$emit("apply-filter-popover");
                $scope.$emit(jqGridEvents.GRID_FILTER_CHANGED, $scope.filters, $scope.filterObj.gridId);
            };

            function setDefaultFilter(filterControl, badgeCount) {
                if (filterControl.filterOperation && filterControl.filterData.toString() !== "") {
                    if (filterControl.filterControlType === "DATE" &&
                        !moment(filterControl.filterData.toString(), $scope.dateFormat, true).
                            isValid()) {
                        filterControl.validate = false;
                    }
                    if (filterControl.filterControlType === "BOOLEAN") {
                        filterControl.filterData = $scope.booleanFilterValues[filterControl.filterData].id;
                    }
                    if (typeof $scope.filterObj.filterUnFormatter === "function") {
                        filterControl.filterData = $scope.filterObj.
                            filterUnFormatter(filterControl.filterData);
                    }
                    $scope.filters.rules.push({
                        "field": $scope.filterObj.columnName,
                        "op": filterControl.filterOperation.id,
                        "data": filterControl.filterData.toString()
                    });

                    $scope.badge.html(++badgeCount);
                    $scope.filterIcon.addClass("selected");
                }
                return badgeCount;
            }

            function rulesExist() {
                return $scope.filters && $scope.filters.rules && $scope.filters.rules.length > 0;
            }

            function groupsExist() {
                return $scope.filters && $scope.filters.groups && $scope.filters.groups.length > 0;
            }

            $scope.removeFilter = function() {
                var thisGrid = jQuery("#" + $scope.filterObj.gridId);

                deleteRulesForColumn($scope.filters.rules, $scope.filters.groups, $scope.filterObj.columnName);

                initializeFilterPanel();

                $scope.badge.html("");
                $scope.filterIcon.removeClass("selected active");

                thisGrid[0].p.search = true;
                if (rulesExist() || groupsExist()) {
                    jQuery.extend(thisGrid[0].p.postData, { filters: JSON.stringify($scope.filters) });
                } else {
                    jQuery.extend(thisGrid[0].p.postData, { filters: "" });
                }

                thisGrid.trigger("reloadGrid");
                $scope.$emit("apply-filter-popover");
                $scope.$emit(jqGridEvents.GRID_FILTER_CHANGED, $scope.filters, $scope.filterObj.gridId);
            };

            $scope.closePopover = function() {
                $scope.filterIcon.removeClass("active");
            };

            $scope.addFilterControl = function() {
                $scope.filterControls.push({
                    filterOperation: getDefaultFilterOperation($scope.filterObj.sortType),
                    filterData: $scope.filterObj.filterData,
                    filterControlType: $scope.filterObj.filterControlType,
                    connect: $scope.filterObj.connect
                });
                resizeFilterPopover(true);
                setLinkName();
            };

            $scope.removeFilterControl = function(index) {
                $scope.filterControls.splice(index, 1);
                resizeFilterPopover(false);
                setLinkName();
            };

            function setLinkName() {
                if($scope.filterControls.length && !$scope.options.allowFilterGrouping){
                    $scope.linkName = "";
                } else if ($scope.filterControls.length && ["enum", "enumcsv", "boolean"].
                    indexOf($scope.filterObj.sortType) >= 0) {
                    $scope.linkName = "";
                } else {
                    $scope.linkName = !$scope.filterControls.length ?
                        "x1UiNgJqgrid.popover.ADD" : "x1UiNgJqgrid.popover.ADD_ANOTHER";
                }
            }

            function resizeFilterPopover(scrollToBottom) {
                var contentPanel = jQuery(".grid-actions .save-as-panel")[0];
                //When adding filters scrollToBottom will be set to true so that the content panel scrolls to bottom.
                //When removing filters scrollToBottom will be set to false and hence the scroll position of the content
                //panel will be retained.
                var contentPanelScrollTop = scrollToBottom ? contentPanel.scrollHeight : contentPanel.scrollTop;

                $timeout(function() {
                    $scope.$emit(popoverEvents.APPLY_PLACEMENT);
                    //After the popover gets resized on adding/removing filters the content area
                    //was always scrolling back to the top. Below line fixes it.
                    jQuery(contentPanel).scrollTop(contentPanelScrollTop);
                }, 0, false);
            }

            function deleteRulesForColumn(rules, groups, columnName) {
                for (var i = rules.length - 1; i >= 0; i--) {
                    if (rules[i].field === columnName) {
                        rules.splice(i, 1);
                    }
                }
                if (groups) {
                    for (var j = groups.length - 1; j >= 0; j--) {
                        if (groups[j].groupField === columnName) {
                            groups.splice(j, 1);
                        }
                    }
                }
            }

            function initializeFilterPanel() {
                $scope.filterControls = [
                    {
                        filterOperation: getDefaultFilterOperation($scope.filterObj.sortType),
                        filterData: $scope.filterObj.filterData,
                        filterControlType: $scope.filterObj.filterControlType,
                        connect: $scope.filterObj.connect
                    }
                ];
            }

            function getDefaultFilterOperation(sortType) {
                if (["int", "integer", "float", "number", "currency"].indexOf(sortType) >= 0) {
                    return {
                        "id": "ge"
                    };
                } else if (sortType === "date") {
                    return {
                        "id": "eq"
                    };
                } else if (sortType === "enum" || sortType === "enumcsv") {
                    return {
                        "id": "in"
                    };
                }
                else if (sortType === "boolean") {
                    return {
                        "id": "eq"
                    };
                } else {
                    return {
                        "id": "cn"
                    };
                }
            }

            function getConnectValue(filterOperationId) {
                if (filterOperationId) {
                    if (["ge", "gt"].indexOf(filterOperationId) >= 0) {
                        return "upper";
                    } else if (["le", "lt"].indexOf(filterOperationId) >= 0) {
                        return "lower";
                    } else if (["eq", "ne"].indexOf(filterOperationId) >= 0) {
                        return false;
                    } else if (["in"].indexOf(filterOperationId) >= 0) {
                        return false;
                    }
                }
            }

            function initializeByType(sortType) {
                switch (sortType) {
                    case "enum":
                        $scope.operationsList = [
                            {
                                "id": "in",
                                "name": x1Utils.translate("x1UiNgJqgrid.popover.IN"),
                                "single": true
                            }
                        ];
                        $scope.filterObj.filterControlType = "ENUM";
                        $scope.filterObj.filterData = "";
                        $scope.groups = $scope.filterObj.filterEnumValues;
                        $scope.onSelectionChange = function(value) {
                            $scope.selectedValue = value;
                        };
                        break;
                    case "enumcsv":
                        $scope.operationsList = [
                            {
                                "id": "in",
                                "name": x1Utils.translate("x1UiNgJqgrid.popover.IN"),
                                "single": true
                            }
                        ];
                        $scope.filterObj.filterControlType = "ENUMCSV";
                        $scope.filterObj.filterData = "";
                        break;
                    case "boolean":
                        $scope.operationsList = [
                            {
                                "id": "eq",
                                "name": x1Utils.translate("x1UiNgJqgrid.popover.EQUAL_TO"),
                                "single": true
                            }
                        ];
                        $scope.filterObj.filterControlType = "BOOLEAN";
                        $scope.filterObj.filterData = 0;
                        $scope.filterObj.range = {
                            min: [0, 1],
                            max: 1
                        };
                        $scope.booleanFilterValues = $scope.filterObj.filterEnumValues;
                        break;
                    case "date":
                        $scope.operationsList = [
                            {
                                "id": "eq",
                                "name": x1Utils.translate("x1UiNgJqgrid.popover.IS_ON"),
                                "single": true
                            },
                            {
                                "id": "gt",
                                "name": x1Utils.translate("x1UiNgJqgrid.popover.IS_AFTER"),
                                "single": true
                            },
                            {
                                "id": "ge",
                                "name": x1Utils.translate("x1UiNgJqgrid.popover.IS_ON_OR_AFTER"),
                                "single": true
                            },
                            {
                                "id": "lt",
                                "name": x1Utils.translate("x1UiNgJqgrid.popover.IS_BEFORE"),
                                "single": true
                            },
                            {
                                "id": "le",
                                "name": x1Utils.translate("x1UiNgJqgrid.popover.IS_ON_OR_BEFORE"),
                                "single": true
                            },
                            {
                                "id": "ne",
                                "name": x1Utils.translate("x1UiNgJqgrid.popover.IS_NOT_ON"),
                                "single": true,
                                "divider": "divider-up"
                            }
                        ];
                        $scope.filterObj.filterControlType = "DATE";
                        $scope.filterObj.filterData = "";
                        $scope.filterObj.validate = true;
                        break;
                    default:
                        if (["int", "integer", "float", "number", "currency"].indexOf(sortType) >= 0) {
                            $scope.operationsList = [
                                {
                                    "id": "ge",
                                    "name": x1Utils.translate("x1UiNgJqgrid.popover.GREATER_THAN_OR_EQUAL_TO"),
                                    "single": true
                                },
                                {
                                    "id": "gt",
                                    "name": x1Utils.translate("x1UiNgJqgrid.popover.GREATER_THAN"),
                                    "single": true
                                },
                                {
                                    "id": "le",
                                    "name": x1Utils.translate("x1UiNgJqgrid.popover.LESS_THAN_OR_EQUAL_TO"),
                                    "single": true
                                },
                                {
                                    "id": "lt",
                                    "name": x1Utils.translate("x1UiNgJqgrid.popover.LESS_THAN"),
                                    "single": true
                                },
                                {
                                    "id": "eq",
                                    "name": x1Utils.translate("x1UiNgJqgrid.popover.EQUAL_TO"),
                                    "single": true
                                },
                                {
                                    "id": "ne",
                                    "name": x1Utils.translate("x1UiNgJqgrid.popover.NOT_EQUAL_TO"),
                                    "single": true,
                                    "divider": "divider-up"
                                }
                            ];
                            $scope.filterObj.filterControlType = "NUMBER";
                            if (sortType === "int" || sortType === "integer") {
                                $scope.filterObj.filterControlTypePrecision = 0;
                            }
                            else {
                                $scope.filterObj.filterControlTypePrecision = 2;
                            }
                            $scope.filterObj.pips = {
                                mode: "count",
                                values: 1,
                                density: 5
                            };
                            $scope.filterObj.format = {
                                to: function(value) {
                                    if (sortType === "integer" || sortType === "int") {
                                        return parseInt(value);
                                    }
                                    else {
                                        return parseFloat(value).toFixed(2);
                                    }
                                },
                                from: function(value) {
                                    if (sortType === "integer" || sortType === "int") {
                                        return parseInt(value);
                                    }
                                    else {
                                        return parseFloat(value).toFixed(2);
                                    }
                                }
                            };
                            $scope.filterObj.connect = "upper";
                            $scope.filterObj.tooltips = true;
                            $scope.filterObj.filterData = $scope.filterObj.range.min || 0;
                        }
                        else {
                            $scope.operationsList = [
                                {
                                    "id": "cn",
                                    "name": x1Utils.translate("x1UiNgJqgrid.popover.CONTAINS"),
                                    "single": true
                                },
                                {
                                    "id": "bw",
                                    "name": x1Utils.translate("x1UiNgJqgrid.popover.STARTS_WITH"),
                                    "single": true
                                },
                                {
                                    "id": "ew",
                                    "name": x1Utils.translate("x1UiNgJqgrid.popover.ENDS_WITH"),
                                    "single": true
                                },
                                {
                                    "id": "eq",
                                    "name": x1Utils.translate("x1UiNgJqgrid.popover.EXACT_MATCH"),
                                    "single": true
                                },
                                {
                                    "id": "nc",
                                    "name": x1Utils.translate("x1UiNgJqgrid.popover.DOES_NOT_CONTAIN"),
                                    "single": true,
                                    "divider": "divider-up"
                                },
                                {
                                    "id": "bn",
                                    "name": x1Utils.translate("x1UiNgJqgrid.popover.DOES_NOT_START_WITH"),
                                    "single": true
                                },
                                {
                                    "id": "en",
                                    "name": x1Utils.translate("x1UiNgJqgrid.popover.DOES_NOT_END_WITH"),
                                    "single": true
                                },
                                {
                                    "id": "ne",
                                    "name": x1Utils.translate("x1UiNgJqgrid.popover.NOT_EQUAL_TO"),
                                    "single": true
                                }
                            ];
                            $scope.filterObj.filterControlType = "TEXT";
                            $scope.filterObj.filterData = "";
                        }
                }
            }

            function initialize(sortType) {

                $scope.numbersFilter = GridFilterConstant.numbersFilter;
                $scope.decimalDelimiter = GridFilterConstant.decimalDelimiter;
                $scope.dateFormat = GridFilterConstant.datePatterns[$scope.filterObj.formatOptions.newformat]||
                    GridFilterConstant.defaultDate;
                $scope.filterIcon.addClass("active");

                initializeByType(sortType);

                if ($scope.filters.groups.length > 0 && ["enum", "enumcsv"].indexOf(sortType) >= 0) {
                    var enumGroup = false;
                    $scope.filters.groups.forEach(function(group) {
                        if (group.groupField === $scope.filterObj.columnName) {
                            var rules = group.rules, selectedValues;
                            switch (sortType) {
                                case "enum":
                                    selectedValues = [];
                                    rules.forEach(function(rule) {
                                        var objSel = {};
                                        objSel.id = rule.data;
                                        selectedValues.push(objSel);
                                    });
                                    break;
                                case "enumcsv":
                                    selectedValues = "";
                                    rules.forEach(function(rule) {
                                        selectedValues = rule.data + "," + selectedValues;
                                    });
                                    selectedValues = selectedValues.slice(0, -1);
                                    break;
                                default:
                                    initializeFilterPanel();
                            }
                            if (selectedValues.length > 0) {
                                enumGroup = true;
                                var filterControl = {
                                    filterOperation: { id: "in" },
                                    filterData: selectedValues,
                                    filterControlType: $scope.filterObj.filterControlType,
                                    connect: getConnectValue("in")
                                };
                                $scope.filterControls = [];
                                $scope.filterControls.push(filterControl);
                            }
                        }
                    });
                    if (!enumGroup) {
                        initializeFilterPanel();
                    }
                } else if ($scope.filters.rules.length > 0) {
                    var filterExists = false;
                    $scope.filterControls = [];
                    $scope.filters.rules.forEach(function(rule) {
                        if (rule.field === $scope.filterObj.columnName) {
                            filterExists = true;
                            var filterControl = {
                                filterOperation: { id: rule.op },
                                filterData: $scope.filterObj.filterData,
                                filterControlType: $scope.filterObj.filterControlType,
                                connect: getConnectValue(rule.op)
                            };
                            if (typeof $scope.filterObj.filterFormatter === "function") {
                                filterControl.filterData = $scope.filterObj.filterFormatter(rule.data);
                            } else {
                                if ($scope.filterObj.filterControlType === "BOOLEAN") {
                                    var strFilterData = rule.data;
                                    filterControl.filterData = (strFilterData === "1" ||
                                        strFilterData.toLowerCase() === "true" ||
                                        strFilterData.toLowerCase() === "yes");
                                } else if ($scope.filterObj.filterControlType === "DATE"){
                                    filterControl.filterData =  moment(rule.data.toString()).format($scope.dateFormat);
                                } else {
                                    filterControl.filterData = rule.data;
                                }
                            }
                            $scope.filterControls.push(filterControl);
                        }
                    });
                    if (!filterExists) {
                        initializeFilterPanel();
                    }
                } else {
                    initializeFilterPanel();
                }
                setLinkName();
            }
            $scope.$on("apply-filter-reset", function($event) {
                $event.targetScope.filters = {
                    groupOp: "AND", rules: [], groups: []
                };
                $scope.badge.html("");
                $scope.filterIcon.removeClass("selected active");
            });
        }]);

angular
	.module("x1.ui.jqgrid")
    .factory("GridFilterFactory", function() {
    	"use strict";

        var filterFactory = {};

        filterFactory.getEnumValues = function(colName, colModel){
            var resultObj, result = [];
            colModel.forEach(function(column) {
                if (column.name === colName && column.filterOptions !== undefined){
                    column.filterOptions.forEach(function(option) {
                        resultObj = {};
                        resultObj.id = option.value;
                        resultObj.name = option.label;
                        result.push(resultObj);
                    });
                }
            });
            return result;
        };

        filterFactory.getMin = function (filterObj, grid) {
            var min;
            if (!isNaN(filterObj.filterMin)) {
                min = parseFloat(filterObj.filterMin);
            } else {
                min = grid.getCol(filterObj.columnName, false, "min");
            }
            if (typeof filterObj.filterFormatter === "function") {
                return filterObj.filterFormatter(min);
            }
            return min;
        };

        filterFactory.getMax =function getMax(filterObj,grid) {
            var max;
            if (!isNaN(filterObj.filterMax)) {
                max = parseFloat(filterObj.filterMax);
            } else {
                max = grid.getCol(filterObj.columnName, false, "max");
            }
            if (typeof filterObj.filterFormatter === "function") {
                return filterObj.filterFormatter(max);
            }
            return max;
        };

        return filterFactory;
    });

angular
	.module("x1.ui.jqgrid")
	.directive("inputFilter", function () {
		"use strict";

		return {
			require: "ngModel",
			restrict: "A",
			scope: {
				inputFilter: "@?",
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
						deprecatedSymbols = new RegExp(scope.inputFilter, "g");
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
						if (scope.filterPrecision==="0") {
                            if(!isNaN(parseInt(transformedInput))){
                                 transformedInput =parseInt(transformedInput).toFixed(0);
                            }
                            else{
                                transformedInput="";
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

(function(module) {
try {
  module = angular.module('x1.ui.jqgrid');
} catch (e) {
  module = angular.module('x1.ui.jqgrid', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('jqgrid/grid.html',
    '<table></table>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.jqgrid');
} catch (e) {
  module = angular.module('x1.ui.jqgrid', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('jqgrid/grid-filter/grid-filter.html',
    '<section role="region" class="grid-actions" ng-controller="GridFilterContentCtrl">\n' +
    '	<header role="banner" class="popover-header" aria-labelledby="x1GridFilterPopover">\n' +
    '		<h3 id="x1GridFilterPopover" class="popover-title" translate="x1UiNgJqgrid.popover.TITLE"></h3>\n' +
    '		<button type="button" class="close" ng-click="close(); closePopover()"\n' +
    '				aria-label="{{\'x1UiNgPopover.ARIA.CLOSE\' | translate}}"\n' +
    '				title="{{\'x1UiNgPopover.ARIA.CLOSE\' | translate}}"\n' +
    '				ng-class="{\'close-icon-rtl\': isRTL}">\n' +
    '			<span class="sr-only" translate="x1UiNgModal.ARIA.modalClose"></span>\n' +
    '			<span class="glyphicon glyphicon-sm glyphicon-remove" aria-hidden="true"></span>\n' +
    '		</button>\n' +
    '	</header>\n' +
    '    <article role="main" class="save-as-panel">\n' +
    '        <!--ng-repeat through filterControls-->\n' +
    '        <div ng-repeat="filterControl in filterControls track by $index" class="form-group">\n' +
    '            <!--ng-switch by filter type-->\n' +
    '            <div ng-switch ="filterControl.filterControlType" class="form-group">\n' +
    '                <!--ng-switch conditions-->\n' +
    '                <div class="filter-type-text" ng-switch-when="TEXT">\n' +
    '                    <label ng-if="$index !== 0" translate="x1UiNgJqgrid.AND"></label>\n' +
    '                    <label ng-if="$index === 0">{{filterObj.columnDisplayName}}</label>\n' +
    '                    <x1-select ng-model="filterControl.filterOperation" select-options="operationsList" size="large"\n' +
    '                               placeholder="{{\'x1UiNgJqgrid.popover.SELECT\' | translate}}"></x1-select>\n' +
    '                    <label for="filterText" class="sr-only" translate="x1UiNgJqgrid.popover.INPUT"></label>\n' +
    '                    <input type="text" id="filterText" name="filterText" class="form-control"\n' +
    '                           ng-model="filterControl.filterData" ng-keyup="inputKeyUp($event)">\n' +
    '                    <a class="remove-filter" ng-click="removeFilterControl($index)"\n' +
    '                       aria-label="{{\'x1UiNgJqgrid.popover.REMOVE\' | translate}}">\n' +
    '                        <span class="glyphicon glyphicon-xs glyphicon-remove"></span>\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="filter-type-number" ng-switch-when="NUMBER">\n' +
    '                    <label ng-if="$index !== 0" for="filterRange" translate="x1UiNgJqgrid.AND"></label>\n' +
    '                    <label ng-if="$index === 0" for="filterRange">{{filterObj.columnDisplayName}}</label>\n' +
    '                    <x1-slider id="filterRange" ng-model="filterControl.filterData" range="filterObj.range"\n' +
    '                               connect="filterControl.connect" pips="filterObj.pips"\n' +
    '                               tooltips="filterObj.tooltips" format="filterObj.format"\n' +
    '                                ng-if="filterObj.hideSlider !== true"></x1-slider>\n' +
    '                    <div class="row">\n' +
    '                        <div class="col-sm-7">\n' +
    '                            <label for="filterOperation" class="sr-only"></label>\n' +
    '                            <x1-select id="filterOperation" ng-model="filterControl.filterOperation" size="large"\n' +
    '                                       select-options="operationsList" placeholder="{{\'x1UiNgJqgrid.popover.SELECT\' | translate}}"\n' +
    '                                       change-fn="onNumericSelectChange(filterControl.filterOperation.id, filterControl)">\n' +
    '                            </x1-select>\n' +
    '                        </div>\n' +
    '                        <div class="col-sm-4">\n' +
    '                            <label for="filterNum" class="sr-only" translate="x1UiNgJqgrid.popover.INPUT"></label>\n' +
    '                            <input type="text" id="filterNum" name="filterNum" class="form-control text-number"\n' +
    '                                   filter-precision="{{::filterObj.filterControlTypePrecision}}"\n' +
    '                                   ng-model="filterControl.filterData"\n' +
    '                                   ng-keyup="inputKeyUp($event)"\n' +
    '                                   input-filter="{{::numbersFilter}}"\n' +
    '                                   decimal-delimiter="{{::decimalDelimiter}}">\n' +
    '                        </div>\n' +
    '                        <div class="col-sm-1">\n' +
    '                            <a class="remove-filter" ng-click="removeFilterControl($index)"\n' +
    '                               aria-label="{{\'x1UiNgJqgrid.popover.REMOVE\' | translate}}">\n' +
    '                                <span class="glyphicon glyphicon-xs glyphicon-remove"></span>\n' +
    '                            </a>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="filter-type-text"  ng-switch-when="DATE">\n' +
    '                    <label ng-if="$index !== 0" translate="x1UiNgJqgrid.AND"></label>\n' +
    '                    <label ng-if="$index === 0">{{filterObj.columnDisplayName}}</label>\n' +
    '                    <x1-select ng-model="filterControl.filterOperation" select-options="operationsList"\n' +
    '                               placeholder="{{\'x1UiNgJqgrid.popover.SELECT\' | translate}}" size="large">\n' +
    '                    </x1-select>\n' +
    '                    <label for="filterDate" class="sr-only" translate="x1UiNgJqgrid.popover.INPUT"></label>\n' +
    '\n' +
    '                    <input type="text" id="filterDate" name="filterDate" class="form-control"\n' +
    '                           ng-model="filterControl.filterData"\n' +
    '                           ng-keyup="inputKeyUp($event)" />\n' +
    '\n' +
    '                    <label ng-if="filterControl.validate===false">{{\'x1UiNgJqgrid.popover.DATE_VALIDATION_MESSAGE\'| translate }}</label>\n' +
    '\n' +
    '                    <a class="remove-filter" ng-click="removeFilterControl($index)"\n' +
    '                       aria-label="{{\'x1UiNgJqgrid.popover.REMOVE\' | translate}}">\n' +
    '                        <span class="glyphicon glyphicon-xs glyphicon-remove"></span>\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="filter-type-boolean"  ng-switch-when="BOOLEAN">\n' +
    '                    <label ng-if="$index === 0">{{filterObj.columnDisplayName}}</label>\n' +
    '                    <x1-select ng-model="filterControl.filterOperation" select-options="operationsList"\n' +
    '                               placeholder="{{\'x1UiNgJqgrid.popover.SELECT\' | translate}}" size="large">\n' +
    '                    </x1-select>\n' +
    '                    <div class="filter-bool">\n' +
    '                        <span class="pull-left">{{booleanFilterValues[0].name}}</span>\n' +
    '                        <span class="col-sm-7" >\n' +
    '                            <label for="filterBool" class="sr-only" translate="x1UiNgJqgrid.popover.INPUT_SELECT"></label>\n' +
    '                                <x1-slider id="filterBool" ng-model="filterControl.filterData" range="filterObj.range"\n' +
    '                                           connect="lower" class="x1-slider-as-toggle" ng-keyup="inputKeyUp($event)">\n' +
    '                                </x1-slider>\n' +
    '                        </span>\n' +
    '                        <span class="pull-left">{{booleanFilterValues[1].name}}</span>\n' +
    '                    </div>\n' +
    '                    <a class="remove-filter" ng-click="removeFilterControl($index)"\n' +
    '                       aria-label="{{\'x1UiNgJqgrid.popover.REMOVE\' | translate}}">\n' +
    '                        <span class="glyphicon glyphicon-xs glyphicon-remove"></span>\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="filter-type-enum" ng-switch-when="ENUM">\n' +
    '                    <label ng-if="$index === 0">{{filterObj.columnDisplayName}}</label>\n' +
    '                    <x1-select id="filterEnumOp" ng-model="filterControl.filterOperation" select-options="operationsList"\n' +
    '                               placeholder="{{\'x1UiNgJqgrid.popover.SELECT\' | translate}}" size="large">\n' +
    '                    </x1-select>\n' +
    '                    <x1-select id="filterEnum" ng-model="filterControl.filterData" select-options="groups" size="large"\n' +
    '                               config="{ checkArrowsAdded: false, displayMultiSelectListOnTop: true}"\n' +
    '                               placeholder="{{\'x1UiNgJqgrid.popover.ENUM_SELECT\' | translate}} {{filterObj.columnDisplayName}}" change-fn="onSelectionChange(value)">\n' +
    '                    </x1-select>\n' +
    '                    <a class="remove-filter" ng-click="removeFilterControl($index)"\n' +
    '                       aria-label="{{\'x1UiNgJqgrid.popover.REMOVE\' | translate}}">\n' +
    '                        <span class="glyphicon glyphicon-xs glyphicon-remove"></span>\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="filter-type-enum"  ng-switch-when="ENUMCSV">\n' +
    '                    <label ng-if="$index === 0">{{filterObj.columnDisplayName}}</label>\n' +
    '                    <x1-select id="filterEnumCsv" ng-model="filterControl.filterOperation" select-options="operationsList"\n' +
    '                               placeholder="{{\'x1UiNgJqgrid.popover.SELECT\' | translate}}" size="large">\n' +
    '                    </x1-select>\n' +
    '                    <label for="filtertxtArea" class="sr-only" translate="x1UiNgJqgrid.popover.INPUT"></label>\n' +
    '                        <textarea  id="filtertxtArea" type="text" name="filterCSV" class="form-control"\n' +
    '                                   cols="20" rows="5" placeholder="{{\'x1UiNgJqgrid.popover.CSV_ENUM_INPUT\' | translate}}"\n' +
    '                                   ng-model="filterControl.filterData"\n' +
    '                                   ng-keyup="inputKeyUp($event)">\n' +
    '                        </textarea>\n' +
    '                    <a class="remove-filter" ng-click="removeFilterControl($index)"\n' +
    '                       aria-label="{{\'x1UiNgJqgrid.popover.REMOVE\' | translate}}">\n' +
    '                        <span class="glyphicon glyphicon-xs glyphicon-remove"></span>\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="add-filter" ng-hide="options.preventMultiFilter">\n' +
    '            <a ng-click="addFilterControl()" translate="{{linkName}}"></a>\n' +
    '        </div>\n' +
    '    </article>\n' +
    '	<footer role="contentinfo" class="popover-footer text-right">\n' +
    '		<button type="button" class="btn btn-sm btn-primary" ng-click="applyFilter()"\n' +
    '				translate="x1UiNgJqgrid.popover.BTN_APPLY"></button>\n' +
    '		<button type="button" class="btn btn-sm btn-secondary" ng-click="removeFilter()"\n' +
    '				translate="x1UiNgJqgrid.popover.BTN_REMOVE"></button>\n' +
    '	</footer>\n' +
    '</section>');
}]);
})();
