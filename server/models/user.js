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

}

module.exports = User;
