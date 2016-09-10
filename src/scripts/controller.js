var app = angular.module('conversionApp', []);

var appCtrl = app.controller('conversionCtrl', function($scope, $http, exchangeRateService) {
	$scope.numOfCurr = 3;
});