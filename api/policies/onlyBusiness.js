module.exports = (req, res, next) => {
  if(req.user.model == 'business') next();
  else res.status(401).json({ message: 'Not authorizated' })
}
