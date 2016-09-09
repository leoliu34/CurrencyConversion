app.factory('exchangeRateService', ['$http', function($http) {
	var exchangeRateData = {};
	return {
		exchangeRate: function (base, target){
			var httpCallParameters = 'base=' + base;
			if (base == 'EUR') {
				httpCallParameters = 'symbols=' + target;
			}	
			return $http({
				method: 'GET',
				url: 'http://api.fixer.io/latest?' + httpCallParameters
			});
		}
	};
}]);
