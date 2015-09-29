'use strict';

/**
 * @ngdoc service
 * @name leestUiApp.todos
 * @description
 * # todos
 * Provider in the leestUiApp.
 */
angular.module('leestUiApp')
  .provider('Todos', function () {
    this.$get = ['$resource', function($resource) {
      var Todo = $resource( 'http://localhost:8080/api/todos/:id', {id: '@id'},
        {
          update: {
            method: 'PUT'
          },
        });
      return Todo;
    }];
  });
