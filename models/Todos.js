const db = require('../db');

class Todo {
  static addTodo(tite, description, dueDate, user_id) {
    const queryText = 'INSERT INTO todos ((tite, description, dueDate, user_id) VALUES ($1, $2, $3, $4);';
    return db.query(queryText, [tite, description, dueDate, user_id]);
  }

  static getAllUserTodos(user_Id) {
    const queryText = 'SELECT * FROM todos WHERE user_id = $1;';
    return db.query(queryText, [user_Id])
      .then((data) => data.rows);
  }

  static updateTodo(tite, description, dueDate, id) {
    const queryText = 'UPDATE todos SET title = $1, description = $2, due_date = $3 WHERE id = $4;';
    return db.query(queryText, [tite, description, dueDate, id])
      .then((data) => data.rows);
  }

  static deleteTodo(id) {
    const queryText = 'DELETE FROM todos WHERE id = $1';
    return db.query(queryText, [id]);
  }

  static completeTodo(id) {
    const queryText = 'UPDATE todos SET is_complete = TRUE WHERE id = $1;';
    return db.query(queryText, [id]);
  }
}

module.exports = Todo;