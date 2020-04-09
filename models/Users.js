const bcrypt = require('bcrypt');
const db = require('../db');

class User {
    static addUser(name, email, password) {
        const queryText = `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3);`;
        console.log(db.query(queryText, [name, email, password]))
        return db.query(queryText, [name, email, password]);
    }

    static getByEmail(email) {
        const queryText = 'SELECT * FROM users WHERE email = $1;';
        return db.query(queryText, [email])
            .then((data) => console.log(data.rows[0]));
    }
    static getTodos(user_id) {
        const queryText = `SELECT todos.title, todos.description, todos.due_date, todos.is_complete                                            
    FROM todos WHERE id = $1;`;
        return db.query(queryText, [user_Id])
            .then((data) => data.rows);
    }
    static updateUser(user_id, name, email ,password) {
      const queryText = `UPDATE todos SET name = $2, email = $3, password = $4
      WHERE id = $1`
    }

    static encryption() {
       
    }
}

// User.addUser('Peter JSON', 'p.rose2015@gmail.com', 'peterjr');
// User.getByEmail('Reuben@gmail.com')

module.exports = User;