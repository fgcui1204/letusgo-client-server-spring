'use strict';
angular.module('letusgo')
  .controller('ProCtrl', function ($scope, cartService) {

    function initTotalCount(){
      cartService.getTotalCount(function (data) {
        $scope.$parent.totalCount = data;
      });
    }

    productService.product(function (data) {
      $scope.products = data;
    });

    initTotalCount();

    $scope.addToCart = function (product) {
      cartService.addToCart(product, function () {
        initTotalCount();
      });
    };
  });
