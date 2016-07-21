var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";

	$scope.printDetails = function(){
		alert($scope.firstName + ' - ' + $scope.lastName);
	}    
}

);