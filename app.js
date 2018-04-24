const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const formidable = require('express-formidable')
// const routes = require('./routes')
const pkg = require('./package')

const app = express()

const isProduction = process.env.NODE_ENV === 'production'

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: config.session.maxAge
  },
  store: new MongoStore({
    url: config.mongodb
  })
}))

app.use(flash())

app.use(formidable({
  // // uploadDir: path.join(__dirname, 'uploads'),
  uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
  keepExtensions: true// 保留后缀
}))

// 设置模板全局常量
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
}

// 添加模板必需的三个变量
app.use(function (req, res, next) {
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  res.locals.info = req.flash('info').toString()
  next()
})

app.use(require('./routes'))
// routes(app)


/*/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({'errors': {
        message: err.message,
        error: err
      }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
      message: err.message,
      error: {}
    }});
});*/

if (module.parent) {
  module.exports = app
} else {
  const server = app.listen(config.port, function (err) {
    console.log(`${pkg.name} listenning on port ${server.address().port}`);
  })
}
