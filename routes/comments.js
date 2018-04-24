const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin
const CommentModel = require('../models/comment')


// POST /comments 创建一条留言
router.post('/', checkLogin, function (req, res, next) {
  const author = req.session.user._id
  const articleId = req.fields.articleId
  const content = req.fields.content
  
  try {
    if(!content.length) {
      throw new Error('请填写留言内容')
    }
  } catch (e) {
    req.flash('error', e.message)
  }
  const comment = {
    author,
    articleId,
    content,
  }
  CommentModel.create(comment)
    .then(function () {
      req.flash('success', '留言成功')
      res.redirect('back')
    })
    .catch(next)
})

// GET /comments/:commentId/remove 删除一条留言
router.get('/:commentId/remove', checkLogin, function (req, res, next) {
  const commentId = req.params.commentId;
  const author = req.session.user._id;
  
  CommentModel.delCommentById(commentId)
    .then(function () {
      req.flash('success', '删除留言成功');
      res.redirect('back')
    })
    .catch(next)
})

module.exports = router
