var Todo = require('../models/todo.model.js');
var TodoCtrl = {
  getAll: getAllTodos,
  create: createTodo,
  update: updateTodo,
  delete: deleteTodo,
};


function getAllTodos(req, res){
  Todo.find(function(err, todos){
    if(err) throw err;

    res.json(todos);
  });
}

function createTodo(req, res){
  var desc = req.body.desc;
  var todoObj = {
    desc: desc,
    completed: false
  };
  Todo.create(todoObj, function(err, todo){
    if(err) throw err;

    res.json(todo);
  });
}

function updateTodo(req, res){
  var id = req.params.id;
  var desc = req.body.desc;
  var completed = req.body.completed;
  var update = {
    desc: desc,
    completed: completed
  };

  Todo.findOneAndUpdate({_id: id}, update, {new: true}, function(err, todo){
    if(err) throw err;

    res.json(todo);
  });
}

function deleteTodo(req, res){
  Todo.findOneAndRemove({_id: req.params.id}, function(err, todo){
    if(err) throw err;

    res.json(todo);
  });
}


module.exports = TodoCtrl;
