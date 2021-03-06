angular.module('leestUiApp')
.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve:{
          todos: function (Todo) {
            return Todo.get().$promise;
          }
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/sign_up',{
        templateUrl: 'views/sign_up.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
