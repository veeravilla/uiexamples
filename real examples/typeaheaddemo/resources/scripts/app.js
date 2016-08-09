var hcciApp = angular.module('hcciApp', [ 'ngRoute','ui.bootstrap' ]);

hcciApp.config(function($routeProvider) {
           $routeProvider.
                        when('/home', {
                          templateUrl: 'views/home.html',
                          controller: 'homeCtrl'}).
                        when('/home/careBundle/:condiationName/:zipCode', {
                            templateUrl: 'views/careBundle.html',
                            controller: 'careBundleCtrl'}).
                        when('/home/careBundleCost', {
                             templateUrl: 'views/careBundleCost.html',
                             controller: 'careBundleCostCtrl'}).
                        otherwise({redirectTo: '/home'}
                        );
});


hcciApp.controller('homeCtrl',['$scope', '$http',
      function ($scope, $http) {
	 
	  //Type Ahead
	  $scope.getCondition = function(conditionName) {
	    return $http.jsonp("http://54.68.110.133/solr/conditions/suggestions/v1?q="+ conditionName+"&wt=json&json.wrf=JSON_CALLBACK"
	    ).then(function(response){
	    	var data = response.data.response;
	    	var output = [];
	    	angular.forEach(data.docs, function(keyword) {
	    	//	console.log(keyword.keyword);
	    		output.push(keyword.keyword);
	    	});
	    	return output;
	    });
	  };
	  
	  //Get Geo Location and Zipcode
	  if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(function(position){
		        $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&sensor=true').then(function(res){
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


hcciApp.controller('careBundleCtrl',['$scope', '$http','$routeParams','$rootScope',
      function ($scope, $http,$routeParams,$rootScope) {
	//$http.get('http://hccipilot-dev.elasticbeanstalk.com/api/carebundle/v1/treatmntconditionWithCarebundles/'+$routeParams.condiationName+'/'+$routeParams.zipCode+'/zip').then(function(res){
	$http.get('api/carebundle/v1/treatmntconditionWithCarebundles/'+$routeParams.condiationName+'/'+$routeParams.zipCode+'/zip').then(function(res){
		$scope.careBundleResponse=res.data;
		console.log(res.data.TreatmentConditionResponse);   
	});
	
	//Store Object in Scope.
	$scope.passCareBundle=function(careBundle){
		$rootScope.careBundleRestURI=careBundle.careBundleRestURI;
		$rootScope.careBundle=careBundle;
	}
}]);


hcciApp.controller('careBundleCostCtrl',['$scope', '$http','$rootScope',
      function ($scope, $http,$rootScope) {
	    $http.get($rootScope.careBundleRestURI).then(function(res){
	    $scope.costResponse=res.data;
	    $scope.resBundle = res.data.CareBundleCostResponse.careBundle;
	    angular.forEach(res.data.CareBundleCostResponse.steps, function(steps) {
	    	$scope.steps=steps;
	    });
      });
}]);
