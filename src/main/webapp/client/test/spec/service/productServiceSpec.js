'use strict';

describe('productService', function () {
  var $http, productService,products,cartItems,categories,$httpBackend;

  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      productService = $injector.get('productService');
      $http = $injector.get('$http');
    });

    products = [
      {barcode: '1', category: {id: '1', name: '水果'}, name: '苹果', price: '10', unit: '千克'},
      {barcode: '4', category: {id: '2', name: '饮料'}, name: '雪碧', price: '3', unit: '瓶'},
      {barcode: '5', category: {id: '3', name: '服装'}, name: 'NIKE鞋', price: '300', unit: '双'}
    ];

    cartItems = [
      {barcode: '1', category: {id: '1', name: '水果'}, name: '苹果', price: '10', unit: '千克', count: 3}
    ];

      categories = [
        {id: '1', name: '水果'},
        {id: '2', name: '饮料'},
        {id: '3', name: '服装'}
      ];
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should load  products', function () {
    $httpBackend.expectGET('/api/items').respond(200, products);
    productService.product(function (data) {
      expect(data.length).toBe(3);
    });
    $httpBackend.flush();
  });

  it('it should load cartItems', function () {
    $httpBackend.expectGET('/api/cartItems').respond(200, cartItems);
    productService.cartItem(function (data) {
      expect(data.length).toBe(1);
      expect(data[0].name).toEqual('苹果');
    });
    $httpBackend.flush();
  });

  it('it should load categories', function () {
    $httpBackend.expectGET('/api/categories').respond(200, categories);
    productService.categories(function (data) {
      expect(data.length).toBe(3);
      expect(data[0].name).toEqual('水果');
    });
    $httpBackend.flush();
  });

  it('it should return product by id', function () {
    var product = {barcode: '1', category: {id: '1', name: '水果'}, name: '苹果', price: '10', unit: '千克'};
    $httpBackend.expectGET('/api/items/1').respond(200, product);
    productService.getProductById(1,function (data) {
      expect(data).toEqual(product);
    });
    $httpBackend.flush();
  });

});
