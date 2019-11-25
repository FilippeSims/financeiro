const db = require('../pg/config')
const usuario = require('../controllers/usuariosController')

exports.get = (req, res) => {
    console.log('oi')
}

/* POST */
function verificaEmail(email, callback) {
    db.pool.query(`SELECT emailusuario FROM usuarios WHERE emailusuario = '${email}'`, function (err, res) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rowCount)
        }
    })
}

exports.post = (req, res) => {
    const email = req.body.email
    const senha = req.body.senha
    if (!email || !senha) {
        res.status(200).json({ status: false, color: 'red', icon: 'error', msg: 'Digite corretamente e-mail ou senha!' })
    } else {
        usuario.emailVerifica(email, function (err, retorno) {
            console.log(retorno)
        })
    }
}

exports.delete = (req, res) => {
    console.log('oi')
}

exports.put = (req, res) => {
    console.log('oi')
}