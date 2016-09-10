app.factory('exchangeRateService', ['$http', function($http) {
	var exchangeRateData = {};
	return {
		calcExchangeRate: function (base, target){
			var httpCallParameters = 'base=' + base;
			if (base == 'EUR') {
				httpCallParameters = 'symbols=' + target;
			}	
			return $http({
				method: 'GET',
				url: 'http://api.fixer.io/latest?' + httpCallParameters,
				cache: true
			});
		},
		getExchangeRateOptions: function (){
			var currencyOptions = [
				{id: '1', name: 'CAD'},
	      		{id: '2', name: 'USD'},
	      		{id: '3', name: 'EUR'}
			];
			return currencyOptions;
		}
	};
}]);