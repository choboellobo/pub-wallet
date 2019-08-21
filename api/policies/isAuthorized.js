const responseNotAuth = (res) => {
  res.status(401).json({message: 'No authorized'})
}
module.exports = (req, res, next) => {
  if(req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ')
    let token;
    if(parts.length == 2) {
			var scheme = parts[0];
			var credentials = parts[1];

			if(/^Bearer$/i.test(scheme)) {
				token = credentials;
      }
      jwt.verify(token, (error, decoded) => {
        if(error) responseNotAuth(res)
        else {
          req.user = decoded
          next()
        }
      })
		}
  }else {
    responseNotAuth(res)
  }
}
