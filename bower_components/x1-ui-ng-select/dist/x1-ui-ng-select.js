/**
 *
 * Licensed Materials - Property of IBM
 *
 * select.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.select", [
		"pascalprecht.translate",
		"ui.bootstrap.dropdown",
		"x1.ui.utils"
	]);
/**
 *
 * Licensed Materials - Property of IBM
 *
 * select.constant.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.select")
	.constant("x1.ui.select.constant", {
		EVENTS: {
			SELECT_ITEM: "x1.ui.select.select-item",
			CHANGE_SELECTED_ITEMS: "x1.ui.select.change-selected-items",
			OUTSIDE_CLICK: "x1.ui.select.outside-click"
		},
		type: {
			TREE: "tree",
			SINGLE: "single"
		}
	});
/**
 *
 * Licensed Materials - Property of IBM
 *
 * select.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.select")
	.directive("x1Select", ["$document", "$timeout", "x1.ui.select.constant", "x1Utils",
		function($document, $timeout, SelectConstant, x1Utils) {
			"use strict";

			return {
				restrict: "E",
				transclude: true,
				require: "ngModel",
				scope: {
					selectOptions: "=",
					placeholder: "@?",
					size: "@?",
					theme: "@?",
					changeFn: "&?",
					config: "=?"
				},
				templateUrl: function(elem, attr) {
					if (attr.type === "tree") {
						return "select/tree-view/tree-view.html";
					}
					return "select/select.html";
				},
				link: function($scope, element, attrs, ngModel) {
					var selectElement = element[0].querySelector(".dropdown");
					var previousSelectedItem;
					var listOptionsElement;
					var scrollContainers;
					var isOverlapped;
					var isOverlapActive;

					if (!ngModel) {
						return;
					}

					$scope.selectedOptions = $scope.selectedOptions || [];
					$scope.size = $scope.size || "medium";
					$scope.theme = $scope.theme || "default";
					$scope.treeStateHelper = {}; // used for handling bubbling in tree view
					$scope.selectedOption = null;
					$scope.orderByParam = $scope.config && $scope.config.orderBy ? $scope.config.orderBy : "$index";

					// handle single select mode
					$scope.singleSelect = attrs.type === SelectConstant.type.SINGLE;
					/**
					 * in case we want list-options container to overlap other elements
					 * it won't work for tree type
					 * it will work through fixed positioning
					 */
					isOverlapped = $scope.config && $scope.config.overlap && (attrs.type !== SelectConstant.type.TREE);

					initIconUrls($scope.selectOptions);

					function initIconUrls(allOptions) {
						allOptions = allOptions || [];

						for (var i = 0; i < allOptions.length; i++) {
							addBackgroundImage(allOptions[i]);

							if (allOptions[i].groups) {
								initIconUrls(allOptions[i].groups);
							}
						}
					}

					function canAddToSelectedOptions() {
						if (!$scope.config || !$scope.config.maximumSelected){
							return true;
						} else if ($scope.selectedOptions.length < $scope.config.maximumSelected){
							return true;
						} else {
							return false;
						}

					}

					function addBackgroundImage(element) {
						if (element && element.iconUrl) {
							element.iconStyle = {
								"background-image": "url(" + element.iconUrl + ")"
							};
						}
					}

					ngModel.$render = function() {
						var selected = ngModel.$viewValue;
						$scope.treeSelectedItem = ngModel.$viewValue;

						if (selected && Array.isArray(selected) && selected.length > 0) {
							selected = selected.map(function(element) {
								return element.id;
							});
							$scope.selectedOptions = activateOptions(selected);
						} else if (selected && !Array.isArray(selected)) {
							if (attrs.type === SelectConstant.type.TREE) {
								$scope.selectedItem = activateTreeOptions($scope.selectOptions, selected.id);
							} else {
								$scope.selectedOption = activateOptions([selected.id])[0];
							}
						}

						if (!ngModel.$viewValue) {
							$scope.selectedOption = null;
							$scope.selectedOptions.length = 0;
						}
					};

					$scope.canShowInstructionText = function() {
						var showInstructionTextListSize=1;
						if (x1Utils.isDefined($scope, "config.instructionTextAdded")) {
							if (x1Utils.isDefined($scope, "config.maximumSelected")) {
								showInstructionTextListSize = $scope.config.maximumSelected;
							}
							if ($scope.selectOptions.length >= showInstructionTextListSize) {
								return true;
							}
						}
						return false;
					};

					$scope.isItemSelected = function(selectedItem) {
						if ($scope.selectedOptions.length) {
							return $scope.selectedOptions.some(function(item){
								return selectedItem.id === item.id;
							});
						} else {
							return $scope.selectedOption && (selectedItem.id === $scope.selectedOption.id);
						}
					};

					$scope.selectToggle = function(option) {
						if (!$scope.isItemSelected(option)) {
							if (option.single || $scope.singleSelect) {
								$scope.selectedOption = option;
								$scope.selectedOptions = [];
								deactivateAllOptionsExcept(option);
								removeOverlapLogic();
								ngModel.$setViewValue($scope.selectedOption);
								callChangeFunction($scope.selectedOption);
							} else {

								if (canAddToSelectedOptions()){
									$scope.selectedOptions.push(option);
									$scope.selectedOption = null;
								}
								deactivateSingleOptions();
								ngModel.$setViewValue($scope.selectedOptions);
								callChangeFunction($scope.selectedOptions);
							}
						} else if (attrs.type === SelectConstant.type.SINGLE) {
							// hide menu when user click on selected item in single select mode
							removeOverlapLogic();
						} else {
							$scope.deselect(option);
						}
					};

					$scope.toggleOptionsList = function(open) {
						if (!attrs.disabled) {
							if (open) {
								document.addEventListener("click", handleClick, true);
								if ($scope.config && $scope.config.overflow === "auto") {
									setOverflow();
								}
								if (isOverlapped) {
									setOverlapLogic();
								}
							} else {
								document.removeEventListener("click", handleClick, true);
								removeOverlapLogic();
							}
						}
					};

					function handleClick(event) {
						if (element !== event.target && !element[0].contains(event.target)) {
							document.removeEventListener("click", handleClick, true);
							removeOverlapLogic();
						}
					}

					$scope.deselect = function(option) {
						if (option.single || $scope.singleSelect) {
							$scope.selectedOption = null;
							ngModel.$setViewValue($scope.selectedOption);
							callChangeFunction($scope.selectedOption);
						} else {
							   //A user cannot unselect a list item if it is equal to or less than minimumSelected
								if (!x1Utils.isDefined($scope, "config.minimumSelected")||
								(x1Utils.isDefined($scope, "config.minimumSelected") &&
								$scope.selectedOptions.length>$scope.config.minimumSelected)) {
									$scope.selectedOption = null;
									var index = $scope.selectedOptions.indexOf(option);
									if (index !== -1) {
										$scope.selectedOptions.splice(index, 1);
									}
									ngModel.$setViewValue($scope.selectedOptions);
									callChangeFunction($scope.selectedOptions);
							}
						}
					};

					$scope.accessibleDeselect = function($event, option) {
						if ($event && $event.keyCode === 13) {
							$scope.deselect(option);
						} else if ($event && $event.keyCode === 27) {
							$scope.deselect(option);
						}
					};

					function setOverlapLogic() {
						listOptionsElement = element[0].querySelector(".dropdown-menu");
						listOptionsElement.style.position = "fixed";
						scrollContainers = getOverflowedParents(element[0]);
						setInitialPosition();
						toggleHandlers("addEventListener");
						isOverlapActive = true;
					}

					// get all parents with overflow "auto" and "scroll"
					function getOverflowedParents(element) {
						var parent = element.parentElement;
						var properties = ["overflowX", "overflowY"];
						var values = ["auto", "scroll"];
						var result = [];

						searchOverflowedElements(parent);

						return result;

						function searchOverflowedElements(element) {
							var computedStyles = getComputedStyle(element);
							var exist = properties.some(function(item) {
								if (values.indexOf(computedStyles[item]) > -1) {
									return true;
								}
							});
							if (exist) {
								result.push(element);
							}
							if (element.parentElement !== null) {
								searchOverflowedElements(element.parentElement);
							}
						}
					}

					// set initial position when we toggle select
					function setInitialPosition() {
						var selectCoords;
						var parent;
						var parentCoords;
						var overLeft;
						var overRight;
						var overTop;
						var overBottom;
						var scroll;
						var i;
						for (i = 0; i < scrollContainers.length; i++) {
							selectCoords = selectElement.getBoundingClientRect();
							parent = scrollContainers[i];
							parentCoords = parent.getBoundingClientRect();
							scroll = getScrollBarDimensions(parent);
							overLeft = parentCoords.left - selectCoords.left;
							overRight = selectCoords.right - parentCoords.right + scroll.horizontalScroll;
							overTop = parentCoords.top - selectCoords.top;
							overBottom = selectCoords.bottom - parentCoords.bottom + scroll.verticalScroll;
							if (overLeft > 0) {
								parent.scrollLeft -= overLeft;
							} else if (overRight > 0) {
								parent.scrollLeft += overRight;
							}
							if (overTop > 0) {
								parent.scrollTop -= overTop;
							} else if (overBottom > 0) {
								parent.scrollTop += overBottom;
							}
						}
						setStyles();
					}

					// get horizontal and vertical scrollbar dimensions
					function getScrollBarDimensions(element) {
						var elementStyles = getComputedStyle(element);
						var borderLeftRightWidth = parseFloat(elementStyles.borderLeftWidth) +
								parseFloat(elementStyles.borderRightWidth);
						var borderTopBottomWidth = parseFloat(elementStyles.borderTopWidth) +
								parseFloat(elementStyles.borderBottomWidth);
						return {
							horizontalScroll: element.offsetWidth - element.clientWidth - borderLeftRightWidth,
							verticalScroll: element.offsetHeight - element.clientHeight - borderTopBottomWidth
						};
					}

					// set styles for list options container
					function setStyles(reset) {
						var selectCoords;
						var maxHeight;
						if (reset) {
							listOptionsElement.style.width = listOptionsElement.style.left =
								listOptionsElement.style.top = "";
						} else {
							selectCoords = selectElement.getBoundingClientRect();
							listOptionsElement.style.width = selectCoords.width + "px";
							listOptionsElement.style.left = selectCoords.left + "px";
							listOptionsElement.style.top = selectCoords.top + selectCoords.height + "px";
							maxHeight = window.innerHeight - (selectCoords.top + selectCoords.height);
							listOptionsElement.style.height = "";
							if (maxHeight < listOptionsElement.clientHeight) {
								listOptionsElement.style.height = maxHeight + "px";
							}
						}
					}

					// bind or remove event handlers
					function toggleHandlers(toggle) {
						var i;
						if (scrollContainers.length) {
							for (i = 0; i < scrollContainers.length; i++) {
								scrollContainers[i][toggle]("scroll", setPosition);
							}
						}
						window[toggle]("scroll", setPosition);
						window[toggle]("resize", setPosition);
					}

					// set coordinates for fixed positioned list options container
					function setPosition(event) {
						var selectElementCoords = selectElement.getBoundingClientRect();
						var containerCoords;
						var isOverEdge;
						var scroll;
						if (event.currentTarget !== window) {
							// get coordinates of the container
							containerCoords = event.currentTarget.getBoundingClientRect();
							scroll = getScrollBarDimensions(event.currentTarget);
							// detect if the select box is over the edge
							isOverEdge = (selectElementCoords.top + selectElementCoords.height < containerCoords.top) ||
									(selectElementCoords.bottom > containerCoords.bottom - scroll.verticalScroll) ||
									(selectElementCoords.left < containerCoords.left) ||
									(selectElementCoords.right > containerCoords.right - scroll.horizontalScroll);
							// if the select box is out of the container during scroll event -
							// hide list options container by simulating click event (hack for dropdown directive)
							if (isOverEdge) {
								selectElement.parentElement.click();
								setStyles(true);
								toggleHandlers("removeEventListener");
								isOverlapActive = false;
								return;
							}
						}
						setStyles();
					}

					function removeOverlapLogic() {
						if (isOverlapped && isOverlapActive) {
							toggleHandlers("removeEventListener");
							isOverlapActive = false;
						}
					}

					function setOverflow() {
						var overflowParent = findOverflowParent(element[0]);
						var list = element[0].querySelectorAll(".main-control")[0];
						if (!list){
							return;
						}
						var listRect = list.getBoundingClientRect();
						var overflowParentRect = overflowParent.getBoundingClientRect();
						var defaultMargin = 10;
						var scrollHeight = overflowParentRect.bottom - listRect.bottom;

						element[0].classList.add("list-overflow");


						$timeout(function(){
							var list = element[0].querySelectorAll(".list-options")[0];
							var option = list.querySelectorAll(".list-option")[0];
							var optionHeight = option.clientHeight;
							var listHeight = list.clientHeight;
							var expandAtTop = scrollHeight < (optionHeight * 2 + defaultMargin);

							/*
								 if not enough space for showing dropdown composed of two items
								 show it above main block
							*/
							if (expandAtTop) {
								scrollHeight = listRect.top - overflowParentRect.top;
							}

							if(listHeight > scrollHeight) {
								list.style.overflow = "auto";
								list.style.height = Math.max(optionHeight,
										scrollHeight - defaultMargin) + "px";
							}

							if (expandAtTop) {
								list.style.top = -list.offsetHeight + "px";
							}

							element[0].classList.remove("list-overflow");

							$scope.orientationClass = expandAtTop ? "orientation-at-top" : "";

						}, 0, true);
					}

					function deactivateSingleOptions() {
						$scope.selectedOptions = $scope.selectedOptions.filter(function(element) {
							return !element.single;
						});
					}

					function deactivateAllOptionsExcept(option) {
						$scope.selectedOptions = $scope.selectedOptions.filter(function(element) {
							return element !== option;
						});
					}

					function activateOptions(options) {
						if ($scope.selectOptions) {
							return $scope.selectOptions.filter(function(element) {
								if (options.indexOf(element.id) > -1) {
									return element;
								}
							});
						}

						return undefined;
					}

					function callChangeFunction(selectionOption) {
						if (typeof $scope.changeFn === "function") {
							$scope.changeFn({value: selectionOption});
						}
					}

					function activateTreeOptions(allOptions, selectedId) {
						var element;
						var found;
						allOptions = allOptions || [];

						for (var i = 0; i < allOptions.length; i++) {
							element = allOptions[i];

							if (!element.groups) {
								if (element.id === selectedId) {
									previousSelectedItem = element;
									return element;
								}
							} else if (element.groups) {
								found = activateTreeOptions(element.groups, selectedId);

								if (found) {
									return found;
								}
							}
						}
					}

					/**
					 * x1-ui-ng-select | type:tree
					 */
					var type = ($scope.config && $scope.config.actionType) || "click";
					var treeItemOpen = "item-opened";
					var subMenu = "sub-menu";
					var rootTreeNode = "x1-select-tree";
					var listOption = "list-option";

					var key = null; //stores pressed key
					var topLevelListOptions;
					var index = -1; //stores position of menu item starting with "key"
					var handleKeyDown = $scope.config && $scope.config.handleKeyDown;

					$scope.isTreeHoverAction = $scope.config && $scope.config.actionType === "hover";

					function keyDownHandler(event) {
						/* possibly a bug in angular, sometimes event.type click is fired */
						if (event.type !== "keydown") {
							return;
						}

						var ch = String.fromCharCode(event.keyCode || event.which);
						var len;
						var i;

						//handling only keys between A-Z a-z
						if (/^[A-Za-z]$/.test(ch) === false) {
							key = null;
							index = -1;

							return;
						}

						topLevelListOptions = $scope.selectOptions;
						ch = ch.toUpperCase();
						len = topLevelListOptions.length;

						if ( index > -1 && key === ch ) {
							i = index + 1;
							if (i === len) {
								i = 0;
							}
						}
						else {
							index = -1;
							i = 0;
						}

						/* 	search option or series of options that starts with "key"
						 	if find any then search next one starting form the position where last was found
						 */

						function optionsSearch() {
							for (; i < len; i++) {
								var itemName = topLevelListOptions[i].name.toUpperCase();
								if (itemName.charAt(0) === ch) {
									index = i;
									break;
								}
								if (i === len - 1 && key === ch && index > -1) {
									i = -1;
									len = index + 1;
								}
							}
						}
						optionsSearch();
						key = ch;

						/*
							we know position of menu item associated with "key",
							expand menu and sub-menu
						*/
						if (index > -1) {
							showAssociatedMenu(index);
						}
					}

					function showAssociatedMenu(index) {
						//for "tree" type we fly out nested sub-menu
						if (attrs.type === SelectConstant.type.TREE) {
							var el;

							el = element[0].querySelectorAll(".btn-group > .dropdown-menu > .list-option")[index];

							handleOpenMenu(el);
							handleOpenSubMenu(el);
							closePreviousMenu(el);

							var item = topLevelListOptions[index];

							$scope.$emit(SelectConstant.EVENTS.SELECT_ITEM, item, topLevelListOptions);
							$scope.$apply(function() {
								if (item.groups) {
									item.openItems = !item.openItems;
								}
							});
						}
						else if (attrs.type === SelectConstant.type.SINGLE) {
							//for "single" type we select the item and do not collapse menu
							$scope.selectToggle(topLevelListOptions[index], true);
						}
					}

					$scope.$on(SelectConstant.EVENTS.SELECT_ITEM, function(evt, item, siblings) {
						if (!item.groups) {
							if (previousSelectedItem) {
								previousSelectedItem.selected = false;
								previousSelectedItem.sgow = false;
							}
							item.selected = !item.selected;
							$scope.selectedItem = item;
							$scope.$broadcast(SelectConstant.EVENTS.CHANGE_SELECTED_ITEMS, item);
							ngModel.$setViewValue($scope.selectedItem);
							outsideMenuClickHandler({});
							previousSelectedItem = item;
						}
						item.opened = item.groups ? !item.opened: false;
						handleLazyRender(item, siblings);
					});

					function handleLazyRender(item, siblings) {
						siblings.forEach(function(sibling){
							if (sibling === item) {
								return;
							}
							if (sibling.groups) {
								sibling.openItems = false;
								handleLazyRender(item, sibling.groups);
							}
						});
					}

					function outsideMenuClickHandler(evt) {
						index = -1;
						key = null;

						var menuItem = element[0].getElementsByClassName(rootTreeNode)[0];
						if (!menuItem) {
							return;
						}
						if (!element[0].contains(evt.target) || menuItem.contains(evt.target)) {
							$scope.$broadcast(SelectConstant.EVENTS.OUTSIDE_CLICK);
							menuItem.className = menuItem.className.replace(treeItemOpen, "");
							$scope.$evalAsync(function() {
								$scope.treeSelectOpen = false;
							});
						}
					}

					function correctPosition(el) {
						var scrollableElementDimensions;
						var scrollableElement;
						var rightAvailableSpace;
						var leftAvailableSpace;
						var elDimensions;
						var borders;

						var subMenu = el.children[2];
						var subMenuRight;
						if (!subMenu) {
							return;
						}

						subMenu.style.left = "";
						subMenuRight = subMenu.getBoundingClientRect().right;
						elDimensions = el.getBoundingClientRect();
						scrollableElement = getOverflowedParents(element[0])[0];

						if (scrollableElement) {
							scrollableElementDimensions = scrollableElement.getBoundingClientRect();
							borders = {
								left: scrollableElementDimensions.left,
								right: scrollableElementDimensions.right
							};
						} else {
							borders = {
								left: 0,
								right: window.innerWidth
							};
						}

						if (borders.right < subMenuRight + 40) {
							rightAvailableSpace = borders.right - elDimensions.right;
							leftAvailableSpace = elDimensions.left - borders.left;

							if  (leftAvailableSpace < rightAvailableSpace) {
								subMenu.style.width = rightAvailableSpace - 20 + "px";
							} else {
								subMenu.style.left = borders.left - elDimensions.left + "px";
								subMenu.style.width = -borders.left + elDimensions.left + "px";
							}

						}
						subMenu.style.visibility = "visible";
					}

					function toggleClass(el, className) {
						if (el.className.search(className) > -1) {
							el.className = el.className.replace(className, "");
						} else {
							el.className += " " + className;
						}
					}

					function handleOpenMenu(el) {
						if (el.className.search(rootTreeNode) > -1) {
							toggleClass(el, treeItemOpen);
							$scope.$evalAsync(function() {
								$scope.treeSelectOpen = !$scope.treeSelectOpen;
								handleLazyRender(null, $scope.selectOptions);
							});
						}
					}

					function handleOpenSubMenu(el) {
						if (el.className.search(subMenu) > -1) {
							if (el.children[2]) {
								el.children[2].style.visibility = "hidden";
							}
							toggleClass(el, treeItemOpen);
							$timeout(function(){
								correctPosition(el);
							}, 0, false);
						}
					}

					function closePreviousMenu(el) {
						if(!el) {
							return;
						}

						var list = Array.prototype.slice.apply(element[0].getElementsByClassName(listOption));
						list.forEach(function (item){
							if (!item.contains(el)) {
								item.className = item.className.replace(treeItemOpen, "");
							}
						});
					}

					function treeEventsHandler(evt) {
						/*
							css pointer-events: none is not supported in IE10/9
							we emulate this functionality by applying class "not-clickable" on
							elements that have pointer-events: none
						*/
						var el = evt.target;
						while (el.className && el.className.search("not-clickable") > -1) {
							el = el.parentNode || el.parentElement;
						}

						handleOpenMenu(el);
						handleOpenSubMenu(el);
						closePreviousMenu(el);
					}

					$timeout(function() {
						if (attrs.type === SelectConstant.type.TREE && !$scope.isTreeHoverAction) {
							element[0].addEventListener(type, treeEventsHandler, true);
							window.document.addEventListener("click",outsideMenuClickHandler);
							if (handleKeyDown && attrs.type === SelectConstant.type.TREE && !$scope.isTreeHoverAction) {
								element[0].addEventListener("keydown", keyDownHandler, false);
							}
						}
						if (handleKeyDown && !$scope.isTreeHoverAction) {
							element[0].addEventListener("keydown", keyDownHandler, false);
						}
					}, 0, false);

					$scope.$on("$destroy", function() {
						element[0].removeEventListener(type, treeEventsHandler);
						window.document.removeEventListener("click",outsideMenuClickHandler);
						removeOverlapLogic();
					});

					function findOverflowParent(element) {
						var foundElement;

						do {
							foundElement = window.getComputedStyle(element).overflow === "auto";
							if (!foundElement) {
								element = element.parentElement;
							}
							foundElement = foundElement || element === window.document.body;
						} while (!foundElement);

						return element;
					}
				}
			};
		}
	]);

