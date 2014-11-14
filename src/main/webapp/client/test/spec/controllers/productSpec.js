'use strict';

describe('productCtrl', function () {
  var $scope, productService, createController, products, $controller, cartItems;
  beforeEach(function () {

    module('letusgo');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      productService = $injector.get('productService');
      $controller = $injector.get('$controller');

    });

    createController = function () {
      return $controller('ProCtrl', {
        $scope: $scope,
        productService: productService
      });
    };

    products = [
      {barcode: '4', category: {id: '2', name: '饮料'}, name: '雪碧', price: '3', unit: '瓶'},
      {barcode: '5', category: {id: '3', name: '服装'}, name: 'NIKE鞋', price: '300', unit: '双'}
    ];

    cartItems = [
      {barcode: '1', category: {id: '1', name: '水果'}, name: '苹果', price: '10', unit: '千克', count: 3}
    ];

    spyOn(productService, 'product').and.callFake(function (callback) {
      callback(products);
    });

    spyOn(productService, 'getTotalCount').and.callFake(function (callback) {
      callback(10);
    });
  });

  it('should get all products', function () {

    createController();

    productService.product(function (data) {
      $scope.products = data;
      expect($scope.products.length).toBe(2);
    });
  });

  it('should get total count', function () {

    createController();

    productService.getTotalCount(function (data) {
      $scope.$parent.totalCount = data;
      expect($scope.$parent.totalCount).toBe(10);
    });
  });
});
