const User = require('../lib/mongo').User

module.exports = {
  create: function (user) {
    return User.create(user).exec()
  }
}
