/* eslint-disable no-unused-vars */
const {request, response} = require('express');
const express = require('express');
const app = express();
const csrf = require('tiny-csrf');

const {Todo} = require('./models');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({extended: false}));
const path = require('path');

app.use(bodyParser.json());
app.use(cookieParser('ssh!!!! some secret string'));
app.use(csrf('this_should_be_32_character_long', ['POST', 'PUT', 'DELETE']));
app.set('view engine', 'ejs');

app.get('/', async (request, response)=>{
  const all_Todos = await Todo.getTodos();
  const over_due = await Todo.overdue();
  const due_Today = await Todo.dueToday();
  const due_Later = await Todo.dueLater();
  const completed_Items = await Todo.completedItems();
  if (request.accepts('html')) {
    response.render('index', {
      all_Todos, over_due, due_Today, due_Later, completed_Items,
      csrfToken: request.csrfToken(),
    });
  } else {
    response.json({all_Todos, over_due, due_Today, due_Later});
  }
});
app.use(express.static(path.join(__dirname, 'public')));

app.get('/todos', (request, response)=>{
  console.log('Todo List', request.body);
});
app.post('/todos', async (request, response)=>{
  console.log('Todo List');
  try {
    console.log('entering in try block');
    const todo =await Todo.addTodo({
      title: request.body.title, dueDate: request.body.dueDate,
    });
    return response.redirect('/');
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});
app.delete('/todos/:id', async (request, response)=> {
  console.log('Delete Item from a Todo table with ID Item: ', request.params.id);
  const deleteFlag = await Todo.destroy({where: {id: request.params.id}});
  response.send(deleteFlag ? true : false);
  //try {
   // await todo.remove(request.params.id);
   // return response.json({success:true});
  //} catch (error) {
  //  return response.status(422).json(error);
 // }
  });

app.put('/todos/:id', async (request, response) => {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const upTodo = await todo.setCompletionStatus(request.body.completed);
    return response.json(upTodo);
  } catch (error) {
    return response.status(422).json(error);
  }
});
module.exports = app;