'use strict';

/**
 * @ngdoc function
 * @name leestUiApp.controller:UserRegistrationsCtrl
 * @description
 * # UserRegistrationsCtrl
 * Controller of the leestUiApp
 */
angular.module('leestUiApp')
  .controller('UserRegistrationsCtrl', ['$scope', '$location', '$auth', function ($scope, $location, $auth) {
    $scope.handleRegBtnClick = function() {
      $scope.$on('auth:registration-email-error', function(ev, reason) {
        console.log(reason.errors);
        $scope.errors = reason.errors.full_messages
      });
      $auth.submitRegistration($scope.registrationForm)
        .then(function() {
          $auth.submitLogin({
            email: $scope.registrationForm.email,
            password: $scope.registrationForm.password
          });
        });
    };
  }]);
