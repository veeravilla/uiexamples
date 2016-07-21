var demoApp = angular.module('demoApp', [ 'ngRoute','ngAnimate','ui.bootstrap' ]);


demoApp.config(function($routeProvider) {
           $routeProvider.
                        when('/home', {
                          templateUrl: 'home.html',
                          controller: 'homeCtrl'}).
                        when('/report', {
                            templateUrl: 'report.html',
                            controller: 'reportCtrl'}).
                        otherwise({redirectTo: '/home'}
                       );
});



demoApp.controller('homeCtrl',['$scope', '$http',
      function ($scope, $http) {
	 	alert(' Home Controller');
	  
}]);

demoApp.controller('homeCtrl',['$scope', '$http',
      function ($scope, $http) {
	
	 //Type Ahead
	$scope.getCondition = function(conditionName) {
	    return $http.get('https://www.guroo.com/api/search/carebundle/suggestions/v1', {
	      params: {
	        q: conditionName
	      }
	    }).then(function(response){
	      return response.data.suggestions.map(function(item){
	    	  console.log(item.highlighted);
	    	  return item.highlighted;
	      });
	    });
	  };
                         	 
     //Get Geo Location and Zipcode
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position){
         $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&sensor=true')
         .then(function(res){
        	 angular.forEach(res.data.results[0].address_components, function(address_components) {
        	 angular.forEach(address_components.types, function(type) {
                       if(angular.equals(type,"postal_code")){
                         	console.log(address_components.long_name);
                         	$scope.zipCode = address_components.long_name;
                         	return;
                         	}
                        });
                         				    	
              });
         	});
         });
       }
}]);

demoApp.controller('reportCtrl',['$scope', '$http',
      function ($scope, $http) {
	 	alert(' Add Controller');
	
}]);

demoApp.controller('updateCtrl',['$scope', '$http',
      function ($scope, $http) {
	 	alert(' Update Controller');
	
}]);


