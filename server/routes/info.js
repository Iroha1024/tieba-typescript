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

module.exports = router;