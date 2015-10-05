'use strict';

/**
 * @ngdoc function
 * @name leestUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the leestUiApp
 */
angular.module('leestUiApp')
  .controller('MainCtrl', ['$scope', '$log', '$q', '$http', '$filter', 'todos', 'Todo', function ($scope, $log, $q, $http, $filter, todos, Todo) {
    var vm = this;
    $log.debug(todos);
    vm.todos = $filter('orderBy')(todos.todos, '+order', false);
    $log.debug(vm.todos);
    vm.remainingCount = 1;
    vm.newTodo = {title: '', completed: false,  order:vm.todos.length};
    vm.allChecked = true;
    vm.editedTodo = {};

    vm.addTodo = function(){
      saveTodo(vm.newTodo).then(function(response){
        vm.todos.push(vm.newTodo);
        $log.debug(response);
        $log.debug(vm.todos);
        vm.newTodo = {title: '', completed: false, order:vm.todos.length};
      });
    };

    vm.mark = function(todo){
      updateTodo(todo).then(function(response){
        $log.debug(response);
        vm.editedTodo = {};
      })
    };

    vm.markAll = function(){
      $log.debug(vm.allChecked);
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/mark_all',
        data: {completed: !vm.allChecked}
      }).then(function successCallback(response) {
        $log.debug(response);
        vm.todos = $filter('orderBy')(response.data.todos, '+order', false);
      });

    };

    vm.editTodo = function(todo){
      vm.editedTodo = todo;
    };

    vm.doneEditing = function(todo){
      updateTodo(todo).then(function(response){
        $log.debug(response);
        vm.editedTodo = {};
      })
    };

    vm.removeTodo = function(todo){
      $log.debug(todo);
      deleteTodo(todo).then(function(response){
        $log.debug(response);
        var i = vm.todos.indexOf(todo);
        if (i !== -1){
          vm.todos.splice(i, 1);
        }
      });
    };

    var saveTodo = function(todo) {
      var defer = $q.defer();
      Todo.save({todo:todo}, function (response) {
        defer.resolve(response);
      });
      return defer.promise;
    };

    var updateTodo = function(todo) {
      var defer = $q.defer();
      Todo.update({todo:todo, id:todo.id}, function(response) {
        defer.resolve(response);
      });
      return defer.promise;
    };

    var deleteTodo = function(todo) {
      var defer = $q.defer();
      Todo.delete({todo:todo, id:todo.id}, function (response){
        defer.resolve(response);
      });
      return defer.promise;
    };

    $scope.sortableOptions = {
      stop: function(e, ui) {
        $log.debug("stop");
        // this callback has the changed model
        var orderList = [];
        for(var i in vm.todos){
          orderList.push(vm.todos[i].id);
        }
        $log.debug(orderList);
        $http({
          method: 'POST',
          url: 'http://localhost:3000/api/reorder',
          data: {orderList: orderList}
        }).then(function successCallback(response) {
          $log.debug(response);
        });
      }
    };

  }]);
