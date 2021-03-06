const express = require('express');
const app = express();

const login = require('./routes/login');
const register = require('./routes/register');
const home = require('./routes/home');
const follow = require('./routes/follow');
const ba = require('./routes/ba');
const article = require('./routes/article');
const search = require('./routes/search');
const info = require('./routes/info');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use('/api/login', login);
app.use('/api/register', register);
app.use('/api/home', home);
app.use('/api/follow', follow);
app.use('/api/ba', ba);
app.use('/api/article', article);
app.use('/api/search', search);
app.use('/api/info', info);

app.listen(3000)

console.log('Listening at http://localhost:3000' + '\n')


