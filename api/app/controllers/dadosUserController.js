var db = require('../pg/config')

function dadosUsuario(n, callback) {
    db.pool.query(`SELECT * FROM usuarios WHERE nusuario = '${n}' `, function (err, res) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rows)
        }
    })
}

exports.get = (req, res) => {
    const n = req.usuarion
    dadosUsuario(n, function (err, usuario) {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send(JSON.stringify(usuario))
        }
    })
}