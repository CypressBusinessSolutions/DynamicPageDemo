/* global toastr, moment, blank_scan_paper, Dynamsoft, angular */

//
// var selected = {};
// selected.customer = {};
// selected.doctor = {};
// selected.Prescription = {}
//
var pageApp = angular.module("pageApp", [
    'ngRoute',
    'eCatAPI',
    'ui.bootstrap',
    'ngSanitize',
    'ui.grid', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.selection',
    'ngDialog',
    'ngAnimate'
])
.run(function ($rootScope, $location, $http) {

            toastr.options = {
                "closeButton": true,
                "positionClass": "toast-bottom-full-width",
                "preventDuplicates": true,
                "timeOut": "60000"
            };

            $rootScope.settings = {};
            $rootScope.settings.available = {};
            $rootScope.settings.baseJSONURL = "/JSON";
            $rootScope.settings.tryLogin = false;
            $rootScope.dynamicEvent = function (initScope, controller, actor, action)
            {
              //$rootScope.updateAlert((actor + " " + action),"Quick Build","success");
            };

            eCatAPI_Init({
                apiURL: "/Service/JSON",
                apiAuthType: "",
                onLogin: function (profile) {
                    $rootScope.settings.tryLogin = false;
                    $rootScope.settings.access = {};
                    $rootScope.settings.access.profile = profile;
                    $rootScope.settings.access.IsAuthenicated = true;
                    toastr.clear();
                    $location.path("/home");
                },
                onFailedLogin: function (errorCode, errorMessage) {
                    resetLoginInfo();
                },
                onLogout: function () {
                    resetLoginInfo();
                    $location.path("/login");
                },
                startDelay: function (callType, message) {
                    if (callType === "post") {
                        if (!message) {
                            message = "Saving Data";
                        }
                        $rootScope.waitCnt += 1;
                        toastr.info(message,"", {timeOut: 2000});
                        $("body").css("cursor", "wait");
                    }
                },
                endDelay: function (callType) {
                    if (callType === "post") {
                        $rootScope.waitCnt -= 1;
                        if ($rootScope.waitCnt <= 1) {
                            toastr.clear();
                            $rootScope.waitCnt = 0;
                            $("body").css("cursor", "default");
                        }
                    }
                },
                alert: function (code, message) {
                    $rootScope.updateAlert("Database : " + message);
                },
                alertReset: $rootScope.resetAlert 
            });
			
			
			$rootScope.updateAlert =function (message,title,type) {
				if (typeof(message) === 'undefined') { message ="" };
				if (typeof(title) === 'undefined') { title ="" };
				if (typeof(type) === 'undefined') { type ="info" };
				toastr[type](message,title);
            };
			$rootScope.resetAlert =function (message,title,type) {
				toastr.clear();
            };
			
 $rootScope.reset = function (){
		toastr.clear(); 
 }
$rootScope.reset();

            resetLoginInfo = function () {
                $rootScope.settings.tryLogin = true;
                $rootScope.settings.access = {};
                $rootScope.settings.access.profile = {};
                $rootScope.settings.access.IsAuthenicated = false;
            };


            $rootScope.logout = function () {
                eCatAPI_Logout();
            };


            $rootScope.go = function (location) {
                $location.path(location);
            };

            //		
            // Common Function
            //	
            $rootScope.comingSoon = function (message) {
                if (!message) {
                    message = "";
                }
                dmsg = "<b> Coming Soon </b> - " + message;
                $rootScope.updateAlert(dmsg);
            };


        })



var checkNavigation = function ($q, $rootScope, $location, $http, $location) {
    if (eCatAPI_Authenicated()) {
        return true;
    }
    else {
        if ($rootScope.settings.tryLogin) {
            eCatAPI_Login();
        }
        else {
            var defered = $q.defer();
            defered.reject();
            toastr.clear();
            $location.path("/login");
            return false;
        }
    }
};
