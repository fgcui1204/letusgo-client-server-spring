'use strict';

angular.module('letusgo')
  .controller('MainCtrl', function ($scope, productService) {

    productService.getTotalCount(function (data) {
      $scope.$parent.totalCount = data;
    });
  });
