const jwt = require('jsonwebtoken');
module.exports = {
  sign(data = {} ) {
    return jwt.sign(data, process.env.JWT_SECRET || sails.config.JWT_SECRET, {expiresIn: '30d' })
  },

  verify(token, cb) {
    jwt.verify(token, process.env.JWT_SECRET ||  sails.config.JWT_SECRET , cb)
  }
}
