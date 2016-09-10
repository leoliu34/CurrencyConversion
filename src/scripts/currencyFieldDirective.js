app.controller('currencyFieldCtrl', function($scope) {
	
});

(function () {

	var directive = function () {
		return {
			template: '<input type="text" placeholder="0.00" ng-model="currencyValue" ng-readonly="{{id}}!==0"/>',
			restrict: 'E',
			replace: true,
			scope: {
				id : '@',
				currencyValue: '='
			},
			controller: 'currencyFieldCtrl'
		};
	};

	angular.module('conversionApp')
	.directive('currencyField', directive);

}());