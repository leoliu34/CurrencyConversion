/**
 * @ngdoc service
 * @name conversionApp.exchangeRateService
 * @requires $http
 * @description
 * # exchangeRateService
 * Service to talk with exchange rate API at fixer.io
 */

app.factory('exchangeRateService', ['$http', function($http) {
	var exchangeRateData = {};
	return {
		/**
	     * @ngdoc method
	     * @name conversionApp.exchangeRateService#getExchangeRate
	     * @methodOf conversionApp.exchangeRateService
	     *
	     * @description
	     * Method to get exchange rate from the external api
	     * @example
	     * exchangeRateService.getExchangeRate(base);
	     * @param {string} base currency type
	     * @returns {httpPromise} resolve with fetched data, or fails with error description.
	     */
		getExchangeRate: function (base){
			var httpCallParameters = 'base=' + base;
			return $http({
				method: 'GET',
				url: 'http://api.fixer.io/latest?' + httpCallParameters,
				cache: true
			});
		},
		/**
	     * @ngdoc method
	     * @name conversionApp.exchangeRateService#getExchangeRateOptions
	     * @methodOf conversionApp.exchangeRateService
	     *
	     * @description
	     * Method to get exchange rate options
	     * @example
	     * exchangeRateService.getExchangeRateOptions();
	     * @returns {Array.<Object>} an array of objects with id and name pair
	     */
		getExchangeRateOptions: function (){
			var currencyOptions = [
				{id: '1', name: 'CAD'},
	      		{id: '2', name: 'USD'},
	      		{id: '3', name: 'EUR'}
			];
			return currencyOptions;
		},
	};
}]);
