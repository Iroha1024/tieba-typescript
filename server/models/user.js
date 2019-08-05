const db = require('../db.js');
const getDate = require('../utils/getDate');

class User {
    constructor(user) {
        for (let key in user) {
            this[key] = user[key];
        }
        this.ba_follow_list = [];
    }

    //检测用户名是否重名
    static checkLoginName(login_name) {
        return db('user')
            .where('user.login_name', login_name)
            .select()
            .then(u => !!u[0])
    }

    //插入注册用户
    static insertUser(login_name, password) {
        let user = {
            login_name,
            name: login_name,
            password,
            register_time: getDate()
        }
        return db('user').insert(user)
    }

    //查询用户，若没有关注列表，则重新查询
    static selectUserByLoginName(login_name) {
        return db('user')
            .join('user_ba', 'user.id', '=', 'user_ba.user_id')
            .join('ba', 'ba.id', '=', 'user_ba.ba_id')
            .where('user.login_name', login_name)
            .select()
            .then(u => {
                var arr = u[0];
                if (!arr) return;
                var user = new User({
                    id: arr.id,
                    name: arr.name,
                    head_img: arr.head_img,
                });
                u.forEach(item => {
                    user.ba_follow_list.push({
                        id: item.id,
                        name: item.name,
                        url: item.url,
                        special: item.special,
                    })
                })
                return Promise.reject(user);
            })
            .then(() => {
                return db('user')
                    .where('user.login_name', login_name)
                    .select()
                    .then(u => {
                        u = u[0];
                        if (!u) return;
                        var user = new User({
                            id: arr.id,
                            name: arr.name,
                            head_img: arr.head_img,
                        });
                        return user;
                    })
            })
            .catch(user => {
                return user;
            })
    }     

    //验证密码
    static checkPassword(login_name, password) {
        return db('user')
                .where('user.login_name', login_name)
                .select()
                .then(u => {
                    u = u[0];
                    if (!u) return false;
                    return password === u.password;
                })
    }

}

module.exports = User;
