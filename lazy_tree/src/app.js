angular
  .module('lazyTree',['ui.tree'])
  .controller('TreeCtrl', function($scope, Data) {

    $scope.loadCompanies = function() {
      Data.getCompanies().then(function(companies) {
        $scope.companies = companies;
      });
    };

    $scope.loadNames = function(collapsed) {
      if(!collapsed) {
        Data.getNames().then(function(names) {
          $scope.names = names;
        });
      }
    };

    $scope.loadEmails = function(collapsed) {
      if(!collapsed) {
        Data.getEmails().then(function(emails) {
          $scope.emails = emails;
        });
      }
    };

    $scope.loadCompanies();
  })
  .factory('Data', function($q, $http) {

    return {
      getCompanies: getCompanies,
      getNames: getNames,
      getEmails: getEmails
    };

    function getCompanies() {
      var deferred = $q.defer();
      $http.jsonp('http://www.filltext.com/?callback=JSON_CALLBACK&rows=3&company={business}')
        .success(function(data) {
          deferred.resolve(data);
        });
      return deferred.promise;
    }

    function getNames() {
      var deferred = $q.defer();
      $http.jsonp('http://www.filltext.com/?callback=JSON_CALLBACK&rows=2&fullname={firstName}~{lastName}')
        .success(function(data) {
          deferred.resolve(data);
        });
      return deferred.promise;
    }

    function getEmails() {
      var deferred = $q.defer();
      $http.jsonp('http://www.filltext.com/?callback=JSON_CALLBACK&rows=1&email={email}')
        .success(function(data) {
          deferred.resolve(data);
        });
      return deferred.promise;
    }

  });