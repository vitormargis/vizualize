(function() {
  'use strict';

  angular.module('vizualize').controller('PresentationController', function($base64, $http, $window, $state, $stateParams, AppServices) {

    var vm = this;

    var init = function() {
      if ($stateParams.user) vm.user = $stateParams.user;
      if ($stateParams.repo) vm.repo = $stateParams.repo;
      if ($stateParams.path) vm.path = $stateParams.path.replace(/\+/g, '/');

      if (!$stateParams.page) {
        $state.go('presentationWithPath', {
          user: vm.user,
          repo: vm.repo,
          path: vm.path,
          page: 1
        });
      }

      if (!$stateParams.path) {
        AppServices.configFile(vm.user + '/' + vm.repo).then(function(result) {
          $state.go('presentationWithPath', {
            user: vm.user,
            repo: vm.repo,
            path: result.path,
            page: 1
          });
        });

        return
      }

      getGithubData(vm.user, vm.repo, vm.path);
    };

    var getGithubData = function(user, repo, path) {
      AppServices.github(user, repo, path).then(function(result) {
        vm.presentation = filterImages(result);
        formatSVG(result)
        vm.isActive = 1;
        if ($stateParams.page) vm.isActive = parseFloat($stateParams.page);
      }).catch(function(result) {
        alert(result);
      });
    };

    var filterImages = function(result) {
      return result.filter(function(item) {
        var url = item.download_url;
        return url.includes('.png') || url.includes('.jpg') || url.includes('.gif') || url.includes('.svg');
      });
    };

    vm.next = function(keyboard) {
      if (vm.presentation.length> vm.isActive) {
        vm.goToSlide(vm.isActive + 1, keyboard);
      }
    };

    vm.prev = function(keyboard) {
      if (vm.isActive > 0) {
        vm.goToSlide(vm.isActive - 1, keyboard);
      }
    };

    vm.goToSlide = function(key, scrollFollow) {
      if (key === 0) return;

      vm.activeAlement = document.getElementsByClassName('is-active')[0];
      vm.presentationNav = document.getElementsByClassName('presenter-nav')[0];
      if (scrollFollow)
        vm.presentationNav.scrollTop = vm.activeAlement.offsetTop - vm.activeAlement.scrollHeight;

      vm.isActive = key;
      vm.path = vm.path.replace('/', '+');
      $state.go('presentationWithPath', {
        user: vm.user,
        repo: vm.repo,
        path: vm.path,
        page: key
      }, {
        notify: false
      });
    };

    vm.toggleSidebar = function() {
      return vm.isCollapsed = !vm.isCollapsed;
    };

    vm.keyDown = function($event) {
      if ($event.keyCode === 39) {
        vm.next('scrollFollow');
      } else if ($event.keyCode === 37) {
        vm.prev('scrollFollow');
      } else if ($event.keyCode === 17) {
        vm.ctrl = true;
      } else if ($event.keyCode === 220 && vm.ctrl) {
        vm.toggleSidebar();
      }
    };

    vm.keyUp = function($event) {
      if ($event.keyCode === 17) {
        vm.ctrl = false;
      }
    }

    var formatSVG = function(result) {
      vm.presentation.filter(function(item) {
        $http.get(item.download_url).then(function(svg) {
          if (item.download_url.includes('svg')) {
            item.download_url = "data:image/svg+xml;base64," + $base64.encode(svg.data);
          }
        });
      });
    }

    init();
  });
})();
