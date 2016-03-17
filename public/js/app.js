angular.module('todoApp', [

]); //this is the setter syntax, you are creating an application using this one


angular.module('todoApp') //this is the getter syntax, we can use this so we don't have to make a variable to store our angular application; YAYYY no globals
      .controller('TodoController', TodoController);

TodoController.$inject = ['$scope', '$http', 'TodoService'];

function TodoController($scope, $http, TodoService){
  getTodos();
  $scope.isEditing = false;


  // Create(post) a new todo
  $scope.saveTodo = function(todo){
    TodoService.create($scope.newTodo)
      .then(function(){
        $scope.newTodo = {};
        getTodos();
      })
      .catch(function(err){
      });
    }

  // Delete todo
  $scope.deleteTodo = function(todo){
    TodoService.delete(todo._id)
      .then(function(){
        getTodos();
      })
      .catch(function(err){
      });
  }

  // Edit/Update(put) todo
  $scope.editTodo = function(todo){
    $scope.isEditing = !$scope.isEditing;
    $scope.editingTodo = todo;
  }

  $scope.updateTodo = function(todo){
    TodoService.update(todo._id, todo)
      .then(function(){
        getTodos();
        $scope.isEditing = false
      })
      .catch(function(err){
      });
  }

  function getTodos(){
    TodoService.read()
    .then(function(response){
      $scope.todos = response;
    });
  }

  // Move up todo
  $scope.moveUp = function(todo){
    var index = $scope.todos.indexOf(todo);
    $scope.todos.splice(index, 1);
    $scope.todos.splice(index-1, 0, todo);
  }
}
