'use strict';

describe('ProductManagerCtrl', function () {
  var $scope, productService, $location, createController, products, $controller;
  beforeEach(function () {
    module('letusgo');
    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      productService = $injector.get('productService');
      $location = $injector.get('$location');
      $controller = $injector.get('$controller');

      createController = function () {

        return $controller('ProductManagerCtrl', {
          $scope: $scope,
          $location: $location,
          productService: productService
        });
      };
    });

    products = [
      {barcode: '4', category: {id: '2', name: '饮料'}, name: '雪碧', price: '3', unit: '瓶'},
      {barcode: '5', category: {id: '3', name: '服装'}, name: 'NIKE鞋', price: '300', unit: '双'}
    ];

    spyOn(productService, 'product').and.callFake(function (callback) {
      callback(products);
    });
  });

  it('it should get all products', function () {
    createController();
    productService.product(function (data) {
      $scope.products = data;
      expect($scope.products).toEqual(products);
    });
  });

  it('it should delete the product', function () {
    spyOn(productService, 'delete');
    createController();
    $scope.delete('4');
    expect(productService.delete.calls.count()).toBe(1);
  });

  it('should come into addProduct when click the add product', function () {
    createController();
    $scope.toAdd();
    expect($location.path() === '/addProduct').toBe(true);
  });

  it('should come into update when click the update button', function () {
    var product =  {barcode: '4', category: {id: '2', name: '饮料'}, name: '雪碧', price: '3', unit: '瓶'};
    createController();
    $scope.toUpdate(product.barcode);
    expect($location.path() === '/updateProduct/4').toBe(true);
  });
});
