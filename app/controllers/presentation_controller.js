angular.module('vizualize').controller('PresentationController', function($state, $stateParams, AppServices) {

  var controller = this;

  var init = function() {
    if ($stateParams.source) controller.source = $stateParams.source;
    if ($stateParams.user) controller.user = $stateParams.user;
    if ($stateParams.repo) controller.repo = $stateParams.repo;
    if ($stateParams.path) controller.path = $stateParams.path.replace('+', '/');

    if (controller.source === 'bitbucket') getBitbucketData();
    if (controller.source === 'github') getGithubData();

  };

  var getGithubData = function() {
    AppServices.github(controller.user, controller.repo, controller.path).then(function(result) {
      controller.presentation = result;
      controller.isActive = 0;
      if ($stateParams.page) controller.isActive = parseFloat($stateParams.page);
    }).catch(function(result) {
    });
  };

  var getBitbucketData = function() {
    AppServices.bitbucket(controller.user, controller.repo, controller.path).then(function(result) {
      controller.presentation = result.files;
      controller.bitbucketUrl = 'https://bitbucket.org/' + controller.user + '/' + controller.repo + '/raw/master/';
      controller.isActive = 0;
      if ($stateParams.page) controller.isActive = parseFloat($stateParams.page);
    }).catch(function(result) {
    });
  };

  controller.next = function() {
    if (controller.presentation.length - 1 > controller.isActive) {
      controller.goToSlide(controller.isActive + 1);
    }
  };

  controller.prev = function() {
    if (controller.isActive > 0) {
      controller.goToSlide(controller.isActive - 1);
    }
  };

  controller.goToSlide = function(key) {
    controller.isActive = key;
    controller.path = controller.path.replace('/', '+');
    $state.go('presentation', { user: controller.user, repo: controller.repo, path: controller.path, page: key }, { notify: false });
  };

  controller.toggleSidebar = function() {
    if (!controller.isCollapsed) {
      controller.isCollapsed = true;
    } else {
      controller.isCollapsed = false;
    }
  };

  init();
});
