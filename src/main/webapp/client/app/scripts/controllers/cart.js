'use strict';
angular.module('letusgo')
  .controller('CartCtrl', function ($scope,cartService, productService) {

    function initTotalCount(){
      productService.getTotalCount(function (data) {
        $scope.$parent.totalCount = data;
      });
    }

    function initTotalMoney(){
      cartService.getTotalMoney(function (data) {
        $scope.totalMoney = data;
      });
    }


    productService.cartItem(function (data) {
      $scope.cartItems = data;
    });

    initTotalCount();
    initTotalMoney();


    $scope.changeCount = function (item,index) {
      if($scope.cartItems[index].count <= 0){
        $scope.cartItems.splice(index,1);
      }
      cartService.changeCount(item, function () {
        initTotalCount();
        initTotalMoney();
      });
    };


  });
