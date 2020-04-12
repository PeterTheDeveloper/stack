const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const todoRoute = require("./routes/todoRoute")
const todosController = require('./controllers/todos');
const userController = require('./controllers/users');

const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views', 'index.html'));
});

app.get('/register', userController.getRegistrationPage);
app.post('/register', userController.createUser);

app.get('/login', userController.getLoginPage);
app.get('/loginUser', userController.loginUser);

app.get('/todoList', userController.getTodoListPage);

app.get('/logout', userController.getMainPage);

app.use(todoRoute);

app.listen(port, () => console.log(`Listening on port ${port}.`));