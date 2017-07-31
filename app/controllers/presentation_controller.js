(function() {
  'use strict';

  angular.module('vizualize').controller('PresentationController', function($window, $state, $stateParams, AppServices) {

    var vm = this;

    var init = function() {
      $window.onfocus = function(){
        console.log($window);
      }

      if ($stateParams.user) vm.user = $stateParams.user;
      if ($stateParams.repo) vm.repo = $stateParams.repo;
      if ($stateParams.path) vm.path = $stateParams.path.replace('+', '/');

      if (!$stateParams.path) {
        AppServices.configFile(vm.user + '/' + vm.repo).then(function(result) {
          $state.go('presentationWithPath', {
            user: vm.user,
            repo: vm.repo,
            path: result.path,
            page: 0
          });
        });

        return
      }

      getGithubData(vm.user, vm.repo, vm.path);
    };

    var getGithubData = function(user, repo, path) {
      AppServices.github(user, repo, path).then(function(result) {
        vm.presentation = result;
        vm.isActive = 0;
        if ($stateParams.page) vm.isActive = parseFloat($stateParams.page);
      }).catch(function(result) {
        console.log(result);
      });
    };

    vm.next = function() {
      if (vm.presentation.length - 1 > vm.isActive) {
        vm.goToSlide(vm.isActive + 1);
      }
    };

    vm.prev = function() {
      if (vm.isActive > 0) {
        vm.goToSlide(vm.isActive - 1);
      }
    };

    vm.goToSlide = function(key) {
      vm.activeAlement = document.getElementsByClassName('is-active');
      vm.presentationNav = document.getElementsByClassName('presenter-nav')
      vm.presentationNav[0].scrollTop = vm.activeAlement[0].offsetTop - vm.activeAlement[0].scrollHeight;

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
        vm.next();
      } else if ($event.keyCode === 37) {
        vm.prev();
      } else if ($event.keyCode === 17) {
        vm.ctrl = true;
      } else if ($event.keyCode === 220 && vm.ctrl) {
        vm.toggleSidebar();
      }
    };

    vm.keyUp = function($event) {
      console.log($event.keyCode);
      if ($event.keyCode === 17) {
        vm.ctrl = false;
      }
    }



    vm.isImage = function(url) {
      var fileExtension = url.substr(url.length - 3);
      return fileExtension === 'png' || fileExtension === 'jpg'
    }

    init();
  });
})();
