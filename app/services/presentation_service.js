(function() {
  'use strict';

  angular.module('vizualize').service('AppServices', function($http, config) {
    this.github = function(user, repo, path) {
      var url = 'https://api.github.com/repos/' + user + '/' + repo + '/contents/' + path + '?access_token=' + config.access_token;
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
