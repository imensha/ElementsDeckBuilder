angular.module("deckBuilderApp", [
	"ngRoute",
	"ui.bootstrap"
]);

angular.module("deckBuilderApp").config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "views/main.html",
			controller: "BuilderCtrl",
			controllerAs: "builder"
		});
});

angular.module("deckBuilderApp").controller("BuilderCtrl", BuilderController);

angular.module("deckBuilderApp").factory("Cards", CardService);
angular.module("deckBuilderApp").factory("Elements", ElementService);
