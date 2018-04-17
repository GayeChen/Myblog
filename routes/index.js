const express = require('express')
const router = express.Router()

// router.use('/', function (req, res) {
//   res.redirect('/posts')
// })

router.use('/api', require('./api'))
router.use('/user', require('./user'))

router.use('/signup', require('./signup'))
router.use('/signin', require('./signin'))
router.use('/signout', require('./signout'))
router.use('/posts', require('./posts'))
router.use('/comments', require('./comments'))

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
