const express = require('express');
const router = express.Router();

const User = require('../models/user');

//登录
router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //匹配失败，直接返回信息。成功，附加用户
    User.checkPassword(username, password).then(result => {
        return { result, username };
    })
        .then(({ result, username }) => {
            if (!result) {
                res.send({ success: result });
                return Promise.reject();
            }
            return Promise.all([User.selectUserByLoginName(username), Promise.resolve(result)])
        })
        .then(([user, result]) => {
            res.send({ success: result, user });
        })
        .catch(e => {})
})

module.exports = router;