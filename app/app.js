(function() {
  'use strict';

  angular.module('vizualize', [
    'ui.router',
    'base64'
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
