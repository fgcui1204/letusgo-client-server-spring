'use strict';
describe('CategoryManagerCtrl',function() {
  var $scope, CategoryManagerService, $location, createController, productService,$controller,categories;
  beforeEach(function () {
    module('letusgo');

    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      CategoryManagerService = $injector.get('CategoryManagerService');
      productService = $injector.get('productService');
      $location = $injector.get('$location');
      $controller = $injector.get('$controller');

      createController = function () {
        return $controller('CategoryManagerCtrl', {
          $scope: $scope,
          $location: $location,
          CategoryManagerService: CategoryManagerService,
          productService: productService
        });
      };

    });

    categories = [
      {id: '2', name: '饮料'},
      {id: '3', name: '服装'}
    ];

    spyOn(CategoryManagerService,'getCategories').and.callFake(function(callback){
      callback(categories);
    });
  });

  it ('it should load all categories', function () {
    createController();
    CategoryManagerService.getCategories(function(data){
      $scope.categories = data;
      expect($scope.categories).toEqual(data);
    });
  });

  it ('it should call category', function () {
    var category = {
      id:'',
      name:''
    };
    spyOn(CategoryManagerService,'category').and.returnValue(category);
    createController();
    expect(CategoryManagerService.category()).toBe(category);
  });

  it('should call add method', function () {
    spyOn(CategoryManagerService,'add');
    createController();

    $scope.add();
    expect(CategoryManagerService.add.calls.count()).toBe(1);
  });

  it('should call judge method', function () {
    spyOn(productService,'judgeIfHaveItems');
    createController();

    $scope.delete();
    expect(productService.judgeIfHaveItems.calls.count()).toBe(1);
  });

  xit('should call delete method', function () {
    spyOn(CategoryManagerService,'delete');
    createController();

    $scope.delete();
    expect(CategoryManagerService.delete.calls.count()).toBe(1);
  });

  it('should come into update when click the update button', function () {
    var category = {id:'1',name:'水果'};
    createController();
    $scope.toUpdate(category);
    expect($location.path() === '/updateCategory/1').toBe(true);
  });
});

