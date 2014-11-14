'use strict';

describe('cartCtrl',function() {
  var $scope,$controller, productService, createController,cartService,cartItems;
  beforeEach(function () {
    module('letusgo');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      productService = $injector.get('productService');
      cartService = $injector.get('cartService');

      $controller = $injector.get('$controller');

      createController = function () {
        return $controller('CartCtrl', {
          $scope: $scope,
          productService: productService,
          cartService:cartService
        });
      };
    });

  cartItems = [
    {barcode: '2', category: {id: '1', name: '水果'}, name: '香蕉', price: '5', unit: '千克',count:'3'},
    {barcode: '3', category: {id: '2', name: '饮料'}, name: '可乐', price: '5', unit: '瓶',count:'2'}
  ];

  spyOn(productService,'cartItem').and.callFake(function(callback){
    callback(cartItems);
  });
  });

  it('load all cartItems ',function(){
    createController();
    productService.cartItem(function (data) {
      $scope.cartItems = data;
      expect($scope.cartItems.length).toBe(2);
    });
  });

  it('total count  should be 5 ',function(){
    spyOn(productService,'getTotalCount').and.callFake(function(callback){
      callback(5);
    });
    createController();
    expect($scope.$parent.totalCount).toBe(5);
  });

  it('totalMoney should be 20 ',function(){
    var totalMoney = 60;
    spyOn(cartService,'getTotalMoney').and.callFake(function(callback){
      callback(totalMoney);
    });
    createController();
    expect($scope.totalMoney).toBe(60);
  });

  it('the function changeCount() ',function(){
    var item = [{barcode: '2', category: {id: '1', name: '水果'}, name: '香蕉', price: '5', unit: '千克',count:'3'}];
    spyOn(cartService,'changeCount');
    createController();
    $scope.changeCount(item);
    expect(cartService.changeCount.calls.count()).toBe(1);
  });
});
