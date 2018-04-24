const Article = require('../lib/mongo').Article
const marked = require('marked')

Article.plugin('contentToHtml', {
    afterFind: function (articles) {
        return articles.map(function (article) {
            article.content = marked(article.content)
            return article
        })
    },
    afterFindOne: function (article) {
        if(article) {
            article.content = marked(article.content)
        }
        return article
    }
})

module.exports = {
    create: function (article) {
        return Article.create(article).exec()
    },
    getArticleById: function getArticleById (articleId) {
        return Article.findOne({_id: articleId}).populate({path: 'author', model: 'User'}).contentToHtml().exec()
    },
    getArticles: function getArticles (author) {
        const query = {}
        if(author) {
            query.author = author
        }
        return Article.find(query).populate({path: 'author', model: 'User'}).sort({id: -1}).addCreatedAt().contentToHtml().exec()
    },
    incPv: function incPv (articleId) {
        return Article
            .update({_id: articleId}, { $inc: { pv: 1}})
            .exec()
    }
}