app.controller('currencyRowCtrl', function($scope, $rootScope, $filter, exchangeRateService, IncrementalService) {
	$scope.init = function() {
		$scope.observers = {};
		$scope.rowID = IncrementalService.getId();
		$scope.currentCurrency = {};
		$scope.currentCurrency.data = exchangeRateService.getExchangeRateOptions()[$scope.rowID];
		$scope.currentCurrency.value = 0;
		if ($scope.rowID !== 0) {
			$scope.$on('data-changed', function(event, data) {
				$scope.calculateCurrency(data.value, data.data.name, $scope.currentCurrency.data.name);
			});
		}

		$scope.$watch('currentCurrency.value', function(changedValue){
			console.log('value changed at ' + $scope.rowID);
			if ($scope.rowID === 0){
				$rootScope.$broadcast('data-changed', $scope.currentCurrency);
			}
		});

		$scope.$watch('currentCurrency.data', function(changedValue, oldValue){
			console.log('type changed at ' + $scope.rowID);
			if ($scope.rowID === 0){
				$rootScope.$broadcast('data-changed', $scope.currentCurrency);
			}
			if ($scope.rowID === 1){
				var intermediateValue = angular.copy($scope.currentCurrency);
				console.log(intermediateValue);
				intermediateValue.data = oldValue;
				$rootScope.$broadcast('data-changed', intermediateValue);
			}
		});
	};

	$scope.init();

	$scope.calculateCurrency = function(baseValue, baseType, targetType) {
		var exchangeRatePr = exchangeRateService.getExchangeRate(baseType);
		exchangeRatePr.then(function (response) {
			var exchangeRate = Number(response.data.rates[targetType]);
			if (exchangeRate) {
				$scope.currentCurrency.value = baseValue* exchangeRate;
			} else {
				$scope.currentCurrency.value = baseValue;
			}
		}, function (response) {
			console.log(response.statusText);
		});
	};
});

(function () {

	var directive = function () {
		return {
			template: '<div class="currency-row"><currency-field currency-value="currentCurrency.value" id={{rowID}}></currency-field>' + 
			'<currency-dropdown id={{rowID}} currency-type="currentCurrency.data"></currency-dropdown></div>',
			restrict: 'E',
			controller: 'currencyRowCtrl',
			scope: {}
		};
	};

	angular.module('conversionApp')
	.directive('currencyRow', directive);

}());