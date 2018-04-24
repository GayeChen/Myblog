const Article = require('../lib/mongo').Article
const marked = require('marked')

const CommentModel = require('./comment')


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

Article.plugin('addCommentsCount', {
    afterFind: function (articles) {
        return Promise.all(articles.map(function (article) {
            return CommentModel.getCommentsCount(article._id).then(function (commentsCount) {
                article.commentsCount = commentsCount
                return article
            })
        }))
    },
    afterFindOne: function (article) {
        if(article) {
            return CommentModel.getCommentsCount(article._id).then(function (count) {
                article.commentsCount = count
                return article
            })
        }
        return article
    }
})

module.exports = {
    create: function (article) {
        return Article.create(article).exec()
    },
    getArticleById: function getArticleById (articleId) {
        return Article.findOne({_id: articleId}).populate({path: 'author', model: 'User'}).addCommentsCount().contentToHtml().exec()
    },
    getArticles: function getArticles (author) {
        const query = {}
        if(author) {
            query.author = author
        }
        return Article.find(query).populate({path: 'author', model: 'User'}).sort({id: -1}).addCreatedAt().addCommentsCount().contentToHtml().exec()
    },
    incPv: function incPv (articleId) {
        return Article
            .update({_id: articleId}, { $inc: { pv: 1}})
            .exec()
    },
    getRawArticleById: function (articleId) {
       return Article.findOne({_id: articleId}).populate({path: 'author', model: 'User'}).exec()
    },
    updatePostById: function (articleId, data) {
        return Article.update({_id: articleId}, {$set: data}).exec()
    },
    delArticleId: function (articleId) {
        return Article
            .deleteOne({_id: articleId})
            .exec()
            .then(function (res) {
                if(res.result.ok && res.result.n > 0) {
                    return CommentModel.delCommentsByArticleId(articleId)
                }
            })
    },
    getAllArticles: function getAllArticles () {
        const query = {}
        return Article.find(query).populate({path: 'author', model: 'User'}).sort({id: -1}).addCreatedAt().addCommentsCount().contentToHtml().exec()
    },
}