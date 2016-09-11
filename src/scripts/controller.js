var app = angular.module('conversionApp', ['ngMaterial']);
/**
 * @ngdoc controller
 * @name conversionApp.conversionCtrl
 * @function
 * @description
 * Main Controller for conversionApp
 */
app.controller('conversionCtrl', function($scope, $mdDialog, exchangeRateService) {
	/**
     * @ngdoc method
     * @name conversionApp.conversionCtrl#showDisclaimer
     * @methodOf conversionApp.conversionCtrl
     *
     * @description
     * Method to popup an angular material dialog when 'disclaimer' is pressed
     * @param {object} ev Event that is emitted when button is pressed
     */
	$scope.showDisclaimer = function(ev){
		var exchangeRatePr = exchangeRateService.getExchangeRate('CAD'); 
		exchangeRatePr.then(function (response) {
			$scope.exchangeRateInfo = response.data;
			$mdDialog.show({
				locals:{parentData: $scope.exchangeRateInfo.rates},   
				template:'<md-dialog aria-label="Currency In CAD"><md-toolbar><div class="md-toolbar-tools"><h2>Currency In CAD</h2><span flex></span></div></md-toolbar><md-dialog-content><md-list>' +
				'<md-list-item ng-repeat="(key, value) in exchangeRateInfo"><p>{{key}}: {{value}}</p></md-list-item>' +
				'</md-list></md-dialog-content></md-dialog>',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				escapeToClose:true,
				controller: dialogCtrl
			});
		}, function (response) {
			console.log(response.statusText);
		});
	};
});

/**
 * @ngdoc controller
 * @name conversionApp.dialogCtrl
 * @function
 * @description
 * Controller to pass in data to mdDialog
 */
var dialogCtrl = function ($scope, parentData) {
	$scope.exchangeRateInfo = parentData;
};