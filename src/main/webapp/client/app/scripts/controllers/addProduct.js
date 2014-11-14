'use strict';
angular.module('letusgo')
  .controller('addProductCtrl', function ($scope, productService, CategoryManagerService , $location) {

    CategoryManagerService .getCategories(function (data) {
      $scope.categories = data;
    });

    $scope.productInfo = productService.productInfo();

    $scope.addProduct = function () {
      productService.addProduct($scope.productInfo, function () {
        $location.path('/productManager');
      });
    };
  });
