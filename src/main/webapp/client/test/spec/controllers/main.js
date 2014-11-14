'use strict';

describe('Controller: MainCtrl', function () {
  var $scope, productService, createController;

  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      productService = $injector.get('productService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('MainCtrl', {
          $scope: $scope,
          productService: productService
        });
      };
    });
  });


  it('total count  should be 5 ',function(){
    spyOn(productService,'getTotalCount').and.callFake(function(callback){
      callback(5);
    });
    createController();
    expect($scope.$parent.totalCount).toBe(5);
  });
});
