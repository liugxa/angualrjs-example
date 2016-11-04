ngTableControllers.controller("ngTableSearch", ["$scope", 
	function($scope) {
		"use strict";

		$scope.mockData= [
			{name:"Hank E.", phone:"800-555-PANKY"},
			{name:"Mary Had", phone:"800-LITTLE-LAMB"},
			{name:"Willem Dafriend", phone:"800-555-4321"},
			{name:"Reese Withoutaspoon", phone:"800-555-5678"},
			{name:"Kanye East", phone:"800-555-8765"},
			{name:"Neil Old", phone:"800-555-5678"}
		];

		$scope.options2 = {
			id: "example2Id",
			sortField: "name",
			placeholder: "Search name"
		};

		$scope.outputData2= [];
	}
]);
