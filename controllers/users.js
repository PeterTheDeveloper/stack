const path = require('path');
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Direct The User
const getRegistrationPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'register.html'));
};

const getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'login.html'));
};

const getMainPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
};

const getTodoListPage = (req, res) => {
  res.sendFile(path.join('../views/todoList.html'));
  // res.render('/todoList', 'todoList.html')
};

const createUser = (req, res) => {
  const { name, email, plaintextPassword } = req.body;

  const saltRounds = 8;
  bcrypt.hash(plaintextPassword, saltRounds)
    .then((hashedPassword) => {
      User.addUser(name, email, hashedPassword);
    })
    .then(data => {
      res.send('User successfully created...');
      // res.sendFile(path.join(__dirname ,'../views' , 'todoList.html'))
      res.redirect('/todoList')
    })
    .catch((err) => {
      res.status(500).res.send(err)
    })
    
}

const login = () => {
  
}
    
module.exports = { getRegistrationPage, getLoginPage, getMainPage, createUser,  getTodoListPage}