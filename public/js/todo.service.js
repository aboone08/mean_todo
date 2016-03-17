angular.module('todoApp')
      .factory('TodoService', TodoService);

TodoService.$inject = ['$http'];

function TodoService($http){
  return {
    read: getAllTodos,
    create: createTodo,
    update: updateTodo,
    delete: deleteTodo
  }

  function getAllTodos(){
    return $http.get('/api/todos')
      .then(function(response){
        return response.data;
      });
  }

  function createTodo(todoObj){
    return $http.post('/api/todos', todoObj);
  }

  function updateTodo(id, todoObj){
    return $http.put('/api/todos/'+id, todoObj);
  }

  function deleteTodo(id){
    return $http.delete('/api/todos/'+id);
  }
}
