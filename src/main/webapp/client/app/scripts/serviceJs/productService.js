'use strict';
angular.module('letusgo').service('productService', function ($http) {
  this.product = function (callback) {
    $http.get('/api/items').success(function (data) {
      callback(data);
    });
  };

  this.delete = function (id, callback) {
    $http.delete('/api/items/' + id).success(function () {
      callback();
    });
  };

  this.productInfo = function () {
    return {
      barcode: 'ITEM000006',
      category: {
        id: '',
        name: ''
      },
      name: '',
      price: '',
      unit: ''
    };
  };

  this.getProductById = function (id, callback) {
    this.product(function (items) {

      var item = _.find(items, function (product) {
        return product.id.toString() === id.toString();

      });
      callback(item);
    });

  };


  this.judgeIfHaveItems = function (id, callback) {
    this.product(function (items) {
      var result = true;
      _.forEach(items, function (item) {
        if (item.category.id === id) {
          result = false;
        }
      });
      callback(result);
    });
  };

  this.doUpdate = function (product, callback) {
    $http.put('/api/items/' + product.id, product)
      .success(function (data) {
        callback(data);
      });
  };

  this.addProduct = function (product, callback) {
    $http.post('/api/items', product)
      .success(function (data) {
        callback(data);
      });
  };
});
