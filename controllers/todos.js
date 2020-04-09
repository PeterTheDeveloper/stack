const path = require('path');
const Todo = require("../models/Todos");

const createTodo = async(res, req) => {
  try {
    const {
      userId,
      name,
      description,
      dueDate,
    } = req.body;
    await Todo.addTodo(title, description, description, dueDate);
    res.redirect('/todoList');
  } catch (err) {
    res.status(500).json({
      error: 'Internal Server Error: Could not create todos. Please try again.'
    });
  }
}

const deleteTodo = (res, req) => {
    
}

const updateTodo = (res, req) => {
    
}

const completeTodo = (res, req) => {
    
}