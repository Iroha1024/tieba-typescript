const db = require('../db.js');
const getDate = require('../utils/getDate');

class User {
    constructor(user) {
        for (let key in user) {
            this[key] = user[key];
        }
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
                .then((user_id) => {
                    return user_id;
                })
    }

    //查询用户
    static selectUserByLoginName(login_name) {
        return db('user')
            .where('user.login_name', login_name)
            .select()
            .then(u => {
                u = u[0];
                if (!u) return;
                var user = new User({
                    id: u.id,
                    login_name: u.login_name,
                    name: u.name,
                    password: u.password,
                    sex: u.sex,
                    head_img: u.head_img,
                    register_time: u.register_time,
                });
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

    //关注
    static follow(ba_id, user_id) {
        return db('user_ba')
                .where('user_ba.ba_id', ba_id)
                .andWhere('user_ba.user_id', user_id)
                .select()
                .then(u => {
                    if (u.length) {
                        return Promise.resolve({ ba_id, user_id });
                    } else {
                        return Promise.reject({ ba_id, user_id });
                    }
                })
                //取消关注
                .then(({ ba_id, user_id }) => {
                    return db('user_ba')
                            .where('user_ba.ba_id', ba_id)
                            .andWhere('user_ba.user_id', user_id)
                            .del()
                })
                //若先无关注，则关注
                .catch((err) => {
                    return db('user_ba').insert({ ba_id, user_id, special: 0 });
                })
    }

    //特别关注
    static specialFollow(ba_id, user_id) {
        return db('user_ba')
                .where('user_ba.ba_id', ba_id)
                .andWhere('user_ba.user_id', user_id)
                .select()
                .then(u => {
                    if (u.length) {
                        return Promise.resolve({ ba_id, user_id });
                    } else {
                        return Promise.reject({ ba_id, user_id });
                    }
                })
                //特别关注
                .then(({ ba_id, user_id }) => {
                    return db.raw(`UPDATE user_ba SET special = ABS(special-1) WHERE user_id = ${user_id} AND ba_id = ${ba_id};`);
                })
                //若先无关注，则关注+特别关注
                .catch(({ ba_id, user_id }) => {
                    return db('user_ba').insert({ ba_id, user_id, special: 1});
                })
    }

    //根据id，查询用户
    static selectUserById(id) {
        return db('user')
                .where('user.id', '=', id)
                .select()
                .then(u => {
                    u = u[0];
                    let user = new User({
                        id: u.id,
                        name: u.name,
                        sex: u.sex,
                        head_img: u.head_img,
                    })
                    return user;
                })
    }

    //更新用户信息
    static updateUserInfo(id, name, sex, password) {
        return db('user')
                .where('id', id)
                .update({ name, sex, password })
                .then((user_id) => {
                    return user_id;
                })
    }

}

module.exports = User;
