const express = require('express');
const router = express.Router();

const User = require('../models/user');

//注册检测
router.get('/check_login_name/:name', (req, res) => {
    const name = req.params.name;
    User.checkLoginName(name).then(result => {
        res.send({ existed: result });
    })
})

//注册
router.post('/register_user', (req, res) => {
    const login_name = req.body.login_name;
    const password = req.body.password;
    Promise.all([User.insertUser(login_name, password), User.selectUserByLoginName(login_name)])
        .then(([user_id, user]) => {
            res.send({ success: true, user })
        })
})

module.exports = router;