const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Article = require('../models/article');

//根据用户id，获取user信息
router.get('/getUserInfo/:id', (req, res) => {
    const id = req.params.id;
    User.selectUserById(id).then(user => {
        res.send({ user });
    })
    .catch(() => {
        res.send({ error: true });
    })
})

//根据用户id，获取帖子
router.get('/getUserArticleList/:id', (req, res) => {
    const id = req.params.id;
    Article.selectArticleListById(id).then(article_list => {
        res.send({ article_list });
    })
})

//修改用户信息
router.post('/sendEditInfo', (req, res) => {
    const id = req.body.id;
    const login_name = req.body.login_name;
    const name = req.body.name;
    const sex = req.body.sex;
    const password = req.body.password;
    Promise.all([User.updateUserInfo(id, name, sex, password), User.selectUserByLoginName(login_name)])
    .then(([result, user]) => {
        console.log(user);
        res.send({ success: true, user });
    })
})

module.exports = router;