const express = require('express');
const router = express.Router();

const Article = require('../models/article');
const Reply = require('../models/reply');

//根据帖子id，查询帖子
router.get('/getArticle/:id', (req, res) => {
    const id = req.params.id;
    Article.selectArticleById(id).then(article => {
        res.send({ article });
    })
    .catch(() => {
        res.send({ error: true });
    })
})

//根据帖子id,查询回复
router.get('/getReplies/:id', (req, res) => {
    const id = req.params.id;
    Reply.selectRepliesById(id).then(replies_list => {
        res.send({ replies_list });
    })
})

//根据帖子id，查询最大楼层数
router.get('/getFloorId/:id', (req, res) => {
    const id = req.params.id;
    Reply.selectMaxFloorId(id).then(floor_id => {
        res.send({ floor_id });
    })
})

//添加回复
router.post('/reply', (req, res) => {
    const reply = req.body.reply;
    Reply.insertReply(reply).then(() => {
        res.send({ success: true })
    })
})

module.exports = router;