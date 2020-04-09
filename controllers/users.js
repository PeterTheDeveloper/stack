const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser =require("cookie-parser")
const User = require('../models/Users');

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
  const {
    name,
    email,
    plaintextPassword,
  } = req.body;

  const saltRounds = 8;
  bcrypt.hash(plaintextPassword, saltRounds)
    .then((hashedPassword) => {
      User.addUser(name, email, hashedPassword);
    }).then(res.send('User successfully created...', 'todoList.html'))
    .catch((err) => res.status(500).send(err));
};

const loginUser = async(req, res) => {

  const {
    email,
    password
  } = req.body;

// Verify email exists
  try {
    const user = await User.getByEmail(email); // Returns table data in obj

    if (!user) {
      return res.send('User not found.');
    }
// Verify Password
    const isValid = await bcrypt.compare(password, user.password); // return True/False

    if (!isValid) {
      return res.send('Incorrect password.');
    }

    const payload = {
      email,
      hashedPassword: user.password
    };

    jwt.sign(payload, 'secret', (err, hashedPayload) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      console.log('JWT: ', hashedPayload);
      res.cookie('LoginToken', hashedPayload).send('Logged in!');
    });
  } catch (err) {
      console.log(err);
      return res.send(err);
  }
};

module.exports = {
  getRegistrationPage,
  getLoginPage,
  getMainPage,
  createUser,
  loginUser,
  getTodoListPage
};