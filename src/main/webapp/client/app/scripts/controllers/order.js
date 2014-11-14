'use strict';
angular.module('letusgo')
  .controller('OrderCtrl', function ($scope, $location, cartService) {

    function initTotalCount() {
      cartService.getTotalCount(function (data) {
        $scope.$parent.totalCount = data;
      });
    }

    cartService.cartItem(function (data) {
      $scope.orderItems = data;
    });

    initTotalCount();

    cartService.getTotalMoney(function (data) {
      $scope.totalMoney = data;
    });

    $scope.remove = function () {
      cartService.remove(function () {
      });
      $location.path('/homePage').replace();
    };
  });
