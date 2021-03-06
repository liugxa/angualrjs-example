/**
 *
 * Licensed Materials - Property of IBM
 *
 * tabs.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.tabs", [
		"pascalprecht.translate",
		"ngSanitize",
		"ui.bootstrap.tabs",
		"ui.bootstrap.tpls",
		"ui.bootstrap.dropdown",
		"x1.ui.popover",
		"x1.ui.utils",
		"focus-me"
	]);
/**
 *
 * Licensed Materials - Property of IBM
 *
 * focus-me.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular.module("focus-me", []);
/**
 *
 * Licensed Materials - Property of IBM
 *
 * tab.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */
angular
	.module("x1.ui.tabs")
	.directive("x1Tab", ["x1Utils", function(x1Utils) {
		"use strict";

		return {
			require: "^x1Tabset",
			restrict: "E",
			transclude: true,
			scope: {
				tabId: "@",
				heading: "=",
				hasInfo: "=?",
				selected: "=?",
				isTitleReadOnly: "=?",
				lazyLoad: "=?",
				renderInit: "&?",
				renderComplete: "&?"
			},
			link: function($scope, element, attrs, tabsCtrl) {
				// initiate tabs
				// heading might contain some html
				$scope.heading = x1Utils.sanitizeText($scope.heading);
				tabsCtrl.addPane($scope);

				if ($scope.selected) {
					tabsCtrl.selectTab($scope, $scope.heading.length);
				}

				// save element to scope
				$scope._element = element;

				$scope.$watch("selected", function(selected) {
					if (selected) {
						tabsCtrl.selectTab($scope);
					}
				});

				$scope.$on("$destroy", function() {
					//second parameter defines if it's a "destroy" event
					tabsCtrl.closePane($scope, true);
				});
			},
			templateUrl: function(elem, attr) {
				if (attr.lazyLoad === "true") {
					return "tabs/tab.lazy.html";
				} else {
					return "tabs/tab.html";
				}
			}
		};
	}]);

