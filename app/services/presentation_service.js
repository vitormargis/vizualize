(function() {
  'use strict';

  angular.module('vizualize').service('AppServices', function($http) {
    this.github = function(user, repo, path) {
      var url = 'https://api.github.com/repos/' + user + '/' + repo + '/contents/' + path + '?access_token=804ca13a630d73dcf5e5ebdaadc9b62476db80eb';
      return $http.get(url).then(function(result) {
        return result.data;
      });
    };

    this.configFile = function(path) {
      var url = 'https://raw.githubusercontent.com/' + path + '/master/.vizualize';
      return $http.get(url).then(function(result) {
        return result.data
      });
    };
  });
})();
