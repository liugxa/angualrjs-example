angular.module("x1.ui.css")
	.controller("bidiCtrl", ["$scope", function($scope) {
		"use strict";
		    angular.element(document).ready(function () {
				  $('.tooltip-bottom').tooltip({
				    placement: 'bottom',
				    textdir: 'rtl',
				    viewport: {selector: 'body', padding: 2}
				  })
				  $('.tooltip-top').tooltip({
				    placement: 'top',
				    textdir: 'contextual',					
				    viewport: {selector: 'body', padding: 2}
				  })
				  $('.tooltip-right').tooltip({
				    placement: 'right',
				    viewport: {selector: 'body', padding: 2}
				  })				  
				  $('#popover1').popover({textdir: 'rtl'})
				  $('#popover2').popover()				
		    });		
	}]);