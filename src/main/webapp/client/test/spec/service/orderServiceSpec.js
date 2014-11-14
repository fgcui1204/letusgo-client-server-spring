'use strict';

xdescribe('CartService', function () {
  var $location,cartService, fromLocal;
  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      $location = $injector.get('$location');
      cartService = $injector.get('cartService');
      fromLocal = $injector.get('fromLocal');
    });

  });
  it('the localStorage is null',function(){
    cartService.remove();
    expect(fromLocal.getData('cartProduct')).toEqual(null);
    expect(fromLocal.getData('totalCount')).toBe(0);
  });
});
