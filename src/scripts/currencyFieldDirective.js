app.controller('currencyFieldCtrl', function($scope) {

});

(function () {

	var directive = function () {
		return {
			template: '<div class="currency-field col-10 col-m-10"><input type="text" placeholder="0.00"' +
						'ng-model="currencyValue" ng-readonly="{{id}}!==0"/></div>',
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