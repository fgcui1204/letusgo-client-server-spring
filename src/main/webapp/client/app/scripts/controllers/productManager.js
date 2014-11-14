'use strict';
angular.module('letusgo')
  .controller('ProductManagerCtrl', function ($location,$scope, productService) {

    function initProducts(){
      productService.product(function (data) {
        $scope.products = data;
      });
    }

    initProducts();

    $scope.delete = function (id) {
      productService.delete(id,function(){
        initProducts();
      });
    };

    $scope.toAdd = function () {
      $location.path('/addProduct');
    };

    $scope.toUpdate = function (id) {
      $location.path('/updateProduct/' + id);
    };
  });
