'use strict';

describe('cartCtrl',function() {
  var $scope,productService,$location,createController, cartService,cartItems,$controller;
  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $location = $injector.get('$location');
      productService = $injector.get('productService');
      cartService = $injector.get('cartService');
      cartService = $injector.get('cartService');
      $controller = $injector.get('$controller');

      createController = function () {
        return $controller('OrderCtrl', {
          $scope: $scope,
          $location: $location,
          productService: productService,
          cartService: cartService
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

  it('test the orderItems',function(){
      createController();
      productService.cartItem(function (data) {
        $scope.orderItems = data;
        expect($scope.orderItems.length).toBe(2);
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

  xit('test the remove()',function(){
    spyOn(fromLocal,'getData').and.returnValue(cartProduct);
    spyOn(cartService,'getTotalMoney').and.returnValue(10);
    spyOn(cartService,'remove');
    createController();
    $scope.remove();
    expect(cartService.remove.calls.count()).toBe(1);
    expect($scope.totalMoney).toEqual(10);
  });
});
