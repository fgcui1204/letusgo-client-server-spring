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
    this.cartItem(function (cartItems) {
      var totalCount = 0;

      if (!_.isEmpty(cartItems)) {
        var counts = _.pluck(cartItems,'count');
        totalCount = _.reduce(counts,function(totalCount,num){
           return totalCount + num;
        });
      }
      callback(totalCount);
    });

  };

  this.addToCart = function (product) {
    this.cartItem(function (cartItems) {

      var result = _.find(cartItems,function(cartItem){
        return cartItem.item.id === product.id;
      });

      if (result) {
        result.count = result.count+1;
        $http.put('/api/cartItems/'+result.id,result);
      } else {
        var cartItem = {item : product};
        cartItem.count = 1;
        $http.post('/api/cartItems', cartItem);
      }
    });
  };

  this.delete = function (id) {
    $http.delete('/api/items/' + id);
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

  this.getProductById = function (id, callback) {
    this.product(function (items) {

      var item = _.find(items,function(product){
        return product.id.toString() === id.toString();

      });
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
    $http.put('/api/items/' + product.id,product )
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
