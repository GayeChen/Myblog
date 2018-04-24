const marked = require('marked')
const Comment = require('../lib/mongo').Comment

Comment.plugin('contentToHtml', {
  afterFind: function (comments) {
    return comments.map(function (comment) {
      comment.content = marked(comment.content)
      return comment
    })
  }
})

module.exports = {
  create: function (comment) {
    return Comment.create(comment).exec()
  },
  getCommentById: function (commentId) {
    return Comment.findOne({_id: commentId}).exec()
  },
  delCommentById: function (commentId) {
    return Comment.deleteOne({_id: commentId}).exec()
  },
  delCommentsByArticleId: function (articleId) {
    return Comment.deleteMany({articleId}).exec()
  },
  getComments: function (articleId) {
    return Comment.find({articleId}).populate({path: 'author', model: 'User'}).sort({_id: 1}).contentToHtml().exec()
  },
  getCommentsCount: function (articleId) {
    return Comment.count({articleId}).exec()
  }
}
