angular.module("myApp",[]).controller("myCtrl", ["$scope", function (scope) {

    	scope.hideform = true;

    	scope.rowData = [
        	{sno: 1, firstName: 'Smith', country: 'United States', email: 'smith@gmail.com', dob: new Date('1987-05-21')},
		      {sno: 2, firstName: 'Johnson', country: 'United States', email: 'johnson@gmail.com', dob: new Date('1987-05-22')},
        	{sno: 3, firstName: 'Williams', country: 'Canada', email: 'williams@gmail.com', dob: new Date('1987-05-23')}
    	];

    	scope.editRow = function(id) {        	
		
   			scope.hideform = false;

   			scope.createUserLable = true;
  			scope.editUserLable = false;

    		scope.objIndex = id-1;	
        scope.userData = angular.copy(scope.rowData[scope.objIndex]);	
		
    	}

  	scope.newRow = function() {		    	
          	
  			scope.hideform = false;

  			scope.disableStatus = true;

        scope.createUserLable = false;
  			scope.editUserLable = true;
   			scope.userData = {};	
  		
  	}

    scope.saveRow = function() {                                               

      if(scope.rowData[scope.objIndex] == null) {            
          scope.rowData.push(scope.userData);
      } else {
          scope.rowData[scope.objIndex] = scope.userData;
      }                                               
      scope.createUserLable = false;
			scope.editUserLable = true;
	  		scope.userData = {};
          		scope.objIndex = '';
    	}

    	scope.removeRow = function removeRow(row) {
        	var index = scope.rowData.indexOf(row);
        	if (index !== -1) {
            		scope.rowData.splice(index, 1);
        	}
    	}

     
	scope.$watchGroup(['userData.firstName', 'userData.country', 'userData.email', 'userData.dob'],function() { 
		scope.validateFields();
	});

	scope.validateFields = function(){		
		if (scope.userData.firstName.length >= 4 && scope.userData.country.length >= 2 && scope.userData.email.length >= 5) {
     			scope.disableStatus = false;
			
  		}else{
			scope.disableStatus = true;
		}
		
	};

}]);