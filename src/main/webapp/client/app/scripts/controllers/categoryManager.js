'use strict';
angular.module('letusgo')
  .controller('CategoryManagerCtrl', function ($scope, $location, CategoryManagerService,productService) {

    function initCategories(){
      CategoryManagerService.getCategories(function (data) {
        $scope.categories = data;
      });
    }

    initCategories();

    $scope.add = function () {
      var category = CategoryManagerService.category();
      category.name = $scope.name;
      CategoryManagerService.add(category, function () {
        $location.path('/CategoryManager');
      });
    };


    $scope.delete = function (id) {
      productService.judgeIfHaveItems(id,function(data){
        if(data){
          CategoryManagerService.delete(id);
          initCategories();
        }else{
          alert('该分类下有商品，不能删除');
        }
      });

    };
    $scope.toUpdate = function (category) {
      $location.path('/updateCategory/' + category.id);
    };
  });
