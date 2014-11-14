'use strict';

describe('addProductCtrl', function () {
  var $scope, productService,$controller, $location, createController,products,CategoryManagerService,categories;
  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      productService = $injector.get('productService');
      CategoryManagerService = $injector.get('CategoryManagerService');
      $location = $injector.get('$location');
      $controller = $injector.get('$controller');

      createController = function () {
        return $controller('addProductCtrl', {
          $scope: $scope,
          $location: $location,
          productService: productService,
          CategoryManagerService:CategoryManagerService
        });
      };
    });

    products = [
      {barcode: '4', category: {id: '2', name: '饮料'}, name: '雪碧', price: '3', unit: '瓶'},
      {barcode: '5', category: {id: '3', name: '服装'}, name: 'NIKE鞋', price: '300', unit: '双'}
    ];

    categories = [
      {id: '2', name: '饮料'},
      {id: '3', name: '服装'}
    ];

    spyOn(CategoryManagerService, 'getCategories').and.callFake(function (callback) {
      callback(categories);
    });
  });

  it ('it should load all sorts', function () {
    createController();
    CategoryManagerService .getCategories(function(data){
      $scope.categories = data;
      expect($scope.categories.length).toEqual(2);
    });
  });

  it ('productInfo should be a object', function () {
    var productInfo = {
      barcode: '',
      category: {
        id: '',
        name: ''
      },
      name: '',
      price: '',
      unit: ''
    };

    spyOn(productService,'productInfo').and.returnValue(productInfo);
    createController();
    expect($scope.productInfo).toEqual(productInfo);
  });

  it('should call addProduct method', function () {

    spyOn(productService,'addProduct');
    createController();

    $scope.addProduct();
    expect(productService.addProduct.calls.count()).toBe(1);
  });
});
