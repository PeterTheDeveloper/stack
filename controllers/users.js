const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
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
  res.sendFile(path.join(__dirname, '../views', 'todoList.html'));
  // res.render('/todoList', 'todoList.html')
};

const createUser = (req, res) => {
  const { name, email, password } = req.body;

  const saltRounds = 8; // 10
  bcrypt.hash(password, saltRounds)
    .then((hashedPassword) => {
      User.addUser(name, email, hashedPassword);
      return jwt.sign({
        name,
        email,
        password,
        exp: Math.floor(Date.now() / 1000) + (15 * 60), // 1 Hour expiration
      }, 'Do Not Open', (err, encryptedPayload) => {
        res.cookie('userToken', encryptedPayload, { httpOnly: true });
        res.redirect('/todoList');
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(403).send('User not found.');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.send('incorrect password');
    }

    const payload = { email, password, expiresIn: '1h' };

    return jwt.sign(payload, 'secret', (err, hashedPayload) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
    });

    return res.cookies('userToken', hashedPayload).send('You\'ve Logged in!');
  } catch (err) {
    return res.send(err);
  }
};

const verify = async (req, res, next) => {
  console.log('veryify middleware is running...');
  // 1. Check if they have fakeAppToken
  // 2. Verify that their fake app token username and password match
  // 3. If so, next()
  // 4. If not, denied

  if (!req.cookies.fakeAppToken) {
    return res.status(401).send('Cookie not present.');
  }

  try {
    const user = jwt.verify(req.cookies.fakeAppToken, 'secret');

    const { email, hashedPassword } = user;

    const searchedUser = await User.getByEmail(email);

    if (!searchedUser) {
      return res.status(401).sllend('Unauthorized user.');
    }

    if (hashedPassword === searchedUser.password) {
      return next();
    }

    return res.status(401).send('Unauthorized user.');
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const logout = (req, res) => {
  res.clearCookie('userToken');
  res.redirect('/');
};

module.exports = {
  getRegistrationPage,
  getLoginPage,
  getMainPage,
  createUser,
  loginUser,
  getTodoListPage,
  logout,
};
