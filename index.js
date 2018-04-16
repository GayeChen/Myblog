const path = require('path')
const express = require('express')
const app = express()
const indexRoute = require('./routes/index')
const userRoute = require('./routes/user')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

app.use('/', indexRoute)
app.use('/user', userRoute)

app.listen(3000)