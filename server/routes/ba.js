const express = require('express');
const router = express.Router();

const Ba = require('../models/ba');
const User = require('../models/user');

//根据ba_id，查询吧信息
router.get('/getBaInfo/:url', (req, res) => {
    const url = req.params.url;
    Ba.selectBaByUrl(url).then(ba => {
        res.send({ ba })
    })
})

//关注
router.get('/follow', (req, res) => {
    let ba_id = req.query.ba_id;
    let user_id = req.query.user_id;
    User.follow(ba_id, user_id).then(u => {
        res.send({ success: true });
    })
})

//特别关注
router.get('/specialFollow', (req, res) => {
    let ba_id = req.query.ba_id;
    let user_id = req.query.user_id;
    User.specialFollow(ba_id, user_id).then(u => {
        res.send({ success: true });
    })
})

module.exports = router;