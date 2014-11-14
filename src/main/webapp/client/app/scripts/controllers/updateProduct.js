'use strict';
angular.module('letusgo')
  .controller('updateProduct', function ($location, $scope,productService, CategoryManagerService, $routeParams) {

    CategoryManagerService.getCategories(function (data) {
      $scope.categories = data;
    });

    productService.getProductById($routeParams.barcode, function (data) {
      var item = data;
      $scope.productInfo = {'barcode': item.barcode, 'category': item.category, 'name': item.name, 'price': item.price, 'unit': item.unit};
    });

    $scope.doUpdate = function () {
      productService.doUpdate($scope.productInfo, function () {
        $location.path('/productManager');
      });

    };
  });
