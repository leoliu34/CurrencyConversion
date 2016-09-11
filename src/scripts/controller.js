var app = angular.module('conversionApp', ['ngMaterial']);

app.controller('conversionCtrl', function($scope, $mdDialog, exchangeRateService) {

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

var dialogCtrl = function ($scope, parentData) {
	$scope.exchangeRateInfo = parentData;
};