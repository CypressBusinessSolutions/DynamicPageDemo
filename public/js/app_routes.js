pageApp.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when("/home", {
			templateUrl: "home/home.html",
			controller: "HomeController",
			resolve: {factory: checkNavigation}
		})
		.when("/color", {
			templateUrl: "/Service/ANGULAR/HTML/pageApp/CLR.TAB",
			controller: "ClrTabMainController",
			resolve: {factory: checkNavigation}
		})
		.when("/vendor", {
			templateUrl: "/Service/ANGULAR/HTML/pageApp/VENDOR",
			controller: "VendorMainController",
			resolve: {factory: checkNavigation}
		})
		.when("/bcwQuote", {
			templateUrl: "/Service/ANGULAR/HTML/pageApp/BCW.QUOTE",
			controller: "BcwQuoteMainController",
			resolve: {factory: checkNavigation}
		})
		.when("/login", {
			templateUrl: "login/login.html",
			controller: "loginController"
		})
		.otherwise({
			redirectTo: "/login"
		});
});
