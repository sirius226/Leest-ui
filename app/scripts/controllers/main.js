'use strict';

/**
 * @ngdoc function
 * @name leestUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the leestUiApp
 */
angular.module('leestUiApp')
  .controller('MainCtrl', ['$scope', '$log', '$q', 'todos', 'Todo', function ($scope, $log, $q, todos, Todo) {
    var vm = this;
    $log.debug(todos)
    vm.todos = todos.todos
    vm.remainingCount = 1;
    vm.newTodo = {title: '', completed: false,  order:vm.todos.length};
    vm.allChecked = true;
    vm.editedTodo = {};

    vm.addTodo = function(){
      saveTodo(vm.newTodo).then(function(){
        vm.todos.push(vm.newTodo);
        $log.debug(vm.todos);
        vm.newTodo = {title: '', completed: false, order:vm.todos.length};
      });
    }

    vm.markAll = function(){
      for(var i in vm.todos){
        vm.todos[i].completed = vm.allChecked;
      }
      $log.debug(vm.allChecked);
    }

    vm.editTodo = function(todo){
      vm.editedTodo = todo;
    }

    vm.doneEditing = function(todo){
      $log.debug(todo);
      vm.editedTodo = {};
    };

    vm.removeTodo = function(todo){
      $log.debug(todo);
      var i = vm.todos.indexOf(todo);
      if (i != -1){
        vm.todos.splice(i, 1);
      }
    };

    var saveTodo = function(todo) {
      var defer = $q.defer();
      Todo.save({todo:todo}, function (response) {
        defer.resolve(response);
      });
      return defer.promise;
    };

  }]);
