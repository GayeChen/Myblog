const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.redirect('/article')
})

router.use('/api', require('./api'))
// router.use('/user', require('./user'))

router.use('/signup', require('./signup'))
router.use('/signin', require('./signin'))
router.use('/signout', require('./signout'))
router.use('/article', require('./article'))
router.use('/square', require('./square'))

router.use('/comments', require('./comments'))

// 404 page
router.use(function (req, res) {
  if (!res.headersSent) {
    res.status(404).render('404')
  }
})

router.use(function (err, req, res, next) {
  console.log(err);
  req.flash('error', err.message)
  res.redirect('/article')
})



module.exports = router

// module.exports = function (app) {
//   // app.get('/api', require('./api'))
//   // app.use('/user', require('./user'))
//
//   app.get('/', function (req, res) {
//     res.redirect('/posts')
//   })
//   app.use('/signup', require('./signup'))
//   app.use('/signin', require('./signin'))
//   app.use('/signout', require('./signout'))
//   app.use('/posts', require('./posts'))
//   app.use('/comments', require('./comments'))
// }