/**
 *
 * Licensed Materials - Property of IBM
 *
 * select-tree.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.select")
	.directive("x1SelectTree", ["RecursionHelper", "x1.ui.select.constant",
		function(RecursionHelper, SelectConstant) {
			"use strict";

			return {
				restrict: "E",
				replace: true,
				templateUrl: "select/tree-view/tree-view-node.html",
				scope: {
					items: "=",
					config: "=",
					parentItem: "=",
					stateHelper: "=",
					selectedItems: "="
				},
				controller: function ($scope) {
					$scope.selectItem = function(item, $event) {
						// if parent item was selected and it's not bubbling event from selected bottom level item,
						// then close other previously opened menu items and open current one
						if (item.groups && !$scope.stateHelper.selectedParent) {
							$event.preventDefault();
							$event.stopPropagation();
							closeAllOpenItems();
							item.openItems = !item.openItems;
						} else {
							// select bottom level item and its parents
							$scope.$emit(SelectConstant.EVENTS.SELECT_ITEM, item, $scope.items);
							if ($scope.parentItem) {
								// used for checking when event bubbles up from child element to parent elements in DOM
								$scope.stateHelper.selectedParent = true;
							}
						}
						// when event bubbles up to top level item - set this prop to false
						if (item.groups && !$scope.parentItem) {
							$scope.stateHelper.selectedParent = false;
						}
					};

					$scope.$on(SelectConstant.EVENTS.CHANGE_SELECTED_ITEMS, function(evt, data){
						$scope.selectedItems = data;
					});

					$scope.$on(SelectConstant.EVENTS.OUTSIDE_CLICK, function(){
						closeAllOpenItems();
					});

					$scope.isItemSelected = function(selectedItem) {
						return !selectedItem.groups && $scope.selectedItems &&
							$scope.selectedItems.id === selectedItem.id;
					};

					function closeAllOpenItems() {
						$scope.items.forEach(function(item) {
							item.openItems = false;
						});
					}
				},
				compile: function(element) {
					// Use the compile function from the RecursionHelper,
					// And return the linking function(s) which it returns
					return RecursionHelper.compile(element);
				}
			};
		}
	]);
angular
	.module("x1.ui.select")
	.factory("RecursionHelper", ["$compile",
		function($compile){
			"use strict";

			return {
				/**
				 * Manually compiles the element, fixing the recursion loop.
				 * @param element
				 * @param [link] A post-link function, or an object with function(s) registered
				 * via pre and post properties.
				 * @returns An object containing the linking functions.
				 */
				compile: function(element, link) {
					// Normalize the link parameter
					if (angular.isFunction(link)) {
						link = { post: link };
					}

					// Break the recursion loop by removing the contents
					var contents = element.contents().remove();
					var compiledContents;

					return {
						pre: (link && link.pre) ? link.pre : null,
						/**
						 * Compiles and re-adds the contents
						 */
						post: function(scope, element){
							// Compile the contents
							if (!compiledContents) {
								compiledContents = $compile(contents);
							}
							// Re-add the compiled contents to the element
							compiledContents(scope, function(clone) {
								element.append(clone);
							});

							// Call the post-linking function, if any
							if (link && link.post) {
								link.post.apply(null, arguments);
							}
						}
					};
				}
			};
		}
	]);
