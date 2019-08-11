const db = require('../db.js');
const getDatetime = require('../utils/getDatetime');

class Reply {
    constructor(user) {
        for (let key in user) {
            this[key] = user[key];
        }
    }

    //根据帖子id，查询回复
    static selectRepliesById(id) {
        return db('reply')
            .join('user', 'reply.user_id', '=', 'user.id')
            .where('reply.a_id', id)
            .orderBy('floor_id')
            .orderBy('reply_time')
            .select()
            .then(r => {
                let replies_list = [];
                r.forEach(r => {
                    let reply = new Reply({
                        user_id: r.user_id,
                        user_name: r.name,
                        head_img: r.head_img,
                        content: r.content,
                        floor_id: r.floor_id,
                        is_owner: Boolean(r.is_owner),
                        target: r.target,
                        target_name: r.target_name,
                        reply_time: r.reply_time,
                    })
                    replies_list.push(reply);
                })
                return replies_list;
            })
    }

    //添加回复
    static insertReply(reply) {
        reply.reply_time = getDatetime();
        return db('reply').insert(reply)
    }

    //根据帖子id，获取最大楼层数,若无，则返回1（楼）
    static selectMaxFloorId(id) {
        return db('reply')
                .max('floor_id as floor_id')
                .where('reply.a_id', id)
                .then(r => {
                    r = r[0];
                    if(!r.floor_id) return  1;
                    return r.floor_id;
                })
    }
}

module.exports = Reply;