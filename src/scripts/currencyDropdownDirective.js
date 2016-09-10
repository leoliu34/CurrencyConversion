app.controller('dropdownCtrl', function($scope, exchangeRateService) {
	$scope.currencyOptions = exchangeRateService.getExchangeRateOptions();
});

(function () {
	var directive = function () {
        return {
        	template: '<div class="currency-dropdown col-2 col-m-2"><select " ' +
        			  'ng-options="option.name for option in currencyOptions track by option.id"' +
        			  'ng-model="currencyType"></select></div>',
			restrict: 'E',
			replace: true,
			scope: {
				id : '@',
				currencyType: '='
			},
			controller: 'dropdownCtrl'
        };
    };

    angular.module('conversionApp')
	.directive('currencyDropdown', directive);
}());