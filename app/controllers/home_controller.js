(function() {
  'use strict';

  angular.module('vizualize').controller('HomeController', function($state) {
    var vm = this;

    var init = function() {
      vm.vizualize = function() {
        var stateToGo = vm.path ? 'presentationWithPath' : 'presentationWithConfig';

        if (!vm.user || !vm.repo) return;

        $state.go(stateToGo, {
          user: vm.user,
          repo: vm.repo,
          path: vm.path,
          page: 0
        }, {
          notify: true
        });
      }
    };

    init();
  });

})();
