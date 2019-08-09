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
                .select()
                .then(a => {
                    let article_list = [];
                    a.forEach(a => {
                        let article = new Article({
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