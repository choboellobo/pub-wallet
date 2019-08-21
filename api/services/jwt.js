const jwt = require('jsonwebtoken');

module.exports = {
  sign(data = {} ) {
    return jwt.sign(data, process.env.JWT_SECRET || sails.config.JWT_SECRET, {expiresIn: 30 })
  },

  verify(token, cb) {
    jwt.verify(token, process.env.JWT_SECRET ||  sails.config.JWT_SECRET , cb)
  }
}
