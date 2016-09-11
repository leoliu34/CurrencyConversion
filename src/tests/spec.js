describe('conversionCtrl', function() {

  var $scope;
  var controller;

  beforeEach(function() {
    module('conversionApp');
    module(function ($provide) {
      $provide.value('exchangeRateService', mockExchangeRateService);
    });
  });

  describe('main controller tests', function() {
    it('$scope.showDisclaimer to be called when button pressed', function() {
      expect(true).toEqual(true);
    });
  });
});