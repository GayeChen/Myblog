module.exports = {
  port: 3000,
  session: {
    secret: 'myblog',
    key: 'myblog',
    // maxAge: 2592000000
    maxAge: 60000
  },
  mongodb: 'mongodb://localhost:27017/myblog'
}
