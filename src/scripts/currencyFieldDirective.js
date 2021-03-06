/**
 * @ngdoc controller
 * @name conversionApp.currencyFieldCtrl
 * @description
 * Controller that performs actions on the currencyField directive
 */
app.controller('currencyFieldCtrl', function($scope) {
});

(function () {
/**
 * @ngdoc directive
 * @name conversionApp.directive:currencyField
 * @restrict E
 * @element ANY
 * @scope
 * @description
 * The directive that creates the currencyField using input tag
 */
	var directive = function () {
		return {
			template: '<div class="currency-field col-10 col-m-10"><input type="number" placeholder="0.00"' +
						'ng-model="currencyValue" ng-readonly="{{id}}!==0" step="0.01"/></div>',
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