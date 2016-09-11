/**
 * @ngdoc controller
 * @name conversionApp.currencyRowCtrl
 * @description
 * Controller that acts as model for the currency data and is in charge of broadcasting and receiving change events
 */
app.controller('currencyRowCtrl', function($scope, $rootScope, exchangeRateService, IncrementalService) {
	
	$scope.init = function() {
		// Assigns an ID to this controller
		$scope.rowID = IncrementalService.getId();
		$scope.currentCurrency = {};
		// Retrieves exchange rate options (CAD, EUR, USD)
		$scope.currentCurrency.data = exchangeRateService.getExchangeRateOptions()[$scope.rowID];
		$scope.currentCurrency.value = 0;
		$scope.responseData = {};
		// Sets up listener to event when it's not the controller with ID of 0 (second currency row)
		if ($scope.rowID !== 0) {
			$scope.$on('data-changed', function(event, data) {
				$scope.calculateCurrency(data.value, data.data.name, $scope.currentCurrency.data.name);
			});
		}
		// Sets up emitter to broadcast event when first row's field value changes
		$scope.$watch('currentCurrency.value', function(changedValue){
			if ($scope.rowID === 0){
				$rootScope.$broadcast('data-changed', $scope.currentCurrency);
			}
		});
		// Sets up emitter to broadcast event when first row's dropdown value changes
		$scope.$watch('currentCurrency.data', function(changedValue, oldValue){
			if ($scope.rowID === 0){
				$rootScope.$broadcast('data-changed', $scope.currentCurrency);
			}
			// Sets up emitter to broadcast event when second row's dropdown value changes
			if ($scope.rowID === 1){
				var intermediateValue = angular.copy($scope.currentCurrency);
				intermediateValue.data = oldValue;
				$rootScope.$broadcast('data-changed', intermediateValue);
			}
		});
	};

	$scope.init();

	/**
     * @ngdoc method
     * @name conversionApp.currencyRowCtrl#calculateCurrency
     * @methodOf conversionApp.currencyRowCtrl
     *
     * @description
     * Method to set currenct currency's value using conversionApp.exchangeRateService
     * @param {number} baseValue The value that is going to be converted
     * @param {string} baseType The currency of the baseValue
     * @param {string} targetType The target currency to be converted to
     */
	$scope.calculateCurrency = function(baseValue, baseType, targetType) {
		var exchangeRatePr = exchangeRateService.getExchangeRate(baseType);
		exchangeRatePr.then(function (response) {
			var exchangeRate = Number(response.data.rates[targetType]);
			if (exchangeRate) {
				$scope.currentCurrency.value = baseValue* exchangeRate;
			} else {
				$scope.currentCurrency.value = baseValue;
			}
		}, function errorCallback(response){
        	$scope.responseData.error = response.statusText;
        	console.log($scope.responseData.error); 
		});
	};
});

/**
 * @ngdoc directive
 * @name conversionApp.directive:currencyRow
 * @restrict E
 * @element ANY
 * @scope
 * @description
 * The directive that creates the row of currency data including a currency-field and currency-dropdown
 */
(function () {

	var directive = function () {
		return {
			template: '<div class="currency-row"><form name="currency-form" novalidate><currency-field currency-value="currentCurrency.value" id={{rowID}}></currency-field>' + 
			'<currency-dropdown id={{rowID}} currency-type="currentCurrency.data"></currency-dropdown></form></div>',
			restrict: 'E',
			controller: 'currencyRowCtrl',
			scope: {}
		};
	};

	angular.module('conversionApp')
	.directive('currencyRow', directive);

}());