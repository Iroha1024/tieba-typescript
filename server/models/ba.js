const db = require('../db.js');

class Ba {
    constructor(user) {
        for (let key in user) {
            this[key] = user[key];
        }
    }

    //根据user_id，查询关注吧列表
    static selectBaListByUserId(user_id) {
        return db('user')
            .join('user_ba', 'user.id', '=', 'user_ba.user_id')
            .join('ba', 'ba.id', '=', 'user_ba.ba_id')
            .where('user.id', user_id)
            .select('*', 'user.name as user_name')
            .then(b => {
                if (b === []) return b;
                let ba_list = [];
                b.forEach(b => {
                    let ba = new Ba({
                        id: b.id,
                        name: b.name,
                        url: b.url,
                        img: b.img,
                        special: Boolean(b.special),
                    })
                    ba_list.push(ba);
                })
                return ba_list;
            })
    }

    //根据url，查询吧信息
    static selectBaByUrl(url) {
        return db('ba')
            .where('ba.url', url)
            .select()
            .then(b => {
                b = b[0];
                let ba = new Ba({
                    id: b.id,
                    name: b.name,
                    url: b.url,
                    img: b.img,
                    bg_img: b.bg_img
                })
                return ba;
            })
    }

    //模糊查询贴吧
    static fuzzyQuery(keyword) {
        return db.raw(`SELECT * FROM ba WHERE POSITION('${keyword}' IN NAME)`)
                .then(b => {
                    b = b[0];
                    if (!b.length) return [];
                    let ba_list = [];
                    b.forEach(b => {
                        let ba = new Ba({
                            name: b.name,
                            url: b.url,
                            img: b.img,
                        })
                        ba_list.push(ba);
                    })
                    return ba_list;
                })
    }

}

module.exports = Ba;
