angular
	.module("prism", [])
	.directive("prism", function() {
		"use strict";

		return {
			restrict: "A",
			link: function($scope, element) {
				element.ready(function() {
					Prism.highlightElement(element[0]);
				});
			}
		};
	});