'use strict';

xdescribe('CartService', function () {
  var cartService,fromLocal, productService,cartItem;
  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      cartService = $injector.get('cartService');
      productService = $injector.get('productService');
      fromLocal = $injector.get('fromLocal');
    });
    cartItem = [
      {productSort:'水果',productName:'苹果',productPrice:'10',productUnit:'千克',count: 3},
      {productSort:'饮料',productName:'雪碧',productPrice:'3',productUnit:'瓶', count: 3}
    ];


  });
  it('total money should be 0',function(){
    spyOn(fromLocal,'getData').and.returnValue(null);
    var totalMoney = cartService.getTotalMoney();
    expect(fromLocal.getData.calls.count()).toBe(1);
    expect(totalMoney).toEqual(0);
  });

  it('total money should be 29',function(){
    spyOn(fromLocal,'getData').and.returnValue(cartItem);
    var totalMoney = cartService.getTotalMoney();
    expect(fromLocal.getData.calls.count()).toBe(1);
    expect(totalMoney).toEqual(39);
  });

  it('when change the count in cart the setData should be called',function(){
    var item = {productSort: '水果', productName: '苹果', productPrice: '10', productUnit: '千克',count: 4};
    spyOn(fromLocal,'getData').and.returnValue(cartItem);
    spyOn(fromLocal,'setData');
    cartService.changeCount(item);
    expect(fromLocal.setData.calls.count()).toBe(2);
    expect(fromLocal.getData.calls.count()).toBe(2);
    expect(cartItem[0].count).toEqual(4);
  });

  it('when the count is 0,cartProduct should delete this product',function(){
    var item = {productSort: '水果', productName: '苹果', productPrice: '10', productUnit: '千克',count: 0};
    spyOn(fromLocal,'getData').and.returnValue(cartItem);
    spyOn(fromLocal,'setData');
    cartService.changeCount(item);
    expect(fromLocal.setData.calls.count()).toBe(2);
    expect(fromLocal.getData.calls.count()).toBe(2);
  });
});
