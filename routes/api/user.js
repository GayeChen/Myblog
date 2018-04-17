const express = require('express')
const router = express.Router()

router.get('/user/:name', function (req, res) {
  res.send('user,' + req.params.name)
})

module.exports = router
