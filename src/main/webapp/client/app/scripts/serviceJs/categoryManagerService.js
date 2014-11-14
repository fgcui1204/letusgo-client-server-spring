'use strict';
angular.module('letusgo').service('CategoryManagerService', function ($location, $http) {

  this.getCategories = function (callback) {
    $http.get('/api/categories').success(function (data) {
      callback(data);
    });
  };

  this.delete = function (id) {
    $http.delete('/api/categories/' + id);
  };

  this.getCategoryById = function (id, callback) {
    this.getCategories(function (categories) {

      var result = _.find(categories,function(category){
          return category.id.toString() === id.toString();
      });

      callback(result);
    });

  };

  this.doUpdate = function (category, callback) {
    $http.put('/api/categories/' + category.id, category)
      .success(function (data) {
        callback(data);
      });
  };

  this.category = function () {
    return {
      id: '',
      name: ''
    };
  };

  this.add = function (category, callback) {
    $http.post('/api/categories', category)
      .success(function (data) {
        callback(data);
      });
  };

});
