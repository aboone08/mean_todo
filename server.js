var express = require('express'),
    logger  = require('morgan')('dev'),
    path    = require('path'),
    mongoose = require('mongoose'),

    Schema = mongoose.Schema,
    bodyParser = require('body-parser'),
    server  = express(),
    Todo = require('./models/todo.model,js'),
    TodoCtrl = require('./controllers/todo.controller.js');

// create a connection to db
mongoose.connect('mongodb://localhost/todoApp');

var port = process.env.PORT || 9000;

server.use(express.static(path.join(__dirname,'public')));
server.use(logger);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));


server.get('/', function(req, res){
  res.sendFile('public/html/index.html', {root: __dirname});
});

server.get('/api/todos', TodoCtrl.getAll);
server.post('/api/todos', TodoCtrl.create);
server.put('/api/todos/:id', TodoCtrl.update);
server.delete('/api/todos/:id', TodoCtrl.delete);


server.listen(port, function(){
  console.log('Now listening on port ' + port);
});
