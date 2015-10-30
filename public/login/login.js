/* global pageApp */

pageApp.controller("loginController", function($scope, $rootScope, $http, $location) {

    $scope.login = function(userId,userPassword,keepLoggedIn) {
		if (!keepLoggedIn) {keepLoggedIn=false;}
        eCatAPI_Login(userId,userPassword,keepLoggedIn,function(profile) {
            },
            function() {
				$scope.loginFailed = true;
            });
    };
	
	if ($rootScope.settings.tryLogin) {
		
		$scope.login();
	}
    $scope.loginFailed = false;
	
	
});