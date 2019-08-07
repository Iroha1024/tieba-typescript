const express = require('express');
const router = express.Router();

const Ba = require('../models/ba');

//根据user_id，查询关注吧列表
router.get('/getBaList/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    Ba.selectBaListByUserId(user_id).then(ba_list => {
        res.send({ ba_list })
    })
})

module.exports = router;