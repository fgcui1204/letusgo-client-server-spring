'use strict';
angular.module('letusgo').service('cartService', function ( productService, $http) {


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

  this.changeCount = function (item, callback) {
    productService.cartItem(function (data) {
      var cartItem = data;
      _.forEach(cartItem, function (cartItem) {
        if (cartItem.name === item.name) {
          cartItem.count = item.count;
        }
      });
      var result = _.filter(cartItem, function (item) {
        return item.count !== 0;
      });
      $http.post('/api/cartItems', {cartItems: result}).success(function () {
        callback();
      });
    });
  };

  this.remove = function(callback){
    $http.delete('/api/payment').success(function(data){
      callback(data);
    });
  };

});
