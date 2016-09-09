var app = angular.module('conversionApp', []);

app.controller('conversionCtrl', function($scope, $http, exchangeRateService) {
	$scope.defaultCurr = 'USD';
	$scope.firstCurVal = 0;
	$scope.secoundCurVal = 0;
	$scope.currencyData = {
		currencyOptions: [
			{id: '1', name: 'CAD'},
      		{id: '2', name: 'USD'},
      		{id: '3', name: 'EUR'}
		],
		firstSelectedOption: {id: '1', name: 'CAD'},
		secoundSelectedOption: {id: '2', name: 'USD'}
	};
	exchangeRateService.exchangeRate($scope.currencyData.firstSelectedOption.name, 
									 $scope.currencyData.secoundSelectedOption.name);

	$scope.calculateCurrency = function () {
		console.log("re");
		var exchangeRatePr = exchangeRateService.exchangeRate($scope.currencyData.firstSelectedOption.name, 
									   		 				  $scope.currencyData.secoundSelectedOption.name);
		exchangeRatePr.then(function (response) {
			console.log('eg');
			var exchangeRate = Number(response.data.rates[$scope.currencyData.secoundSelectedOption.name]);
			if (!exchangeRate) {
				$scope.secoundCurVal = $scope.firstCurVal;
			} else {
				$scope.secoundCurVal = $scope.firstCurVal * exchangeRate;
			}
		}, function (response) {
			console.log(response.statusText);
		});
	};
});