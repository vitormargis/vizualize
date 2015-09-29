(function() {
  'use strict';

  angular.module('vizualize', [
    'ui.router',
  ]);

  angular.module('vizualize').constant('SiteConfig', {
    title: 'Vizualize',
    itensPerPage: 12,
  });

  angular.module('vizualize').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('');
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: '/templates/index.html',
        controller: 'PresentationController',
        controllerAs: 'presentationController',
      })
      .state('presentation', {
        url: '/:source/:user/:repo/:path/:page',
        templateUrl: '/templates/index.html',
        controller: 'PresentationController',
        controllerAs: 'presentationController',
      });
  });

  angular.module('vizualize').service('AppServices', function($http) {
    this.github = function(user, repo, path) {
      var url = 'https://api.github.com/repos/' + user + '/' + repo + '/contents/' + path;
      return $http.get(url).then(function(result) {
        return result.data;
      });
    };

    this.bitbucket = function(user, repo, path) {
      var url = 'https://api.bitbucket.org/1.0/repositories/' + user + '/' + repo + '/src/master/' + path + '?callback=?';
      return $http.get(url).then(function(result) {
        return result.data;
      });
    };

    this.configFile = function(user, repo) {
      var bitBucketUrl = 'https://api.bitbucket.org/1.0/repositories/margis/vizualize/src/master/.vizualize?callback=?';
      var githubUrl = 'https://api.bitbucket.org/1.0/repositories/margis/vizualize/src/master/.vizualize?callback=?';
      var url = bitBucketUrl;
      return $http.get(url).then(function(result) {
        return result.data.data;
      });
    };
  });
})();
