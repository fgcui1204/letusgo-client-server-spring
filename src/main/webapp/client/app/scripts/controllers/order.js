'use strict';
angular.module('letusgo')
  .controller('OrderCtrl', function ($scope, $location, cartService, productService) {

    function initTotalCount(){
      productService.getTotalCount(function (data) {
        $scope.$parent.totalCount = data;
      });
    }

    productService.cartItem(function (data) {
      $scope.orderItems = data;
    });

    initTotalCount();

    cartService.getTotalMoney(function (data) {
      $scope.totalMoney = data;
    });
        $scope.remove = function(){
            cartService.remove(function(){
              initTotalCount();
            });
          $location.path('/homePage').replace();
        };
  });
