(function() {
  'use strict';

  angular.module('vizualize', [
    'ui.router',
  ]);

angular.module('vizualize').directive('autofocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
      });
    }
  }
}]);
})();
