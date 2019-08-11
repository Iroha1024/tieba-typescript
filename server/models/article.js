const db = require('../db.js');

class Article {
    constructor(user) {
        for (let key in user) {
            this[key] = user[key];
        }
    }

    //根据url，查询贴吧对应帖子
    static selectArticleListByUrl(url) {
        return db('article')
                .join('ba', 'article.ba_id', '=', 'ba.id')
                .where('ba.url', url)
                .select('*', 'article.id as a_id')
                .then(a => {
                    let article_list = [];
                    a.forEach(a => {
                        let article = new Article({
                            id: a.a_id,
                            title: a.title,
                            content: a.content,
                        })
                        article_list.push(article);
                    })
                    return article_list;
                })
    }

    //根据帖子id，查询帖子
    static selectArticleById(id) {
        return db('article')
            .join('user', 'article.user_id', '=', 'user.id')
            .where('article.id', id)
            .select()
            .then(a => {
                a = a[0];
                let article = new Article({
                    title: a.title,
                    content: a.content,
                    user_name: a.name,
                    user_img: a.head_img,
                    publish_time: a.publish_time,
                })
                return article;
            })
    }

    //查询推荐帖子
    static selectRecommendArticleList() {
        return Article.selectArticleListByUrl('recommend')
    }

    //查询特别关注吧的帖子
    static selecSpecialFollowArticleList(id_list) {
        let article_list = [];
        let sql;
        let sql2 = 'SELECT * FROM article  WHERE ba_id = ';
        let sql3 = ' OR ba_id = ';
        let sql4 = ' ORDER BY update_time DESC;';
        id_list.forEach((id, index) => {
            if (index === 0) {
                sql = sql2 + id;
            } else {
                sql += sql3 + id;
            }
        })
        sql += sql4; 
        return db.raw(sql)
                .then(a => {
                    a = a[0];
                    a.forEach(a => {
                        let article = new Article({
                            id: a.id,
                            title: a.title,
                            content: a.content,
                        })
                        article_list.push(article);
                    })
                    return article_list;
                })
    }

}

module.exports = Article;