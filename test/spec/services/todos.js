'use strict';

describe('Service: todos', function () {

  // instantiate service
  var todos,
    init = function () {
      inject(function (_todos_) {
        todos = _todos_;
      });
    };

  // load the service's module
  beforeEach(module('leestUiApp'));

  it('should do something', function () {
    init();

    expect(!!todos).toBe(true);
  });

  it('should be configurable', function () {
    module(function (todosProvider) {
      todosProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(todos.greet()).toEqual('Lorem ipsum');
  });

});
