'use strict';

/**
 * @ngdoc function
 * @name leestUiApp.controller:UserSessionsCtrl
 * @description
 * # UserSessionsCtrl
 * Controller of the leestUiApp
 */
angular.module('leestUiApp')
  .controller('UserSessionsCtrl', ['$scope', function ($scope){
    $scope.$on('auth:login-error', function(ev, reason) {
      $scope.error = reason.errors[0];
    });
  }]);
