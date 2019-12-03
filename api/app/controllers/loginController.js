const db = require('../pg/config')
const usuario = require('../controllers/usuariosController')
let config = require('../auth/config')
let jsonwt = require('jsonwebtoken')

exports.get = (req, res) => {
}

/* POST */
function validaSenha(email, callback) {
    db.pool.query(`SELECT senhausuario FROM usuarios WHERE emailusuario = '${email}'`, function (err, res) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rows)
        }
    })
}

function dadosUsuario(email, callback) {
    db.pool.query(`SELECT * FROM usuarios WHERE emailusuario = '${email}'`, function (err, res) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rows)
        }
    })
}

exports.post = (req, res) => {
    const email = req.body.email
    const senha = req.body.senha
    if (!email || !senha){
        res.status(200).json({ status: false, color: 'red', icon: 'error', msg: 'Digite um e-mail e uma senha!', token: null })
    } 
    // if (!email) {
    //     res.status(200).json({ status: false, color: 'red', icon: 'error', msg: 'Digite um e-mail!', token: null })
    // } if (!senha) {
    //     res.status(200).json({ status: false, color: 'red', icon: 'error', msg: 'Digite uma senha!', token: null })
    // } 
    if (email && senha) {
        usuario.emailVerifica(email, function (err, retorno) {
            if (retorno == 0) {
                res.status(200).json({ status: false, color: 'red', icon: 'error', msg: 'E-mail não encontrado!', token: null })
            } else {
                validaSenha(email, function (err, senhaBanco) {
                    const bcrypt = require('bcrypt')
                    const senhaVerificar = senhaBanco[0].senhausuario
                    if (bcrypt.compareSync(senha, senhaVerificar) == false) {
                        res.status(200).json({ status: false, color: 'red', icon: 'error', msg: 'Senha incorreta!', token: null })
                    } else {
                        dadosUsuario(email, function (err, usuario) {
                            const { sign } = require('jsonwebtoken')
                            const dados = { ...usuario }
                            var token = jsonwt.sign({ n: dados[0].nusuario }, config.secretOrKey, { expiresIn: 3600 })
                            res.status(200).json({ status: true, color: 'green', icon: 'mood', msg: 'Login realizado com sucesso!', token: token })
                        })
                    }
                })
            }
        })
    }
}

exports.delete = (req, res) => {
    console.log('oi')
}

exports.put = (req, res) => {
    console.log('oi')
}