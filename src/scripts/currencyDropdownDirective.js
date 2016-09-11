/**
 * @ngdoc controller
 * @name conversionApp.currencyDropdownCtrl
 * @description
 * Controller that retrieves exchangeRateService data for dropdown options in currencyDropdown directive
 */
app.controller('currencyDropdownCtrl', function($scope, exchangeRateService) {
	$scope.currencyOptions = exchangeRateService.getExchangeRateOptions();
});

(function () {
/**
 * @ngdoc directive
 * @name conversionApp.directive:currencyDropdown
 * @restrict E
 * @element ANY
 * @scope
 * @description
 * The directive that creates the currencyDropdown using select tag
 */
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
			controller: 'currencyDropdownCtrl'
        };
    };

    angular.module('conversionApp')
	.directive('currencyDropdown', directive);
}());