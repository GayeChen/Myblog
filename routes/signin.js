const express = require('express')
const router = express.Router()
const sha1 = require('sha1')

const UserModel = require('../models/user')
const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signin 登录页
router.get('/', checkNotLogin, function (req, res, next) {
  // res.render('user/signin')
  res.render('signin', {
    title: 'signin'
  })
})

// POST /signin 用户登录
router.post('/', checkNotLogin, function (req, res, next) {
  const name = req.fields.name
  const password = req.fields.password
  console.log(req.fields)
  try {
    if(!name.length) {
      throw new Error('请填写用户名')
    }
    
    if(!password.length) {
      throw new Error('请填写密码')
    }
  } catch (e) {
    req.flash('error', e.message)
  }
  
  UserModel.getUserByName(name)
    .then(function (user) {
      if(!user) {
        req.flash('error', '用户不存在')
        return res.redirect('back')
      }
      
      if(sha1(password) !== user.password) {
        req.flash('error', '用户名或密码错误')
      }
      
      req.flash('success', '登录成功')
      
      delete user.password
      req.session.user = user
      res.redirect('/article')
    })
    .catch(next)
})

module.exports = router
