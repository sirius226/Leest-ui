'use strict';

/**
 * @ngdoc service
 * @name leestUiApp.todos
 * @description
 * # todos
 * Provider in the leestUiApp.
 */
angular.module('leestUiApp')
  .provider('Todo', function () {
    this.$get = ['$resource', function($resource) {
      var Todo = $resource( 'http://localhost:3000/api/todos/:id', {id: '@id'},
        {
          update: {
            method: 'PUT'
          },
          delete: {
            method: 'DELETE'
          }
        });
      return Todo;
    }];
  });
