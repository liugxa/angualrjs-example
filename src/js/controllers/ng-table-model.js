ngTableControllers.controller("ngTableModelDialog", ["$scope", "$timeout", "x1Modal", 
	function($scope, $timeout, modal) {
		$scope.buttonClick = function(){	
			var confirmation = {
				options: {
					headerText: 'Confirm',
					actionButtonText: 'delete',
					closeButtonText:  'Cancel',
					showCloseButton: true,
					showActionButton:false,
					additionalButtons:[{'elementClass':'btn btn-primary','text':'delete','eventName':'doDeleteReq'}]
				},
				settings: {
					contentTemplate: "./popUpDialog.html",
					size: "sm",
					type: "confirmation"
				},
				data: {
					text: "Do you want to delete this file?",

				}
			}
			modal.open(confirmation);
		}
		
		$scope.$on("doDeleteReq", function(){
			console.log("item click event!!")
		})
		
		$scope.$on("cancel.event", function(){
			console.log("cancel event!!")
		})
	}
]);