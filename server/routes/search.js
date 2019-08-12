const express = require('express');
const router = express.Router();

const Article = require('../models/article');
const Ba = require('../models/ba');

router.get('/:keyword', (req, res) => {
    const keyword = req.params.keyword;
    Promise.all([Article.fuzzyQuery(keyword), Ba.fuzzyQuery(keyword)])
    .then(([article_list, ba_list]) => {
        res.send({ article_list, ba_list });
    });
})

module.exports = router;