angular.module('vizualize').controller('PresentationController', function($state, $stateParams, AppServices) {

  var vm = this;

  var init = function() {
    if ($stateParams.source) vm.source = $stateParams.source;
    if ($stateParams.user) vm.user = $stateParams.user;
    if ($stateParams.repo) vm.repo = $stateParams.repo;
    if ($stateParams.path) vm.path = $stateParams.path.replace('+', '/');
    if (vm.source === 'bitbucket') getBitbucketData();
    if (vm.source === 'github') getGithubData();

  };

  var getGithubData = function() {
    AppServices.github(vm.user, vm.repo, vm.path).then(function(result) {
      vm.presentation = result;
      vm.isActive = 0;
      if ($stateParams.page) vm.isActive = parseFloat($stateParams.page);
    }).catch(function(result) {
    });
  };

  var getBitbucketData = function() {
    AppServices.bitbucket(vm.user, vm.repo, vm.path).then(function(result) {
      vm.presentation = result.files;
      vm.bitbucketUrl = 'https://bitbucket.org/' + vm.user + '/' + vm.repo + '/raw/master/';
      vm.isActive = 0;
      if ($stateParams.page) vm.isActive = parseFloat($stateParams.page);
    }).catch(function(result) {
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
    vm.isActive = key;
    vm.path = vm.path.replace('/', '+');
    $state.go('presentation', { user: vm.user, repo: vm.repo, path: vm.path, page: key }, { notify: false });
  };

  vm.toggleSidebar = function() {
    if (!vm.isCollapsed) {
      vm.isCollapsed = true;
    } else {
      vm.isCollapsed = false;
    }
  };

  init();
});
