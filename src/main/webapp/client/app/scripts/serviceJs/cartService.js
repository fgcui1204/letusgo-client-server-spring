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

  this.changeCount = function (cart,callback) {
    productService.cartItem(function (cartItems) {
      _.forEach(cartItems, function (cartItem) {
        if (cartItem.item.name === cart.item.name) {
          cartItem.count = cart.count;
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
