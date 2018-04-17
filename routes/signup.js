const express = require('express')
const path = require('path')
const fs = require('fs')
const sha1 = require('sha1')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin
const userModel = require('../models/user')

// GET /signup 注册页
router.get('/', checkNotLogin, function (req, res, next) {
  res.render('signup', {
    title: 'signup'
  })
})

// POST /signup 用户注册
router.post('/', checkNotLogin, function (req, res, next) {
  // console.log(req.fields, '2222');
  console.log(req.files.avatar, 'file');
  
  const name = req.fields.name
  let password = req.fields.password
  const confirmPassword = req.fields.confirmPassword
  const bio = req.fields.bio
  const avatar = req.files.avatar.path.split(path.sep).pop()
  const gender = req.fields.gender
  
  try {
    if(!(name.length >=1 && name.length <= 10)) {
      throw new Error('名字请限制在1-10个字符')
    }
    /*if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('性别只能是 m、f 或 x')
    }
    if (!(bio.length >= 1 && bio.length <= 30)) {
      throw new Error('个人简介请限制在 1-30 个字符')
    }
    if (!req.fields.avatar) {
      throw new Error('缺少头像')
    }
    if (password.length < 6) {
      throw new Error('密码至少 6 个字符')
    }
    if (password !== confirmPassword) {
      throw new Error('两次输入密码不一致')
    }*/
  } catch (e) {
    if(fs.exists(req.files.avatar.path), () => {
      fs.unlink(req.files.avatar.path)
    })
    req.flash('error', e.message)
    return res.redirect('/signup')
  }
  
  password = sha1(password)
  
  let user = {
    name,
    password,
    gender,
    bio,
    avatar
  }
  
  userModel.create(user)
    .then(function (result) {
      user = result.ops[0]
      delete user.password
      req.session.user = user
      req.flash('success', '注册成功')
      res.redirect('/posts')
    })
    .catch(function (e) {
      if(fs.exists(req.files.avatar.path), () => {
        fs.unlink(req.files.avatar.path)
      })
      if(e.message.match('duplicate key')) {
        req.flash('error', '名字已被占用')
        return res.redirect('/signup')
      }
      next(e)
    })
})

module.exports = router
