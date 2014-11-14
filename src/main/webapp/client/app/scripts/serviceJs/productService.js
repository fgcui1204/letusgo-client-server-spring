'use strict';
angular.module('letusgo').service('productService', function ($http) {
  this.product = function (callback) {
    $http.get('/api/items').success(function (data) {
      callback(data);
    });
  };

  this.cartItem = function (callback) {
    $http.get('/api/cartItems').success(function (data) {
      var cartItems = data || [];
      callback(cartItems);
    });
  };

  this.categories = function (callback) {
    $http.get('/api/categories').success(function (data) {
      callback(data);
    });
  };

  this.getTotalCount = function (callback) {
    this.cartItem(function (data) {
      var items = data;
      var totalCount = 0;

      if (!_.isEmpty(items)) {
        var counts = _.pluck(items,'count');
        totalCount = _.reduce(counts,function(totalCount,num){
           return totalCount + num;
        });
      }
      callback(totalCount);
    });

  };

  this.addToCart = function (productItem, callback) {
    this.cartItem(function (data) {
      var cartData = data;
      var cartItem = _.find(cartData, {'barcode': productItem.barcode});

      if (cartItem) {
        cartItem.count = cartItem.count+1;
      } else {
        productItem.count = 1;
        cartData.push(productItem);
      }

      $http.post('/api/cartItems', {cartItems: cartData}).success(function () {
        callback();
      });
    });
  };

  this.delete = function (barcode) {
    $http.delete('/api/items/' + barcode);
  };


  this.productInfo = function () {
    return {
      barcode: '',
      category: {
        id: '',
        name: ''
      },
      name: '',
      price: '',
      unit: ''
    };
  };

  this.getProductById = function (barcode, callback) {
    this.product(function (data) {
      var item = _.find(data, { 'barcode': barcode });
      callback(item);
    });

  };


  this.judgeIfHaveItems = function(id,callback){
    this.product(function(data){
      var items = data;
      var result = true;
      _.forEach(items,function(item){
        if(item.category.id === id){
          result = false;
        }
      });
      callback(result);
    });
  };

  this.doUpdate = function (product, callback) {
    $http.put('/api/items/' + product.barcode, {item: product})
      .success(function (data) {
        callback(data);
      });
  };

  this.addProduct = function (product, callback) {
    $http.post('/api/items', {item: product})
      .success(function (data) {
        callback(data);
      });
  };
});
