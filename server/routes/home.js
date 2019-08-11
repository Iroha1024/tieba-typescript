const express = require('express');
const router = express.Router();

const Article = require('../models/article');

//查询推荐帖子
router.get('/getRecommendArticleList', (req, res) => {
    Article.selectRecommendArticleList().then(article_list => {
        res.send({ article_list });
    })
})

//查询推荐帖子
router.post('/getSpecialFollowArticleList', (req, res) => {
    const id_list = req.body.id_list;
    Article.selecSpecialFollowArticleList(id_list).then(article_list => {
        res.send({ article_list });
    })
})
module.exports = router;