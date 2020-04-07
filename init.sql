CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(15),
    password varchar(15)
);
    
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title varchar(20),
    description varchar(50),
    dueDate DATE,
    user_id integer
);

INSERT INTO users(username, password) VALUES ('peter', 'marcylabschool');

INSERT INTO todos(title, description, dueDate, user_id) VALUES ('Clean Your Room.', 'Vacuum, the floor & shit',TO_DATE('07/04/2020', 'DD/MM/YYYY'), 1);
INSERT INTO todos(title, description, dueDate, user_id) VALUES ('Do Homework.', 'Complete Problem Set & shit',TO_DATE('07/05/2020', 'DD/MM/YYYY'), 1);


-- SELECT * FROM todos WHERE todos.user_id = 1;