const express = require('express')
const router = express.Router()
const ArticleModel = require('../models/article')

router.get('/', function (req, res, next) {
  ArticleModel.getAllArticles()
    .then(function (articles) {
      res.render('articles', {
        articles
      })
    })
    .catch(next)
})

module.exports = router
