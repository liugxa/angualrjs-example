/**
 *
 * Licensed Materials - Property of IBM
 *
 * slider.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.slider", [
		"pascalprecht.translate"
	]);
/**
 *
 * Licensed Materials - Property of IBM
 *
 * slider.constant.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.slider")
	.constant("x1.ui.slider.constant", {
		"events": {

		}
	});
/**
 *
 * Licensed Materials - Property of IBM
 *
 * slider.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.slider")
	.directive("x1Slider", [
		"$timeout",
		function($timeout) {
			return {
				restrict: "EA",
				scope: {
					range: "=",
					step: "@?",
					ngModel: "=?",
					ngFrom: "=?",
					ngTo: "=?",
					pips: "=?",
					direction: "=?",
					orientation: "=?",
					tooltips: "=?",
					connect: "=?",
					snap: "=?",
					behaviour: "=?",
					format: "=?",
					margin: "=?",
					limit: "=?",
					changeFn: "&"
				},
				link: function(scope, element, attrs) {
					var createTooltips, createSlider, createRangeSlider, formatTo, formatFrom;
					var unbindWatchers, ngModelUnbindWatch, ngFromUnbindWatch, ngToUnbindWatch;
					var noUiSlider = window.noUiSlider;
					var slider = element[0];

					// add custom class no matter what
					angular.element(slider).addClass("x1-slider");

					formatTo = function(value) {
						return (scope.format && typeof scope.format.to === "function") ? scope.format.to(value) : value;
					};

					formatFrom = function(value) {
						return (scope.format && typeof scope.format.from === "function") ?
							scope.format.from(value) : value;
					};

					unbindWatchers = function() {
						if (typeof ngModelUnbindWatch === "function") {
							ngModelUnbindWatch();
						}
						if (typeof ngFromUnbindWatch === "function") {
							ngFromUnbindWatch();
						}
						if (typeof ngToUnbindWatch === "function") {
							ngToUnbindWatch();
						}
					};

					scope.$watch("connect", function(newVal, oldVal) {
						if (newVal !== oldVal) {
							slider.noUiSlider.destroy();
							unbindWatchers();

							if (newVal === "lower" || newVal === "upper" || !newVal) {
								createSlider();
							} else {
								createRangeSlider();
							}
						}
					});

					//Creates tooltips on slider handles
					createTooltips = function(tooltipText) {
						var i, tipHandles, tooltips;
						if (scope.tooltips) {
							tipHandles = slider.getElementsByClassName("noUi-handle");
							tooltips = [];
							i = 0;
							while (i < tipHandles.length) {
								tooltips[i] = document.createElement("div");
								tipHandles[i].appendChild(tooltips[i]);
								tooltips[i].className += "x1-slider-tooltip";
								tooltips[i].innerHTML = "<span class='arrow'></span><span></span>";
								tooltips[i] = tooltips[i].getElementsByTagName("span")[1];
								tooltips[i].innerHTML = formatTo(tooltipText[i]);
								i++;
							}
						}
						return tipHandles;
					};

					//Creates slider with one handle
					createSlider = function() {
						var parsedValue, tooltips;
						var toggleOnClass = "toggle-on";
						var toggleOffClass = "toggle-off";
						parsedValue = null;

						noUiSlider.create(slider, {
							start: scope.ngModel || parseFloat(scope.range.min),
							step: scope.step && parseFloat(scope.step),
							connect: scope.connect,
							snap: scope.snap,
							range: scope.range,
							pips: scope.pips,
							direction: scope.direction,
							orientation: scope.orientation,
							behaviour: scope.behaviour,
							format: scope.format,
							margin: scope.margin,
							limit: scope.limit
						});

						if (scope.tooltips) {
							tooltips = createTooltips([scope.ngModel]);
						}

						// add class for slider toggle on init
						if (angular.element(slider).hasClass("x1-slider-as-toggle")) {
							if (parsedValue === 1) {
								angular.element(slider).addClass(toggleOnClass);
							} else {
								angular.element(slider).addClass(toggleOffClass);
							}
						}

						slider.noUiSlider.on("update", function(values, handle) {
							parsedValue = parseFloat(formatFrom(values[0]));

							if (scope.tooltips) {
								tooltips[handle].getElementsByTagName("span")[1].innerHTML = values[0];
							}

							// toggle class for slider toggle on slide
							if (angular.element(slider).hasClass("x1-slider-as-toggle")) {
								if (parsedValue === 1) {
									angular.element(slider).removeClass(toggleOffClass);
									angular.element(slider).addClass(toggleOnClass);
								} else {
									angular.element(slider).removeClass(toggleOnClass);
									angular.element(slider).addClass(toggleOffClass);
								}
							}

							return $timeout(function() {
								scope.$apply(function() {
									scope.ngModel = parsedValue;
									return scope.ngModel;
								});
								callChangeFunction(values, handle);
							});
						});
						ngModelUnbindWatch = scope.$watch("ngModel", function(newVal) {
							if (newVal !== parsedValue) {

								if (scope.tooltips) {
									tooltips[0].getElementsByTagName("span")[1].innerHTML = formatTo(newVal);
								}

								return slider.noUiSlider.set(newVal);
							}
						});
					};

					//Creates range slider with 2 handles
					createRangeSlider = function() {
						var fromParsed = null, toParsed = null, tooltips;
						noUiSlider.create(slider, {
							start: [
								scope.ngFrom || parseFloat(scope.range.min),
								scope.ngTo || parseFloat(scope.range.max)
							],
							step: scope.step && parseFloat(scope.step),
							connect: scope.connect,
							range: scope.range,
							snap: scope.snap,
							pips: scope.pips,
							direction: scope.direction,
							orientation: scope.orientation,
							behaviour: scope.behaviour,
							format: scope.format,
							margin: scope.margin,
							limit: scope.limit
						});
						if (scope.tooltips) {
							tooltips = createTooltips([scope.ngFrom, scope.ngTo]);
						}
						slider.noUiSlider.on("update", function(values, handle) {
							var from = formatFrom(values[0]);
							var to = formatFrom(values[1]);
							fromParsed = parseFloat(from);
							toParsed = parseFloat(to);

							if (scope.tooltips) {
								tooltips[handle].getElementsByTagName("span")[1].innerHTML = values[handle];
							}

							//@todo write code to apply disabled states to handles here

							return $timeout(function() {
								scope.$apply(function() {
									scope.ngFrom = fromParsed;
									scope.ngTo = toParsed;
									return scope.ngTo;
								});
								callChangeFunction(values, handle);
							});
						});
						ngFromUnbindWatch = scope.$watch("ngFrom", function(newVal) {
							if (newVal !== fromParsed) {
								if (scope.tooltips) {
									tooltips[0].getElementsByTagName("span")[1].innerHTML = formatTo(newVal);
								}

								return slider.noUiSlider.set([
									newVal,
									null
								]);
							}
						});
						ngToUnbindWatch = scope.$watch("ngTo", function(newVal) {
							if (newVal !== toParsed) {
								if (scope.tooltips) {
									tooltips[1].getElementsByTagName("span")[1].innerHTML = formatTo(newVal);
								}

								return slider.noUiSlider.set([
									null,
									newVal
								]);
							}
						});
					};

					/*
					 * Add slider to DOM
					 * */
					if (angular.isDefined(scope.ngFrom) && angular.isDefined(scope.ngTo)) {
						createRangeSlider();
					} else {
						createSlider();
					}

					/*
					* Adding keyboard support
					* @todo refactor so it's using a service
					* */
					var handles = angular.element(slider.querySelectorAll(".noUi-handle"));
					for (var i = 0; i < handles.length; i++) {
						handles[i].setAttribute("tabindex", "0");
						addEventListeners(slider, handles[i], i);
					}

					/*
					 * Toggle eventListeners based on disabled state
					 * @todo refactor so it's using a service
					 * */
					attrs.$observe("disabled", function(value) {
						var i;
						if (value) {
							for (i = 0; i < handles.length; i++) {
								handles[i].setAttribute("tabindex", "-1");
								removeEventListeners(slider, handles[i], i);
							}
						} else {
							for (i = 0; i < handles.length; i++) {
								handles[i].setAttribute("tabindex", "0");
								addEventListeners(slider, handles[i], i);
							}
						}
					});

					function addEventListeners(slider, handle, i) {
						handle.addEventListener("click", function() {
							this.focus();
						});
						handle.addEventListener("keydown", function(e) {
							var values;
							var value;

							if (slider.noUiSlider.get().length === 2) {
								values = slider.noUiSlider.get();
								value = Number(formatFrom(values[i]));
								switch (e.which) {
									case 37: setSliderValues(value, i, "-");
										break;
									case 39: setSliderValues(value, i, "+");
										break;
								}
							} else {
								value = Number(formatFrom(slider.noUiSlider.get()));
								switch (e.which) {
									case 37: slider.noUiSlider.set(value - 1);
										break;
									case 39: slider.noUiSlider.set(value + 1);
										break;
								}
							}
						});
					}
					function removeEventListeners(slider, handle) {
						handle.removeEventListener("click", function() {
							this.focus();
						});
						handle.removeEventListener("keydown", function(e) {
							var values;
							var value;

							if (slider.noUiSlider.get().length === 2) {
								values = slider.noUiSlider.get();
								value = Number(formatFrom(values[i]));
								switch (e.which) {
									case 37: setSliderValues(value, i, "-");
										break;
									case 39: setSliderValues(value, i, "+");
										break;
								}
							} else {
								value = Number(formatFrom(slider.noUiSlider.get()));
								switch (e.which) {
									case 37: slider.noUiSlider.set(value - 1);
										break;
									case 39: slider.noUiSlider.set(value + 1);
										break;
								}
							}
						});
					}

					/*
					 * This logic is needed for slider with two handles
					 * @todo refactor so it's using a service
					 * */
					function setSliderValues(val, i, dir) {
						if (dir === "-") {
							if (i === 0) {
								return slider.noUiSlider.set([val - 1, null]);
							} else {
								return slider.noUiSlider.set([null, val - 1]);
							}
						} else if (dir === "+") {
							if (i === 0) {
								return slider.noUiSlider.set([val + 1, null]);
							} else {
								return slider.noUiSlider.set([null, val + 1]);
							}
						}
					}

					// called on slider change event
					function callChangeFunction(values, handle) {
						if (typeof scope.changeFn === "function") {
							scope.changeFn({values: values, handle: handle});
						}
					}
				}
			};
		}
	]);