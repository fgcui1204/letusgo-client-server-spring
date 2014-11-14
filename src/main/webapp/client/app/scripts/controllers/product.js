'use strict';
angular.module('letusgo')
  .controller('ProCtrl', function ($scope, productService) {

    function initTotalCount(){
      productService.getTotalCount(function (data) {
        $scope.$parent.totalCount = data;
      });
    }

    productService.product(function (data) {
      $scope.products = data;
    });

    initTotalCount();

    $scope.addToCart = function (product) {
      productService.addToCart(product, function () {
        initTotalCount();
      });
    };
  });
