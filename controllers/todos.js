const path = require('path');
const Todo = require('../models/Todos');

const createTodo = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      due_date,
    } = req.body;
    await Todo.addTodo(id, title, description, due_date);
    res.redirect('/todoList');
  } catch (err) {
    res.status(500).json({ error: 'Todo failed to create. Please try again.' });
  }
};

const getTodos = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await Todo.getTodosById(id);
    if (data.length === 0) {
      return res.json('You\'e up to date!');
    }
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Server failed to fetch todos.' });
  }
};

const updateTodo = async (req, res) => {
  const { todo } = req.params;
  const { name, description, dueDate } = req.body;
  try {
    await Todo.updateTask(task, name, description, dueDate);
    return res.redirect('/todoList');
  } catch (err) {
    return res.status(500).json({ error: 'Server failed to update todo.' });
  }
};

// createTodo();

// const deleteTodo = (req, res) => {
//   const { task } = req.params;
//   const { userId } = req.body;
//   Todo.deleteTask(task, userId)
//     .then(() => res.status(204).json({ message: 'Task successfully deleted.' }))
//     .then(() => res.redirect('/home'))
//     .catch(() => res.status(500).json({ error: 'Internal Server Error: Task could not be deleted.' }));
// };

// const completeTodo = (req, res) => {
//   const { task } = req.params;
//   const { userId, completed } = req.body;
//   Todo.isCompleted(task, userId, completed)
//     .then((data) => res.json(data.rows[0]))
//     .catch(() => res.status(500).json({ error: 'Internal Server Error: Could not set task as completed.' }));
// };

const getCreateTodoPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'createTodo.html'));
};

const getUpdateTodo = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'updateTask.html'));
};


module.exports = {
  // createTodo,
  // getTodos,
  // updateTodo,
  // deleteTodo,
  // completeTodo,
  getCreateTodoPage,
  getUpdateTodo,
};