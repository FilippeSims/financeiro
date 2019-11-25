const jwt = require('jwt-simple')
const config = require('./config')

const tokenForUser = (user) => {
    const timestamp = new Date().getTime()
    return jwt.encode({sub: user.id, iat: timestamp}, config.secretOrKey)
}

const singin = (req, res, next) => {
    res.send({ token: tokenForUser(req.user) })
}

module.exports = { singin }