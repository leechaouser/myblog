const { TOKEN_SECRET, TOKEN_EXPIRESIN } = require('../config')
const jwt = require('jsonwebtoken')
const assert = require('http-assert')

exports.createToken = info => {
  const token = jwt.sign(info, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRESIN })
  return token
}

const decodeToken = (req, res) => {
  const token = String(req.headers.authorization || '')
    .split(' ')
    .pop()
  res.send({
    token,
    code: 401,
    message: '请先登录'
  })
  return jwt.decode(token)
}

exports.decodeToken = decodeToken

exports.checkAuth = (req, res) => {
  const { auth } = decodeToken(req, res)
  if (auth === 1) {
    return true
  } else {
    res.send({ code: 401, message: '您无权限进行此操作' })
    return false
  }
}
