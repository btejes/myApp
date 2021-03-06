angular.module('starter').factory('transactions', ['$http', '$q', '$filter', function($http, $q, $filter) {

  var transactionsPromise = $q.defer();

  var service = {
    getTransactions: function() {
      return $http.get('js/transactions.json');
    },
    getTransactionsByCategory: function(categoryId) {
      var deferred = $q.defer();

      this.getTransactions().success(function(data) {
        var updatedData = $filter('filter')(data,{category_id:categoryId});
        deferred.resolve(updatedData);
      });

      return deferred.promise;
    },
    addTransaction: function(item) {
      this.getTransactions().success(function(data) {
        data.push(item);
        transactionsPromise.resolve(data);
      });
      return transactionsPromise.promise;
    }
  };

  return service;

}]);

angular.module('starter').factory('categories', ['$http', function($http) {

  var service = {
    getCategories: function() {
      return $http.get('js/categories.json');
    }
  };

  return service;

}]);