(function(module) {
try {
  module = angular.module('x1.ui.select');
} catch (e) {
  module = angular.module('x1.ui.select', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('select/select.html',
    '<div class="x1-select" ng-class="{\'x1-select-sm\': size===\'small\', \'x1-select-lg\': size===\'large\'}"><ul ng-if="!(selectedOption.single || singleSelect) && (config && config.displayMultiSelectListOnTop)" class="selected-list list-unstyled"><li ng-repeat="selectedOption in selectedOptions track by $index" class="list-option"><span ng-if="selectedOption.icon" class="option-icon glyphicon glyphicon-{{selectedOption.icon}} pull-left"></span> <span ng-if="!selectedOption.icon && selectedOption.iconStyle" class="url-icon pull-left" ng-style="selectedOption.iconStyle"></span> <span class="selected-label">{{selectedOption.name}}</span> <a ng-hide="selectedOptions.length===1" href="" class="close glyphicon glyphicon-xs glyphicon-remove" ng-click="deselect(selectedOption)" ng-keydown="accessibleDeselect($event, selectedOption)" title="{{\'x1UiNgSelect.ARIA.deselect\' | translate}}"><span class="sr-only" translate="x1UiNgSelect.ARIA.deselect"></span></a></li></ul><div role="combobox" class="btn-group" dropdown="" on-toggle="toggleOptionsList(open)" ng-class="{\'btn-group-sm\': size===\'small\', \'btn-group-lg\': size===\'large\'}"><button role="button" type="button" class="btn dropdown-toggle" dropdown-toggle="" ng-class="{\'btn-default\': theme===\'default\', \'btn-secondary\': theme===\'primary\', \'has-help-block\': canShowInstructionText()}"><span ng-if="config.checkArrowsAdded" class="select-placeholder pull-left">{{selectedOptions.length}} {{\'x1UiNgSelect.SELECTED\' | translate}}</span> <em ng-if="!selectedOption" ng-hide="config.checkArrowsAdded" class="select-placeholder pull-left">{{placeholder}}</em> <span ng-if="selectedOption" class="list-option pull-left"><span ng-if="selectedOption.icon" class="option-icon glyphicon glyphicon-{{selectedOption.icon}} pull-left"></span> <span ng-if="!selectedOption.icon && selectedOption.iconStyle" class="url-icon pull-left" ng-style="selectedOption.iconStyle"></span> <span>{{selectedOption.name}}</span></span></button><ul role="listbox" class="dropdown-menu {{orientationClass}}"><li ng-repeat="option in selectOptions | orderBy: orderByParam track by $index" role="option" class="list-option {{option.divider}}" ng-class="{\'active\': isItemSelected(option)}" ng-click="selectToggle(option)" aria-label="{{\'x1UiNgSelect.ARIA.listbox\' | translate}}"><a href=""><div ng-if="config && config.checkArrowsAdded && !option.instructionText" class="checkbox pull-left"><label for="{{option.id}}"><input type="checkbox" ng-checked="isItemSelected(option)" value="{{option.displayName || option.name}}" id="{{option.id}}"> <span></span> <span class="sr-only">{{option.displayName || option.name}}</span></label></div><span ng-if="option.icon" class="option-icon glyphicon glyphicon-{{option.icon}} pull-left"></span> <span ng-if="!option.icon && option.iconStyle" class="url-icon pull-left" ng-style="option.iconStyle"></span> <span ng-if="!option.instructionText" class="option-text" title="{{option.displayName || option.name}}">{{option.displayName || option.name}}</span></a></li></ul><span ng-if="canShowInstructionText()" class="help-block">{{config.instructionTextAdded | translate}}</span></div><ul ng-if="!(selectedOption.single || singleSelect) && !(config && config.displayMultiSelectListOnTop)" class="selected-list list-unstyled"><li ng-repeat="selectedOption in selectedOptions track by $index" class="list-option"><span ng-if="selectedOption.icon" class="option-icon glyphicon glyphicon-{{selectedOption.icon}} pull-left"></span> <span ng-if="!selectedOption.icon && selectedOption.iconStyle" class="url-icon pull-left" ng-style="selectedOption.iconStyle"></span> <span class="selected-label">{{selectedOption.displayName || selectedOption.name}}</span> <a href="" class="close glyphicon glyphicon-xs glyphicon-remove" ng-click="deselect(selectedOption)" ng-keydown="accessibleDeselect($event, selectedOption)" title="{{\'x1UiNgSelect.ARIA.deselect\' | translate}}"><span class="sr-only" translate="x1UiNgSelect.ARIA.deselect"></span></a></li></ul></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.select');
} catch (e) {
  module = angular.module('x1.ui.select', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('select/tree-view/tree-view-node.html',
    '<ul role="listbox" class="dropdown-menu"><li ng-repeat="item in items track by $index" role="option" class="list-option clearfix" ng-class="{\'active\': isItemSelected(item), \'opened\': item.openItems}" ng-click="selectItem(item, $event)" aria-label="{{\'x1UiNgSelect.ARIA.listbox\' | translate}}"><a href="" class="clearfix subnav-link"><span ng-if="item.groups" class="dropdown pull-right" dropdown="" ng-class="{\'open\': item.openItems}"><span class="glyphicon glyphicon-xs glyphicon-chevron-right subnav-link"></span><x1-select-tree ng-if="item.groups && ((config.lazyRender && item.openItems) || !config.lazyRender)" state-helper="stateHelper" selected-items="selectedItems" items="item.groups" parent-item="item" config="config"></x1-select-tree></span> <span class="pull-left item-name" title="{{::(item.displayName || item.name)}}">{{::(item.displayName || item.name)}}</span></a></li></ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.select');
} catch (e) {
  module = angular.module('x1.ui.select', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('select/tree-view/tree-view.html',
    '<div class="x1-select x1-select-tree" ng-class="{\'x1-select-sm\': size===\'small\', \'x1-select-lg\': size===\'large\'}"><div role="combobox" class="btn-group" dropdown="" ng-class="{\'btn-group-sm\': size===\'small\', \'btn-group-lg\': size===\'large\'}"><button role="button" type="button" class="btn dropdown-toggle" dropdown-toggle="" ng-class="{\'btn-default\': theme===\'default\', \'btn-secondary\': theme===\'primary\'}"><em ng-if="!selectedItem" class="select-placeholder pull-left">{{placeholder}}</em> <span ng-if="selectedItem" class="list-option pull-left">{{selectedItem.displayName || selectedItem.name}}</span></button><x1-select-tree selected-items="treeSelectedItem" items="selectOptions" config="config" state-helper="treeStateHelper"></x1-select-tree></div></div>');
}]);
})();
