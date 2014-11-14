'use strict';

describe('updateProduct',function() {
  var $scope, productService, $routeParams,$controller, createController,CategoryManagerService, products,categories;
  beforeEach(function () {
    module('letusgo');
    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      productService = $injector.get('productService');
      CategoryManagerService = $injector.get('CategoryManagerService');
      $routeParams = $injector.get('$routeParams');
      $controller = $injector.get('$controller');

      createController = function () {
        return $controller('updateProduct', {
          $scope: $scope,
          $routeParams: $routeParams,
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

  it ('it should load categories', function () {
    createController();
    CategoryManagerService .getCategories(function(data){
      $scope.categories = data;
      expect($scope.categories.length).toEqual(2);
    });
  });

  it ('it should get product by id', function () {
    var item = {barcode: '4', category: {id: '2', name: '饮料'}, name: '雪碧', price: '3', unit: '瓶'};
    var barcode = '4';
    spyOn(productService, 'getProductById').and.callFake(function (barcode, callback) {
      callback(item);
    });
    createController();
    productService.getProductById(barcode,function(data){
      expect($scope.productInfo).toEqual(data);
    });
  });

 it ('it should call doUpdate', function () {
    spyOn(productService,'doUpdate');
    createController();

   $scope.doUpdate();
   expect(productService.doUpdate.calls.count()).toBe(1);
  });
});
