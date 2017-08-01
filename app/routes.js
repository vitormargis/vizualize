(function() {
  'use strict';

  angular.module('vizualize').config(function($stateProvider, $urlRouterProvider, $locationProvider ) {
    $urlRouterProvider.otherwise('');
    $locationProvider.html5Mode(true);
    // $urlRouterProvider.rule(function ($injector, $location) {
    //   var path = $location.url();
    //
    //   if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) return;
    //   if (path.indexOf('?') > -1) return path.replace('?', '/?');
    //
    //   return path + '/';
    // });

    $stateProvider
      .state('home', {
        url: '',
        templateUrl: '/templates/home.html',
        controller: 'HomeController',
        controllerAs: 'homeController',
      })
      .state('presentationWithConfig', {
        url: '/:user/:repo',
        templateUrl: '/templates/presentation.html',
        controller: 'PresentationController',
        controllerAs: 'presentationController',
      })
      .state('presentationWithPath', {
        url: '/:user/:repo/:path/:page',
        templateUrl: '/templates/presentation.html',
        controller: 'PresentationController',
        controllerAs: 'presentationController',
      });
  });
})();
