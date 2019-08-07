const express = require('express');
const app = express();

const login = require('./routes/login');
const register = require('./routes/register');
const home = require('./routes/home');
const follow = require('./routes/follow');
// const info = require('./routes/info');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/login', login);
app.use('/api/register', register);
app.use('/api/home', home);
app.use('/api/follow', follow);
// app.use('/api/info', info);

app.listen(3000)

console.log('Listening at http://localhost:3000' + '\n')


