'use strict';

/**
 * @ngdoc overview
 * @name leestUiApp
 * @description
 * # leestUiApp
 *
 * Main module of the application.
 */
angular
  .module('leestUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'ng-token-auth'
  ])
  .config(function($authProvider) {
    $authProvider.configure({
      apiUrl:                'localhost:3000/api',
    });
  })
  .run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('auth:login-success', function() {
      $location.path('/');
    });
  }]);
