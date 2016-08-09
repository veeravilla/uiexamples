var demoApp = angular.module('demoApp', [ 'ngRoute','ui.bootstrap' ]);


demoApp.config(function($routeProvider) {
           $routeProvider.
                        when('/home/:sno/:sname', {
                          templateUrl: 'home.html',
                          controller: 'homeCtrl'}).
                        when('/add', {
                            templateUrl: 'add.html',
                            controller: 'addCtrl'}).
                        when('/update', {
                             templateUrl: 'update.html',
                             controller: 'updateCtrl'}).
                        otherwise({redirectTo: '/home'}
                        );
});



demoApp.controller('homeCtrl',['$scope', '$http',
      function ($scope, $http) {
	 	alert(' Home Controller');
	  
}]);

demoApp.controller('addCtrl',['$scope', '$http',
      function ($scope, $http) {
	 	alert(' Add Controller');
	
}]);

demoApp.controller('updateCtrl',['$scope', '$http',
      function ($scope, $http) {
	 	alert(' Update Controller');
	
}]);


