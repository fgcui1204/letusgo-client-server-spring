'use strict';
angular.module('letusgo')
  .controller('ProductManagerCtrl', function ($location,$scope, productService) {

    initProducts();

    $scope.delete = function (barcode) {
      productService.delete(barcode);
      initProducts();
    };

    $scope.toAdd = function () {
      $location.path('/addProduct');
    };

    $scope.toUpdate = function (barcode) {
      $location.path('/updateProduct/' + barcode);
    };

    function initProducts(){
      productService.product(function (data) {
        $scope.products = data;
      });
    }
  });
