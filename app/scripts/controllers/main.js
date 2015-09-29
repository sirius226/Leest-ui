'use strict';

/**
 * @ngdoc function
 * @name leestUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the leestUiApp
 */
angular.module('leestUiApp')
  .controller('MainCtrl', ['$scope', '$log', function ($scope, $log) {
    var vm = this;
    vm.todos = [{title:'Angular', completed: false}, {title:'HTML', completed:true}, {title: 'CSS', completed:true}, {title:'Javascript', completed: false}]
    vm.remainingCount = 1;
    vm.newTodo = {title: '', completed: false};
    vm.allChecked = true;
    vm.editedTodo = {};

    vm.addTodo = function(){
      vm.todos.push(vm.newTodo);
      $log.debug(vm.todos);
      vm.newTodo = {title: '', completed: false};
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
    }

    vm.removeTodo = function(todo){
      $log.debug(todo);
      var i = vm.todos.indexOf(todo);
      if (i != -1){
        vm.todos.splice(i, 1);
      }
    }

  }]);
