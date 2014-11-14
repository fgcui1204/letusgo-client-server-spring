'use strict';

angular.module('letusgo')
  .controller('MainCtrl', function ($scope, cartService) {

    cartService.getTotalCount(function (data) {
      $scope.$parent.totalCount = data;
    });
  });
