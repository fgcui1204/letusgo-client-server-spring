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
    this.getCategories(function (data) {
      var categories = data;
      var result = _.find(categories, { 'id': id });
      callback(result);
    });

  };

  this.doUpdate = function (category, callback) {
    $http.put('/api/categories/' + category.id, {category: category})
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
    $http.post('/api/categories', {category: category})
      .success(function (data) {
        callback(data);
      });
  };

});