/**
 *
 * Licensed Materials - Property of IBM
 *
 * tabs.constant.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.tabs")
	.constant("x1.ui.tabs.constant", {
		"EVENTS": {
			"selectInit": "x1.ui.tabs.select.init",
			"selectComplete": "x1.ui.tabs.select.complete",
			"closeInit": "x1.ui.tabs.close.init",
			"closeAll": "x1.ui.tabs.close.all",
			"closeComplete": "x1.ui.tabs.close.complete",
			"addInit": "x1.ui.tabs.add.init",
			"addComplete": "x1.ui.tabs.add.complete",
			"editInit": "x1.ui.tabs.edit.init",
			"editComplete": "x1.ui.tabs.edit.complete"
		},
		"WIDTH_INCREMENT": 30,
		"EDIT_FINISH_KEY_CODE": 13
	});
/**
 *
 * Licensed Materials - Property of IBM
 *
 * tabs.controller.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.tabs")
	.controller("tabsCtrl", [
		"$scope", "$timeout", "$compile", "$element", "$sanitize", "x1Utils",
		"$window", "$document", "x1.ui.tabs.constant", "$translate",
		function($scope, $timeout, $compile, $element, $sanitize,
				 x1Utils, $window, $document, TabsConstant, $translate) {
			"use strict";

			var lastValidTitle = null;
			var disableTabEdit = false;
			var isNewPane = false;
			var newPaneId;

			//close functions
			function ifResize(testFunction, elseFunction, andExpression) {
				var and = (typeof andExpression !== "undefined") ? andExpression : true;
				if ($scope.responsive && and) {
					testFunction();
				} else {
					if (elseFunction) {
						elseFunction();
					} else {
						return false;
					}
				}
			}
			function checkAndCloseEdit() {
				if ($scope.inEdit) {
					$scope.setCaption($scope.inEdit);
				}
			}

			//scope variables
			$scope.editShow = false;
			$scope.isTitleValid = true;
			$scope.inEdit = null;
			$scope.inUpdateResize = null;
			$scope.dropdownShowed = false;
			$scope.panes = [];
			$scope.hiddenPanes = [];
			$scope.windowElement = angular.element($window);
			$scope.documentElement = angular.element($document);
			$translate("x1UiNgTabs.info.INFORMATION_SUMMARY").then(function(titleText) {
				$scope.infoPopover = {
					title: titleText,
					placement: "bottom-left"
				};
			});

			//local variables
			var isEditDirty = false;

			//events and watches
			$scope.$on(TabsConstant.EVENTS.selectInit, function(event, tabId) {
				$scope.selectedTabId = tabId;
				for (var i = $scope.panes.length - 1; i > -1; i -= 1) {
					if ($scope.panes[i].tabId === tabId) {
						$scope.selectPane($scope.panes[i]);
						break;
					}
				}
			});
			$scope.$on(TabsConstant.EVENTS.closeInit, function(event, tabId) {
				for (var i = $scope.panes.length - 1; i > -1; i -= 1) {
					if ($scope.panes[i].tabId === tabId) {
						$scope.closePane($scope.panes[i]);
						break;
					}
				}
			});

			$scope.$on(TabsConstant.EVENTS.closeAll, function(){
				for (var i = $scope.panes.length - 1; i > -1; i -= 1) {
					$scope.closePane($scope.panes[i]);
				}
				for (var j = $scope.hiddenPanes.length - 1; j > -1; j -= 1) {
					$scope.closeHiddenPane($scope.hiddenPanes[j]);
				}
			});

			$scope.$on(TabsConstant.EVENTS.addComplete, function(event, tabId) {
				newPaneId = tabId;
			});

			ifResize(function() {
				var resizeTimer;
				$scope.windowElement.on("resize.tabEvents", function() {
					clearTimeout(resizeTimer);
					resizeTimer = setTimeout(function() {
						$scope.checkUpdateResize();
					}, 255);
				});

				if ($scope.resizeEvents) {
					$scope.resizeEvents.forEach(function(event){
						$scope.$on(event, function() {
							$timeout($scope.checkUpdateResize, 255, false);
						});
					});
				}
			});

			//scope methods
			$scope.getContentWidth = function() {
				return $element.parent()[0].offsetWidth;
			};
			$scope.selectAccessiblePane = function(pane, $event) {
				$scope.$emit(TabsConstant.EVENTS.selectInit, pane);
				if ($event && $event.keyCode === 13) {
					$scope.selectPane(pane);
				}
			};
			$scope.clickPane = function(pane) {
				$scope.$emit(TabsConstant.EVENTS.selectInit, pane);
				$scope.selectPane(pane);
			};
			$scope.selectPane = function(pane, init) {
				if (isPaneHidden(pane.$id)) {
					pane = $scope.selectHiddenPane(pane);
				}
				if (!pane.selected || init) {
					checkAndCloseEdit();
					$scope.hideDropdown();
					angular.forEach($scope.panes, function(pane) {
						pane.selected = false;
					});
					pane.selected = true;
					if(pane.renderInit) {
						pane.renderInit();
					}
					lastValidTitle = pane.heading;
					$timeout(function() {
						if(pane.renderComplete) {
							pane.renderComplete();
						}
						$scope.$emit(TabsConstant.EVENTS.selectComplete, pane);
					}, 0, false);
				}
			};
			$scope.selectHiddenPane = function(hiddenPane) {
				$scope.panes.unshift(hiddenPane);
				for (var i = $scope.hiddenPanes.length - 1; i > -1; i -= 1) {
					if ($scope.hiddenPanes[i].$id === hiddenPane.$id) {
						$scope.hiddenPanes.splice(i, 1);
						break;
					}
				}
				return hiddenPane;
			};

			$scope.editPane = function(pane) {
				if (pane.isTitleReadOnly || !$scope.editable) {
					return;
				}

				if (pane && !pane.editShow) {
					isEditDirty = false;
					$scope.$broadcast("toggleTooltip", false);

					if (!$scope.inEdit) {
						$scope.inEdit = pane;
						$scope.tabEditModel = {heading: pane.heading};
						pane.editShow = true;
						$scope.$emit(TabsConstant.EVENTS.editInit, pane.heading);
					} else {
						$scope.inEdit.editShow = false;
					}
					lastValidTitle = $scope.inEdit.heading;
				}
			};
			$scope.setCaption = function(pane) {
				pane.editShow = false;
				$scope.inEdit = null;
				$scope.$emit(TabsConstant.EVENTS.editComplete, pane);
			};
			$scope.closePane = closePane;
			$scope.closeHiddenPane = function(pane) {
				$scope.$emit(TabsConstant.EVENTS.closeInit, pane);
				for (var i = $scope.hiddenPanes.length - 1; i > -1; i -= 1) {
					if ($scope.hiddenPanes[i].$id === pane.$id) {
						$scope.hiddenPanes.splice(i, 1);
						$scope.$emit(TabsConstant.EVENTS.closeComplete, pane);
						break;
					}
				}
				pane._element.remove();
			};
			$scope.newAccessiblePane = function($event) {
				if ($event && $event.keyCode === 13) {
					$scope.newPane();
				}
			};
			$scope.newPane = function() {
				checkAndCloseEdit();
				isNewPane = true;
				$scope.$emit(TabsConstant.EVENTS.addInit);
			};
			$scope.dropdownToggle = function(open) {
				$scope.dropdownShowed = open;
			};
			$scope.getPanesWidth = function() {
				var combinedWidth = 0;
				var panePadding = 20;

				angular.forEach($element.find("ul").eq(0).children(), function(li) {
					combinedWidth += (li.offsetWidth + panePadding);
				});

				return combinedWidth;
			};
			$scope.moveToHidden = function() {
				$scope.hiddenPanes.unshift($scope.panes.pop());

				if ($scope.hiddenPanes && $scope.hiddenPanes.length > 0) {
					var firstHiddenPane = $scope.hiddenPanes[0];

					if (firstHiddenPane.selected) {
						$scope.selectHiddenPane(firstHiddenPane);
					}
				}
			};
			$scope.moveToPanes = function() {
				$scope.panes.push($scope.hiddenPanes.shift());
			};
			$scope.checkUpdateResize = function() {
				ifResize(function() {
					$scope.inUpdateResize = true;
					$timeout(function() {
						$scope.resizeContent();
						$scope.inUpdateResize = false;
						$scope.hideDropdown();
					});
				}, null, !$scope.inUpdateResize);
			};

			$scope.$watch("tabEditModel.heading", function(newValue, oldValue) {
				if (newValue !== undefined && newValue !== oldValue) {
					(!disableTabEdit) ? $scope.isTitleValid = !!newValue.trim() :
						$scope.tabEditModel.heading = lastValidTitle;
					$scope.$broadcast("toggleTooltip", !$scope.isTitleValid && isEditDirty);
					isEditDirty = true;
				}
			});

			$scope.keyValidation = function(event) {
				if (event.which === TabsConstant.EDIT_FINISH_KEY_CODE) {
					event.preventDefault();
					$scope.finishEditing();
				}
			};

			$scope.finishEditing = function() {
				if ($scope.inEdit) {
					if ($scope.isTitleValid) {
						lastValidTitle = $scope.tabEditModel.heading;
					} else {
						$scope.isTitleValid = true;
					}
					$scope.inEdit.heading = lastValidTitle;
					$scope.setCaption($scope.inEdit);
				}
				$scope.checkUpdateResize();
			};

			$scope.validateResize = function() {
				$scope.$digest();
				return ($scope.getPanesWidth() < $scope.getContentWidth());
			};
			$scope.resizeContent = function() {
				while ($scope.validateResize()) {
					if ($scope.hiddenPanes && $scope.hiddenPanes.length > 0) {
						$scope.moveToPanes($scope.hiddenPanes[$scope.hiddenPanes.length - 1]);
					} else {
						break;
					}
				}
				while (!$scope.validateResize()) {
					if ($scope.panes && $scope.panes.length > 1) {
						$scope.moveToHidden($scope.panes[$scope.panes.length - 1]);
					} else {
						break;
					}
				}
			};
			$scope.hideDropdown = function() {
				ifResize(function() {
					$scope.dropdownShowed = false;
				});
			};

			$scope.$on("$destroy", function(){
				$scope.windowElement.off(".tabEvents");
			});

			//prototype methods
			this.addPane = function(pane) {

				// select created tab
				if(isNewPane) {
					pane.selected = true;
					isNewPane = false;
				}

				if ($scope.hiddenPanes && $scope.hiddenPanes.length > 0) {
					$scope.panes.unshift(pane);
				} else {
					$scope.panes.push(pane);
				}

				if ($scope.selectedTabId) {
					if (pane.tabId === $scope.selectedTabId) {
						$scope.selectPane(pane);
					}
				} else if ($scope.panes.length === 1) {
					$scope.selectedTabId = pane.tabId;
				} else if (pane.selected) {
					$scope.selectedTabId = pane.tabId;
					$scope.selectPane(pane);
				}

				$scope.checkUpdateResize();
				if (newPaneId && newPaneId === pane.tabId) {
					$scope.editPane(pane);
					newPaneId = undefined;
				}
			};
			// function declaration will be hoisted, doing this to increase readability of the code
			function closePane(pane, isDestroyEvent) {
				$scope.$emit(TabsConstant.EVENTS.closeInit, pane);
				checkAndCloseEdit();
				for (var i = $scope.panes.length - 1; i > -1; i -= 1) {
					if ($scope.panes[i].$id === pane.$id) {
						$scope.panes.splice(i, 1);
						$scope.$emit(TabsConstant.EVENTS.closeComplete, pane, isDestroyEvent);
						break;
					}
				}
				pane._element.remove();
				if ($scope.panes && $scope.panes.length > 0) {
					$scope.selectPane($scope.panes[$scope.panes.length - 1]);
				}
			}
			this.closePane = closePane;
			this.selectTab = function(pane, init) {
				$scope.selectPane(pane, init);
				$scope.checkUpdateResize();
			};

			function isPaneHidden(id) {
				var hiddenIdx;
				if ($scope.hiddenPanes.length > 0) {
					for(hiddenIdx in $scope.hiddenPanes) {
						if($scope.hiddenPanes[hiddenIdx].$id === id) {
							return true;
						}
					}
				}
				return false;
			}
		}]);

/**
 *
 * Licensed Materials - Property of IBM
 *
 * tabset.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular.module("x1.ui.tabs")
    .directive("x1Tabset", function() {
		"use strict";

		return {
            restrict: "E",
            transclude: true,
            scope: {
                tabsPosition: "@",
                editable: "=?",
                closable: "=?",
                creatable: "=?",
                responsive: "=?",
                titleMaxLength: "@?",
                resizeEvents: "=?"
            },
            controller: "tabsCtrl",
            templateUrl: "tabs/tabset.html",
            link: function($scope) {
				// initiate default values
				$scope.tabsPosition = $scope.tabsPosition || "top";

                // select first tab if there are no other tabs passed with "selected" property
                $scope.setDefaultSelectedTab = function () {
                    var selected = $scope.panes.some(function (item) {
                        return item.selected;
                    });

                    if (!selected && $scope.panes.length) {
                        $scope.panes[0].selected = true;
                    }
                };
            }
        };
    });
/**
 *
 * Licensed Materials - Property of IBM
 *
 * focus-me.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("focus-me")
	.directive("focusMe", ["$timeout", function($timeout) {
		return {
			restrict: "AC",
			link: function($scope, element, attrs) {
				"use strict";

				//gives element focus
				$scope.$watch(attrs.focusMe, function(value) {
					if (value) {
						$timeout(function() {
							element[0].focus();
						}, 250);
					}
				});
			}
		};
	}]);
(function(module) {
try {
  module = angular.module('x1.ui.tabs');
} catch (e) {
  module = angular.module('x1.ui.tabs', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/tab.html',
    '<ng-transclude ng-show="selected" id="{{tabId}}-panel" role="tabpanel" aria-labelledby="{{tabId}}"></ng-transclude>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.tabs');
} catch (e) {
  module = angular.module('x1.ui.tabs', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/tab.lazy.html',
    '<ng-transclude ng-if="selected" id="{{tabId}}-panel" role="tabpanel" aria-labelledby="{{tabId}}"></ng-transclude>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.tabs');
} catch (e) {
  module = angular.module('x1.ui.tabs', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/tab.popover.html',
    '<p><span class="pull-left" translate="x1UiNgTabs.info.NAME"></span> <span sanitize-text="">{{pane.hasInfo.name}}</span></p><p ng-if="pane.hasInfo.description && pane.hasInfo.description !== \'null\'"><span class="pull-left" translate="x1UiNgTabs.info.DESCRIPTION"></span> <span sanitize-text="">{{pane.hasInfo.description}}</span></p>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.tabs');
} catch (e) {
  module = angular.module('x1.ui.tabs', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/tabset.html',
    '<section ng-if="tabsPosition === \'bottom\'" role="region" aria-label="{{\'x1UiNgTabs.aria.TAB_CONTENT\' | translate}}" class="x1-ui-tabs-content {{tabsPosition}} tab-content" ng-class="{\'invisible\': inUpdateResize}" ng-transclude=""></section><ul class="x1-ui-tabs-list {{tabsPosition}} nav nav-tabs" ng-class="{\'invisible\': inUpdateResize}" role="tablist" aria-label="{{\'x1UiNgTabs.aria.TAB_LIST\' | translate}}"><li ng-repeat="pane in panes track by $index" role="presentation" class="nav-tab" ng-init="$last ? setDefaultSelectedTab() : null" ng-class="{\'active\':pane.selected, \'invalid-title\':!isTitleValid && pane.selected, \'with-info\':pane.hasInfo, \'edit-mode\':pane.editShow, \'closable\':closable}" ng-click="clickPane(pane)" ng-dblclick="editPane(pane)" ng-mouseover="pane.hover=true" ng-mouseleave="pane.hover=false" tab-id="{{pane.tabId}}"><h3><a role="tab" id="{{pane.tabId}}" aria-controls="{{pane.tabId}}-panel" tabindex="0" ng-keydown="selectAccessiblePane(pane, $event)" sanitize-text="" name="{{pane.heading | translate}}">{{pane.heading | translate}}</a></h3><button ng-if="pane.hasInfo && !pane.editShow" role="button" class="info-popover-button btn btn-link" outside-click="true" x1-popover="infoPopover" content-template="tabs/tab.popover.html" data-container="body" class-name="x1-ui-tabs-popover"><span class="sr-only" translate="x1UiNgTabs.INFO_BTN"></span> <span class="glyphicon glyphicon-info-circle" aria-hidden="true"></span></button><button ng-if="closable" ng-show="pane.selected && panes.length > 1 || pane.hover" ng-click="closePane(pane); $event.stopPropagation();" role="button" class="tab-close btn btn-link"><span class="sr-only" translate="x1UiNgTabs.CLOSE_BTN"></span> <span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><form ng-if="editable" ng-show="pane.editShow" class="tab-edit" role="form" aria-labelledby="{{pane.tabId}}-form"><label for="edit-{{pane.tabId}}" id="{{pane.tabId}}-form" class="sr-only" translate="x1UiNgTabs.EDIT_TITLE"></label> <input type="text" sanitize-text="" id="edit-{{pane.tabId}}" name="editTabName" class="form-control input-sm" ng-model="tabEditModel.heading" focus-me="pane.editShow" ng-blur="finishEditing()" ng-keypress="keyValidation($event)" data-trigger="manual" data-toggle="toggleTooltip" data-placement="bottom" data-title="{{\'x1UiNgTabs.EDIT_TITLE\' | translate}}" x1-tooltip="" maxlength="{{titleMaxLength}}"> <button ng-click="finishEditing()" class="btn btn-link" type="submit" value="{{\'x1UiNgTabs.EDIT_BTN\' | translate}}"><span class="sr-only" translate="x1UiNgTabs.EDIT_BTN"></span> <span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button></form></li><li ng-if="responsive && hiddenPanes.length > 0" on-toggle="dropdownToggle(open)" dropdown="" class="nav-tab-hidden dropdown"><span ng-if="!dropdownShowed" class="sr-only" translate="x1UiNgTabs.EXPAND_DD"></span> <span ng-if="dropdownShowed" class="sr-only" translate="x1UiNgTabs.COLLAPSE_DD"></span> <a href="" class="dropdown-toggle glyphicon glyphicon-xs" aria-hidden="true" name="{{\'x1UiNgTabs.TOGGLE_DD\' | translate}}" dropdown-toggle="" aria-haspopup="true" aria-expanded="{{dropdownShowed}}" ng-class="{\'glyphicon-chevron-down\':!dropdownShowed, \'glyphicon-chevron-up\':dropdownShowed}"></a><ul class="dropdown-menu" ng-class="{\'left-align\': panes.length === 1}"><li ng-repeat="hiddenPane in hiddenPanes track by $index" ng-class="{\'closable\':closable}" ng-mouseover="hiddenPane.hover=true" ng-mouseleave="hiddenPane.hover=false"><h3><a ng-click="clickPane(hiddenPane)" name="{{\'hiddenPane.heading\' | translate}}" tabindex="0" ng-keydown="selectAccessiblePane(hiddenPane, $event)" ng-focus="hiddenPane.hover=true" translate="{{hiddenPane.heading}}"></a></h3><button ng-if="closable" ng-show="hiddenPane.hover" ng-blur="hiddenPane.hover=false" ng-click="closeHiddenPane(hiddenPane)" role="button" class="tab-close btn btn-link"><span class="sr-only" translate="x1UiNgTabs.CLOSE_BTN"></span> <span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></li></ul></li><li ng-if="creatable" class="nav-tab-add"><a ng-click="newPane()" name="{{\'x1UiNgTabs.ADD_TAB\' | translate}}" tabindex="0" ng-keydown="newAccessiblePane($event)"><span class="sr-only" translate="x1UiNgTabs.ADD_TAB"></span> <span class="glyphicon glyphicon-xs glyphicon-plus" aria-hidden="true"></span></a></li></ul><section ng-if="tabsPosition === \'top\'" role="region" aria-label="{{\'x1UiNgTabs.aria.TAB_CONTENT\' | translate}}" class="x1-ui-tabs-content {{tabsPosition}} tab-content" ng-transclude=""></section>');
}]);
})();
