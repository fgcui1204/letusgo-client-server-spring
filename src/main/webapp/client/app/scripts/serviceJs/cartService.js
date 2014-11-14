'use strict';
angular.module('letusgo').service('cartService', function ( productService, $http) {

  this.cartItem = function (callback) {
    $http.get('/api/cartItems').success(function (data) {
      var cartItems = data || [];
      callback(cartItems);
    });
  };

  this.getTotalMoney = function (callback) {
    productService.cartItem(function (cartItems) {

      var totalMoney = 0;

      if (cartItems !== null) {
        _.forEach(cartItems, function (cartItem) {
          totalMoney += cartItem.item.price * cartItem.count;
        });
      }
      callback(totalMoney);
    });

  };

  this.getTotalCount = function (callback) {
    this.cartItem(function (cartItems) {
      var totalCount = 0;

      if (!_.isEmpty(cartItems)) {

        var counts = _.pluck(cartItems, 'count');
        totalCount = _.reduce(counts, function (totalCount, num) {
          return totalCount + num;
        });
      }
      callback(totalCount);
    });
  };

  this.addToCart = function (product,callback) {
    this.cartItem(function (cartItems) {

      var result = _.find(cartItems, function (cartItem) {
        return cartItem.item.id === product.id;
      });

      if (result) {
        result.count = result.count + 1;
        $http.put('/api/cartItems/' + result.id, result).success(function (data) {
          callback(data);
        });
      } else {

        var cartItem = {item: product};
        cartItem.count = 1;
        $http.post('/api/cartItems', cartItem).success(function (data) {
          callback(data);
        });
      }
    });
  };

  this.changeCount = function (cart,callback) {
    productService.cartItem(function (cartItems) {

      _.forEach(cartItems, function (cartItem) {

        if (cartItem.item.name === cart.item.name) {

          cartItem.count = cart.count;

          if(cartItem.count ===0 ){
            $http.delete('/api/cartItems/'+cartItem.id).success(function () {
              callback();
            });
          }

          $http.put('/api/cartItems/'+cartItem.id,cartItem).success(function () {
            callback();
          });
        }
      });
    });
  };



  this.remove = function(callback){
    $http.delete('/api/payment').success(function(data){
      callback(data);
    });
  };
});
