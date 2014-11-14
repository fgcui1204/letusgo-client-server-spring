'use strict';

xdescribe('productManagerServiceSpec', function () {
  var fromLocal, productManagerService,products;
  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      productManagerService = $injector.get('productManagerService');
      fromLocal = $injector.get('fromLocal');
    });
    products = [
      {productSort: '水果', productName: '苹果', productPrice: '10', productUnit: '千克'},
      {productSort: '水果', productName: '香蕉', productPrice: '10', productUnit: '千克'}
    ];

  });

  it('the getData should be called one and delete product', function () {
    var pname = '苹果';
    spyOn(fromLocal, 'getData').and.returnValue(products);
    productManagerService.delete(pname);
    expect(fromLocal.getData.calls.count()).toBe(1);
  });

  it('the length of allsort is 2', function () {
    var allsort = [{sid: '1', sname: '水果'},{sid: '2', sname: '饮料'}];
    spyOn(fromLocal, 'getData').and.returnValue(allsort);
    productManagerService.getAllSort();
    expect(fromLocal.getData.calls.count()).toBe(1);
    expect(allsort.length).toEqual(2);
    expect(allsort[0].sname).toEqual('水果');
  });
  it('get product by name', function () {
    spyOn(fromLocal, 'getData').and.returnValue(products);
    var item =  productManagerService.getProductByName('苹果');
    expect(fromLocal.getData.calls.count()).toBe(1);
    expect(item[0].productName).toEqual('苹果');
    expect(item[0].productSort).toEqual('水果');
  });
  it('update the product', function () {
    spyOn(fromLocal, 'getData').and.returnValue(products);
    var product = [{productSort: '水果', productName: '苹果', productPrice: '20', productUnit: '千克'}];
    productManagerService.doUpdate(product[0]);
    spyOn(fromLocal, 'setData');
    expect(fromLocal.getData.calls.count()).toBe(1);
    expect(products[0].productPrice).toEqual('10');
    expect(products[1].productPrice).toEqual('10');
  });

  it('add repeat product', function () {
    spyOn(fromLocal, 'getData').and.returnValue(products);
    var product = {productSort: '水果', productName: '苹果', productPrice: '20', productUnit: '千克'};
    productManagerService.addProduct(product);
    expect(fromLocal.getData.calls.count()).toBe(1);
    expect(products.length).toBe(2);
  });
  it('add product', function () {
    spyOn(fromLocal, 'getData').and.returnValue(products);
    var product = {productSort: '水果', productName: '梨', productPrice: '20', productUnit: '千克'};
    productManagerService.addProduct(product);
    expect(fromLocal.getData.calls.count()).toBe(1);
    expect(products.length).toBe(2);
  });
});
